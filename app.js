const $ = (selector) => document.querySelector(selector);
const API = "/api";
const DICT = {
  lv: {
    navHome:"Sākums",navMovies:"Filmas",navSeats:"Sēdvietas",navBookings:"Manas rezervācijas",buyTicket:"Pirkt biļeti",
    heroEyebrow:"TAVS MĀJĪGAIS KINO PIEDZĪVOJUMS",heroTitle:"Filmu vakari,<br><em>citā līmenī.</em>",heroText:"Izvēlies filmu, rezervē savu vietu un izbaudi kino savā ritmā — arī īpaši ērtā gultas tipa sēdvietā.",
    browseMovies:"Apskatīt filmas",ticketsFrom:"Standarta biļetes no",statTicket:"Standarta biļete",statMax:"Maks. vietas vienā rezervācijā",statCancel:"Klienta atcelšanas termiņš",statSnacks:"Popkorns un ūdens",
    moviesEyebrow:"IZVĒLIES SAVU NĀKAMO FILMU",moviesTitle:"Šobrīd kinoteātrī",searchMovies:"Meklēt filmu...",filterAll:"Visas filmas",filterAnimation:"Animācija",filterComedy:"Komēdija",filterAdventure:"Piedzīvojumi",emptyMovies:"Filmas netika atrastas.",
    comfortEyebrow:"ĒRTĪBA PĒC TAVAS IZVĒLES",comfortTitle:"Ne tikai krēsls.<br><em>Tavs kino stils.</em>",comfortText:"Standarta vietas ir plašas, gultas tipa sēdvietas. Izvēlies konkrētu vietu par 0,10 € par rezervāciju vai uzlabo izvēlēto sēdvietu uz biroja krēslu.",
    featureBeds:"Gultas tipa vietas",featureBedsDesc:"Iekļautas biļetes cenā",featureSelect:"Vietas izvēle",featureSelectDesc:"0,10 € par rezervāciju",featureChair:"Biroja krēsls",featureChairDesc:"No 0,20 € par vietu",
    bookingEyebrow:"TAVAS BIĻETES VIENUViet",bookingTitle:"Manas rezervācijas",bookingLookupHelp:"Ievadi rezervācijas kodu un e-pastu, ko izmantoji rezervācijā.",bookingCode:"Rezervācijas kods",yourEmail:"Tavs e-pasts",lookupButton:"Apskatīt rezervāciju",
    footerText:"Dancing Fruit Cinema © 2026 · Visas tiesības aizsargātas.",
    noShows:"Šai filmai pašlaik nav pieejamu seansu.",step1:"1. SOLIS NO 4",step2:"2. SOLIS NO 4",step3:"3. SOLIS NO 4",step4:"4. SOLIS NO 4",bookTickets:"Rezervē biļetes",date:"Seansa datums",time:"Seansa laiks",ticketCount:"Biļešu skaits (maksimums 8)",continue:"Turpināt →",cancel:"Atcelt",chooseSeats:"Izvēlies sēdvietas",
    seatIntro:"Standarta vietas ir plašas gultas tipa sēdvietas. Vari ļaut sistēmai piešķirt vietas bez maksas vai izvēlēties konkrētas vietas par",auto:"Automātiska izvēle",autoDesc:"Bez papildu maksas",custom:"Izvēlēties pašam",customDesc:"par rezervāciju",screen:"KINOTEĀTRA EKRĀNS",available:"Brīva",occupied:"Aizņemta",selected:"Izvēlēta",bedSeat:"Gultas tipa vieta",chosenSeats:"Izvēlētās vietas",needSeats:"Jāizvēlas tieši",seats:"vietas.",selectOnly:"Vari izvēlēties tikai",seats2:"vietas.",notEnough:"Šajā seansā nav pietiekami daudz brīvu vietu.",
    extras:"Papildu iespējas",extrasIntro:"Izvēlies, kuras vietas vēlies uzlabot uz biroja krēslu. Pārējās paliks gultas tipa vietas.",chairUpgrade:"Biroja krēsls",water:"Ūdens",popcorn:"Popkorns",portion:"porcija",beds:"Gultas tipa vieta",summary:"Kopsavilkums",tickets:"Biļetes",seatSelection:"Vietas izvēle",officeChairs:"Biroja krēsli",snacks:"Ūdens un popkorns",total:"Kopā",
    details:"Tavi dati un apstiprinājums",detailsIntro:"Ievadi kontaktinformāciju rezervācijas apstiprinājumam.",name:"Vārds",email:"E-pasts",cancellationRule:"Klients var atcelt rezervāciju līdz 24 stundām pirms seansa sākuma. Pēc šī termiņa atcelšanu var veikt tikai administrators.",back:"← Atpakaļ",confirm:"Apstiprināt rezervāciju",validDetails:"Lūdzu, ievadi derīgu vārdu un e-pastu.",seatRace:"Viena no vietām tikko tika rezervēta. Izvēlies vietas vēlreiz.",confirmedEyebrow:"REZERVĀCIJA APSTIPRINĀTA",confirmed:"Tiekamies kinoteātrī!",savedBrowser:"Tava rezervācija ir saglabāta serverī.",bookingNumber:"Rezervācijas numurs",screening:"Seanss",close:"Aizvērt",demoPayment:"Šī ir rezervācija bez tiešsaistes maksājuma. Biļetes apmaksa šobrīd netiek veikta.",
    lookupMissing:"Ievadi rezervācijas kodu un e-pastu.",lookupNo:"Rezervācija ar šādu kodu un e-pastu nav atrasta.",statusConfirmed:"Apstiprināta",statusCancelled:"Atcelta",cancelBooking:"Atcelt rezervāciju",cancelConfirm:"Vai tiešām atcelt šo rezervāciju?",cancelled:"Rezervācija atcelta. Vietas atkal ir pieejamas.",cancelTooLate:"Klienta atcelšana iespējama tikai līdz 24 stundām pirms seansa.",
    adminLogin:"Administratora pieslēgšanās",adminIntro:"Ievadi serverī izveidotā administratora konta datus.",username:"Lietotājvārds",password:"Parole",login:"Pieteikties",badLogin:"Nepareizs lietotājvārds vai parole.",adminHint:"Atver šo logu ar Ctrl + Shift + Alt + P. Fn taustiņu pārlūks parasti nevar noteikt, tāpēc tas nav vajadzīgs.",
    adminTitle:"Administrācijas panelis",adminIntro2:"Pārvaldi filmas, seansus, rezervācijas un cenas.",tabMovies:"🎬 Filmas un seansi",tabBookings:"🎟️ Rezervācijas",tabPrices:"€ Cenas",tabAccount:"⚙ Konts",logout:"Izrakstīties",adminSession:"Administratora sesija",addMovie:"+ Pievienot filmu",edit:"Rediģēt",delete:"Dzēst",noMovies:"Pagaidām nav filmu.",movieTitle:"Filmas nosaukums",genre:"Žanrs",duration:"Ilgums (minūtēs)",ageRating:"Vecuma ierobežojums",year:"Izlaiduma gads",posterEmoji:"Plakāta simbols",posterUrl:"Filmas plakāta attēla saite (HTTPS)",posterUpload:"Augšupielādēt plakātu",posterRemove:"Noņemt plakātu",posterPreview:"Plakāta priekšskatījums",posterUploadHelp:"Izvēlies JPG, PNG vai WebP attēlu. Tas tiks samazināts un saglabāts kopā ar filmu.",posterBackground:"Plakāta fona CSS krāsa",description:"Apraksts",schedule:"Seansi (katru datumu jaunā rindā)",scheduleHelp:"Formāts: GGGG-MM-DD:14:00,17:00 — katru datumu raksti jaunā rindā.",save:"Saglabāt",movieRequired:"Aizpildi nosaukumu, aprakstu un derīgu ilgumu.",invalidSchedule:"Pārbaudi seansu datumu un laiku formātu.",movieSaved:"Filma saglabāta.",movieDeleted:"Filma noņemta no publiskā saraksta.",deleteMovieConfirm:"Noņemt šo filmu no publiskā saraksta?",bookingList:"Visas rezervācijas",noBookings:"Vēl nav rezervāciju.",priceTitle:"Cenu iestatījumi",priceTicket:"Standarta biļete (€)",priceCustom:"Vietas izvēle par rezervāciju (€)",priceOffice:"Biroja krēsla uzlabojums (€)",priceWater:"Ūdens (€)",pricePopcorn:"Popkorns (€)",savePrices:"Saglabāt cenas",pricesSaved:"Cenas saglabātas.",changePassword:"Mainīt administratora paroli",currentPassword:"Pašreizējā parole",newPassword:"Jaunā parole (vismaz 12 rakstzīmes)",passwordChanged:"Parole nomainīta.",passwordMin:"Jaunajai parolei jābūt vismaz 12 rakstzīmēm.",wrongCurrent:"Pašreizējā parole nav pareiza.",serverError:"Serveris pašlaik nav pieejams. Pārbaudi servera iestatījumus.",loading:"Ielādē...",bookNow:"Pirkt biļeti",min:"min",bookingSearchSuccess:"Rezervācija atrasta.",emptyScreenings:"Nav pievienotu seansu."
  },
  en: {
    navHome:"Home",navMovies:"Movies",navSeats:"Seating",navBookings:"My bookings",buyTicket:"Book a ticket",
    heroEyebrow:"YOUR COSY CINEMA EXPERIENCE",heroTitle:"Movie nights,<br><em>on another level.</em>",heroText:"Choose a movie, reserve your spot and enjoy cinema your way — including a comfy bed-style seat.",
    browseMovies:"Browse movies",ticketsFrom:"Standard tickets from",statTicket:"Standard ticket",statMax:"Maximum seats per booking",statCancel:"Customer cancellation deadline",statSnacks:"Popcorn and water",
    moviesEyebrow:"FIND YOUR NEXT MOVIE",moviesTitle:"Now showing",searchMovies:"Search movies...",filterAll:"All movies",filterAnimation:"Animation",filterComedy:"Comedy",filterAdventure:"Adventure",emptyMovies:"No movies found.",
    comfortEyebrow:"COMFORT, YOUR WAY",comfortTitle:"More than a chair.<br><em>Your cinema style.</em>",comfortText:"Standard seats are spacious bed-style loungers. Choose your exact seat for €0.10 per booking, or upgrade a seat to an office chair.",
    featureBeds:"Bed-style seats",featureBedsDesc:"Included with the ticket",featureSelect:"Custom seat selection",featureSelectDesc:"€0.10 per booking",featureChair:"Office chair",featureChairDesc:"From €0.20 per seat",
    bookingEyebrow:"YOUR TICKETS IN ONE PLACE",bookingTitle:"My bookings",bookingLookupHelp:"Enter the booking code and the email address used for the reservation.",bookingCode:"Booking code",yourEmail:"Your email",lookupButton:"Find booking",
    footerText:"Dancing Fruit Cinema © 2026 · All rights reserved.",
    noShows:"There are no available screenings for this movie.",step1:"STEP 1 OF 4",step2:"STEP 2 OF 4",step3:"STEP 3 OF 4",step4:"STEP 4 OF 4",bookTickets:"Book tickets",date:"Screening date",time:"Screening time",ticketCount:"Number of tickets (maximum 8)",continue:"Continue →",cancel:"Cancel",chooseSeats:"Choose your seats",
    seatIntro:"Standard seats are spacious bed-style loungers. Let the system assign seats for free, or choose exact seats for",auto:"Automatic assignment",autoDesc:"No extra charge",custom:"Choose seats myself",customDesc:"per booking",screen:"CINEMA SCREEN",available:"Available",occupied:"Occupied",selected:"Selected",bedSeat:"Bed-style seat",chosenSeats:"Selected seats",needSeats:"Choose exactly",seats:"seats.",selectOnly:"You can select only",seats2:"seats.",notEnough:"There are not enough available seats for this screening.",
    extras:"Optional extras",extrasIntro:"Choose which seats you want to upgrade to office chairs. All other seats remain bed-style.",chairUpgrade:"Office chair",water:"Water",popcorn:"Popcorn",portion:"portion",beds:"Bed-style seat",summary:"Summary",tickets:"Tickets",seatSelection:"Seat selection",officeChairs:"Office chairs",snacks:"Water and popcorn",total:"Total",
    details:"Your details and confirmation",detailsIntro:"Enter your contact details for the booking confirmation.",name:"Name",email:"Email",cancellationRule:"Customers can cancel up to 24 hours before the screening starts. After that, only an administrator can cancel.",back:"← Back",confirm:"Confirm booking",validDetails:"Please enter a valid name and email address.",seatRace:"One of those seats was just booked. Please choose seats again.",confirmedEyebrow:"BOOKING CONFIRMED",confirmed:"See you at the cinema!",savedBrowser:"Your reservation has been saved on the server.",bookingNumber:"Booking reference",screening:"Screening",close:"Close",demoPayment:"This booking does not take an online payment. No ticket payment has been collected.",
    lookupMissing:"Enter the booking code and email address.",lookupNo:"No booking was found for that code and email.",statusConfirmed:"Confirmed",statusCancelled:"Cancelled",cancelBooking:"Cancel booking",cancelConfirm:"Are you sure you want to cancel this booking?",cancelled:"Booking cancelled. The seats are available again.",cancelTooLate:"Customers can only cancel up to 24 hours before the screening.",
    adminLogin:"Administrator login",adminIntro:"Enter the administrator account configured on the server.",username:"Username",password:"Password",login:"Log in",badLogin:"Incorrect username or password.",adminHint:"Open this window with Ctrl + Shift + Alt + P. Browsers usually cannot detect the Fn key, so it is not needed.",
    adminTitle:"Admin dashboard",adminIntro2:"Manage movies, screenings, bookings and prices.",tabMovies:"🎬 Movies & screenings",tabBookings:"🎟️ Bookings",tabPrices:"€ Prices",tabAccount:"⚙ Account",logout:"Log out",adminSession:"Administrator session",addMovie:"+ Add movie",edit:"Edit",delete:"Remove",noMovies:"There are no movies yet.",movieTitle:"Movie title",genre:"Genre",duration:"Duration (minutes)",ageRating:"Age rating",year:"Release year",posterEmoji:"Poster symbol",posterUrl:"Poster image URL (HTTPS)",posterUpload:"Upload poster image",posterRemove:"Remove poster",posterPreview:"Poster preview",posterUploadHelp:"Choose a JPG, PNG or WebP image. It will be resized and saved with the movie.",posterBackground:"Poster background CSS colour",description:"Description",schedule:"Screenings (one date per line)",scheduleHelp:"Format: YYYY-MM-DD:14:00,17:00 — put each date on a new line.",save:"Save",movieRequired:"Enter a title, description and valid duration.",invalidSchedule:"Check the screening date and time format.",movieSaved:"Movie saved.",movieDeleted:"Movie removed from the public list.",deleteMovieConfirm:"Remove this movie from the public list?",bookingList:"All bookings",noBookings:"There are no bookings yet.",priceTitle:"Price settings",priceTicket:"Standard ticket (€)",priceCustom:"Custom seat selection per booking (€)",priceOffice:"Office chair upgrade (€)",priceWater:"Water (€)",pricePopcorn:"Popcorn (€)",savePrices:"Save prices",pricesSaved:"Prices saved.",changePassword:"Change admin password",currentPassword:"Current password",newPassword:"New password (at least 12 characters)",passwordChanged:"Password changed.",passwordMin:"The new password must be at least 12 characters.",wrongCurrent:"The current password is incorrect.",serverError:"The server is currently unavailable. Check the server setup.",loading:"Loading...",bookNow:"Book ticket",min:"min",bookingSearchSuccess:"Booking found.",emptyScreenings:"No screenings added."
  }
};

