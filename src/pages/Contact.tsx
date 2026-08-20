import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import type { B } from "../i18n";
import { CONTACT, hasEmail, mailLink, telHref, waLink } from "../config";
import { BusinessCard } from "../components/BusinessCard";
import { FAQS } from "../data/content";
import { Btn, FaqList, FlagEG, FlagSA, Icon, PageHero, Reveal, SectionHeading } from "../components/kit";
import { ServiceRequestForm } from "../components/ServiceRequestForm";

type Channel = {
  n: string;
  icon: string;
  flag?: React.ReactNode;
  title: B;
  sub: B;
  value: string;
  href?: string | null;
  to?: string;
};

export function Contact() {
  const { t, L, isAr } = useLang();
  usePageMeta(
    isAr ? "تواصل معنا | TECH OF THE WORLD" : "Contact | TECH OF THE WORLD — Talk to an IT Specialist",
    "Reach TECH OF THE WORLD through WhatsApp (Saudi Arabia & Egypt), email or a structured service request — professional IT services for both markets."
  );

  const msg = (market: "sa" | "eg") =>
    isAr
      ? `مرحبًا TECH OF THE WORLD — أحتاج دعمًا تقنيًا في ${market === "sa" ? "السعودية" : "مصر"}.`
      : `Hello TECH OF THE WORLD — I need IT support in ${market === "sa" ? "Saudi Arabia" : "Egypt"}.`;

  const channels: Channel[] = [
    {
      n: "01",
      icon: "wa",
      flag: <FlagSA className="w-8 h-8" />,
      title: { en: "WhatsApp — Saudi Arabia", ar: "واتساب — السعودية" },
      sub: {
        en: "Support, infrastructure & projects across the Kingdom — remote and on-site.",
        ar: "الدعم والبنية التحتية والمشاريع داخل المملكة — عن بُعد وفي الموقع.",
      },
      value: CONTACT.displaySA,
      href: waLink(msg("sa"), "sa"),
    },
    {
      n: "02",
      icon: "wa",
      flag: <FlagEG className="w-8 h-8" />,
      title: { en: "WhatsApp — Egypt", ar: "واتساب — مصر" },
      sub: {
        en: "IT support, Microsoft environments & security systems for Egyptian businesses.",
        ar: "الدعم التقني وبيئات مايكروسوفت وأنظمة الأمن للشركات في مصر.",
      },
      value: CONTACT.displayEG,
      href: waLink(msg("eg"), "eg"),
    },
    {
      n: "03",
      icon: "mail",
      title: { en: "Email", ar: "البريد الإلكتروني" },
      sub: {
        en: "Specifications, attachments and anything that needs a written trail — answered within 1–2 business days.",
        ar: "المواصفات والمرفقات وكل ما يحتاج سجلًا مكتوبًا — نرد خلال يوم إلى يومين عمل.",
      },
      value: CONTACT.email,
      href: hasEmail ? mailLink("IT Inquiry — TECH OF THE WORLD", "") : null,
    },
    {
      n: "04",
      icon: "doc",
      title: { en: "Service Request Form", ar: "نموذج طلب الخدمة" },
      sub: {
        en: "A structured request with scope and urgency — best for quotations and projects.",
        ar: "طلب منظم بنطاق الخدمة ودرجة الإلحاح — الأنسب لعروض الأسعار والمشاريع.",
      },
      value: isAr ? "افتح النموذج" : "Open form",
      to: "/request",
    },
  ];

  return (
    <>
      <PageHero
        kicker={isAr ? "تواصل معنا" : "Contact"}
        title={{ en: "Talk to a person who has actually fixed it.", ar: "تحدّث مع شخص أصلحها فعلًا من قبل." }}
        lead={{
          en: "Four direct lines, no queues. WhatsApp for speed — one number per market. Email for detail. A structured form when you want it documented.",
          ar: "أربع قنوات مباشرة بلا طوابير. واتساب للسرعة — رقم لكل سوق. البريد للتفاصيل. ونموذج منظم حين تريده موثقًا.",
        }}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
      </PageHero>

      {/* ============ contact directory ============ */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <SectionHeading
            kicker={isAr ? "القنوات المباشرة" : "Direct Lines"}
            tone="dark"
            title={{ en: "Choose your line. A technical person answers.", ar: "اختر قناتك. يجيبك شخص تقني." }}
          />

          <Reveal className="mt-14 border-t border-ink-900/12">
            {channels.map((c, i) => {
              const inner = (
                <>
                  <span className="font-mono text-[13px] text-amber-600 group-hover:text-amber-500 transition-colors">{c.n}</span>
                  <span className="hidden sm:grid w-12 h-12 shrink-0 place-items-center bg-ink-900 text-amber-500 group-hover:bg-amber-500 group-hover:text-ink-950 transition-colors duration-300">
                    <Icon name={c.icon} className="w-5.5 h-5.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      {c.flag}
                      <span className="font-display text-lg font-bold text-ink-900 group-hover:text-paper-50 transition-colors truncate">
                        {L(c.title)}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-mist-500 group-hover:text-mist-300 transition-colors">
                      {L(c.sub)}
                    </span>
                  </span>
                  <span
                    className="hidden md:block font-mono text-[13px] text-mist-500 group-hover:text-paper-50 transition-colors whitespace-nowrap"
                    dir="ltr"
                  >
                    {c.value}
                  </span>
                  <span className="hidden sm:grid w-10 h-10 shrink-0 place-items-center border border-ink-900/15 text-ink-900 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-ink-950 transition-all duration-300">
                    <Icon name="arrow" className="w-4.5 h-4.5 rtl:-scale-x-100 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
                  </span>
                </>
              );
              const cls = `group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[44px_48px_1fr_auto] items-center gap-4 sm:gap-6 border-b border-ink-900/12 py-6 px-4 sm:px-6 transition-colors duration-300 hover:bg-ink-900`;
              return (
                <div key={c.n} style={{ ["--rv-delay" as string]: `${i * 70}ms` }}>
                  {c.to ? (
                    <Link to={c.to} className={cls}>{inner}</Link>
                  ) : c.href ? (
                    <a href={c.href} target={c.icon === "wa" ? "_blank" : undefined} rel={c.icon === "wa" ? "noreferrer" : undefined} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={`${cls} opacity-60`}>{inner}</div>
                  )}
                </div>
              );
            })}
          </Reveal>

          {/* coverage facts */}
          <Reveal delay={150} className="mt-12 grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: "pin",
                k: { en: "Coverage", ar: "التغطية" },
                v: { en: "Saudi Arabia & Egypt — remote anywhere, on-site per engagement.", ar: "السعودية ومصر — دعم عن بُعد في أي مكان، وميداني حسب العمل." },
              },
              {
                icon: "clock",
                k: { en: "Response", ar: "الاستجابة" },
                v: { en: "Targets agreed per engagement; critical issues are priority from message one.", ar: "أهداف تُتفق لكل عمل؛ والقضايا الحرجة أولوية من أول رسالة." },
              },
              {
                icon: "globe",
                k: { en: "Languages", ar: "اللغات" },
                v: { en: "Arabic & English — documentation and delivery in both.", ar: "العربية والإنجليزية — توثيق وتسليم باللغتين." },
              },
            ].map((f) => (
              <div key={f.k.en} className="flex gap-4">
                <span className="w-10 h-10 shrink-0 grid place-items-center border border-ink-900/15 text-amber-600">
                  <Icon name={f.icon} className="w-4.5 h-4.5" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-bold">{L(f.k)}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-mist-500">{L(f.v)}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ urgent strip ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <span className="relative flex w-3 h-3 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-red-500 pulse-ring" aria-hidden="true" />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-red-300">{t("cta.urgent")}</p>
              <p className="text-[13px] text-mist-400 mt-0.5">
                {isAr ? "النظام متوقف؟ هات أقرب رقم — البيئات المدعومة أولوية فورية." : "System down? Take the nearest line — supported environments get immediate priority."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(
              [
                { market: "sa" as const, flag: <FlagSA className="w-6 h-6" />, display: CONTACT.displaySA },
                { market: "eg" as const, flag: <FlagEG className="w-6 h-6" />, display: CONTACT.displayEG },
              ]
            ).map((line) => (
              <span key={line.market} className="inline-flex items-stretch">
                <a
                  href={waLink("URGENT — " + t("cta.urgent"), line.market)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-red-500/50 text-red-300 px-4 py-3 font-mono text-[12.5px] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300"
                >
                  {line.flag}
                  <span dir="ltr">{line.display}</span>
                </a>
                <a
                  href={telHref(line.market)}
                  aria-label={isAr ? "اتصال هاتفي مباشر" : "Call directly"}
                  className="grid place-items-center w-12 border border-s-0 border-ink-600 text-mist-400 hover:bg-ink-700 hover:text-paper-50 transition-colors"
                >
                  <Icon name="phone" className="w-4 h-4" />
                </a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ digital business card ============ */}
      <section className="bg-paper-100 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <Reveal className="text-center max-w-xl mx-auto mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-600">
              {isAr ? "بطاقة التعارف الرقمية" : "Digital Business Card"}
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink-900">
              {isAr ? "احفظنا في هاتفك بضغطة واحدة" : "Keep us one tap away"}
            </h2>
          </Reveal>
          <BusinessCard />
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-paper-50 text-ink-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <Reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber-500" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-600">FAQ</span>
            </Reveal>
            <Reveal line as="h2" delay={80}>
              <span className="font-display text-3xl sm:text-4xl font-bold leading-tight">{t("misc.faq")}</span>
            </Reveal>
            <Btn to="/request" variant="dark" className="mt-8">{t("nav.request")}</Btn>
          </div>
          <Reveal delay={120}>
            <FaqList faqs={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Request() {
  const { t, isAr } = useLang();
  usePageMeta(
    isAr ? "اطلب خدمة تقنية | TECH OF THE WORLD" : "Request IT Service | TECH OF THE WORLD",
    "Request IT support, infrastructure, networks, Microsoft & cloud, CCTV or consultancy — serving Saudi Arabia and Egypt. Response via WhatsApp or email."
  );
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const prefill = params.get("service") ?? undefined;
  const rawCountry = params.get("country") ?? "";
  const prefillCountry =
    rawCountry === "Saudi Arabia" || rawCountry === "Egypt" ? rawCountry : undefined;
  const context = params.get("context") ?? undefined;

  return (
    <>
      <PageHero
        kicker={isAr ? "طلب خدمة" : "Service Request"}
        title={{ en: "Tell us the problem. We'll bring the plan.", ar: "أخبرنا بالمشكلة. نحن نأتي بالخطة." }}
        lead={{
          en: "One structured request is enough — service line, urgency and a plain-language description. We reply through the channel you prefer.",
          ar: "طلب منظم واحد يكفي — مسار الخدمة ودرجة الإلحاح ووصف بلغة بسيطة. نرد عبر القناة التي تفضلها.",
        }}
      />
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20 grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div className="chamfer bg-ink-950 p-3 sm:p-4">
            <ServiceRequestForm prefillService={prefill} prefillCountry={prefillCountry} context={context} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-32">
            <Reveal>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-7">
                <h2 className="font-display text-lg font-bold">{isAr ? "ماذا يحدث بعد الإرسال؟" : "What happens next?"}</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    { en: "A technical person reviews your requirement — not an auto-responder.", ar: "شخص تقني يراجع طلبك — لا رد آلي." },
                    { en: "We clarify scope with you on WhatsApp or email.", ar: "نوضح معك النطاق عبر واتساب أو البريد." },
                    { en: "You receive a clear quotation or assessment proposal.", ar: "يصلك عرض سعر واضح أو مقترح تقييم." },
                  ].map((s, i) => (
                    <li key={s.en} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 grid place-items-center bg-ink-900 text-amber-500 font-mono text-[11px]">0{i + 1}</span>
                      <span className="text-[14px] leading-relaxed text-mist-500 pt-1">{isAr ? s.ar : s.en}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="chamfer-sm bg-ink-900 text-paper-50 p-7 relative overflow-hidden noise">
                <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                <div className="relative">
                  <p className="flex items-center gap-2.5 font-display font-bold text-red-400">
                    <Icon name="alert" className="w-5 h-5" /> {t("cta.urgent")}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-300">
                    {isAr ? "الأنظمة متوقفة الآن؟ واتساب هو الطريق الأسرع — أو اختر «حرج» في النموذج." : "Systems down right now? WhatsApp is the fastest route — or mark the form “Critical”."}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a href={waLink("URGENT — " + t("cta.urgent"), "sa")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 chamfer-sm bg-[#23a55b] text-white px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
                      <FlagSA className="w-4.5 h-4.5" /> <span dir="ltr">{CONTACT.displaySA}</span>
                    </a>
                    <a href={waLink("URGENT — " + t("cta.urgent"), "eg")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 chamfer-sm border border-ink-600 text-mist-200 px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:border-[#23a55b] hover:text-[#5fd68f] transition-all">
                      <FlagEG className="w-4.5 h-4.5" /> <span dir="ltr">{CONTACT.displayEG}</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
