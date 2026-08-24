import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import type { B } from "../i18n";
import {
  CARD,
  CARD_ASSETS,
  CONTACT,
  CV_FILES,
  IMAGES,
  cardProfilePosition,
  contactCardVcf,
  githubUrl,
  qrFallbackUrl,
} from "../config";
import { Icon, Reveal, useAsset } from "../components/kit";

/* ================= shared glass surface ================= */
function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-paper-50/[0.07] bg-paper-50/[0.03] backdrop-blur-xl shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* hairline top-light that reads as glass, not a gradient */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-paper-50/20 to-transparent" aria-hidden="true" />
      {children}
    </div>
  );
}

/* ================= contact channels ================= */
type Channel = {
  key: string;
  icon: string;
  label: B;
  value: string;
  href: string;
  external?: boolean;
};

function ChannelRow({ ch, index }: { ch: Channel; index: number }) {
  const { L } = useLang();
  return (
    <Reveal delay={80 + index * 60}>
      <a
        href={ch.href}
        target={ch.external ? "_blank" : undefined}
        rel={ch.external ? "noopener noreferrer" : undefined}
        aria-label={`${L(ch.label)} — ${ch.value}`}
        className="group flex items-center gap-4 px-5 sm:px-7 py-4.5 transition-colors duration-150 hover:bg-paper-50/[0.045]"
      >
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl border border-volt-500/20 bg-volt-500/10 text-volt-400 transition-colors duration-150 group-hover:bg-volt-500/20 group-hover:border-volt-400/40">
          <Icon name={ch.icon} className="w-[19px] h-[19px]" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.28em] text-mist-400">{L(ch.label)}</span>
          <span className="block mt-0.5 font-display text-[15px] font-semibold text-paper-50 truncate transition-colors duration-150 group-hover:text-volt-300" dir="ltr">
            {ch.value}
          </span>
        </span>
        <Icon
          name="arrow"
          strokeWidth={2}
          className="w-4 h-4 shrink-0 text-mist-500 opacity-0 -translate-x-1.5 rtl:translate-x-1.5 rtl:-scale-x-100 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-volt-400"
        />
      </a>
    </Reveal>
  );
}

/* ================= professional areas ================= */
type Skill = { icon: string; title: B; desc: B };
const SKILLS: Skill[] = [
  {
    icon: "headset",
    title: { en: "IT Support", ar: "الدعم التقني" },
    desc: {
      en: "End-user support, troubleshooting & IT service management.",
      ar: "دعم المستخدمين، استكشاف الأعطال وإدارة خدمات تقنية المعلومات.",
    },
  },
  {
    icon: "rack",
    title: { en: "System Admin", ar: "إدارة الأنظمة" },
    desc: {
      en: "Windows Server, Active Directory, Group Policy, Backup.",
      ar: "ويندوز سيرفر، أكتيف ديريكتوري، سياسات المجموعة والنسخ الاحتياطي.",
    },
  },
  {
    icon: "network",
    title: { en: "Network", ar: "الشبكات" },
    desc: {
      en: "LAN/WAN, VPN, Firewalls, Switching & Monitoring.",
      ar: "LAN/WAN وVPN والجدران النارية والتحويل والمراقبة.",
    },
  },
  {
    icon: "shield",
    title: { en: "Security", ar: "الأمن والمراقبة" },
    desc: {
      en: "CCTV Systems, Access Control, Biometric & Security Solutions.",
      ar: "أنظمة المراقبة والتحكم في الدخول والبصمة والحلول الأمنية.",
    },
  },
];

/* ================= the page =================
 * A premium digital business card / contact hub.
 * Portrait  → public/images/contact/profile.webp   (replace the file, no code edits)
 * QR code   → public/images/contact/contact-qr.webp (replace the file, no code edits)
 */
