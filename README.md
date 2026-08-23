# TECH OF THE WORLD — Website

Professional IT services & technology solutions provider · **Technology That Moves Business Forward.**

Bilingual (English LTR / Arabic RTL) marketing + conversion site: Home, Services, Projects (case studies), Industries, Insights, About, Saudi Arabia, Egypt, Contact and Request IT Service.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v4**
- **react-router-dom** (hash routing — works on any static host)
- Custom SVG icon set, custom YA logo mark, zero stock imagery

## Setup

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
```

## Changing the profile image (no code edits)

The Home hero portrait lives in one place: **`public/images/profile/`**.

Save your photo there as `yousef-ahmed.webp` (preferred) or `yousef-ahmed.jpg` —
the site picks it up automatically and displays it at the exact same size
(`object-fit: cover`, crop anchored to the upper half, so keep your face in the
upper third). Full instructions in `public/images/profile/README.md`.

## Changing the logo (no code edits)

Drop your logo files into the `public/` folder and they are picked up automatically:

| File | Shown on | Recommended logo colour |
| --- | --- | --- |
| `public/logo-light.svg` (or `.png`) | Dark sections (header, dark pages) | White / light |
| `public/logo-dark.svg` (or `.png`) | Light sections | Black / dark |
| `public/logo.svg` (or `.png`) | Both sections (universal fallback) | Your choice |

- `.svg` is preferred; `.png` works too. The first format that exists wins (tone-specific before universal).
- If a file is absent, the built-in **YA** mark + wordmark is used as a fallback.
- Recommended height ~40–60px (rendered at `h-10`/`h-16`, width auto). Transparent background.
- The logo is detected at runtime and also replaces the YA mark in the final CTA **and in the digital business card** (Contact page) — one asset swap updates the whole site.

## Updating the founder CV (no code edits)

The downloadable CVs (Arabic + English) live in `public/assets/cv/`. The download buttons inside Batata point at these exact paths:

| File | Language |
| --- | --- |
| `public/assets/cv/Yousef-Ahmed-CV-AR.pdf` | Arabic |
| `public/assets/cv/Yousef-Ahmed-CV-EN.pdf` | English |

To update a CV, simply **replace the PDF file** at that path (keep the same filename). The download buttons update automatically — no code change needed. Works on the deployed site too: upload the new PDFs to the same location on your host.

## Configuration (environment variables)

See `.env.example`. Copy to `.env.local`:

| Variable | Default (verified) | Purpose |
| --- | --- | --- |
| `VITE_WHATSAPP_SA` | `+966568992794` | WhatsApp — Saudi Arabia. |
| `VITE_WHATSAPP_EG` | `+201203361192` | WhatsApp — Egypt. |
| `VITE_CONTACT_EMAIL` | `TechOfTheWorled92@gmail.com` | Public business email for contact links. |
| `VITE_FORM_ENDPOINT` | — | Optional JSON POST endpoint for the service-request form. When empty, the form validates, then offers the completed request as a prefilled WhatsApp (KSA/EG) / email message (integration-ready, no fake backend). |

## Built-in lead automation (no setup required)

- **UTM capture** — `utm_source` / `utm_medium` / `utm_campaign` on the landing URL are stored per session and appended to every generated WhatsApp/email message (`▸ Source: ...`), so each lead arrives with its campaign attached.
- **Context handoff** — CTAs carry smart query params into the request form: market pages preselect the **country**, service sections preselect the **service**, case studies and industries arrive as a visible **context chip** and are included in the sent message.
- **Market auto-suggestion** — the floating WhatsApp widget orders Saudi/Egypt numbers using the visitor's timezone (best effort) and marks the likely one "Suggested".
- **One-tap channels** — click-to-call `tel:` links for both lines plus a downloadable **vCard** (both numbers + email) on the Contact page.

## Deployment

Any static host (Vercel, Netlify, Cloudflare Pages, S3):

1. Build command: `npm run build`
2. Output directory: `dist`
3. Set the three `VITE_*` variables in the host dashboard
4. Replace the `tech-of-the-world.example` domain in `index.html` canonical/OG tags, `robots.txt` and `sitemap.xml`

Hash-based routing means no server rewrites are required. If you migrate to clean paths, swap `HashRouter` → `BrowserRouter` and add SPA rewrites.

## Architecture

```
src/
  config.ts            env-driven contact & endpoint configuration
  i18n.tsx             EN/AR language provider (RTL-aware) + UI strings
  data/
    content.ts         service lines, differentiators, steps, industries, tech, FAQ
    cases.ts           8 documented case studies (bilingual)
    insights.ts        knowledge articles (bilingual)
  components/
    kit.tsx            icons, logo, reveal/scramble/marquee primitives, buttons, FAQ
    chrome.tsx         header, footer, WhatsApp FAB, layout
    ServiceRequestForm.tsx  validated, integration-ready request form
  pages/               Home, Services, Projects(+detail), About, Industries,
                       Insights(+detail), Markets (KSA/EG), Contact, Request
```

Content rules: no invented clients, budgets, dates, team sizes, metrics, certifications, partnerships or testimonials. Numbers shown are factual properties of the site itself (service lines, markets, documented case studies).
