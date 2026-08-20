import { CONTACT, vCardDataUrl, websiteDisplay } from "../config";
import { useLang } from "../i18n";
import { Icon, LogoMark, useCustomLogo } from "./kit";

/**
 * Digital business card — rendered live from the same centralized data the
 * website uses (CONTACT in config.ts) and the SAME logo source as the site
 * (useCustomLogo → public/logo-dark.svg | logo.svg …). Replacing the website
 * logo asset automatically replaces the card logo. No card-specific data.
 */
export function BusinessCard() {
  const { isAr } = useLang();
  const logo = useCustomLogo("dark"); // identical source to the website logo
  const site = websiteDisplay();

  const rows = [
    {
      key: "eg",
      marketLabel: isAr ? "مصر" : "Egypt",
      display: CONTACT.displayEG,
      digits: CONTACT.whatsappEG,
    },
    {
      key: "sa",
      marketLabel: isAr ? "السعودية" : "Saudi Arabia",
      display: CONTACT.displaySA,
      digits: CONTACT.whatsappSA,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* ---------- the card ---------- */}
      <article
        aria-label={isAr ? "بطاقة تعارف رقمية" : "Digital business card"}
        className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white text-ink-900 shadow-[0_1px_2px_rgba(10,20,32,0.05),0_30px_70px_-35px_rgba(10,20,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(10,20,32,0.06),0_40px_90px_-35px_rgba(10,20,32,0.5)]"
      >
        {/* subtle technical grid */}
        <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-70" aria-hidden="true" />
        {/* corner circuit traces */}
        <svg
          viewBox="0 0 220 220"
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -end-10 h-48 w-48 text-neutral-300 opacity-60 rtl:-scale-x-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M130 30h50M150 30v34h40M190 64v44M150 64v28" />
          <path d="M100 74h36M136 74v48M68 102h42v40M180 120h22" />
          <g fill="currentColor" stroke="none">
            <circle cx="130" cy="30" r="2.6" />
            <circle cx="190" cy="108" r="2.6" />
            <circle cx="100" cy="74" r="2.6" />
            <circle cx="68" cy="142" r="2.6" />
            <circle cx="150" cy="92" r="2.6" />
            <circle cx="202" cy="120" r="2.6" />
          </g>
        </svg>

        {/* ---------- card body ---------- */}
        <div className="relative p-6 sm:p-9">
          {/* header: logo + identity */}
          <div className="flex items-center gap-5 sm:gap-6">
            {logo ? (
              <img
                src={logo}
                alt="TECH OF THE WORLD"
                className="h-12 w-auto max-w-[140px] shrink-0 object-contain sm:h-16 sm:max-w-[170px]"
              />
            ) : (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ink-950 sm:h-16 sm:w-16">
                <LogoMark tone="light" className="h-8 w-8 sm:h-10 sm:w-10" />
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-display text-[19px] font-bold leading-tight tracking-tight sm:text-[26px]">
                {CONTACT.cardName}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-neutral-500 sm:text-[11px]">
                {CONTACT.cardTitle}
              </p>
              <div className="relative mt-3.5 h-px w-24 bg-neutral-900 sm:w-32" aria-hidden="true">
                <span className="absolute -top-[3px] start-0 h-[7px] w-[7px] rotate-45 bg-neutral-900" />
              </div>
            </div>
          </div>

          {/* contacts — compact two-column rows: phone | WhatsApp */}
          <div className="mt-7 divide-y divide-neutral-100 border-y border-neutral-100 sm:mt-8">
            {rows.map((r) => (
              <div key={r.key} className="flex items-center gap-2.5 py-3 sm:gap-4 sm:py-3.5">
                <a
                  href={`tel:+${r.digits}`}
                  className="group/row -ms-2 flex min-w-0 flex-1 items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-50 sm:gap-3.5"
                  aria-label={`${isAr ? "اتصال" : "Call"} — ${r.display}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink-950 text-white transition-transform duration-300 group-hover/row:scale-105">
                    <Icon name="phone" className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[8.5px] uppercase tracking-[0.26em] text-neutral-400 sm:text-[9px]">
                      {r.marketLabel}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[13.5px] font-semibold text-ink-900 sm:text-[15px]" dir="ltr">
                      {r.display}
                    </span>
                  </span>
                </a>
                <a
                  href={`https://wa.me/${r.digits}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp — ${r.display}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-ink-900/25 px-3 py-2 font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-900 transition-all duration-300 hover:border-ink-950 hover:bg-ink-950 hover:text-white active:scale-[0.96] sm:px-3.5 sm:text-[11px]"
                >
                  <Icon name="wa" className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            ))}

            {/* email */}
            <div className="flex items-center gap-2.5 py-3 sm:gap-4 sm:py-3.5">
              <a
                href={`mailto:${CONTACT.cardEmail}`}
                className="group/row -ms-2 flex min-w-0 flex-1 items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-50 sm:gap-3.5"
                aria-label={`Email — ${CONTACT.cardEmail}`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink-950 text-white transition-transform duration-300 group-hover/row:scale-105">
                  <Icon name="mail" className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[8.5px] uppercase tracking-[0.26em] text-neutral-400 sm:text-[9px]">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[13px] font-semibold text-ink-900 sm:text-[14.5px]" dir="ltr">
                    {CONTACT.cardEmail}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- dark footer ---------- */}
        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-ink-950 px-6 py-4 sm:px-9">
          <a
            href={CONTACT.website}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.06em] text-neutral-300 transition-colors hover:text-white sm:text-[11.5px]"
          >
            <Icon name="globe" className="w-3.5 h-3.5 text-neutral-500 transition-colors group-hover:text-white" />
            <span dir="ltr">{site}</span>
          </a>
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.06em] text-neutral-400 sm:text-[11.5px]">
            <Icon name="pin" className="w-3.5 h-3.5" />
            Saudi Arabia <span className="text-neutral-600">|</span> Egypt
          </span>
        </div>
      </article>

      {/* ---------- real .vcf download (unchanged functionality) ---------- */}
      <div className="mt-7 flex flex-col items-center gap-3.5">
        <a
          href={vCardDataUrl()}
          download="tech-of-the-world.vcf"
          className="chamfer-sm inline-flex items-center gap-3 bg-amber-500 px-7 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_12px_35px_-10px_rgba(233,163,59,0.6)] active:scale-[0.97]"
        >
          <Icon name="doc" className="w-4.5 h-4.5" strokeWidth={2} />
          {isAr ? "احفظ بطاقة التواصل (vCard)" : "Save contact card (vCard)"}
        </a>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
          {isAr ? "تُحفظ مباشرة في جهات اتصال هاتفك" : "Saves straight into your phone's contacts"}
        </p>
      </div>
    </div>
  );
}
