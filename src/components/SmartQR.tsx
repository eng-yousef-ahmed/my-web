import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { CARD_ASSETS, CONTACT } from "../config";
import { useAsset } from "./kit";

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

/* Logo candidates for the QR core — white/light marks read best on the dark core */
const QR_LOGO_CANDIDATES = [
  `${base}/logo-light.svg`,
  `${base}/logo-light.png`,
  `${base}/assets/branding/logo.svg`,
  `${base}/assets/branding/logo.png`,
  `${base}/logo.svg`,
  `${base}/logo.png`,
];

/**
 * The contact QR code.
 *
 * Priority 1 — a file you drop in `public/images/contact/` (contact-qr.webp,
 *              .png, .svg or .jpg): it is shown exactly as-is, so the code can
 *              be swapped any time WITHOUT touching the source.
 * Priority 2 — an auto-generated scannable code that opens the digital
 *              business card page (`<website>/#/card`), with the brand logo
 *              melted into its centre (error-correction level H keeps it
 *              fully readable around the embedded logo).
 */
export function SmartQR({
  size = 320,
  className = "",
}: {
  /** rendered pixel square — the canvas itself is generated at 2× for sharpness */
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userQr = useAsset(CARD_ASSETS.qr, "");
  const logoSrc = useAsset(QR_LOGO_CANDIDATES, "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (userQr) return; // your own file wins — nothing to generate
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawLogo = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width;
      const cx = W / 2;
      const cy = W / 2;
      const r = W * 0.13; // solid core radius

      /* feathered dark core — the "melt" into the modules */
      const g = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.5);
      g.addColorStop(0, "rgba(10,20,32,1)");
      g.addColorStop(0.72, "rgba(10,20,32,0.97)");
      g.addColorStop(1, "rgba(10,20,32,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx.fill();

      /* thin amber hairline ring */
      ctx.strokeStyle = "rgba(233,163,59,0.85)";
      ctx.lineWidth = Math.max(2, W * 0.0045);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.04, 0, Math.PI * 2);
      ctx.stroke();

      if (logoSrc) {
        const img = new Image();
        img.onload = () => {
          const box = r * 1.5;
          const scale = Math.min(box / img.width, box / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
          setReady(true);
        };
        img.onerror = () => drawFallbackText(ctx, cx, cy, r);
        img.src = logoSrc;
      } else {
        drawFallbackText(ctx, cx, cy, r);
      }
    };

    const drawFallbackText = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.fillStyle = "#f3f6f5";
      ctx.font = `700 ${Math.round(r * 0.92)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("YA", cx, cy + r * 0.04);
      setReady(true);
    };

    let alive = true;
    QRCode.toCanvas(
      canvas,
      `${CONTACT.website.replace(/\/+$/, "")}/#/card`,
      {
        errorCorrectionLevel: "H",
        margin: 2,
        width: size * 2,
        color: { dark: "#0a1420", light: "#f3f6f5" },
      },
      (err) => {
        if (!err && alive) drawLogo();
      }
    );
    return () => {
      alive = false;
    };
  }, [userQr, logoSrc, size]);

  /* a dropped-in file always wins */
  if (userQr) {
    return (
      <img
        src={userQr}
        alt="QR — بطاقة التواصل الرقمية"
        width={size}
        height={size}
        className={`block w-full h-auto ${className}`}
        style={{ objectFit: "contain" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="QR code — scan to open the digital contact card"
      className={`block w-full h-auto ${className} transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
    />
  );
}
