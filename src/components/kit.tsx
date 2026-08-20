import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, usePrefersReducedMotion } from "../i18n";
import type { B } from "../i18n";

/* ================= custom inline icon set ================= */
const PATHS: Record<string, React.ReactNode> = {
  rack: (
    <>
      <rect x="3.5" y="3.5" width="17" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="17" height="7" rx="1" />
      <path d="M6.5 7h4M6.5 17h4" />
      <circle cx="17.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.9 6.9 6 16m7.1-9.1L18 16M7.2 18h9.6" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.6a4.2 4.2 0 0 1 .5 8.4" />
      <path d="M12 12.5v8m0-8-2.6 2.6M12 12.5l2.6 2.6" />
    </>
  ),
  cctv: (
    <>
      <path d="m3.5 8.5 12-4.5 1.6 4.3-12 4.5z" />
      <path d="m17.1 8.3 3.4-1.2.9 2.5-3.4 1.3M8 13.4V17h5M4.5 13.2 3.8 15" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.2 6.3a4 4 0 0 0-5.4 5.1L3.5 16.7a1.8 1.8 0 0 0 2.6 2.6l5.3-5.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.3-.7-.7-2.3z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" />
      <path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3.5 12.5h17M12 11v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 2.6 2.8 14.4 0 17-2.8-2.6-2.8-14.4 0-17Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8z" />
      <path d="m4.5 12.2 7.5 4 7.5-4M4.5 16.2l7.5 4 7.5-4" />
    </>
  ),
  foundation: (
    <>
      <path d="M4 20.5h16M5.5 16.5h13M7.5 12.5h9M9.5 8.5h5M11 4.5h2" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 13.5v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M18.5 19v.8a2.2 2.2 0 0 1-2.2 2.2H13" />
    </>
  ),
  crane: (
    <>
      <path d="M4 20.5h16M6 20.5V8l12-4v16.5M6 8l12-4M14 4.5V9m0 0-2 2m2-2 2 2" />
    </>
  ),
  bell: (
    <>
      <path d="M12 4.5a7 7 0 0 0-7 7v3h14v-3a7 7 0 0 0-7-7Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0M3.5 14.5h17" />
    </>
  ),
  pulse: (
    <>
      <path d="M3.5 12h4l2-4.5 3 9 2-4.5h6" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 4.5h2.2l2.1 10.5h10.7l2-7.5H7" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  desk: (
    <>
      <rect x="4" y="4.5" width="16" height="10" rx="1" />
      <path d="M12 14.5v3m-5 3 5-3 5 3M3.5 20.5h17" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16Z" />
      <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8M7.8 5.8l8.4 4.4" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  arrow: <path d="M4 12h16m0 0-6-6m6 6-6 6" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </>
  ),
  phone: (
    <path d="M7.5 3.5h3l1.5 4.5-2.2 1.7a12.5 12.5 0 0 0 4.5 4.5l1.7-2.2 4.5 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  wa: (
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Zm-3.2 5.2c-.3 0-.7.1-.9.8-.5 1.3.2 3.1 1.5 4.7 1.3 1.6 3.3 3 4.8 3 .7 0 1.2-.5 1.4-1l.3-.9c.1-.3 0-.6-.3-.7l-1.2-.6c-.5-.2-.8.4-1.1.7-.3.2-.5 0-1-.3a7.5 7.5 0 0 1-2.1-2.1c-.3-.4-.4-.6-.2-.9.3-.3.8-1 .6-1.4l-.5-1.1c-.1-.3-.4-.2-.8-.2Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3.5h8l4 4v13H6Z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v6c0 4.4 3 7.4 7 8.5 4-1.1 7-4.1 7-8.5V6Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.5" />
    </>
  ),
  chevron: <path d="m6 9.5 6 6 6-6" />,
  alert: (
    <>
      <path d="M12 4 2.8 19.5h18.4Z" />
      <path d="M12 10v4M12 16.8v.4" />
    </>
  ),
  send: <path d="M20.5 3.5 3.5 10l7 2.5 2.5 7Zm0 0-10 9" />,
  /* Official LinkedIn brand glyph (simple-icons) */
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  ),
  flag: <path d="M5.5 21V4m0 0c4-2.5 8 2.5 12 0v9c-4 2.5-8-2.5-12 0" />,
  bolt: <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5Z" />,
  printer: (
    <>
      <path d="M7 8V3.5h10V8M7 17H4.5a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H17" />
      <rect x="7" y="14.5" width="10" height="6" />
      <circle cx="17.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z" />,
  key: (
    <>
      <circle cx="8" cy="8.5" r="4" />
      <path d="m11 11.5 8.5 8.5M17 17.5l2-2M14.5 15l2-2" />
    </>
  ),
};

