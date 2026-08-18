import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { CASES, MARKET_LABEL, type CaseStudy } from "../data/cases";
import { SERVICE_CATEGORIES } from "../data/content";
import { Btn, Icon, PageHero, Reveal, SectionHeading, useInView } from "../components/kit";
import { hasWhatsApp, waLink, IMAGES } from "../config";

const PATTERNS = ["M0 26 26 0", "M13 0v26M0 13h26", "M0 0 26 26", "M13 0 26 13 13 26 0 13Z"];

function CaseArt({ c, index, tall = false }: { c: CaseStudy; index: number; tall?: boolean }) {
  const p = PATTERNS[index % PATTERNS.length];
  return (
    <svg viewBox="0 0 400 150" className={`w-full ${tall ? "h-44" : "h-36"} bg-ink-900`} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`cp-${c.id}-${tall}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d={p} stroke="#16283c" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect width="400" height="150" fill="#0a1420" />
      <rect width="400" height="150" fill={`url(#cp-${c.id}-${tall})`} />
      <circle cx="340" cy="34" r="60" fill="none" stroke="#1f344c" />
      <circle cx="340" cy="34" r="38" fill="none" stroke="#E9A33B" strokeOpacity="0.55" strokeDasharray="4 6" />
      <rect x="24" y="96" width="46" height="4" fill="#E9A33B" />
      <text x="24" y="52" fontFamily="Space Grotesk, Almarai, sans-serif" fontWeight="700" fontSize="30" fill="#f3f6f5">
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x="24" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#7e93a6">CASE STUDY — YA</text>
    </svg>
  );
}

/* ---------------- list page ---------------- */
export function ProjectsList() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "المشاريع ودراسات الحالة | TECH OF THE WORLD" : "Projects & Case Studies | TECH OF THE WORLD",
    "Real IT infrastructure engagements documented as case studies — networks, data centers, CCTV command centers, Microsoft environments and support operations across Saudi Arabia and Egypt."
  );
  const [market, setMarket] = useState<"all" | "sa" | "eg" | "both">("all");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () =>
      CASES.filter(
        (c) =>
          (market === "all" || c.market === market) &&
          (cat === "all" || c.catIds.includes(cat))
      ),
    [market, cat]
  );

  const filterBtn = (on: boolean) =>
    `px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] border transition-all cursor-pointer ${
      on ? "bg-amber-500 border-amber-500 text-ink-950 font-semibold" : "border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400"
    }`;

  return (
    <>
      <PageHero
        kicker={isAr ? "المشاريع" : "Projects"}
        title={{ en: "Case studies, not showcase cards.", ar: "دراسات حالة، لا بطاقات استعراضية." }}
        lead={{
          en: "Eight documented engagements across Saudi Arabia and Egypt — presented with their challenges, decisions and outcomes. Client names and commercial details remain confidential.",
          ar: "ثمانية أعمال موثقة في السعودية ومصر — تُعرض بتحدياتها وقراراتها ونتائجها، مع بقاء أسماء العملاء والتفاصيل التجارية سرية.",
        }}
        image={IMAGES.ops}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
      </PageHero>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2.5" role="group" aria-label={isAr ? "تصفية حسب السوق" : "Filter by market"}>
              {([["all", t("common.all")], ["sa", "Saudi Arabia"], ["eg", "Egypt"], ["both", isAr ? "السعودية ومصر" : "SA & Egypt"]] as const).map(([v, label]) => (
                <button key={v} onClick={() => setMarket(v)} className={filterBtn(market === v)} aria-pressed={market === v}>{label}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label={isAr ? "تصفية حسب المسار" : "Filter by service line"}>
              <button onClick={() => setCat("all")} className={filterBtn(cat === "all")} aria-pressed={cat === "all"}>{t("common.all")}</button>
              {SERVICE_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} className={filterBtn(cat === c.id)} aria-pressed={cat === c.id}>{L(c.name)}</button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((c, i) => {
              const gi = CASES.indexOf(c);
              return (
                <Reveal key={c.id} delay={(i % 2) * 90}>
                  <Link to={`/projects/${c.id}`} className="group block chamfer-sm bg-paper-50 border border-ink-900/12 card-lift hover:border-ink-900/40 hover:shadow-[0_24px_60px_-30px_rgba(10,20,32,0.45)] h-full overflow-hidden">
                    <div className="relative overflow-hidden border-b border-ink-900/10">
                      <div className="transition-transform duration-700 group-hover:scale-[1.04]"><CaseArt c={c} index={gi} /></div>
                      <span className="absolute top-3 end-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-ink-950/85 text-amber-400 px-2.5 py-1 border border-ink-600">
                        {L(MARKET_LABEL[c.market])}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500">{L(c.sector)}</p>
                      <h3 className="mt-2.5 font-display text-[21px] font-bold leading-snug group-hover:text-amber-600 transition-colors">{L(c.title)}</h3>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-mist-500 line-clamp-2">{L(c.summary)}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 bg-ink-900 text-circuit-300">{tech}</span>
                        ))}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] group-hover:gap-3.5 transition-all">
                        {t("cta.readCase")}
                        <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-mist-500 py-16 font-display text-lg">{isAr ? "لا توجد نتائج مطابقة — جرّب تصفية أخرى." : "No matching projects — try another filter."}</p>
          )}
        </div>
      </section>

      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">{t("cta.similarEnv")}</h2>
          <p className="mt-3 text-mist-300 max-w-lg mx-auto">{t("misc.shareIdeaBody")}</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Btn to="/request">{t("nav.request")}</Btn>
            <Btn to="/services" variant="outline">{t("nav.services")}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- detail page ---------------- */
export function ProjectDetail() {
  const { id } = useParams();
  const { L, t, isAr } = useLang();
  const index = CASES.findIndex((c) => c.id === id);
  const c = index >= 0 ? CASES[index] : null;
  const next = c ? CASES[(index + 1) % CASES.length] : null;
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  usePageMeta(
    c ? `${L(c.title)} | TECH OF THE WORLD` : "Projects | TECH OF THE WORLD",
    c ? L(c.summary) : "Case studies by TECH OF THE WORLD."
  );

  if (!c || !next) {
    return (
      <section className="min-h-[70vh] bg-ink-950 text-paper-50 grid place-items-center pt-32">
        <div className="text-center">
          <p className="font-mono text-amber-500 text-sm uppercase tracking-[0.3em]">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">{isAr ? "دراسة الحالة غير موجودة." : "Case study not found."}</h1>
          <Btn to="/projects" className="mt-8" arrow={false}>{t("cta.backToProjects")}</Btn>
        </div>
      </section>
    );
  }

  const wa = waLink(`Hello TECH OF THE WORLD — I read the "${L(c.title)}" case study and have a similar requirement.`);

  return (
    <>
      <header className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-14 lg:pt-40">
          <Reveal>
            <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist-400 hover:text-amber-400 transition-colors">
              <Icon name="arrow" className="w-4 h-4 -scale-x-100 rtl:scale-x-100" /> {t("cta.backToProjects")}
            </Link>
          </Reveal>
          <Reveal className="mt-6 flex flex-wrap gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] border border-amber-500/50 text-amber-400 px-3 py-1.5">{L(MARKET_LABEL[c.market])}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] border border-ink-600 text-mist-300 px-3 py-1.5">{L(c.sector)}</span>
            {c.catIds.map((cid) => {
              const cat = SERVICE_CATEGORIES.find((s) => s.id === cid);
              return cat ? (
                <span key={cid} className="font-mono text-[10.5px] uppercase tracking-[0.2em] border border-ink-600 text-mist-300 px-3 py-1.5">{L(cat.name)}</span>
              ) : null;
            })}
          </Reveal>
          <Reveal line as="h1" delay={120} className="mt-6 max-w-4xl">
            <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08]">{L(c.title)}</span>
          </Reveal>
          <Reveal as="p" delay={220} className="mt-5 max-w-2xl text-mist-300 leading-relaxed text-[16.5px]">{L(c.summary)}</Reveal>
        </div>
      </header>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20 grid lg:grid-cols-[300px_1fr] gap-12">
          <aside className="lg:sticky lg:top-32 self-start space-y-6">
            <div className="chamfer-sm overflow-hidden border border-ink-900/10"><CaseArt c={c} index={index} tall /></div>
            <div className="chamfer-sm bg-ink-900 text-paper-50 p-6 space-y-5">
              {[
                { k: t("common.industry"), v: L(c.sector) },
                { k: t("common.location"), v: L(MARKET_LABEL[c.market]) },
                { k: t("case.role"), v: L(c.role) },
              ].map((row) => (
                <div key={row.k}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500 mb-1.5">{row.k}</p>
                  <p className="text-[14px] leading-relaxed text-mist-200">{row.v}</p>
                </div>
              ))}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500 mb-2.5">{t("case.technologies")}</p>
                <div className="flex flex-wrap gap-2">
                  {c.technologies.map((tech) => (
                    <span key={tech} className="font-mono text-[10.5px] px-2.5 py-1 bg-ink-700 text-circuit-300 border border-ink-600">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-mist-500 border-s-2 border-amber-500 ps-4">{t("case.verifiedNote")}</p>
          </aside>

          <div ref={ref} className="space-y-12 max-w-3xl">
            {[
              { label: t("case.overview"), body: L(c.overview), n: "01" },
              { label: t("case.challenge"), body: L(c.challenge), n: "02" },
              { label: t("case.solution"), body: L(c.solution), n: "03" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <article className="relative ps-6 border-s-2 border-ink-900/10">
                  <span className="font-mono text-[11px] text-amber-600">{s.n}</span>
                  <h2 className="font-display text-2xl font-bold mt-1 mb-4">{s.label}</h2>
                  <p className="text-mist-500 leading-[1.85] text-[15.5px]">{s.body}</p>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <article className="relative ps-6 border-s-2 border-ink-900/10">
                <span className="font-mono text-[11px] text-amber-600">04</span>
                <h2 className="font-display text-2xl font-bold mt-1 mb-5">{t("case.implementation")}</h2>
                <ol className="space-y-3">
                  {c.implementation.map((step, i) => (
                    <li key={step.en} className="flex gap-4 items-start chamfer-sm bg-paper-50 border border-ink-900/10 p-4">
                      <span className="shrink-0 w-8 h-8 grid place-items-center bg-ink-900 text-amber-500 font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[14.5px] font-medium text-ink-800 leading-relaxed pt-1">{L(step)}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>

            <Reveal>
              <article className="chamfer bg-ink-900 text-paper-50 p-8 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                <span className="relative font-mono text-[11px] text-amber-500">05</span>
                <h2 className="relative font-display text-2xl font-bold mt-1 mb-5">{t("case.results")}</h2>
                <ul className="relative space-y-3.5">
                  {c.results.map((r) => (
                    <li key={r.en} className="flex gap-3.5 items-start">
                      <Icon name="check" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                      <span className="text-[15px] leading-relaxed text-mist-200">{L(r)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal className={`transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
              <div className="chamfer-sm bg-amber-500 text-ink-950 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-xl font-bold">{t("cta.similarEnv")}</h2>
                  <p className="mt-1.5 text-[14.5px] font-medium">{t("misc.shareIdeaBody")}</p>
                </div>
                <div className="flex gap-3 flex-wrap shrink-0">
                  <Btn to={`/request?service=${c.catIds[0]}`} variant="dark" className="!py-3">{t("nav.request")}</Btn>
                  {hasWhatsApp && wa && <Btn href={wa} variant="outlineLight" className="!py-3 !border-ink-950/40 !text-ink-950 hover:!bg-ink-950" arrow={false}>WhatsApp</Btn>}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <Link to={`/projects/${next.id}`} className="group flex items-center justify-between gap-6 border-t border-ink-900/15 pt-8">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-mist-500">{isAr ? "دراسة الحالة التالية" : "Next case study"}</p>
                  <p className="mt-2 font-display text-xl font-bold group-hover:text-amber-600 transition-colors">{L(next.title)}</p>
                </div>
                <Icon name="arrow" className="w-7 h-7 shrink-0 transition-transform group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2" strokeWidth={1.6} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
