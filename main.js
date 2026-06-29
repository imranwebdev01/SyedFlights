/* ============================================================
   SYEDFLIGHTS — main.js  (cleaned & fixed)
============================================================ */

"use strict";

/* ============ API BASE URL ============ */
const API_BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://syedflights-backend-production.up.railway.app";

/* ============ GLOBAL HELPERS ============
   FIX: $$ does NOT accept a second (scope) argument in the original
   code — document.querySelectorAll only takes one argument.
   Scoped queries now use element.querySelectorAll() directly where needed.
*/
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ============ ESCAPE HELPER ============ */
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/* ============ STAR RENDERER ============ */
function renderStars(n) {
  let h = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(n)) {
      h += '<i class="ri-star-fill" aria-hidden="true"></i>';
    } else if (i < n) {
      h += '<i class="ri-star-half-fill" aria-hidden="true"></i>';
    } else {
      h += '<i class="ri-star-line" aria-hidden="true"></i>';
    }
  }
  return h;
}

/* ============================================================
   STATIC DATA
============================================================ */
const DATA = {
  destinations: [
    { city: 'New York',  country: 'United States', rating: 4.8, price: 299, badge: 'Trending',    image: 'assets/destination-1.jpg' },
    { city: 'Paris',     country: 'France',         rating: 4.9, price: 449, badge: 'Most Loved',  image: 'assets/destination-2.jpg' },
    { city: 'Bali',      country: 'Indonesia',      rating: 4.7, price: 389, badge: 'Best Value',  image: 'assets/destination-3.jpg' },
    { city: 'Dubai',     country: 'UAE',            rating: 4.8, price: 520, badge: 'Luxury',      image: 'assets/destination-4.jpg' },
    { city: 'Tokyo',     country: 'Japan',          rating: 4.9, price: 699, badge: 'Exotic',      image: 'assets/destination-5.jpg' },
    { city: 'Istanbul',  country: 'Turkey',         rating: 4.6, price: 349, badge: 'Hidden Gem',  image: 'assets/destination-6.jpg' },
  ],
  why: [
    { icon: 'ri-shield-check-fill',       title: 'Secure Booking',       text: 'Bank-grade encryption protects every transaction. Book with complete confidence.' },
    { icon: 'ri-price-tag-3-fill',        title: 'Best Price Guarantee', text: "Found it cheaper elsewhere? We'll match it and give you an extra 10% off." },
    { icon: 'ri-customer-service-2-fill', title: '24/7 Expert Support',  text: 'Our travel specialists are available around the clock, wherever you are.' },
    { icon: 'ri-calendar-check-fill',     title: 'Flexible Changes',     text: 'Plans change. Modify or cancel up to 24 hours before departure, no fee.' },
    { icon: 'ri-map-2-fill',              title: 'Curated Itineraries',  text: 'Expertly designed travel plans tailored to your style, budget, and interests.' },
    { icon: 'ri-award-fill',              title: 'Loyalty Rewards',      text: 'Earn miles on every booking. Redeem for upgrades, lounges, and free flights.' },
  ],
  packages: [
    {
      featured: true, badge: 'Most Popular', icon: 'ri-vip-crown-fill',
      name: 'Business Class Escape',
      desc: 'Lie-flat seats, fine dining at 40,000 feet, and a 5-star hotel on arrival.',
      price: '2,499',
      features: ['Business class flights', '5-star hotel (7 nights)', 'Private airport transfers', 'Lounge access included'],
      btn: 'btn-primary',
    },
    {
      icon: 'ri-sun-fill', name: 'Weekend Getaway',
      desc: 'Short on time, big on experience. Perfect 3-day escapes to nearby gems.',
      price: '499',
      features: ['Economy class flights', '4-star hotel (3 nights)', 'City tour included', 'Flexible dates'],
      btn: 'btn-outline',
    },
    {
      icon: 'ri-seedling-fill', name: 'Family Adventure',
      desc: 'Memories that last a lifetime. Kid-friendly destinations for all ages.',
      price: '1,299',
      features: ['Family seating together', 'Resort hotel (10 nights)', 'Kids activities included', 'Travel insurance'],
      btn: 'btn-outline',
    },
  ],
  reviews: [
    { stars: 5,   text: "SyedFlights turned our honeymoon into a dream. Every detail was perfect — from the seamless booking to the upgrade surprise at check-in.", name: 'Amina Rashid',   loc: 'Dubai, UAE' },
    { stars: 5,   text: "As a frequent business traveler, I need reliability above all. SyedFlights consistently delivers — best prices, zero headaches, brilliant 24/7 team.", name: "James O'Brien", loc: 'London, UK' },
    { stars: 5,   text: "Booked the Business Class Escape for our anniversary. The lounge, the lie-flat bed, the hotel — everything exceeded expectations. Worth every penny.", name: 'Priya Mehta',    loc: 'Mumbai, India' },
    { stars: 4.5, text: "Took the whole family to Bali. Six people, zero stress. The kids loved every minute, and the price beat five other sites I checked.", name: 'David Kim',      loc: 'Seoul, South Korea' },
  ],
};