export function Icon({ name, className = "w-5 h-5", strokeWidth = 1.7 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name] ?? PATHS.box}
    </svg>
  );
}

/**
 * Bulletproof external-link opener.
 * Some environments (embedded previews, sandboxed iframes, aggressive popup
 * blockers) silently swallow `target="_blank"`. This handler opens the URL as
 * a user gesture; if that is blocked it falls back to same-tab navigation so
 * the link always does something.
 */
/**
 * LinkedIn link — a single, clean anchor with NO click handlers.
 *
 * It uses the exact same mechanism as the working WhatsApp links: a plain
 * <a href target="_blank" rel="noopener noreferrer">. No preventDefault, no
 * window.open, no interception — so the browser navigates natively and the
 * link behaves identically to every other external link on the site.
 */
/**
 * On a real (top-level) deployment the anchor stays 100% native — zero JS
 * interference, exactly like the WhatsApp links.
 *
 * Inside an embedded preview iframe some hosts silently swallow
 * `target="_blank"` navigations to certain domains. In that case only, we
 * guard the click: try a popup, and if nothing happened, navigate anyway
 * (top frame first, then this frame) so the link ALWAYS does something.
 */
export function openGuarded(url: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined" || window.self === window.top) return;
    e.preventDefault();
    let win: Window | null = null;
    try {
      win = window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      win = null;
    }
    window.setTimeout(() => {
      if (!document.hasFocus()) return; // a new tab/window opened — done
      try {
        window.top!.location.href = url;
      } catch {
        window.location.href = url;
      }
    }, 700);
  };
}

export function LinkedInLink({
  url,
  handle,
  variant = "icon",
  className = "",
  labelAr = "تواصل مع يوسف أحمد على لينكدإن",
  labelEn = "Connect with Yousef Ahmed on LinkedIn",
}: {
  url: string;
  handle: string;
  variant?: "icon" | "chip" | "row" | "button";
  className?: string;
  labelAr?: string;
  labelEn?: string;
}) {
  const { isAr } = useLang();
  const aria = isAr ? labelAr : labelEn;
  const guard = openGuarded(url);

  if (variant === "icon") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        title="LinkedIn"
        onClick={guard}
        className={`w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#0a66c2] hover:text-[#5ea8e8] hover:bg-[#0a66c2]/10 transition-all duration-300 ${className}`}
      >
        <Icon name="linkedin" className="w-4.5 h-4.5" />
      </a>
    );
  }

  if (variant === "chip") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        onClick={guard}
        className={`inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-mist-300 hover:text-[#5ea8e8] transition-colors ${className}`}
      >
        <Icon name="linkedin" className="w-4 h-4" /> LinkedIn
      </a>
    );
  }

  if (variant === "row") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        onClick={guard}
        className={`group flex items-center gap-3.5 px-3 py-3 hover:bg-ink-700 transition-colors ${className}`}
      >
        <span className="shrink-0 w-6 h-6 grid place-items-center bg-[#0a66c2] text-white">
          <Icon name="linkedin" className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
        <span className="flex-1 leading-tight">
          <span className="block font-display font-semibold text-[13.5px] text-paper-50 group-hover:text-amber-400 transition-colors">LinkedIn</span>
          <span className="block font-mono text-[11px] text-mist-400 mt-0.5" dir="ltr">/{handle}</span>
        </span>
      </a>
    );
  }

  /* variant === "button" — the founder CTA */
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      onClick={guard}
      className={`group inline-flex items-center gap-3 border border-[#0a66c2]/60 bg-[#0a66c2]/10 text-[#5ea8e8] px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-all duration-300 ${className}`}
    >
      <Icon name="linkedin" className="w-4.5 h-4.5" />
      <span className="text-start">
        <span className="block">{isAr ? "تواصل مع يوسف على لينكدإن" : "Connect with Yousef on LinkedIn"}</span>
        <span className="block font-mono normal-case tracking-normal text-[10px] opacity-75 mt-0.5" dir="ltr">/{handle}</span>
      </span>
      <Icon name="arrow" className="w-3.5 h-3.5 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
    </a>
  );
}

