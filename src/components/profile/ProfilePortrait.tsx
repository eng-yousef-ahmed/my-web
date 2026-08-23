import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { IMAGES } from "../../config";

/**
 * ProfilePortrait — the hero portrait, loaded dynamically.
 *
 * The image path lives ONLY here. Resolution order:
 *
 *   1. /images/profile/profile.webp   (preferred, if present)
 *   2. /images/profile/profile.jpg    (the default drop-in file)
 *   3. /images/profile/profile.png
 *   4. IMAGES.profile in src/config.ts (remote default until a local file exists)
 *
 * To change the portrait later: replace `public/images/profile/profile.jpg`
 * (same filename) and rebuild/deploy. NO code, config or component edits.
 */
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const LOCAL = {
  webp: `${base}/images/profile/profile.webp`,
  jpg: `${base}/images/profile/profile.jpg`,
  png: `${base}/images/profile/profile.png`,
};

let probeCache: Promise<string> | null = null;

const exists = (url: string) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

/** Resolves the best available portrait source (cached once per session). */
function resolvePortrait(): Promise<string> {
  if (!probeCache) {
    probeCache = (async () => {
      const [hasWebp, hasJpg, hasPng] = await Promise.all([
        exists(LOCAL.webp),
        exists(LOCAL.jpg),
        exists(LOCAL.png),
      ]);
      if (hasWebp) return LOCAL.webp;
      if (hasJpg) return LOCAL.jpg;
      if (hasPng) return LOCAL.png;
      return IMAGES.profile;
    })();
  }
  return probeCache;
}

export function ProfilePortrait({ className = "" }: { className?: string }) {
  const { isAr } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    let active = true;
    resolvePortrait().then((s) => {
      if (active) setSrc(s);
    });
    return () => {
      active = false;
    };
  }, []);

  const alt = isAr
    ? "صورة شخصية للمهندس يوسف أحمد، أخصائي دعم تقني أول"
    : "Portrait of Eng. Yousef Ahmed, Senior IT Support Specialist";

  return (
    <figure className={`relative m-0 ${className}`} aria-label={alt}>
      {/* viewfinder corner ticks — subtle amber, no thick frame */}
      <span className="pointer-events-none absolute -top-2.5 -start-2.5 h-7 w-7 border-t border-s border-amber-500/70" aria-hidden="true" />
      <span className="pointer-events-none absolute -top-2.5 -end-2.5 h-7 w-7 border-t border-e border-amber-500/70" aria-hidden="true" />
      <span className="pointer-events-none absolute -bottom-2.5 -start-2.5 h-7 w-7 border-b border-s border-amber-500/70" aria-hidden="true" />
      <span className="pointer-events-none absolute -bottom-2.5 -end-2.5 h-7 w-7 border-b border-e border-amber-500/70" aria-hidden="true" />

      <div className="relative aspect-[4/5] overflow-hidden border border-ink-700/70 bg-ink-900">
        {/* quiet technical backdrop while loading / on fallback */}
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

        {src && !broken ? (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setBroken(true)}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" role="img" aria-label={alt}>
            <div className="text-center px-6">
              <span className="font-display text-4xl font-bold text-mist-300">YA</span>
              <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.22em] leading-relaxed text-mist-500" dir="ltr">
                add public/images/profile/profile.jpg
              </span>
            </div>
          </div>
        )}

        {/* soft fade into the page background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/85 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-ink-950/45 to-transparent" aria-hidden="true" />
      </div>

      {/* slim amber baseline */}
      <span className="mt-4 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-10 bg-amber-500" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-mist-500">
          {isAr ? "جدة · الإسكندرية" : "Jeddah · Alexandria"}
        </span>
      </span>
    </figure>
  );
}
