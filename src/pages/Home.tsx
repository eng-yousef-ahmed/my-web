import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { Btn, Reveal } from "../components/kit";
import { ProfilePortrait } from "../components/profile/ProfilePortrait";

/* ---------------- page ----------------
 * The Home page is a single full-screen cinematic introduction:
 * WHO I AM + WHAT I DO + MY PROFESSIONAL IDENTITY + MY PHOTO.
 * Projects live on /projects, services on /services, contact on /contact.
 */
export default function Home() {
  const { isAr } = useLang();
  usePageMeta(
    isAr ? "يوسف أحمد | أخصائي دعم تقني أول — TECH OF THE WORLD" : "Yousef Ahmed | Senior IT Support Specialist — TECH OF THE WORLD",
    isAr
      ? "أبني وأدير بيئات تقنية موثوقة تعتمد عليها الأعمال يوميًا. خبرة عملية في البنية التحتية والشبكات وMicrosoft وأنظمة المراقبة والدعم التقني في السعودية ومصر."
      : "I build and manage reliable IT environments that businesses depend on every day. Practical experience across infrastructure, networks, Microsoft environments, security systems and technical support in Saudi Arabia and Egypt."
  );

  return (
    <>
      {/* ============ 01 — HERO : full-width cinematic introduction ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
        {/* ambient background: fine grid + a restrained warm glow behind the portrait */}
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 32% 46%, rgba(233,163,59,0.08), transparent 70%)" }}
          aria-hidden="true"
        />
        {/* faint technical arcs hugging the portrait side */}
        <svg
          className="absolute top-1/2 -translate-y-1/2 left-[-14%] w-[52vw] max-w-[760px] opacity-[0.5] pointer-events-none hidden sm:block"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="238" stroke="#1f344c" strokeWidth="1" />
          <circle cx="300" cy="300" r="292" stroke="#16283c" strokeWidth="1" strokeDasharray="2 8" />
          <path d="M300 8 A292 292 0 0 1 566 176" stroke="#e9a33b" strokeOpacity="0.35" strokeWidth="1.2" />
          <circle cx="566" cy="176" r="3" fill="#e9a33b" fillOpacity="0.8" />
        </svg>

        {/* ---------- the portrait: a large hero visual flowing from the left edge ---------- */}
        {/* Mobile: in-flow block above the text · Desktop: absolute layer, physically LEFT in both LTR & RTL */}
        <div className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:w-[56%] xl:w-[58%]">
          <Reveal delay={120} className="relative h-[54svh] sm:h-[58svh] lg:h-full overflow-hidden">
            <ProfilePortrait eager className="h-full w-full object-cover object-[50%_12%]" />
            {/* cinematic fades — the image dissolves into the hero, no frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" aria-hidden="true" />
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-ink-950" aria-hidden="true" />
            <div className="absolute inset-0 bg-ink-950/15" aria-hidden="true" />
            {/* very subtle corner accents */}
            <span className="absolute top-5 left-5 w-7 h-7 border-t border-l border-amber-500/40 hidden lg:block" aria-hidden="true" />
            <span className="absolute bottom-5 right-5 w-7 h-7 border-b border-r border-amber-500/40 hidden lg:block" aria-hidden="true" />
          </Reveal>
        </div>

        {/* ---------- introduction: vertically centered, pushed to the RIGHT ---------- */}
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[calc(100svh-54svh)] lg:min-h-svh flex flex-col justify-center lg:pt-24 lg:pb-16">
          <div className="pt-10 pb-16 lg:pt-0 lg:pb-0 lg:ml-auto lg:w-[46%] xl:w-[42%] lg:max-w-[620px]">
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-500">TECH OF THE WORLD</span>
            </Reveal>

            <Reveal line as="h1" delay={90} className="mt-6">
              <span className="block font-display font-bold tracking-tight leading-[1.05] text-[clamp(3rem,6vw,6rem)]">
                {isAr ? "يوسف أحمد" : "Yousef Ahmed"}
              </span>
            </Reveal>

            <Reveal delay={200} className="mt-4">
              <p className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.26em] text-amber-400/90">
                {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
              </p>
            </Reveal>

            <Reveal delay={280} className="mt-8">
              <p className="text-xl sm:text-[22px] lg:text-2xl font-semibold leading-[1.5] text-paper-50/95 max-w-xl">
                {isAr ? (
                  <>
                    أبني وأدير بيئات تقنية موثوقة
                    <br />
                    تعتمد عليها الأعمال يوميًا.
                  </>
                ) : (
                  <>
                    I build and manage reliable IT environments
                    <br />
                    that businesses depend on every day.
                  </>
                )}
              </p>
            </Reveal>

            <Reveal as="p" delay={360} className="mt-5 max-w-lg text-[14.5px] sm:text-[15px] leading-relaxed text-mist-300">
              {isAr
                ? "خبرة عملية في البنية التحتية، الشبكات، Microsoft، أنظمة المراقبة والدعم التقني في السعودية ومصر."
                : "Practical experience across infrastructure, networks, Microsoft environments, security systems, and technical support in Saudi Arabia and Egypt."}
            </Reveal>

            <Reveal delay={440} className="mt-10 flex flex-wrap items-center gap-4">
              <Btn to="/projects">{isAr ? "استعرض مشاريعي" : "Explore Projects"}</Btn>
              <Btn to="/about" variant="outline">{isAr ? "عني" : "About Me"}</Btn>
            </Reveal>
          </div>
        </div>

      </section>
    </>
  );
}
