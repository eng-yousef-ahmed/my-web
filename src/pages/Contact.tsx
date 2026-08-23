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
import { FlagEG, FlagSA, Icon, Reveal, useAsset } from "../components/kit";

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
        className="group grid grid-cols-[34px_40px_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 py-4 border-b border-paper-50/[0.08] transition-all duration-200 ease-out hover:border-amber-500/40 hover:bg-paper-50/[0.04] hover:ps-3"
      >
        <span className="font-mono text-[11px] text-mist-500 transition-colors duration-200 group-hover:text-amber-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative grid place-items-center w-10 h-10">
          <Icon name={ch.icon} className="w-[19px] h-[19px] text-mist-300 transition-colors duration-200 group-hover:text-amber-400" />
          {ch.flag && (
            <span className="absolute -bottom-0.5 -end-1 rounded-full ring-2 ring-ink-950 overflow-hidden leading-none">
              {ch.flag}
            </span>
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.24em] text-mist-400">{L(ch.kind)}</span>
          <span className="block font-display text-[15.5px] font-semibold text-paper-50 truncate transition-colors duration-200 group-hover:text-amber-300" dir="ltr">
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
 * Split composition: the portrait owns the LEFT half (physically, in both
 * LTR and RTL) and melts into the page with no frame; the identity,
 * channels, CV and QR live on the right with generous, calm spacing.
 * Every visual asset (photo / QR) is a replaceable public file —
 * see public/assets/{profile,qr}/README.md.
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
    <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
      <div className="relative grid lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)]">
        {/* ============ LEFT HALF — the portrait, melting into the page ============ */}
        {/* Mobile: in-flow block on top · Desktop: full-height left column */}
        <div className="relative h-[46svh] sm:h-[52svh] lg:h-auto lg:min-h-svh overflow-hidden">
          <img
            src={profileSrc}
            alt={isAr ? "صورة شخصية للمهندس يوسف أحمد" : "Portrait of Yousef Ahmed"}
            className="kenburns absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: cardProfilePosition }}
          />
          {/* the melt — the image dissolves toward the content side, bottom and top */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/45" aria-hidden="true" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-ink-950/10" aria-hidden="true" />
          {/* warm rim light on the inner edge + hairline */}
          <div
            className="absolute inset-y-0 right-0 w-40 hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(233,163,59,0.10), transparent)" }}
            aria-hidden="true"
          />
          <span className="absolute inset-y-0 right-0 w-px bg-amber-500/25 hidden lg:block" aria-hidden="true" />
          {/* quiet corner ticks on the photo itself */}
          <span className="absolute top-5 left-5 w-6 h-6 border-t border-l border-amber-500/40" aria-hidden="true" />
          <span className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-amber-500/40 hidden lg:block" aria-hidden="true" />
        </div>

        {/* ============ RIGHT HALF — identity, channels, CV, QR ============ */}
        <div className="relative min-h-[calc(100svh-46svh)] sm:min-h-[calc(100svh-52svh)] lg:min-h-svh flex flex-col justify-center">
          {/* ambient layers on the content side */}
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 62% 42%, rgba(233,163,59,0.06), transparent 70%)" }}
            aria-hidden="true"
          />
          {/* faint echo arc hugging the content edge */}
          <svg
            className="absolute top-1/2 -translate-y-1/2 -start-24 w-[30rem] opacity-[0.35] pointer-events-none hidden xl:block"
            viewBox="0 0 600 600"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="300" cy="300" r="248" stroke="#16283c" strokeWidth="1" />
            <circle cx="300" cy="300" r="292" stroke="#1f344c" strokeWidth="1" strokeDasharray="2 9" />
            <path d="M300 8 A292 292 0 0 1 560 166" stroke="#e9a33b" strokeOpacity="0.3" strokeWidth="1.2" />
            <circle cx="560" cy="166" r="3" fill="#e9a33b" fillOpacity="0.8" />
          </svg>

          <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20 py-14 lg:py-20 max-w-[680px] w-full mx-auto lg:mx-0 lg:me-auto">
            {/* availability line */}
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-400">
                {isAr ? "تواصل معي" : "Contact"}
              </span>
              <span className="ms-auto hidden sm:flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-mist-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf6f] led" aria-hidden="true" />
                {isAr ? "متاح للتواصل" : "Available"}
              </span>
            </Reveal>

            {/* identity */}
            <Reveal line as="h1" delay={100} className="mt-6">
              <span className="block font-display font-bold tracking-tight leading-[1.06] text-[clamp(2.3rem,4.2vw,3.4rem)]">
                {isAr ? "م. يوسف أحمد" : "ENG. YOUSEF AHMED"}
              </span>
            </Reveal>
            <Reveal delay={180} className="mt-3.5">
              <p className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.24em] text-amber-400/95">
                {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 border border-ink-600 bg-ink-900/70 px-3.5 py-1.5 text-[12.5px] font-medium text-mist-200">
                <FlagSA className="w-4.5 h-4.5" /> {isAr ? "السعودية" : "Saudi Arabia"}
              </span>
              <span className="inline-flex items-center gap-2 border border-ink-600 bg-ink-900/70 px-3.5 py-1.5 text-[12.5px] font-medium text-mist-200">
                <FlagEG className="w-4.5 h-4.5" /> {isAr ? "مصر" : "Egypt"}
              </span>
            </Reveal>

            {/* channels — each appears exactly once */}
            <Reveal delay={320} className="mt-9 mb-1 flex items-center justify-between">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-mist-500">
                {isAr ? "قنوات التواصل" : "Channels"}
              </p>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-mist-500">
                {String(channels.length).padStart(2, "0")}
              </p>
            </Reveal>
            <div>
              {channels.map((ch, i) => (
                <ChannelRow key={ch.key} ch={ch} index={i} />
              ))}
            </div>

            {/* CV downloads + QR */}
            <Reveal delay={480 + channels.length * 70} className="mt-9 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-mist-500">
                  {isAr ? "السيرة الذاتية" : "CV"}
                </p>
                <div className="mt-3.5 flex items-center gap-6">
                  <a href={CV_FILES.ar} download className="group inline-flex items-center gap-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] text-mist-200 transition-colors hover:text-amber-400">
                    <Icon name="doc" className="w-4 h-4 text-amber-500/80" /> {isAr ? "عربي" : "Arabic"}
                    <Icon name="arrow" className="w-3.5 h-3.5 rotate-90 rtl:-scale-x-100 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0" strokeWidth={2.2} />
                  </a>
                  <span className="w-px h-4 bg-ink-600" aria-hidden="true" />
                  <a href={CV_FILES.en} download className="group inline-flex items-center gap-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] text-mist-200 transition-colors hover:text-amber-400">
                    <Icon name="doc" className="w-4 h-4 text-amber-500/80" /> {isAr ? "إنجليزي" : "English"}
                    <Icon name="arrow" className="w-3.5 h-3.5 rotate-90 rtl:-scale-x-100 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0" strokeWidth={2.2} />
                  </a>
                </div>
              </div>

              {/* QR — integrated plaque, always scannable */}
              <div className="relative w-[128px] sm:w-[138px]">
                <span className="absolute -top-1.5 -start-1.5 w-4 h-4 border-t border-s border-amber-500/70" aria-hidden="true" />
                <span className="absolute -bottom-1.5 -end-1.5 w-4 h-4 border-b border-e border-amber-500/70" aria-hidden="true" />
                <div className="chamfer-sm bg-ink-900/80 backdrop-blur-sm border border-paper-50/15 p-2.5 transition-colors duration-300 hover:border-amber-500/40">
                  <img
                    src={qrSrc}
                    alt={isAr ? "رمز QR — امسحه للتواصل مع يوسف أحمد" : "QR code — scan to connect with Yousef Ahmed"}
                    width={160}
                    height={160}
                    className="block w-full h-auto"
                  />
                </div>
                <p className="mt-2.5 text-center font-mono text-[8.5px] uppercase tracking-[0.26em] text-mist-400">
                  {isAr ? "امسح للتواصل" : "Scan to connect"}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
