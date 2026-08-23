import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../i18n";

/* ================= living network canvas ================= */
type Node = { x: number; y: number; vx: number; vy: number };

export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (reduced) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const count = () => Math.min(64, Math.floor((w * h) / 24000));

    const seed = () => {
      nodes.length = 0;
      const n = count();
      for (let i = 0; i < n; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 });
      }
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      const R = 130;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            ctx.strokeStyle = `rgba(108,199,180,${(1 - d / R) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dx = a.x - mouse.x;
        const dy = a.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 170) {
          ctx.strokeStyle = `rgba(233,163,59,${(1 - d / 170) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(143,217,201,0.5)";
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(step);
    };

    resize();
    seed();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ================= custom cursor (fine pointers only) ================= */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let hot = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement;
      hot = !!el.closest("a,button,[role='button'],input,textarea,select,label");
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${hot ? 1.7 : 1})`;
      ring.style.borderColor = hot ? "var(--color-amber-500)" : "rgba(233,163,59,0.35)";
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[90] w-8 h-8 rounded-full border pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ borderColor: "rgba(233,163,59,0.35)" }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[91] w-1.5 h-1.5 rounded-full bg-amber-500 pointer-events-none opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
    </>
  );
}
