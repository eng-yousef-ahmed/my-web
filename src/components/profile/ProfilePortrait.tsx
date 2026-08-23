import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { IMAGES } from "../../config";

/* ================= profile image resolver (single source of truth) =================
 * The portrait is loaded from the public folder so it can be replaced
 * WITHOUT touching any code — drop a new file with the same name:
 *
 *   public/images/profile/profile.webp   (preferred, checked first)
 *   public/images/profile/profile.jpg    (default)
 *   public/images/profile/profile.png    (also supported)
 *
 * If none exist yet, a generated default from IMAGES.profileDefault is used.
 */
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const PROFILE_CANDIDATES = [
  `${base}/images/profile/profile.webp`,
  `${base}/images/profile/profile.jpg`,
  `${base}/images/profile/profile.png`,
];

let profileCache: Promise<string> | null = null;

function resolveProfileImage(): Promise<string> {
  if (!profileCache) {
    profileCache = new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (i >= PROFILE_CANDIDATES.length) return resolve(IMAGES.profile);
        const img = new Image();
        img.onload = () => resolve(PROFILE_CANDIDATES[i]);
        img.onerror = () => {
          i++;
          next();
        };
        img.src = PROFILE_CANDIDATES[i];
      };
      next();
    });
  }
  return profileCache;
}

/* ================= the portrait =================
 * Renders ONLY the image (no frame, no card, no text) — the surrounding
 * composition (fades, overlays, brackets) is built by the page that uses it.
 */
export function ProfilePortrait({
  className = "",
  eager = false,
}: {
  className?: string;
  /** load immediately (above-the-fold hero usage) */
  eager?: boolean;
}) {
  const { isAr } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    resolveProfileImage().then((s) => {
      if (active) setSrc(s);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!src) {
    /* layout-stable placeholder while the path is probed */
    return <div className={`bg-ink-900 ${className}`} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={isAr ? "صورة يوسف أحمد، أخصائي دعم تقني أول" : "Portrait of Yousef Ahmed, Senior IT Support Specialist"}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