/* ============================================================
   COMPONENT RENDERERS
============================================================ */

function buildDestinations() {
  const grid = $('#dest-grid');
  if (!grid) return;
  grid.innerHTML = DATA.destinations.map(d => `
    <div class="dest-card" data-reveal>
      <div class="dest-img-wrap">
        <img class="dest-img" src="${esc(d.image)}" alt="${esc(d.city)}, ${esc(d.country)}" loading="lazy">
        <div class="dest-overlay" aria-hidden="true"><span class="dest-badge">${esc(d.badge)}</span></div>
      </div>
      <div class="dest-info">
        <div class="dest-top">
          <div>
            <h3 class="dest-name">${esc(d.city)}</h3>
            <p class="dest-country"><i class="ri-map-pin-line" aria-hidden="true"></i> ${esc(d.country)}</p>
          </div>
          <div class="dest-rating" aria-label="Rating ${d.rating} out of 5">
            <i class="ri-star-fill" aria-hidden="true"></i> ${d.rating}
          </div>
        </div>
        <div class="dest-bottom">
          <div class="dest-price">
            <span class="price-from">From</span>
            <strong class="price-val">$${d.price}</strong>
            <span class="price-unit">/ person</span>
          </div>
          <button class="btn-book" aria-label="Book flight to ${esc(d.city)}">Book Now <i class="ri-arrow-right-line" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>`).join('');
}

function buildWhy() {
  const grid = $('#why-grid');
  if (!grid) return;
  grid.innerHTML = DATA.why.map(w => `
    <div class="why-card" data-reveal>
      <div class="why-icon" aria-hidden="true"><i class="${esc(w.icon)}"></i></div>
      <h3>${esc(w.title)}</h3>
      <p>${esc(w.text)}</p>
    </div>`).join('');
}

function buildPackages() {
  const grid = $('#pkg-grid');
  if (!grid) return;
  grid.innerHTML = DATA.packages.map(p => `
    <div class="pkg-card ${p.featured ? 'pkg-featured' : ''}" data-reveal>
      ${p.badge ? `<div class="pkg-badge">${esc(p.badge)}</div>` : ''}
      <div class="pkg-icon" aria-hidden="true"><i class="${esc(p.icon)}"></i></div>
      <h3 class="pkg-name">${esc(p.name)}</h3>
      <p class="pkg-desc">${esc(p.desc)}</p>
      <ul class="pkg-features" aria-label="Package includes">
        ${p.features.map(f => `<li><i class="ri-check-line" aria-hidden="true"></i> ${esc(f)}</li>`).join('')}
      </ul>
      <div class="pkg-footer">
        <div class="pkg-price"><span>From</span><strong>$${esc(p.price)}</strong></div>
        <button class="${esc(p.btn)}" aria-label="Book ${esc(p.name)} package">Book Package</button>
      </div>
    </div>`).join('');
}

