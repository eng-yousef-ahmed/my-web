# Yousef Ahmed — Portfolio

Personal portfolio and digital business card of **Yousef Ahmed, Senior IT Support Specialist** (Jeddah, Saudi Arabia · Egypt).
Bilingual (English LTR / Arabic RTL), built to present real work to business owners.

## Pages

| Route | Purpose |
| --- | --- |
| `/#/` | Home — portrait hero |
| `/#/about` | Experience timeline, tools, education |
| `/#/services` | The five service lines |
| `/#/projects` and `/#/projects/:id` | Case studies |
| `/#/contact` | Contact channels and CV download |
| `/#/card` | Standalone digital business card (QR target, with Save Contact) |

A floating assistant (**Batata**) guides visitors to services, experience, the CV and contact channels.

## Stack

Vite 8 · React 19 · TypeScript 7 · Tailwind CSS v4 (Node 20.19+ or 22.12+, see `.nvmrc`) · react-router-dom (hash routing, works on any static host).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # production build → dist/
```

## Configuration

Contact details live in `src/config.ts` and can be overridden with `VITE_*` variables (copy `.env.example` to `.env.local`):

| Variable | Default |
| --- | --- |
| `VITE_WHATSAPP_SA` | `+966568992794` |
| `VITE_WHATSAPP_EG` | `+201203361192` |
| `VITE_CONTACT_EMAIL` | `youseefa77@gmail.com` |
| `VITE_LINKEDIN_URL` | LinkedIn profile |
| `VITE_GITHUB_URL` | empty — icon appears only when set |
| `VITE_WEBSITE_URL` | site URL used on the card |
| `VITE_CONTACT_PROFILE_POSITION` | `64% 14%` — portrait crop on Contact/card |

The digital card, Contact page, footer and assistant all read from the same values.

## Replacing content without code edits

- **Portrait (Home and digital card):** `public/images/profile/yousef-ahmed.webp`
- **Contact page logo:** `public/images/contact/logo.png` (light lines on transparent)
- **Certificates (About + Home strip + assistant + JSON-LD):** edit `src/data/certificates.ts`; badge images live in `public/images/certificates/`. Add only credentials you can verify (Credly link).
- **CVs:** `public/assets/cv/Yousef-Ahmed-CV-AR.pdf` and `…-EN.pdf` (keep the filenames)
- **Logo:** `public/logo-light.svg` (dark sections) and `public/logo-dark.svg` (light sections)
- **Project photos / extra projects:** see `public/projects/_template/README.md`; list the folder names in `public/projects/index.json`

## Structure

```
src/
  config.ts        contact data, asset paths, link helpers
  i18n.tsx         EN/AR provider, UI strings, page-meta hook
  data/            content.ts · career.ts · cases.ts · certificates.ts · projectLoader.ts
  components/      kit.tsx (icons, logo, buttons, reveal) · chrome.tsx (header, footer, layout) · Assistant.tsx
  pages/           Home · About · Services · Projects · Contact · Card
```

## Security

- `vercel.json` (Vercel) and `public/_headers` (Netlify / Cloudflare Pages) set the same headers. They set a strict Content-Security-Policy (scripts only from the site itself), `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS. If you add a new external service (analytics, fonts, embeds), add its host to the CSP there.
- No secrets live in the code: everything in `.env.example` is public contact info. Real `.env*` files are git-ignored.
- Dependabot opens weekly pull requests for dependency updates (`.github/dependabot.yml`); run `npm audit` before releases.

## Deployment

Live site: https://yousef-ahmed-phi.vercel.app (Vercel; headers come from `vercel.json`). Any static host works: build command `npm run build`, output directory `dist`. Hash routing needs no server rewrites.

Content rule: no invented clients, metrics, certifications or testimonials — only verified information.
