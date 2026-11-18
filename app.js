const STORE = {
  movies: "dfc_movies_v1",
  bookings: "dfc_bookings_v1",
  prices: "dfc_prices_v1",
  admin: "dfc_admin_v1"
};

const $ = (selector) => document.querySelector(selector);
const money = (amount) => Number(amount).toLocaleString("lv-LV", { style: "currency", currency: "EUR" });
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function datePlus(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}
function defaultMovies() {
  return [
    {
      id: "ron-gone-wrong",
      title: "Ron's Gone Wrong",
      genre: "Animācija",
      duration: 107,
      age: "7+",
      year: 2021,
      emoji: "🤖",
      poster: "linear-gradient(135deg,#164e65,#172b46)",
      description: "Sirsnīgs un jautrs piedzīvojums par zēnu un viņa neparasto robotu draugu.",
      screenings: [
        { date: datePlus(2), times: ["14:00", "17:00", "20:00"] },
        { date: datePlus(3), times: ["13:00", "16:00"] }
      ]
    },
    {
      id: "queens-corgi",
      title: "The Queen's Corgi",
      genre: "Komēdija",
      duration: 85,
      age: "7+",
      year: 2019,
      emoji: "🐶",
      poster: "linear-gradient(135deg,#75502e,#a52c35)",
      description: "Jautrs animācijas stāsts par karalisko korgiju un viņa piedzīvojumiem.",
      screenings: [
        { date: datePlus(2), times: ["15:00", "18:00"] },
        { date: datePlus(4), times: ["12:00", "17:30"] }
      ]
    },
    {
      id: "fruit-adventure",
      title: "Augļu lielais piedzīvojums",
      genre: "Piedzīvojumi",
      duration: 96,
      age: "U",
      year: 2026,
      emoji: "🍍",
      poster: "linear-gradient(135deg,#9b5623,#4c6a32)",
      description: "Jautrs ģimenes piedzīvojums — Dancing Fruit Cinema demonstrācijas filma.",
      screenings: [{ date: datePlus(3), times: ["14:30", "19:00"] }]
    }
  ];
}
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn("Neizdevās nolasīt pārlūka datus:", error);
    return fallback;
  }
}
function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let movies = readStore(STORE.movies, defaultMovies());
let bookings = readStore(STORE.bookings, []);
let prices = readStore(STORE.prices, { ticket: 0.10, custom: 0.10, office: 0.20, water: 0.20, popcorn: 0.50 });
let activeGenre = "all";
let booking = null;
let adminIsLoggedIn = false;
let toastTimer;

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2800);
}
function showModal(markup) {
  $("#modalContent").innerHTML = markup;
  $("#modalBackdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modalBackdrop").classList.add("hidden");
  document.body.style.overflow = "";
}
function closeOnBackdrop(event) {
  if (event.target === $("#modalBackdrop")) closeModal();
}
function getMovie(id) {
  return movies.find((movie) => movie.id === id);
}
function formatDate(value) {
  return new Date(value + "T12:00:00").toLocaleDateString("lv-LV", {
    day: "numeric", month: "long", year: "numeric"
  });
}
function moneyInput(value) {
  return Math.max(0, Number(value) || 0);
}

function renderMovies() {
  const search = $("#movieSearch").value.trim().toLocaleLowerCase("lv");
  const visible = movies.filter((movie) => {
    const genreMatches = activeGenre === "all" || movie.genre === activeGenre;
    const textMatches = (movie.title + " " + movie.description).toLocaleLowerCase("lv").includes(search);
    return genreMatches && textMatches;
  });
  $("#movieGrid").innerHTML = visible.map((movie) => `
    <article class="movie-card">
      <div class="poster" style="background:${escapeHTML(movie.poster || "linear-gradient(135deg,#5e2833,#182838)")}">
        <span class="poster-emoji">${escapeHTML(movie.emoji || "🎬")}</span>
        <strong class="poster-title">${escapeHTML(movie.title)}</strong>
      </div>
      <div class="movie-info">
        <div class="movie-meta"><span>${escapeHTML(movie.genre)}</span><span>•</span><span>${escapeHTML(movie.duration)} min</span><span>•</span><span>${escapeHTML(movie.age)}</span></div>
        <h3>${escapeHTML(movie.title)}</h3>
        <p>${escapeHTML(movie.description)}</p>
        <div class="movie-bottom"><strong>Biļetes no ${money(prices.ticket)}</strong><button class="small-button" data-book="${escapeHTML(movie.id)}">Pirkt biļeti</button></div>
      </div>
    </article>`
  ).join("");
  $("#emptyMovies").classList.toggle("hidden", visible.length > 0);
}
function renderAll() {
  renderMovies();
  if ($("#customerBookings").dataset.email) renderCustomerBookings($("#customerBookings").dataset.email);
}
function setGenre(genre) {
  activeGenre = genre;
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.genre === genre));
  renderMovies();
}