function buildReviews() {
  const wrapper = $('#reviews-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = DATA.reviews.map(r => `
    <div class="swiper-slide">
      <div class="review-card">
        <div class="review-stars" aria-label="${r.stars} out of 5 stars">${renderStars(r.stars)}</div>
        <p class="review-text">"${esc(r.text)}"</p>
        <div class="review-author">
          <div class="review-avatar" aria-hidden="true">${esc(r.name.split(' ').map(n => n[0]).join('').slice(0, 2))}</div>
          <div>
            <strong>${esc(r.name)}</strong>
            <span>${esc(r.loc)}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ============================================================
   NAVBAR
============================================================ */
function initNav() {
  const navbar    = $('#navbar');
  const hamburger = $('#nav-hamburger');
  const navLinks  = $('#nav-links');
  const links     = $$('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', scrollY > 20);
  }, { passive: true });

  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  navLinks.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) toggleMenu(false);
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) toggleMenu(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) toggleMenu(false);
  });

  // Highlight active nav link based on scroll position
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
      }
    });
  }, { threshold: 0.35 });

  $$('section[id]').forEach(s => io.observe(s));
}

/* ============================================================
   STARFIELD
============================================================ */
function initStars() {
  const c = $('#stars');
  if (!c) return;
  const n = window.innerWidth < 768 ? 40 : 120;
  let html = '';
  for (let i = 0; i < n; i++) {
    const s = Math.random() * 2 + 0.5;
    html += `<div class="star" style="width:${s}px;height:${s}px;left:${Math.random() * 100}%;top:${Math.random() * 85}%;--dur:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s;opacity:${0.2 + Math.random() * 0.5}" aria-hidden="true"></div>`;
  }
  c.innerHTML = html;
}

/* ============================================================
   THEME
============================================================ */
function initTheme() {
  const btn  = $('#theme-toggle');
  const icon = $('#theme-icon');
  const html = document.documentElement;

  const saved       = localStorage.getItem('syedflights_theme');
  const prefersDark = saved
    ? saved === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;

  function apply(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    icon.className = dark ? 'ri-moon-fill' : 'ri-sun-fill';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('syedflights_theme', dark ? 'dark' : 'light');
  }

  apply(prefersDark);
  btn.addEventListener('click', () => apply(html.getAttribute('data-theme') !== 'dark'));
}

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
function initReveal() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        setTimeout(() => en.target.classList.add('visible'), i * 70);
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  $$('[data-reveal]').forEach(el => io.observe(el));
}

/* ============================================================
   COUNTERS
============================================================ */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el    = en.target;
      const total = +el.dataset.count;
      const dur   = 1600;
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const v = Math.round(e * total);
        el.textContent = total >= 1000 ? v.toLocaleString() : v;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(c => io.observe(c));
}

/* ============================================================
   BACK TO TOP
============================================================ */
function initBackToTop() {
  const btn = $('#back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   SWIPER
============================================================ */
function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.reviews-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
    keyboard: { enabled: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      0:   { slidesPerView: 1 },
      540: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
    },
  });
}

/* ============================================================
   AUTH
   FIX: All DOM queries moved inside initAuth() which is called
   from DOMContentLoaded — previously these ran at parse time
   before the DOM existed, causing null-reference errors.
============================================================ */
let Auth; // exposed so AuthModal and initSearch can call Auth.isLoggedIn() etc.

