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

/* ================= verified contact data ================= */
export const CONTACT = {
  whatsappSA: digits(env.VITE_WHATSAPP_SA || "+966568992794"),
  whatsappEG: digits(env.VITE_WHATSAPP_EG || "+201203361192"),
  displaySA: "+966 56 899 2794",
  displayEG: "+20 120 336 1192",
  email: (env.VITE_CONTACT_EMAIL || "youseefa77@gmail.com").trim(),
  linkedin: (env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/eng-yousef-ahmed/").trim(),
  linkedinHandle: "eng-yousef-ahmed",
  website: (env.VITE_WEBSITE_URL || "https://tech-of-the-world.netlify.app").trim(),
};


/* ================= business-card identity ================= */
export const CARD = {
  name: "Yousef Ahmed",
  nameAr: "يوسف أحمد",
  title: "Senior IT Support Specialist",
  titleAr: "أخصائي دعم تقني أول",
  /* one source of truth: everything below comes from CONTACT */
  phoneDisplay: CONTACT.displaySA,
  phoneDigits: CONTACT.whatsappSA,
  whatsappDisplay: CONTACT.displaySA,
  whatsappDigits: CONTACT.whatsappSA,
  whatsappEgDisplay: CONTACT.displayEG,
  whatsappEgDigits: CONTACT.whatsappEG,
  email: CONTACT.email,
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
  /* the contact page and digital card reuse the main portrait, so there is one photo to maintain */
  profile: HOME_ASSETS.profile,
};

/** Portrait crop anchor — tune per photo via env, no code edits. */
export const cardProfilePosition = (env.VITE_CONTACT_PROFILE_POSITION || "64% 14%").trim();

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
  if (!CONTACT.email) return null;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enrich(body))}`;
}


/** vCard built from the card identity — one tap saves the profile into the visitor's phone. */
export function contactCardVcf(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CARD.name}`,
    "N:Ahmed;Yousef;;;",
    `TITLE:${CARD.title}`,
    `TEL;TYPE=CELL:+${CARD.phoneDigits}`,
    `TEL;TYPE=CELL:+${CARD.whatsappEgDigits}`,
    `EMAIL:${CARD.email}`,
    `URL:${CONTACT.linkedin}`,
    `URL:${CONTACT.website}`,
    `NOTE:${CARD.title} — ${CARD.location.en}. WhatsApp KSA: +${CARD.whatsappDigits} · Egypt: +${CARD.whatsappEgDigits}`,
    "END:VCARD",
  ];
  return `text/vcard;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

/** Human display form of the website URL (no protocol, no trailing slash). */
export function websiteDisplay(): string {
  return CONTACT.website.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");
}

/* ================= fallbacks =================
 * The real portraits ship with the site; these are only the last-resort paths.
 */
export const IMAGES = {
  profile: `${base}/images/profile/yousef-ahmed.webp`,
  contactProfile: `${base}/images/profile/yousef-ahmed.webp`,
  contactLogo: `${base}/images/contact/logo.png`,
};
