import React from "react";
import { useLang, usePageMeta } from "../i18n";
import type { B } from "../i18n";
import { CARD, CONTACT, CV_FILES, IMAGES, githubUrl } from "../config";
import { Btn, Icon, Reveal } from "../components/kit";

/* ================= shared glass surface ================= */
function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden border border-ink-700 bg-ink-900/70 backdrop-blur-sm ${className}`}>
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-paper-50/20 to-transparent" aria-hidden="true" />
      {children}
    </div>
  );
}

/* ================= contact channel row ================= */
type Channel = { key: string; icon: string; label: B; value: string; href: string; external?: boolean };

function ChannelRow({ ch, index }: { ch: Channel; index: number }) {
  const { L } = useLang();
  return (
    <Reveal delay={80 + index * 60}>
      <a
        href={ch.href}
        target={ch.external ? "_blank" : undefined}
        rel={ch.external ? "noopener noreferrer" : undefined}
        aria-label={`${L(ch.label)} — ${ch.value}`}
        className="group flex items-center gap-4 px-5 sm:px-7 py-4 transition-colors duration-150 hover:bg-paper-50/[0.045]"
        style={{ paddingBlock: "1.05rem" }}
      >
        <span className="grid place-items-center w-11 h-11 shrink-0 border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-colors duration-150 group-hover:bg-amber-500/20 group-hover:border-amber-400/40">
          <Icon name={ch.icon} className="w-[19px] h-[19px]" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400">{L(ch.label)}</span>
          <span className="block mt-0.5 font-display text-[15px] font-semibold text-paper-50 truncate transition-colors duration-150 group-hover:text-amber-300" dir="ltr">
            {ch.value}
          </span>
        </span>
        <Icon
          name="arrow"
          strokeWidth={2}
          className="w-4 h-4 shrink-0 text-mist-500 opacity-0 -translate-x-1.5 rtl:translate-x-1.5 rtl:-scale-x-100 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-amber-400"
        />
      </a>
    </Reveal>
  );
}

/* ================= the page =================
 * A premium digital contact hub. The portrait melts into the page with no
 * frame and stays replaceable from public/images/contact/profile.webp.
 */
export function Contact() {
  const { isAr, L } = useLang();
  usePageMeta(
    isAr ? "تواصل معي | يوسف أحمد — أخصائي دعم تقني أول" : "Contact | Yousef Ahmed — Senior IT Support Specialist",
    isAr
      ? "بطاقة التواصل الرقمية ليوسف أحمد، أخصائي دعم تقني أول في جدة — هاتف، واتساب، بريد إلكتروني ولينكدإن."
      : "Digital contact card of Yousef Ahmed, Senior IT Support Specialist in Jeddah — phone, WhatsApp, email and LinkedIn."
  );

  const channels: Channel[] = [
    { key: "phone", icon: "phone", label: { en: "Phone", ar: "الهاتف" }, value: CARD.phoneDisplay, href: `tel:+${CARD.phoneDigits}` },
    { key: "whatsapp", icon: "wa", label: { en: "WhatsApp · Saudi Arabia", ar: "واتساب · السعودية" }, value: CARD.whatsappDisplay, href: `https://wa.me/${CARD.whatsappDigits}`, external: true },
    { key: "whatsapp-eg", icon: "wa", label: { en: "WhatsApp · Egypt", ar: "واتساب · مصر" }, value: CARD.whatsappEgDisplay, href: `https://wa.me/${CARD.whatsappEgDigits}`, external: true },
    { key: "email", icon: "mail", label: { en: "Email", ar: "البريد الإلكتروني" }, value: CARD.email, href: `mailto:${CARD.email}` },
    { key: "linkedin", icon: "linkedin", label: { en: "LinkedIn", ar: "لينكدإن" }, value: CARD.linkedinDisplay, href: CONTACT.linkedin, external: true },
    { key: "location", icon: "pin", label: { en: "Location", ar: "الموقع" }, value: L(CARD.location), href: CARD.mapsUrl, external: true },
  ];

  const socials = [
    { key: "wa", icon: "wa", label: "WhatsApp", href: `https://wa.me/${CARD.whatsappDigits}` },
    { key: "li", icon: "linkedin", label: "LinkedIn", href: CONTACT.linkedin },
    ...(githubUrl ? [{ key: "gh", icon: "github", label: "GitHub", href: githubUrl }] : []),
    { key: "em", icon: "mail", label: "Email", href: `mailto:${CARD.email}` },
  ];

  return (
    <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ambient scene: fine grid + electric-blue stage lighting */}
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
      <div className="absolute -top-40 end-[-10%] w-[52rem] h-[52rem] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(233,163,59,0.14), transparent 65%)" }} aria-hidden="true" />
      <div className="absolute bottom-[-30%] start-[-15%] w-[44rem] h-[44rem] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(233,163,59,0.07), transparent 65%)" }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 lg:pt-32 pb-20">
        {/* ================= HERO — introduction + portrait ================= */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* portrait — first on mobile, physical RIGHT on desktop (LTR), melts into the page */}
          <Reveal delay={140} className="order-1 lg:order-2 pb-6 lg:pb-0">
            <div className="relative max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] mx-auto lg:mx-0 lg:ms-auto">
              <div className="absolute -inset-10 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at 50% 36%, rgba(233,163,59,0.22), transparent 62%)" }} aria-hidden="true" />
              {/* the YA mark — no frame: the logo's own lines are used as a mask over a warm gradient,
                  so it melts into the page instead of sitting in a box */}
              <div
                role="img"
                aria-label={isAr ? "شعار YA ليوسف أحمد" : "YA monogram — Yousef Ahmed"}
                className="relative aspect-square"
                style={{
                  background: "linear-gradient(165deg, #fbe3b8 0%, #f0b35a 38%, #e9a33b 62%, rgba(233,163,59,0.08) 100%)",
                  maskImage: `url(${IMAGES.contactLogo})`,
                  WebkitMaskImage: `url(${IMAGES.contactLogo})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              {/* availability chip floating over the blend */}
              <div className="absolute -bottom-7 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 lg:-bottom-8 lg:start-8 lg:translate-x-0 lg:rtl:translate-x-0 inline-flex items-center gap-2.5 rounded-full border border-paper-50/15 bg-ink-950/60 backdrop-blur-md px-4 py-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#3fbf6f] pulse-ring" aria-hidden="true" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3fbf6f]" aria-hidden="true" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-200">
                  {isAr ? "متاح للتواصل" : "Available for work"}
                </span>
              </div>
            </div>
          </Reveal>

          {/* introduction — physical LEFT on desktop (LTR) */}
          <div className="order-2 lg:order-1">
            <Reveal className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-amber-400" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-300">
                {isAr ? "مرحبًا، أنا" : "Hello, I'm"}
              </span>
            </Reveal>

            <Reveal line as="h1" delay={90} className="mt-5">
              <span className="block font-display font-bold tracking-tight leading-[1.08] text-[clamp(2.6rem,5.4vw,3.9rem)]">
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

            <Reveal delay={180} className="mt-4">
              <p className="font-mono text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.24em] text-mist-300">
                {isAr ? CARD.titleAr : CARD.title}
              </p>
            </Reveal>

            <Reveal as="p" delay={260} className="mt-6 max-w-md text-[15.5px] leading-relaxed text-mist-400">
              {isAr
                ? "خبرة +9 سنوات في الدعم التقني، إدارة الأنظمة، بنية الشبكات التحتية والحلول التقنية."
                : "9+ years of experience in IT Support, System Administration, Network Infrastructure & Technical Solutions."}
            </Reveal>

            <Reveal delay={340} className="mt-9 flex flex-wrap items-center gap-4">
              <Btn href={isAr ? CV_FILES.ar : CV_FILES.en} download arrow={false}>
                <Icon name="download" className="w-4 h-4" strokeWidth={2} />
                {isAr ? "تحميل السيرة الذاتية" : "Download CV"}
              </Btn>
              <Btn to="/projects" variant="outline">
                {isAr ? "استعرض أعمالي" : "View Portfolio"}
              </Btn>
            </Reveal>
          </div>
        </div>

        {/* ================= GET IN TOUCH ================= */}
        <Reveal className="mt-16 lg:mt-24">
          <Glass className="max-w-3xl mx-auto">
            <div className="px-5 sm:px-7 pt-7 pb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">{isAr ? "تواصل معي" : "Get In Touch"}</h2>
                <p className="mt-1.5 text-[13.5px] text-mist-400">
                  {isAr ? "يسعدني تواصلك عبر أي من القنوات التالية." : "Feel free to reach out through any of the channels below."}
                </p>
              </div>
              <span className="hidden sm:block shrink-0 font-mono text-[11px] uppercase tracking-[0.24em] text-amber-300 border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 mt-1">
                {String(channels.length).padStart(2, "0")} {isAr ? "قنوات" : "Channels"}
              </span>
            </div>
            <div className="divide-y divide-paper-50/[0.06] border-t border-paper-50/[0.06]">
              {channels.map((ch, i) => (
                <ChannelRow key={ch.key} ch={ch} index={i} />
              ))}
            </div>
          </Glass>
        </Reveal>

        {/* ================= FINAL CTA ================= */}
        <Reveal className="mt-20 text-center">
          <p className="font-display text-2xl sm:text-[28px] font-bold tracking-tight">
            {isAr ? (
              <>
                لنبنِ <span className="text-amber-400">شيئًا رائعًا</span> معًا
              </>
            ) : (
              <>
                Let's build <span className="text-amber-400">something great</span> together
              </>
            )}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3.5">
            {socials.map((so) => (
              <a
                key={so.key}
                href={so.href}
                target={so.href.startsWith("http") ? "_blank" : undefined}
                rel={so.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={so.label}
                title={so.label}
                className="grid place-items-center w-12 h-12 border border-ink-600 text-mist-300 transition-all duration-150 hover:border-amber-400/60 hover:text-amber-300 hover:-translate-y-1"
              >
                <Icon name={so.icon} className="w-[19px] h-[19px]" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