function initAuth() {
  const STORE = 'syedflights_session';
  const TRIPS = 'syedflights_trips';

  const signinBtn   = $('#signin-btn');
  const signinLabel = $('#signin-label');

  let currentUser  = null;
  let dropdownEl   = null;

  /* ── session persistence ── */
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE));
      if (s) setSession(s);
    } catch (e) { /* corrupt storage — ignore */ }
  }

  function setSession(u) {
    currentUser = u;
    localStorage.setItem(STORE, JSON.stringify(u));
    refreshUI();
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem(STORE);
    if (dropdownEl) { dropdownEl.remove(); dropdownEl = null; }
    refreshUI();
    const sp = $('#saved-panel');
    if (sp) sp.style.display = 'none';
  }

  function refreshUI() {
    if (!signinBtn) return;
    if (currentUser) {
      signinLabel.textContent = currentUser.fullName.split(' ')[0];
      signinBtn.querySelector('i').className = 'ri-user-fill';
      signinBtn.classList.add('logged-in');
      signinBtn.setAttribute('aria-label', `Account menu for ${currentUser.fullName.split(' ')[0]}`);
      loadSavedTrips();
    } else {
      signinLabel.textContent = 'Sign In';
      signinBtn.querySelector('i').className = 'ri-user-line';
      signinBtn.classList.remove('logged-in');
      signinBtn.setAttribute('aria-label', 'Sign in');
    }
  }

  /* ── saved trips ── */
  function getTrips() {
    try { return JSON.parse(localStorage.getItem(TRIPS)) || []; } catch (e) { return []; }
  }

  function setTrips(t) {
    localStorage.setItem(TRIPS, JSON.stringify(t));
  }

  function loadSavedTrips() {
    const panel = $('#saved-panel');
    const grid  = $('#saved-grid');
    if (!panel || !currentUser) return;
    const trips = getTrips();
    if (!trips.length) { panel.style.display = 'none'; return; }
    panel.style.display = 'block';

    grid.innerHTML = trips.map(b => `
      <div class="saved-card" data-id="${b.id}">
        <div class="saved-card-info">
          <strong>${esc(b.fromCity)} → ${esc(b.toCity)}</strong>
          <span class="saved-card-meta">
            <i class="ri-calendar-line" aria-hidden="true"></i>
            ${b.departDate || '—'}${b.returnDate ? ' – ' + b.returnDate : ''} · ${b.passengers} pax
          </span>
        </div>
        <button class="saved-del" data-del="${b.id}" aria-label="Delete saved trip ${esc(b.fromCity)} to ${esc(b.toCity)}">
          <i class="ri-delete-bin-line" aria-hidden="true"></i>
        </button>
      </div>`).join('');

    // FIX: use element.querySelectorAll instead of $$() with a second arg
    grid.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTrips(getTrips().filter(t => String(t.id) !== String(btn.dataset.del)));
        loadSavedTrips();
      });
    });
  }

  function saveTrip(data) {
    if (!currentUser) return { success: false, requiresAuth: true };
    const trips = getTrips();
    trips.unshift({ id: Date.now(), ...data });
    setTrips(trips);
    loadSavedTrips();
    return { success: true };
  }

  /* ── account dropdown ── */
  function buildDropdown() {
    const wrap = document.createElement('div');
    wrap.className = 'account-dropdown';
    signinBtn.parentNode.insertBefore(wrap, signinBtn);
    wrap.appendChild(signinBtn);

    dropdownEl = document.createElement('div');
    dropdownEl.className = 'account-menu';
    dropdownEl.setAttribute('role', 'menu');
    dropdownEl.innerHTML = `
      <div class="account-menu-header">
        <strong>${esc(currentUser.fullName)}</strong>
        <span>${esc(currentUser.email)}</span>
      </div>
      <button class="account-menu-item" id="menu-trips" role="menuitem">
        <i class="ri-bookmark-3-line" aria-hidden="true"></i> My Saved Trips
      </button>
      <button class="account-menu-item danger" id="menu-logout" role="menuitem">
        <i class="ri-logout-box-line" aria-hidden="true"></i> Sign Out
      </button>`;
    wrap.appendChild(dropdownEl);

    $('#menu-trips').addEventListener('click', () => {
      dropdownEl.classList.remove('open');
      $('#search').scrollIntoView({ behavior: 'smooth' });
      loadSavedTrips();
    });

    $('#menu-logout').addEventListener('click', logout);

    document.addEventListener('click', e => {
      if (dropdownEl && !wrap.contains(e.target)) dropdownEl.classList.remove('open');
    });
  }

  /* ── sign-in button ── */
  if (signinBtn) {
    signinBtn.addEventListener('click', () => {
      if (currentUser) {
        if (!dropdownEl) buildDropdown();
        dropdownEl.classList.toggle('open');
      } else {
        AuthModal.open('login');
      }
    });
  }

  load();

  // Expose public API
  Auth = {
    setSession,
    saveTrip,
    isLoggedIn: () => !!currentUser,
  };
}

