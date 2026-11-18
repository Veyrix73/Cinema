const $ = (selector) => document.querySelector(selector);
const API = "/api";
const DICT = {
  lv: {
    navHome:"Sākums",navMovies:"Filmas",navSeats:"Sēdvietas",navBookings:"Manas rezervācijas",buyTicket:"Pirkt biļeti",
    heroEyebrow:"TAVS MĀJĪGAIS KINO PIEDZĪVOJUMS",heroTitle:"Filmu vakari,<br><em>citā līmenī.</em>",heroText:"Izvēlies filmu, rezervē savu vietu un izbaudi kino savā ritmā — arī īpaši ērtā gultas tipa sēdvietā.",
    browseMovies:"Apskatīt filmas",ticketsFrom:"Standarta biļetes no",statTicket:"Standarta biļete",statMax:"6 gultas vietas + 1 biroja krēsls",statCancel:"Klienta atcelšanas termiņš",statSnacks:"Popkorns un ūdens",
    moviesEyebrow:"IZVĒLIES SAVU NĀKAMO FILMU",moviesTitle:"Šobrīd kinoteātrī",searchMovies:"Meklēt filmu...",filterAll:"Visas filmas",filterAnimation:"Animācija",filterComedy:"Komēdija",filterAdventure:"Piedzīvojumi",emptyMovies:"Filmas netika atrastas.",
    comfortEyebrow:"ĒRTĪBA PĒC TAVAS IZVĒLES",comfortTitle:"Ne tikai krēsls.<br><em>Tavs kino stils.</em>",comfortText:"Zālē ir sešas gultas tipa vietas un viens atsevišķs biroja krēsls. Kopā pieejamas 7 vietas; bez biroja krēsla — 6.",
    featureBeds:"Gultas tipa vietas",featureBedsDesc:"6 vietas zālē",featureSelect:"Vietas izvēle",featureSelectDesc:"0,10 € par rezervāciju",featureChair:"Biroja krēsls",featureChairDesc:"Atsevišķā 7. vieta",
    bookingEyebrow:"TAVAS BIĻETES VIENUViet",bookingTitle:"Manas rezervācijas",bookingLookupHelp:"Ievadi rezervācijas kodu un e-pastu, ko izmantoji rezervācijā.",bookingCode:"Rezervācijas kods",yourEmail:"Tavs e-pasts",lookupButton:"Apskatīt rezervāciju",
    footerText:"Dancing Fruit Cinema © 2026 · Visas tiesības aizsargātas.",
    noShows:"Šai filmai pašlaik nav pieejamu seansu.",step1:"1. SOLIS NO 4",step2:"2. SOLIS NO 4",step3:"3. SOLIS NO 4",step4:"4. SOLIS NO 4",bookTickets:"Rezervē biļetes",date:"Seansa datums",time:"Seansa laiks",ticketCount:"Vietu skaits (maks. 7: 6 gultas + 1 biroja krēsls)",continue:"Turpināt →",cancel:"Atcelt",chooseSeats:"Izvēlies sēdvietas",
    seatIntro:"Zālē ir 6 gultas tipa vietas un viens atsevišķs biroja krēsls. Kopā ne vairāk kā 7 cilvēki. Automātiska vietu piešķiršana ir bez maksas, bet konkrētu vietu izvēle maksā",auto:"Automātiska izvēle",autoDesc:"Bez papildu maksas",custom:"Izvēlēties pašam",customDesc:"par rezervāciju",screen:"KINOTEĀTRA EKRĀNS",available:"Brīva",occupied:"Aizņemta",selected:"Izvēlēta",bedSeat:"Gultas tipa vieta",chosenSeats:"Izvēlētās vietas",needSeats:"Jāizvēlas tieši",seats:"vietas.",selectOnly:"Vari izvēlēties tikai",seats2:"vietas.",notEnough:"Šajā seansā nav pietiekami daudz brīvu vietu.",
    extras:"Papildu iespējas",extrasIntro:"Pievieno ūdeni vai popkornu. Biroja krēsls ir atsevišķa 7. vieta, nevis gultas vietas uzlabojums.",chairUpgrade:"Biroja krēsls",water:"Ūdens",popcorn:"Popkorns",portion:"porcija",beds:"Gultas tipa vieta",summary:"Kopsavilkums",tickets:"Biļetes",seatSelection:"Vietas izvēle",officeChairs:"Biroja krēsls",snacks:"Ūdens un popkorns",total:"Kopā",
    details:"Tavi dati un apstiprinājums",detailsIntro:"Ievadi kontaktinformāciju rezervācijas apstiprinājumam.",name:"Vārds",email:"E-pasts",cancellationRule:"Klients var atcelt rezervāciju līdz 24 stundām pirms seansa sākuma. Pēc šī termiņa atcelšanu var veikt tikai administrators.",back:"← Atpakaļ",confirm:"Apstiprināt rezervāciju",validDetails:"Lūdzu, ievadi derīgu vārdu un e-pastu.",seatRace:"Viena no vietām tikko tika rezervēta. Izvēlies vietas vēlreiz.",confirmedEyebrow:"REZERVĀCIJA APSTIPRINĀTA",confirmed:"Tiekamies kinoteātrī!",savedBrowser:"Tava rezervācija ir saglabāta serverī.",bookingNumber:"Rezervācijas numurs",screening:"Seanss",close:"Aizvērt",demoPayment:"Rezervācija ir saglabāta, bet tiešsaistes maksājums nav pieslēgts. Apmaksa jāveic kinoteātrī.",
    lookupMissing:"Ievadi rezervācijas kodu un e-pastu.",lookupNo:"Rezervācija ar šādu kodu un e-pastu nav atrasta.",statusConfirmed:"Apstiprināta",statusCancelled:"Atcelta",cancelBooking:"Atcelt rezervāciju",cancelConfirm:"Vai tiešām atcelt šo rezervāciju?",cancelled:"Rezervācija atcelta. Vietas atkal ir pieejamas.",cancelTooLate:"Klienta atcelšana iespējama tikai līdz 24 stundām pirms seansa.",
    adminLogin:"Administratora pieslēgšanās",adminIntro:"Ievadi serverī izveidotā administratora konta datus.",username:"Lietotājvārds",password:"Parole",login:"Pieteikties",badLogin:"Nepareizs lietotājvārds vai parole.",adminHint:"Atver šo logu ar Ctrl + Shift + Alt + P. Fn taustiņu pārlūks parasti nevar noteikt, tāpēc tas nav vajadzīgs.",
    adminTitle:"Administrācijas panelis",adminIntro2:"Pārvaldi filmas, seansus, rezervācijas un cenas.",tabMovies:"🎬 Filmas un seansi",tabBookings:"🎟️ Rezervācijas",tabPrices:"€ Cenas",tabAccount:"⚙ Konts",logout:"Izrakstīties",adminSession:"Administratora sesija",addMovie:"+ Pievienot filmu",edit:"Rediģēt",delete:"Dzēst",noMovies:"Pagaidām nav filmu.",movieTitle:"Filmas nosaukums",genre:"Žanrs",duration:"Ilgums (minūtēs)",ageRating:"Vecuma ierobežojums",year:"Izlaiduma gads",posterEmoji:"Plakāta simbols",posterUrl:"Filmas plakāta attēla saite (HTTPS)",posterUpload:"Augšupielādēt plakātu",posterRemove:"Noņemt plakātu",posterPreview:"Plakāta priekšskatījums",posterUploadHelp:"Izvēlies JPG, PNG vai WebP attēlu. Tas tiks samazināts un saglabāts kopā ar filmu.",posterBackground:"Plakāta fona CSS krāsa",description:"Apraksts",schedule:"Seansi (katru datumu jaunā rindā)",scheduleHelp:"Formāts: GGGG-MM-DD:14:00,17:00 — katru datumu raksti jaunā rindā.",save:"Saglabāt",movieRequired:"Aizpildi nosaukumu, aprakstu un derīgu ilgumu.",invalidSchedule:"Pārbaudi seansu datumu un laiku formātu.",movieSaved:"Filma saglabāta.",movieDeleted:"Filma noņemta no publiskā saraksta.",deleteMovieConfirm:"Noņemt šo filmu no publiskā saraksta?",bookingList:"Visas rezervācijas",noBookings:"Vēl nav rezervāciju.",priceTitle:"Cenu iestatījumi",priceTicket:"Standarta biļete (€)",priceCustom:"Vietas izvēle par rezervāciju (€)",priceOffice:"Biroja krēsla uzlabojums (€)",priceWater:"Ūdens (€)",pricePopcorn:"Popkorns (€)",savePrices:"Saglabāt cenas",pricesSaved:"Cenas saglabātas.",changePassword:"Mainīt administratora paroli",currentPassword:"Pašreizējā parole",newPassword:"Jaunā parole (vismaz 12 rakstzīmes)",passwordChanged:"Parole nomainīta.",passwordMin:"Jaunajai parolei jābūt vismaz 12 rakstzīmēm.",wrongCurrent:"Pašreizējā parole nav pareiza.",serverError:"Serveris pašlaik nav pieejams. Pārbaudi servera iestatījumus.",loading:"Ielādē...",bookNow:"Pirkt biļeti",min:"min",bookingSearchSuccess:"Rezervācija atrasta.",emptyScreenings:"Nav pievienotu seansu.",officeSeatShort:"Biroja krēsls",bedSeatShort:"Gultas vieta",tabDashboard:"⌂ Pārskats",dashboardWelcome:"Šodienas kino pārskats",dashboardMovies:"Aktīvas filmas",dashboardScreenings:"Turpmākie seansi",dashboardBookings:"Apstiprinātas rezervācijas",dashboardValue:"Rezervāciju summa",latestBookings:"Jaunākās rezervācijas",searchBookings:"Meklēt kodu, vārdu, e-pastu vai filmu",allStatuses:"Visi statusi",exportBookings:"Eksportēt CSV",noFilterBookings:"Pēc šiem filtriem rezervāciju nav.",payAtCinema:"Apmaksa kinoteātrī",paymentDue:"Maksājums tiks veikts uz vietas. Karte netiks iekasēta tiešsaistē.",printTicket:"Drukāt biļeti"
  },
  en: {
    navHome:"Home",navMovies:"Movies",navSeats:"Seating",navBookings:"My bookings",buyTicket:"Book a ticket",
    heroEyebrow:"YOUR COSY CINEMA EXPERIENCE",heroTitle:"Movie nights,<br><em>on another level.</em>",heroText:"Choose a movie, reserve your spot and enjoy cinema your way — including a comfy bed-style seat.",
    browseMovies:"Browse movies",ticketsFrom:"Standard tickets from",statTicket:"Standard ticket",statMax:"6 bed seats + 1 office chair",statCancel:"Customer cancellation deadline",statSnacks:"Popcorn and water",
    moviesEyebrow:"FIND YOUR NEXT MOVIE",moviesTitle:"Now showing",searchMovies:"Search movies...",filterAll:"All movies",filterAnimation:"Animation",filterComedy:"Comedy",filterAdventure:"Adventure",emptyMovies:"No movies found.",
    comfortEyebrow:"COMFORT, YOUR WAY",comfortTitle:"More than a chair.<br><em>Your cinema style.</em>",comfortText:"The room has six bed-style seats and one separate office chair. That is seven seats total, or six without the office chair.",
    featureBeds:"Bed-style seats",featureBedsDesc:"6 seats in the room",featureSelect:"Custom seat selection",featureSelectDesc:"€0.10 per booking",featureChair:"Office chair",featureChairDesc:"Separate seventh seat",
    bookingEyebrow:"YOUR TICKETS IN ONE PLACE",bookingTitle:"My bookings",bookingLookupHelp:"Enter the booking code and the email address used for the reservation.",bookingCode:"Booking code",yourEmail:"Your email",lookupButton:"Find booking",
    footerText:"Dancing Fruit Cinema © 2026 · All rights reserved.",
    noShows:"There are no available screenings for this movie.",step1:"STEP 1 OF 4",step2:"STEP 2 OF 4",step3:"STEP 3 OF 4",step4:"STEP 4 OF 4",bookTickets:"Book tickets",date:"Screening date",time:"Screening time",ticketCount:"Number of seats (max 7: 6 beds + 1 office chair)",continue:"Continue →",cancel:"Cancel",chooseSeats:"Choose your seats",
    seatIntro:"The room has six bed-style seats and one separate office chair: seven people maximum. Automatic assignment is free; choosing exact seats costs",auto:"Automatic assignment",autoDesc:"No extra charge",custom:"Choose seats myself",customDesc:"per booking",screen:"CINEMA SCREEN",available:"Available",occupied:"Occupied",selected:"Selected",bedSeat:"Bed-style seat",chosenSeats:"Selected seats",needSeats:"Choose exactly",seats:"seats.",selectOnly:"You can select only",seats2:"seats.",notEnough:"There are not enough available seats for this screening.",
    extras:"Optional extras",extrasIntro:"Add water or popcorn. The office chair is a separate seventh seat, not an upgrade to a bed seat.",chairUpgrade:"Office chair",water:"Water",popcorn:"Popcorn",portion:"portion",beds:"Bed-style seat",summary:"Summary",tickets:"Tickets",seatSelection:"Seat selection",officeChairs:"Office chair",snacks:"Water and popcorn",total:"Total",
    details:"Your details and confirmation",detailsIntro:"Enter your contact details for the booking confirmation.",name:"Name",email:"Email",cancellationRule:"Customers can cancel up to 24 hours before the screening starts. After that, only an administrator can cancel.",back:"← Back",confirm:"Confirm booking",validDetails:"Please enter a valid name and email address.",seatRace:"One of those seats was just booked. Please choose seats again.",confirmedEyebrow:"BOOKING CONFIRMED",confirmed:"See you at the cinema!",savedBrowser:"Your reservation has been saved on the server.",bookingNumber:"Booking reference",screening:"Screening",close:"Close",demoPayment:"Your reservation is saved, but online payments are not connected. Payment is due at the cinema.",
    lookupMissing:"Enter the booking code and email address.",lookupNo:"No booking was found for that code and email.",statusConfirmed:"Confirmed",statusCancelled:"Cancelled",cancelBooking:"Cancel booking",cancelConfirm:"Are you sure you want to cancel this booking?",cancelled:"Booking cancelled. The seats are available again.",cancelTooLate:"Customers can only cancel up to 24 hours before the screening.",
    adminLogin:"Administrator login",adminIntro:"Enter the administrator account configured on the server.",username:"Username",password:"Password",login:"Log in",badLogin:"Incorrect username or password.",adminHint:"Open this window with Ctrl + Shift + Alt + P. Browsers usually cannot detect the Fn key, so it is not needed.",
    adminTitle:"Admin dashboard",adminIntro2:"Manage movies, screenings, bookings and prices.",tabMovies:"🎬 Movies & screenings",tabBookings:"🎟️ Bookings",tabPrices:"€ Prices",tabAccount:"⚙ Account",logout:"Log out",adminSession:"Administrator session",addMovie:"+ Add movie",edit:"Edit",delete:"Remove",noMovies:"There are no movies yet.",movieTitle:"Movie title",genre:"Genre",duration:"Duration (minutes)",ageRating:"Age rating",year:"Release year",posterEmoji:"Poster symbol",posterUrl:"Poster image URL (HTTPS)",posterUpload:"Upload poster image",posterRemove:"Remove poster",posterPreview:"Poster preview",posterUploadHelp:"Choose a JPG, PNG or WebP image. It will be resized and saved with the movie.",posterBackground:"Poster background CSS colour",description:"Description",schedule:"Screenings (one date per line)",scheduleHelp:"Format: YYYY-MM-DD:14:00,17:00 — put each date on a new line.",save:"Save",movieRequired:"Enter a title, description and valid duration.",invalidSchedule:"Check the screening date and time format.",movieSaved:"Movie saved.",movieDeleted:"Movie removed from the public list.",deleteMovieConfirm:"Remove this movie from the public list?",bookingList:"All bookings",noBookings:"There are no bookings yet.",priceTitle:"Price settings",priceTicket:"Standard ticket (€)",priceCustom:"Custom seat selection per booking (€)",priceOffice:"Office chair upgrade (€)",priceWater:"Water (€)",pricePopcorn:"Popcorn (€)",savePrices:"Save prices",pricesSaved:"Prices saved.",changePassword:"Change admin password",currentPassword:"Current password",newPassword:"New password (at least 12 characters)",passwordChanged:"Password changed.",passwordMin:"The new password must be at least 12 characters.",wrongCurrent:"The current password is incorrect.",serverError:"The server is currently unavailable. Check the server setup.",loading:"Loading...",bookNow:"Book ticket",min:"min",bookingSearchSuccess:"Booking found.",emptyScreenings:"No screenings added.",officeSeatShort:"Office chair",bedSeatShort:"Bed seat",tabDashboard:"⌂ Overview",dashboardWelcome:"Your cinema at a glance",dashboardMovies:"Active movies",dashboardScreenings:"Upcoming screenings",dashboardBookings:"Confirmed bookings",dashboardValue:"Booking value",latestBookings:"Latest bookings",searchBookings:"Search code, name, email or movie",allStatuses:"All statuses",exportBookings:"Export CSV",noFilterBookings:"No bookings match these filters.",payAtCinema:"Pay at the cinema",paymentDue:"Payment is due at the venue. No card will be charged online.",printTicket:"Print ticket"
  }
};

