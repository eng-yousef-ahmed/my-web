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

## Changing the logo (no code edits)

Drop your logo files into the `public/` folder and they are picked up automatically:

| File | Shown on | Recommended logo colour |
| --- | --- | --- |
| `public/logo-light.svg` (or `.png`) | Dark sections (header, dark pages) | White / light |
| `public/logo-dark.svg` (or `.png`) | Light sections | Black / dark |

- `.svg` is preferred; `.png` works too. The first format that exists wins.
- If a file is absent, the built-in **YA** mark + wordmark is used as a fallback.
- Recommended height ~40px (rendered at `h-10`, width auto). Transparent background.

## Configuration (environment variables)

See `.env.example`. Copy to `.env.local`:

| Variable | Default (verified) | Purpose |
| --- | --- | --- |
| `VITE_WHATSAPP_SA` | `+966568992794` | WhatsApp — Saudi Arabia. |
| `VITE_WHATSAPP_EG` | `+201203361192` | WhatsApp — Egypt. |
| `VITE_CONTACT_EMAIL` | `TechOfTheWorled92@gmail.com` | Public business email for contact links. |
| `VITE_FORM_ENDPOINT` | — | Optional JSON POST endpoint for the service-request form. When empty, the form validates, then offers the completed request as a prefilled WhatsApp (KSA/EG) / email message (integration-ready, no fake backend). |

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