/* ============================================================
   AUTH MODAL
   FIX: All DOM queries moved inside initAuthModal() called from
   DOMContentLoaded — previously ran at parse time.
============================================================ */
let AuthModal; // exposed so initSearch can call AuthModal.open()

function initAuthModal() {
  const overlay    = $('#auth-modal');
  const closeBtn   = $('#modal-close');
  const tabs       = $$('.modal-tab');
  const loginForm  = $('#login-form');
  const signupForm = $('#signup-form');
  const loginAlert  = $('#login-alert');
  const signupAlert = $('#signup-alert');

  function open(tab) {
    tab = tab || 'login';
    overlay.classList.add('open');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const first = overlay.querySelector('input');
      if (first) first.focus();
    }, 100);
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    clearAlerts();
    const signinBtn = $('#signin-btn');
    if (signinBtn) signinBtn.focus();
  }

  function switchTab(tab) {
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
      t.setAttribute('aria-selected', String(t.dataset.tab === tab));
    });
    loginForm.style.display  = tab === 'login'  ? 'grid' : 'none';
    signupForm.style.display = tab === 'signup' ? 'grid' : 'none';
    clearAlerts();
  }

  function clearAlerts() {
    [loginAlert, signupAlert].forEach(el => {
      if (el) { el.className = 'modal-alert'; el.textContent = ''; }
    });
  }

  function showAlert(el, msg, type) {
    if (!el) return;
    el.className = `modal-alert show ${type}`;
    el.textContent = msg;
  }

  function setLoading(form, loading) {
    const b = form.querySelector('[type="submit"]');
    if (!b) return;
    b.disabled = loading;
    b.querySelector('.btn-text').style.display    = loading ? 'none' : 'inline-flex';
    b.querySelector('.btn-loading').style.display = loading ? 'inline-flex' : 'none';
  }

  /* ── event listeners ── */
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

  /* ── login ── */
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlerts();

    const email    = $('#l-email').value.trim();
    const password = $('#l-password').value;

    if (!email || !password) {
      showAlert(loginAlert, 'Email and password are required.', 'error');
      return;
    }

    setLoading(loginForm, true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(loginAlert, data.message, 'error');
        return;
      }

      localStorage.setItem('token', data.token);
      Auth.setSession(data.user);
      showAlert(loginAlert, 'Login successful!', 'success');
      setTimeout(close, 800);

    } catch (err) {
      console.error(err);
      showAlert(loginAlert, 'Unable to connect to server.', 'error');
    } finally {
      setLoading(loginForm, false);
    }
  });

  /* ── signup ── */
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlerts();

    const fullName = $('#s-name').value.trim();
    const email    = $('#s-email').value.trim();
    const password = $('#s-password').value;

    if (!fullName || !email || !password) {
      showAlert(signupAlert, 'All fields are required.', 'error');
      return;
    }

    setLoading(signupForm, true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(signupAlert, data.message, 'error');
        return;
      }

      localStorage.setItem('token', data.token);
      Auth.setSession(data.user);
      showAlert(signupAlert, 'Account created successfully!', 'success');
      setTimeout(close, 800);

    } catch (err) {
      console.error(err);
      showAlert(signupAlert, 'Unable to connect to server.', 'error');
    } finally {
      setLoading(signupForm, false);
    }
  });

  // Expose public API
  AuthModal = { open, close };
}

