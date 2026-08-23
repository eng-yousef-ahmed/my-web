import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { CONTACT, CV_FILES, mailLink, waLink } from "../config";
import { FlagEG, FlagSA, Icon, Reveal } from "../components/kit";
import { ContactPortrait } from "../components/profile/ContactPortrait";

/* ================= social orbit =================
 * One circular hub holding every channel exactly once:
 * WhatsApp (KSA) · WhatsApp (EG) · Email · LinkedIn — around a YA core.
 */
type OrbitItem = {
  key: string;
  icon: string;
  label: { en: string; ar: string };
  href: string;
  external?: boolean;
  flag?: React.ReactNode;
  hover: string; // hover accent classes
};

function SocialOrbit({ compact = false }: { compact?: boolean }) {
  const { L } = useLang();
  const size = compact ? "w-60 h-60 sm:w-64 sm:h-64" : "w-64 h-64 sm:w-72 sm:h-72";

  const items: OrbitItem[] = [
    {
      key: "wa-sa",
      icon: "wa",
      label: { en: "WhatsApp · Saudi Arabia", ar: "واتساب · السعودية" },
      href: waLink(L({ en: "Hello Yousef, I'd like to get in touch.", ar: "مرحبًا يوسف، أود التواصل معك." }), "sa"),
      external: true,
      flag: <FlagSA className="w-4 h-4" />,
      hover: "hover:border-[#2fbf67] hover:text-[#5fd68f] hover:bg-[#23a55b]/10",
    },
    {
      key: "wa-eg",
      icon: "wa",
      label: { en: "WhatsApp · Egypt", ar: "واتساب · مصر" },
      href: waLink(L({ en: "Hello Yousef, I'd like to get in touch.", ar: "مرحبًا يوسف، أود التواصل معك." }), "eg"),
      external: true,
      flag: <FlagEG className="w-4 h-4" />,
      hover: "hover:border-[#2fbf67] hover:text-[#5fd68f] hover:bg-[#23a55b]/10",
    },
    {
      key: "email",
      icon: "mail",
      label: { en: "Email", ar: "البريد الإلكتروني" },
      href: mailLink(L({ en: "Hello Yousef", ar: "مرحبًا يوسف" }), "") ?? "#",
      hover: "hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10",
    },
    {
      key: "linkedin",
      icon: "linkedin",
      label: { en: "LinkedIn", ar: "لينكدإن" },
      href: CONTACT.linkedin,
      external: true,
      hover: "hover:border-[#0a66c2] hover:text-[#5ea8e8] hover:bg-[#0a66c2]/10",
    },
  ];

  /* fixed compass slots so icons never depend on rotation */
  const slots = [
    "left-1/2 top-0 -translate-x-1/2",
    "right-0 top-1/2 -translate-y-1/2",
    "left-1/2 bottom-0 -translate-x-1/2",
    "left-0 top-1/2 -translate-y-1/2",
  ];

  return (
    <div className={`relative ${size}`} role="list" aria-label="Contact channels">
      {/* rotating guide rings */}
      <div className="absolute inset-[26px] rounded-full border border-dashed border-ink-600/70 orbit-ring" aria-hidden="true" />
      <div className="absolute inset-[54px] rounded-full border border-ink-700 orbit-ring orbit-ring-rev" aria-hidden="true" />
      {/* faint amber halo */}
      <div className="absolute inset-[70px] rounded-full bg-amber-500/[0.05]" aria-hidden="true" />

      {/* YA core */}
      <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-ink-900 border border-ink-600 grid place-items-center shadow-[0_0_50px_-12px_rgba(233,163,59,0.35)]">
        <span className="font-display text-2xl font-bold text-paper-50 tracking-tight">YA</span>
        <span className="absolute -bottom-0.5 w-2 h-2 rounded-full bg-amber-500 led" aria-hidden="true" />
      </div>

      {/* channel satellites */}
      {items.map((it, i) => (
        <a
          key={it.key}
          role="listitem"
          href={it.href}
          target={it.external ? "_blank" : undefined}
          rel={it.external ? "noopener noreferrer" : undefined}
          title={L(it.label)}
          aria-label={L(it.label)}
          className={`group absolute ${slots[i]} w-14 h-14 rounded-full bg-ink-900 border border-ink-600 grid place-items-center text-mist-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${it.hover}`}
        >
          <Icon name={it.icon} className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          {it.flag && (
            <span className="absolute -bottom-0.5 -end-0.5 rounded-full ring-2 ring-ink-950 overflow-hidden leading-none">
              {it.flag}
            </span>
          )}
          {/* hover tag */}
          <span className="pointer-events-none absolute top-full mt-2.5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.16em] text-mist-400 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {L(it.label)}
          </span>
        </a>
      ))}
    </div>
  );
}

/* ================= page =================
 * One screen: a full-height portrait on the LEFT (physically, in both
 * LTR & RTL) and the identity block in front of it — name, title,
 * markets, CV downloads and the social orbit. Nothing repeated.
 */
