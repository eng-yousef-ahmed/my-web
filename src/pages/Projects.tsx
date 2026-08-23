import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { MARKET_LABEL, type CaseStudy, type ProjectImage } from "../data/cases";
import { useAllProjects } from "../data/projectLoader";
import { SERVICE_CATEGORIES } from "../data/content";
import { Btn, Icon, PageHero, Reveal } from "../components/kit";


const PATTERNS = ["M0 26 26 0", "M13 0v26M0 13h26", "M0 0 26 26", "M13 0 26 13 13 26 0 13Z"];

function CaseArt({ c, index }: { c: CaseStudy; index: number }) {
  const p = PATTERNS[index % PATTERNS.length];
  return (
    <svg viewBox="0 0 400 150" className="w-full h-44 bg-ink-900" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`cp-${c.id}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d={p} stroke="#16283c" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect width="400" height="150" fill="#0a1420" />
      <rect width="400" height="150" fill={`url(#cp-${c.id})`} />
      <circle cx="340" cy="34" r="60" fill="none" stroke="#1f344c" />
      <circle cx="340" cy="34" r="38" fill="none" stroke="#E9A33B" strokeOpacity="0.55" strokeDasharray="4 6" />
      <rect x="24" y="96" width="46" height="4" fill="#E9A33B" />
      <text x="24" y="52" fontFamily="Space Grotesk, Almarai, sans-serif" fontWeight="700" fontSize="30" fill="#f3f6f5">
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x="24" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#7e93a6">CASE STUDY · YA</text>
    </svg>
  );
}

/** Project visual — the first folder image if available, otherwise generated art. */
function CaseVisual({ c, index }: { c: CaseStudy; index: number }) {
  const { L } = useLang();
  const img = c.images?.[0];
  if (!img) return <CaseArt c={c} index={index} />;
  return (
    <div className="relative h-44 bg-ink-900">
      <img src={img.file} alt={img.caption ? L(img.caption) : L(c.title)} loading="lazy" className="absolute inset-0 w-full h-full object-cover duo-img" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" aria-hidden="true" />
      {c.images && c.images.length > 1 && (
        <span className="absolute bottom-3 start-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] bg-ink-950/85 text-paper-50 px-2.5 py-1.5 border border-ink-600">
          <Icon name="cctv" className="w-3.5 h-3.5 text-amber-400" />
          {L({ en: `${c.images.length} photos`, ar: `${c.images.length} صور` })}
        </span>
      )}
    </div>
  );
}

/* ---------------- gallery lightbox ---------------- */
function Lightbox({ images, index, onClose, onMove }: { images: ProjectImage[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const { L, isAr } = useLang();
  const img = images[index];

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove((index + 1) % images.length);
      if (e.key === "ArrowLeft") onMove((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onMove]
  );
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onKey]);

  if (!img) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-10" role="dialog" aria-modal="true" aria-label={isAr ? "معرض الصور" : "Photo gallery"}>
      <button className="absolute inset-0 bg-ink-950/95 cursor-pointer" onClick={onClose} aria-label={isAr ? "إغلاق" : "Close"} />
      <div className="relative max-w-5xl w-full">
        <div className="chamfer overflow-hidden border border-ink-600 bg-ink-900">
          <img src={img.file} alt={img.caption ? L(img.caption) : ""} className="w-full max-h-[72vh] object-contain bg-ink-950" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-paper-50">
          <p className="font-mono text-[12px] text-mist-300">
            <span className="text-amber-400">{String(index + 1).padStart(2, "0")}</span> / {String(images.length).padStart(2, "0")}
            {img.caption && <span className="ms-4 text-mist-200">{L(img.caption)}</span>}
          </p>
          <div className="flex gap-2.5">
            <button onClick={() => onMove((index - 1 + images.length) % images.length)} className="w-11 h-11 grid place-items-center border border-ink-600 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer" aria-label={isAr ? "السابقة" : "Previous"}>
              <Icon name="arrow" className="w-4.5 h-4.5 -scale-x-100 rtl:scale-x-100" />
            </button>
            <button onClick={() => onMove((index + 1) % images.length)} className="w-11 h-11 grid place-items-center border border-ink-600 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer" aria-label={isAr ? "التالية" : "Next"}>
              <Icon name="arrow" className="w-4.5 h-4.5 rtl:-scale-x-100" />
            </button>
            <button onClick={onClose} className="w-11 h-11 grid place-items-center bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors cursor-pointer" aria-label={isAr ? "إغلاق" : "Close"}>
              <Icon name="close" className="w-4.5 h-4.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery({ c }: { c: CaseStudy }) {
  const { L, isAr } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  if (!c.images || c.images.length === 0) return null;
  return (
    <div className="mt-14">
      <Reveal className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-xl font-bold flex items-center gap-3">
          <Icon name="cctv" className="w-5 h-5 text-amber-500" />
          {isAr ? "من الميدان" : "From the field"}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-500">
          {c.images.length} {isAr ? "صور" : "photos"}
        </span>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {c.images.map((img, i) => (
          <Reveal key={img.file + i} delay={(i % 3) * 70}>
            <button
              onClick={() => setOpen(i)}
              className="group block w-full text-start chamfer-sm overflow-hidden border border-ink-900/12 bg-ink-900 card-lift hover:border-amber-500/60 cursor-pointer"
              aria-label={isAr ? "تكبير الصورة" : "Enlarge photo"}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={img.file} alt={img.caption ? L(img.caption) : ""} loading="lazy" className="w-full h-full object-cover duo-img transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="absolute top-2.5 end-2.5 font-mono text-[10px] bg-ink-950/85 text-amber-400 px-2 py-0.5 border border-ink-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="absolute inset-0 grid place-items-center bg-ink-950/0 group-hover:bg-ink-950/35 transition-colors">
                  <Icon name="arrow" className="w-6 h-6 text-paper-50 opacity-0 group-hover:opacity-100 -rotate-45 rtl:rotate-45 transition-opacity" />
                </span>
              </div>
              {img.caption && (
                <p className="px-4 py-3 text-[13px] font-medium text-ink-800 border-t border-ink-900/10 bg-paper-50">{L(img.caption)}</p>
              )}
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && <Lightbox images={c.images} index={open} onClose={() => setOpen(null)} onMove={setOpen} />}
    </div>
  );
}

/* ---------------- list page ---------------- */
export function ProjectsList() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "المشاريع ودراسات الحالة | TECH OF THE WORLD" : "Projects & Case Studies | TECH OF THE WORLD",
    "Real IT infrastructure engagements documented as case studies: networks, data centers, CCTV command centers, Microsoft environments and support operations across Saudi Arabia and Egypt."
  );
  const { projects } = useAllProjects();
  const [market, setMarket] = useState<"all" | "sa" | "eg" | "both">("all");

  const filtered = useMemo(
    () => projects.filter((c) => market === "all" || c.market === market),
    [projects, market]
  );

  const filterBtn = (on: boolean) =>
    `px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] border transition-all cursor-pointer ${
      on ? "bg-amber-500 border-amber-500 text-ink-950 font-semibold" : "border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400"
    }`;

  return (
    <>
      <PageHero
        kicker={isAr ? "المشاريع" : "Projects"}
        title={{ en: "The work, documented.", ar: "العمل، موثّقًا." }}
        lead={{
          en: "Case studies from Saudi Arabia and Egypt, with their challenges, decisions and outcomes. Client names and commercial details remain confidential.",
          ar: "دراسات حالة من السعودية ومصر بتحدياتها وقراراتها ونتائجها، مع بقاء أسماء العملاء والتفاصيل التجارية سرية.",
        }}
      />

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2.5" role="group" aria-label={isAr ? "تصفية حسب السوق" : "Filter by market"}>
              {([["all", t("common.all")], ["sa", "Saudi Arabia"], ["eg", "Egypt"], ["both", isAr ? "السعودية ومصر" : "SA & Egypt"]] as const).map(([v, label]) => (
                <button key={v} onClick={() => setMarket(v)} className={filterBtn(market === v)} aria-pressed={market === v}>{label}</button>
              ))}
            </div>
          </Reveal>

          <div className="border-t border-ink-900/10">
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 60}>
                <Link to={`/projects/${c.id}`} className="group grid sm:grid-cols-[72px_1fr_auto] items-start gap-5 sm:gap-8 py-8 px-2 sm:px-4 border-b border-ink-900/10 hover:bg-paper-50 transition-colors">
                  <span className="font-mono text-[13px] text-amber-700 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-display text-xl font-bold text-ink-900 group-hover:text-amber-700 transition-colors">{L(c.title)}</span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-500">{L(MARKET_LABEL[c.market])}</span>
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-amber-700">{L(c.sector)}</span>
                    <span className="mt-2.5 block text-[14px] leading-relaxed text-mist-500 max-w-2xl line-clamp-2">{L(c.summary)}</span>
                    <span className="mt-3.5 flex flex-wrap gap-2">
                      {c.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="font-mono text-[10px] uppercase tracking-[0.1em] text-mist-500 border border-ink-900/15 px-2 py-1">{tech}</span>
                      ))}
                    </span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-2 pt-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
                    {t("cta.readCase")}
                    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-mist-500 py-16 font-display text-lg">{isAr ? "لا توجد نتائج مطابقة، جرّب تصفية أخرى." : "No matching projects. Try another filter."}</p>
          )}
        </div>
      </section>

      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-14 lg:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold">{isAr ? "لديك مشروع مشابه؟" : "Have a similar project?"}</h2>
            <p className="mt-2.5 text-mist-300 text-[14.5px] max-w-lg">{isAr ? "لنناقش البيئة والمتطلبات وما يناسبها عمليًا." : "Let's discuss the environment, the requirements and what actually fits."}</p>
          </div>
          <Btn to="/contact" className="shrink-0">{isAr ? "لنناقش مشروعك" : "Let's Discuss a Project"}</Btn>
        </div>
      </section>
    </>
  );
}

