import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { CAREER, EDUCATION, LANGUAGES, CERTS } from "../data/career";
import { FOUNDER_METRICS, TECH_GROUPS } from "../data/content";
import { CV_FILES } from "../config";
import { FlagEG, FlagSA, Icon, PageHero, Reveal } from "../components/kit";

const FOCUS = [
  "IT Support", "Windows Server", "Active Directory", "Group Policy", "Networking", "Microsoft 365",
  "CCTV", "Access Control", "Monitoring", "Enterprise Printing", "Remote Support", "Infrastructure",
];

const APPROACH: { icon: string; title: { en: string; ar: string }; body: { en: string; ar: string } }[] = [
  {
    icon: "wrench",
    title: { en: "Hands-on", ar: "عملي ميدانيًا" },
    body: { en: "I fix what I design. The same person who plans the environment builds and troubleshoots it.", ar: "أصلح ما أصممه. من يخطط للبيئة هو نفسه من يبنيها ويحل أعطالها." },
  },
  {
    icon: "foundation",
    title: { en: "Infrastructure-first", ar: "البنية أولًا" },
    body: { en: "Applications come and go; the layer underneath decides whether they run. I start there.", ar: "التطبيقات تتغير، والطبقة التي تحتها تحدد قدرتها على العمل. أبدأ من هناك." },
  },
  {
    icon: "doc",
    title: { en: "Documentation", ar: "التوثيق" },
    body: { en: "Every change, asset and decision gets written down, so the environment outlives the visit.", ar: "كل تغيير وأصل وقرار يُدوَّن، لتعيش البيئة بعد انتهاء الزيارة." },
  },
  {
    icon: "bolt",
    title: { en: "Troubleshooting", ar: "استكشاف الأعطال" },
    body: { en: "Structured diagnosis over guesswork: find the root cause, fix it once, prevent the repeat.", ar: "تشخيص منهجي بدل التخمين: أصل إلى السبب الجذري وأصلحه مرة واحدة وأمنع تكراره." },
  },
  {
    icon: "briefcase",
    title: { en: "Business-focused", ar: "في خدمة الأعمال" },
    body: { en: "Technical decisions explained in uptime, risk and cost, because that is what you actually buy.", ar: "القرارات التقنية تُشرح بلغة التشغيل والمخاطر والتكلفة، لأن هذا ما تشتريه فعلًا." },
  },
  {
    icon: "headset",
    title: { en: "Remote & on-site", ar: "عن بُعد وميداني" },
    body: { en: "Routine issues solved remotely in minutes; physical work handled on-site with the same discipline.", ar: "المشكلات اليومية تُحل عن بُعد في دقائق، والأعمال الميدانية تُنفذ بالمنهجية نفسها." },
  },
];

