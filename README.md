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

Vite · React 18 · TypeScript · Tailwind CSS v4 · react-router-dom (hash routing, works on any static host).

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
| `VITE_CONTACT_PROFILE_POSITION` | `50% 18%` — portrait crop |

The digital card, Contact page, footer and assistant all read from the same values.

## Replacing content without code edits

- **Home portrait:** `public/images/profile/yousef-ahmed.webp`
- **Contact / card portrait:** `public/images/contact/profile.webp`
- **CVs:** `public/assets/cv/Yousef-Ahmed-CV-AR.pdf` and `…-EN.pdf` (keep the filenames)
- **Logo:** `public/logo-light.svg` (dark sections) and `public/logo-dark.svg` (light sections)
- **Project photos / extra projects:** see `public/projects/_template/README.md`; list the folder names in `public/projects/index.json`

## Structure

```
src/
  config.ts        contact data, asset paths, link helpers
  i18n.tsx         EN/AR provider, UI strings, page-meta hook
  data/            content.ts · career.ts · cases.ts · projectLoader.ts
  components/      kit.tsx (icons, logo, buttons, reveal) · chrome.tsx (header, footer, layout) · Assistant.tsx
  pages/           Home · About · Services · Projects · Contact · Card
```

## Deployment

Any static host: build command `npm run build`, output directory `dist`. Hash routing needs no server rewrites.

Content rule: no invented clients, metrics, certifications or testimonials — only verified information.
