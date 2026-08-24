import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { CARD, CARD_ASSETS, IMAGES, cardProfilePosition, contactCardVcf, websiteDisplay } from "../config";
import { FlagSA, Icon, Reveal } from "../components/kit";
import { useAsset } from "../components/kit";

/**
 * The digital business card — the page a phone opens when it scans the QR.
 * Portrait + every contact channel + one-tap save, optimised for mobile.
 * The portrait comes from public/images/contact/profile.webp (replaceable,
 * zero code edits).
 */
export default function CardPage() {
  const { isAr } = useLang();
  usePageMeta(
    `${CARD.name} — ${CARD.title} | TECH OF THE WORLD`,
    isAr
      ? `بطاقة التواصل الرقمية — ${CARD.titleAr} في ${CARD.location.ar}`
      : `Digital contact card — ${CARD.title} in ${CARD.location.en}`
  );

  const profileSrc = useAsset(CARD_ASSETS.profile, IMAGES.contactProfile);
  const vcf = contactCardVcf();

  const channels = [
    { icon: "phone", label: isAr ? "اتصال" : "Call", value: CARD.phoneDisplay, href: `tel:+${CARD.phoneDigits}`, ltr: true },
    { icon: "wa", label: isAr ? "واتساب" : "WhatsApp", value: CARD.whatsappDisplay, href: `https://wa.me/${CARD.whatsappDigits}`, ltr: true, external: true },
    { icon: "mail", label: isAr ? "البريد" : "Email", value: CARD.email, href: `mailto:${CARD.email}`, ltr: true },
    { icon: "linkedin", label: "LinkedIn", value: "yousef-ahmed", href: "https://www.linkedin.com/in/eng-yousef-ahmed/", ltr: true, external: true },
    { icon: "globe", label: isAr ? "الموقع" : "Website", value: websiteDisplay(), href: "https://tech-of-the-world.netlify.app", ltr: true, external: true },
  ];

  return (
    <div className="relative min-h-svh bg-ink-950 text-paper-50 noise overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-32 inset-x-0 h-[26rem] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(59,139,245,0.16), transparent 70%)" }}
        aria-hidden="true"
      />

      <main className="relative max-w-md mx-auto px-5 pt-14 pb-10">
        {/* portrait — melts into the background, no frame */}
        <Reveal className="relative mx-auto w-44 h-44 sm:w-48 sm:h-48">
          <div
            className="absolute -inset-6 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(90,167,255,0.25), transparent 65%)" }}
            aria-hidden="true"
          />
          <div
            className="relative w-full h-full overflow-hidden rounded-full"
            style={{
              maskImage: "radial-gradient(circle at 50% 42%, #000 62%, transparent 97%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 42%, #000 62%, transparent 97%)",
            }}
          >
            <img
              src={profileSrc}
              alt={isAr ? "صورة شخصية للمهندس يوسف أحمد" : "Portrait of Yousef Ahmed"}
              className="w-full h-full object-cover"
              style={{ objectPosition: cardProfilePosition }}
            />
          </div>
          <span className="absolute bottom-1 end-1 grid place-items-center w-9 h-9 rounded-full bg-[#3fbf6f] ring-4 ring-ink-950 text-white">
            <Icon name="wa" className="w-4.5 h-4.5" />
          </span>
        </Reveal>

        {/* identity */}
        <Reveal delay={120} className="mt-7 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {isAr ? "يوسف أحمد" : "Yousef Ahmed"}
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.26em] text-volt-300">
            {isAr ? CARD.titleAr : CARD.title}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-mist-400">
            <FlagSA className="w-4.5 h-4.5" /> {isAr ? CARD.location.ar : CARD.location.en}
          </p>
        </Reveal>

        {/* save contact */}
        <Reveal delay={200} className="mt-8">
          <a
            href={vcf}
            download="Yousef-Ahmed.vcf"
            className="group flex items-center justify-center gap-3 rounded-xl bg-volt-500 px-6 py-4 font-display text-[13.5px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_36px_-16px_rgba(59,139,245,0.7)] transition-all duration-150 hover:bg-volt-400 active:scale-[0.98]"
          >
            <Icon name="addContact" className="w-5 h-5 transition-transform duration-150 group-hover:scale-110" strokeWidth={2} />
            {isAr ? "احفظ جهة الاتصال" : "Save Contact"}
          </a>
        </Reveal>

        {/* channels */}
        <div className="mt-8 rounded-[22px] border border-paper-50/[0.07] bg-paper-50/[0.03] backdrop-blur-xl overflow-hidden divide-y divide-paper-50/[0.06]">
          {channels.map((ch, i) => (
            <Reveal key={ch.label} delay={260 + i * 60}>
              <a
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                aria-label={`${ch.label} — ${ch.value}`}
                className="group flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-paper-50/[0.05]"
              >
                <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl border border-volt-500/20 bg-volt-500/10 text-volt-400 transition-colors duration-150 group-hover:bg-volt-500/20">
                  <Icon name={ch.icon} className="w-[18px] h-[18px]" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.26em] text-mist-400">{ch.label}</span>
                  <span className="block mt-0.5 font-display text-[14px] font-semibold text-paper-50 truncate group-hover:text-volt-300 transition-colors duration-150" dir={ch.ltr ? "ltr" : undefined}>
                    {ch.value}
                  </span>
                </span>
                <Icon name="arrow" strokeWidth={2} className="w-4 h-4 shrink-0 text-mist-500 opacity-0 -translate-x-1.5 rtl:translate-x-1.5 rtl:-scale-x-100 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-volt-400" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={620} className="mt-8 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-mist-400 transition-colors hover:text-volt-300"
          >
            {isAr ? "بطاقة التواصل الكاملة" : "Full contact page"}
            <Icon name="arrow" className="w-3.5 h-3.5 rtl:-scale-x-100" strokeWidth={2} />
          </Link>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-mist-500/70">
            TECH <span className="text-volt-400/70">OF</span> THE WORLD
          </p>
        </Reveal>
      </main>
    </div>
  );
}