function openBooking(movieId) {
  const movie = getMovie(movieId);
  if (!movie) return;
  const showings = (movie.screenings || []).filter((item) => item.date && item.times?.length && item.date >= datePlus(0));
  if (!showings.length) {
    toast("Šai filmai pašlaik nav pieejamu seansu.");
    return;
  }
  booking = {
    movieId, date: showings[0].date, time: showings[0].times[0], count: 1,
    mode: "auto", seats: [], office: [], water: 0, popcorn: 0
  };
  renderBookingDateStep();
}
function showingsForCurrentMovie() {
  return getMovie(booking.movieId).screenings.filter((item) => item.date && item.times?.length && item.date >= datePlus(0));
}
function renderBookingDateStep() {
  const movie = getMovie(booking.movieId);
  const showings = showingsForCurrentMovie();
  const selectedShowing = showings.find((item) => item.date === booking.date) || showings[0];
  booking.date = selectedShowing.date;
  if (!selectedShowing.times.includes(booking.time)) booking.time = selectedShowing.times[0];

  showModal(`
    <p class="eyebrow">1. SOLIS NO 4</p><h2 id="modalTitle">Rezervē biļetes</h2>
    <p class="modal-intro">${escapeHTML(movie.title)} · ${movie.duration} min · ${escapeHTML(movie.age)}</p>
    <div class="form-grid">
      <div class="field"><label for="bookDate">Seansa datums</label><select id="bookDate">${showings.map((item) => `<option value="${escapeHTML(item.date)}" ${item.date === booking.date ? "selected" : ""}>${formatDate(item.date)}</option>`).join("")}</select></div>
      <div class="field"><label for="bookTime">Seansa laiks</label><select id="bookTime">${selectedShowing.times.map((time) => `<option ${time === booking.time ? "selected" : ""}>${escapeHTML(time)}</option>`).join("")}</select></div>
      <div class="field full"><label for="ticketCount">Biļešu skaits (maksimums 8)</label><select id="ticketCount">${Array.from({length: 8}, (_, index) => `<option value="${index + 1}" ${index === 0 ? "selected" : ""}>${index + 1}</option>`).join("")}</select></div>
    </div>
    <div class="modal-actions"><button class="button button-secondary" data-close>Atcelt</button><button class="small-button" id="toSeats">Turpināt →</button></div>
  `);

  $("#bookDate").addEventListener("change", (event) => {
    booking.date = event.target.value;
    const showing = showings.find((item) => item.date === booking.date);
    $("#bookTime").innerHTML = showing.times.map((time) => `<option>${escapeHTML(time)}</option>`).join("");
    booking.time = showing.times[0];
  });
  $("#bookTime").addEventListener("change", (event) => booking.time = event.target.value);
  $("#ticketCount").addEventListener("change", (event) => booking.count = Math.min(8, Math.max(1, Number(event.target.value))));
  $("#toSeats").onclick = () => {
    booking.count = Math.min(8, Math.max(1, Number($("#ticketCount").value)));
    renderSeatStep();
  };
}
function seatsForShowing() {
  return Array.from({length: 36}, (_, index) => `R${Math.floor(index / 6) + 1}-${String.fromCharCode(65 + (index % 6))}`);
}
function reservedSeats() {
  return bookings.filter((item) =>
    item.status !== "cancelled" && item.movieId === booking.movieId &&
    item.date === booking.date && item.time === booking.time
  ).flatMap((item) => item.seats || []);
}
function renderSeatStep() {
  const taken = reservedSeats();
  const allSeats = seatsForShowing();
  booking.seats = booking.seats.filter((seat) => !taken.includes(seat));
  if (booking.mode === "auto") {
    booking.seats = allSeats.filter((seat) => !taken.includes(seat)).slice(0, booking.count);
    if (booking.seats.length !== booking.count) {
      toast("Šajā seansā nav pietiekami daudz brīvu vietu.");
      return;
    }
  }

  showModal(`
    <p class="eyebrow">2. SOLIS NO 4</p><h2 id="modalTitle">Izvēlies sēdvietas</h2>
    <p class="modal-intro">Standarta vietas ir plašas gultas tipa sēdvietas. Vari ļaut sistēmai piešķirt vietas bez maksas vai izvēlēties konkrētas vietas par ${money(prices.custom)} par rezervāciju.</p>
    <div class="choice-row">
      <button class="choice-card ${booking.mode === "auto" ? "active" : ""}" id="autoMode"><b>Automātiska izvēle</b><small>Bez papildu maksas</small></button>
      <button class="choice-card ${booking.mode === "custom" ? "active" : ""}" id="customMode"><b>Izvēlēties pašam</b><small>${money(prices.custom)} par rezervāciju</small></button>
    </div>
    <div class="screen-label">KINOTEĀTRA EKRĀNS</div>
    <div class="seat-grid">${allSeats.map((seat) => {
      const isTaken = taken.includes(seat);
      const selected = booking.seats.includes(seat);
      return `<button class="seat ${isTaken ? "occupied" : ""} ${selected ? "selected" : ""}" data-seat="${seat}" ${isTaken || booking.mode === "auto" ? "disabled" : ""}>${seat.split("-")[1]}<small>${seat.split("-")[0]}</small></button>`;
    }).join("")}</div>
    <div class="seat-legend"><span><i class="legend-box" style="background:#183d30"></i>Brīva</span><span><i class="legend-box" style="background:#63272b"></i>Aizņemta</span><span><i class="legend-box" style="background:#8e6421"></i>Izvēlēta</span><span>▰ Gultas tipa vieta</span></div>
    <div class="seat-actions">Izvēlētās vietas: <b>${booking.seats.map(escapeHTML).join(", ") || "Nav izvēlētas"}</b><br>Jāizvēlas tieši ${booking.count} vietas.</div>
    <div class="modal-actions"><button class="button button-secondary" id="backToDates">← Atpakaļ</button><button class="small-button" id="toExtras">Turpināt →</button></div>
  `);

  $("#autoMode").onclick = () => { booking.mode = "auto"; renderSeatStep(); };
  $("#customMode").onclick = () => { booking.mode = "custom"; booking.seats = []; renderSeatStep(); };
  document.querySelectorAll("[data-seat]").forEach((button) => {
    button.onclick = () => {
      const seat = button.dataset.seat;
      if (booking.seats.includes(seat)) booking.seats = booking.seats.filter((item) => item !== seat);
      else if (booking.seats.length < booking.count) booking.seats.push(seat);
      else { toast("Vari izvēlēties tikai " + booking.count + " vietas."); return; }
      renderSeatStep();
    };
  });
  $("#backToDates").onclick = renderBookingDateStep;
  $("#toExtras").onclick = () => {
    if (booking.seats.length !== booking.count) { toast("Lūdzu, izvēlies " + booking.count + " vietas."); return; }
    booking.office = [];
    renderExtrasStep();
  };
}
function bookingTotal() {
  return booking.count * prices.ticket +
    (booking.mode === "custom" ? prices.custom : 0) +
    booking.office.length * prices.office +
    booking.water * prices.water + booking.popcorn * prices.popcorn;
}
function renderExtrasStep() {
  showModal(`
    <p class="eyebrow">3. SOLIS NO 4</p><h2 id="modalTitle">Papildu iespējas</h2>
    <p class="modal-intro">Izvēlies, kuras vietas vēlies uzlabot uz biroja krēslu. Pārējās paliks gultas tipa vietas.</p>
    <div class="choice-row">${booking.seats.map((seat) => `<button class="choice-card ${booking.office.includes(seat) ? "active" : ""}" data-office="${seat}"><b>${seat}</b><small>${booking.office.includes(seat) ? "🪑 Biroja krēsls" : "▰ Gultas tipa vieta"} · ${money(prices.office)}</small></button>`).join("")}</div>
    <div class="form-grid" style="margin-top:18px">
      <div class="field"><label for="waterCount">Ūdens (${money(prices.water)} gab.)</label><input id="waterCount" type="number" min="0" max="20" value="${booking.water}"></div>
      <div class="field"><label for="popcornCount">Popkorns (${money(prices.popcorn)} porcija)</label><input id="popcornCount" type="number" min="0" max="20" value="${booking.popcorn}"></div>
    </div>
    <div class="summary-box">
      <div class="summary-line"><span>Biļetes (${booking.count})</span><b>${money(booking.count * prices.ticket)}</b></div>
      <div class="summary-line"><span>Vietas izvēle</span><b>${money(booking.mode === "custom" ? prices.custom : 0)}</b></div>
      <div class="summary-line"><span>Biroja krēsli (${booking.office.length})</span><b>${money(booking.office.length * prices.office)}</b></div>
      <div class="summary-line"><span>Ūdens un popkorns</span><b>${money(booking.water * prices.water + booking.popcorn * prices.popcorn)}</b></div>
      <div class="summary-line total"><span>Kopā</span><b>${money(bookingTotal())}</b></div>
    </div>
    <div class="modal-actions"><button class="button button-secondary" id="backToSeats">← Atpakaļ</button><button class="small-button" id="toCustomerDetails">Turpināt →</button></div>
  `);
  document.querySelectorAll("[data-office]").forEach((button) => button.onclick = () => {
    const seat = button.dataset.office;
    booking.office = booking.office.includes(seat) ? booking.office.filter((item) => item !== seat) : [...booking.office, seat];
    renderExtrasStep();
  });
  $("#backToSeats").onclick = renderSeatStep;
  $("#toCustomerDetails").onclick = () => {
    booking.water = Math.max(0, Math.min(20, Number($("#waterCount").value) || 0));
    booking.popcorn = Math.max(0, Math.min(20, Number($("#popcornCount").value) || 0));
    renderCustomerDetailsStep();
  };
}
function renderCustomerDetailsStep() {
  const movie = getMovie(booking.movieId);
  showModal(`
    <p class="eyebrow">4. SOLIS NO 4</p><h2 id="modalTitle">Tavi dati un apstiprinājums</h2>
    <p class="modal-intro">Ievadi kontaktinformāciju rezervācijas apstiprinājumam.</p>
    <div class="form-grid">
      <div class="field"><label for="customerName">Vārds</label><input id="customerName" maxlength="70" required placeholder="Tavs vārds"></div>
      <div class="field"><label for="customerEmail">E-pasts</label><input id="customerEmail" type="email" required placeholder="vards@example.com"></div>
    </div>
    <div class="summary-box">
      <div class="summary-line"><span>Filma</span><b>${escapeHTML(movie.title)}</b></div>
      <div class="summary-line"><span>Seanss</span><b>${formatDate(booking.date)} · ${escapeHTML(booking.time)}</b></div>
      <div class="summary-line"><span>Vietas</span><b>${booking.seats.map(escapeHTML).join(", ")}</b></div>
      <div class="summary-line"><span>Biroja krēsli / uzkodas</span><b>${booking.office.length} · ${booking.water} ūdens · ${booking.popcorn} popkorns</b></div>
      <div class="summary-line total"><span>Kopā</span><b>${money(bookingTotal())}</b></div>
    </div>
    <p class="admin-note">Klients var atcelt rezervāciju līdz 24 stundām pirms seansa sākuma. Pēc šī termiņa atcelšanu var veikt tikai administrators.</p>
    <div class="modal-actions"><button class="button button-secondary" id="backToExtras">← Atpakaļ</button><button class="small-button" id="confirmBooking">Apstiprināt rezervāciju</button></div>
  `);
  $("#backToExtras").onclick = renderExtrasStep;
  $("#confirmBooking").onclick = () => {
    const name = $("#customerName").value.trim();
    const email = $("#customerEmail").value.trim();
    if (!name || !$("#customerEmail").checkValidity()) { toast("Lūdzu, ievadi derīgu vārdu un e-pastu."); return; }
    const alreadyTaken = reservedSeats();
    if (booking.seats.some((seat) => alreadyTaken.includes(seat))) {
      toast("Viena no vietām tikko tika rezervēta. Izvēlies vietas vēlreiz.");
      renderSeatStep();
      return;
    }
    const reservation = {
      id: "DFC-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      movieId: booking.movieId, date: booking.date, time: booking.time,
      count: booking.count, mode: booking.mode, seats: [...booking.seats],
      office: [...booking.office], water: booking.water, popcorn: booking.popcorn,
      name, email, total: bookingTotal(), createdAt: new Date().toISOString(), status: "confirmed"
    };
    bookings.push(reservation);
    writeStore(STORE.bookings, bookings);
    renderConfirmation(reservation);
  };
}
function renderConfirmation(reservation) {
  showModal(`
    <div style="text-align:center;padding:12px 0">
      <div style="font-size:46px">🎟️</div><p class="eyebrow">REZERVĀCIJA APSTIPRINĀTA</p>
      <h2 id="modalTitle">Tiekamies kinoteātrī!</h2>
      <p class="modal-intro">Tava demonstrācijas rezervācija ir saglabāta šajā pārlūkā.</p>
      <div class="summary-box" style="text-align:left">
        <div class="summary-line"><span>Rezervācijas numurs</span><b>${escapeHTML(reservation.id)}</b></div>
        <div class="summary-line"><span>Filma</span><b>${escapeHTML(getMovie(reservation.movieId)?.title || "Filma")}</b></div>
        <div class="summary-line"><span>Seanss</span><b>${formatDate(reservation.date)} · ${escapeHTML(reservation.time)}</b></div>
        <div class="summary-line"><span>Vietas</span><b>${reservation.seats.map(escapeHTML).join(", ")}</b></div>
        <div class="summary-line total"><span>Kopā</span><b>${money(reservation.total)}</b></div>
      </div>
      <p class="admin-note">Šī ir demonstrācijas rezervācija, nevis apmaksāts maksājums. Reālam kinoteātrim jāpievieno servera datubāze un maksājumu sistēma.</p>
      <button class="small-button" data-close style="width:100%;margin-top:12px">Aizvērt</button>
    </div>
  `);
  toast("Rezervācija saglabāta!");
}
function renderCustomerBookings(email) {
  const own = bookings.filter((item) => item.email.toLowerCase() === email.toLowerCase());
  const target = $("#customerBookings");
  target.dataset.email = email;
  target.innerHTML = own.length ? own.map((item) => `
    <div class="booking-card">
      <div><strong>${escapeHTML(getMovie(item.movieId)?.title || "Filma")} · ${escapeHTML(item.id)}</strong>
        <small>${formatDate(item.date)} · ${escapeHTML(item.time)} · ${item.seats.map(escapeHTML).join(", ")} · ${money(item.total)}</small>
        <small>Statuss: ${item.status === "cancelled" ? "Atcelta" : "Apstiprināta"}</small>
      </div>
      ${item.status === "confirmed" ? `<button class="danger-button" data-cancel-booking="${escapeHTML(item.id)}">Atcelt</button>` : ""}
    </div>`
  ).join("") : '<p class="admin-note">Šim e-pastam rezervācijas nav atrastas šajā pārlūkā.</p>';
  document.querySelectorAll("[data-cancel-booking]").forEach((button) => button.onclick = () => cancelBooking(button.dataset.cancelBooking, false));
}
function cancelBooking(id, isAdmin) {
  const item = bookings.find((reservation) => reservation.id === id);
  if (!item || item.status === "cancelled") return;
  const screeningStart = new Date(item.date + "T" + item.time + ":00");
  const hoursLeft = (screeningStart.getTime() - Date.now()) / 3600000;
  if (!isAdmin && hoursLeft < 24) {
    toast("Klients var atcelt rezervāciju tikai līdz 24 stundām pirms seansa.");
    return;
  }
  if (!window.confirm("Vai tiešām atcelt rezervāciju " + id + "?")) return;
  item.status = "cancelled";
  writeStore(STORE.bookings, bookings);
  toast("Rezervācija atcelta. Vietas atkal ir pieejamas.");
  if ($("#customerBookings").dataset.email) renderCustomerBookings($("#customerBookings").dataset.email);
  if (adminIsLoggedIn) renderAdminTab();
}

