/**
 * TECH OF THE WORLD — central, environment-driven configuration.
 *
 * All contact channels and the form endpoint are read from environment
 * variables so nothing sensitive is hardcoded in the frontend.
 *
 * Required environment variables (see .env.example):
 *   VITE_WHATSAPP_NUMBER  — international format, digits only (e.g. 9665XXXXXXXX)
 *   VITE_CONTACT_EMAIL    — public business email address
 *   VITE_FORM_ENDPOINT    — optional backend endpoint that receives the
 *                           service-request form as a JSON POST
 */
export const CONFIG = {
  brand: "TECH OF THE WORLD",
  symbol: "YA",
  tagline: "Technology That Moves Business Forward.",
  positioning: "Professional IT Services & Technology Solutions Provider",
  markets: ["Saudi Arabia", "Egypt"] as const,

  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || "",
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || "",
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || "",
};

/** Generated brand imagery (dark, amber-lit, no stock feel). */
export const IMAGES = {
  network: "https://image.qwenlm.ai/generated-images/70296d57-3950-4428-93da-13ab4eeaffdc/_result.png",
  ops: "https://image.qwenlm.ai/generated-images/1972e502-7e3a-4038-9591-a5555f40fa7f/_result.png",
  rack: "https://image.qwenlm.ai/generated-images/3903330b-f80a-46da-934a-dafeb37f8c61/_result.png",
};

export const hasWhatsApp = CONFIG.whatsappNumber.length > 0;
export const hasEmail = CONFIG.email.length > 0;

/** Builds a wa.me deep link with a prefilled message. Returns null when the number is not configured. */
export function waLink(message: string): string | null {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Builds a mailto link. Returns null when the email is not configured. */
export function mailLink(subject: string, body: string): string | null {
  if (!hasEmail) return null;
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
