require("dotenv").config();
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const required = ["DATABASE_URL", "SESSION_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD"];
for (const key of required) {
  if (!process.env[key]) {
    console.error("Missing required environment variable:", key);
    process.exit(1);
  }
}
if (process.env.ADMIN_PASSWORD.length < 12) {
  console.error("ADMIN_PASSWORD must be at least 12 characters. Set a unique password in your hosting environment.");
  process.exit(1);
}

const app = express();
const production = process.env.NODE_ENV === "production";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: production ? { rejectUnauthorized: false } : undefined,
  max: 10
});
if (production) app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "2mb" }));
app.use(session({
  name: "dfc.sid",
  store: new PgSession({ pool, tableName: "user_sessions", createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: production, sameSite: "lax", maxAge: 8 * 60 * 60 * 1000 }
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 8,
  standardHeaders: "draft-7", legacyHeaders: false,
  message: { error: "Too many login attempts. Try again later." }
});

const defaultMovies = [
  { title: "Ron's Gone Wrong", genre: "Animācija", duration: 107, age: "7+", year: 2021, emoji: "🤖", poster: "linear-gradient(135deg,#164e65,#172b46)", description: "Sirsnīgs un jautrs piedzīvojums par zēnu un viņa neparasto robotu draugu." },
  { title: "The Queen's Corgi", genre: "Komēdija", duration: 85, age: "7+", year: 2019, emoji: "🐶", poster: "linear-gradient(135deg,#75502e,#a52c35)", description: "Jautrs animācijas stāsts par karalisko korgiju un viņa piedzīvojumiem." },
  { title: "Augļu lielais piedzīvojums", genre: "Piedzīvojumi", duration: 96, age: "U", year: 2026, emoji: "🍍", poster: "linear-gradient(135deg,#9b5623,#4c6a32)", description: "Jautrs ģimenes piedzīvojums — Dancing Fruit Cinema demonstrācijas filma." }
];

async function createScreening(movieId, date, time, hallName) {
  const id = crypto.randomUUID();
  const result = await pool.query(
    "INSERT INTO screenings(id,movie_id,show_date,show_time,starts_at,hall_name) " +
    "VALUES($1,$2,$3::date,$4::time,($3::date + $4::time) AT TIME ZONE 'Europe/Riga',$5) " +
    "ON CONFLICT(movie_id,show_date,show_time) DO NOTHING RETURNING id",
    [id, movieId, date, time, hallName || "1. zāle"]
  );
  if (!result.rowCount) return;
  const seats = [...Array.from({length:8},(_,i)=>["BED-"+(i+1),false]),["CHAIR-L",true],["CHAIR-R",true]];
  for (const [seat,officeChair] of seats) await pool.query("INSERT INTO screening_seats(screening_id,seat_number,office_chair) VALUES($1,$2,$3) ON CONFLICT DO NOTHING",[id,seat,officeChair]);
}

async function initDatabase() {
  const schema = [
    "CREATE TABLE IF NOT EXISTS admin_users (id UUID PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())",
    "CREATE TABLE IF NOT EXISTS customer_users (id UUID PRIMARY KEY, full_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())",
    "CREATE TABLE IF NOT EXISTS movies (id UUID PRIMARY KEY, title TEXT NOT NULL, genre TEXT NOT NULL DEFAULT 'Cits', duration INTEGER NOT NULL CHECK(duration>0), age TEXT NOT NULL DEFAULT 'U', year INTEGER NOT NULL, emoji TEXT NOT NULL DEFAULT '🎬', poster TEXT NOT NULL DEFAULT 'linear-gradient(135deg,#753039,#182838)', description TEXT NOT NULL DEFAULT '', active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())",
    "CREATE TABLE IF NOT EXISTS screenings (id UUID PRIMARY KEY, movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE RESTRICT, show_date DATE NOT NULL, show_time TIME NOT NULL, starts_at TIMESTAMPTZ NOT NULL, hall_name TEXT NOT NULL DEFAULT '1. zāle', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(movie_id,show_date,show_time))",
    "CREATE TABLE IF NOT EXISTS bookings (id UUID PRIMARY KEY, booking_code TEXT NOT NULL UNIQUE, screening_id UUID NOT NULL REFERENCES screenings(id) ON DELETE RESTRICT, customer_name TEXT NOT NULL, customer_email TEXT NOT NULL, ticket_count INTEGER NOT NULL CHECK(ticket_count BETWEEN 1 AND 7), custom_selection BOOLEAN NOT NULL DEFAULT FALSE, water_count INTEGER NOT NULL DEFAULT 0 CHECK(water_count>=0), popcorn_count INTEGER NOT NULL DEFAULT 0 CHECK(popcorn_count>=0), total_cents INTEGER NOT NULL CHECK(total_cents>=0), status TEXT NOT NULL DEFAULT 'confirmed' CHECK(status IN ('confirmed','cancelled')), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())",
    "CREATE TABLE IF NOT EXISTS screening_seats (screening_id UUID NOT NULL REFERENCES screenings(id) ON DELETE CASCADE, seat_number TEXT NOT NULL, booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL, office_chair BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY(screening_id,seat_number))",
    "CREATE TABLE IF NOT EXISTS booking_seats (booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE, screening_id UUID NOT NULL REFERENCES screenings(id) ON DELETE RESTRICT, seat_number TEXT NOT NULL, office_chair BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY(booking_id,seat_number))",
    "CREATE TABLE IF NOT EXISTS cinema_settings (setting_key TEXT PRIMARY KEY, value_cents INTEGER NOT NULL CHECK(value_cents>=0))",
    "CREATE INDEX IF NOT EXISTS idx_screenings_starts_at ON screenings(starts_at)",
    "CREATE INDEX IF NOT EXISTS idx_bookings_screening ON bookings(screening_id)",
    "CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(lower(customer_email))",
    "CREATE INDEX IF NOT EXISTS idx_screening_seats_booking ON screening_seats(booking_id)"
  ];
  for (const statement of schema) await pool.query(statement);
  await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES customer_users(id) ON DELETE SET NULL");
  await pool.query("CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id,created_at DESC)");
  await pool.query("ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_ticket_count_check");
  await pool.query("ALTER TABLE bookings ADD CONSTRAINT bookings_ticket_count_check CHECK(ticket_count BETWEEN 1 AND 7)");
  await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS checked_in BOOLEAN NOT NULL DEFAULT FALSE");
  await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMPTZ");
  await pool.query("DELETE FROM screening_seats WHERE booking_id IS NULL");
  await pool.query("INSERT INTO screening_seats(screening_id,seat_number,office_chair) SELECT s.id,v.seat_number,v.office_chair FROM screenings s CROSS JOIN (VALUES ('BED-1',FALSE),('BED-2',FALSE),('BED-3',FALSE),('BED-4',FALSE),('BED-5',FALSE),('BED-6',FALSE),('BED-7',FALSE),('BED-8',FALSE),('CHAIR-L',TRUE),('CHAIR-R',TRUE)) AS v(seat_number,office_chair) ON CONFLICT DO NOTHING");

  const defaultPrices = { ticket: 10, custom: 10, office: 20, water: 20, popcorn: 50 };
  for (const entry of Object.entries(defaultPrices)) {
    await pool.query("INSERT INTO cinema_settings(setting_key,value_cents) VALUES($1,$2) ON CONFLICT DO NOTHING", entry);
  }

  const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await pool.query(
    "INSERT INTO admin_users(id,username,password_hash) VALUES($1,$2,$3) ON CONFLICT(username) DO NOTHING",
    [crypto.randomUUID(), process.env.ADMIN_USERNAME.trim(), adminHash]
  );

  const count = await pool.query("SELECT COUNT(*)::int AS count FROM movies");
  if (count.rows[0].count === 0) {
    for (let i = 0; i < defaultMovies.length; i++) {
      const movie = defaultMovies[i];
      const id = crypto.randomUUID();
      await pool.query(
        "INSERT INTO movies(id,title,genre,duration,age,year,emoji,poster,description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [id,movie.title,movie.genre,movie.duration,movie.age,movie.year,movie.emoji,movie.poster,movie.description]
      );
      const date = new Date();
      date.setDate(date.getDate() + 2 + (i % 2));
      const dateString = date.getFullYear() + "-" + String(date.getMonth()+1).padStart(2,"0") + "-" + String(date.getDate()).padStart(2,"0");
      const times = i === 0 ? ["14:00","17:00","20:00"] : ["15:00","18:00"];
      for (const time of times) await createScreening(id,dateString,time,"1. zāle");
    }
  }
}

async function getPrices(client) {
  const result = await (client || pool).query("SELECT setting_key,value_cents FROM cinema_settings");
  const found = Object.fromEntries(result.rows.map((row) => [row.setting_key,row.value_cents]));
  return { ticket: found.ticket ?? 10, custom: found.custom ?? 10, office: found.office ?? 20, water: found.water ?? 20, popcorn: found.popcorn ?? 50 };
}
function validPoster(value) {
  const poster = String(value || "").trim();
  if (!poster || poster.length > 1000000) return false;
  if (/^linear-gradient\((?:135deg|145deg),#[0-9a-f]{3,8},#[0-9a-f]{3,8}\)$/i.test(poster)) return true;
  if (/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/i.test(poster)) return poster.length <= 950000;
  try {
    const url = new URL(poster);
    return url.protocol === "https:" && poster.length <= 2048 && !url.username && !url.password;
  } catch { return false; }
}
function adminOnly(req,res,next) {
  if (!req.session || !req.session.admin) return res.status(401).json({error:"Administrator login required."});
  next();
}
function customerOnly(req,res,next) {
  if (!req.session || !req.session.user) return res.status(401).json({error:"Please sign in to your customer account."});
  next();
}

app.get("/api/health", async (req,res) => {
  try { await pool.query("SELECT 1"); res.json({ok:true,service:"Dancing Fruit Cinema API"}); }
  catch { res.status(503).json({ok:false,error:"Database unavailable."}); }
});
app.get("/api/movies", async (req,res,next) => {
  try {
    const result = await pool.query(
      "SELECT m.id,m.title,m.genre,m.duration,m.age,m.year,m.emoji,m.poster,m.description," +
      "COALESCE((SELECT json_agg(json_build_object('id',s.id,'date',to_char(s.show_date,'YYYY-MM-DD'),'time',to_char(s.show_time,'HH24:MI'),'hall',s.hall_name) ORDER BY s.starts_at) " +
      "FROM screenings s WHERE s.movie_id=m.id AND s.starts_at>NOW()),'[]'::json) AS screenings " +
      "FROM movies m WHERE m.active=TRUE ORDER BY m.created_at DESC"
    );
    res.json({movies:result.rows});
  } catch(error) { next(error); }
});
app.get("/api/prices", async (req,res,next) => {
  try {
    const prices = await getPrices();
    res.json({prices:Object.fromEntries(Object.entries(prices).map(([key,value]) => [key,value/100]))});
  } catch(error) { next(error); }
});
app.get("/api/screenings/:id/seats", async (req,res,next) => {
  try {
    const result = await pool.query(
      "SELECT seat_number,(booking_id IS NOT NULL) AS occupied,office_chair FROM screening_seats WHERE screening_id=$1 AND seat_number IN ('BED-1','BED-2','BED-3','BED-4','BED-5','BED-6','BED-7','BED-8','CHAIR-L','CHAIR-R') ORDER BY CASE WHEN seat_number LIKE 'BED-%' THEN 0 WHEN seat_number='CHAIR-L' THEN 1 ELSE 2 END,seat_number",
      [req.params.id]
    );
    if (!result.rowCount) return res.status(404).json({error:"Screening not found."});
    res.json({seats:result.rows});
  } catch(error) { next(error); }
});

app.post("/api/account/register",loginLimiter,async(req,res,next)=>{
  const name=String(req.body?.name||"").trim();
  const email=String(req.body?.email||"").trim().toLowerCase();
  const password=String(req.body?.password||"");
  if(name.length<2||name.length>70||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<8||password.length>100)
    return res.status(400).json({error:"Enter a valid name and email. Password must be at least 8 characters."});
  try{
    const exists=await pool.query("SELECT id FROM customer_users WHERE email=$1",[email]);
    if(exists.rowCount)return res.status(409).json({error:"An account with this email already exists. Sign in instead."});
    const id=crypto.randomUUID(),hash=await bcrypt.hash(password,12);
    await pool.query("INSERT INTO customer_users(id,full_name,email,password_hash) VALUES($1,$2,$3,$4)",[id,name,email,hash]);
    await pool.query("UPDATE bookings SET user_id=$1 WHERE lower(customer_email)=lower($2) AND user_id IS NULL",[id,email]);
    req.session.regenerate(error=>{
      if(error)return next(error);
      req.session.user={id,name,email};
      req.session.save(saveError=>{if(saveError)return next(saveError);res.status(201).json({ok:true,user:req.session.user});});
    });
  }catch(error){next(error);}
});
app.post("/api/account/login",loginLimiter,async(req,res,next)=>{
  try{
    const email=String(req.body?.email||"").trim().toLowerCase();
    const found=await pool.query("SELECT id,full_name,email,password_hash FROM customer_users WHERE email=$1",[email]);
    if(!found.rowCount||!await bcrypt.compare(String(req.body?.password||""),found.rows[0].password_hash))
      return res.status(401).json({error:"Incorrect email or password."});
    const row=found.rows[0];
    req.session.regenerate(error=>{
      if(error)return next(error);
      req.session.user={id:row.id,name:row.full_name,email:row.email};
      req.session.save(saveError=>{if(saveError)return next(saveError);res.json({ok:true,user:req.session.user});});
    });
  }catch(error){next(error);}
});
app.get("/api/account/me",(req,res)=>req.session?.user?res.json({user:req.session.user}):res.status(401).json({error:"Not signed in."}));
app.post("/api/account/logout",customerOnly,(req,res,next)=>req.session.destroy(error=>{if(error)return next(error);res.clearCookie("dfc.sid");res.json({ok:true});}));
app.get("/api/account/bookings",customerOnly,async(req,res,next)=>{
  try{
    const result=await pool.query(
      "SELECT b.booking_code,b.customer_name,b.customer_email,b.ticket_count,b.total_cents,b.status,b.checked_in,to_char(s.show_date,'YYYY-MM-DD') AS show_date,to_char(s.show_time,'HH24:MI') AS show_time,s.starts_at,m.title AS movie_title,COALESCE(array_agg(bs.seat_number ORDER BY bs.seat_number) FILTER(WHERE bs.seat_number IS NOT NULL),'{}') AS seats FROM bookings b JOIN screenings s ON s.id=b.screening_id JOIN movies m ON m.id=s.movie_id LEFT JOIN booking_seats bs ON bs.booking_id=b.id WHERE b.user_id=$1 GROUP BY b.id,s.id,m.id ORDER BY b.created_at DESC",
      [req.session.user.id]
    );
    res.json({bookings:result.rows.map(row=>({code:row.booking_code,name:row.customer_name,email:row.customer_email,count:row.ticket_count,total:row.total_cents/100,status:row.status,checkedIn:row.checked_in,date:row.show_date,time:row.show_time,startsAt:row.starts_at,movie:row.movie_title,seats:row.seats}))});
  }catch(error){next(error);}
});
app.post("/api/account/bookings/:code/cancel",customerOnly,async(req,res,next)=>{
  const client=await pool.connect();
  try{
    await client.query("BEGIN");
    const found=await client.query("SELECT b.id,b.status,s.starts_at FROM bookings b JOIN screenings s ON s.id=b.screening_id WHERE upper(b.booking_code)=upper($1) AND b.user_id=$2 FOR UPDATE OF b",[req.params.code,req.session.user.id]);
    if(!found.rowCount){await client.query("ROLLBACK");return res.status(404).json({error:"Booking not found in your account."});}
    const item=found.rows[0];
    if(item.status!=="confirmed"){await client.query("ROLLBACK");return res.status(409).json({error:"This booking is already cancelled."});}
    if((new Date(item.starts_at).getTime()-Date.now())/3600000<24){await client.query("ROLLBACK");return res.status(403).json({error:"You can cancel online until 24 hours before the screening. Contact the cinema for later changes."});}
    await client.query("UPDATE screening_seats SET booking_id=NULL,office_chair=FALSE WHERE booking_id=$1",[item.id]);
    await client.query("UPDATE bookings SET status='cancelled' WHERE id=$1",[item.id]);
    await client.query("COMMIT");res.json({ok:true});
  }catch(error){await client.query("ROLLBACK").catch(()=>{});next(error);}
  finally{client.release();}
});
app.post("/api/bookings",customerOnly, async (req,res,next) => {
  const body = req.body || {};
  const count = Number(body.ticketCount), water = Number(body.waterCount || 0), popcorn = Number(body.popcornCount || 0), officeChairCount = Number(body.officeChairCount || 0);
  const selected = Array.isArray(body.selectedSeats) ? body.selectedSeats : [];
  const office = Array.isArray(body.officeSeats) ? body.officeSeats : [];
  const custom = Boolean(body.customSelection);
  const email = req.session.user.email;
  const name = req.session.user.name;
  if (!body.screeningId || !name || name.length > 70 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !Number.isInteger(count) || count < 1 || count > 7 ||
      !Number.isInteger(water) || water < 0 || water > 20 ||
      !Number.isInteger(popcorn) || popcorn < 0 || popcorn > 20 ||
      new Set(office).size !== office.length || office.some((seat) => typeof seat !== "string") || !Number.isInteger(officeChairCount) || officeChairCount < 0 || officeChairCount > count) {
    return res.status(400).json({error:"Check your details. A booking can contain 1–7 tickets."});
  }
  if (custom && (selected.length !== count || new Set(selected).size !== count)) {
    return res.status(400).json({error:"Choose exactly the number of seats in your booking."});
  }
  if (!custom && (selected.length || office.length)) return res.status(400).json({error:"Custom seat details are not valid for automatic allocation."});
  if (custom && office.some((seat) => !selected.includes(seat))) return res.status(400).json({error:"Office chair upgrades must match selected seats."});
  if (office.length > count) return res.status(400).json({error:"Too many office chair upgrades."});

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const screening = await client.query("SELECT id,starts_at FROM screenings WHERE id=$1 FOR UPDATE",[body.screeningId]);
    if (!screening.rowCount) { await client.query("ROLLBACK"); return res.status(404).json({error:"Screening not found."}); }
    if (new Date(screening.rows[0].starts_at).getTime() <= Date.now()) {
      await client.query("ROLLBACK"); return res.status(409).json({error:"This screening has already started."});
    }

    let allocated;
    if (custom) {
      const result = await client.query(
        "SELECT seat_number FROM screening_seats WHERE screening_id=$1 AND seat_number=ANY($2::text[]) AND booking_id IS NULL FOR UPDATE SKIP LOCKED",
        [body.screeningId,selected]
      );
      allocated = result.rows.map((row) => row.seat_number);
    } else {
      const result = await client.query(
        "SELECT seat_number FROM screening_seats WHERE screening_id=$1 AND booking_id IS NULL ORDER BY seat_number LIMIT $2 FOR UPDATE SKIP LOCKED",
        [body.screeningId,count]
      );
      allocated = result.rows.map((row) => row.seat_number);
    }
    if (allocated.length !== count) {
      await client.query("ROLLBACK");
      return res.status(409).json({error:"One or more seats are no longer available. Refresh the seat map and try again."});
    }

    const p = await getPrices(client);
    const officeAllocated = custom ? office : allocated.filter((seat) => seat === "CHAIR-L" || seat === "CHAIR-R");
    const total = count*p.ticket + (custom ? p.custom : 0) + officeAllocated.length*p.office + water*p.water + popcorn*p.popcorn;
    const id = crypto.randomUUID();
    const code = "Dncngfrt-" + Array.from({length:3},()=>crypto.randomBytes(2).toString("hex").slice(0,3).toUpperCase()).join("-") + "-" + String(crypto.randomInt(0,1000000)).padStart(6,"0");
    await client.query(
      "INSERT INTO bookings(id,booking_code,screening_id,user_id,customer_name,customer_email,ticket_count,custom_selection,water_count,popcorn_count,total_cents) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [id,code,body.screeningId,req.session.user.id,name,email,count,custom,water,popcorn,total]
    );
    const update = await client.query(
      "UPDATE screening_seats SET booking_id=$1,office_chair=(seat_number=ANY($2::text[])) WHERE screening_id=$3 AND seat_number=ANY($4::text[]) AND booking_id IS NULL",
      [id,officeAllocated,body.screeningId,allocated]
    );
    if (update.rowCount !== count) throw new Error("Seat allocation changed before commit.");
    for (const seat of allocated) {
      await client.query("INSERT INTO booking_seats(booking_id,screening_id,seat_number,office_chair) VALUES($1,$2,$3,$4)",[id,body.screeningId,seat,officeAllocated.includes(seat)]);
    }
    await client.query("COMMIT");
    res.status(201).json({booking:{code,customerName:name,customerEmail:email,screeningId:body.screeningId,ticketCount:count,seats:allocated,officeSeats:officeAllocated,waterCount:water,popcornCount:popcorn,total:total/100,status:"confirmed"}});
  } catch(error) {
    await client.query("ROLLBACK").catch(()=>{});
    next(error);
  } finally { client.release(); }
});

app.post("/api/bookings/lookup", async (req,res,next) => {
  try {
    const code = String(req.body?.bookingCode || "").trim().toUpperCase();
    const email = String(req.body?.customerEmail || "").trim().toLowerCase();
    if (!code || !email) return res.status(400).json({error:"Enter the booking code and email address."});
    const result = await pool.query(
      "SELECT b.booking_code,b.customer_name,b.customer_email,b.ticket_count,b.water_count,b.popcorn_count,b.total_cents,b.status," +
      "to_char(s.show_date,'YYYY-MM-DD') AS show_date,to_char(s.show_time,'HH24:MI') AS show_time,s.starts_at,m.title AS movie_title," +
      "COALESCE(array_agg(ss.seat_number ORDER BY ss.seat_number) FILTER(WHERE ss.seat_number IS NOT NULL),'{}') AS seats," +
      "COALESCE(array_agg(ss.seat_number ORDER BY ss.seat_number) FILTER(WHERE ss.office_chair=TRUE),'{}') AS office_seats " +
      "FROM bookings b JOIN screenings s ON s.id=b.screening_id JOIN movies m ON m.id=s.movie_id " +
      "LEFT JOIN booking_seats ss ON ss.booking_id=b.id WHERE b.booking_code=$1 AND lower(b.customer_email)=lower($2) GROUP BY b.id,s.id,m.id",
      [code,email]
    );
    if (!result.rowCount) return res.status(404).json({error:"No booking found for that code and email."});
    const row = result.rows[0];
    res.json({booking:{code:row.booking_code,customerName:row.customer_name,customerEmail:row.customer_email,
      ticketCount:row.ticket_count,waterCount:row.water_count,popcornCount:row.popcorn_count,total:row.total_cents/100,
      status:row.status,date:row.show_date,time:row.show_time,startsAt:row.starts_at,movieTitle:row.movie_title,
      seats:row.seats,officeSeats:row.office_seats}});
  } catch(error) { next(error); }
});

async function cancelReservation(code,email,isAdmin) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "SELECT b.id,b.customer_email,b.status,s.starts_at FROM bookings b JOIN screenings s ON s.id=b.screening_id WHERE upper(b.booking_code)=upper($1) FOR UPDATE OF b",
      [String(code).trim()]
    );
    if (!result.rowCount || (!isAdmin && result.rows[0].customer_email !== String(email || "").trim().toLowerCase())) {
      await client.query("ROLLBACK"); return {status:404,error:"Booking not found."};
    }
    const booking = result.rows[0];
    if (booking.status === "cancelled") { await client.query("ROLLBACK"); return {status:409,error:"Booking already cancelled."}; }
    if (!isAdmin && (new Date(booking.starts_at).getTime()-Date.now())/3600000 < 24) {
      await client.query("ROLLBACK"); return {status:403,error:"Customer cancellations close 24 hours before the screening."};
    }
    await client.query("UPDATE screening_seats SET booking_id=NULL,office_chair=FALSE WHERE booking_id=$1",[booking.id]);
    await client.query("UPDATE bookings SET status='cancelled' WHERE id=$1",[booking.id]);
    await client.query("COMMIT"); return {status:200,ok:true};
  } catch(error) {
    await client.query("ROLLBACK").catch(()=>{}); throw error;
  } finally { client.release(); }
}
app.post("/api/bookings/:code/cancel", customerOnly, async (req,res,next) => {
  try { const result=await cancelReservation(req.params.code,req.session.user.email,false); res.status(result.status).json(result); }
  catch(error) { next(error); }
});

