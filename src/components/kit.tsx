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
  linkedin: (
    <path
      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.36h4.56V23H.22V8.36zM8.34 8.36h4.37v2h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.01h-4.55v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.34V8.36z"
      fill="currentColor"
      stroke="none"
      transform="translate(1.2 0) scale(0.92)"
    />
  ),
};

export function Icon({ name, className = "w-5 h-5", strokeWidth = 1.7 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name] ?? PATHS.box}
    </svg>
  );
}

/* ================= flags (official designs, inline SVG) ================= */
/** Saudi Arabia — official green field, the actual shahada in Arabic script,
 *  and the white sword (blade toward the hoist). Uses the site's loaded Arabic fonts. */
export function FlagSA({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="img" aria-label="Saudi Arabia">
      <rect width="300" height="200" fill="#165d31" />
      <text
        x="150"
        y="96"
        textAnchor="middle"
        direction="rtl"
        fontFamily="'Almarai','IBM Plex Sans Arabic',sans-serif"
        fontWeight="800"
        fontSize="44"
        fill="#ffffff"
        textLength="252"
        lengthAdjust="spacingAndGlyphs"
      >
        لا إله إلا الله محمد رسول الله
      </text>
      {/* sword — blade toward the hoist (left), hilt to the right */}
      <g fill="#ffffff">
        <path d="M34 148 h206 a10 10 0 0 1 0 10 H34 a5 5 0 0 1 0 -10 Z" />
        <rect x="240" y="142" width="7" height="22" rx="3.5" />
        <rect x="249" y="148.5" width="30" height="9" rx="4.5" />
        <circle cx="284" cy="153" r="6.5" />
      </g>
    </svg>
  );
}

/** Egypt — official red / white / black bands with the golden Eagle of Saladin. */
export function FlagEG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} role="img" aria-label="Egypt">
      <rect width="300" height="67" fill="#ce1126" />
      <rect y="67" width="300" height="66" fill="#f7f3ec" />
      <rect y="133" width="300" height="67" fill="#141414" />
      {/* Eagle of Saladin */}
      <g fill="#c09300">
        {/* head + beak (facing the hoist) */}
        <circle cx="136" cy="84" r="7.5" />
        <path d="M130 81.5 l-9 3 9 3.5 Z" />
        {/* neck + body */}
        <path d="M139 90 c4 5 6 9 7 14 l-4 22 h-6 l-5 -26 c-1 -5 2 -8 8 -10 Z" />
        {/* wings with feather steps */}
        <path d="M134 97 C114 88 96 90 84 100 c4 2 9 3 13 5 c-6 1 -10 3 -13 6 c13 6 27 6 38 -1 Z" />
        <path d="M146 97 c20 -9 38 -7 50 3 c-4 2 -9 3 -13 5 c6 1 10 3 13 6 c-13 6 -27 6 -38 -1 Z" />
        {/* tail fan */}
        <path d="M132 130 l-6 16 h8 l4 -12 4 12 h8 l-6 -16 Z" />
        {/* breast shield */}
        <ellipse cx="138" cy="112" rx="6" ry="9" fill="#e8c766" stroke="#8a6420" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ================= YA logo ================= */
export function LogoMark({ tone = "light", className = "w-10 h-10" }: { tone?: "light" | "dark"; className?: string }) {
  const custom = useCustomLogo(tone);
  if (custom) {
    return <img src={custom} alt="TECH OF THE WORLD" className={`${className} object-contain select-none`} />;
  }
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

/* ---------- first-available asset resolver ----------
 * Probes a list of public paths in order and resolves the first file that
 * actually exists, falling back to a provided default. Lets any page bind
 * to a replaceable asset folder with zero code edits later.
 */
const assetCache = new Map<string, Promise<string>>();

export function useAsset(candidates: string[], fallback: string): string {
  const key = candidates.join("|");
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!assetCache.has(key)) {
      assetCache.set(
        key,
        new Promise((resolve) => {
          let i = 0;
          const next = () => {
            if (i >= candidates.length) return resolve(fallback);
            const img = new Image();
            img.onload = () => resolve(candidates[i]);
            img.onerror = () => {
              i++;
              next();
            };
            img.src = candidates[i];
          };
          next();
        })
      );
    }
    let active = true;
    assetCache.get(key)!.then((s) => {
      if (active) setSrc(s);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, fallback]);

  return src;
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
              "[TECH OF THE WORLD] عندك لوجو جاهز؟ حطه في public/logo-light.svg (للأقسام الداكنة) و public/logo-dark.svg (للفاتحة)، أو public/logo.svg لنسختين. هيظهر تلقائيًا بدون أي تعديل في الكود."
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

/** Shared logo-source hook — every consumer (header, brand mark, business card)
 *  resolves the logo from the SAME files under /public (logo-light|dark|logo .svg/.png). */
export function useCustomLogo(tone: "light" | "dark"): string | null {
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
    primary: "bg-amber-500 text-ink-950 hover:bg-amber-400",
    outline: "border border-mist-500/50 text-paper-50 hover:border-amber-500 hover:text-amber-400",
    outlineLight: "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-50",
    dark: "bg-ink-900 text-paper-50 hover:bg-ink-700",
  }[variant];
  const arrowEl = arrow ? (
    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
  ) : null;
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}{arrowEl}</Link>;
  if (href) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={onClick}>{children}{arrowEl}</a>;
  return <button type={type ?? "button"} disabled={disabled} className={cls} onClick={onClick}>{children}{arrowEl}</button>;
}

/* ================= page hero for sub-pages ================= */
export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: B;
  lead: B;
  children?: React.ReactNode;
}) {
  const { L } = useLang();
  return (
    <header className="relative overflow-hidden bg-ink-950 text-paper-50 noise">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Reveal className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-amber-500" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">{kicker}</span>
        </Reveal>
        <Reveal line as="h1" delay={80}>
          <span className="font-display text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.1] tracking-tight max-w-3xl block">{L(title)}</span>
        </Reveal>
        <Reveal as="p" delay={180} className="mt-6 max-w-2xl text-[16px] leading-relaxed text-mist-300">
          {L(lead)}
        </Reveal>
        {children && <Reveal delay={260} className="mt-8 flex flex-wrap gap-4">{children}</Reveal>}
      </div>
    </header>
  );
}