/* ============================================================
   FLIGHT SEARCH
============================================================ */
function initSearch() {
  const tabs      = $$('.stab');
  const returnFld = $('#return-field');
  const fromIn    = $('#sf-from');
  const toIn      = $('#sf-to');
  const departIn  = $('#sf-depart');
  const returnIn  = $('#sf-return');
  const swapBtn   = $('#swap-btn');
  const searchBtn = $('#search-btn');
  const panel     = $('#results-panel');
  const grid      = $('#results-grid');
  const empty     = $('#results-empty');
  const closeBtn  = $('#results-close');

  /* ── Passenger modal elements ── */
  const passengerModal      = $('#passengerModal');
  const closePassengerModal = $('#closePassengerModal');
  const passengerForm       = $('#passengerForm');

  let selectedFlight = null;

  /* ── date min constraints ── */
  const today = new Date().toISOString().split('T')[0];
  if (departIn) departIn.min = today;
  if (returnIn) returnIn.min = today;

  if (departIn && returnIn) {
    departIn.addEventListener('change', () => {
      returnIn.min = departIn.value || today;
      if (returnIn.value && returnIn.value < departIn.value) returnIn.value = '';
    });
  }

  /* ── trip type tabs ── */
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (returnFld) returnFld.style.display = tab.dataset.trip === 'roundtrip' ? 'flex' : 'none';
  }));

  /* ── swap cities ── */
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const t = fromIn.value;
      fromIn.value = toIn.value;
      toIn.value = t;
    });
  }

  /* ── FIX: passenger modal close listeners
     Previously these were nested INSIDE the results closeBtn listener
     so they only attached after the results panel was closed. Moved
     here so they are registered once on page load.
  ── */
  if (closePassengerModal) {
    closePassengerModal.addEventListener('click', () => {
      passengerModal.classList.remove('open');
    });
  }

  if (passengerModal) {
    passengerModal.addEventListener('click', (e) => {
      if (e.target === passengerModal) {
        passengerModal.classList.remove('open');
      }
    });
  }

  /* ── results close ── */
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
    });
  }

  /* ── airline data ── */
  const AIRLINES = [
    { name: 'SyedFlights Air', icon: 'ri-flight-takeoff-line' },
    { name: 'Sky Express',     icon: 'ri-plane-line' },
    { name: 'Global Wings',    icon: 'ri-flight-land-line' },
    { name: 'Horizon Air',     icon: 'ri-flight-takeoff-line' },
  ];

  function genFlights(from, to) {
    return AIRLINES.map((a, i) => ({
      airline:  a.name,
      icon:     a.icon,
      from,
      to,
      departs:  `${8 + i * 3}:${i % 2 === 0 ? '00' : '30'}`,
      arrives:  `${14 + i * 2}:${i % 2 === 0 ? '45' : '15'}`,
      duration: `${5 + i}h ${i * 15}m`,
      stops:    i === 0 ? 'Non-stop' : `${i} stop${i > 1 ? 's' : ''}`,
      price:    249 + i * 130 + Math.floor(Math.random() * 60),
    }));
  }

  /* ── render flight cards ── */
  function renderFlights(flights) {
    grid.innerHTML = flights.map((f, i) => `
      <div class="flight-card">
        <div class="flight-info">
          <div class="flight-airline"><i class="${esc(f.icon)}" aria-hidden="true"></i> ${esc(f.airline)}</div>
          <div class="flight-route">
            <span>${esc(f.from.split('(')[0].trim())}</span>
            <span class="flight-route-line" aria-hidden="true"></span>
            <span>${esc(f.to.split('(')[0].trim())}</span>
          </div>
          <div class="flight-meta">
            <i class="ri-time-line" aria-hidden="true"></i>
            ${esc(f.departs)} – ${esc(f.arrives)} · ${esc(f.duration)} · ${esc(f.stops)}
          </div>
        </div>
        <div class="flight-price-col">
          <div style="text-align:right">
            <div class="flight-price-label">From</div>
            <div class="flight-price">$${f.price}</div>
            <div class="flight-price-label">per person</div>
          </div>
          <button class="btn-select" data-idx="${i}" aria-label="Select ${esc(f.airline)} flight for $${f.price}">Select</button>
        </div>
      </div>`).join('');

    /* FIX: use addEventListener instead of .onclick for consistency,
       and use grid.querySelectorAll (scoped) instead of $$() with
       a second argument which the helper does not support. */
    grid.querySelectorAll('.btn-select').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFlight = flights[Number(btn.dataset.idx)];

        if (!selectedFlight) return;

        if (!Auth.isLoggedIn()) {
          AuthModal.open('login');
          return;
        }

        passengerModal.classList.add('open');
      });
    });
  }

  /* ── search button ── */
  searchBtn.addEventListener('click', () => {
    const from   = fromIn.value.trim();
    const to     = toIn.value.trim();
    const depart = departIn.value;

    // Highlight empty fields
    [fromIn, toIn, departIn].forEach(inp => {
      const isEmpty = !inp.value.trim();
      inp.style.borderColor = isEmpty ? 'var(--danger)' : '';
      setTimeout(() => { inp.style.borderColor = ''; }, 1800);
    });

    if (!from || !to || !depart) return;

    const orig = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="ri-loader-4-line spin" aria-hidden="true"></i> Searching...';
    searchBtn.disabled = true;

    setTimeout(() => {
      renderFlights(genFlights(from, to));
      empty.style.display = 'none';
      panel.style.display = 'block';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      searchBtn.innerHTML = orig;
      searchBtn.disabled = false;
    }, 700);
  });

  /* ── passenger form submit → create booking ── */
  if (passengerForm) {
    passengerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token');

      if (!token) {
        AuthModal.open('login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fromCity:        selectedFlight.from,
            toCity:          selectedFlight.to,
            departDate:      departIn.value,
            returnDate:      returnIn.value || null,
            passengers:      Number($('#sf-pax').value),
            passengerName:   $('#passengerName').value,
            passengerEmail:  $('#passengerEmail').value,
            passengerPhone:  $('#passengerPhone').value,
            passengerId:     $('#passengerId').value,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        passengerModal.classList.remove('open');
        passengerForm.reset();
        alert('Booking Successful!\nReference: ' + data.bookingReference);
        loadMyBookings();

      } catch (err) {
        console.error(err);
        alert('Booking failed.');
      }
    });
  }
}

