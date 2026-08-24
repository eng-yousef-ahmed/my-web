/**
 * TECH OF THE WORLD — central, environment-driven configuration.
 *
 * All contact data and replaceable-asset paths live here, so nothing is
 * hard-coded inside components. Environment variables can override any
 * value at build time (see .env.example).
 */
export type Market = "sa" | "eg";

const env = import.meta.env as Record<string, string | undefined>;
const digits = (s: string) => s.replace(/\D/g, "");
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export const CONFIG = {
  brand: "TECH OF THE WORLD",
  symbol: "YA",
  tagline: "Technology That Moves Business Forward.",
  markets: ["Saudi Arabia", "Egypt"] as const,
};

/* ================= verified contact data ================= */
export const CONTACT = {
  whatsappSA: digits(env.VITE_WHATSAPP_SA || "+966568992794"),
  whatsappEG: digits(env.VITE_WHATSAPP_EG || "+201203361192"),
  displaySA: "+966 56 899 2794",
  displayEG: "+20 120 336 1192",
  email: (env.VITE_CONTACT_EMAIL || "TechOfTheWorled92@gmail.com").trim(),
  linkedin: (env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/eng-yousef-ahmed/").trim(),
  linkedinHandle: "eng-yousef-ahmed",
  website: (env.VITE_WEBSITE_URL || "https://tech-of-the-world.netlify.app").trim(),
};

export const hasEmail = CONTACT.email.length > 0;

/* ================= business-card identity ================= */
export const CARD = {
  name: "Yousef Ahmed",
  nameAr: "يوسف أحمد",
  title: "Senior IT Support Specialist",
  titleAr: "أخصائي دعم تقني أول",
  phoneDisplay: "+966 56 864 6500",
  phoneDigits: "966568646500",
  whatsappDisplay: "+966 56 864 6500",
  whatsappDigits: "966568646500",
  email: "eng.yousef.ahmed92@gmail.com",
  location: { en: "Jeddah, Saudi Arabia", ar: "جدة، السعودية" },
  mapsUrl: "https://maps.google.com/?q=Jeddah,+Saudi+Arabia",
  linkedinDisplay: "linkedin.com/in/eng-yousef-ahmed",
};

/** Optional GitHub profile — the social icon only renders when configured (no fake URLs). */
export const githubUrl = (env.VITE_GITHUB_URL || "").trim();

/* ================= founder CV (downloadable) =================
 * Two PDFs (Arabic + English) served from /public/assets/cv/.
 * Replace the files there with the real CVs at any time — NO code change needed.
 */
export const CV_FILES = {
  ar: `${base}/assets/cv/Yousef-Ahmed-CV-AR.pdf`,
  en: `${base}/assets/cv/Yousef-Ahmed-CV-EN.pdf`,
};

/* ================= replaceable image assets (no code edits) =================
 * Drop a file with the SAME name into the folder and the page picks it up
 * automatically. See the README inside each folder:
 *
 *   public/images/profile/   → Home page full-screen portrait
 *   public/images/contact/   → Contact page portrait
 */
export const HOME_ASSETS = {
  profile: [
    `${base}/images/profile/yousef-ahmed.webp`,
    `${base}/images/profile/yousef-ahmed.jpg`,
    `${base}/images/profile/profile.webp`,
    `${base}/images/profile/profile.jpg`,
    `${base}/images/profile/profile.png`,
  ],
};

export const CARD_ASSETS = {
  profile: [
    `${base}/images/contact/profile.webp`,
    `${base}/images/contact/profile.jpg`,
    `${base}/images/contact/profile.png`,
  ],
};

/** Portrait crop anchor — tune per photo via env, no code edits. */
export const homeProfilePosition = (env.VITE_HOME_PROFILE_POSITION || "50% 12%").trim();
export const cardProfilePosition = (env.VITE_CONTACT_PROFILE_POSITION || "50% 18%").trim();

/* ================= outbound helpers ================= */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** Call once on app boot (HashRouter puts the query after "#/route?"). */
export function captureUtm(): void {
  try {
    const query = window.location.hash.split("?")[1] ?? "";
    const q = new URLSearchParams(query);
    const found: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length) sessionStorage.setItem("ya-utm", JSON.stringify(found));
  } catch {
    /* storage unavailable — enrichment simply skipped */
  }
}

function storedUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("ya-utm") ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function enrich(message: string): string {
  const utm = storedUtm();
  const parts = Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(", ");
  return parts ? `${message}\n\n▸ Source: ${parts}` : message;
}

/** Builds a wa.me deep link with a prefilled, source-enriched message. */
export function waLink(message: string, market: Market = "sa"): string {
  const number = market === "eg" ? CONTACT.whatsappEG : CONTACT.whatsappSA;
  return `https://wa.me/${number}?text=${encodeURIComponent(enrich(message))}`;
}

/** Builds a mailto link. Returns null when the email is not configured. */
export function mailLink(subject: string, body: string): string | null {
  if (!hasEmail) return null;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enrich(body))}`;
}

/** Click-to-call deep link for a market line. */
export const telHref = (market: Market): string =>
  `tel:+${market === "eg" ? CONTACT.whatsappEG : CONTACT.whatsappSA}`;

/** vCard built from the card identity — one tap saves the profile into the visitor's phone. */
export function contactCardVcf(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CARD.name}`,
    "N:Ahmed;Yousef;;;",
    `TITLE:${CARD.title}`,
    `TEL;TYPE=CELL:+${CARD.phoneDigits}`,
    `EMAIL:${CARD.email}`,
    `URL:${CONTACT.linkedin}`,
    `URL:${CONTACT.website}`,
    `NOTE:${CARD.title} — ${CARD.location.en}. WhatsApp: +${CARD.whatsappDigits}`,
    "END:VCARD",
  ];
  return `text/vcard;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

/** Human display form of the website URL (no protocol, no trailing slash). */
export function websiteDisplay(): string {
  return CONTACT.website.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");
}

/* ================= generated imagery (fallbacks only) =================
 * Real photos always come from the public folders above. These generated
 * images are only used while no local file exists yet.
 */
export const IMAGES = {
  profile: "https://image.qwenlm.ai/generated-images/ada728cc-71f5-4e15-bf23-14f5c59e204f/_result.png",
  contactProfile: "https://image.qwenlm.ai/generated-images/ada728cc-71f5-4e15-bf23-14f5c59e204f/_result.png",
  rack: "https://image.qwenlm.ai/generated-images/38ce266e-4d9d-4a33-b426-4bba89801df2/_result.png",
};