export function Contact() {
  const { isAr } = useLang();
  usePageMeta(
    isAr ? "تواصل معي | يوسف أحمد — TECH OF THE WORLD" : "Contact | Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "تواصل مع يوسف أحمد، أخصائي دعم تقني أول في السعودية ومصر — واتساب، بريد إلكتروني ولينكدإن."
      : "Reach Yousef Ahmed, Senior IT Support Specialist in Saudi Arabia & Egypt — WhatsApp, email and LinkedIn."
  );

  return (
    <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ambient layers on the content side */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 68% 48%, rgba(233,163,59,0.07), transparent 70%)" }}
        aria-hidden="true"
      />
      {/* echo arcs behind the orbit */}
      <svg
        className="absolute top-1/2 -translate-y-1/2 end-[-8%] w-[34rem] max-w-none opacity-[0.45] pointer-events-none hidden lg:block"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="300" cy="300" r="236" stroke="#16283c" strokeWidth="1" />
        <circle cx="300" cy="300" r="288" stroke="#1f344c" strokeWidth="1" strokeDasharray="2 9" />
        <path d="M300 12 A288 288 0 0 1 562 168" stroke="#e9a33b" strokeOpacity="0.3" strokeWidth="1.2" />
        <circle cx="562" cy="168" r="3" fill="#e9a33b" fillOpacity="0.8" />
      </svg>

      {/* ---------- the portrait: full-height, LEFT edge, blending into the page ---------- */}
      {/* Mobile: in-flow block on top · Desktop: absolute layer pinned to the left */}
      <div className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:w-[46%] xl:w-[48%]">
        <Reveal delay={100} className="relative h-[52svh] sm:h-[56svh] lg:h-full overflow-hidden">
          <ContactPortrait eager className="h-full w-full object-cover object-[50%_12%]" />
          {/* cinematic integration — no frame, the image melts into the navy */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/55" aria-hidden="true" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-ink-950" aria-hidden="true" />
          <div className="absolute inset-0 bg-ink-950/10" aria-hidden="true" />
          {/* tiny signature at the bottom edge */}
          <p className="absolute bottom-5 left-6 font-mono text-[9.5px] uppercase tracking-[0.32em] text-mist-400/80 hidden sm:block">
            TECH <span className="text-amber-500">OF</span> THE WORLD — YA
          </p>
        </Reveal>
      </div>

      {/* ---------- identity block, in front, vertically centered ---------- */}
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[calc(100svh-52svh)] sm:min-h-[calc(100svh-56svh)] lg:min-h-svh flex flex-col justify-center lg:pt-28 lg:pb-14">
        <div className="py-12 lg:py-0 lg:ms-auto lg:w-[54%] xl:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-start">
          <Reveal className="flex items-center gap-3.5">
            <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-500">
              {isAr ? "تواصل معي" : "Contact"}
            </span>
          </Reveal>

          <Reveal line as="h1" delay={90} className="mt-6">
            <span className="block font-display font-bold tracking-tight leading-[1.06] text-[clamp(2.6rem,5vw,4.25rem)]">
              {isAr ? "يوسف أحمد" : "Yousef Ahmed"}
            </span>
          </Reveal>

          <Reveal delay={190} className="mt-4">
            <p className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.26em] text-amber-400/90">
              {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
            </p>
          </Reveal>

          {/* markets */}
          <Reveal delay={260} className="mt-7 flex items-center gap-3">
            <span className="inline-flex items-center gap-2.5 border border-ink-600 bg-ink-900/70 px-4 py-2 text-[13px] font-medium text-mist-200">
              <FlagSA className="w-5 h-5" /> {isAr ? "السعودية" : "Saudi Arabia"}
            </span>
            <span className="inline-flex items-center gap-2.5 border border-ink-600 bg-ink-900/70 px-4 py-2 text-[13px] font-medium text-mist-200">
              <FlagEG className="w-5 h-5" /> {isAr ? "مصر" : "Egypt"}
            </span>
          </Reveal>

          {/* CV downloads */}
          <Reveal delay={330} className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href={CV_FILES.ar}
              download
              className="group inline-flex items-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] hover:bg-amber-400 transition-colors active:scale-[0.97]"
            >
              <Icon name="doc" className="w-4.5 h-4.5" />
              {isAr ? "السيرة الذاتية · عربي" : "CV · Arabic"}
              <Icon name="arrow" className="w-4 h-4 rotate-90 rtl:-scale-x-100 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
            </a>
            <a
              href={CV_FILES.en}
              download
              className="group inline-flex items-center gap-3 chamfer-sm border border-mist-500/50 text-paper-50 px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] hover:border-amber-500 hover:text-amber-400 transition-colors active:scale-[0.97]"
            >
              <Icon name="doc" className="w-4.5 h-4.5" />
              {isAr ? "السيرة الذاتية · إنجليزي" : "CV · English"}
              <Icon name="arrow" className="w-4 h-4 rotate-90 rtl:-scale-x-100 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
            </a>
          </Reveal>

          {/* social orbit */}
          <Reveal delay={420} className="mt-14 lg:mt-16">
            <SocialOrbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