/* ---------------- detail page ---------------- */
export function ProjectDetail() {
  const { id } = useParams();
  const { L, t, isAr } = useLang();
  const { projects, loading } = useAllProjects();
  const index = projects.findIndex((c) => c.id === id);
  const c = index >= 0 ? projects[index] : null;
  const next = c ? projects[(index + 1) % projects.length] : null;
  usePageMeta(
    c ? `${L(c.title)} | TECH OF THE WORLD` : "Projects | TECH OF THE WORLD",
    c ? L(c.summary) : "Case studies by TECH OF THE WORLD."
  );

  if (!c && loading) {
    return (
      <section className="min-h-[70vh] bg-ink-950 text-paper-50 grid place-items-center pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-400">{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
      </section>
    );
  }

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

  const has = (b: { en: string; ar: string }) => Boolean(b.en || b.ar);

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
            {c.period && (
              <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] border border-circuit-500/50 text-circuit-300 px-3 py-1.5" dir="ltr">
                <Icon name="clock" className="w-3.5 h-3.5" />{L(c.period)}
              </span>
            )}
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
          <Reveal as="p" delay={220} className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-mist-300">{L(c.summary)}</Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {c.technologies.map((tech) => (
              <span key={tech} className="font-mono text-[10.5px] uppercase tracking-[0.14em] px-3 py-1.5 bg-ink-800 text-circuit-300 border border-ink-700">{tech}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20 grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            {has(c.overview) && (
              <Reveal>
                <div className="chamfer-sm bg-paper-50 border border-ink-900/10 p-7 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber-600 mb-4">{t("case.overview")}</p>
                  <p className="text-[16px] leading-[1.9] text-ink-800">{L(c.overview)}</p>
                </div>
              </Reveal>
            )}

            {/* Photo gallery — filled from the project folder, no code needed */}
            <Gallery c={c} />

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {has(c.challenge) && (
                <Reveal>
                  <div className="chamfer-sm border border-ink-900/10 bg-paper-50 p-7 h-full">
                    <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber-600 mb-4">{t("case.challenge")}</p>
                    <p className="text-[14.5px] leading-[1.85] text-mist-500">{L(c.challenge)}</p>
                  </div>
                </Reveal>
              )}
              {has(c.solution) && (
                <Reveal delay={90}>
                  <div className="chamfer-sm bg-ink-900 text-paper-50 p-7 h-full relative overflow-hidden noise">
                    <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                    <p className="relative font-mono text-[11px] uppercase tracking-[0.26em] text-amber-400 mb-4">{t("case.solution")}</p>
                    <p className="relative text-[14.5px] leading-[1.85] text-mist-200">{L(c.solution)}</p>
                  </div>
                </Reveal>
              )}
            </div>

            {c.implementation.length > 0 && (
              <Reveal className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber-600 mb-5">{t("case.implementation")}</p>
                <div className="space-y-3">
                  {c.implementation.map((s, i) => (
                    <div key={s.en + i} className="flex gap-4 items-start chamfer-sm bg-paper-50 border border-ink-900/10 p-4 hover:border-ink-900/35 transition-colors">
                      <span className="shrink-0 w-8 h-8 grid place-items-center bg-ink-900 text-amber-500 font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[14.5px] leading-relaxed text-ink-800 pt-1">{L(s)}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {has(c.role) && (
              <Reveal className="mt-10">
                <div className="chamfer-sm border-s-4 border-amber-500 bg-paper-50 p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber-600 mb-3">{t("case.role")}</p>
                  <p className="text-[15.5px] leading-[1.85] font-medium text-ink-900">{L(c.role)}</p>
                </div>
              </Reveal>
            )}

            <Reveal className="mt-8">
              <p className="font-mono text-[11px] leading-relaxed text-mist-500 border-t border-ink-900/10 pt-5">{t("case.verifiedNote")}</p>
            </Reveal>
          </div>

          {/* sticky side */}
          <aside className="space-y-6 lg:sticky lg:top-32">
            <Reveal>
              <div className="chamfer-sm bg-ink-900 text-paper-50 p-7 relative overflow-hidden noise">
                <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                <p className="relative font-mono text-[11px] uppercase tracking-[0.26em] text-amber-400 mb-5">{t("case.results")}</p>
                <ul className="relative space-y-3.5">
                  {c.results.map((r, i) => (
                    <li key={r.en + i} className="flex gap-3.5 items-start text-[14px] leading-relaxed text-mist-200">
                      <Icon name="check" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                      {L(r)}
                    </li>
                  ))}
                  {c.results.length === 0 && (
                    <li className="text-[13.5px] text-mist-400">{isAr ? "تُضاف النتائج الموثقة عند توفرها." : "Verified outcomes are added once available."}</li>
                  )}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="chamfer-sm bg-amber-500 text-ink-950 p-7">
                <p className="font-display text-lg font-bold">{t("cta.similarEnv")}</p>
                <p className="mt-1.5 text-[13.5px] font-medium">{isAr ? "لنناقش البيئة والمتطلبات وما يناسبها عمليًا." : "Let's discuss the environment, the requirements and what actually fits."}</p>
                <Btn to="/contact" variant="dark" className="mt-5 justify-center !py-3">{isAr ? "لنناقش مشروعك" : "Let's Discuss a Project"}</Btn>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* next case */}
      <Link to={`/projects/${next.id}`} className="group block bg-ink-950 text-paper-50 border-t border-ink-700 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-10 flex items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist-500 mb-2">{isAr ? "دراسة الحالة التالية" : "Next case study"}</p>
            <p className="font-display text-xl sm:text-2xl font-bold group-hover:text-amber-400 transition-colors">{L(next.title)}</p>
          </div>
          <span className="shrink-0 w-14 h-14 grid place-items-center border border-ink-600 group-hover:bg-amber-500 group-hover:text-ink-950 group-hover:border-amber-500 transition-all">
            <Icon name="arrow" className="w-5 h-5 rtl:-scale-x-100" />
          </span>
        </div>
      </Link>
    </>
  );
}
