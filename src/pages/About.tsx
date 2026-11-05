import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import ROUTE_META from "../data/route-meta.json";
import { CAREER, CERTIFICATIONS, EDUCATION, LANGUAGES, TECH_GROUPS, WHY_US } from "../data/content";
import { CERTIFICATES, CERTIFICATE_PDFS, formatIssued } from "../data/certificates";
import { FlagEG, FlagSA, Icon, PageHero, Reveal } from "../components/kit";

export default function About() {
  const { isAr, L } = useLang();
  const meta = ROUTE_META["/about"];
  usePageMeta(isAr ? meta.title.ar : meta.title.en, isAr ? meta.description.ar : meta.description.en);

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
              {isAr ? "أسلوب العمل" : "How I Work"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "كيف أعمل مع عملائي." : "How I work with clients."}
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-400">{L(g.name)}</p>
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

      {/* credentials: verified certificates, then education, languages, development */}
      <section id="certifications" className="bg-paper-100 text-ink-900 grid-bg-light scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 lg:pt-20">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-kicker">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {isAr ? "الشهادات" : "Certifications"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "شهادات موثّقة يمكن التحقق منها." : "Verified credentials you can check."}
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-mist-500">
              {isAr
                ? "شهادات إتمام من Cisco Networking Academy (مستوى طالب)، ولكل واحدة بادج رسمي على Credly برابط تحقق."
                : "Course-completion certificates from Cisco Networking Academy (student level). Each has an official Credly badge with a public verification link."}
            </p>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} className="h-full">
                <article className="h-full flex flex-col bg-paper-50 border border-ink-900/10 p-6 card-lift hover:border-ink-900/30">
                  <div className="flex items-start gap-4">
                    <img src={c.badge} alt="" width={72} height={72} loading="lazy" className="w-[72px] h-[72px] shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-bold leading-snug">{L(c.title)}</h3>
                      <p className="mt-1 text-[13px] text-mist-500">{L(c.issuer)}</p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-700">{formatIssued(c.issued, isAr)}</p>
                      <p className="mt-0.5 text-[12px] text-mist-500">{L(c.level)}</p>
                    </div>
                  </div>
                  <details className="group/d mt-5 flex-1">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-[12.5px] font-semibold text-ink-900 hover:text-amber-700 [&::-webkit-details-marker]:hidden">
                      <Icon name="arrow" className="w-3.5 h-3.5 transition-transform group-open/d:rotate-90 rtl:-scale-x-100 rtl:group-open/d:rotate-90" strokeWidth={2.2} />
                      {isAr ? "ما تغطيه الدورة" : "What it covers"}
                    </summary>
                    <ul className="mt-3 space-y-2">
                      {c.skills.map((sk) => (
                        <li key={sk.en} className="flex gap-2.5 text-[13px] leading-relaxed text-mist-500">
                          <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" strokeWidth={2.2} />
                          {L(sk)}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink-900/10 pt-4">
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors"
                    >
                      {isAr ? "تحقق من الشهادة" : "Verify credential"}
                      <Icon name="external" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <h3 className="font-display text-xl font-bold">{isAr ? "ملفات الشهادات الأصلية" : "Original certificate files"}</h3>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-mist-500">
              {isAr
                ? "الشهادات الأصلية الصادرة من Cisco Networking Academy، وعلى كل منها رقم شهادة. اثنتان منها لامتحان المسار، والباقي لإتمام الدورة."
                : "The original Cisco Networking Academy certificates, each with its certificate ID. Two are for the career-path exams; the rest are for course completion."}
            </p>
          </Reveal>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATE_PDFS.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} className="h-full">
                <article className="h-full flex flex-col bg-paper-50 border border-ink-900/10 p-6 card-lift hover:border-ink-900/30">
                  <h4 className="font-display text-[17px] font-bold leading-snug">{L(c.title)}</h4>
                  <p className="mt-1 text-[13px] text-mist-500">
                    {c.kind === "exam" ? (isAr ? "شهادة امتحان المسار" : "Pathway exam certificate") : (isAr ? "شهادة إتمام دورة" : "Course-completion certificate")}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-700">{formatIssued(c.issued, isAr)}</p>
                  <p className="mt-3 text-[12px] text-mist-500">{isAr ? "رقم الشهادة" : "Cert ID"}</p>
                  <p dir="ltr" className="mt-0.5 break-all font-mono text-[11px] text-ink-900 rtl:text-right">{c.certId}</p>
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 border-t border-ink-900/10 pt-4 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors"
                  >
                    {isAr ? "عرض الشهادة (PDF)" : "View certificate (PDF)"}
                    <Icon name="external" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

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
