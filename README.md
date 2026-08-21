# Fab Nation — Premium Fabric Storefront

A fast, static storefront & catalogue for **Fab Nation** (Shukrawar Peth, Pune),
showcasing the **Nirmal Knit Premium Fabric** collection in thirteen shades.

- No prices anywhere — every "Enquire" action leads to the contact page
- Contact page with call links, WhatsApp links, address copy and Google Maps
- iOS-inspired design: frosted-glass navigation, springy interactions,
  reveal-on-scroll animations, and a mobile bottom tab bar
- Zero frameworks, zero build step — plain HTML/CSS/JS for instant loads
- Respects `prefers-reduced-motion`

## Run locally

```bash
cd Fab_nation
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Vercel

**Option A — CLI**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

**Option B — Git**

Push this folder to a GitHub repo, then import it at
[vercel.com/new](https://vercel.com/new). Vercel auto-detects the static site —
no build command or output directory needed.

## Files

| File           | Purpose                          |
| -------------- | -------------------------------- |
| `index.html`   | Landing page & catalogue         |
| `contact.html` | Call / WhatsApp / visit / map    |
| `styles.css`   | All styling                      |
| `script.js`    | Shade data, animations, scrollspy |
| `vercel.json`  | Clean URLs + asset caching       |

## Editing the shades

All thirteen shades live in the `SHADES` array at the top of `script.js`.
Update a name or hex there and it updates the hero marquee, the swatch
picker, the colour grid and the enquiry chip in one place.