async function derivePassword(password, salt) {
  const encoder = new TextEncoder();
  const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(salt), iterations: 150000, hash: "SHA-256" }, material, 256);
  return Array.from(new Uint8Array(bits)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function openAdmin() {
  if (!readStore(STORE.admin, null)) renderAdminSetup();
  else renderAdminLogin();
}
function renderAdminSetup() {
  showModal(`
    <p class="eyebrow">PIRMĀ PALAIŠANA</p><h2 id="modalTitle">Izveido administratora kontu</h2>
    <p class="modal-intro">Administratora lietotājvārds pēc noklusējuma ir <b>admin</b>. Izveido jaunu paroli, ko neizmanto citur.</p>
    <div class="form-grid">
      <div class="field full"><label for="setupUsername">Lietotājvārds</label><input id="setupUsername" value="admin" maxlength="30"></div>
      <div class="field full"><label for="setupPassword">Jauna parole (vismaz 10 rakstzīmes)</label><input id="setupPassword" type="password" minlength="10" autocomplete="new-password"></div>
      <div class="field full"><label for="setupPasswordAgain">Atkārto paroli</label><input id="setupPasswordAgain" type="password" autocomplete="new-password"></div>
    </div>
    <p class="admin-note">Šī GitHub versija ir lokāla demonstrācija: konts un dati tiek glabāti tikai šajā pārlūkā. Publiskai vietnei nepieciešama servera autentifikācija, piemēram, Supabase Auth.</p>
    <div class="modal-actions"><button class="button button-secondary" data-close>Atcelt</button><button class="small-button" id="createAdmin">Izveidot kontu</button></div>
  `);
  $("#createAdmin").onclick = async () => {
    const username = $("#setupUsername").value.trim();
    const password = $("#setupPassword").value;
    const again = $("#setupPasswordAgain").value;
    if (!username || password.length < 10) { toast("Parolei jābūt vismaz 10 rakstzīmes garai."); return; }
    if (password !== again) { toast("Paroles nesakrīt."); return; }
    const salt = randomSalt();
    const hash = await derivePassword(password, salt);
    writeStore(STORE.admin, { username, salt, hash });
    adminIsLoggedIn = true;
    renderAdminDashboard();
  };
}
function renderAdminLogin() {
  showModal(`
    <p class="eyebrow">DANCING FRUIT CINEMA</p><h2 id="modalTitle">Administratora pieslēgšanās</h2>
    <p class="modal-intro">Ievadi administratora konta datus.</p>
    <div class="form-grid">
      <div class="field full"><label for="adminUsername">Lietotājvārds</label><input id="adminUsername" autocomplete="username" value="admin"></div>
      <div class="field full"><label for="adminPassword">Parole</label><input id="adminPassword" type="password" autocomplete="current-password"></div>
    </div>
    <p class="admin-note">Atver šo logu ar Ctrl + Shift + Alt + P. Dažās tastatūrās Fn taustiņu pārlūks neatpazīst, tāpēc tas nav vajadzīgs.</p>
    <div class="modal-actions"><button class="button button-secondary" data-close>Aizvērt</button><button class="small-button" id="adminLoginButton">Pieteikties</button></div>
  `);
  const submit = async () => {
    const stored = readStore(STORE.admin, null);
    const username = $("#adminUsername").value.trim();
    const password = $("#adminPassword").value;
    if (!stored || username !== stored.username || await derivePassword(password, stored.salt) !== stored.hash) {
      toast("Nepareizs lietotājvārds vai parole.");
      return;
    }
    adminIsLoggedIn = true;
    renderAdminDashboard();
  };
  $("#adminLoginButton").onclick = submit;
  $("#adminPassword").addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); });
}
function renderAdminDashboard() {
  showModal(`
    <p class="eyebrow">DANCING FRUIT CINEMA · ADMIN</p><h2 id="modalTitle">Administrācijas panelis</h2>
    <p class="modal-intro">Pārvaldi filmas, seansus, rezervācijas un cenas.</p>
    <div class="admin-wrap">
      <aside class="admin-side">
        <button class="active" data-admin-tab="movies">🎬 Filmas un seansi</button>
        <button data-admin-tab="bookings">🎟️ Rezervācijas</button>
        <button data-admin-tab="prices">€ Cenas</button>
        <button data-admin-tab="account">⚙ Konts</button>
      </aside>
      <div class="admin-panel" id="adminPanel"></div>
    </div>
    <div class="modal-actions"><span class="admin-note">Lokālā demonstrācijas administrācija</span><button class="button button-secondary" id="adminLogout">Izrakstīties</button></div>
  `);
  document.querySelectorAll("[data-admin-tab]").forEach((button) => button.onclick = () => {
    adminTab = button.dataset.adminTab;
    document.querySelectorAll("[data-admin-tab]").forEach((item) => item.classList.toggle("active", item === button));
    renderAdminTab();
  });
  $("#adminLogout").onclick = () => { adminIsLoggedIn = false; closeModal(); toast("Izrakstījies no administrācijas."); };
  renderAdminTab();
}
function renderAdminTab() {
  if (!adminIsLoggedIn) return;
  const panel = $("#adminPanel");
  if (!panel) return;
  if (adminTab === "movies") renderAdminMovies(panel);
  if (adminTab === "bookings") renderAdminBookings(panel);
  if (adminTab === "prices") renderAdminPrices(panel);
  if (adminTab === "account") renderAdminAccount(panel);
}
function renderAdminMovies(panel) {
  panel.innerHTML = `
    <h3>Filmu pārvaldība</h3>
    <button class="small-button" id="addMovieButton">+ Pievienot filmu</button>
    <div style="height:12px"></div>
    ${movies.map((movie) => `
      <div class="admin-item"><div><b>${escapeHTML(movie.title)}</b><small>${escapeHTML(movie.genre)} · ${movie.screenings.length} seansi/datumi</small></div><div><button class="small-button" data-edit-movie="${escapeHTML(movie.id)}">Rediģēt</button> <button class="danger-button" data-delete-movie="${escapeHTML(movie.id)}">Dzēst</button></div></div>
    `).join("") || "<p class='admin-note'>Pagaidām nav nevienas filmas.</p>"}
    <p class="admin-note">Seansu ievadi formātā <code>GGGG-MM-DD:14:00,17:00</code>, katru datumu jaunā rindā. Piemēram, vari pievienot vairākas dienas un vairākus laikus vienā dienā.</p>
  `;
  $("#addMovieButton").onclick = () => renderMovieEditor(null);
  document.querySelectorAll("[data-edit-movie]").forEach((button) => button.onclick = () => renderMovieEditor(button.dataset.editMovie));
  document.querySelectorAll("[data-delete-movie]").forEach((button) => button.onclick = () => {
    const movie = getMovie(button.dataset.deleteMovie);
    if (!movie || !confirm('Dzēst filmu "' + movie.title + '"?')) return;
    movies = movies.filter((item) => item.id !== movie.id);
    writeStore(STORE.movies, movies);
    renderAdminTab(); renderMovies(); toast("Filma izdzēsta.");
  });
}
function renderMovieEditor(movieId) {
  const movie = movieId ? getMovie(movieId) : null;
  const scheduleText = (movie?.screenings || []).map((showing) => showing.date + ":" + showing.times.join(",")).join("\n");
  const html = `
    <p class="eyebrow">${movie ? "FILMAS REDIĢĒŠANA" : "JAUNA FILMA"}</p>
    <h2 id="modalTitle">${movie ? "Rediģēt filmu" : "Pievienot filmu"}</h2>
    <div class="form-grid" style="margin-top:18px">
      <div class="field full"><label for="movieTitle">Filmas nosaukums</label><input id="movieTitle" maxlength="100" value="${escapeHTML(movie?.title || "")}"></div>
      <div class="field"><label for="movieGenre">Žanrs</label><select id="movieGenre">${["Animācija","Komēdija","Piedzīvojumi","Drāma","Fantāzija","Cits"].map((genre) => `<option ${movie?.genre === genre ? "selected" : ""}>${genre}</option>`).join("")}</select></div>
      <div class="field"><label for="movieDuration">Ilgums (minūtēs)</label><input id="movieDuration" type="number" min="1" max="500" value="${escapeHTML(movie?.duration || 90)}"></div>
      <div class="field"><label for="movieAge">Vecuma ierobežojums</label><input id="movieAge" value="${escapeHTML(movie?.age || "U")}" placeholder="U, 7+, 12+"></div>
      <div class="field"><label for="movieYear">Izlaiduma gads</label><input id="movieYear" type="number" min="1900" max="2100" value="${escapeHTML(movie?.year || new Date().getFullYear())}"></div>
      <div class="field"><label for="movieEmoji">Plakāta simbols</label><input id="movieEmoji" maxlength="5" value="${escapeHTML(movie?.emoji || "🎬")}"></div>
      <div class="field"><label for="moviePoster">Plakāta fona CSS krāsa</label><input id="moviePoster" value="${escapeHTML(movie?.poster || "linear-gradient(135deg,#753039,#182838")}"></div>
      <div class="field full"><label for="movieDescription">Apraksts</label><input id="movieDescription" maxlength="350" value="${escapeHTML(movie?.description || "")}"></div>
      <div class="field full"><label for="movieSchedule">Seansi (katru datumu jaunā rindā)</label><textarea id="movieSchedule" rows="5" style="background:#100b0c;color:white;border:1px solid #493034;border-radius:7px;padding:11px;font:12px monospace">${escapeHTML(scheduleText)}</textarea></div>
    </div>
    <div class="modal-actions"><button class="button button-secondary" id="cancelMovieEdit">Atpakaļ</button><button class="small-button" id="saveMovie">Saglabāt filmu</button></div>
  `;
  $("#adminPanel").innerHTML = html;
  $("#cancelMovieEdit").onclick = renderAdminTab;
  $("#saveMovie").onclick = () => {
    const title = $("#movieTitle").value.trim();
    const description = $("#movieDescription").value.trim();
    const duration = Number($("#movieDuration").value);
    if (!title || !description || !Number.isFinite(duration) || duration < 1) { toast("Aizpildi filmas nosaukumu, aprakstu un derīgu ilgumu."); return; }
    const screenings = $("#movieSchedule").value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const splitAt = line.indexOf(":");
      if (splitAt < 0) throw new Error("Nepareizs seansa formāts.");
      const date = line.slice(0, splitAt).trim();
      const times = line.slice(splitAt + 1).split(",").map((time) => time.trim()).filter(Boolean);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || times.some((time) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(time))) throw new Error("Pārbaudi datumu un laiku formātu.");
      return { date, times: [...new Set(times)].sort() };
    });
    try {
      const data = {
        id: movie?.id || "movie-" + crypto.randomUUID(),
        title, description, duration,
        genre: $("#movieGenre").value,
        age: $("#movieAge").value.trim() || "U",
        year: Number($("#movieYear").value) || new Date().getFullYear(),
        emoji: $("#movieEmoji").value || "🎬",
        poster: $("#moviePoster").value || "linear-gradient(135deg,#753039,#182838)",
        screenings
      };
      if (movie) movies = movies.map((item) => item.id === movie.id ? data : item);
      else movies.push(data);
      writeStore(STORE.movies, movies);
      renderAdminTab(); renderMovies(); toast("Filma saglabāta.");
    } catch (error) {
      toast(error.message || "Neizdevās saglabāt filmu.");
    }
  };
}
function renderAdminBookings(panel) {
  panel.innerHTML = `<h3>Rezervācijas (${bookings.length})</h3>${bookings.length ? bookings.map((item) => `
    <div class="admin-item"><div><b>${escapeHTML(item.id)} · ${escapeHTML(item.name)}</b><small>${escapeHTML(getMovie(item.movieId)?.title || "Dzēsta filma")} · ${formatDate(item.date)} · ${escapeHTML(item.time)} · ${item.seats.map(escapeHTML).join(", ")}</small><small>${escapeHTML(item.email)} · ${money(item.total)} · ${item.status === "cancelled" ? "Atcelta" : "Apstiprināta"}</small></div>${item.status === "confirmed" ? `<button class="danger-button" data-admin-cancel="${escapeHTML(item.id)}">Atcelt</button>` : '<span class="muted">Atcelta</span>'}</div>
  `).join("") : "<p class='admin-note'>Vēl nav rezervāciju.</p>"}
  `;
  document.querySelectorAll("[data-admin-cancel]").forEach((button) => button.onclick = () => cancelBooking(button.dataset.adminCancel, true));
}
function renderAdminPrices(panel) {
  panel.innerHTML = `
    <h3>Cenu iestatījumi</h3>
    <div class="form-grid">
      <div class="field"><label for="priceTicket">Standarta biļete (€)</label><input id="priceTicket" type="number" min="0" step="0.01" value="${prices.ticket.toFixed(2)}"></div>
      <div class="field"><label for="priceCustom">Vietas izvēle par rezervāciju (€)</label><input id="priceCustom" type="number" min="0" step="0.01" value="${prices.custom.toFixed(2)}"></div>
      <div class="field"><label for="priceOffice">Biroja krēsla uzlabojums (€)</label><input id="priceOffice" type="number" min="0" step="0.01" value="${prices.office.toFixed(2)}"></div>
      <div class="field"><label for="priceWater">Ūdens (€)</label><input id="priceWater" type="number" min="0" step="0.01" value="${prices.water.toFixed(2)}"></div>
      <div class="field"><label for="pricePopcorn">Popkorns (€)</label><input id="pricePopcorn" type="number" min="0" step="0.01" value="${prices.popcorn.toFixed(2)}"></div>
    </div>
    <button class="small-button" id="savePrices" style="margin-top:16px">Saglabāt cenas</button>
  `;
  $("#savePrices").onclick = () => {
    prices = {
      ticket: moneyInput($("#priceTicket").value),
      custom: moneyInput($("#priceCustom").value),
      office: moneyInput($("#priceOffice").value),
      water: moneyInput($("#priceWater").value),
      popcorn: moneyInput($("#pricePopcorn").value)
    };
    writeStore(STORE.prices, prices);
    renderMovies();
    toast("Cenas saglabātas.");
  };
}
function renderAdminAccount(panel) {
  panel.innerHTML = `
    <h3>Administratora konts</h3>
    <p class="admin-note">Pieteicies kā administrators. Šī demonstrācijas konta dati glabājas šī pārlūka lokālajā krātuvē.</p>
    <div class="field"><label for="newAdminPassword">Jauna parole (vismaz 10 rakstzīmes)</label><input id="newAdminPassword" type="password" minlength="10"></div>
    <button class="small-button" id="changeAdminPassword" style="margin-top:12px">Mainīt paroli</button>
  `;
  $("#changeAdminPassword").onclick = async () => {
    const password = $("#newAdminPassword").value;
    if (password.length < 10) { toast("Parolei jābūt vismaz 10 rakstzīmes garai."); return; }
    const account = readStore(STORE.admin, null);
    account.salt = randomSalt();
    account.hash = await derivePassword(password, account.salt);
    writeStore(STORE.admin, account);
    $("#newAdminPassword").value = "";
    toast("Administratora parole nomainīta.");
  };
}

document.addEventListener("click", (event) => {
  const bookButton = event.target.closest("[data-book]");
  if (bookButton) openBooking(bookButton.dataset.book);
  if (event.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (event) => {
  // Fn is handled by many keyboards before the browser receives the key event.
  if (event.ctrlKey && event.shiftKey && event.altKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    openAdmin();
  }
  if (event.key === "Escape" && !$("#modalBackdrop").classList.contains("hidden")) closeModal();
});
$("#modalClose").addEventListener("click", closeModal);
$("#modalBackdrop").addEventListener("click", closeOnBackdrop);
$("#movieSearch").addEventListener("input", renderMovies);
$("#genreFilters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-genre]");
  if (button) setGenre(button.dataset.genre);
});
$("#bookingLookup").addEventListener("submit", (event) => {
  event.preventDefault();
  renderCustomerBookings($("#lookupEmail").value.trim());
});
$("#menuToggle").addEventListener("click", () => $("#mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach((link) => link.addEventListener("click", () => $("#mainNav").classList.remove("open")));

renderAll();