/* ============================================================
   MY BOOKINGS MODAL
   FIX: Event listeners moved inside initMyBookings() called from
   DOMContentLoaded — previously ran at parse time.
============================================================ */
function initMyBookings() {
  const myBookingsBtn    = $('#myBookingsBtn');
  const myBookingsModal  = $('#myBookingsModal');
  const closeBookingsModal = $('#closeBookingsModal');

  if (myBookingsBtn && myBookingsModal) {
    myBookingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadMyBookings();
      myBookingsModal.classList.add('open');
    });
  }

  if (closeBookingsModal && myBookingsModal) {
    closeBookingsModal.addEventListener('click', () => {
      myBookingsModal.classList.remove('open');
    });

    myBookingsModal.addEventListener('click', (e) => {
      if (e.target === myBookingsModal) {
        myBookingsModal.classList.remove('open');
      }
    });
  }
}

/* ── loadMyBookings is called from both initMyBookings and
   passengerForm submit, so it lives at module scope. ── */
async function loadMyBookings() {
  const container = $('#bookingsContainer');
  const token     = localStorage.getItem('token');

  if (!token) {
    container.innerHTML = '<p>Please sign in first.</p>';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      container.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const bookings = data.bookings;

    if (!bookings.length) {
      container.innerHTML = '<p>No bookings found.</p>';
      return;
    }

    container.innerHTML = bookings.map(b => `
      <div class="booking-card">
        <div class="booking-route">
          <div class="booking-city">${esc(b.from_city)}</div>
          <div class="booking-arrow">✈</div>
          <div class="booking-city">${esc(b.to_city)}</div>
        </div>
        <div class="booking-info">
          <div class="booking-item">
            <span class="booking-label">Departure</span>
            <span class="booking-value">${esc(b.depart_date)}</span>
          </div>
          <div class="booking-item">
            <span class="booking-label">Passengers</span>
            <span class="booking-value">${esc(String(b.passengers))}</span>
          </div>
          <div class="booking-item">
            <span class="booking-label">Reference</span>
            <span class="booking-value">${esc(b.booking_reference)}</span>
          </div>
          <div class="booking-item">
            <span class="booking-label">Status</span>
            <span class="booking-status">${esc(b.status)}</span>
          </div>
          <div class="booking-actions">
            <button class="cancel-booking-btn" data-id="${esc(String(b.id))}">Cancel Booking</button>
          </div>
        </div>
      </div>`).join('');

    /* FIX: use container.querySelectorAll (scoped) */
    container.querySelectorAll('.cancel-booking-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const bookingId = button.dataset.id;

        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
          const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();

          if (!response.ok) {
            alert(data.message);
            return;
          }

          alert('Booking cancelled successfully.');
          loadMyBookings();

        } catch (err) {
          console.error(err);
          alert('Unable to cancel booking.');
        }
      });
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = '<p>Unable to load bookings.</p>';
  }
}