let language = "lv";
let movies = [];
let prices = { ticket: 0.10, custom: 0.10, office: 0.20, water: 0.20, popcorn: 0.50 };
let selectedGenre = "all";
let booking = null;
let adminTab = "movies";
let currentUser = null;
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
const SERVER_ERROR_LV = {
  "Too many login attempts. Try again later.":"Pārāk daudz pieslēgšanās mēģinājumu. Mēģini vēlāk.",
  "Administrator login required.":"Nepieciešama administratora pieslēgšanās.",
  "Please sign in to your customer account.":"Lūdzu, pieslēdzies savam klienta kontam.",
  "Database unavailable.":"Datubāze pašlaik nav pieejama.",
  "Screening not found.":"Seanss nav atrasts.",
  "Enter a valid name and email. Password must be at least 8 characters.":"Ievadi derīgu vārdu un e-pastu. Parolei jābūt vismaz 8 rakstzīmēm.",
  "An account with this email already exists. Sign in instead.":"Konts ar šo e-pasta adresi jau pastāv. Tā vietā pieslēdzies.",
  "Incorrect email or password.":"Nepareizs e-pasts vai parole.",
  "Not signed in.":"Nav veikta pieslēgšanās.",
  "Booking not found in your account.":"Tavā kontā šāda rezervācija nav atrasta.",
  "This booking is already cancelled.":"Šī rezervācija jau ir atcelta.",
  "You can cancel online until 24 hours before the screening. Contact the cinema for later changes.":"Rezervāciju internetā var atcelt līdz 24 stundām pirms seansa. Vēlākām izmaiņām sazinies ar kinoteātri.",
  "Check your details. A booking can contain 1–10 tickets.":"Pārbaudi ievadītos datus. Vienā rezervācijā var būt no 1 līdz 10 biļetēm.",
  "Choose exactly the number of seats in your booking.":"Izvēlies tieši tik sēdvietu, cik biļešu ir rezervācijā.",
  "Custom seat details are not valid for automatic allocation.":"Izvēlētās sēdvietas nav derīgas automātiskai vietu piešķiršanai.",
  "Office chair upgrades must match selected seats.":"Biroja krēslu skaitam jāatbilst izvēlētajām sēdvietām.",
  "Too many office chair upgrades.":"Izvēlēts pārāk daudz biroja krēslu uzlabojumu.",
  "This screening has already started.":"Šis seanss jau ir sācies.",
  "One or more seats are no longer available. Refresh the seat map and try again.":"Viena vai vairākas sēdvietas vairs nav pieejamas. Atjauno sēdvietu plānu un mēģini vēlreiz.",
  "Enter the booking code and email address.":"Ievadi rezervācijas kodu un e-pasta adresi.",
  "No booking found for that code and email.":"Rezervācija ar šādu kodu un e-pasta adresi nav atrasta.",
  "Booking not found.":"Rezervācija nav atrasta.",
  "Booking already cancelled.":"Rezervācija jau ir atcelta.",
  "Customer cancellations close 24 hours before the screening.":"Klients var atcelt rezervāciju līdz 24 stundām pirms seansa.",
  "Incorrect username or password.":"Nepareizs lietotājvārds vai parole.",
  "Invalid ticket code format.":"Nederīgs biļetes koda formāts.",
  "Ticket code not found.":"Biļetes kods nav atrasts.",
  "This booking has been cancelled.":"Šī rezervācija ir atcelta.",
  "This ticket has already been scanned.":"Šī biļete jau ir pārbaudīta.",
  "Screening details not found.":"Seansa informācija nav atrasta.",
  "Movie title, description and valid duration are required.":"Jānorāda filmas nosaukums, apraksts un derīgs ilgums.",
  "Use an HTTPS poster image URL or upload a JPG, PNG or WebP image under 1 MB.":"Izmanto HTTPS plakāta attēla saiti vai augšupielādē JPG, PNG vai WebP attēlu, kas ir mazāks par 1 MB.",
  "Movie not found.":"Filma nav atrasta.",
  "This movie has booking history and cannot be deleted.":"Šo filmu nevar dzēst, jo tai ir rezervāciju vēsture.",
  "This screening has booking history and cannot be removed.":"Šo seansu nevar dzēst, jo tam ir rezervāciju vēsture.",
  "Invalid price.":"Nederīga cena.",
  "New password must be at least 12 characters.":"Jaunajai parolei jābūt vismaz 12 rakstzīmēm garai.",
  "Current password is incorrect.":"Pašreizējā parole nav pareiza."
};
function localizeServerError(message) {
  return SERVER_ERROR_LV[message] || (language === "lv" ? "Radās kļūda. Lūdzu, mēģini vēlreiz." : message);
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
    const error = new Error(localizeServerError(data.error || ("Request failed: " + response.status)));
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
    '<article class="movie-card" data-movie-details="' + escapeHTML(movie.id) + '" tabindex="0" role="button" aria-label="' + escapeHTML(movie.title) + '">' +
      '<div class="poster" style="background:' + posterBackground(movie.poster) + '">' +
        moviePosterContent(movie) + '<strong class="poster-title">' + escapeHTML(movie.title) + '</strong>' +
      '</div><div class="movie-info"><div class="movie-meta"><span>' + escapeHTML(genreName(movie.genre)) + '</span><span>•</span><span>' + escapeHTML(movie.duration) + " " + t("min") + '</span><span>•</span><span>' + escapeHTML(movie.age) + '</span></div>' +
      '<h3>' + escapeHTML(movie.title) + '</h3><p>' + escapeHTML(movie.description) + '</p>' +
      '<div class="movie-bottom"><strong>' + formatMoney(prices.ticket) + '</strong><button class="small-button" data-book="' + escapeHTML(movie.id) + '">' + t("bookNow") + '</button></div></div></article>'
  ).join("");
  $("#movieGrid").querySelectorAll(".movie-card").forEach((card, index) => revealElement(card, index * 75));
  $("#emptyMovies").classList.toggle("hidden", visible.length > 0);
}
function openMovieDetails(movieId) {
  const movie = movies.find((item) => item.id === movieId);
  if (!movie) return;
  const showings = showingsFor(movieId);
  const dates = [...new Set(showings.map((item) => item.date))];
  showModal(
    '<div class="movie-detail">' +
      '<div class="movie-detail-poster" style="background:' + posterBackground(movie.poster) + '">' + moviePosterContent(movie) + '</div>' +
      '<p class="eyebrow">' + escapeHTML(genreName(movie.genre)) + ' · ' + escapeHTML(movie.duration) + ' ' + t("min") + ' · ' + escapeHTML(movie.age) + '</p>' +
      '<h2 id="modalTitle">' + escapeHTML(movie.title) + '</h2><p class="movie-detail-description">' + escapeHTML(movie.description) + '</p>' +
      '<div class="movie-detail-facts"><span>' + escapeHTML(String(movie.year)) + '</span><span>' + escapeHTML(movie.age) + '</span><span>' + escapeHTML(movie.duration) + ' min</span></div>' +
      '<h3>' + (language === "lv" ? "Pieejamie seansi" : "Available screenings") + '</h3>' +
      (showings.length ? dates.map((date) => '<div class="movie-showing-day"><b>' + formatDate(date) + '</b><div class="movie-showing-times">' + showings.filter((item) => item.date === date).map((item) => '<button class="showtime-chip" data-detail-book="' + escapeHTML(movie.id) + '" data-showing="' + escapeHTML(item.id) + '">' + escapeHTML(item.time) + '</button>').join("") + '</div></div>').join("") : '<p class="admin-note">' + t("noShows") + '</p>') +
      '<div class="movie-detail-footer"><strong>' + formatMoney(prices.ticket) + ' <small>/ ' + (language === "lv" ? "biļete" : "ticket") + '</small></strong><button class="small-button" data-detail-buy="' + escapeHTML(movie.id) + '">' + t("bookNow") + '</button></div>' +
    '</div>'
  );
  document.querySelectorAll("[data-detail-book]").forEach((button) => button.onclick = () => {
    const id = button.dataset.detailBook, showingId = button.dataset.showing;
    openBooking(id);
    if (booking) {
      booking.screeningId = showingId;
      const selected = showingsFor(id).find((item) => item.id === showingId);
      if (selected) { booking.date = selected.date; booking.time = selected.time; }
      renderBookingDateStep();
    }
  });
  const buy = $("[data-detail-buy]");
  if (buy) buy.onclick = () => openBooking(movieId);
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
    '<p class="eyebrow">' + t("step1") + '</p><h2 id="modalTitle">' + t("bookTickets") + '</h2>' +
    '<p class="modal-intro">' + escapeHTML(movie.title) + ' · ' + movie.duration + ' ' + t("min") + ' · ' + escapeHTML(movie.age) + '</p>' +
    '<div class="form-grid">' +
      '<div class="field"><label for="bookDate">' + t("date") + '</label><select id="bookDate">' + dates.map((date) => '<option value="' + date + '"' + (date === booking.date ? " selected" : "") + '>' + formatDate(date) + '</option>').join("") + '</select></div>' +
      '<div class="field"><label for="bookTime">' + t("time") + '</label><select id="bookTime">' + dayShowings.map((item) => '<option value="' + item.id + '"' + (item.id === booking.screeningId ? " selected" : "") + '>' + escapeHTML(item.time) + '</option>').join("") + '</select></div>' +
      '<div class="field full"><label for="ticketCount">' + t("ticketCount") + '</label><select id="ticketCount">' + Array.from({length:10},(_,index)=>'<option value="'+(index+1)+'"'+(index===0?" selected":"")+'>'+(index+1)+'</option>').join("") + '</select></div>' +
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
  $("#ticketCount").onchange = (event) => booking.count = Math.min(10,Math.max(1,Number(event.target.value)));
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
  booking.officeSeats = booking.seats.filter((id) => id === "CHAIR-L" || id === "CHAIR-R");
  booking.officeCount = booking.officeSeats.length;
  const makeSeat = (seat) => {
    const chosen = booking.seats.includes(seat.seat_number);
    const klass = (seat.occupied ? "occupied " : "") + (chosen ? "selected " : "") + (seat.office_chair ? "office-seat" : "bed-seat");
    const disabled = seat.occupied || booking.mode === "auto";
    const label = seat.office_chair ? (seat.seat_number === "CHAIR-L" ? "KREISAIS" : "LABAIS") : "VIETA " + seat.seat_number.split("-")[1];
    return '<button class="seat ' + klass + '" data-seat="' + escapeHTML(seat.seat_number) + '"' + (disabled ? " disabled" : "") + '>' +
      (seat.office_chair ? "🪑" : "▰") + '<small>' + label + '</small></button>';
  };
  const bedSeats = booking.seatMap.filter((seat) => !seat.office_chair).map(makeSeat).join("");
  const sideChairs = booking.seatMap.filter((seat) => seat.office_chair);
  const leftChair = sideChairs.find((seat) => seat.seat_number === "CHAIR-L");
  const rightChair = sideChairs.find((seat) => seat.seat_number === "CHAIR-R");
  showModal(
    '<p class="eyebrow">' + t("step2") + '</p><h2 id="modalTitle">' + t("chooseSeats") + '</h2>' +
    '<p class="modal-intro">' + t("seatIntro") + ' ' + formatMoney(prices.custom) + '.</p>' +
    '<div class="choice-row"><button class="choice-card ' + (booking.mode === "auto" ? "active" : "") + '" id="autoMode"><b>' + t("auto") + '</b><small>' + t("autoDesc") + '</small></button>' +
    '<button class="choice-card ' + (booking.mode === "custom" ? "active" : "") + '" id="customMode"><b>' + t("custom") + '</b><small>' + formatMoney(prices.custom) + ' ' + t("customDesc") + '</small></button></div>' +
    '<div class="screen-label">' + t("screen") + '</div>' +
    '<div class="bedroom-map"><div class="side-chair"><span>BIROJA KRĒSLS</span>' + makeSeat(leftChair) + '</div>' +
    '<div class="cinema-bed"><div class="bed-pillows"><i></i><i></i></div><div class="bed-caption">8 VIETU KINO GULTA</div><div class="bed-seat-grid">' + bedSeats + '</div></div>' +
    '<div class="side-chair"><span>BIROJA KRĒSLS</span>' + makeSeat(rightChair) + '</div></div>' +
    '<div class="seat-legend"><span><i class="legend-box" style="background:#183d30"></i>' + t("available") + '</span><span><i class="legend-box" style="background:#63272b"></i>' + t("occupied") + '</span><span><i class="legend-box" style="background:#8e6421"></i>' + t("selected") + '</span><span>▰ Gultas vieta</span><span>🪑 Biroja krēsls</span></div>' +
    '<div class="seat-actions">' + t("chosenSeats") + ': <b>' + (booking.mode === "auto" ? t("autoDesc") : booking.seats.map(escapeHTML).join(", ")) + '</b><br>' + t("needSeats") + ' ' + booking.count + ' ' + t("seats") + '</div>' +
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
    booking.officeSeats = booking.seats.filter((id) => id === "CHAIR-L" || id === "CHAIR-R");
    booking.officeCount = booking.officeSeats.length;
    booking.waterCount = 0;
    booking.popcornCount = 0;
    renderExtrasStep();
  };
}
function currentTotal() {
  return booking.count * prices.ticket +
    (booking.mode === "custom" ? prices.custom : 0) +
    (booking.mode === "custom" ? booking.officeSeats.length : booking.officeCount) * prices.office +
    booking.waterCount * prices.water + booking.popcornCount * prices.popcorn;
}
function renderExtrasStep() {
  const chairOptions = '<div class="seat-actions">Sānu biroja krēsli: ' +
    (booking.officeSeats.length ? booking.officeSeats.join(", ") : "nav izvēlēti") +
    ' · ' + formatMoney(prices.office) + ' par katru rezervēto krēslu.</div>';
  showModal(
    '<p class="eyebrow">' + t("step3") + '</p><h2 id="modalTitle">' + t("extras") + '</h2><p class="modal-intro">' + t("extrasIntro") + '</p>' +
    chairOptions +
    '<div class="form-grid" style="margin-top:18px"><div class="field"><label for="waterCount">' + t("water") + ' (' + formatMoney(prices.water) + ')</label><input id="waterCount" type="number" min="0" max="20" value="0"></div>' +
    '<div class="field"><label for="popcornCount">' + t("popcorn") + ' (' + formatMoney(prices.popcorn) + ')</label><input id="popcornCount" type="number" min="0" max="20" value="0"></div></div>' +
    '<div class="summary-box">' +
      '<div class="summary-line"><span>' + t("tickets") + ' (' + booking.count + ')</span><b>' + formatMoney(booking.count * prices.ticket) + '</b></div>' +
      '<div class="summary-line"><span>' + t("seatSelection") + '</span><b>' + formatMoney(booking.mode === "custom" ? prices.custom : 0) + '</b></div>' +
      '<div class="summary-line"><span>' + t("officeChairs") + '</span><b id="officePrice">' + formatMoney(0) + '</b></div>' +
      '<div class="summary-line"><span>' + t("snacks") + '</span><b id="snackPrice">' + formatMoney(0) + '</b></div>' +
      '<div class="summary-line total"><span>' + t("total") + '</span><b id="grandTotal">' + formatMoney(currentTotal()) + '</b></div></div>' +
    '<div class="modal-actions"><button class="button button-secondary" id="backToSeats">' + t("back") + '</button><button class="small-button" id="toCustomerDetails">' + t("continue") + '</button></div>'
  );
  function refreshCosts() {
    if (booking.mode === "auto") booking.officeCount = booking.officeSeats.length;
    booking.waterCount = Math.max(0,Math.min(20,Number($("#waterCount").value)||0));
    booking.popcornCount = Math.max(0,Math.min(20,Number($("#popcornCount").value)||0));
    const officeCount = booking.mode === "custom" ? booking.officeSeats.length : booking.officeCount;
    $("#officePrice").textContent = formatMoney(officeCount * prices.office);
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
  if (!currentUser) { openAccountModal("register",true); return; }
  const movie = movies.find((item) => item.id === booking.movieId);
  const officeCount = booking.mode === "custom" ? booking.officeSeats.length : booking.officeCount;
  showModal(
    '<p class="eyebrow">' + t("step4") + '</p><h2 id="modalTitle">' + t("details") + '</h2><p class="modal-intro">' + t("detailsIntro") + '</p>' +
    '<div class="account-identity"><b>' + escapeHTML(currentUser.name) + '</b><span>' + escapeHTML(currentUser.email) + '</span><small>' + (language==="lv"?"Rezervācija tiks saglabāta tavā kontā.":"This booking will be saved to your account.") + '</small></div>' +
    '<div class="summary-box"><div class="summary-line"><span>' + t("screening") + '</span><b>' + escapeHTML(movie.title) + ' · ' + formatDate(booking.date) + ' · ' + escapeHTML(booking.time) + '</b></div>' +
    '<div class="summary-line"><span>' + t("chosenSeats") + '</span><b>' + (booking.mode === "custom" ? booking.seats.map(escapeHTML).join(", ") : t("auto")) + '</b></div>' +
    '<div class="summary-line"><span>' + t("officeChairs") + ' / ' + t("snacks") + '</span><b>' + officeCount + ' · ' + booking.waterCount + ' ' + t("water").toLowerCase() + ' · ' + booking.popcornCount + ' ' + t("popcorn").toLowerCase() + '</b></div>' +
    '<div class="summary-line total"><span>' + t("total") + '</span><b>' + formatMoney(currentTotal()) + '</b></div></div>' +
    '<div class="payment-arrival"><b>' + (language==="lv"?"APMAKSA UZ VIETAS":"PAY AT THE CINEMA") + '</b><span>' + (language==="lv"?"Par rezervāciju maksāsi, ierodoties kinoteātrī. Tiešsaistē nekas netiek iekasēts.":"Pay when you arrive at the cinema. No online payment is taken.") + '</span></div>' +
    '<p class="admin-note">' + t("cancellationRule") + '</p>' +
    '<div class="modal-actions"><button class="button button-secondary" id="backToExtras">' + t("back") + '</button><button class="small-button" id="confirmBooking">' + t("confirm") + '</button></div>'
  );
  $("#backToExtras").onclick = renderExtrasStep;
  $("#confirmBooking").onclick = async () => {
    const name = currentUser?.name || "";
    const email = currentUser?.email || "";
    if (!currentUser) { openAccountModal("login",true); return; }
    const officeSeats = booking.mode === "custom" ? booking.officeSeats : [];
    try {
      const result = await api("/bookings", {
        method:"POST",
        body:{
          screeningId:booking.screeningId,
          ticketCount:booking.count,
          customSelection:booking.mode === "custom",
          selectedSeats:booking.mode === "custom" ? booking.seats : [],
          officeSeats,
          officeChairCount:booking.mode === "auto" ? booking.officeCount : 0,
          waterCount:booking.waterCount,
          popcornCount:booking.popcornCount
        }
      });
      renderConfirmation(result.booking);
    } catch (error) {
      toast(error.message);
      if (error.status === 409) renderSeatStep();
    }
  };
}
function code39Svg(value) {
  const patterns={ "0":"nnnwwnwnn","1":"wnnwnnnnw","2":"nnwwnnnnw","3":"wnwwnnnnn","4":"nnnwwnnnw","5":"wnnwwnnnn","6":"nnwwwnnnn","7":"nnnwnnwnw","8":"wnnwnnwnn","9":"nnwwnnwnn","A":"wnnnnwnnw","B":"nnwnnwnnw","C":"wnwnnwnnn","D":"nnnnwwnnw","E":"wnnnwwnnn","F":"nnwnwwnnn","G":"nnnnnwwnw","H":"wnnnnwwnn","I":"nnwnnwwnn","J":"nnnnwwwnn","K":"wnnnnnnww","L":"nnwnnnnww","M":"wnwnnnnwn","N":"nnnnwnnww","O":"wnnnwnnwn","P":"nnwnwnnwn","Q":"nnnnnnwww","R":"wnnnnnwwn","S":"nnwnnnwwn","T":"nnnnwnwwn","U":"wwnnnnnnw","V":"nwwnnnnnw","W":"wwwnnnnnn","X":"nwnnwnnnw","Y":"wwnnwnnnn","Z":"nwwnwnnnn","-":"nwnnnnwnw","*":"nwnnwnwnn"};
  const text="*"+String(value).toUpperCase()+"*";let x=8,rects="";
  for(const char of text){const pattern=patterns[char];if(!pattern)continue;for(let i=0;i<pattern.length;i++){const width=pattern[i]==="w"?3:1;if(i%2===0)rects+='<rect x="'+x+'" y="0" width="'+width+'" height="62" fill="#111"/>';x+=width;}x+=1;}
  return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ticket barcode" viewBox="0 0 '+(x+8)+' 62" preserveAspectRatio="none">'+rects+'</svg>';
}
function printTicket(item,movie,bookingState,user) {
  const barcode=code39Svg(item.code);
  const html='<!doctype html><html><head><meta charset="utf-8"><title>Cinema ticket</title><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;background:#eee;padding:24px}.ticket{max-width:720px;margin:auto;background:white;color:#161616;border:2px solid #222;border-radius:16px;padding:28px}.top{display:flex;justify-content:space-between;border-bottom:2px dashed #aaa;padding-bottom:14px;font-weight:bold;letter-spacing:2px}.ticket h1{font-size:30px;margin:22px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.grid span{display:block;font-size:11px;color:#666}.grid b{display:block;margin-top:5px;overflow-wrap:anywhere}.barcode{margin:28px auto 8px;max-width:620px}.barcode svg{width:100%;height:110px}.code{text-align:center;font: bold 18px monospace;letter-spacing:2px}.pay{text-align:center;margin-top:20px;padding:12px;border:1px dashed #555;font-weight:bold}@media print{body{background:white;padding:0}.ticket{border:1px solid #111;break-inside:avoid}}</style></head><body><article class="ticket"><div class="top"><b>DANCING FRUIT CINEMA</b><span>ADMIT ONE</span></div><h1>'+escapeHTML(movie?.title||"Cinema")+'</h1><div class="grid"><div><span>NAME / VĀRDS</span><b>'+escapeHTML(user.name)+'</b></div><div><span>EMAIL / E-PASTS</span><b>'+escapeHTML(user.email)+'</b></div><div><span>DATE / DATUMS</span><b>'+escapeHTML(bookingState.date)+'</b></div><div><span>TIME / LAIKS</span><b>'+escapeHTML(bookingState.time)+'</b></div><div><span>SEATS / VIETAS</span><b>'+item.seats.map(escapeHTML).join(", ")+'</b></div></div><div class="barcode">'+barcode+'</div><div class="code">'+escapeHTML(item.code)+'</div><div class="pay">PAY AT CINEMA · APMAKSA UZ VIETAS</div></article></body></html>';
  const win=window.open("","_blank");
  if(!win){toast(language==="lv"?"Atļauj uznirstošos logus, lai drukātu biļeti.":"Allow pop-ups to print the ticket.");return;}
  win.document.open();win.document.write(html);win.document.close();setTimeout(()=>win.print(),500);
}
function downloadTicketSvg(item,movie,state,user){
 const barcode=code39Svg(item.code),match=barcode.match(/viewBox="0 0 ([0-9]+) 62"/),bars=barcode.slice(barcode.indexOf(">")+1,barcode.lastIndexOf("</svg>")),width=match?Number(match[1]):400;
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="620" viewBox="0 0 1000 620"><rect width="1000" height="620" rx="28" fill="#fffaf4"/><rect x="18" y="18" width="964" height="584" rx="22" fill="none" stroke="#5b3038" stroke-width="4"/><text x="55" y="75" font-family="Arial" font-size="28" font-weight="bold" fill="#5b3038">DANCING FRUIT CINEMA</text><text x="945" y="75" text-anchor="end" font-family="Arial" font-size="18" fill="#5b3038">ADMIT ONE</text><path d="M55 100H945" stroke="#bda8a4" stroke-dasharray="9 9" stroke-width="3"/><text x="55" y="165" font-family="Arial" font-size="46" font-weight="bold" fill="#21191a">'+escapeHTML(movie?.title||"Cinema")+'</text><g font-family="Arial" fill="#76666a" font-size="16"><text x="55" y="225">NAME / VĀRDS</text><text x="520" y="225">EMAIL / E-PASTS</text><text x="55" y="320">DATE / DATUMS</text><text x="520" y="320">TIME / LAIKS</text><text x="55" y="390">SEATS / VIETAS</text></g><g font-family="Arial" font-size="24" font-weight="bold" fill="#21191a"><text x="55" y="260">'+escapeHTML(user.name)+'</text><text x="520" y="260">'+escapeHTML(user.email)+'</text><text x="55" y="355">'+escapeHTML(state.date)+'</text><text x="520" y="355">'+escapeHTML(state.time)+'</text><text x="55" y="425">'+item.seats.map(escapeHTML).join(", ")+'</text></g><g transform="translate(90 455) scale('+(800/width)+' 1.65)">'+bars+'</g><text x="500" y="570" text-anchor="middle" font-family="monospace" font-size="25" font-weight="bold" letter-spacing="3" fill="#21191a">'+escapeHTML(item.code)+'</text><text x="500" y="595" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" letter-spacing="2" fill="#5b3038">PAY AT CINEMA · APMAKSA UZ VIETAS</text></svg>';
 const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"})),link=document.createElement("a");link.href=url;link.download="Dancing-Fruit-Ticket-"+item.code+".svg";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function renderConfirmation(item) {
  const movie=movies.find(entry=>entry.id===booking.movieId);
  const seats=item.seats||[];
  showModal(
    '<div class="ticket-confirmation"><p class="eyebrow">'+t("confirmedEyebrow")+'</p><h2 id="modalTitle">'+t("confirmed")+'</h2>'+
    '<div class="print-ticket" id="printTicket"><div class="ticket-top"><b>DANCING FRUIT CINEMA</b><span>ADMIT ONE / KINO BIĻETE</span></div>'+
    '<h3>'+escapeHTML(movie?.title||"")+'</h3><div class="ticket-details"><span><small>NAME / VĀRDS</small><b>'+escapeHTML(currentUser.name)+'</b></span><span><small>EMAIL / E-PASTS</small><b>'+escapeHTML(currentUser.email)+'</b></span><span><small>DATE / DATUMS</small><b>'+formatDate(booking.date)+'</b></span><span><small>TIME / LAIKS</small><b>'+escapeHTML(booking.time)+'</b></span><span><small>SEATS / VIETAS</small><b>'+seats.map(escapeHTML).join(", ")+'</b></span></div>'+
    '<div class="ticket-barcode">'+code39Svg(item.code)+'</div><div class="ticket-code-text">'+escapeHTML(item.code)+'</div><div class="ticket-pay">PAY AT CINEMA · APMAKSA UZ VIETAS</div></div>'+
    '<p class="modal-intro">'+(language==="lv"?"Biļete automātiski saglabāta tavā kontā. Vari to izdrukāt vai atstāt kontā un atvērt vēlāk.":"Your ticket is saved in your account. Print it now or leave it there and open it later.")+'</p>'+
    '<div class="ticket-actions"><button class="small-button" id="printTicketButton">'+(language==="lv"?"Drukāt biļeti":"Print ticket")+'</button><button class="button button-secondary" id="keepTicketButton">'+(language==="lv"?"Atstāt manā kontā":"Keep in my account")+'</button></div></div>'
  );
  $("#printTicketButton").onclick=()=>printTicket(item,movie,booking,currentUser);
  $("#printTicketButton").insertAdjacentHTML("afterend",'<button class="button button-secondary" id="downloadTicketButton">'+(language==="lv"?"Saglabāt attēlu":"Save ticket image")+'</button>');
  $("#downloadTicketButton").onclick=()=>downloadTicketSvg(item,movie,booking,currentUser);
  $("#keepTicketButton").onclick=()=>{closeModal();loadAccountBookings();document.querySelector("#my-bookings").scrollIntoView({behavior:"smooth"});};
  loadAccountBookings();
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
        $("#customerBookings").innerHTML = "";
        delete $("#customerBookings").dataset.code;
        delete $("#customerBookings").dataset.email;
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
    '<button class="active" data-admin-tab="movies">' + t("tabMovies") + '</button><button data-admin-tab="bookings">' + t("tabBookings") + '</button>' +
    '<button data-admin-tab="scan">🎫 ' + (language === "lv" ? "Skenēt biļetes" : "Scan tickets") + '</button><button data-admin-tab="prices">' + t("tabPrices") + '</button><button data-admin-tab="account">' + t("tabAccount") + '</button></aside>' +
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
    if (adminTab === "movies") await renderAdminMovies(panel);
    if (adminTab === "bookings") await renderAdminBookings(panel);
    if (adminTab === "scan") renderTicketScanner(panel);
    if (adminTab === "prices") await renderAdminPrices(panel);
    if (adminTab === "account") renderAdminAccount(panel);
  } catch(error) { panel.innerHTML = '<p class="admin-note">' + escapeHTML(error.message) + '</p>'; }
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
  const list = (data.bookings || []).filter((item) => item.status === "confirmed");
  panel.innerHTML = '<h3>' + t("bookingList") + '</h3>' + (list.length ? list.map((item) =>
    '<div class="admin-item"><div><b>' + escapeHTML(item.code) + ' · ' + escapeHTML(item.name) + '</b><small>' +
    escapeHTML(item.movie) + ' · ' + formatDate(item.date) + ' · ' + escapeHTML(item.time) + ' · ' + item.seats.map(escapeHTML).join(", ") +
    '</small><small>' + escapeHTML(item.email) + ' · ' + formatMoney(item.total) + ' · ' + (item.checkedIn ? (language === "lv" ? "Ienākusi" : "Checked in") : (language === "lv" ? "Nav skenēta" : "Not scanned")) + ' · ' + (item.status === "cancelled" ? t("statusCancelled") : t("statusConfirmed")) +
    '</small></div>' + (item.status === "confirmed" ? '<button class="danger-button" data-admin-cancel="' + escapeHTML(item.code) + '">' + t("cancelBooking") + '</button>' : "") + '</div>'
  ).join("") : '<p class="admin-note">' + t("noBookings") + '</p>');
  document.querySelectorAll("[data-admin-cancel]").forEach((button) => button.onclick = async () => {
    if (!confirm(t("cancelConfirm"))) return;
    try {
      await api("/admin/bookings/"+encodeURIComponent(button.dataset.adminCancel)+"/cancel",{method:"POST"});
      toast(t("cancelled")); await renderAdminBookings($("#adminPanel"));
    } catch(error) { toast(error.message); }
  });
}
function createScanAudio(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;const ctx=new Audio();if(ctx.state==="suspended")ctx.resume().catch(()=>{});return ctx;}catch{return null;}}
function playScanBeep(valid,ctx){
  try{
    if(!ctx)return;
    const now=ctx.currentTime;
    if(valid){
      // Īss, skaidrs pašapkalpošanās kases svītrkoda skenera signāls.
      const master=ctx.createGain();
      master.gain.setValueAtTime(0.0001,now);
      master.gain.exponentialRampToValueAtTime(0.72,now+0.006);
      master.gain.setValueAtTime(0.72,now+0.075);
      master.gain.exponentialRampToValueAtTime(0.0001,now+0.12);
      master.connect(ctx.destination);
      [1046.5,2093].forEach((frequency,index)=>{
        const tone=ctx.createOscillator(),level=ctx.createGain();
        tone.type="sine";tone.frequency.value=frequency;
        level.gain.value=index===0?1:0.12;
        tone.connect(level);level.connect(master);
        tone.start(now);tone.stop(now+0.125);
      });
      setTimeout(()=>ctx.close().catch(()=>{}),250);
    }else{
      const oscillator=ctx.createOscillator(),gain=ctx.createGain();
      oscillator.type="triangle";oscillator.frequency.value=260;
      gain.gain.setValueAtTime(0.0001,now);
      gain.gain.exponentialRampToValueAtTime(0.42,now+0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001,now+0.32);
      oscillator.connect(gain);gain.connect(ctx.destination);
      oscillator.start(now);oscillator.stop(now+0.34);
      oscillator.onended=()=>ctx.close().catch(()=>{});
    }
  }catch{try{ctx.close();}catch{}}
}

