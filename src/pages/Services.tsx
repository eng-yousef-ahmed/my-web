import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { FAQS, SERVICE_CATEGORIES, STEPS } from "../data/content";
import { Btn, FaqList, Icon, PageHero, Reveal, SectionHeading } from "../components/kit";
import { IMAGES } from "../config";

export default function Services() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "خدماتنا | TECH OF THE WORLD — خدمات تقنية معلومات في السعودية ومصر" : "IT Services | TECH OF THE WORLD — IT Support, Infrastructure, Networks, Microsoft & Cloud, Security",
    "Five accountable service lines: IT & Infrastructure, Networks, Microsoft & Cloud, Security Systems and IT Consultancy — delivered remote and on-site in Saudi Arabia and Egypt."
  );
  const [active, setActive] = useState(SERVICE_CATEGORIES[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    SERVICE_CATEGORIES.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <PageHero
        kicker={isAr ? "خدماتنا" : "Services"}
        title={{ en: "Every layer of your IT, owned by one team.", ar: "كل طبقات تقنيتك، في عهدة فريق واحد." }}
        lead={{
          en: "From the cable in the wall to the cloud tenant your teams live in — five service lines that fit together as one accountable environment.",
          ar: "من الكابل في الجدار حتى المستأجر السحابي الذي تعمل عليه فرقك — خمسة مسارات خدمية تتكامل كبيئة واحدة مسؤولة.",
        }}
        image={IMAGES.rack}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
        <Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn>
      </PageHero>

      {/* sticky index + categories */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist-500 mb-5">{isAr ? "المسارات" : "Index"}</p>
              <nav className="border-s-2 border-ink-900/10 flex flex-col" aria-label="Service categories">
                {SERVICE_CATEGORIES.map((c, i) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className={`py-3 ps-5 font-display text-[15px] font-semibold transition-all relative ${
                      active === c.id ? "text-amber-600" : "text-mist-500 hover:text-ink-900"
                    }`}
                  >
                    <span className={`absolute start-[-2px] top-0 bottom-0 w-[2px] bg-amber-500 transition-transform origin-top ${active === c.id ? "scale-y-100" : "scale-y-0"}`} aria-hidden="true" />
                    <span className="font-mono text-[11px] text-amber-600 me-2">0{i + 1}</span>
                    {L(c.name)}
                  </a>
                ))}
              </nav>
              <div className="mt-10 chamfer-sm bg-ink-900 text-paper-50 p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-amber-500 mb-3">{isAr ? "لست متأكدًا؟" : "Not sure where to start?"}</p>
                <p className="text-[14px] text-mist-300 leading-relaxed">
                  {isAr ? "اطلب تقييمًا أوليًا وسنحدد معك المسار الصحيح." : "Request an initial assessment and we'll map the right line together."}
                </p>
                <Btn to="/request" className="mt-5 w-full justify-center !px-4 !py-3">{t("cta.assessment")}</Btn>
              </div>
            </div>
          </aside>

          <div className="space-y-14">
            {SERVICE_CATEGORIES.map((c, i) => (
              <article key={c.id} id={c.id} className="scroll-mt-32">
                <Reveal className="flex items-center gap-5 mb-6">
                  <span className="w-14 h-14 shrink-0 grid place-items-center bg-ink-900 text-amber-500 chamfer-sm">
                    <Icon name={c.icon} className="w-7 h-7" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-600">{isAr ? "مسار" : "Line"} 0{i + 1}</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">{L(c.name)}</h2>
                  </div>
                </Reveal>
                <div className="grid md:grid-cols-[1fr_0.85fr] gap-8">
                  <Reveal delay={80}>
                    <p className="font-display text-lg font-semibold text-ink-800 leading-snug">{L(c.tagline)}</p>
                    <p className="mt-4 text-mist-500 leading-relaxed text-[15px]">{L(c.value)}</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Btn to={`/request?service=${c.id}`} className="!px-5 !py-3 !text-[12px]">{t("nav.request")}</Btn>
                      <Btn to="/contact" variant="outlineLight" className="!px-5 !py-3 !text-[12px]">{t("cta.talkSpecialist")}</Btn>
                    </div>
                  </Reveal>
                  <Reveal delay={160}>
                    <ul className="chamfer-sm bg-paper-50 border border-ink-900/10 divide-y divide-ink-900/8">
                      {c.items.map((item) => (
                        <li key={item.en} className="flex items-center gap-3.5 px-5 py-3.5 text-[14.5px] font-medium text-ink-800 group hover:bg-ink-900 hover:text-paper-50 transition-colors duration-300">
                          <Icon name="check" className="w-4 h-4 text-amber-600 group-hover:text-amber-400 shrink-0" strokeWidth={2.2} />
                          {L(item)}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* process recap */}
      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <SectionHeading
            kicker={isAr ? "المنهجية" : "Delivery Method"}
            tone="light"
            title={{ en: "How every engagement runs.", ar: "كيف يُدار كل عمل." }}
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="group relative chamfer-sm border border-ink-700 bg-ink-900 p-6 h-full hover:border-amber-500/70 transition-colors">
                  <p className="font-display text-3xl font-bold text-amber-500/90">{s.n}</p>
                  <h3 className="mt-3 font-display font-bold">{L(s.title)}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-mist-400">{L(s.body)}</p>
                  {i < STEPS.length - 1 && (
                    <Icon name="arrow" className="hidden md:block absolute top-1/2 -end-4 w-4 h-4 text-amber-500/70 rtl:-scale-x-100" aria-hidden="true" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <SectionHeading
              kicker="FAQ"
              tone="dark"
              title={{ en: "Straight answers, before you ask.", ar: "إجابات صريحة قبل أن تسأل." }}
            />
            <Btn to="/request" variant="dark" className="mt-8">{t("nav.request")}</Btn>
          </div>
          <Reveal delay={120}>
            <FaqList faqs={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* closing CTA */}
      <section className="bg-ink-900 text-paper-50 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{t("misc.shareIdea")}</h2>
            <p className="mt-2 text-mist-300 max-w-xl">{t("misc.shareIdeaBody")}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Btn to="/request">{t("nav.request")}</Btn>
            <Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
