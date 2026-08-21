/* ============================================================
   Fab Nation — the shade book
   One bound selection: book card, shade rail, cloth render,
   and the enquiry link all follow the same chosen shade.
   ============================================================ */

"use strict";

/* ── Shade palette (Nirmal Knit) ────────────────────────── */
const SHADES = [
  { name: "Plum",         hex: "#6e3b52" },
  { name: "Light Yellow", hex: "#efe0a4" },
  { name: "Light Grey",   hex: "#d5d4d8" },
  { name: "Dark Grey",    hex: "#47474c" },
  { name: "Sky Blue",     hex: "#8fc8e8" },
  { name: "Light Blue",   hex: "#b4d3ea" },
  { name: "Royal Blue",   hex: "#2a4d8f" },
  { name: "Yellow",       hex: "#e9bd3f" },
  { name: "Orange",       hex: "#d97a33" },
  { name: "Red",          hex: "#bf3a32" },
  { name: "Navy Blue",    hex: "#22304e" },
  { name: "Black",        hex: "#1b1b1e" },
  { name: "White",        hex: "#f3f1ea" },
];

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

/* Relative luminance → readable text on the shade card */
const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.45;
};

/* ── Page-load choreography (after fonts settle) ────────── */
const ready = () => document.body.classList.add("ready");
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => requestAnimationFrame(ready));
  setTimeout(ready, 900); /* safety net */
} else {
  ready();
}

/* ── Reveal on scroll ───────────────────────────────────── */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);
$$(".reveal").forEach((el) => io.observe(el));

/* ── Nav state ──────────────────────────────────────────── */
const nav = $("#nav");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ── Home: the shade book ───────────────────────────────── */
if (document.body.dataset.page === "home") {
  let selected = 0;

  const bookCard   = $("#bookCard");
  const cardName   = $("#cardName");
  const cardIndex  = $("#cardIndex");
  const cardSheen  = $("#cardSheen");
  const bookTilt   = $("#bookTilt");
  const ticks      = $("#bookTicks");
  const rail       = $("#rail");
  const clothRender = $("#clothRender");
  const renderLabel = $("#renderLabel");
  const enquireBtn = $("#enquireBtn");

  /* progress ticks */
  ticks.innerHTML = SHADES.map(() => "<i></i>").join("");

  /* shade rail */
  rail.innerHTML = SHADES.map(
    (s, i) => `
      <button class="chip" role="option" aria-selected="${i === 0}" data-i="${i}" aria-label="${s.name}">
        <span class="chip-fabric" style="--cc:${s.hex}"></span>
        <span class="chip-name">${s.name}</span>
      </button>`
  ).join("");

  let flipping = false;
  let queued = null;

  const paint = (i) => {
    const s = SHADES[i];
    const idx = String(i + 1).padStart(2, "0");

    bookCard.style.setProperty("--fc", s.hex);
    bookCard.style.setProperty("--shade-shadow", s.hex + "80");
    bookCard.style.setProperty("--card-ink", isLight(s.hex) ? "#221d22" : "#f6f1ec");
    cardName.textContent = s.name;
    cardIndex.textContent = idx;

    clothRender.style.setProperty("--fc", s.hex);
    renderLabel.textContent = s.name;
    enquireBtn.href = `contact.html?shade=${encodeURIComponent(s.name)}`;

    $$("i", ticks).forEach((t, ti) => t.classList.toggle("is-on", ti === i));
    $$(".chip", rail).forEach((c, ci) => c.setAttribute("aria-selected", String(ci === i)));
    const chipEl = rail.children[i];
    if (chipEl) chipEl.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
    $("#book").setAttribute("aria-label", `Shade preview — ${s.name}, ${idx} of 13`);
  };

  const setShade = (i) => {
    i = (i + SHADES.length) % SHADES.length;
    if (i === selected) return;
    if (flipping) { queued = i; return; }
    selected = i;

    if (prefersReduced) {
      paint(i);
      return;
    }

    flipping = true;
    bookCard.classList.remove("swap-in");
    bookCard.classList.add("swap-out");

    setTimeout(() => {
      paint(i);
      bookCard.classList.remove("swap-out");
      void bookCard.offsetWidth;
      bookCard.classList.add("swap-in");
      cardSheen.classList.remove("run");
      void cardSheen.offsetWidth;
      cardSheen.classList.add("run");
    }, 360);

    setTimeout(() => {
      bookCard.classList.remove("swap-in");
      flipping = false;
      if (queued !== null) { const q = queued; queued = null; setShade(q); }
    }, 360 + 620);
  };

  $("#prevShade").addEventListener("click", () => setShade(selected - 1));
  $("#nextShade").addEventListener("click", () => setShade(selected + 1));
  rail.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setShade(Number(chip.dataset.i));
  });

  /* keyboard on the book group */
  $("#book").addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { setShade(selected - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { setShade(selected + 1); e.preventDefault(); }
  });

  paint(0);

  /* gentle pointer tilt on the book */
  if (finePointer && !prefersReduced) {
    const zone = $(".book-zone");
    zone.addEventListener("pointermove", (e) => {
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      bookTilt.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -6}deg)`;
    });
    zone.addEventListener("pointerleave", () => {
      bookTilt.style.transform = "";
    });
  }

  /* light follows the pointer across the cloth render */
  if (finePointer && !prefersReduced) {
    let raf = null;
    clothRender.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = clothRender.getBoundingClientRect();
        clothRender.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        clothRender.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        raf = null;
      });
    });
  }

  /* magnetic primary buttons — a few pixels of pull */
  if (finePointer && !prefersReduced) {
    $$(".btn-primary").forEach((btn) => {
      btn.classList.add("is-magnetic");
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.classList.remove("is-settling");
        btn.style.transform = `translate(${dx * 3.5}px, ${dy * 2.5}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.classList.add("is-settling");
        btn.style.transform = "";
      });
    });
  }

  /* scrollspy for the mobile tab bar */
  const tabs = $$(".tab[data-tab]");
  const navLinks = $$(".nav-links [data-nav]");
  const spies = [$(".hero"), $("#cloth"), $("#fabrics"), $("#standard")].filter(Boolean);
  if ("IntersectionObserver" in window && spies.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.classList.contains("hero") ? "home" : e.target.id;
            tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === id));
            navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.nav === id));
          }
        }
      },
      { rootMargin: "-38% 0px -52% 0px" }
    );
    spies.forEach((s) => spy.observe(s));
  }
}

/* ── Contact page: enquiry chip + copy address ──────────── */
if (document.body.dataset.page === "contact") {
  const params = new URLSearchParams(window.location.search);
  const shade = params.get("shade");
  const chip = $("#enquiryChip");

  if (shade) {
    const match = SHADES.find((s) => s.name.toLowerCase() === shade.toLowerCase());
    if (match) {
      chip.hidden = false;
      chip.style.setProperty("--cd", match.hex);
      $("#enquiryText").textContent = `Nirmal Knit — ${match.name}`;
    }
  }

  const copyBtn = $("#copyAddr");
  const note = $("#copyNote");
  copyBtn.addEventListener("click", async () => {
    const addr = "Fab Nation, Shop No. 7, Near Mandai Metro Gate No. 2, Shukrawar Peth, Pune, Maharashtra";
    try {
      await navigator.clipboard.writeText(addr);
      note.textContent = "Address copied.";
    } catch {
      note.textContent = addr;
    }
    setTimeout(() => (note.textContent = ""), 2600);
  });
}

/* ── Footer year ────────────────────────────────────────── */
$$("#year").forEach((el) => (el.textContent = String(new Date().getFullYear())));