function renderTicketScanner(panel) {
  panel.innerHTML =
    '<div class="scanner-heading"><div><p class="eyebrow">DANCING FRUIT CINEMA</p><h3>' + (language === "lv" ? "Biļešu pārbaude" : "Ticket check-in") + '</h3><p class="admin-note">' + (language === "lv" ? "Ievadi vai noskenē biļetes kodu. Skenētājs, kas darbojas kā tastatūra, ievadīs kodu automātiski." : "Type or scan a ticket code. A keyboard-style barcode scanner can enter the code automatically.") + '</p></div><span class="scanner-icon">▣</span></div>' +
    '<div class="scanner-form"><label for="ticketScanCode">' + (language === "lv" ? "Biļetes kods" : "Ticket code") + '</label><div class="scanner-input-row"><input id="ticketScanCode" autocomplete="off" placeholder="Dncngfrt-XXX-XXX-XXX-000000"><button class="small-button" id="scanTicketButton">' + (language === "lv" ? "Pārbaudīt" : "Check ticket") + '</button></div></div>' +
    '<div id="ticketScanResult" class="ticket-scan-result"><span class="scan-idle">▣</span><p>' + (language === "lv" ? "Gatavs pārbaudīt biļeti" : "Ready to check a ticket") + '</p></div>';
  const input=$("#ticketScanCode"), button=$("#scanTicketButton"), result=$("#ticketScanResult");
  const scan=async()=>{
    const code=input.value.trim();
    if(!code){input.focus();return;}
    const scanAudio=createScanAudio();
    button.disabled=true;button.textContent=language==="lv"?"Pārbauda…":"Checking…";
    result.innerHTML='<p>'+(language==="lv"?"Pārbauda kodu…":"Checking code…")+'</p>';
    try{
      const data=await api("/admin/tickets/scan",{method:"POST",body:{code}});
      playScanBeep(true,scanAudio);
      const item=data.ticket;
      result.innerHTML='<div class="scan-success">✓</div><p class="scan-status">'+(language==="lv"?"BIĻETE DERĪGA":"TICKET VALID")+'</p><h3>'+escapeHTML(item.movie)+'</h3><p>'+escapeHTML(item.name)+' · '+escapeHTML(item.date)+' · '+escapeHTML(item.time)+'</p><p>'+(language==="lv"?"Vietas":"Seats")+': '+item.seats.map(escapeHTML).join(", ")+'</p><strong>'+escapeHTML(item.code)+'</strong><small>'+(language==="lv"?"Atzīmēta kā izmantota":"Marked as checked in")+'</small>';
      input.value="";
    }catch(error){
      playScanBeep(false,scanAudio);
      result.innerHTML='<div class="scan-error">×</div><p class="scan-status">'+(language==="lv"?"BIĻETE NAV DERĪGA":"TICKET NOT VALID")+'</p><p>'+escapeHTML(error.message)+'</p>';
    }finally{button.disabled=false;button.textContent=language==="lv"?"Pārbaudīt":"Check ticket";input.focus();}
  };
  button.onclick=scan;
  input.onkeydown=(event)=>{if(event.key==="Enter"){event.preventDefault();scan();}};
  input.focus();
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

function openAccountModal(mode,returnToBooking=false) {
  const register=mode==="register";
  showModal('<p class="eyebrow">DANCING FRUIT CINEMA</p><h2 id="modalTitle">'+(register?(language==="lv"?"Izveidot kontu":"Create account"):(language==="lv"?"Pieslēgties":"Sign in"))+'</h2><p class="modal-intro">'+(language==="lv"?"Tavs konts glabā rezervācijas un biļetes.":"Your account keeps your bookings and tickets.")+'</p>'+
    (register?'<div class="field"><label for="accountName">'+(language==="lv"?"Vārds":"Name")+'</label><input id="accountName" maxlength="70" autocomplete="name"></div>':'')+
    '<div class="field"><label for="accountEmail">E-pasts / Email</label><input id="accountEmail" type="email" autocomplete="email"></div><div class="field"><label for="accountPassword">'+(language==="lv"?"Parole":"Password")+'</label><input id="accountPassword" type="password" autocomplete="'+(register?"new-password":"current-password")+'"></div>'+
    (register?'<p class="admin-note">'+(language==="lv"?"Parolei jābūt vismaz 8 rakstzīmes garai.":"Password must be at least 8 characters.")+'</p>':'')+
    '<button class="small-button" id="accountSubmit" style="width:100%;margin-top:15px">'+(register?(language==="lv"?"Izveidot kontu":"Create account"):(language==="lv"?"Pieteikties":"Sign in"))+'</button>'+
    '<p class="account-switch">'+(register?(language==="lv"?"Jau ir konts?":"Already have an account?"):(language==="lv"?"Nav konta?":"Need an account?"))+' <button id="accountSwitch">'+(register?(language==="lv"?"Pieslēgties":"Sign in"):(language==="lv"?"Reģistrēties":"Create account"))+'</button></p>');
  $("#accountSwitch").onclick=()=>openAccountModal(register?"login":"register",returnToBooking);
  $("#accountSubmit").onclick=async()=>{
    const body={email:$("#accountEmail").value.trim(),password:$("#accountPassword").value};
    if(register)body.name=$("#accountName").value.trim();
    try{
      const result=await api(register?"/account/register":"/account/login",{method:"POST",body});
      currentUser=result.user;updateAccountButton();closeModal();loadAccountBookings();
      if(returnToBooking&&booking)renderCustomerDetailsStep();else toast(language==="lv"?"Konts gatavs!":"You're signed in!");
    }catch(error){toast(error.message);}
  };
}
function updateAccountButton(){const button=$("#accountButton");if(button)button.textContent=currentUser?(language==="lv"?"Mans konts":"My account"):(language==="lv"?"Pieteikties":"Sign in");}
async function loadAccountBookings(){
  const target=$("#accountBookings");if(!target)return;
  const lookup=$("#bookingLookup");if(lookup)lookup.classList.toggle("hidden",Boolean(currentUser));
  const legacy=$("#customerBookings");if(legacy)legacy.classList.toggle("hidden",Boolean(currentUser));
  if(!currentUser){target.innerHTML="";return;}
  try{
    const data=await api("/account/bookings");
    target.innerHTML='<div class="account-dashboard"><div class="account-heading"><div><p class="eyebrow">'+(language==="lv"?"TAVS KINO KONTs":"YOUR CINEMA ACCOUNT")+'</p><h3>'+escapeHTML(currentUser.name)+'</h3><p>'+escapeHTML(currentUser.email)+'</p></div><button class="button button-secondary" id="accountLogout">'+(language==="lv"?"Izrakstīties":"Sign out")+'</button></div><h3>'+(language==="lv"?"Manas biļetes":"My tickets")+'</h3>'+
      ((data.bookings||[]).length?data.bookings.map(item=>'<article class="account-ticket"><div><b>'+escapeHTML(item.movie)+'</b><small>'+formatDate(item.date)+' · '+escapeHTML(item.time)+' · '+item.seats.map(escapeHTML).join(", ")+'</small><small>'+escapeHTML(item.code)+' · '+(item.status==="cancelled"?(language==="lv"?"Atcelta":"Cancelled"):(item.checkedIn?(language==="lv"?"Izmantota":"Checked in"):(language==="lv"?"Apstiprināta":"Confirmed")))+'</small></div><div class="account-ticket-actions">'+(item.status==="confirmed"?'<button class="small-button" data-account-ticket="'+escapeHTML(item.code)+'">'+(language==="lv"?"Atvērt biļeti":"Open ticket")+'</button>'+(new Date(item.startsAt).getTime()-Date.now()>24*3600000?'<button class="danger-button" data-account-cancel="'+escapeHTML(item.code)+'">'+(language==="lv"?"Atcelt":"Cancel")+'</button>':''):'')+'</div></article>').join(""):'<p class="admin-note">'+(language==="lv"?"Vēl nav rezervāciju.":"No bookings yet.")+'</p>')+'</div>';
    $("#accountLogout").onclick=async()=>{await api("/account/logout",{method:"POST"});currentUser=null;updateAccountButton();target.innerHTML="";const lookup=$("#bookingLookup");if(lookup)lookup.classList.remove("hidden");const legacy=$("#customerBookings");if(legacy)legacy.classList.remove("hidden");toast(language==="lv"?"Izrakstījies.":"Signed out.");};
    document.querySelectorAll("[data-account-cancel]").forEach(button=>button.onclick=async()=>{if(!confirm(t("cancelConfirm")))return;try{await api("/account/bookings/"+encodeURIComponent(button.dataset.accountCancel)+"/cancel",{method:"POST"});toast(t("cancelled"));loadAccountBookings();}catch(error){toast(error.message);}});
    document.querySelectorAll("[data-account-ticket]").forEach(button=>button.onclick=()=>openSavedTicket(button.dataset.accountTicket));
  }catch(error){target.innerHTML='<p class="admin-note">'+escapeHTML(error.message)+'</p>';}
}
async function openSavedTicket(code){
  const data=await api("/account/bookings"),item=data.bookings.find(row=>row.code===code);
  if(!item)return;
  const movie={title:item.movie};const state={date:item.date,time:item.time};
  showModal('<div class="ticket-confirmation"><h2 id="modalTitle">'+(language==="lv"?"Tava biļete":"Your ticket")+'</h2><div class="print-ticket" id="printTicket"><div class="ticket-top"><b>DANCING FRUIT CINEMA</b><span>ADMIT ONE / KINO BIĻETE</span></div><h3>'+escapeHTML(item.movie)+'</h3><div class="ticket-details"><span><small>NAME / VĀRDS</small><b>'+escapeHTML(item.name)+'</b></span><span><small>EMAIL / E-PASTS</small><b>'+escapeHTML(item.email)+'</b></span><span><small>DATE / DATUMS</small><b>'+formatDate(item.date)+'</b></span><span><small>TIME / LAIKS</small><b>'+escapeHTML(item.time)+'</b></span><span><small>SEATS / VIETAS</small><b>'+item.seats.map(escapeHTML).join(", ")+'</b></span></div><div class="ticket-barcode">'+code39Svg(item.code)+'</div><div class="ticket-code-text">'+escapeHTML(item.code)+'</div><div class="ticket-pay">PAY AT CINEMA · APMAKSA UZ VIETAS</div></div><button class="small-button" id="printSavedTicket">'+(language==="lv"?"Drukāt biļeti":"Print ticket")+'</button></div>');
  $("#printSavedTicket").onclick=()=>printTicket({code:item.code,seats:item.seats},movie,state,{name:item.name,email:item.email});
  $("#printSavedTicket").insertAdjacentHTML("afterend",'<button class="button button-secondary" id="downloadSavedTicket">'+(language==="lv"?"Saglabāt attēlu":"Save image")+'</button>');
  $("#downloadSavedTicket").onclick=()=>downloadTicketSvg({code:item.code,seats:item.seats},movie,state,{name:item.name,email:item.email});
}
document.addEventListener("click",(event)=>{
  const bookButton = event.target.closest("[data-book]");
  const detailCard = event.target.closest("[data-movie-details]");
  if (bookButton) { event.stopPropagation(); openBooking(bookButton.dataset.book); return; }
  if (detailCard) openMovieDetails(detailCard.dataset.movieDetails);
  if (event.target.closest("[data-close]")) closeModal();
});
document.querySelector("#movieGrid").addEventListener("keydown",(event)=>{
  const card=event.target.closest("[data-movie-details]");
  if(card && (event.key==="Enter" || event.key===" ")){event.preventDefault();openMovieDetails(card.dataset.movieDetails);}
});
document.addEventListener("keydown",(event)=>{
  // The Fn key is usually handled by the keyboard hardware and is not exposed to browser JavaScript.
  if (event.ctrlKey && event.shiftKey && event.altKey && event.key.toLowerCase() === "p") {
    event.preventDefault(); openAdmin();
  }
  if (event.key === "Escape" && !$("#modalBackdrop").classList.contains("hidden")) closeModal();
});
$("#modalClose").addEventListener("click",closeModal);
$("#accountButton").addEventListener("click",()=>currentUser?loadAccountBookings().then(()=>document.querySelector("#my-bookings").scrollIntoView({behavior:"smooth"})):openAccountModal("login"));
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
    if(currentUser){await loadAccountBookings();return;}
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
        toast(t("cancelled")); $("#customerBookings").innerHTML = ""; $("#bookingLookup").requestSubmit();
      } catch(error) { toast(error.message); }
    };
  } catch(error) {
    $("#customerBookings").innerHTML = '<p class="admin-note">' + escapeHTML(error.message || t("lookupNo")) + '</p>';
  }
});
$("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach((link)=>link.addEventListener("click",()=>$("#mainNav").classList.remove("open")));

setupMotion();
applyLanguage();
api("/account/me").then(data=>{currentUser=data.user;updateAccountButton();loadAccountBookings();}).catch(()=>updateAccountButton());
loadData();