let language = localStorage.getItem("dfc_language") || "lv";
let movies = [];
let prices = { ticket: 0.10, custom: 0.10, office: 0.20, water: 0.20, popcorn: 0.50 };
let selectedGenre = "all";
let booking = null;
let adminTab = "dashboard";
let toastTimer = null;
let revealObserver = null;
function revealElement(element, delay) {
  if (!revealObserver) return;
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", Math.min(delay || 0, 320) + "ms");
  if (revealObserver && element.dataset.revealBound !== "true") {
    element.dataset.revealBound = "true";
    revealObserver.observe(element);
  }
}
function setupMotion() {
  if (!("IntersectionObserver" in window)) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:"0px 0px -35px 0px"});
  const selectors = ".hero-copy,.hero-visual,.stats > div,.section-heading,.filters,.experience-visual,.experience > div:not(.experience-visual),.lookup";
  document.querySelectorAll(selectors).forEach((element, index) => revealElement(element, index * 45));
}

function t(key) { return (DICT[language] && DICT[language][key]) || DICT.lv[key] || key; }
function checkoutProgress(activeStep) {
  const labels = language === "lv" ? ["Seanss","Vietas","Papildus","Dati"] : ["Showtime","Seats","Extras","Details"];
  return '<div class="checkout-progress">' + labels.map((label,index) =>
    '<div class="checkout-progress-step ' + (index+1===activeStep ? "active" : index+1<activeStep ? "done" : "") + '"><span>' +
    (index+1<activeStep ? "✓" : index+1) + '</span><small>' + label + '</small></div>'
  ).join("") + '</div>';
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[character]));
}
function formatMoney(value) {
  return Number(value || 0).toLocaleString(language === "lv" ? "lv-LV" : "en-IE", { style:"currency", currency:"EUR" });
}
function formatDate(value) {
  return new Date(value + "T12:00:00").toLocaleDateString(language === "lv" ? "lv-LV" : "en-GB", {day:"numeric",month:"long",year:"numeric"});
}
function isImagePoster(value) {
  const poster = String(value || "");
  if (/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/i.test(poster)) return poster.length <= 950000;
  try {
    const url = new URL(poster);
    return url.protocol === "https:" && poster.length <= 2048 && !url.username && !url.password;
  } catch { return false; }
}
function posterBackground(value) {
  const poster = String(value || "");
  return /^linear-gradient\((?:135deg|145deg),#[0-9a-f]{3,8},#[0-9a-f]{3,8}\)$/i.test(poster)
    ? poster : "linear-gradient(135deg,#5e2833,#182838)";
}
function moviePosterContent(movie) {
  if (isImagePoster(movie.poster)) {
    return '<img class="poster-image" src="' + escapeHTML(movie.poster) + '" alt="' + escapeHTML(movie.title) + ' poster" loading="lazy"><span class="poster-shade"></span>';
  }
  return '<span class="poster-emoji">' + escapeHTML(movie.emoji || "🎬") + '</span>';
}
function compressPosterFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\/(?:jpeg|png|webp)$/i.test(file.type)) {
      reject(new Error(language === "lv" ? "Izvēlies JPG, PNG vai WebP attēlu." : "Choose a JPG, PNG or WebP image."));
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      reject(new Error(language === "lv" ? "Attēls ir pārāk liels (maks. 8 MB pirms saspiešanas)." : "The image is too large (8 MB maximum before compression)."));
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      try {
        const scale = Math.min(1, 720 / image.naturalWidth, 1000 / image.naturalHeight);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Image processing is not supported in this browser.");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL("image/webp", 0.78);
        if (!data.startsWith("data:image/webp")) data = canvas.toDataURL("image/jpeg", 0.82);
        if (data.length > 950000) throw new Error(language === "lv" ? "Attēlu neizdevās pietiekami saspiest. Izvēlies mazāku attēlu." : "The image could not be compressed enough. Choose a smaller image.");
        resolve(data);
      } catch (error) { reject(error); }
      finally { URL.revokeObjectURL(objectUrl); }
    };
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error(language === "lv" ? "Neizdevās atvērt šo attēlu." : "Could not open that image.")); };
    image.src = objectUrl;
  });
}
async function api(path, options) {
  const config = Object.assign({ method:"GET", headers:{} }, options || {});
  if (config.body && typeof config.body !== "string") {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(config.body);
  }
  const response = await fetch(API + path, config);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || ("Request failed: " + response.status));
    error.status = response.status;
    throw error;
  }
  return data;
}
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 3000);
}
function showModal(html) {
  $("#modalContent").innerHTML = html;
  $("#modalBackdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modalBackdrop").classList.add("hidden");
  document.body.style.overflow = "";
}
function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (DICT[language][key]) element.innerHTML = DICT[language][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $("#languageToggle").textContent = language === "lv" ? "EN" : "LV";
  $("#languageToggle").setAttribute("aria-label", language === "lv" ? "Switch to English" : "Pārslēgt uz latviešu valodu");
  renderMovies();
  $("#statTicketPrice").textContent = formatMoney(prices.ticket);
  $("#heroTicketPrice").textContent = formatMoney(prices.ticket);
  if ($("#customerBookings").dataset.code) showLookupResult($("#customerBookings").dataset.code, $("#customerBookings").dataset.email);
}
async function loadData() {
  try {
    const results = await Promise.all([api("/movies"), api("/prices")]);
    movies = results[0].movies || [];
    prices = results[1].prices || prices;
    $("#statTicketPrice").textContent = formatMoney(prices.ticket);
    $("#heroTicketPrice").textContent = formatMoney(prices.ticket);
    renderMovies();
  } catch (error) {
    $("#movieGrid").innerHTML = '<div class="api-warning">' + escapeHTML(t("serverError")) + '<br><small>' + escapeHTML(error.message) + '</small></div>';
    toast(t("serverError"));
  }
}
function genreName(value) {
  if (language === "en") return ({ "Animācija":"Animation", "Komēdija":"Comedy", "Piedzīvojumi":"Adventure", "Drāma":"Drama", "Fantāzija":"Fantasy", "Cits":"Other" })[value] || value;
  return value;
}
function renderMovies() {
  const term = $("#movieSearch").value.trim().toLocaleLowerCase(language === "lv" ? "lv" : "en");
  const visible = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
    const matchesText = (movie.title + " " + movie.description).toLocaleLowerCase().includes(term);
    return matchesGenre && matchesText;
  });
  $("#movieGrid").innerHTML = visible.map((movie) =>
    '<article class="movie-card">' +
      '<div class="poster" style="background:' + posterBackground(movie.poster) + '">' +
        moviePosterContent(movie) + '<strong class="poster-title">' + escapeHTML(movie.title) + '</strong>' +
      '</div><div class="movie-info"><div class="movie-meta"><span>' + escapeHTML(genreName(movie.genre)) + '</span><span>•</span><span>' + escapeHTML(movie.duration) + " " + t("min") + '</span><span>•</span><span>' + escapeHTML(movie.age) + '</span></div>' +
      '<h3>' + escapeHTML(movie.title) + '</h3><p>' + escapeHTML(movie.description) + '</p>' +
      '<div class="movie-bottom"><strong>' + formatMoney(prices.ticket) + '</strong><button class="small-button" data-book="' + escapeHTML(movie.id) + '">' + t("bookNow") + '</button></div></div></article>'
  ).join("");
  $("#movieGrid").querySelectorAll(".movie-card").forEach((card, index) => revealElement(card, index * 75));
  $("#emptyMovies").classList.toggle("hidden", visible.length > 0);
}
function setGenre(genre) {
  selectedGenre = genre;
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.genre === genre));
  renderMovies();
}
function showingsFor(movieId) {
  const movie = movies.find((item) => item.id === movieId);
  return movie ? (movie.screenings || []).filter((screening) => screening.date && screening.time) : [];
}
function openBooking(movieId) {
  const movie = movies.find((item) => item.id === movieId);
  const showings = showingsFor(movieId);
  if (!movie || !showings.length) { toast(t("noShows")); return; }
  booking = {
    movieId, screeningId:showings[0].id, date:showings[0].date, time:showings[0].time,
    count:1, mode:"auto", seats:[], seatMap:[], officeSeats:[], officeCount:0, waterCount:0, popcornCount:0
  };
  renderBookingDateStep();
}
function selectedShowingOptions(date) {
  return showingsFor(booking.movieId).filter((item) => item.date === date);
}
function renderBookingDateStep() {
  const movie = movies.find((item) => item.id === booking.movieId);
  const showings = showingsFor(booking.movieId);
  const dates = [...new Set(showings.map((item) => item.date))];
  if (!dates.includes(booking.date)) booking.date = dates[0];
  const dayShowings = selectedShowingOptions(booking.date);
  if (!dayShowings.some((item) => item.id === booking.screeningId)) booking.screeningId = dayShowings[0].id;
  const html =
    '<p class="eyebrow">' + t("step1") + '</p>' + checkoutProgress(1) + '<h2 id="modalTitle">' + t("bookTickets") + '</h2>' +
    '<p class="modal-intro">' + escapeHTML(movie.title) + ' · ' + movie.duration + ' ' + t("min") + ' · ' + escapeHTML(movie.age) + '</p>' +
    '<div class="form-grid">' +
      '<div class="field"><label for="bookDate">' + t("date") + '</label><select id="bookDate">' + dates.map((date) => '<option value="' + date + '"' + (date === booking.date ? " selected" : "") + '>' + formatDate(date) + '</option>').join("") + '</select></div>' +
      '<div class="field"><label for="bookTime">' + t("time") + '</label><select id="bookTime">' + dayShowings.map((item) => '<option value="' + item.id + '"' + (item.id === booking.screeningId ? " selected" : "") + '>' + escapeHTML(item.time) + '</option>').join("") + '</select></div>' +
      '<div class="field full"><label for="ticketCount">' + t("ticketCount") + '</label><select id="ticketCount">' + Array.from({length:7},(_,index)=>'<option value="'+(index+1)+'"'+(index===0?" selected":"")+'>'+(index+1)+'</option>').join("") + '</select></div>' +
    '</div><div class="modal-actions"><button class="button button-secondary" data-close>' + t("cancel") + '</button><button class="small-button" id="toSeats">' + t("continue") + '</button></div>';
  showModal(html);
  $("#bookDate").onchange = (event) => {
    booking.date = event.target.value;
    const newShowings = selectedShowingOptions(booking.date);
    booking.screeningId = newShowings[0].id;
    $("#bookTime").innerHTML = newShowings.map((item) => '<option value="' + item.id + '">' + escapeHTML(item.time) + '</option>').join("");
  };
  $("#bookTime").onchange = (event) => {
    booking.screeningId = event.target.value;
    booking.time = showingsFor(booking.movieId).find((item) => item.id === booking.screeningId).time;
  };
  $("#ticketCount").onchange = (event) => booking.count = Math.min(8,Math.max(1,Number(event.target.value)));
  $("#toSeats").onclick = () => {
    booking.count = Number($("#ticketCount").value);
    booking.time = showingsFor(booking.movieId).find((item) => item.id === booking.screeningId).time;
    renderSeatStep();
  };
}
async function renderSeatStep() {
  try {
    const response = await api("/screenings/" + encodeURIComponent(booking.screeningId) + "/seats");
    booking.seatMap = response.seats;
  } catch (error) { toast(error.message); return; }
  const available = booking.seatMap.filter((seat) => !seat.occupied);
  if (available.length < booking.count) { toast(t("notEnough")); return; }
  if (booking.mode === "auto") booking.seats = available.slice(0,booking.count).map((seat) => seat.seat_number);
  else booking.seats = booking.seats.filter((seat) => available.some((entry) => entry.seat_number === seat));

  const seatButtons = booking.seatMap.map((seat) => {
    const chosen = booking.seats.includes(seat.seat_number);
    const klass = (seat.occupied ? "occupied " : "") + (chosen ? "selected " : "") + (seat.office_chair ? "office" : "");
    const disabled = seat.occupied || booking.mode === "auto";
    const officeSeat = seat.seat_number === "OFFICE-1";
    return '<button class="seat ' + klass + '" data-seat="' + escapeHTML(seat.seat_number) + '"' + (disabled ? " disabled" : "") + '>' +
      (officeSeat ? "🪑" : escapeHTML(seat.seat_number.split("-")[1])) + '<small>' + (officeSeat ? t("officeSeatShort") : t("bedSeatShort")) + '</small></button>';
  }).join("");
  showModal(
    '<p class="eyebrow">' + t("step2") + '</p>' + checkoutProgress(2) + '<h2 id="modalTitle">' + t("chooseSeats") + '</h2>' +
    '<p class="modal-intro">' + t("seatIntro") + ' ' + formatMoney(prices.custom) + '.</p>' +
    '<div class="choice-row"><button class="choice-card ' + (booking.mode === "auto" ? "active" : "") + '" id="autoMode"><b>' + t("auto") + '</b><small>' + t("autoDesc") + '</small></button>' +
    '<button class="choice-card ' + (booking.mode === "custom" ? "active" : "") + '" id="customMode"><b>' + t("custom") + '</b><small>' + formatMoney(prices.custom) + ' ' + t("customDesc") + '</small></button></div>' +
    '<div class="screen-label">' + t("screen") + '</div><div class="seat-grid">' + seatButtons + '</div>' +
    '<div class="seat-legend"><span><i class="legend-box" style="background:#183d30"></i>' + t("available") + '</span><span><i class="legend-box" style="background:#63272b"></i>' + t("occupied") + '</span><span><i class="legend-box" style="background:#8e6421"></i>' + t("selected") + '</span><span>▰ ' + t("bedSeat") + '</span><span>🪑 ' + t("officeSeatShort") + '</span></div>' +
    '<div class="seat-actions">' + t("chosenSeats") + ': <b>' + booking.seats.map(escapeHTML).join(", ") + '</b><br>' + t("needSeats") + ' ' + booking.count + ' ' + t("seats") + '</div>' +
    '<div class="modal-actions"><button class="button button-secondary" id="backToDates">' + t("back") + '</button><button class="small-button" id="toExtras">' + t("continue") + '</button></div>'
  );
  $("#autoMode").onclick = () => { booking.mode = "auto"; booking.seats = []; renderSeatStep(); };
  $("#customMode").onclick = () => { booking.mode = "custom"; booking.seats = []; renderSeatStep(); };
  document.querySelectorAll("[data-seat]").forEach((button) => button.onclick = () => {
    const seat = button.dataset.seat;
    if (booking.seats.includes(seat)) booking.seats = booking.seats.filter((item) => item !== seat);
    else if (booking.seats.length < booking.count) booking.seats.push(seat);
    else { toast(t("selectOnly") + " " + booking.count + " " + t("seats2")); return; }
    renderSeatStep();
  });
  $("#backToDates").onclick = renderBookingDateStep;
  $("#toExtras").onclick = () => {
    if (booking.mode === "custom" && booking.seats.length !== booking.count) { toast(t("needSeats") + " " + booking.count + " " + t("seats")); return; }
    booking.officeSeats = booking.seats.includes("OFFICE-1") ? ["OFFICE-1"] : [];
    booking.waterCount = 0;
    booking.popcornCount = 0;
    renderExtrasStep();
  };
}
function currentTotal() {
  return booking.count * prices.ticket +
    (booking.mode === "custom" ? prices.custom : 0) +
    (booking.seats.includes("OFFICE-1") ? prices.office : 0) +
    booking.waterCount * prices.water + booking.popcornCount * prices.popcorn;
}
function renderExtrasStep() {
  const hasOfficeSeat = booking.seats.includes("OFFICE-1");
  booking.officeSeats = hasOfficeSeat ? ["OFFICE-1"] : [];
  showModal(
    '<p class="eyebrow">' + t("step3") + '</p>' + checkoutProgress(3) +
    '<h2 id="modalTitle">' + t("extras") + '</h2><p class="modal-intro">' + t("extrasIntro") + '</p>' +
    '<div class="checkout-seat-summary"><span>' + t("chosenSeats") + '</span><strong>' + booking.seats.map(escapeHTML).join(", ") + '</strong>' +
    '<small>' + (hasOfficeSeat ? "🪑 " + t("officeSeatShort") + " · " + formatMoney(prices.office) : "▰ " + t("bedSeat")) + '</small></div>' +
    '<div class="form-grid" style="margin-top:18px"><div class="field"><label for="waterCount">' + t("water") + ' (' + formatMoney(prices.water) + ')</label><input id="waterCount" type="number" min="0" max="20" value="' + booking.waterCount + '"></div>' +
    '<div class="field"><label for="popcornCount">' + t("popcorn") + ' (' + formatMoney(prices.popcorn) + ')</label><input id="popcornCount" type="number" min="0" max="20" value="' + booking.popcornCount + '"></div></div>' +
    '<div class="summary-box">' +
      '<div class="summary-line"><span>' + t("tickets") + ' (' + booking.count + ')</span><b>' + formatMoney(booking.count * prices.ticket) + '</b></div>' +
      '<div class="summary-line"><span>' + t("seatSelection") + '</span><b>' + formatMoney(booking.mode === "custom" ? prices.custom : 0) + '</b></div>' +
      '<div class="summary-line"><span>' + t("officeChairs") + '</span><b id="officePrice">' + formatMoney(hasOfficeSeat ? prices.office : 0) + '</b></div>' +
      '<div class="summary-line"><span>' + t("snacks") + '</span><b id="snackPrice">' + formatMoney(booking.waterCount * prices.water + booking.popcornCount * prices.popcorn) + '</b></div>' +
      '<div class="summary-line total"><span>' + t("total") + '</span><b id="grandTotal">' + formatMoney(currentTotal()) + '</b></div></div>' +
    '<div class="modal-actions"><button class="button button-secondary" id="backToSeats">' + t("back") + '</button><button class="small-button" id="toCustomerDetails">' + t("continue") + '</button></div>'
  );
  function refreshCosts() {
    booking.waterCount = Math.max(0,Math.min(20,Number($("#waterCount").value)||0));
    booking.popcornCount = Math.max(0,Math.min(20,Number($("#popcornCount").value)||0));
    $("#snackPrice").textContent = formatMoney(booking.waterCount * prices.water + booking.popcornCount * prices.popcorn);
    $("#grandTotal").textContent = formatMoney(currentTotal());
  }
  $("#waterCount").oninput = refreshCosts;
  $("#popcornCount").oninput = refreshCosts;
  $("#backToSeats").onclick = renderSeatStep;
  $("#toCustomerDetails").onclick = () => {
    booking.waterCount = Number($("#waterCount").value)||0;
    booking.popcornCount = Number($("#popcornCount").value)||0;
    renderCustomerDetailsStep();
  };
}
function renderCustomerDetailsStep() {
  const movie = movies.find((item) => item.id === booking.movieId);
  const hasOfficeSeat = booking.seats.includes("OFFICE-1");
  const officeSeats = hasOfficeSeat ? ["OFFICE-1"] : [];
  showModal(
    '<p class="eyebrow">' + t("step4") + '</p>' + checkoutProgress(4) +
    '<h2 id="modalTitle">' + t("details") + '</h2><p class="modal-intro">' + t("detailsIntro") + '</p>' +
    '<div class="form-grid"><div class="field"><label for="customerName">' + t("name") + '</label><input id="customerName" maxlength="70" autocomplete="name" required></div>' +
    '<div class="field"><label for="customerEmail">' + t("email") + '</label><input id="customerEmail" type="email" autocomplete="email" required></div></div>' +
    '<div class="summary-box"><div class="summary-line"><span>' + t("screening") + '</span><b>' + escapeHTML(movie.title) + ' · ' + formatDate(booking.date) + ' · ' + escapeHTML(booking.time) + '</b></div>' +
    '<div class="summary-line"><span>' + t("chosenSeats") + '</span><b>' + booking.seats.map(escapeHTML).join(", ") + '</b></div>' +
    '<div class="summary-line"><span>' + t("officeChairs") + ' / ' + t("snacks") + '</span><b>' + (hasOfficeSeat ? "1" : "0") + ' · ' + booking.waterCount + ' ' + t("water").toLowerCase() + ' · ' + booking.popcornCount + ' ' + t("popcorn").toLowerCase() + '</b></div>' +
    '<div class="summary-line total"><span>' + t("total") + '</span><b>' + formatMoney(currentTotal()) + '</b></div></div>' +
    '<div class="payment-choice"><span class="payment-icon">€</span><span><strong>' + t("payAtCinema") + '</strong><small>' + t("paymentDue") + '</small></span><b>' + formatMoney(currentTotal()) + '</b></div>' +
    '<p class="admin-note">' + t("cancellationRule") + '</p>' +
    '<div class="modal-actions"><button class="button button-secondary" id="backToExtras">' + t("back") + '</button><button class="small-button" id="confirmBooking">' + t("confirm") + ' · ' + formatMoney(currentTotal()) + '</button></div>'
  );
  $("#backToExtras").onclick = renderExtrasStep;
  $("#confirmBooking").onclick = async () => {
    const button = $("#confirmBooking");
    const name = $("#customerName").value.trim();
    const email = $("#customerEmail").value.trim();
    if (!name || !$("#customerEmail").checkValidity()) { toast(t("validDetails")); return; }
    button.disabled = true;
    button.textContent = language === "lv" ? "Apstrādā rezervāciju..." : "Confirming reservation...";
    const submittedOfficeSeats = booking.mode === "custom" ? officeSeats : [];
    try {
      const result = await api("/bookings", {
        method:"POST",
        body:{
          screeningId:booking.screeningId,
          customerName:name,
          customerEmail:email,
          ticketCount:booking.count,
          customSelection:booking.mode === "custom",
          selectedSeats:booking.mode === "custom" ? booking.seats : [],
          officeSeats:submittedOfficeSeats,
          waterCount:booking.waterCount,
          popcornCount:booking.popcornCount
        }
      });
      renderConfirmation(result.booking);
    } catch (error) {
      button.disabled = false;
      button.textContent = t("confirm") + " · " + formatMoney(currentTotal());
      toast(error.message);
      if (error.status === 409) renderSeatStep();
    }
  };
}
function renderConfirmation(item) {
  const movie = movies.find((entry) => entry.id === booking.movieId);
  const seats = item.seats || [];
  showModal(
    '<div style="text-align:center;padding:12px 0"><div style="font-size:46px">🎟️</div>' +
    '<p class="eyebrow">' + t("confirmedEyebrow") + '</p><h2 id="modalTitle">' + t("confirmed") + '</h2>' +
    '<p class="modal-intro">' + t("savedBrowser") + '</p><div class="summary-box ticket-print" style="text-align:left">' +
    '<div class="summary-line"><span>' + t("bookingNumber") + '</span><b>' + escapeHTML(item.code) + '</b></div>' +
    '<div class="summary-line"><span>' + t("email") + '</span><b>' + escapeHTML(item.customerEmail) + '</b></div>' +
    '<div class="summary-line"><span>' + t("screening") + '</span><b>' + escapeHTML(movie?.title || "") + ' · ' + formatDate(booking.date) + ' · ' + escapeHTML(booking.time) + '</b></div>' +
    '<div class="summary-line"><span>' + t("chosenSeats") + '</span><b>' + seats.map(escapeHTML).join(", ") + '</b></div>' +
    '<div class="summary-line total"><span>' + t("total") + '</span><b>' + formatMoney(item.total) + '</b></div></div>' +
    '<p class="admin-note">' + t("demoPayment") + ' ' + t("bookingLookupHelp") + '</p>' +
    '<div class="ticket-actions"><button class="button button-secondary" id="printTicket">' + t("printTicket") + '</button><button class="small-button" data-close>' + t("close") + '</button></div></div>'
  );
  $("#printTicket").onclick = () => window.print();
  $("#lookupCode").value = item.code;
  $("#lookupEmail").value = item.customerEmail;
}
async function showLookupResult(code,email) {
  try {
    const data = await api("/bookings/lookup",{method:"POST",body:{bookingCode:code,customerEmail:email}});
    const item = data.booking;
    $("#customerBookings").dataset.code = code;
    $("#customerBookings").dataset.email = email;
    $("#customerBookings").innerHTML =
      '<div class="booking-card"><div><strong>' + escapeHTML(item.movieTitle) + ' · ' + escapeHTML(item.code) + '</strong>' +
      '<small>' + formatDate(item.date) + ' · ' + escapeHTML(item.time) + ' · ' + item.seats.map(escapeHTML).join(", ") + ' · ' + formatMoney(item.total) + '</small>' +
      '<small>' + t("statusConfirmed") + ': ' + (item.status === "cancelled" ? t("statusCancelled") : t("statusConfirmed")) + '</small></div>' +
      (item.status === "confirmed" ? '<button class="danger-button" id="customerCancel">' + t("cancelBooking") + '</button>' : '') + '</div>';
    if ($("#customerCancel")) $("#customerCancel").onclick = async () => {
      if (!confirm(t("cancelConfirm"))) return;
      try {
        await api("/bookings/" + encodeURIComponent(item.code) + "/cancel",{method:"POST",body:{customerEmail:email}});
        toast(t("cancelled"));
        showLookupResult(code,email);
      } catch(error) { toast(error.message); }
    };
  } catch(error) {
    $("#customerBookings").innerHTML = '<p class="admin-note">' + escapeHTML(error.message || t("lookupNo")) + '</p>';
  }
}