export default function About() {
  const { L, isAr } = useLang();
  usePageMeta(
    isAr ? "من أنا | يوسف أحمد — TECH OF THE WORLD" : "About Me | Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "أخصائي دعم تقني أول: 9+ سنوات خبرة في الدعم المؤسسي والبنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن في السعودية ومصر."
      : "Senior IT Support Specialist with 9+ years across enterprise support, infrastructure, networks, Microsoft environments and security systems in Saudi Arabia and Egypt."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "من أنا" : "About Me"}
        title={{
          en: "Yousef Ahmed. I keep business technology running.",
          ar: "يوسف أحمد. أُبقي تقنية الأعمال تعمل.",
        }}
        lead={{
          en: "Senior IT Support Specialist with over 9 years of hands-on experience across IT support, infrastructure, networks, Microsoft environments and security systems, delivered in Saudi Arabia and Egypt.",
          ar: "أخصائي دعم تقني أول بخبرة عملية تتجاوز 9 سنوات في الدعم التقني والبنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن، في السعودية ومصر.",
        }}
      >
        <span className="flex flex-wrap items-center gap-3">
          <a
            href={CV_FILES.en}
            download
            className="inline-flex items-center gap-2.5 border border-ink-600 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            <Icon name="doc" className="w-4 h-4" /> CV · English
          </a>
          <a
            href={CV_FILES.ar}
            download
            className="inline-flex items-center gap-2.5 border border-ink-600 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            <Icon name="doc" className="w-4 h-4" /> CV · العربية
          </a>
        </span>
      </PageHero>

      {/* ============ EXPERIENCE ============ */}
      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-amber-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "الخبرة" : "Experience"}</span>
          </Reveal>

          <Reveal className="mb-12 flex flex-wrap gap-x-12 gap-y-4">
            {FOUNDER_METRICS.map((m) => (
              <div key={m.label.en}>
                <p className="font-display text-3xl font-bold text-ink-900">{m.value}</p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500">{L(m.label)}</p>
              </div>
            ))}
          </Reveal>

          <div className="relative">
            <div className="absolute top-2 bottom-2 start-[9px] w-px bg-ink-900/15" aria-hidden="true" />
            <div className="space-y-10">
              {CAREER.map((c, i) => (
                <Reveal key={c.org.en} delay={i * 60}>
                  <div className="relative flex gap-6">
                    <span className="relative z-10 shrink-0 w-5 h-5 mt-1.5 grid place-items-center">
                      <span className="w-2.5 h-2.5 bg-amber-500 rotate-45" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-amber-700" dir="ltr">{c.period}</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-500">
                          {c.market === "sa" ? <FlagSA className="w-4 h-4" /> : <FlagEG className="w-4 h-4" />}
                          {L(c.loc)}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-ink-900">{L(c.role)}</h3>
                      <p className="text-[14px] text-mist-500 mt-0.5">{L(c.org)}</p>
                      <ul className="mt-3 space-y-1.5">
                        {c.points.map((p) => (
                          <li key={p.en} className="flex gap-2.5 text-[13.5px] leading-relaxed text-mist-500">
                            <span className="w-1 h-1 bg-amber-500 rotate-45 mt-2 shrink-0" aria-hidden="true" />
                            {L(p)}
                          </li>
                        ))}
                      </ul>
                      {c.caseId && (
                        <Link
                          to={`/projects/${c.caseId}`}
                          className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900 hover:text-amber-700 transition-colors"
                        >
                          {isAr ? "اقرأ دراسة الحالة" : "Read the case study"}
                          <Icon name="arrow" className="w-3.5 h-3.5 rtl:-scale-x-100" strokeWidth={2} />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TECHNICAL FOCUS ============ */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-amber-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "التركيز التقني" : "Technical Focus"}</span>
          </Reveal>
          <Reveal line as="h2" delay={80}>
            <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "المجالات التي أعمل فيها يوميًا." : "The areas I work in daily."}</span>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-ink-900/10 border border-ink-900/10">
            {FOCUS.map((f, i) => (
              <Reveal key={f} delay={(i % 4) * 50}>
                <div className="bg-paper-50 px-5 py-4 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-amber-500 rotate-45 shrink-0" aria-hidden="true" />
                  <span className="font-display text-[14.5px] font-semibold text-ink-900">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROFESSIONAL APPROACH ============ */}
      <section className="bg-paper-100 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-amber-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "طريقة عملي" : "Professional Approach"}</span>
          </Reveal>
          <Reveal line as="h2" delay={80}>
            <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "كيف أعمل." : "How I work."}</span>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
            {APPROACH.map((a, i) => (
              <Reveal key={a.title.en} delay={(i % 3) * 70}>
                <div>
                  <span className="text-amber-600"><Icon name={a.icon} className="w-6 h-6" /></span>
                  <h3 className="mt-3 font-display text-[17px] font-bold text-ink-900">{L(a.title)}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist-500">{L(a.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOOLS & TECHNOLOGIES ============ */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-amber-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "الأدوات والتقنيات" : "Tools & Technologies"}</span>
          </Reveal>
          <Reveal line as="h2" delay={80}>
            <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "ما عملت به فعلًا." : "What I have actually worked with."}</span>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-9">
            {TECH_GROUPS.map((g, i) => (
              <Reveal key={g.name.en} delay={(i % 3) * 70}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 mb-3.5">{L(g.name)}</p>
                <ul className="space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] text-ink-800" dir="ltr">
                      <span className="w-1 h-1 bg-amber-500 rotate-45 shrink-0" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal delay={140}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 mb-3.5">{isAr ? "التعليم واللغات" : "Education & Languages"}</p>
              <p className="text-[14px] text-ink-800">{L(EDUCATION)}</p>
              <ul className="mt-3 space-y-2">
                {LANGUAGES.map((l) => (
                  <li key={l.en} className="flex items-center gap-2.5 text-[14px] text-ink-800">
                    <span className="w-1 h-1 bg-amber-500 rotate-45 shrink-0" aria-hidden="true" />{L(l)}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 mt-7 mb-3.5">{isAr ? "التأهيل" : "Training"}</p>
              <ul className="space-y-2">
                {CERTS.map((ct) => (
                  <li key={ct.en} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-mist-500">
                    <span className="w-1 h-1 bg-amber-500 rotate-45 mt-2 shrink-0" aria-hidden="true" />{L(ct)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}