export function Contact() {
  const { isAr, L } = useLang();
  const [copied, setCopied] = useState(false);

  usePageMeta(
    isAr ? "تواصل معي | يوسف أحمد — أخصائي دعم تقني أول" : "Contact | Yousef Ahmed — Senior IT Support Specialist",
    isAr
      ? "بطاقة التواصل الرقمية ليوسف أحمد، أخصائي دعم تقني أول في جدة — هاتف، واتساب، بريد إلكتروني، لينكدإن ورمز QR."
      : "Digital contact card of Yousef Ahmed, Senior IT Support Specialist in Jeddah — phone, WhatsApp, email, LinkedIn and a scannable QR."
  );

  const profileSrc = useAsset(CARD_ASSETS.profile, IMAGES.contactProfile);
  const qrSrc = useAsset(CARD_ASSETS.qr, qrFallbackUrl(CONTACT.website));
  const vcf = contactCardVcf();

  const channels: Channel[] = [
    {
      key: "phone",
      icon: "phone",
      label: { en: "Phone", ar: "الهاتف" },
      value: CARD.phoneDisplay,
      href: `tel:+${CARD.phoneDigits}`,
    },
    {
      key: "whatsapp",
      icon: "wa",
      label: { en: "WhatsApp", ar: "واتساب" },
      value: CARD.whatsappDisplay,
      href: `https://wa.me/${CARD.whatsappDigits}`,
      external: true,
    },
    {
      key: "email",
      icon: "mail",
      label: { en: "Email", ar: "البريد الإلكتروني" },
      value: CARD.email,
      href: `mailto:${CARD.email}`,
    },
    {
      key: "linkedin",
      icon: "linkedin",
      label: { en: "LinkedIn", ar: "لينكدإن" },
      value: CARD.linkedinDisplay,
      href: CONTACT.linkedin,
      external: true,
    },
    {
      key: "location",
      icon: "pin",
      label: { en: "Location", ar: "الموقع" },
      value: L(CARD.location),
      href: CARD.mapsUrl,
      external: true,
    },
  ];

  const socials = [
    { key: "wa", icon: "wa", label: "WhatsApp", href: `https://wa.me/${CARD.whatsappDigits}` },
    { key: "li", icon: "linkedin", label: "LinkedIn", href: CONTACT.linkedin },
    ...(githubUrl ? [{ key: "gh", icon: "github", label: "GitHub", href: githubUrl }] : []),
    { key: "em", icon: "mail", label: "Email", href: `mailto:${CARD.email}` },
  ];

  const shareProfile = async () => {
    const url = CONTACT.website;
    const payload = { title: `${CARD.name} — ${CARD.title}`, text: L(CARD.location), url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  };

  return (
    <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ambient scene: fine grid + electric-blue stage lighting */}
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-40 end-[-10%] w-[52rem] h-[52rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,139,245,0.14), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-30%] start-[-15%] w-[44rem] h-[44rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,139,245,0.07), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 lg:pt-32 pb-20">
        {/* ================= HERO — introduction + portrait ================= */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.04fr_0.96fr] items-center">
          {/* portrait — first on mobile, physical RIGHT on desktop (LTR) */}
          <Reveal delay={140} className="order-1 lg:order-2">
            <div className="relative max-w-[440px] mx-auto lg:mx-0 lg:ms-auto">
              {/* stage light behind the person */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 38%, rgba(90,167,255,0.22), transparent 62%)" }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[28px] border border-paper-50/10">
                <img
                  src={profileSrc}
                  alt={isAr ? "صورة شخصية للمهندس يوسف أحمد" : "Portrait of Yousef Ahmed"}
                  className="block w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: cardProfilePosition }}
                />
                {/* soft cinematic blend into the page */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/10" aria-hidden="true" />
                {/* availability chip */}
                <div className="absolute bottom-4 start-4 inline-flex items-center gap-2.5 rounded-full border border-paper-50/15 bg-ink-950/60 backdrop-blur-md px-4 py-2">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#3fbf6f] pulse-ring" aria-hidden="true" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3fbf6f]" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mist-200">
                    {isAr ? "متاح للتواصل" : "Available for work"}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* introduction — physical LEFT on desktop (LTR) */}
          <div className="order-2 lg:order-1">
            <Reveal className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-volt-400" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-volt-300">
                {isAr ? "مرحبًا، أنا" : "Hello, I'm"}
              </span>
            </Reveal>

            <Reveal line as="h1" delay={90} className="mt-5">
              <span className="block font-display font-bold tracking-tight leading-[1.08] text-[clamp(2.6rem,5.4vw,3.9rem)]">
                {isAr ? (
                  <>يوسف <span className="text-volt-400">أحمد</span></>
                ) : (
                  <>Yousef <span className="text-volt-400">Ahmed</span></>
                )}
              </span>
            </Reveal>

            <Reveal delay={180} className="mt-4">
              <p className="font-mono text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.24em] text-mist-300">
                {L({ en: CARD.title, ar: CARD.titleAr })}
              </p>
            </Reveal>

            <Reveal as="p" delay={260} className="mt-6 max-w-md text-[15.5px] leading-relaxed text-mist-400">
              {isAr
                ? "خبرة +9 سنوات في الدعم التقني، إدارة الأنظمة، بنية الشبكات التحتية والحلول التقنية."
                : "9+ years of experience in IT Support, System Administration, Network Infrastructure & Technical Solutions."}
            </Reveal>

            <Reveal delay={340} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={isAr ? CV_FILES.ar : CV_FILES.en}
                download
                className="group inline-flex items-center gap-3 rounded-xl bg-volt-500 px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_36px_-16px_rgba(59,139,245,0.7)] transition-all duration-150 hover:bg-volt-400 active:scale-[0.97]"
              >
                <Icon name="download" className="w-4.5 h-4.5 transition-transform duration-150 group-hover:translate-y-0.5" strokeWidth={2} />
                {isAr ? "تحميل السيرة الذاتية" : "Download CV"}
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 rounded-xl border border-paper-50/15 bg-paper-50/[0.04] backdrop-blur-md px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-mist-200 transition-all duration-150 hover:border-volt-400/50 hover:text-volt-300 active:scale-[0.97]"
              >
                {isAr ? "استعرض أعمالي" : "View Portfolio"}
                <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ================= GET IN TOUCH + QR ================= */}
        <div className="mt-16 lg:mt-24 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] items-stretch">
          {/* contact channels */}
          <Reveal>
            <Glass className="h-full flex flex-col">
              <div className="px-5 sm:px-7 pt-7 pb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">{isAr ? "تواصل معي" : "Get In Touch"}</h2>
                  <p className="mt-1.5 text-[13.5px] text-mist-400">
                    {isAr ? "يسعدني تواصلك عبر أي من القنوات التالية." : "Feel free to reach out through any of the channels below."}
                  </p>
                </div>
                <span className="hidden sm:block shrink-0 font-mono text-[9.5px] uppercase tracking-[0.24em] text-volt-300 border border-volt-500/25 bg-volt-500/10 rounded-full px-3 py-1.5 mt-1">
                  05 {isAr ? "قنوات" : "Channels"}
                </span>
              </div>
              <div className="flex-1 divide-y divide-paper-50/[0.06] border-t border-paper-50/[0.06]">
                {channels.map((ch, i) => (
                  <ChannelRow key={ch.key} ch={ch} index={i} />
                ))}
              </div>
            </Glass>
          </Reveal>

          {/* QR card */}
          <Reveal delay={120}>
            <Glass className="h-full flex flex-col p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold">{isAr ? "امسح للتواصل" : "Scan to Connect"}</h2>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist-400">
                {isAr ? "امسح رمز QR لحفظ بياناتي أو التواصل فورًا." : "Scan the QR code to save my contact or connect instantly."}
              </p>

              <div className="mt-6 mx-auto w-full max-w-[240px] rounded-2xl bg-paper-50 p-3.5 shadow-[0_18px_50px_-24px_rgba(59,139,245,0.45)]">
                <img
                  src={qrSrc}
                  alt={isAr ? "رمز QR — امسحه لحفظ بيانات التواصل" : "QR code — scan to save my contact"}
                  width={480}
                  height={480}
                  loading="lazy"
                  className="block w-full h-auto object-contain"
                />
              </div>

              {/* action bar */}
              <div className="mt-7 grid grid-cols-3 gap-2.5">
                <a
                  href={vcf}
                  download="yousef-ahmed.vcf"
                  className="group flex flex-col items-center gap-2 rounded-xl border border-paper-50/10 bg-paper-50/[0.04] px-2 py-4 transition-all duration-150 hover:border-volt-400/50 hover:bg-volt-500/10"
                >
                  <Icon name="download" className="w-5 h-5 text-volt-400 transition-transform duration-150 group-hover:translate-y-0.5" />
                  <span className="font-display text-[10.5px] font-semibold uppercase tracking-[0.08em] text-mist-200 group-hover:text-volt-300 transition-colors">
                    {isAr ? "حفظ الجهة" : "Save Contact"}
                  </span>
                </a>
                <a
                  href={vcf}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-paper-50/10 bg-paper-50/[0.04] px-2 py-4 transition-all duration-150 hover:border-volt-400/50 hover:bg-volt-500/10"
                >
                  <Icon name="userplus" className="w-5 h-5 text-volt-400 transition-transform duration-150 group-hover:-translate-y-0.5" />
                  <span className="font-display text-[10.5px] font-semibold uppercase tracking-[0.08em] text-mist-200 group-hover:text-volt-300 transition-colors">
                    {isAr ? "أضف للجهات" : "Add to Contacts"}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={shareProfile}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-paper-50/10 bg-paper-50/[0.04] px-2 py-4 transition-all duration-150 hover:border-volt-400/50 hover:bg-volt-500/10 cursor-pointer"
                >
                  <Icon name={copied ? "check" : "share"} className={`w-5 h-5 transition-colors ${copied ? "text-[#3fbf6f]" : "text-volt-400"}`} />
                  <span className={`font-display text-[10.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${copied ? "text-[#3fbf6f]" : "text-mist-200 group-hover:text-volt-300"}`}>
                    {copied ? (isAr ? "تم النسخ" : "Copied!") : isAr ? "مشاركة" : "Share Profile"}
                  </span>
                </button>
              </div>
            </Glass>
          </Reveal>
        </div>

        {/* ================= PROFESSIONAL AREAS ================= */}
        <Reveal className="mt-6">
          <Glass className="px-5 sm:px-8 py-8 sm:py-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
              {SKILLS.map((s, i) => (
                <div
                  key={s.title.en}
                  className={`group relative px-0 sm:px-7 ${i > 0 ? "sm:border-s sm:border-paper-50/[0.07]" : ""} ${i >= 2 ? "sm:border-t-0" : ""}`}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-mist-500">0{i + 1}</span>
                  <span className="mt-3 flex w-fit text-volt-400 transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Icon name={s.icon} className="w-6 h-6" />
                  </span>
                  <h3 className="mt-3.5 font-display text-[17px] font-bold">{L(s.title)}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-mist-400">{L(s.desc)}</p>
                </div>
              ))}
            </div>
          </Glass>
        </Reveal>

        {/* ================= FINAL CTA ================= */}
        <Reveal className="mt-20 text-center">
          <p className="font-display text-2xl sm:text-[28px] font-bold tracking-tight">
            {isAr ? (
              <>لنبنِ <span className="text-volt-400">شيئًا رائعًا</span> معًا</>
            ) : (
              <>Let's build <span className="text-volt-400">something great</span> together</>
            )}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3.5">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                title={s.label}
                className="grid place-items-center w-12 h-12 rounded-full border border-paper-50/12 bg-paper-50/[0.04] text-mist-300 backdrop-blur-md transition-all duration-150 hover:border-volt-400/60 hover:text-volt-300 hover:-translate-y-1"
              >
                <Icon name={s.icon} className="w-[19px] h-[19px]" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
