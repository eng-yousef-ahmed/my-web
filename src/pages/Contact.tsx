import React from "react";
import { useLang, usePageMeta } from "../i18n";
import type { B } from "../i18n";
import {
  CARD_ASSETS,
  CONTACT,
  CV_FILES,
  IMAGES,
  cardProfilePosition,
  hasEmail,
  mailLink,
  qrFallbackUrl,
  waLink,
  websiteDisplay,
} from "../config";
import { FlagEG, FlagSA, Icon, LogoMark, Reveal, useAsset } from "../components/kit";

/* ================= contact channel row ================= */
type Channel = {
  key: string;
  icon: string;
  kind: B;
  value: string;
  href: string;
  external?: boolean;
  flag?: React.ReactNode;
};

function ChannelRow({ ch, index }: { ch: Channel; index: number }) {
  const { L } = useLang();
  return (
    <Reveal delay={420 + index * 70}>
      <a
        href={ch.href}
        target={ch.external ? "_blank" : undefined}
        rel={ch.external ? "noopener noreferrer" : undefined}
        aria-label={L(ch.kind)}
        className="group flex items-center gap-4 py-3.5 border-b border-paper-50/10 transition-all duration-200 ease-out hover:border-amber-500/50 hover:bg-paper-50/[0.045] hover:ps-2.5"
      >
        <span className="relative grid place-items-center w-9 h-9 shrink-0">
          <Icon name={ch.icon} className="w-[18px] h-[18px] text-mist-300 transition-colors duration-200 group-hover:text-amber-400" />
          {ch.flag && (
            <span className="absolute -bottom-0.5 -end-1 rounded-full ring-2 ring-ink-950/80 overflow-hidden leading-none">
              {ch.flag}
            </span>
          )}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.26em] text-mist-400">{L(ch.kind)}</span>
          <span className="block font-display text-[15px] font-semibold text-paper-50 truncate transition-colors duration-200 group-hover:text-amber-300" dir="ltr">
            {ch.value}
          </span>
        </span>
        <Icon
          name="arrow"
          strokeWidth={2}
          className="w-4 h-4 shrink-0 text-mist-500 opacity-0 -translate-x-1.5 rtl:translate-x-1.5 rtl:-scale-x-100 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-amber-400"
        />
      </a>
    </Reveal>
  );
}

/* ================= the page =================
 * One immersive composition: a full-bleed portrait, the brand logo above,
 * the professional identity below, and a scannable QR to the side.
 * Every visual asset (logo / photo / QR) is a replaceable public file —
 * see public/assets/{branding,profile,qr}/README.md.
 */
