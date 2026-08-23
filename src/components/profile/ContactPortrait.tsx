import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n";
import { IMAGES } from "../../config";

/* ================= contact image resolver (single source of truth) =================
 * The Contact-page portrait lives in its OWN folder so it stays completely
 * independent from the Home hero image. Replace it WITHOUT touching any code:
 *
 *   public/images/contact/contact-profile.webp  (preferred — the stable name)
 *   public/images/contact/contact-profile.jpg
 *   public/images/contact/contact-profile.png
 *
 * If none exist yet, a generated default from IMAGES.contactProfile is used.
 * The Home image (public/images/profile/) is never read here.
 */
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const CONTACT_CANDIDATES = [
  `${base}/images/contact/contact-profile.webp`,
  `${base}/images/contact/contact-profile.jpg`,
  `${base}/images/contact/contact-profile.png`,
];

let contactCache: Promise<string> | null = null;

function resolveContactImage(): Promise<string> {
  if (!contactCache) {
    contactCache = new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (i >= CONTACT_CANDIDATES.length) return resolve(IMAGES.contactProfile);
        const img = new Image();
        img.onload = () => resolve(CONTACT_CANDIDATES[i]);
        img.onerror = () => {
          i++;
          next();
        };
        img.src = CONTACT_CANDIDATES[i];
      };
      next();
    });
  }
  return contactCache;
}

/* ================= the contact portrait =================
 * Renders ONLY the image (no frame, no card, no text) — the page composes the
 * fades, rim light and vignette around it.
 */
export function ContactPortrait({
  className = "",
  eager = false,
}: {
  className?: string;
  eager?: boolean;
}) {
  const { isAr } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    resolveContactImage().then((s) => {
      if (active) setSrc(s);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!src) {
    return <div className={`bg-ink-900 ${className}`} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={isAr ? "صورة شخصية للمهندس يوسف أحمد" : "Portrait of Yousef Ahmed"}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