/* ================= flags (detailed inline marks) ================= */
export function FlagSA({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1.5" y="4.5" width="21" height="15" rx="2.4" fill="#1e7a44" stroke="#0a1420" strokeOpacity="0.35" strokeWidth="0.8" />
      {/* stylized shahada strokes */}
      <g stroke="#f4f9f4" strokeWidth="1.05" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M6 8.2h2.1M9.1 8.2h1.3M11.4 8.2h3.1M15.5 8.2h2.5" />
        <path d="M6.6 10.6h1.5M9 10.6h2.7M12.7 10.6h1.5M15.1 10.6h2.9" />
        <path d="M7.4 12.9h3.3M11.8 12.9h2.1M15 12.9h1.9" />
      </g>
      {/* sword — blade toward the hoist, hilt on the fly side */}
      <g fill="#f4f9f4">
        <path d="M5.1 15.55 h11.5 l1.9 0.95 -1.9 0.95 H5.1 q-1.05 -0.95 0 -1.9 Z" />
        <rect x="17.35" y="14.6" width="1.15" height="3.7" rx="0.45" />
        <path d="M18.9 14.85 h1.9 a0.6 0.6 0 0 1 0.6 0.6 v2 a0.6 0.6 0 0 1 -0.6 0.6 h-1.9 Z" />
        <circle cx="21" cy="16.45" r="0.75" />
      </g>
    </svg>
  );
}
export function FlagEG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* tricolor bands with rounded corners (no clip ids needed) */}
      <path d="M1.5 6.9 a2.4 2.4 0 0 1 2.4 -2.4 h16.2 a2.4 2.4 0 0 1 2.4 2.4 v2.6 h-21 Z" fill="#ce1126" />
      <rect x="1.5" y="9.5" width="21" height="5" fill="#f7f4ee" />
      <path d="M1.5 14.5 h21 v2.6 a2.4 2.4 0 0 1 -2.4 2.4 h-16.2 a2.4 2.4 0 0 1 -2.4 -2.4 Z" fill="#23272b" />
      <rect x="1.5" y="4.5" width="21" height="15" rx="2.4" fill="none" stroke="#0a1420" strokeOpacity="0.35" strokeWidth="0.8" />
      {/* Eagle of Saladin — simplified golden emblem */}
      <g fill="#c99b3f" stroke="#8a6420" strokeWidth="0.35">
        <circle cx="12" cy="9.7" r="0.9" />
        <path d="M11.9 9.05 l0.95 0.75 h-1.9 Z" />
        <path d="M11.15 10.6 h1.7 l0.5 3.15 h-2.7 Z" />
        <path d="M11.1 10.8 C9 11.85 7.35 11.55 6.15 10.15 C6.65 12.95 8.7 14.15 11.3 14.2 Z" />
        <path d="M12.9 10.8 C15 11.85 16.65 11.55 17.85 10.15 C17.35 12.95 15.3 14.15 12.7 14.2 Z" />
        <path d="M10.9 13.95 h2.2 l0.55 1.75 h-3.3 Z" />
      </g>
    </svg>
  );
}

/* ================= YA logo ================= */
export function LogoMark({ tone = "light", className = "w-10 h-10" }: { tone?: "light" | "dark"; className?: string }) {
  const stroke = tone === "light" ? "#F3F6F5" : "#0A1420";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M8 2h26l12 12v26a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Z"
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
      />
      <path d="M34 2l12 12H34Z" fill="#E9A33B" />
      <text
        x="22"
        y="31.5"
        textAnchor="middle"
        fontFamily="'Space Grotesk','Almarai',sans-serif"
        fontWeight="700"
        fontSize="17"
        fill={stroke}
        letterSpacing="0.5"
      >
        YA
      </text>
      <rect x="8" y="37" width="7" height="2.4" fill="#E9A33B" />
    </svg>
  );
}

/* ---------- swappable brand logo (no code change needed) ----------
 * Drop your own logo into the `public/` folder and it is picked up
 * automatically — no code edits required:
 *
 *   public/logo-light.svg  (or .png)  → shown on DARK sections  (use a light/white logo)
 *   public/logo-dark.svg   (or .png)  → shown on LIGHT sections (use a dark/black logo)
 *
 * If a file is missing the built-in YA mark + wordmark is used instead.
 * The first format that exists wins (svg is tried before png).
 */
const customLogoCache: Partial<Record<"light" | "dark", Promise<string | null>>> = {};
let logoHintShown = false;