app.post("/api/admin/login",loginLimiter,async(req,res,next)=>{
  try {
    const result=await pool.query("SELECT id,username,password_hash FROM admin_users WHERE username=$1",[String(req.body?.username||"").trim()]);
    if(!result.rowCount || !await bcrypt.compare(String(req.body?.password||""),result.rows[0].password_hash))
      return res.status(401).json({error:"Incorrect username or password."});
    req.session.regenerate((error)=>{
      if(error)return next(error);
      req.session.admin={id:result.rows[0].id,username:result.rows[0].username};
      req.session.save((saveError)=>{
        if(saveError)return next(saveError);
        res.json({ok:true,admin:{username:result.rows[0].username}});
      });
    });
  } catch(error) { next(error); }
});
app.get("/api/admin/me",(req,res)=>req.session?.admin?res.json({admin:req.session.admin}):res.status(401).json({error:"Not signed in."}));
app.post("/api/admin/logout",adminOnly,(req,res,next)=>req.session.destroy((error)=>{if(error)return next(error);res.clearCookie("dfc.sid");res.json({ok:true});}));

app.get("/api/admin/bookings",adminOnly,async(req,res,next)=>{
  try {
    const result=await pool.query(
      "SELECT b.booking_code,b.customer_name,b.customer_email,b.ticket_count,b.total_cents,b.status,b.checked_in,b.checked_in_at,"+
      "to_char(s.show_date,'YYYY-MM-DD') AS show_date,to_char(s.show_time,'HH24:MI') AS show_time,m.title AS movie_title,"+
      "COALESCE(array_agg(ss.seat_number ORDER BY ss.seat_number) FILTER(WHERE ss.seat_number IS NOT NULL),'{}') AS seats "+
      "FROM bookings b JOIN screenings s ON s.id=b.screening_id JOIN movies m ON m.id=s.movie_id "+
      "LEFT JOIN booking_seats ss ON ss.booking_id=b.id GROUP BY b.id,s.id,m.id ORDER BY b.created_at DESC"
    );
    res.json({bookings:result.rows.map(row=>({code:row.booking_code,name:row.customer_name,email:row.customer_email,
      count:row.ticket_count,total:row.total_cents/100,status:row.status,checkedIn:row.checked_in,checkedInAt:row.checked_in_at,date:row.show_date,time:row.show_time,movie:row.movie_title,seats:row.seats}))});
  } catch(error) { next(error); }
});
app.post("/api/admin/tickets/scan",adminOnly,async(req,res,next)=>{
  const code=String(req.body?.code||"").trim();
  if(!/^Dncngfrt-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-\d{6}$/i.test(code))
    return res.status(400).json({error:"Invalid ticket code format."});
  const client=await pool.connect();
  try{
    await client.query("BEGIN");
    const found=await client.query(
      "SELECT id,booking_code,customer_name,status,checked_in,screening_id FROM bookings WHERE upper(booking_code)=upper($1) FOR UPDATE",
      [code]
    );
    if(!found.rowCount){await client.query("ROLLBACK");return res.status(404).json({error:"Ticket code not found."});}
    const ticket=found.rows[0];
    if(ticket.status!=="confirmed"){await client.query("ROLLBACK");return res.status(409).json({error:"This booking has been cancelled."});}
    if(ticket.checked_in){await client.query("ROLLBACK");return res.status(409).json({error:"This ticket has already been scanned."});}
    const details=await client.query(
      "SELECT to_char(s.show_date,'YYYY-MM-DD') AS show_date,to_char(s.show_time,'HH24:MI') AS show_time,m.title AS movie_title,COALESCE(array_agg(bs.seat_number ORDER BY bs.seat_number) FILTER(WHERE bs.seat_number IS NOT NULL),'{}') AS seats FROM screenings s JOIN movies m ON m.id=s.movie_id LEFT JOIN booking_seats bs ON bs.screening_id=s.id AND bs.booking_id=$2 WHERE s.id=$1 GROUP BY s.id,m.id",
      [ticket.screening_id,ticket.id]
    );
    if(!details.rowCount){await client.query("ROLLBACK");return res.status(404).json({error:"Screening details not found."});}
    await client.query("UPDATE bookings SET checked_in=TRUE,checked_in_at=NOW() WHERE id=$1",[ticket.id]);
    await client.query("COMMIT");
    res.json({ok:true,ticket:{code:ticket.booking_code,name:ticket.customer_name,movie:details.rows[0].movie_title,date:details.rows[0].show_date,time:details.rows[0].show_time,seats:details.rows[0].seats}});
  }catch(error){await client.query("ROLLBACK").catch(()=>{});next(error);}
  finally{client.release();}
});
app.post("/api/admin/bookings/:code/cancel",adminOnly,async(req,res,next)=>{
  try { const result=await cancelReservation(req.params.code,null,true); res.status(result.status).json(result); }
  catch(error) { next(error); }
});

