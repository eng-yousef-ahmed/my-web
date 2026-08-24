import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { SERVICE_CATEGORIES } from "../data/content";
import { Icon, PageHero, Reveal } from "../components/kit";

export default function Services() {
  const { isAr, L, t } = useLang();
  usePageMeta(
    isAr ? "خدماتي | يوسف أحمد — TECH OF THE WORLD" : "My Services | Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "خمسة مسارات: البنية التحتية، الشبكات، مايكروسوفت والسحابة، أنظمة الأمن، والاستشارات التقنية."
      : "Five service lines: IT & Infrastructure, Networks, Microsoft & Cloud, Security Systems and IT Consultancy."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "خدماتي" : "My Services"}
        title={{
          en: "What I can professionally provide.",
          ar: "ما أستطيع تقديمه باحتراف.",
        }}
        lead={{
          en: "Five lines that fit together as one accountable environment, from the cable in the wall to the cloud tenant your teams live in.",
          ar: "خمسة مسارات تتكامل كبيئة واحدة مسؤولة، من الكابل في الجدار حتى المستأجر السحابي الذي تعمل عليه فرقك.",
        }}
      />

      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-14">
          {/* sticky index (desktop) + sections */}
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-14 items-start">
            <nav className="hidden lg:block sticky top-28 border-s border-ink-700" aria-label={isAr ? "مسارات الخدمات" : "Service lines"}>
              {SERVICE_CATEGORIES.map((c, i) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="group flex items-center gap-3 py-3.5 ps-5 font-display text-[13.5px] font-semibold text-mist-400 hover:text-amber-400 transition-colors"
                >
                  <span className="font-mono text-[10.5px] text-mist-500 group-hover:text-amber-500 transition-colors">0{i + 1}</span>
                  {L(c.name)}
                </a>
              ))}
            </nav>

            <div className="space-y-16">
              {SERVICE_CATEGORIES.map((c, i) => (
                <Reveal key={c.id} as="section" className="scroll-mt-28">
                  <div id={c.id} className="border border-ink-700 bg-ink-900">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5">
                        <span className="grid place-items-center w-13 h-13 shrink-0 border border-ink-600 text-amber-400" style={{ width: "3.25rem", height: "3.25rem" }}>
                          <Icon name={c.icon} className="w-6 h-6" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-amber-500">
                            0{i + 1} — {L(c.name)}
                          </p>
                          <h2 className="mt-2 font-display text-2xl font-bold leading-snug">{L(c.tagline)}</h2>
                          <p className="mt-3.5 text-[14.5px] leading-relaxed text-mist-300 max-w-2xl">{L(c.value)}</p>
                        </div>
                      </div>

                      <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-ink-700 pt-6">
                        {c.items.map((it) => (
                          <p key={it.en} className="flex gap-3 text-[13.5px] text-mist-300">
                            <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" strokeWidth={2.2} />
                            {L(it)}
                          </p>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink-700 pt-5">
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-mist-500 me-2">
                          {isAr ? "أدوات" : "Tooling"}
                        </span>
                        {c.tech.map((tech) => (
                          <span key={tech} className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-circuit-300 border border-ink-600 px-2.5 py-1.5" dir="ltr">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* the single, quiet contact line */}
              <Reveal className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 pt-8">
                <p className="text-[14px] text-mist-400">
                  {isAr ? "مش متأكد أنهي مسار يناسب حالتك؟" : "Not sure which line fits your situation?"}
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {t("cta.contactMe")}
                  <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
