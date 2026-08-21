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

const PRODUCT_LINES = {
  "nirmal-knit": {
    name: "Nirmal Knit", kicker: "Signature line", spec: "200+ GSM · Soft knit",
    weave: "weave-knit",
    description: "A dense, breathable knit with a smooth hand and a quiet drape for comfortable everyday garments and repeat production.",
    details: [["Weight", "200+ GSM"], ["Hand feel", "Soft and smooth"], ["Best for", "Premium T-shirts, everyday separates"], ["Colour range", "13 shades shown in the shade library"]],
    colors: SHADES,
  },
  "dot-knit": {
    name: "Dot Knit", kicker: "Textured knit", spec: "175 GSM · Soft and breathable",
    weave: "weave-dot",
    description: "A lightweight textured knit with a distinctive dot pattern for comfortable everyday pieces, casual garments, and breathable programs.",
    details: [["Weight", "175 GSM"], ["Hand feel", "Soft textured dot surface"], ["Best for", "Casual garments and dailywear"], ["Colour range", "Call to confirm current colours"]],
    colors: [["Black", "#1d2025"], ["Maroon", "#6c183d"], ["Green", "#169348"], ["Yellow", "#f0c318"], ["Orange", "#f47816"], ["Red", "#d9272e"], ["Royal Blue", "#1450c4"], ["Navy Blue", "#172849"], ["Sky Blue", "#27a1e5"], ["Grey", "#92969a"], ["Light Grey", "#c7c9c9"], ["White", "#f3f3ef"]],
  },
  mars: {
    name: "Mars", kicker: "Everyday premium", spec: "200 GSM · Soft and durable",
    weave: "weave-knit",
    description: "A balanced everyday fabric line with a soft hand, breathable wear, and dependable colour options for regular garment programs.",
    details: [["Weight", "200 GSM"], ["Hand feel", "Soft and comfortable"], ["Best for", "Everyday garments and uniforms"], ["Colour range", "Call to confirm current colours"]],
    colors: [["Terracotta", "#b86a44"], ["Light Yellow", "#eee78b"], ["Coral Red", "#e52d54"], ["Plum", "#53214f"], ["Teal Blue", "#1598aa"], ["Sky Blue", "#31a7e8"], ["Royal Blue", "#1451c9"], ["Navy Blue", "#142b52"], ["Light Grey", "#b8bdc0"], ["White", "#f0f0f0"], ["Charcoal Grey", "#3d4042"], ["Black", "#161719"]],
  },
  "dull-dri-fit": {
    name: "Dull Dri Fit", kicker: "Performance knit", spec: "220–230 GSM · Reliance yarn fabric",
    weave: "weave-mesh",
    description: "A performance-led mesh knit for active, uniform, and workwear programs where breathability, moisture wicking, durability, and quick-dry comfort matter.",
    details: [["Weight", "220–230 GSM"], ["Hand feel", "Textured mesh performance surface"], ["Best for", "Activewear, sports uniforms, workwear"], ["Colour range", "Call to confirm current colours"]],
    colors: [["Charcoal", "#505763"], ["Green", "#139457"], ["Red", "#e21f2d"], ["Black", "#17191c"], ["White", "#f3f3f0"], ["Yellow", "#f2bd16"], ["Orange", "#f17b15"], ["Royal Blue", "#1b58c7"], ["Navy Blue", "#14294d"], ["Light Blue", "#53abe0"], ["Purple", "#5b25a7"], ["Dark Green", "#0b5533"], ["Maroon", "#75233c"], ["Grey", "#999b9c"], ["Off White", "#e9e3d7"]],
  },
  salina: {
    name: "Salina", kicker: "Lightweight line", spec: "160 GSM · Lightweight fabric",
    weave: "weave-fine",
    description: "A fine, lightweight fabric option for easy dailywear and warm-weather garments where comfort, breathability, and ease are paramount.",
    details: [["Weight", "160 GSM"], ["Hand feel", "Light and airy with fine knit"], ["Best for", "Dailywear and warm-weather garments"], ["Colour range", "Black, White, Light Grey, Sky Blue shown"]],
    colors: [["Sage", "#7a9b76"], ["Black", "#202225"], ["White", "#f2f2f1"], ["Light Grey", "#aeb2b4"], ["Sky Blue", "#75c6ee"]],
  },
  pcpq: {
    name: "PCPQ", kicker: "Premium T-shirt fabric", spec: "230 GSM · Premium fabric",
    weave: "weave-thick",
    description: "A heavier, thicker premium knit fabric suited to structured, high-quality T-shirts and everyday essentials that need more body and structure.",
    details: [["Weight", "230 GSM"], ["Hand feel", "Structured, substantial and soft"], ["Best for", "Premium heavyweight T-shirts"], ["Colour range", "Call to confirm current colours"]],
    colors: [["Navy", "#2c3e50"], ["Turquoise Blue", "#1ca5ce"], ["Royal Blue", "#174ec6"], ["Sky Blue", "#70bde6"], ["Green", "#13a845"], ["Bottle Green", "#0b5b39"], ["Yellow", "#f2c30b"], ["Gold Yellow", "#e6a30b"], ["Orange", "#f47716"], ["Red", "#dc1e3a"], ["Maroon", "#7b203a"], ["Pink", "#ed2184"], ["Purple", "#5122ad"], ["Grey Melange", "#aeb1b4"], ["White", "#f1f0ec"], ["Black", "#17181b"]],
  },
  "super-poly": {
    name: "Super Poly", kicker: "Poly fabric", spec: "180 GSM · Smooth and breathable",
    weave: "weave-smooth",
    description: "A versatile smooth polyester line with a clean finish for premium casual, uniform, and everyday garment programs requiring easy care.",
    details: [["Weight", "180 GSM"], ["Hand feel", "Smooth, soft and breathable polyester"], ["Best for", "Casual garments and uniforms"], ["Colour range", "Call to confirm current colours"]],
    colors: [["Cream", "#e8e0d5"], ["Gold Yellow", "#e9a51b"], ["Yellow", "#f1c315"], ["Orange", "#f26913"], ["White", "#f4f2ee"], ["Sky Blue", "#54b8ea"], ["Royal Blue", "#1857d0"], ["Turquoise Blue", "#16a8c4"], ["Purple", "#6c2aa5"], ["Pink", "#ee1680"], ["Green", "#13a84c"], ["Navy Blue", "#17305a"], ["Black", "#191a1c"]],
  },
};

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const attachClothMotion = (el) => {
  if (!el || !finePointer || prefersReduced) return;
  let raf = null;
  el.addEventListener("pointermove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      raf = null;
    });
  });
};

