import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { CAREER, CERTIFICATIONS, EDUCATION, FOCUS_AREAS, FOUNDER_METRICS, LANGUAGES, TECH_GROUPS, WHY_US } from "../data/content";
import { FlagEG, FlagSA, Icon, PageHero, Reveal } from "../components/kit";

export default function About() {
  const { isAr, L } = useLang();
  usePageMeta(
    isAr ? "عني | يوسف أحمد — TECH OF THE WORLD" : "About | Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "قصة يوسف أحمد المهنية: +9 سنوات في الدعم التقني والبنية التحتية والشبكات ومايكروسوفت وأنظمة الأمن في السعودية ومصر."
      : "The professional story of Yousef Ahmed: 9+ years in IT support, infrastructure, networks, Microsoft and security systems across Saudi Arabia and Egypt."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "عني" : "About Me"}
        title={{
          en: "Real experience, earned in real environments.",
          ar: "خبرة حقيقية، اكتُسبت في بيئات عمل حقيقية.",
        }}
        lead={{
          en: "I'm Yousef Ahmed, a Senior IT Support Specialist. For over 9 years I've kept businesses running: supporting users, building infrastructure, administering Microsoft environments and installing the security systems operations depend on.",
          ar: "أنا يوسف أحمد، أخصائي دعم تقني أول. لأكثر من 9 سنوات أبقيت الأعمال تعمل: دعم المستخدمين، وبناء البنية التحتية، وإدارة بيئات مايكروسوفت، وتركيب أنظمة الأمن التي تعتمد عليها العمليات.",
        }}
      />

      {/* metrics — verified numbers only */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/15 border border-ink-900/15">
            {FOUNDER_METRICS.map((m, i) => (
              <Reveal key={m.label.en} delay={i * 80} className="bg-paper-100 p-7">
                <p className="font-display text-4xl font-bold text-ink-900">{m.value}</p>
                <p className="mt-2 text-[13px] text-mist-500">{L(m.label)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* career timeline */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {isAr ? "المسيرة المهنية" : "Experience"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "من الإسكندرية إلى جدة." : "From Alexandria to Jeddah."}
            </h2>
          </Reveal>

          <div className="mt-12 border-s border-ink-700 ms-3 space-y-10">
            {CAREER.map((c, i) => (
              <Reveal key={c.company.en} delay={i * 80} as="div" className="relative ps-8">
                <span className="absolute -start-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-ink-950" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="inline-flex items-center gap-2">{c.market === "sa" ? <FlagSA className="w-5 h-5" /> : <FlagEG className="w-5 h-5" />}</span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-400" dir="ltr">
                    {L(c.period)}
                  </p>
                </div>
                <h3 className="mt-2.5 font-display text-xl font-bold">{L(c.role)}</h3>
                <p className="mt-1 text-[14px] text-mist-300">
                  {L(c.company)}
                  {c.project && <> · {L(c.project)}</>} — {L(c.location)}
                </p>
                <ul className="mt-3.5 space-y-2">
                  {c.points.map((p) => (
                    <li key={p.en} className="flex gap-3 text-[13.5px] leading-relaxed text-mist-400">
                      <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" strokeWidth={2.2} />
                      {L(p)}
                    </li>
                  ))}
                </ul>
                {c.caseId && (
                  <Link
                    to={`/projects/${c.caseId}`}
                    className="group mt-4 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {isAr ? "اقرأ دراسة الحالة" : "Read the case study"}
                    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* technical focus */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-kicker">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {isAr ? "مجالات التركيز" : "Technical Focus"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "ما أتقنه فعلًا." : "What I actually know."}
            </h2>
          </Reveal>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {FOCUS_AREAS.map((f, i) => (
              <Reveal key={f.en} delay={(i % 6) * 50}>
                <span className="inline-block border border-ink-900/15 bg-paper-50 px-4 py-2.5 text-[13.5px] font-medium text-ink-800">
                  {L(f)}
                </span>
              </Reveal>
            ))}
          </div>

          {/* approach */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title.en} delay={(i % 3) * 80}>
                <div className="h-full bg-paper-50 border border-ink-900/10 p-6 card-lift hover:border-ink-900/30">
                  <Icon name={w.icon} className="w-6 h-6 text-amber-600" />
                  <h3 className="mt-4 font-display text-[17px] font-bold">{L(w.title)}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist-500">{L(w.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* tools & technologies */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {isAr ? "الأدوات والتقنيات" : "Tools & Technologies"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "أدوات عملتُ بها في الميدان." : "Tools I've shipped with."}
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-700 border border-ink-700">
            {TECH_GROUPS.map((g, i) => (
              <Reveal key={g.name.en} delay={i * 60} className="bg-ink-900 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400">{L(g.name)}</p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-[13px] text-mist-300" dir="ltr">
                      <span className="w-1 h-1 bg-amber-500" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 font-mono text-[11.5px] text-mist-500">
            {isAr
              ? "* خبرة عملية موثقة. لا ندّعي شراكات أو شهادات رسمية غير ممنوحة."
              : "* Verified hands-on experience. No partnership or certification claims unless formally granted."}
          </Reveal>
        </div>
      </section>

      {/* education, languages, development */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-3 gap-10">
          <Reveal>
            <h2 className="font-display text-xl font-bold">{isAr ? "التعليم" : "Education"}</h2>
            <ul className="mt-4 space-y-2.5">
              {EDUCATION.map((e) => (
                <li key={e.en} className="flex gap-3 text-[14px] text-mist-500">
                  <Icon name="doc" className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
                  {L(e)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-xl font-bold">{isAr ? "اللغات" : "Languages"}</h2>
            <ul className="mt-4 space-y-2.5">
              {LANGUAGES.map((l) => (
                <li key={l.en} className="flex gap-3 text-[14px] text-mist-500">
                  <Icon name="globe" className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
                  {L(l)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160}>
            <h2 className="font-display text-xl font-bold">{isAr ? "التطوير المستمر" : "Continuous Development"}</h2>
            <ul className="mt-4 space-y-2.5">
              {CERTIFICATIONS.map((c) => (
                <li key={c.en} className="flex gap-3 text-[13.5px] text-mist-500">
                  <Icon name="check" className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" strokeWidth={2.2} />
                  {L(c)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
