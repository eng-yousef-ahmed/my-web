/**
 * TECH OF THE WORLD — central, environment-driven configuration & outbound helpers.
 *
 * Contact channels ship with the verified business numbers below and can be
 * overridden at build time via environment variables (see .env.example):
 *   VITE_WHATSAPP_SA     — Saudi WhatsApp number (digits, international format)
 *   VITE_WHATSAPP_EG     — Egypt WhatsApp number (digits, international format)
 *   VITE_CONTACT_EMAIL   — public business email address
 *   VITE_FORM_ENDPOINT   — optional backend endpoint receiving the
 *                          service-request form as a JSON POST
 */
export type Market = "sa" | "eg";

const env = import.meta.env as Record<string, string | undefined>;
const digits = (s: string) => s.replace(/\D/g, "");

export const CONFIG = {
  brand: "TECH OF THE WORLD",
  symbol: "YA",
  tagline: "Technology That Moves Business Forward.",
  positioning: "Senior IT Support Specialist, IT infrastructure & operations",
  markets: ["Saudi Arabia", "Egypt"] as const,
};

export const CONTACT = {
  whatsappSA: digits(env.VITE_WHATSAPP_SA || "+966568992794"),
  whatsappEG: digits(env.VITE_WHATSAPP_EG || "+201203361192"),
  displaySA: "+966 56 899 2794",
  displayEG: "+20 120 336 1192",
  email: (env.VITE_CONTACT_EMAIL || "TechOfTheWorled92@gmail.com").trim(),
  formEndpoint: (env.VITE_FORM_ENDPOINT || "").trim(),

  /* ---- business-card identity (single source of truth for the card + .vcf) ---- */
  cardName: (env.VITE_CARD_NAME || "YOUSEF AHMED MOHMED").trim(),
  cardTitle: (env.VITE_CARD_TITLE || "Senior IT Support Specialist").trim(),
  cardEmail: (env.VITE_CARD_EMAIL || "youseefa77@gmail.com").trim(),
  website: (env.VITE_WEBSITE_URL || "https://tech-of-the-world.netlify.app").trim(),
};

export const hasWhatsApp = true;
export const hasEmail = CONTACT.email.length > 0;

/* ================= founder CV (downloadable) =================
 * Two PDFs (Arabic + English) served from /public/assets/cv/.
 * Replace the files there with the real CVs at any time — the
 * download buttons (inside Batata and elsewhere) point at these
 * paths, so NO code change is ever needed to update the CV.
 */
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
export const CV_FILES = {
  ar: `${base}/assets/cv/Yousef-Ahmed-CV-AR.pdf`,
  en: `${base}/assets/cv/Yousef-Ahmed-CV-EN.pdf`,
};

/* ================= outbound automation =================
 * UTM parameters from the landing URL are captured once per session and
 * appended to every WhatsApp / email message the site generates — so each
 * inbound lead arrives with its marketing source attached. No setup needed.
 */
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

/** A downloadable vCard so one tap saves both lines + email into the visitor's phone. */
export function vCardDataUrl(): string {
  const nameParts = CONTACT.cardName.trim().split(/\s+/);
  const family = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const given = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : CONTACT.cardName;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CONTACT.cardName}`,
    `N:${family};${given};;;`,
    `ORG:${CONFIG.brand}`,
    `TITLE:${CONTACT.cardTitle}`,
    `TEL;TYPE=CELL:+${CONTACT.whatsappEG}`,
    `TEL;TYPE=CELL,WORK:+${CONTACT.whatsappSA}`,
    `EMAIL:${CONTACT.cardEmail}`,
    `URL:${CONTACT.website}`,
    `URL:https://wa.me/${CONTACT.whatsappEG}`,
    `URL:https://wa.me/${CONTACT.whatsappSA}`,
    `NOTE:Technology That Moves Business Forward. WhatsApp: +${CONTACT.whatsappEG} (Egypt) / +${CONTACT.whatsappSA} (Saudi Arabia). IT services in Saudi Arabia & Egypt.`,
    "END:VCARD",
  ];
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

/** Human display form of the website URL (no protocol, no trailing slash). */
export function websiteDisplay(): string {
  return CONTACT.website.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");
}

/** Generated brand imagery (dark, duotone-graded in CSS). */
export const IMAGES = {
  ops: "https://image.qwenlm.ai/generated-images/70296d57-3950-4428-93da-13ab4eeaffdc/_result.png",
  rack: "https://image.qwenlm.ai/generated-images/1972e502-7e3a-4038-9591-a5555f40fa7f/_result.png",
  network: "https://image.qwenlm.ai/generated-images/3903330b-f80a-46da-934a-dafeb37f8c61/_result.png",
  /**
   * Default hero portrait. The site ALWAYS prefers a local file dropped into
   * `public/images/profile/` (profile.webp → profile.jpg → profile.png) — so
   * replacing the photo later needs ZERO code changes. This remote image is
   * only the fallback while no local file exists.
   */
  profile: "https://image.qwenlm.ai/generated-images/93222298-9b9d-4637-8416-d6241340729f/_result.png",
};