async function addShowings(client,movieId,showings) {
  if(!Array.isArray(showings)) throw new Error("Screenings must be an array.");
  for(const showing of showings) {
    const date=String(showing.date||"");
    const times=Array.isArray(showing.times)?showing.times:[];
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid screening date.");
    for(const time of times) {
      if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Invalid screening time.");
      await createScreening(client,movieId,date,time,"1. zāle");
    }
  }
}
// createScreening uses the shared pool. This helper is used only during admin writes.
// A nested transaction is avoided; all screening records are still inserted on the same database.
app.post("/api/admin/movies",adminOnly,async(req,res,next)=>{
  const m=req.body||{};
  if(!m.title||!m.description||!Number.isInteger(Number(m.duration))||Number(m.duration)<1)
    return res.status(400).json({error:"Movie title, description and valid duration are required."});
  const poster=String(m.poster||"linear-gradient(135deg,#753039,#182838)").trim();
  if(!validPoster(poster)) return res.status(400).json({error:"Use an HTTPS poster image URL or upload a JPG, PNG or WebP image under 1 MB."});
  const id=crypto.randomUUID(),client=await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("INSERT INTO movies(id,title,genre,duration,age,year,emoji,poster,description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [id,String(m.title).slice(0,100),String(m.genre||"Cits"),Number(m.duration),String(m.age||"U"),Number(m.year)||new Date().getFullYear(),String(m.emoji||"🎬"),poster,String(m.description).slice(0,1000)]);
    for(const showing of (Array.isArray(m.screenings)?m.screenings:[])) {
      const date=String(showing.date||""),times=Array.isArray(showing.times)?showing.times:[];
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid screening date.");
      for(const time of times) {
        if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Invalid screening time.");
        const sid=crypto.randomUUID();
        const inserted=await client.query("INSERT INTO screenings(id,movie_id,show_date,show_time,starts_at,hall_name) VALUES($1,$2,$3::date,$4::time,($3::date + $4::time) AT TIME ZONE 'Europe/Riga',$5) ON CONFLICT(movie_id,show_date,show_time) DO NOTHING RETURNING id",[sid,id,date,time,"1. zāle"]);
        if(inserted.rowCount) for(const [seat,chair] of [...Array.from({length:8},(_,i)=>["BED-"+(i+1),false]),["CHAIR-L",true],["CHAIR-R",true]]) await client.query("INSERT INTO screening_seats(screening_id,seat_number,office_chair) VALUES($1,$2,$3)",[sid,seat,chair]);
      }
    }
    await client.query("COMMIT");res.status(201).json({id});
  } catch(error) {await client.query("ROLLBACK").catch(()=>{});next(error);}
  finally {client.release();}
});
app.put("/api/admin/movies/:id",adminOnly,async(req,res,next)=>{
  const m=req.body||{};
  const poster=String(m.poster||"linear-gradient(135deg,#753039,#182838)").trim();
  if(!validPoster(poster)) return res.status(400).json({error:"Use an HTTPS poster image URL or upload a JPG, PNG or WebP image under 1 MB."});
  const client=await pool.connect();
  try {
    await client.query("BEGIN");
    const result=await client.query("UPDATE movies SET title=$2,genre=$3,duration=$4,age=$5,year=$6,emoji=$7,poster=$8,description=$9 WHERE id=$1 RETURNING id",
      [req.params.id,String(m.title||"").slice(0,100),String(m.genre||"Cits"),Number(m.duration),String(m.age||"U"),Number(m.year)||new Date().getFullYear(),String(m.emoji||"🎬"),poster,String(m.description||"").slice(0,1000)]);
    if(!result.rowCount){await client.query("ROLLBACK");return res.status(404).json({error:"Movie not found."});}
    const showings=Array.isArray(m.screenings)?m.screenings:[];
    for(const showing of showings) {
      const date=String(showing.date||""),times=Array.isArray(showing.times)?showing.times:[];
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid screening date.");
      for(const time of times) {
        if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Invalid screening time.");
        const sid=crypto.randomUUID();
        const inserted=await client.query("INSERT INTO screenings(id,movie_id,show_date,show_time,starts_at,hall_name) VALUES($1,$2,$3::date,$4::time,($3::date + $4::time) AT TIME ZONE 'Europe/Riga',$5) ON CONFLICT(movie_id,show_date,show_time) DO NOTHING RETURNING id",[sid,req.params.id,date,time,"1. zāle"]);
        if(inserted.rowCount) for(let row=1;row<=6;row++) for(let col=0;col<6;col++) await client.query("INSERT INTO screening_seats(screening_id,seat_number) VALUES($1,$2)",[sid,"R"+row+"-"+String.fromCharCode(65+col)]);
      }
    }
    await client.query("COMMIT");res.json({ok:true});
  } catch(error) {await client.query("ROLLBACK").catch(()=>{});next(error);}
  finally {client.release();}
});
app.delete("/api/admin/movies/:id",adminOnly,async(req,res,next)=>{
  try {
    const used=await pool.query("SELECT 1 FROM bookings b JOIN screenings s ON s.id=b.screening_id WHERE s.movie_id=$1 LIMIT 1",[req.params.id]);
    if(used.rowCount)return res.status(409).json({error:"This movie has booking history and cannot be deleted."});
    await pool.query("UPDATE movies SET active=FALSE WHERE id=$1",[req.params.id]);res.json({ok:true});
  } catch(error) {next(error);}
});
app.delete("/api/admin/screenings/:id",adminOnly,async(req,res,next)=>{
  try {
    const used=await pool.query("SELECT 1 FROM bookings WHERE screening_id=$1 LIMIT 1",[req.params.id]);
    if(used.rowCount)return res.status(409).json({error:"This screening has booking history and cannot be removed."});
    const result=await pool.query("DELETE FROM screenings WHERE id=$1 RETURNING id",[req.params.id]);
    if(!result.rowCount)return res.status(404).json({error:"Screening not found."});
    res.json({ok:true});
  } catch(error) { next(error); }
});