function resolveCustomLogo(tone: "light" | "dark"): Promise<string | null> {
  if (!customLogoCache[tone]) {
    customLogoCache[tone] = new Promise((resolve) => {
      /* tone-specific files win; a universal /logo.* works for both tones */
      const candidates = [`/logo-${tone}.svg`, `/logo-${tone}.png`, "/logo.svg", "/logo.png"];
      let i = 0;
      const next = () => {
        if (i >= candidates.length) {
          if (import.meta.env.DEV && !logoHintShown) {
            logoHintShown = true;
            console.info(
              "[TECH OF THE WORLD] عندك لوجو جاهز؟ حطه في public/logo-light.svg (للأقسام الداكنة) و public/logo-dark.svg (للفاتحة) — أو public/logo.svg لنسختين — هيظهر تلقائيًا بدون أي تعديل في الكود."
            );
          }
          return resolve(null);
        }
        const img = new Image();
        img.onload = () => resolve(candidates[i]);
        img.onerror = () => {
          i++;
          next();
        };
        img.src = candidates[i];
      };
      next();
    });
  }
  return customLogoCache[tone]!;
}

function useCustomLogo(tone: "light" | "dark"): string | null {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    resolveCustomLogo(tone).then((s) => {
      if (active) setSrc(s);
    });
    return () => {
      active = false;
    };
  }, [tone]);
  return src;
}

export function Logo({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const custom = useCustomLogo(tone);
  const main = tone === "light" ? "text-paper-50" : "text-ink-900";
  const sub = tone === "light" ? "text-mist-300" : "text-mist-500";

  if (custom) {
    return (
      <img
        src={custom}
        alt="TECH OF THE WORLD"
        className={`select-none ${compact ? "h-9" : "h-10"} w-auto object-contain`}
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <LogoMark tone={tone} className={compact ? "w-9 h-9" : "w-10 h-10"} />
      {!compact && (
        <span className="leading-none">
          <span className={`font-display block text-[15px] font-bold tracking-wide ${main}`}>
            TECH <span className="text-amber-500">OF</span> THE WORLD
          </span>
          <span className={`block text-[9.5px] tracking-[0.32em] uppercase mt-1 ${sub}`}>Technology Solutions</span>
        </span>
      )}
    </span>
  );
}

/* ================= in-view hook + Reveal ================= */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  line = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  line?: boolean;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "li" | "article";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.Ref<any>}
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
      className={`${line ? "rv-line" : "rv"} ${inView ? "rv-in" : ""} ${className}`}
    >
      {line ? <span>{children}</span> : children}
    </Tag>
  );
}

