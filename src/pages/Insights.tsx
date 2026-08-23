import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { ARTICLES } from "../data/insights";
import { Btn, Icon, PageHero, Reveal } from "../components/kit";

export function InsightsList() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "المعرفة | TECH OF THE WORLD | مقالات تقنية للأعمال" : "Insights | TECH OF THE WORLD | Business IT Knowledge",
    "Practical, business-focused IT knowledge: Active Directory, Microsoft 365, Wi-Fi planning, CCTV design, preventive maintenance and site-to-site VPN."
  );
  return (
    <>
      <PageHero
        kicker={isAr ? "المعرفة" : "Insights"}
        title={{ en: "IT knowledge, written for decision makers.", ar: "معرفة تقنية كُتبت لصنّاع القرار." }}
        lead={{
          en: "Short, practical reads on the systems your business runs on. No vendor hype, no invented statistics, just what actually matters when you decide.",
          ar: "قراءات قصيرة عملية عن الأنظمة التي يقوم عليها عملك. بلا ترويج ولا إحصاءات مخترعة، فقط ما يهم فعلًا عند اتخاذ القرار.",
        }}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
      </PageHero>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 90}>
                <Link to={`/insights/${a.slug}`} className="group block chamfer-sm bg-paper-50 border border-ink-900/12 p-7 card-lift hover:border-ink-900/40 hover:shadow-[0_24px_60px_-30px_rgba(10,20,32,0.4)] h-full">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-600 border border-amber-600/30 px-2.5 py-1">{L(a.cat)}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-mist-500"><Icon name="clock" className="w-3.5 h-3.5" />{a.minutes} {t("common.minRead")}</span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold leading-snug group-hover:text-amber-600 transition-colors">{L(a.title)}</h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-mist-500 line-clamp-3">{L(a.excerpt)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] group-hover:gap-3.5 transition-all">
                    {isAr ? "اقرأ المقال" : "Read article"}
                    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            {isAr ? "تفضّل تطبيقًا على القراءة؟" : "Prefer applying over reading?"}
          </h2>
          <p className="mt-3 text-mist-300">{t("misc.shareIdeaBody")}</p>
          <Btn to="/request" className="mt-8">{t("nav.request")}</Btn>
        </div>
      </section>
    </>
  );
}

export function InsightDetail() {
  const { slug } = useParams();
  const { L, t, isAr } = useLang();
  const a = ARTICLES.find((x) => x.slug === slug) ?? null;
  usePageMeta(a ? `${L(a.title)} | TECH OF THE WORLD` : "Insights | TECH OF THE WORLD", a ? L(a.excerpt) : "Business IT knowledge by TECH OF THE WORLD.");

  if (!a) {
    return (
      <section className="min-h-[70vh] bg-ink-950 text-paper-50 grid place-items-center pt-32">
        <div className="text-center">
          <p className="font-mono text-amber-500 text-sm uppercase tracking-[0.3em]">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">{isAr ? "المقال غير موجود." : "Article not found."}</h1>
          <Btn to="/insights" className="mt-8" arrow={false}>{t("cta.backToInsights")}</Btn>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-14 lg:pt-40">
          <Reveal>
            <Link to="/insights" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist-400 hover:text-amber-400 transition-colors">
              <Icon name="arrow" className="w-4 h-4 -scale-x-100 rtl:scale-x-100" /> {t("cta.backToInsights")}
            </Link>
          </Reveal>
          <Reveal className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400 border border-amber-500/50 px-3 py-1.5">{L(a.cat)}</span>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400"><Icon name="clock" className="w-4 h-4" />{a.minutes} {t("common.minRead")}</span>
          </Reveal>
          <Reveal line as="h1" delay={120} className="mt-6">
            <span className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.12]">{L(a.title)}</span>
          </Reveal>
          <Reveal as="p" delay={220} className="mt-6 text-mist-300 leading-relaxed text-[17px] max-w-2xl">{L(a.excerpt)}</Reveal>
        </div>
      </header>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
          <div className="space-y-7">
            {a.body.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 60} className="text-[16.5px] leading-[1.95] text-ink-800">
                {L(p)}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="chamfer bg-ink-900 text-paper-50 p-8">
              <h2 className="font-display text-lg font-bold flex items-center gap-3">
                <Icon name="bolt" className="w-5 h-5 text-amber-500" />
                {isAr ? "الخلاصة" : "Key takeaways"}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {a.takeaways.map((tk) => (
                  <li key={tk.en} className="flex gap-3 items-start text-[14.5px] text-mist-200 leading-relaxed">
                    <Icon name="check" className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.2} />{L(tk)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-12 chamfer-sm bg-amber-500 text-ink-950 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-xl font-bold">{isAr ? "هل ينطبق هذا على بيئتك؟" : "Does this apply to your environment?"}</h2>
              <p className="mt-1.5 text-[14.5px] font-medium">{t("misc.shareIdeaBody")}</p>
            </div>
            <Btn to="/request" variant="dark" className="shrink-0 !py-3">{t("nav.request")}</Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