async function openAdmin() {
  try { await api("/admin/me"); renderAdminDashboard(); }
  catch { renderAdminLogin(); }
}
function renderAdminLogin() {
  showModal(
    '<p class="eyebrow">DANCING FRUIT CINEMA · ADMIN</p><h2 id="modalTitle">' + t("adminLogin") + '</h2><p class="modal-intro">' + t("adminIntro") + '</p>' +
    '<div class="form-grid"><div class="field full"><label for="adminUsername">' + t("username") + '</label><input id="adminUsername" autocomplete="username"></div>' +
    '<div class="field full"><label for="adminPassword">' + t("password") + '</label><input id="adminPassword" type="password" autocomplete="current-password"></div></div>' +
    '<p class="admin-note">' + t("adminHint") + '</p>' +
    '<div class="modal-actions"><button class="button button-secondary" data-close>' + t("cancel") + '</button><button class="small-button" id="adminLoginButton">' + t("login") + '</button></div>'
  );
  const submit = async () => {
    try {
      await api("/admin/login",{method:"POST",body:{username:$("#adminUsername").value.trim(),password:$("#adminPassword").value}});
      renderAdminDashboard();
    } catch(error) { toast(error.message || t("badLogin")); }
  };
  $("#adminLoginButton").onclick = submit;
  $("#adminPassword").onkeydown = (event) => { if(event.key === "Enter") submit(); };
}
async function renderAdminDashboard() {
  showModal(
    '<p class="eyebrow">DANCING FRUIT CINEMA · ADMIN</p><h2 id="modalTitle">' + t("adminTitle") + '</h2><p class="modal-intro">' + t("adminIntro2") + '</p>' +
    '<div class="admin-wrap"><aside class="admin-side">' +
    '<button class="' + (adminTab === "dashboard" ? "active" : "") + '" data-admin-tab="dashboard">' + t("tabDashboard") + '</button>' +
    '<button class="' + (adminTab === "movies" ? "active" : "") + '" data-admin-tab="movies">' + t("tabMovies") + '</button><button class="' + (adminTab === "bookings" ? "active" : "") + '" data-admin-tab="bookings">' + t("tabBookings") + '</button>' +
    '<button class="' + (adminTab === "prices" ? "active" : "") + '" data-admin-tab="prices">' + t("tabPrices") + '</button><button class="' + (adminTab === "account" ? "active" : "") + '" data-admin-tab="account">' + t("tabAccount") + '</button></aside>' +
    '<div class="admin-panel" id="adminPanel">' + t("loading") + '</div></div>' +
    '<div class="modal-actions"><span class="admin-note">' + t("adminSession") + '</span><button class="button button-secondary" id="adminLogout">' + t("logout") + '</button></div>'
  );
  document.querySelectorAll("[data-admin-tab]").forEach((button) => button.onclick = () => {
    adminTab = button.dataset.adminTab;
    document.querySelectorAll("[data-admin-tab]").forEach((item) => item.classList.toggle("active",item === button));
    renderAdminTab();
  });
  $("#adminLogout").onclick = async () => {
    try { await api("/admin/logout",{method:"POST"}); closeModal(); toast(t("logout")); }
    catch(error) { toast(error.message); }
  };
  await renderAdminTab();
}
async function renderAdminTab() {
  const panel = $("#adminPanel");
  if (!panel) return;
  panel.innerHTML = t("loading");
  try {
    if (adminTab === "dashboard") await renderAdminOverview(panel);
    if (adminTab === "movies") await renderAdminMovies(panel);
    if (adminTab === "bookings") await renderAdminBookings(panel);
    if (adminTab === "prices") await renderAdminPrices(panel);
    if (adminTab === "account") renderAdminAccount(panel);
  } catch(error) { panel.innerHTML = '<p class="admin-note">' + escapeHTML(error.message) + '</p>'; }
}
async function renderAdminOverview(panel) {
  const [bookingData,movieData] = await Promise.all([api("/admin/bookings"),api("/movies")]);
  const bookings = bookingData.bookings || [];
  const active = bookings.filter((item)=>item.status==="confirmed");
  const cancelled = bookings.filter((item)=>item.status==="cancelled");
  const moviesList = movieData.movies || [];
  const upcoming = moviesList.reduce((total,movie)=>total+(movie.screenings||[]).length,0);
  const reservedValue = active.reduce((total,item)=>total+Number(item.total||0),0);
  const cards = [
    [t("dashboardMovies"),moviesList.length,"🎬"],
    [t("dashboardScreenings"),upcoming,"🗓"],
    [t("dashboardBookings"),active.length,"🎟"],
    [t("dashboardValue"),formatMoney(reservedValue),"€"]
  ];
  panel.innerHTML =
    '<div class="admin-overview-head"><div><h3>' + t("tabDashboard") + '</h3><p>' + t("dashboardWelcome") + '</p></div>' +
    '<button class="small-button" data-quick-tab="bookings">' + t("tabBookings") + ' →</button></div>' +
    '<div class="admin-stat-grid">' + cards.map((card)=>'<article class="admin-stat-card"><span>' + card[2] + '</span><small>' + card[0] + '</small><strong>' + card[1] + '</strong></article>').join("") + '</div>' +
    '<div class="admin-overview-columns"><section class="admin-overview-box"><h4>' + t("latestBookings") + '</h4>' +
    (bookings.length ? bookings.slice(0,5).map((item)=>
      '<div class="admin-mini-booking"><div><strong>' + escapeHTML(item.name) + '</strong><small>' + escapeHTML(item.code) + ' · ' + escapeHTML(item.movie) + '</small></div>' +
      '<span class="admin-status ' + (item.status==="cancelled"?"cancelled":"confirmed") + '">' + (item.status==="cancelled"?t("statusCancelled"):t("statusConfirmed")) + '</span></div>'
    ).join("") : '<p class="admin-note">' + t("noBookings") + '</p>') +
    '</section><section class="admin-overview-box"><h4>' + (language==="lv"?"Ātrās darbības":"Quick actions") + '</h4>' +
    '<button class="admin-quick-action" data-quick-tab="movies">' + t("addMovie") + ' <span>→</span></button>' +
    '<button class="admin-quick-action" data-quick-tab="prices">' + t("tabPrices") + ' <span>→</span></button>' +
    '<button class="admin-quick-action" data-quick-tab="account">' + t("tabAccount") + ' <span>→</span></button>' +
    '<p class="admin-note">' + (language==="lv"?"Atceltās rezervācijas":"Cancelled reservations") + ': <b>' + cancelled.length + '</b></p></section></div>';
  panel.querySelectorAll("[data-quick-tab]").forEach((button)=>button.onclick=()=>{
    const tab = document.querySelector('[data-admin-tab="' + button.dataset.quickTab + '"]');
    if(tab) tab.click();
  });
}
async function renderAdminMovies(panel) {
  const data = await api("/movies");
  const list = data.movies || [];
  panel.innerHTML = '<h3>' + t("tabMovies") + '</h3><button class="small-button" id="addMovieButton">' + t("addMovie") + '</button><div style="height:12px"></div>' +
    (list.length ? list.map((movie) => '<div class="admin-item"><div><b>' + escapeHTML(movie.title) + '</b><small>' + escapeHTML(genreName(movie.genre)) + ' · ' + (movie.screenings||[]).length + '</small></div>' +
      '<div><button class="small-button" data-edit-movie="' + escapeHTML(movie.id) + '">' + t("edit") + '</button> <button class="danger-button" data-delete-movie="' + escapeHTML(movie.id) + '">' + t("delete") + '</button></div></div>').join("") : '<p class="admin-note">' + t("noMovies") + '</p>');
  $("#addMovieButton").onclick = () => renderMovieEditor(null);
  document.querySelectorAll("[data-edit-movie]").forEach((button) => button.onclick = () => renderMovieEditor(list.find((movie) => movie.id === button.dataset.editMovie)));
  document.querySelectorAll("[data-delete-movie]").forEach((button) => button.onclick = async () => {
    if (!confirm(t("deleteMovieConfirm"))) return;
    try {
      await api("/admin/movies/" + encodeURIComponent(button.dataset.deleteMovie), {method:"DELETE"});
      const refreshed = await api("/movies"); movies = refreshed.movies || [];
      renderMovies(); await renderAdminMovies($("#adminPanel")); toast(t("movieDeleted"));
    } catch(error) { toast(error.message); }
  });
}
function renderMovieEditor(movie) {
  const schedule = "";
  const screeningRows = (movie?.screenings || []).map((showing) =>
    '<div class="admin-item"><div><b>' + formatDate(showing.date) + ' · ' + escapeHTML(showing.time) + '</b><small>' + escapeHTML(showing.hall || "1. zāle") + '</small></div><button class="danger-button" data-remove-screening="' + escapeHTML(showing.id) + '">' + (language === "lv" ? "Noņemt seansu" : "Remove screening") + '</button></div>'
  ).join("");
  $("#adminPanel").innerHTML =
    '<p class="eyebrow">' + (movie ? t("edit") : t("addMovie")) + '</p><h3>' + (movie ? t("edit") : t("addMovie")) + '</h3>' +
    '<div class="form-grid"><div class="field full"><label for="movieTitle">' + t("movieTitle") + '</label><input id="movieTitle" maxlength="100" value="' + escapeHTML(movie?.title || "") + '"></div>' +
    '<div class="field"><label for="movieGenre">' + t("genre") + '</label><select id="movieGenre">' + ["Animācija","Komēdija","Piedzīvojumi","Drāma","Fantāzija","Cits"].map((genre) => '<option value="' + genre + '"' + (movie?.genre === genre ? " selected" : "") + '>' + genreName(genre) + '</option>').join("") + '</select></div>' +
    '<div class="field"><label for="movieDuration">' + t("duration") + '</label><input id="movieDuration" type="number" min="1" max="500" value="' + escapeHTML(movie?.duration || 90) + '"></div>' +
    '<div class="field"><label for="movieAge">' + t("ageRating") + '</label><input id="movieAge" value="' + escapeHTML(movie?.age || "U") + '"></div>' +
    '<div class="field"><label for="movieYear">' + t("year") + '</label><input id="movieYear" type="number" min="1900" max="2100" value="' + escapeHTML(movie?.year || new Date().getFullYear()) + '"></div>' +
    '<div class="field"><label for="movieEmoji">' + t("posterEmoji") + '</label><input id="movieEmoji" maxlength="5" value="' + escapeHTML(movie?.emoji || "🎬") + '"></div>' +
    '<div class="field full"><label for="moviePoster">' + t("posterUrl") + '</label><input id="moviePoster" type="url" placeholder="https://example.com/movie-poster.jpg" value="' + escapeHTML(isImagePoster(movie?.poster) && !String(movie.poster).startsWith("data:") ? movie.poster : "") + '"></div>' +
    '<div class="field full poster-upload-tools"><label for="moviePosterFile">' + t("posterUpload") + '</label><input id="moviePosterFile" type="file" accept="image/jpeg,image/png,image/webp"><small>' + t("posterUploadHelp") + '</small>' +
    '<div class="poster-preview-wrap"><span>' + t("posterPreview") + '</span><div id="posterPreview" class="poster-preview">' +
    (isImagePoster(movie?.poster) ? '<img src="' + escapeHTML(movie.poster) + '" alt="Poster preview">' : '<span>' + escapeHTML(movie?.emoji || "🎬") + '</span>') +
    '</div><button class="button button-secondary" type="button" id="clearMoviePoster">' + t("posterRemove") + '</button></div></div>' +
    '<div class="field full"><label for="movieDescription">' + t("description") + '</label><input id="movieDescription" maxlength="1000" value="' + escapeHTML(movie?.description || "") + '"></div>' +
    '<div class="field full"><label>' + (language === "lv" ? "Esošie seansi" : "Current screenings") + '</label>' + (screeningRows || '<p class="admin-note">' + t("emptyScreenings") + '</p>') + '</div>' +
    '<div class="field full"><label for="movieSchedule">' + t("schedule") + '</label><textarea id="movieSchedule" rows="4">' + escapeHTML(schedule) + '</textarea><small class="admin-note">' + t("scheduleHelp") + '</small></div></div>' +
    '<div class="modal-actions"><button class="button button-secondary" id="cancelMovieEdit">' + t("back") + '</button><button class="small-button" id="saveMovie">' + t("save") + '</button></div>';
  let uploadedPosterData = "";
  let removeMoviePoster = false;
  const posterUrl = $("#moviePoster");
  const posterFile = $("#moviePosterFile");
  const posterPreview = $("#posterPreview");
  const showPosterPreview = (source) => {
    posterPreview.innerHTML = source
      ? '<img src="' + escapeHTML(source) + '" alt="Poster preview">'
      : '<span>' + escapeHTML(movie?.emoji || "🎬") + '</span>';
  };
  posterFile.onchange = async () => {
    const file = posterFile.files && posterFile.files[0];
    if (!file) return;
    try {
      uploadedPosterData = await compressPosterFile(file);
      removeMoviePoster = false;
      posterUrl.value = "";
      showPosterPreview(uploadedPosterData);
      toast(language === "lv" ? "Plakāts sagatavots. Saglabā filmu, lai to pievienotu." : "Poster ready. Save the movie to attach it.");
    } catch(error) {
      posterFile.value = "";
      toast(error.message);
    }
  };
  posterUrl.oninput = () => {
    uploadedPosterData = "";
    removeMoviePoster = false;
    const value = posterUrl.value.trim();
    if (!value) showPosterPreview("");
    else if (isImagePoster(value)) showPosterPreview(value);
  };
  $("#clearMoviePoster").onclick = () => {
    uploadedPosterData = "";
    removeMoviePoster = true;
    posterUrl.value = "";
    posterFile.value = "";
    showPosterPreview("");
  };
  $("#cancelMovieEdit").onclick = renderAdminTab;
  document.querySelectorAll("[data-remove-screening]").forEach((button) => button.onclick = async () => {
    if (!confirm(language === "lv" ? "Noņemt šo seansu?" : "Remove this screening?")) return;
    try {
      await api("/admin/screenings/" + encodeURIComponent(button.dataset.removeScreening), { method:"DELETE" });
      const refreshed = await api("/movies");
      movies = refreshed.movies || [];
      renderMovies();
      renderMovieEditor(movies.find((item) => item.id === movie?.id) || null);
      toast(language === "lv" ? "Seanss noņemts." : "Screening removed.");
    } catch(error) { toast(error.message); }
  });
  $("#saveMovie").onclick = async () => {
    const title = $("#movieTitle").value.trim();
    const description = $("#movieDescription").value.trim();
    const duration = Number($("#movieDuration").value);
    if (!title || !description || !Number.isInteger(duration) || duration < 1) { toast(t("movieRequired")); return; }
    try {
      const screenings = $("#movieSchedule").value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
        const index = line.indexOf(":");
        if (index < 0) throw new Error(t("invalidSchedule"));
        const date = line.slice(0,index).trim();
        const times = line.slice(index+1).split(",").map((time)=>time.trim()).filter(Boolean);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !times.every((time)=>/^([01]\d|2[0-3]):[0-5]\d$/.test(time))) throw new Error(t("invalidSchedule"));
        return {date,times};
      });
      const posterUrlValue = $("#moviePoster").value.trim();
      if (posterUrlValue && !isImagePoster(posterUrlValue)) {
        toast(language === "lv" ? "Plakāta saitei jābūt derīgai HTTPS attēla adresei." : "Poster URL must be a valid HTTPS image address.");
        return;
      }
      const defaultPoster = "linear-gradient(135deg,#753039,#182838)";
      const body = {
        title,description,duration,genre:$("#movieGenre").value,age:$("#movieAge").value.trim()||"U",
        year:Number($("#movieYear").value)||new Date().getFullYear(),emoji:$("#movieEmoji").value||"🎬",
        poster:uploadedPosterData || (posterUrlValue || (removeMoviePoster ? defaultPoster : (movie?.poster || defaultPoster))),screenings
      };
      await api(movie ? "/admin/movies/"+encodeURIComponent(movie.id) : "/admin/movies",{method:movie?"PUT":"POST",body});
      const data = await api("/movies"); movies = data.movies || []; renderMovies();
      toast(t("movieSaved")); await renderAdminMovies($("#adminPanel"));
    } catch(error) { toast(error.message); }
  };
}
async function renderAdminBookings(panel) {
  const data = await api("/admin/bookings");
  const list = data.bookings || [];
  panel.innerHTML =
    '<div class="admin-bookings-head"><div><h3>' + t("bookingList") + '</h3><p>' + (language==="lv"?"Meklē, filtrē un eksportē rezervācijas.":"Search, filter and export reservations.") + '</p></div>' +
    '<button class="button button-secondary" id="exportBookings">' + t("exportBookings") + '</button></div>' +
    '<div class="admin-booking-toolbar"><input id="bookingAdminSearch" type="search" placeholder="' + t("searchBookings") + '">' +
    '<select id="bookingStatusFilter"><option value="all">' + t("allStatuses") + '</option><option value="confirmed">' + t("statusConfirmed") + '</option><option value="cancelled">' + t("statusCancelled") + '</option></select></div>' +
    '<p class="admin-filter-count" id="bookingFilterCount"></p><div id="adminBookingList" class="admin-booking-list"></div>';
  const listElement = $("#adminBookingList");
  const draw = () => {
    const query = $("#bookingAdminSearch").value.trim().toLocaleLowerCase();
    const status = $("#bookingStatusFilter").value;
    const filtered = list.filter((item)=>{
      const matchesStatus = status==="all" || item.status===status;
      const haystack = [item.code,item.name,item.email,item.movie,(item.seats||[]).join(" ")].join(" ").toLocaleLowerCase();
      return matchesStatus && haystack.includes(query);
    });
    $("#bookingFilterCount").textContent = language==="lv"
      ? "Rādītas " + filtered.length + " no " + list.length + " rezervācijām"
      : "Showing " + filtered.length + " of " + list.length + " bookings";
    listElement.innerHTML = filtered.length ? filtered.map((item)=>
      '<div class="admin-booking-row"><div class="admin-booking-main"><div class="admin-booking-title"><strong>' + escapeHTML(item.code) + '</strong>' +
      '<span class="admin-status ' + (item.status==="cancelled"?"cancelled":"confirmed") + '">' + (item.status==="cancelled"?t("statusCancelled"):t("statusConfirmed")) + '</span></div>' +
      '<b>' + escapeHTML(item.name) + '</b><small>' + escapeHTML(item.movie) + ' · ' + formatDate(item.date) + ' · ' + escapeHTML(item.time) + '</small>' +
      '<small>' + escapeHTML(item.email) + '</small><small>' + (item.seats||[]).map(escapeHTML).join(", ") + ' · ' + formatMoney(item.total) + '</small></div>' +
      (item.status==="confirmed" ? '<button class="danger-button" data-admin-cancel="' + escapeHTML(item.code) + '">' + t("cancelBooking") + '</button>' : '') + '</div>'
    ).join("") : '<p class="admin-note">' + t("noFilterBookings") + '</p>';
    listElement.querySelectorAll("[data-admin-cancel]").forEach((button)=>button.onclick=async()=>{
      if(!confirm(t("cancelConfirm"))) return;
      try {
        await api("/admin/bookings/"+encodeURIComponent(button.dataset.adminCancel)+"/cancel",{method:"POST"});
        toast(t("cancelled"));
        await renderAdminBookings($("#adminPanel"));
      } catch(error) { toast(error.message); }
    });
  };
  $("#bookingAdminSearch").oninput = draw;
  $("#bookingStatusFilter").onchange = draw;
  $("#exportBookings").onclick = () => {
    const headers = ["Booking code","Name","Email","Movie","Date","Time","Seats","Total EUR","Status"];
    const rows = list.map((item)=>[item.code,item.name,item.email,item.movie,item.date,item.time,(item.seats||[]).join(" "),Number(item.total).toFixed(2),item.status]);
    const csv = [headers,...rows].map((row)=>row.map((cell)=>'"'+String(cell??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\\uFEFF",csv],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a");
    link.href=url; link.download="dancing-fruit-cinema-bookings.csv";
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  draw();
}
async function renderAdminPrices(panel) {
  const data = await api("/prices");
  prices = data.prices;
  panel.innerHTML = '<h3>' + t("priceTitle") + '</h3><div class="form-grid">' +
    priceField("priceTicket","ticket",t("priceTicket")) + priceField("priceCustom","custom",t("priceCustom")) +
    priceField("priceOffice","office",t("priceOffice")) + priceField("priceWater","water",t("priceWater")) +
    priceField("pricePopcorn","popcorn",t("pricePopcorn")) + '</div><button class="small-button" id="savePrices" style="margin-top:16px">' + t("savePrices") + '</button>';
  $("#savePrices").onclick = async () => {
    const updated = {
      ticket:Number($("#priceTicket").value),custom:Number($("#priceCustom").value),office:Number($("#priceOffice").value),
      water:Number($("#priceWater").value),popcorn:Number($("#pricePopcorn").value)
    };
    if (Object.values(updated).some((value)=>!Number.isFinite(value)||value<0)) { toast("Invalid price"); return; }
    try {
      const saved = await api("/admin/prices",{method:"PUT",body:updated});
      prices = saved.prices; $("#statTicketPrice").textContent = formatMoney(prices.ticket); $("#heroTicketPrice").textContent = formatMoney(prices.ticket);
      renderMovies(); toast(t("pricesSaved"));
    } catch(error) { toast(error.message); }
  };
}
function priceField(id,key,label) {
  return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="number" min="0" step="0.01" value="' + Number(prices[key]).toFixed(2) + '"></div>';
}
function renderAdminAccount(panel) {
  panel.innerHTML = '<h3>' + t("changePassword") + '</h3><div class="form-grid">' +
    '<div class="field full"><label for="currentAdminPassword">' + t("currentPassword") + '</label><input id="currentAdminPassword" type="password" autocomplete="current-password"></div>' +
    '<div class="field full"><label for="newAdminPassword">' + t("newPassword") + '</label><input id="newAdminPassword" type="password" autocomplete="new-password"></div></div>' +
    '<button class="small-button" id="changePasswordButton" style="margin-top:13px">' + t("changePassword") + '</button>';
  $("#changePasswordButton").onclick = async () => {
    const currentPassword = $("#currentAdminPassword").value;
    const newPassword = $("#newAdminPassword").value;
    if (newPassword.length < 12) { toast(t("passwordMin")); return; }
    try {
      await api("/admin/password",{method:"POST",body:{currentPassword,newPassword}});
      $("#currentAdminPassword").value = ""; $("#newAdminPassword").value = "";
      toast(t("passwordChanged"));
    } catch(error) { toast(error.message); }
  };
}

document.addEventListener("click",(event)=>{
  const bookButton = event.target.closest("[data-book]");
  if (bookButton) openBooking(bookButton.dataset.book);
  if (event.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown",(event)=>{
  // The Fn key is usually handled by the keyboard hardware and is not exposed to browser JavaScript.
  if (event.ctrlKey && event.shiftKey && event.altKey && event.key.toLowerCase() === "p") {
    event.preventDefault(); openAdmin();
  }
  if (event.key === "Escape" && !$("#modalBackdrop").classList.contains("hidden")) closeModal();
});
$("#modalClose").addEventListener("click",closeModal);
$("#modalBackdrop").addEventListener("click",(event)=>{if(event.target === $("#modalBackdrop")) closeModal();});
$("#movieSearch").addEventListener("input",renderMovies);
$("#genreFilters").addEventListener("click",(event)=>{
  const button = event.target.closest("[data-genre]");
  if (button) setGenre(button.dataset.genre);
});
$("#bookingLookup").addEventListener("submit",async(event)=>{
  event.preventDefault();
  const code = $("#lookupCode").value.trim();
  const email = $("#lookupEmail").value.trim();
  if (!code || !email) { toast(t("lookupMissing")); return; }
  try {
    const result = await api("/bookings/lookup",{method:"POST",body:{bookingCode:code,customerEmail:email}});
    const item = result.booking;
    $("#customerBookings").innerHTML =
      '<div class="booking-card"><div><strong>' + escapeHTML(item.movieTitle) + ' · ' + escapeHTML(item.code) + '</strong>' +
      '<small>' + formatDate(item.date) + ' · ' + escapeHTML(item.time) + ' · ' + item.seats.map(escapeHTML).join(", ") + ' · ' + formatMoney(item.total) + '</small>' +
      '<small>' + (item.status === "cancelled" ? t("statusCancelled") : t("statusConfirmed")) + '</small></div>' +
      (item.status === "confirmed" ? '<button class="danger-button" id="cancelMyBooking">' + t("cancelBooking") + '</button>' : '') + '</div>';
    $("#customerBookings").dataset.code = code;
    $("#customerBookings").dataset.email = email;
    if ($("#cancelMyBooking")) $("#cancelMyBooking").onclick = async () => {
      if (!confirm(t("cancelConfirm"))) return;
      try {
        await api("/bookings/"+encodeURIComponent(code)+"/cancel",{method:"POST",body:{customerEmail:email}});
        toast(t("cancelled")); $("#bookingLookup").requestSubmit();
      } catch(error) { toast(error.message); }
    };
  } catch(error) {
    $("#customerBookings").innerHTML = '<p class="admin-note">' + escapeHTML(error.message || t("lookupNo")) + '</p>';
  }
});
$("#languageToggle").addEventListener("click",()=>{
  language = language === "lv" ? "en" : "lv";
  localStorage.setItem("dfc_language",language);
  applyLanguage();
});
$("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach((link)=>link.addEventListener("click",()=>$("#mainNav").classList.remove("open")));

setupMotion();
applyLanguage();
loadData();