const flashCloth = (el) => {
  if (!el || prefersReduced) return;
  el.classList.remove("shade-swap");
  void el.offsetWidth;
  el.classList.add("shade-swap");
};

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
  const cardSheen  = $("#cardSheen");
  const bookTilt   = $("#bookTilt");
  const ticks      = $("#bookTicks");
  const clothRender = $("#clothRender");
  const renderLabel = $("#renderLabel");
  const enquireBtn = $("#enquireBtn");
  const heroProductName = $("#heroProductName");
  const heroProductSpec = $("#heroProductSpec");
  const productEntries = Object.entries(PRODUCT_LINES);
  const book = $("#book");

  ticks.innerHTML = productEntries.map(() => "<i></i>").join("");

  let selectedProduct = 0;
  let flipping = false;
  let queued = null;
  let queuedProduct = null;

  const cardWeave = $(".card-weave");
  const renderFocus = $(".render-focus span");
  const renderDetailStrong = $(".render-detail strong");
  const renderDetailSmall = $(".render-detail small");
  const clothCopyTitle = $(".cloth-copy .section-title");
  const clothCopySub = $(".cloth-copy .section-sub");
  const ledgerRows = $$(".ledger-row");
  const weaveClasses = ["weave-knit", "weave-dot", "weave-mesh", "weave-thick", "weave-smooth", "weave-fine"];

  const applyProduct = (index) => {
    selectedProduct = (index + productEntries.length) % productEntries.length;
    const [key, product] = productEntries[selectedProduct];
    const firstColor = product.colors[0].hex || product.colors[0][1];
    heroProductName.textContent = product.name;
    heroProductSpec.textContent = product.spec;
    bookCard.setAttribute("href", `product.html?product=${key}`);
    book.style.setProperty("--fc", firstColor);
    bookCard.style.setProperty("--fc", firstColor);
    bookCard.style.setProperty("--shade-shadow", `${firstColor}80`);
    bookCard.style.setProperty("--card-ink", isLight(firstColor) ? "#221d22" : "#f6f1ec");
    
    // Update hero card weave texture
    weaveClasses.forEach(cls => cardWeave.classList.remove(cls));
    if (product.weave) cardWeave.classList.add(product.weave);
    
    // Update large cloth render weave texture
    weaveClasses.forEach(cls => clothRender.classList.remove(cls));
    if (product.weave) clothRender.classList.add(product.weave);
    
    // Update cloth render info
    clothRender.style.setProperty("--fc", firstColor);
    renderLabel.textContent = product.name;
    enquireBtn.href = `contact.html?product=${key}`;
    
    // Update structure label and details based on fabric type
    const weaveLabels = {
      "weave-knit": { focus: "KNIT STRUCTURE", detail: ["Open-loop knit", "Breathable · soft thread"] },
      "weave-dot": { focus: "TEXTURED DOT KNIT", detail: ["Raised dot texture", "Breathable · tactile surface"] },
      "weave-mesh": { focus: "MESH PERFORMANCE", detail: ["Performance mesh knit", "Moisture wicking · quick dry"] },
      "weave-thick": { focus: "HEAVYWEIGHT KNIT", detail: ["Substantial dense knit", "Structured · premium weight"] },
      "weave-smooth": { focus: "SMOOTH POLY KNIT", detail: ["Smooth polyester weave", "Easy care · clean finish"] },
      "weave-fine": { focus: "FINE LIGHT KNIT", detail: ["Fine gauge lightweight knit", "Airy · cool against skin"] }
    };
    if (product.weave && weaveLabels[product.weave]) {
      renderFocus.textContent = weaveLabels[product.weave].focus;
      renderDetailStrong.textContent = weaveLabels[product.weave].detail[0];
      renderDetailSmall.textContent = weaveLabels[product.weave].detail[1];
    }
    
    // Update cloth copy section
    const gsm = product.details.find(d => d[0] === "Weight")?.[1] || "";
    const handFeel = product.details.find(d => d[0] === "Hand feel")?.[1] || "";
    const bestFor = product.details.find(d => d[0] === "Best for")?.[1] || "";
    const breathability = product.weave === "weave-mesh" ? "Maximum airflow" : 
                          product.weave === "weave-fine" ? "Light, easy airflow" :
                          product.weave === "weave-smooth" ? "Smooth, moderate breathability" :
                          product.weave === "weave-thick" ? "Structured with good airflow" : "Open knit, easy airflow";
    const drape = product.weave === "weave-thick" ? "Structured with body" :
                  product.weave === "weave-fine" ? "Light, fluid drape" :
                  product.weave === "weave-mesh" ? "Light with performance fall" :
                  "Light with a quiet fall";
    
    if (ledgerRows.length >= 5) {
      ledgerRows[0].querySelector("dd").textContent = gsm;
      ledgerRows[1].querySelector("dd").textContent = handFeel;
      ledgerRows[2].querySelector("dd").textContent = breathability;
      ledgerRows[3].querySelector("dd").textContent = "Colourfast · shape-stable";
      ledgerRows[4].querySelector("dd").textContent = drape;
    }
    clothCopyTitle.innerHTML = `${product.name}<br />built for ${bestFor.split(",")[0].toLowerCase()}.`;
    clothCopySub.textContent = product.description;
    
    book.setAttribute("aria-label", `${product.name} fabric preview — ${product.spec}`);
    $$("i", ticks).forEach((tick, tickIndex) => tick.classList.toggle("is-on", tickIndex === selectedProduct));
  };

  const changeProduct = (index) => {
    const next = (index + productEntries.length) % productEntries.length;
    if (next === selectedProduct) return;
    if (flipping) {
      queuedProduct = index;
      return;
    }

    if (prefersReduced) {
      applyProduct(index);
      return;
    }

    flipping = true;
    bookCard.classList.remove("swap-in");
    bookCard.classList.add("swap-out");

    setTimeout(() => {
      applyProduct(index);
      bookCard.classList.remove("swap-out");
      void bookCard.offsetWidth;
      bookCard.classList.add("swap-in");
      cardSheen.classList.remove("run");
      void cardSheen.offsetWidth;
      cardSheen.classList.add("run");
    }, 280);

    setTimeout(() => {
      bookCard.classList.remove("swap-in");
      flipping = false;
      if (queuedProduct !== null) {
        const queuedIndex = queuedProduct;
        queuedProduct = null;
        changeProduct(queuedIndex);
      }
    }, 800);
  };

  const paint = (i) => {
    const s = SHADES[i];
    const idx = String(i + 1).padStart(2, "0");

    clothRender.style.setProperty("--fc", s.hex);
    renderLabel.textContent = s.name;
    enquireBtn.href = `contact.html?shade=${encodeURIComponent(s.name)}`;

    $("#book").setAttribute("aria-label", "Nirmal Knit signature fabric preview");
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

  $("#prevShade").addEventListener("click", () => changeProduct(selectedProduct - 1));
  $("#nextShade").addEventListener("click", () => changeProduct(selectedProduct + 1));
  /* keyboard on the book group */
  $("#book").addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { changeProduct(selectedProduct - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { changeProduct(selectedProduct + 1); e.preventDefault(); }
  });

  paint(0);
  applyProduct(0);

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

  attachClothMotion(clothRender);

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
  const spies = [$(".hero"), $("#products"), $("#fabrics"), $("#standard")].filter(Boolean);
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

/* ── Product detail page ───────────────────────────────── */
if (document.body.dataset.page === "product") {
  const key = new URLSearchParams(window.location.search).get("product") || "nirmal-knit";
  const product = PRODUCT_LINES[key] || PRODUCT_LINES["nirmal-knit"];
  const paint = (selector, value) => { const element = $(selector); if (element) element.textContent = value; };

  document.title = `${product.name} — Fab Nation · Pune`;
  paint("#productKicker", product.kicker);
  paint("#productTitle", product.name);
  paint("#productSpec", product.spec);
  paint("#productDescription", product.description);

  const colors = product.colors.map((color) => Array.isArray(color) ? { name: color[0], hex: color[1] } : color);
  const clothRender = $("#productClothRender");
  const renderWeave = $("#productRenderWeave");
  const colorName = $("#productColorName");
  const colorRail = $("#productColorRail");
  const materialLabel = $("#productMaterialLabel");
  const materialNote = $("#productMaterialNote");
  const renderFocusText = clothRender.querySelector(".render-focus span");
  const renderDetailStrong = clothRender.querySelector(".render-detail strong");
  const renderDetailSmall = clothRender.querySelector(".render-detail small");
  let selectedColor = 0;
  const weaveClasses = ["weave-knit", "weave-dot", "weave-mesh", "weave-thick", "weave-smooth", "weave-fine"];

  materialLabel.textContent = product.name;
  materialNote.textContent = product.kicker;
  
  // Apply correct fabric weave texture
  if (product.weave) {
    weaveClasses.forEach(cls => {
      clothRender.classList.remove(cls);
      if (renderWeave) renderWeave.classList.remove(cls);
    });
    clothRender.classList.add(product.weave);
    if (renderWeave) renderWeave.classList.add(product.weave);
  }
  
  // Update structure label based on fabric type
  const weaveLabels = {
    "weave-knit": { focus: "KNIT STRUCTURE", detail: ["Open-loop knit", "Breathable · soft thread"] },
    "weave-dot": { focus: "TEXTURED DOT KNIT", detail: ["Raised dot texture", "Breathable · tactile surface"] },
    "weave-mesh": { focus: "MESH PERFORMANCE", detail: ["Performance mesh knit", "Moisture wicking · quick dry"] },
    "weave-thick": { focus: "HEAVYWEIGHT KNIT", detail: ["Substantial dense knit", "Structured · premium weight"] },
    "weave-smooth": { focus: "SMOOTH POLY KNIT", detail: ["Smooth polyester weave", "Easy care · clean finish"] },
    "weave-fine": { focus: "FINE LIGHT KNIT", detail: ["Fine gauge lightweight knit", "Airy · cool against skin"] }
  };
  if (product.weave && weaveLabels[product.weave]) {
    renderFocusText.textContent = weaveLabels[product.weave].focus;
    renderDetailStrong.textContent = weaveLabels[product.weave].detail[0];
    renderDetailSmall.textContent = weaveLabels[product.weave].detail[1];
  }
  
  colorRail.innerHTML = colors.map((color, index) => `<button class="product-color-chip" type="button" role="option" aria-selected="${index === 0}" data-index="${index}" aria-label="${color.name}"><i style="--swatch:${color.hex}"></i><small>${color.name}</small></button>`).join("");

  const paintColor = (index, animate = true) => {
    selectedColor = (index + colors.length) % colors.length;
    const color = colors[selectedColor];
    clothRender.style.setProperty("--fc", color.hex);
    colorName.textContent = color.name;
    clothRender.setAttribute("aria-label", `${product.name} fabric preview — ${color.name}`);
    $$(".product-color-chip", colorRail).forEach((chip, chipIndex) => chip.setAttribute("aria-selected", String(chipIndex === selectedColor)));
    if (animate) flashCloth(clothRender);
  };
  $("#productPrevColor").addEventListener("click", () => paintColor(selectedColor - 1));
  $("#productNextColor").addEventListener("click", () => paintColor(selectedColor + 1));
  colorRail.addEventListener("click", (event) => {
    const chip = event.target.closest(".product-color-chip");
    if (chip) paintColor(Number(chip.dataset.index));
  });
  clothRender.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { paintColor(selectedColor - 1); event.preventDefault(); }
    if (event.key === "ArrowRight") { paintColor(selectedColor + 1); event.preventDefault(); }
  });
  attachClothMotion(clothRender);
  paintColor(0, false);

  $("#productDetails").innerHTML = product.details.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
  $("#productWhatsApp").href = `https://wa.me/919822888992?text=${encodeURIComponent(`Hi Fab Nation, I am enquiring about ${product.name}. Please share current colours and availability.`)}`;
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
