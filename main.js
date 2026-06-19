/* ============================================================
   SYEDFLIGHTS — main.js
   ============================================================ */

/* ============================================================
   1. NAVIGATION — Mobile Menu Toggle
   ============================================================ */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// FIX 1: Guard clause — prevents crash if elements are missing in DOM
if (menuBtn && navLinks && menuBtnIcon) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");

    // UPGRADE 1: Accessibility — tell screen readers menu state
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when a nav link is clicked
  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  // UPGRADE 2: Close menu when clicking outside navbar (better UX)
  document.addEventListener("click", (e) => {
    const isInsideNav = menuBtn.contains(e.target) || navLinks.contains(e.target);
    if (!isInsideNav && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // UPGRADE 3: Close menu on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus(); // Return focus to menu button
    }
  });
}

/* ============================================================
   2. ACTIVE NAV LINK — Highlight current section in navbar
   UPGRADE 4: Was completely missing in original
   ============================================================ */
const sections = document.querySelectorAll("section[id], header[id], footer[id]");
const allNavLinks = document.querySelectorAll(".nav__links a");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      allNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

/* ============================================================
   3. SCROLL REVEAL ANIMATIONS
   FIX 2: Added prefers-reduced-motion check — animations
   won't run for users who have this OS setting enabled
   ============================================================ */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && typeof ScrollReveal !== "undefined") {
  const scrollRevealOption = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
    // UPGRADE 5: Added easing for smoother, more professional feel
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    // UPGRADE 6: Reset false — elements stay visible once revealed
    reset: false,
  };

  // Hero Section
  ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
  });
  ScrollReveal().reveal(".header__content p", {
    ...scrollRevealOption,
    delay: 300,
  });
  ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 600,
  });
  ScrollReveal().reveal(".header__btns", {
    ...scrollRevealOption,
    delay: 900,
    // FIX 3: Reduced from 1500ms — felt too slow, users left before seeing it
  });

  // Destinations
  ScrollReveal().reveal(".destination__card", {
    ...scrollRevealOption,
    interval: 200,
    // FIX 4: Reduced interval from 500ms to 200ms — cards now appear quicker
  });

  // Journey cards
  // UPGRADE 7: Was missing in original — journey cards now animate in
  ScrollReveal().reveal(".journey__card", {
    ...scrollRevealOption,
    interval: 200,
    origin: "bottom",
  });

  // Showcase Section
  ScrollReveal().reveal(".showcase__image img", {
    ...scrollRevealOption,
    origin: "left",
  });
  ScrollReveal().reveal(".showcase__content h4", {
    ...scrollRevealOption,
    delay: 300,
  });
  ScrollReveal().reveal(".showcase__content p", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".showcase__btn", {
    ...scrollRevealOption,
    delay: 700,
    // FIX 5: Reduced from 1500ms — was too delayed
  });

  // Banner Stats
  ScrollReveal().reveal(".banner__card", {
    ...scrollRevealOption,
    interval: 200,
  });

  // Discover Cards
  ScrollReveal().reveal(".discover__card", {
    ...scrollRevealOption,
    interval: 200,
  });

  // UPGRADE 8: Reveal section headers too — was missing in original
  ScrollReveal().reveal(".section__header", {
    ...scrollRevealOption,
    distance: "30px",
  });
  ScrollReveal().reveal(".section__description", {
    ...scrollRevealOption,
    distance: "20px",
    delay: 200,
  });
}

/* ============================================================
   4. SWIPER TESTIMONIALS
   FIX 6: Original had slidesPerView: 3 hardcoded — broke on
   mobile showing 3 tiny cards. Now responsive breakpoints added.
   ============================================================ */
if (typeof Swiper !== "undefined") {
  const swiper = new Swiper(".swiper", {
    // UPGRADE 9: Auto width based on slide content
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,

    // FIX 7: Added responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      540: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },

    // UPGRADE 10: Added autoplay — carousel moves on its own
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // UPGRADE 11: Added keyboard navigation for accessibility
    keyboard: {
      enabled: true,
    },

    // UPGRADE 12: Added grab cursor for better desktop UX
    grabCursor: true,
  });
}

/* ============================================================
   5. NAVBAR SHADOW ON SCROLL
   UPGRADE 13: Was completely missing — nav now gets a shadow
   when user scrolls down, looks more professional
   ============================================================ */
const nav = document.querySelector("nav");

if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      nav.style.backdropFilter = "blur(8px)";
    } else {
      nav.style.boxShadow = "none";
      nav.style.backdropFilter = "none";
    }
  });
}

/* ============================================================
   6. BACK TO TOP BUTTON
   UPGRADE 14: Was completely missing — added smooth scroll
   back to top button that appears after scrolling down
   ============================================================ */
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
backToTopBtn.setAttribute("aria-label", "Back to top");
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: #2887ff;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(40, 135, 255, 0.4);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 999;
`;
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.transform = "translateY(0)";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.transform = "translateY(20px)";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
