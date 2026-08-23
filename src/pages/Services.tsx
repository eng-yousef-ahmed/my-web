import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { SERVICE_CATEGORIES, SERVICE_TECH } from "../data/content";
import { Btn, Icon, PageHero, Reveal } from "../components/kit";

export default function Services() {
  const { L, isAr } = useLang();
  usePageMeta(
    isAr ? "خدماتي | TECH OF THE WORLD" : "My Services | TECH OF THE WORLD",
    isAr
      ? "خمسة مجالات أعمل بها: البنية التحتية، الشبكات، مايكروسوفت والسحابة، أنظمة الأمن، والاستشارات التقنية."
      : "Five areas I work with: IT & Infrastructure, Networks, Microsoft & Cloud, Security Systems and IT Consultancy."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "خدماتي" : "My Services"}
        title={{
          en: "What I work with.",
          ar: "ما أعمل به.",
        }}
        lead={{
          en: "Five areas that fit together as one accountable environment, from the cable in the wall to the cloud tenant your teams live in.",
          ar: "خمسة مجالات تتكامل كبيئة واحدة مسؤولة، من الكابل في الجدار حتى المستأجر السحابي الذي تعمل عليه فرقك.",
        }}
      />

      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[240px_1fr] gap-12">
          {/* index */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1" aria-label={isAr ? "مسارات الخدمات" : "Service lines"}>
              {SERVICE_CATEGORIES.map((c, i) => (
                <a
                  key={c.id}
                  href={`#/services#${c.id}`}
                  className="group flex items-baseline gap-3 py-2.5 border-b border-ink-900/10 hover:border-amber-600/50 transition-colors"
                >
                  <span className="font-mono text-[11px] text-amber-700">0{i + 1}</span>
                  <span className="font-display text-[13.5px] font-semibold text-mist-500 group-hover:text-ink-900 transition-colors">{L(c.name)}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* services */}
          <div className="space-y-16">
            {SERVICE_CATEGORIES.map((c, i) => (
              <Reveal key={c.id}>
                <article id={c.id} className="scroll-mt-28">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[13px] text-amber-700 mt-1.5">0{i + 1}</span>
                    <span className="text-amber-600 mt-0.5"><Icon name={c.icon} className="w-7 h-7" /></span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-2xl font-bold text-ink-900">{L(c.name)}</h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-mist-500 max-w-2xl">{L(c.value)}</p>

                      <div className="mt-7 grid md:grid-cols-[1fr_260px] gap-8">
                        <div>
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 mb-3.5">
                            {isAr ? "كيف أساعد" : "What I can help with"}
                          </p>
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                            {c.items.map((it) => (
                              <li key={it.en} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-800">
                                <span className="w-1 h-1 bg-amber-500 rotate-45 mt-2 shrink-0" aria-hidden="true" />
                                {L(it)}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 mb-3.5">
                            {isAr ? "تقنيات ذات صلة" : "Relevant technologies"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(SERVICE_TECH[c.id] ?? []).map((tch) => (
                              <span key={tch} className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mist-500 border border-ink-900/15 px-2.5 py-1.5">
                                {tch}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal className="pt-4 border-t border-ink-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-[15px] text-mist-500 max-w-md">
                {isAr
                  ? "غير متأكد أي مسار يناسب حالتك؟ اشرح الموقف وسأقول لك بصدق ما تحتاجه."
                  : "Not sure which line fits your situation? Describe the problem and I will tell you honestly what you need."}
              </p>
              <Btn to="/contact" className="shrink-0">{isAr ? "تواصل معي" : "Contact Me"}</Btn>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
