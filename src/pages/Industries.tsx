import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { EXTRA_INDUSTRIES, INDUSTRIES, SERVICE_CATEGORIES } from "../data/content";
import { Btn, Icon, PageHero, Reveal } from "../components/kit";

export default function Industries() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "القطاعات | TECH OF THE WORLD — حلول تقنية لكل قطاع" : "Industries | TECH OF THE WORLD — IT solutions for construction, hospitality, healthcare, retail & logistics",
    "IT problems are industry-shaped. See how TECH OF THE WORLD supports construction, hospitality, healthcare, retail, offices and logistics businesses in Saudi Arabia and Egypt."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "القطاعات" : "Industries"}
        title={{ en: "IT problems wear industry uniforms.", ar: "مشكلات التقنية ترتدي زيّ كل قطاع." }}
        lead={{
          en: "A hotel's Wi-Fi problem is not a warehouse's connectivity problem. We speak each industry's operational language — and bring the right infrastructure answers.",
          ar: "مشكلة الواي فاي في الفندق ليست مشكلة الاتصال في المستودع. نتحدث لغة التشغيل الخاصة بكل قطاع — ونقدم إجابات البنية التحتية المناسبة له.",
        }}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
      </PageHero>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 space-y-10">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name.en} delay={60}>
              <article className={`chamfer bg-paper-50 border border-ink-900/10 p-8 lg:p-10 grid lg:grid-cols-[300px_1fr] gap-8 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`} id={`ind-${i}`}>
                <div className="lg:[direction:ltr]">
                  <span className="w-14 h-14 grid place-items-center bg-ink-900 text-amber-500 chamfer-sm">
                    <Icon name={ind.icon} className="w-7 h-7" />
                  </span>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-amber-600">{isAr ? "قطاع" : "Sector"} 0{i + 1}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug">{L(ind.name)}</h2>
                  <Btn
                    to={`/request?context=${encodeURIComponent("industry:" + L(ind.name))}`}
                    className="mt-6 !px-5 !py-3 !text-[12px]"
                  >
                    {t("nav.request")}
                  </Btn>
                </div>
                <div className="lg:[direction:ltr] grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist-500 mb-4 flex items-center gap-2">
                      <Icon name="alert" className="w-4 h-4 text-amber-600" />
                      {isAr ? "التحديات الشائعة" : "Common IT problems"}
                    </h3>
                    <ul className="space-y-3">
                      {ind.problems.map((p) => (
                        <li key={p.en} className="flex gap-3 items-start text-[14.5px] leading-relaxed text-mist-500">
                          <span className="mt-2 w-1.5 h-1.5 bg-red-400 shrink-0" aria-hidden="true" />{L(p)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="chamfer-sm bg-ink-900 text-paper-50 p-6">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-500 mb-4 flex items-center gap-2">
                      <Icon name="check" className="w-4 h-4" strokeWidth={2.2} />
                      {isAr ? "كيف نساعد" : "How we help"}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-mist-200">{L(ind.help)}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal className="flex flex-wrap items-center gap-3 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist-500 me-2">{isAr ? "قطاعات أخرى نخدمها:" : "Also serving:"}</span>
            {EXTRA_INDUSTRIES.map((x) => (
              <span key={x.en} className="font-display text-[13.5px] font-semibold border border-ink-900/15 px-4 py-2 bg-paper-50">{L(x)}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* which line fits */}
      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-4">{isAr ? "أي مسار يناسبك؟" : "Which line fits?"}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "معظم القطاعات تحتاج مزيجًا — وهذا تحديدًا ما نبنيه." : "Most industries need a mix — that is precisely what we build."}
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICE_CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <a href={`#/services#${c.id}`} onClick={(e) => { e.preventDefault(); window.location.hash = `#/services#${c.id}`; }} className="group block chamfer-sm border border-ink-700 bg-ink-900 p-6 card-lift hover:border-amber-500/60 h-full">
                  <Icon name={c.icon} className="w-6 h-6 text-amber-500" />
                  <p className="mt-4 font-display font-bold text-[15px] leading-snug group-hover:text-amber-400 transition-colors">{L(c.name)}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Btn to="/request">{t("cta.assessment")}</Btn>
            <Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