app.put("/api/admin/prices",adminOnly,async(req,res,next)=>{
  try {
    for(const key of ["ticket","custom","office","water","popcorn"]) if(req.body?.[key]!==undefined) {
      const value=Number(req.body[key]);
      if(!Number.isFinite(value)||value<0||value>1000)return res.status(400).json({error:"Invalid price."});
      await pool.query("INSERT INTO cinema_settings(setting_key,value_cents) VALUES($1,$2) ON CONFLICT(setting_key) DO UPDATE SET value_cents=EXCLUDED.value_cents",[key,Math.round(value*100)]);
    }
    const p=await getPrices();res.json({prices:Object.fromEntries(Object.entries(p).map(([key,value])=>[key,value/100]))});
  } catch(error) {next(error);}
});
app.post("/api/admin/password",adminOnly,async(req,res,next)=>{
  try {
    const current=String(req.body?.currentPassword||""),nextPassword=String(req.body?.newPassword||"");
    if(nextPassword.length<12)return res.status(400).json({error:"New password must be at least 12 characters."});
    const result=await pool.query("SELECT password_hash FROM admin_users WHERE id=$1",[req.session.admin.id]);
    if(!result.rowCount||!await bcrypt.compare(current,result.rows[0].password_hash))return res.status(401).json({error:"Current password is incorrect."});
    const hash=await bcrypt.hash(nextPassword,12);
    await pool.query("UPDATE admin_users SET password_hash=$1 WHERE id=$2",[hash,req.session.admin.id]);
    res.json({ok:true});
  } catch(error) {next(error);}
});

app.use(express.static(path.join(__dirname),{dotfiles:"ignore",index:"index.html"}));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"index.html")));
app.use((error,req,res,next)=>{
  console.error(error);
  if(res.headersSent)return next(error);
  res.status(500).json({error:production?"An unexpected server error occurred.":error.message});
});

const port=Number(process.env.PORT||3000);
initDatabase().then(()=>{
  app.listen(port,()=>console.log("Dancing Fruit Cinema running on port "+port));
}).catch((error)=>{
  console.error("Database initialisation failed:",error);
  process.exit(1);
});
process.on("SIGTERM",async()=>{await pool.end();process.exit(0);});
