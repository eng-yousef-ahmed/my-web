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
  positioning: "Professional IT Services & Technology Solutions Provider",
  markets: ["Saudi Arabia", "Egypt"] as const,
};

const linkedinUrl = (env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/eng-yousef-ahmed").trim();
const linkedinHandle =
  linkedinUrl
    .replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")
    .replace(/^in\//i, "")
    .replace(/\/+$/, "") || "profile";

export const CONTACT = {
  whatsappSA: digits(env.VITE_WHATSAPP_SA || "+966568992794"),
  whatsappEG: digits(env.VITE_WHATSAPP_EG || "+201203361192"),
  displaySA: "+966 56 899 2794",
  displayEG: "+20 120 336 1192",
  email: (env.VITE_CONTACT_EMAIL || "TechOfTheWorled92@gmail.com").trim(),
  formEndpoint: (env.VITE_FORM_ENDPOINT || "").trim(),
  linkedin: linkedinUrl,
  linkedinHandle: linkedinHandle,
};

export const hasWhatsApp = true;
export const hasEmail = CONTACT.email.length > 0;

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
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:TECH OF THE WORLD",
    "ORG:TECH OF THE WORLD",
    `TITLE:${CONFIG.positioning}`,
    `TEL;TYPE=CELL,VOICE:+${CONTACT.whatsappSA}`,
    `TEL;TYPE=CELL,VOICE:+${CONTACT.whatsappEG}`,
    `EMAIL:${CONTACT.email}`,
    `URL:https://wa.me/${CONTACT.whatsappSA}`,
    `URL:${CONTACT.linkedin}`,
    "NOTE:Technology That Moves Business Forward — IT services in Saudi Arabia & Egypt",
    "END:VCARD",
  ];
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(lines.join("\n"))}`;
}

/** Generated brand imagery (dark, duotone-graded in CSS). */
export const IMAGES = {
  ops: "https://image.qwenlm.ai/generated-images/70296d57-3950-4428-93da-13ab4eeaffdc/_result.png",
  rack: "https://image.qwenlm.ai/generated-images/1972e502-7e3a-4038-9591-a5555f40fa7f/_result.png",
  network: "https://image.qwenlm.ai/generated-images/3903330b-f80a-46da-934a-dafeb37f8c61/_result.png",
};