/* ============================================================
   CONTACT FORM
============================================================ */
function initContact() {
  const form    = $('#contact-form');
  const alertEl = $('#contact-alert');
  const success = $('#contact-success');
  if (!form) return;

  const fields = {
    name:    { el: $('#c-name'),    err: $('#c-name-err'),    v: v => v.trim().length >= 2 },
    email:   { el: $('#c-email'),   err: $('#c-email-err'),   v: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    subject: { el: $('#c-subject'), err: $('#c-subject-err'), v: v => v.length > 0 },
    message: { el: $('#c-message'), err: $('#c-message-err'), v: v => v.trim().length >= 10 },
  };

  const msgs = {
    name:    'Please enter your name (min. 2 characters)',
    email:   'Please enter a valid email address',
    subject: 'Please select a subject',
    message: 'Message must be at least 10 characters',
  };

  Object.values(fields).forEach(({ el, err }) => {
    el.addEventListener('input', () => {
      err.textContent = '';
      el.closest('.field-wrap').style.borderColor = '';
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (alertEl) { alertEl.className = 'modal-alert'; alertEl.textContent = ''; }
    if (success)  success.style.display = 'none';

    let ok = true;
    Object.entries(fields).forEach(([k, { el, err, v }]) => {
      if (!v(el.value)) {
        err.textContent = msgs[k];
        el.closest('.field-wrap').style.borderColor = 'var(--danger)';
        ok = false;
      }
    });
    if (!ok) return;

    const b = form.querySelector('[type="submit"]');
    b.disabled = true;
    b.querySelector('.btn-text').style.display    = 'none';
    b.querySelector('.btn-loading').style.display = 'inline-flex';

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fields.name.el.value,
          email:   fields.email.el.value,
          subject: fields.subject.el.value,
          message: fields.message.el.value,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      form.reset();

      if (success) {
        success.style.display = 'flex';
        setTimeout(() => { success.style.display = 'none'; }, 6000);
      }

    } catch (err) {
      alert(err.message);
    } finally {
      b.disabled = false;
      b.querySelector('.btn-text').style.display    = 'inline-flex';
      b.querySelector('.btn-loading').style.display = 'none';
    }
  });
}

/* ============================================================
   NEWSLETTER
============================================================ */
function initNewsletter() {
  ['#newsletter-form', '#footer-nl'].forEach(sel => {
    const form = $(sel);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const successEl = form.parentElement.querySelector('.nl-success') || $('#nl-success');
      form.reset();
      if (successEl) {
        successEl.style.display = 'flex';
        setTimeout(() => { successEl.style.display = 'none'; }, 4000);
      }
    });
  });
}

/* ============================================================
   DESTINATION "BOOK NOW" BUTTONS
============================================================ */
function initBookNow() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-book');
    if (!btn) return;
    const city = btn.closest('.dest-card')?.querySelector('.dest-name')?.textContent || '';
    const toInput = $('#sf-to');
    if (toInput && city) toInput.value = city;
    $('#search').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('#sf-from')?.focus(), 600);
  });
}

/* ============================================================
   BOOT — single DOMContentLoaded, all inits in order
   FIX: Previously Auth, AuthModal, and the My Bookings event
   listeners all ran at parse time (module level) before the DOM
   existed. Everything is now inside this one handler.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render static content first
  buildDestinations();
  buildWhy();
  buildPackages();
  buildReviews();

  // Init UI behaviours (Auth must come before AuthModal and initSearch
  // because they reference the Auth/AuthModal module variables)
  initAuth();
  initAuthModal();

  initNav();
  initStars();
  initTheme();
  initReveal();
  initCounters();
  initBackToTop();
  initSwiper();
  initSearch();
  initMyBookings();
  initContact();
  initNewsletter();
  initBookNow();
});