export function Contact() {
  const { isAr, L } = useLang();
  usePageMeta(
    isAr ? "تواصل معي | م. يوسف أحمد — TECH OF THE WORLD" : "Contact | Eng. Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "بطاقة التعريف الرقمية للمهندس يوسف أحمد، أخصائي دعم تقني أول في السعودية ومصر — واتساب، بريد إلكتروني، لينكدإن ورمز QR."
      : "Digital business card of Eng. Yousef Ahmed, Senior IT Support Specialist in Saudi Arabia & Egypt — WhatsApp, email, LinkedIn and a scannable QR."
  );

  const profileSrc = useAsset(CARD_ASSETS.profile, IMAGES.contactProfile);
  const qrSrc = useAsset(CARD_ASSETS.qr, qrFallbackUrl(CONTACT.website));
  const logoSrc = useAsset(CARD_ASSETS.logo, "");

  const waMsg = L({ en: "Hello Yousef, I'd like to get in touch.", ar: "مرحبًا يوسف، أود التواصل معك." });
  const channels: Channel[] = [
    {
      key: "wa-sa",
      icon: "wa",
      kind: { en: "WhatsApp · Saudi Arabia", ar: "واتساب · السعودية" },
      value: CONTACT.displaySA,
      href: waLink(waMsg, "sa"),
      external: true,
      flag: <FlagSA className="w-4 h-4" />,
    },
    {
      key: "wa-eg",
      icon: "wa",
      kind: { en: "WhatsApp · Egypt", ar: "واتساب · مصر" },
      value: CONTACT.displayEG,
      href: waLink(waMsg, "eg"),
      external: true,
      flag: <FlagEG className="w-4 h-4" />,
    },
    ...(hasEmail
      ? [
          {
            key: "email",
            icon: "mail",
            kind: { en: "Email", ar: "البريد الإلكتروني" },
            value: CONTACT.email,
            href: mailLink(L({ en: "Hello Yousef", ar: "مرحبًا يوسف" }), "") ?? "#",
          } as Channel,
        ]
      : []),
    {
      key: "linkedin",
      icon: "linkedin",
      kind: { en: "LinkedIn", ar: "لينكدإن" },
      value: `/${CONTACT.linkedinHandle}`,
      href: CONTACT.linkedin,
      external: true,
    },
    {
      key: "website",
      icon: "globe",
      kind: { en: "Website", ar: "الموقع" },
      value: websiteDisplay(),
      href: CONTACT.website,
      external: true,
    },
  ];

  return (
    <section className="relative min-h-svh bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ---------- the portrait: full-bleed, edge to edge, no frame ---------- */}
      <div className="absolute inset-0" aria-hidden="false">
        <img
          src={profileSrc}
          alt={isAr ? "صورة شخصية للمهندس يوسف أحمد" : "Portrait of Yousef Ahmed"}
          className="kenburns absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: cardProfilePosition }}
        />
      </div>
      {/* readability scrims — only where the text lives */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-transparent rtl:bg-gradient-to-l" aria-hidden="true" />

      {/* corner ticks + vertical label — quiet technical framing */}
      <span className="absolute top-24 start-6 w-7 h-7 border-t border-s border-amber-500/40 hidden md:block" aria-hidden="true" />
      <span className="absolute top-24 end-6 w-7 h-7 border-t border-e border-amber-500/40 hidden md:block" aria-hidden="true" />
      <span className="absolute bottom-6 start-6 w-7 h-7 border-b border-s border-amber-500/40 hidden md:block" aria-hidden="true" />
      <p className="absolute end-7 top-1/2 -translate-y-1/2 hidden xl:block font-mono text-[9.5px] uppercase tracking-[0.4em] text-mist-400/70" style={{ writingMode: "vertical-rl" }} aria-hidden="true">
        {isAr ? "بطاقة تعريف رقمية" : "Digital Business Card"} · YA
      </p>

      {/* ---------- content ---------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-svh flex flex-col justify-between pt-28 lg:pt-32 pb-8 lg:pb-10">
        {/* logo — independent asset, blends into the scene */}
        <Reveal className="flex justify-center">
          {logoSrc ? (
            <img src={logoSrc} alt="TECH OF THE WORLD" className="h-10 sm:h-12 w-auto drop-shadow-[0_2px_16px_rgba(6,13,22,0.7)]" />
          ) : (
            <LogoMark className="h-11 w-11" />
          )}
        </Reveal>

        {/* identity + QR */}
        <div className="mt-16 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <Reveal delay={120} className="flex items-center gap-3.5">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-amber-400">{isAr ? "تواصل معي" : "Contact"}</span>
            </Reveal>

            <Reveal line as="h1" delay={200} className="mt-5">
              <span className="block font-display font-bold tracking-tight leading-[1.06] text-[clamp(2.4rem,6vw,4.1rem)] drop-shadow-[0_4px_28px_rgba(6,13,22,0.8)]">
                {isAr ? "م. يوسف أحمد" : "ENG. YOUSEF AHMED"}
              </span>
            </Reveal>

            <Reveal delay={290} className="mt-3.5">
              <p className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.26em] text-amber-400/95">
                {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
              </p>
            </Reveal>

            <Reveal delay={350} className="mt-6 flex items-center gap-2.5" >
              <span className="inline-flex items-center gap-2 border border-paper-50/15 bg-ink-950/45 backdrop-blur-sm px-3.5 py-1.5 text-[12.5px] font-medium text-mist-200">
                <FlagSA className="w-4.5 h-4.5" /> {isAr ? "السعودية" : "Saudi Arabia"}
              </span>
              <span className="inline-flex items-center gap-2 border border-paper-50/15 bg-ink-950/45 backdrop-blur-sm px-3.5 py-1.5 text-[12.5px] font-medium text-mist-200">
                <FlagEG className="w-4.5 h-4.5" /> {isAr ? "مصر" : "Egypt"}
              </span>
            </Reveal>

            {/* channels — each appears exactly once */}
            <div className="mt-8">
              {channels.map((ch, i) => (
                <ChannelRow key={ch.key} ch={ch} index={i} />
              ))}
            </div>

            {/* CV downloads (kept from the previous build, as quiet links) */}
            <Reveal delay={480 + channels.length * 70} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mist-500">{isAr ? "السيرة الذاتية" : "CV"}</span>
              <a href={CV_FILES.ar} download className="group inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-mist-300 transition-colors hover:text-amber-400">
                <Icon name="doc" className="w-4 h-4 text-amber-500/80" /> {isAr ? "عربي" : "Arabic"}
                <Icon name="arrow" className="w-3.5 h-3.5 rotate-90 rtl:-scale-x-100 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0" strokeWidth={2.2} />
              </a>
              <a href={CV_FILES.en} download className="group inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-mist-300 transition-colors hover:text-amber-400">
                <Icon name="doc" className="w-4 h-4 text-amber-500/80" /> {isAr ? "إنجليزي" : "English"}
                <Icon name="arrow" className="w-3.5 h-3.5 rotate-90 rtl:-scale-x-100 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0" strokeWidth={2.2} />
              </a>
            </Reveal>
          </div>

          {/* QR — lower-end on desktop, flows under the channels on mobile */}
          <Reveal delay={620} className="mt-12 lg:mt-0 mx-auto lg:mx-0 lg:justify-self-end">
            <div className="relative w-[158px] sm:w-[176px]">
              <span className="absolute -top-2 -start-2 w-5 h-5 border-t border-s border-amber-500/70" aria-hidden="true" />
              <span className="absolute -bottom-2 -end-2 w-5 h-5 border-b border-e border-amber-500/70" aria-hidden="true" />
              <div className="chamfer-sm bg-ink-950/60 backdrop-blur-md border border-paper-50/15 p-3.5 transition-colors duration-300 hover:border-amber-500/40">
                <img
                  src={qrSrc}
                  alt={isAr ? "رمز QR — امسحه للتواصل مع يوسف أحمد" : "QR code — scan to connect with Yousef Ahmed"}
                  width={160}
                  height={160}
                  className="block w-full h-auto"
                />
              </div>
              <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-mist-400">
                {isAr ? "امسح للتواصل" : "Scan to connect"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