/* ================= scramble-decode text ================= */
const GLYPHS = "▚▞#/<>+=*%$&@YA01";
export function Scramble({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { isAr } = useLang();
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);
  const [out, setOut] = useState(reduced || isAr ? text : "");

  useEffect(() => {
    if (reduced || isAr) {
      setOut(text);
      return;
    }
    if (!inView) return;
    let frame = 0;
    let raf = 0;
    const total = Math.max(26, text.length * 2);
    const start = performance.now() + delay;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const progress = frame / total;
      const settled = Math.floor(progress * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") { s += " "; continue; }
        s += i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (settled < text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, inView, reduced, isAr, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out || "\u00A0"}</span>
    </span>
  );
}

/* ================= marquee ================= */
export function Marquee({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} dir="ltr">
      <div className="marquee-track flex w-max items-center gap-0">
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* ================= count-up on scroll ================= */
export function CountUp({ value, className = "", duration = 1300 }: { value: string; className?: string; duration?: number }) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [txt, setTxt] = useState(value);

  useEffect(() => {
    const target = parseInt(value, 10);
    if (reduced || isNaN(target)) {
      setTxt(value);
      return;
    }
    if (!inView) return;
    const padLen = value.length;
    let raf = 0;
    const t0 = performance.now();
    setTxt("0".repeat(padLen));
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setTxt(String(Math.round(target * eased)).padStart(padLen, "0"));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced, duration]);

  return (
    <span ref={ref} className={className}>
      {txt}
    </span>
  );
}

/* ================= image with soft reveal ================= */
export function SmartImg({ className = "", ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      {...rest}
      loading={rest.loading ?? "lazy"}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

/* ================= brand mark (custom logo aware) ================= */
export function BrandMark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const custom = useCustomLogo(tone);
  if (custom) {
    return <img src={custom} alt="TECH OF THE WORLD" className={`block h-16 w-auto object-contain ${className}`} />;
  }
  return <LogoMark tone={tone} className={`w-14 h-14 ${className}`} />;
}

/* ================= buttons ================= */
export function Btn({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  type,
  disabled,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outlineLight" | "dark";
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base = `group inline-flex items-center gap-3 chamfer-sm px-6 py-3.5 font-display text-[13.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97] ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;
  const styles = {
    primary: "bg-amber-500 text-ink-950 hover:bg-amber-400 hover:shadow-[0_10px_35px_-10px_rgba(233,163,59,0.55)]",
    outline: "border border-mist-500/50 text-paper-50 hover:border-amber-500 hover:text-amber-400",
    outlineLight: "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-50",
    dark: "bg-ink-900 text-paper-50 hover:bg-ink-700",
  }[variant];
  const arrowEl = arrow ? (
    <Icon name="arrow" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" strokeWidth={2} />
  ) : null;
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}{arrowEl}</Link>;
  if (href) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={onClick}>{children}{arrowEl}</a>;
  return <button type={type ?? "button"} disabled={disabled} className={cls} onClick={onClick}>{children}{arrowEl}</button>;
}

/* ================= section heading ================= */
export function SectionHeading({
  kicker,
  title,
  lead,
  tone: _tone,
  className = "",
}: {
  kicker: string;
  title: B;
  lead?: B;
  /** Deprecated — colors now adapt automatically to the section surface. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const { L } = useLang();
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal className="flex items-center gap-3 mb-5">
        <span className="h-px w-10 bg-amber-500" />
        {/* kicker auto-adapts: bright amber on dark surfaces, dark amber on light */}
        <span className="text-kicker font-mono text-[11px] uppercase tracking-[0.3em]">{kicker}</span>
      </Reveal>
      <Reveal line as="h2" delay={80}>
        {/* title inherits its color from the section wrapper:
            white on dark sections, black on light ones — can never mismatch */}
        <span className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.08]">{L(title)}</span>
      </Reveal>
      {lead && (
        /* mist re-tints itself per surface via CSS variables (dark text on light, bright on dark) */
        <Reveal as="p" delay={160} className="mt-5 text-[16.5px] leading-relaxed text-mist-500">
          {L(lead)}
        </Reveal>
      )}
    </div>
  );
}

/* ================= page hero for sub-pages ================= */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  image,
}: {
  kicker: string;
  title: B;
  lead: B;
  children?: React.ReactNode;
  image?: string;
}) {
  const { L } = useLang();
  return (
    <header className="relative overflow-hidden bg-ink-950 text-paper-50 noise">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="absolute -top-40 start-[-10%] w-[560px] h-[560px] rounded-full bg-amber-500/[0.06] blur-[120px]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-16 lg:pt-44 lg:pb-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-amber-500" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">{kicker}</span>
          </Reveal>
          <Reveal line as="h1" delay={80}>
            <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">{L(title)}</span>
          </Reveal>
          <Reveal as="p" delay={180} className="mt-6 max-w-xl text-[17px] leading-relaxed text-mist-300">
            {L(lead)}
          </Reveal>
          {children && <Reveal delay={260} className="mt-9 flex flex-wrap gap-4">{children}</Reveal>}
        </div>
        {image && (
          <Reveal delay={200} className="relative hidden lg:block">
            <div className="chamfer relative overflow-hidden border border-ink-700">
              <img src={image} alt="" className="duo-img w-full h-[400px] object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" aria-hidden="true" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.25em] text-mist-300">
                <span>YA // FIELD OPS</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 led" />LIVE</span>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}

/* ================= FAQ accordion ================= */
export function FaqList({ faqs }: { faqs: { q: B; a: B }[] }) {
  const { L } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
      {faqs.map((f, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between gap-6 py-5 text-start cursor-pointer group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-display font-semibold text-[16.5px] text-ink-900 group-hover:text-amber-600 transition-colors">{L(f.q)}</span>
            <span className={`shrink-0 w-8 h-8 grid place-items-center border border-ink-900/20 transition-all duration-300 ${open === i ? "bg-ink-900 text-amber-400 rotate-180" : "text-ink-900"}`}>
              <Icon name="chevron" className="w-4 h-4" />
            </span>
          </button>
          <div className={`grid transition-all duration-400 ease-out ${open === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="text-mist-500 leading-relaxed max-w-2xl">{L(f.a)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
