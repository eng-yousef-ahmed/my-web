/**
 * TECH OF THE WORLD — central, environment-driven configuration.
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

export const CONTACT = {
  whatsappSA: digits(env.VITE_WHATSAPP_SA || "+966568992794"),
  whatsappEG: digits(env.VITE_WHATSAPP_EG || "+201203361192"),
  displaySA: "+966 56 899 2794",
  displayEG: "+20 120 336 1192",
  email: (env.VITE_CONTACT_EMAIL || "TechOfTheWorled92@gmail.com").trim(),
  formEndpoint: (env.VITE_FORM_ENDPOINT || "").trim(),
};

export const hasWhatsApp = true;
export const hasEmail = CONTACT.email.length > 0;

/** Builds a wa.me deep link with a prefilled message for the chosen market number. */
export function waLink(message: string, market: Market = "sa"): string {
  const number = market === "eg" ? CONTACT.whatsappEG : CONTACT.whatsappSA;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Builds a mailto link. Returns null when the email is not configured. */
export function mailLink(subject: string, body: string): string | null {
  if (!hasEmail) return null;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Generated brand imagery (dark, duotone-graded in CSS). */
export const IMAGES = {
  ops: "https://image.qwenlm.ai/generated-images/70296d57-3950-4428-93da-13ab4eeaffdc/_result.png",
  rack: "https://image.qwenlm.ai/generated-images/1972e502-7e3a-4038-9591-a5555f40fa7f/_result.png",
  network: "https://image.qwenlm.ai/generated-images/3903330b-f80a-46da-934a-dafeb37f8c61/_result.png",
};
