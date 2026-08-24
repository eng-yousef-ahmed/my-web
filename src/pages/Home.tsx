import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { HOME_ASSETS, IMAGES } from "../config";
import { Btn, Icon, Reveal, useAsset } from "../components/kit";

/* ================= HOME — the portrait IS the page =================
 * The profile image becomes the full-page cinematic background; the
 * introduction sits over it, opposite the subject. The image stays
 * replaceable from public/images/profile/ with zero code edits.
 */
export default function Home() {
  const { isAr } = useLang();
  usePageMeta(
    isAr
      ? "يوسف أحمد — أخصائي دعم تقني أول | TECH OF THE WORLD"
      : "Yousef Ahmed — Senior IT Support Specialist | TECH OF THE WORLD",
    isAr
      ? "أبني وأدير بيئات تقنية موثوقة تعتمد عليها الأعمال يوميًا. خبرة عملية في البنية التحتية والشبكات ومايكروسوفت وأنظمة الأمن في السعودية ومصر."
      : "I build and manage reliable IT environments that businesses depend on every day. Hands-on experience across infrastructure, networks, Microsoft and security systems in Saudi Arabia & Egypt."
  );

  const src = useAsset(HOME_ASSETS.profile, IMAGES.profile);

  return (
    <section className="relative min-h-svh bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ---------- the portrait as full-page background ---------- */}
      {/* mobile: subject centered in the upper area */}
      <img
        src={src}
        alt={isAr ? "يوسف أحمد، أخصائي دعم تقني أول" : "Yousef Ahmed, Senior IT Support Specialist"}
        className="kenburns absolute inset-0 w-full h-full object-cover lg:hidden"
        style={{ objectPosition: "50% 10%" }}
      />
      {/* desktop: subject placed opposite the text side (physical in both LTR & RTL) */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="kenburns absolute inset-0 w-full h-full object-cover hidden lg:block"
        style={{ objectPosition: isAr ? "26% 12%" : "74% 12%" }}
      />

      {/* readability scrims — dark where the text lives, soft elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/72 to-ink-950/[0.06] rtl:bg-gradient-to-l" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-950/90 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(6,13,22,0.5) 100%)" }}
        aria-hidden="true"
      />

      {/* ambient layers */}
      <div className="absolute inset-0 grid-bg opacity-[0.13]" aria-hidden="true" />
      <div
        className="absolute inset-y-0 start-[-8%] w-[58%] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 32% 46%, rgba(233,163,59,0.08), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* quiet corner ticks */}
      <span className="absolute top-24 start-6 w-7 h-7 border-t border-s border-amber-500/40 hidden md:block" aria-hidden="true" />
      <span className="absolute bottom-24 end-6 w-7 h-7 border-b border-e border-amber-500/40 hidden md:block" aria-hidden="true" />

      {/* vertical edge label */}
      <p
        className="absolute end-7 top-1/2 -translate-y-1/2 hidden xl:block font-mono text-[9.5px] uppercase tracking-[0.42em] text-mist-400/70"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        {isAr ? "بطاقة تعريف مهنية" : "Professional Identity"} · YA
      </p>

      {/* ---------- introduction, aligned to the start side ---------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-svh flex flex-col justify-center pt-28 pb-24">
        <div className="max-w-2xl">
          <Reveal className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-amber-400">TECH OF THE WORLD</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-ink-950/55 backdrop-blur-sm px-3.5 py-1.5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#3fbf6f] pulse-ring" aria-hidden="true" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3fbf6f]" aria-hidden="true" />
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mist-200">
                {isAr ? "متاح للتواصل" : "Available"}
              </span>
            </span>
          </Reveal>

          <Reveal line as="h1" delay={100} className="mt-7">
            <span className="block font-display font-bold tracking-tight leading-[1.05] text-[clamp(3rem,7vw,5.75rem)] drop-shadow-[0_4px_30px_rgba(6,13,22,0.9)]">
              {isAr ? (
                <>
                  يوسف <span className="text-amber-400">أحمد</span>
                </>
              ) : (
                <>
                  Yousef <span className="text-amber-400">Ahmed</span>
                </>
              )}
            </span>
          </Reveal>

          <Reveal delay={200} className="mt-4">
            <p className="font-mono text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.26em] text-mist-200">
              {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-8">
            <p className="text-xl sm:text-[22px] font-semibold leading-[1.55] text-paper-50/95 max-w-xl drop-shadow-[0_2px_16px_rgba(6,13,22,0.8)]">
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
            <Btn to="/about" variant="outline">
              {isAr ? "عني" : "About Me"}
            </Btn>
          </Reveal>
        </div>
      </div>

      {/* quiet baseline strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden sm:block" aria-hidden="true">
        <div className="max-w-[1400px] mx-auto px-8 pb-6 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.3em] text-mist-500">
          <span>{isAr ? "جدة · السعودية" : "Jeddah · Saudi Arabia"}</span>
          <span className="flex items-center gap-2">
            <Icon name="globe" className="w-3.5 h-3.5 text-amber-500/70" />
            {isAr ? "السعودية · مصر" : "SA · EG"}
          </span>
          <span>{isAr ? "عن بُعد + ميداني" : "Remote + On-site"}</span>
        </div>
      </div>
    </section>
  );
}
