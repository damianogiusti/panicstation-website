/* ===== Panic Station — site behaviour ===== */
(function () {
  "use strict";

  /* ---------- Inline SVG icons (replace Mobirise/socicon fonts) ---------- */
  const ICONS = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  function injectIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const svg = ICONS[el.getAttribute("data-icon")];
      if (svg) el.innerHTML = svg;
    });
  }

  /* ---------- Language ---------- */
  // Italian fallback so the site works even if translations.js is absent.
  const FALLBACK = {
    months: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    "gig.addCalendar": "Aggiungi al calendario",
    "gig.teaser": "In continuo aggiornamento...",
    "gig.calendarDetails": "Live Panic Station"
  };

  function dict(lang) {
    return (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[lang]) || {};
  }
  function t(lang, key) {
    const d = dict(lang);
    return key in d ? d[key] : FALLBACK[key];
  }

  let currentLang = "it";

  function detectLang() {
    const saved = localStorage.getItem("lang");
    if (saved === "it" || saved === "en" || saved === "de") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("it")) return "it";
    if (nav.startsWith("de")) return "de";
    return "en";
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    const d = dict(lang);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n")];
      if (v == null) return;
      if (el.tagName === "META") el.setAttribute("content", v);
      else el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });

    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    renderGigs();
  }

  /* ---------- Gigs ---------- */
  const GIGS_ENDPOINT = "https://thdytdygeajopcaxiguy.supabase.co/functions/v1/get-gigs";

  const templateGig = `
    <div class="gig-card">
      <div class="gig-top">
        <h4 class="gig-date">{{date}}</h4>
        <p class="gig-name">{{eventName}}</p>
      </div>
      <p class="gig-location">{{location}}</p>
      <div class="gig-cta">
        <a href="{{calendarLink}}" target="_blank" rel="noopener">📅&nbsp;&nbsp;<u>{{cta}}</u></a>
      </div>
    </div>`;

  const templateTeaser = `<p class="gig-teaser"><svg class="gig-teaser-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/></svg><span>{{text}}</span></p>`;

  let gigsData = null; // { gigs: [...], isTeaserEnabled }

  function formatDate(dateStr, lang) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const months = t(lang, "months");
      return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
    }
    return dateStr;
  }

  function generateCalendarLink(gig, lang) {
    const startDate = new Date(gig.date);
    const endDate = new Date(startDate); // Google wants an exclusive end -> next day
    endDate.setDate(endDate.getDate() + 1);

    const formatAllDay = (date) => date.toISOString().split("T")[0].replace(/-/g, "");

    const params = new URLSearchParams({
      text: `Panic Station @ ${gig.eventName}`,
      dates: formatAllDay(startDate) + "/" + formatAllDay(endDate),
      details: t(lang, "gig.calendarDetails"),
      location: gig.location
    });
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&${params.toString()}`;
  }

  function renderGigs() {
    const container = document.getElementById("next_gigs");
    if (!container || !gigsData) return;

    // Clear any previously rendered items (keep the section heading).
    container.querySelectorAll(".gig-item").forEach((n) => n.remove());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = gigsData.gigs.filter((gig) => new Date(gig.date) >= today);

    upcoming.forEach((gig) => {
      const html = templateGig
        .replace("{{date}}", formatDate(gig.date, currentLang))
        .replace("{{eventName}}", gig.eventName)
        .replace("{{location}}", gig.location)
        .replace("{{calendarLink}}", generateCalendarLink(gig, currentLang))
        .replace("{{cta}}", t(currentLang, "gig.addCalendar"));
      const node = document.createElement("div");
      node.className = "gig-item";
      node.innerHTML = html;
      container.appendChild(node);
    });

    if (gigsData.isTeaserEnabled) {
      const node = document.createElement("div");
      node.className = "gig-item gig-item--teaser";
      node.innerHTML = templateTeaser.replace("{{text}}", t(currentLang, "gig.teaser"));
      container.appendChild(node);
    }
  }

  function fetchGigs() {
    fetch(GIGS_ENDPOINT)
      .then((r) => r.json())
      .then((data) => { gigsData = data; renderGigs(); })
      .catch(console.error);
  }

  /* ---------- Navbar (mobile) ---------- */
  function initNavbar() {
    const toggle = document.querySelector(".navbar-toggle");
    const menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Scroll reveal (variants opt in via [data-reveal]) ---------- */
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Copyright ---------- */
  function initCopyright() {
    const el = document.getElementById("copyright_js");
    if (el) el.textContent = `© Copyright ${new Date().getFullYear()} Panic Station. All Rights Reserved.`;
  }

  /* ---------- Boot ---------- */
  function init() {
    injectIcons();
    initNavbar();
    initReveal();
    initCopyright();

    document.querySelectorAll(".lang-switch button").forEach((b) =>
      b.addEventListener("click", () => setLang(b.getAttribute("data-lang")))
    );

    setLang(detectLang());
    fetchGigs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
