import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { MARKET_LABEL, type CaseStudy } from "../data/cases";
import { useAllProjects } from "../data/projectLoader";
import { Btn, Icon, PageHero, Reveal } from "../components/kit";

/* ================= case visual (used when no field photos) ================= */
function CaseVisual({ c, index }: { c: CaseStudy; index: number }) {
  return (
    <svg viewBox="0 0 400 150" className="w-full h-[150px] bg-ink-900 block" aria-hidden="true">
      <defs>
        <pattern id={`p-${c.id}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M0 26 26 0" stroke="#16283c" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="150" fill="#0a1420" />
      <rect width="400" height="150" fill={`url(#p-${c.id})`} />
      <circle cx="330" cy="45" r="54" fill="none" stroke="#1f344c" />
      <circle cx="330" cy="45" r="34" fill="none" stroke="#E9A33B" strokeOpacity="0.5" strokeDasharray="4 6" />
      <text x="24" y="52" fontFamily="Space Grotesk, Almarai, sans-serif" fontWeight="700" fontSize="28" fill="#f3f6f5">
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x="24" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#7e93a6">
        CASE STUDY · YA
      </text>
      {c.technologies.slice(0, 3).map((tech, i) => (
        <text key={tech} x={24 + i * 118} y="124" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="1.5" fill="#6cc7b4">
          ▸ {tech.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

/* ================= lightbox for field photos ================= */
function Lightbox({ imgs, i, onClose, onNav }: { imgs: { file: string }[]; i: number; onClose: () => void; onNav: (n: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(i + 1);
      if (e.key === "ArrowLeft") onNav(i - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [i, onClose, onNav]);

  return (
    <div className="fixed inset-0 z-[80] bg-ink-950/95 backdrop-blur-sm grid place-items-center p-5" onClick={onClose} role="dialog" aria-modal="true">
      <button onClick={onClose} aria-label="Close" className="absolute top-5 end-5 w-11 h-11 grid place-items-center border border-ink-600 text-paper-50 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer">
        <Icon name="close" className="w-5 h-5" />
      </button>
      <img
        src={imgs[((i % imgs.length) + imgs.length) % imgs.length].file}
        alt=""
        className="max-h-[82vh] max-w-[92vw] object-contain border border-ink-700"
        onClick={(e) => e.stopPropagation()}
      />
      {imgs.length > 1 && (
        <p className="absolute bottom-6 font-mono text-[11px] uppercase tracking-[0.24em] text-mist-400">
          {(((i % imgs.length) + imgs.length) % imgs.length) + 1} / {imgs.length}
        </p>
      )}
    </div>
  );
}

/* ================= projects list ================= */
export function ProjectsList() {
  const { isAr, L, t } = useLang();
  const { projects } = useAllProjects();
  const [market, setMarket] = useState<"all" | "sa" | "eg" | "both">("all");
  usePageMeta(
    isAr ? "المشاريع | يوسف أحمد — TECH OF THE WORLD" : "Projects | Yousef Ahmed — TECH OF THE WORLD",
    isAr
      ? "دراسات حالة حقيقية: بنية تحتية وشبكات ومراكز مراقبة وبيئات مايكروسوفت في السعودية ومصر."
      : "Real case studies: infrastructure, networks, surveillance centers and Microsoft environments across Saudi Arabia and Egypt."
  );

  const filtered = useMemo(() => projects.filter((c) => market === "all" || c.market === market), [projects, market]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] border transition-colors duration-150 cursor-pointer ${
      active ? "border-amber-500 text-ink-950 bg-amber-500" : "border-ink-900/20 text-mist-500 hover:border-ink-900/50 hover:text-ink-900"
    }`;

  return (
    <>
      <PageHero
        kicker={isAr ? "المشاريع" : "Projects"}
        title={{
          en: "Documented work, not promises.",
          ar: "عمل موثّق، لا وعود.",
        }}
        lead={{
          en: "Every project below is real work I delivered: the challenge, what I did, and what changed afterwards. Client names stay confidential.",
          ar: "كل مشروع أدناه عمل حقيقي سلّمته: التحدي، وما فعلته، وما الذي تغير بعده. تبقى أسماء العملاء سرية.",
        }}
      />

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <Reveal className="mb-8 flex flex-wrap gap-2.5" >
            <button onClick={() => setMarket("all")} className={filterBtn(market === "all")} aria-pressed={market === "all"}>
              {t("common.all")}
            </button>
            <button onClick={() => setMarket("sa")} className={filterBtn(market === "sa")} aria-pressed={market === "sa"}>
              {L(MARKET_LABEL.sa)}
            </button>
            <button onClick={() => setMarket("eg")} className={filterBtn(market === "eg")} aria-pressed={market === "eg"}>
              {L(MARKET_LABEL.eg)}
            </button>
          </Reveal>

          <div className="border-t border-ink-900/10">
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 60}>
                <Link
                  to={`/projects/${c.id}`}
                  className="group grid sm:grid-cols-[72px_1fr_auto] items-start gap-5 sm:gap-8 py-8 px-2 sm:px-4 border-b border-ink-900/10 hover:bg-paper-50 transition-colors duration-150"
                >
                  <span className="font-mono text-[13px] text-amber-700 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-display text-xl font-bold text-ink-900 group-hover:text-amber-700 transition-colors duration-150">{L(c.title)}</span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-500">{L(MARKET_LABEL[c.market])}</span>
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-amber-700">{L(c.sector)}</span>
                    <span className="mt-2.5 block text-[14px] leading-relaxed text-mist-500 max-w-2xl line-clamp-2">{L(c.summary)}</span>
                    <span className="mt-3.5 flex flex-wrap gap-2">
                      {c.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="font-mono text-[10px] uppercase tracking-[0.1em] text-mist-500 border border-ink-900/15 px-2 py-1">
                          {tech}
                        </span>
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
            {filtered.length === 0 && (
              <p className="py-16 text-center font-display text-lg text-mist-500">
                {isAr ? "لا توجد نتائج مطابقة." : "No matching projects."}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= case study detail ================= */
export function ProjectDetail() {
  const { id } = useParams();
  const { isAr, L, t } = useLang();
  const { projects } = useAllProjects();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const c = projects.find((x) => x.id === id);
  usePageMeta(
    c ? `${L(c.title)} | Yousef Ahmed` : "Projects | Yousef Ahmed",
    c ? L(c.summary) : "Real IT case studies by Yousef Ahmed."
  );

  if (!c) {
    return (
      <section className="min-h-[70vh] bg-ink-950 text-paper-50 grid place-items-center pt-32">
        <div className="text-center">
          <p className="font-mono text-amber-500 text-sm uppercase tracking-[0.3em]">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">{isAr ? "المشروع غير موجود." : "Project not found."}</h1>
          <Btn to="/projects" className="mt-8" arrow={false}>
            {t("cta.backToProjects")}
          </Btn>
        </div>
      </section>
    );
  }

  const idx = projects.findIndex((x) => x.id === c.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const sectionTitle = (k: string) => (
    <h2 className="flex items-center gap-3 font-display text-xl font-bold text-paper-50">
      <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
      {t(k)}
    </h2>
  );

  return (
    <>
      <header className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-14">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mist-400 hover:text-amber-400 transition-colors">
            <Icon name="arrow" className="w-4 h-4 -scale-x-100 rtl:scale-x-100" /> {t("cta.backToProjects")}
          </Link>
          <Reveal className="mt-6 flex flex-wrap gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] border border-amber-500/50 text-amber-400 px-3 py-1.5">
              {L(MARKET_LABEL[c.market])}
            </span>
            {c.period && (
              <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] border border-circuit-500/50 text-circuit-300 px-3 py-1.5" dir="ltr">
                <Icon name="clock" className="w-3.5 h-3.5" />
                {L(c.period)}
              </span>
            )}
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] border border-ink-600 text-mist-300 px-3 py-1.5">{L(c.sector)}</span>
          </Reveal>
          <Reveal line as="h1" delay={90} className="mt-5">
            <span className="block font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] max-w-3xl">{L(c.title)}</span>
          </Reveal>
          <Reveal as="p" delay={170} className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-mist-300">
            {L(c.summary)}
          </Reveal>
        </div>
      </header>

      <section className="relative bg-ink-950 text-paper-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid lg:grid-cols-[1fr_300px] gap-12 items-start">
          <div className="space-y-12">
            {/* gallery */}
            {c.images && c.images.length > 0 && (
              <Reveal>
                <div className="grid sm:grid-cols-2 gap-4">
                  {c.images.map((img, i) => (
                    <button key={img.file} onClick={() => setLightbox(i)} className="group relative overflow-hidden border border-ink-700 cursor-zoom-in cursor-pointer">
                      <img src={img.file} alt={img.caption ? L(img.caption) : L(c.title)} loading="lazy" className="duo-img w-full h-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      {img.caption && (
                        <span className="absolute bottom-0 inset-x-0 bg-ink-950/80 px-3 py-2 text-start text-[12px] text-mist-300">{L(img.caption)}</span>
                      )}
                    </button>
                  ))}
                </div>
                {lightbox !== null && (
                  <Lightbox imgs={c.images} i={lightbox} onClose={() => setLightbox(null)} onNav={setLightbox} />
                )}
              </Reveal>
            )}

            {/* fallback visual when no photos yet */}
            {(!c.images || c.images.length === 0) && (
              <Reveal>
                <CaseVisual c={c} index={idx} />
              </Reveal>
            )}

            <div className="space-y-4">
              {sectionTitle("case.overview")}
              <p className="text-[15px] leading-[1.85] text-mist-300">{L(c.overview)}</p>
            </div>
            <div className="space-y-4">
              {sectionTitle("case.challenge")}
              <p className="text-[15px] leading-[1.85] text-mist-300">{L(c.challenge)}</p>
            </div>
            <div className="space-y-4">
              {sectionTitle("case.solution")}
              <p className="text-[15px] leading-[1.85] text-mist-300">{L(c.solution)}</p>
            </div>
            <div className="space-y-5">
              {sectionTitle("case.implementation")}
              <ul className="space-y-3">
                {c.implementation.map((it) => (
                  <li key={it.en} className="flex gap-3.5 text-[14.5px] leading-relaxed text-mist-300">
                    <span className="mt-2 w-2 h-2 shrink-0 bg-amber-500 rotate-45" aria-hidden="true" />
                    {L(it)}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="font-mono text-[11.5px] text-mist-500 border-t border-ink-700 pt-5">
              {t("case.verifiedNote")}
            </Reveal>
          </div>

          {/* sticky sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="border border-ink-700 bg-ink-900 p-6 space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500">{t("case.technologies")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.technologies.map((tech) => (
                    <span key={tech} className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-circuit-300 border border-ink-600 px-2.5 py-1.5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-ink-700 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500">{t("case.role")}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-mist-300">{L(c.role)}</p>
              </div>
            </div>

            <div className="border border-ink-700 bg-ink-900 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500">{t("case.results")}</p>
              <ul className="mt-4 space-y-3.5">
                {c.results.map((r) => (
                  <li key={r.en} className="flex gap-3 text-[13.5px] leading-relaxed text-mist-300">
                    <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" strokeWidth={2.2} />
                    {L(r)}
                  </li>
                ))}
              </ul>
            </div>

            {/* prev / next */}
            <div className="grid grid-cols-2 gap-px bg-ink-700 border border-ink-700">
              <Link to={`/projects/${prev.id}`} className="group bg-ink-900 p-4 hover:bg-ink-850 transition-colors">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist-500">{t("case.prev")}</p>
                <p className="mt-1.5 font-display text-[13px] font-semibold leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">{L(prev.title)}</p>
              </Link>
              <Link to={`/projects/${next.id}`} className="group bg-ink-900 p-4 hover:bg-ink-850 transition-colors text-end">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist-500">{t("case.next")}</p>
                <p className="mt-1.5 font-display text-[13px] font-semibold leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">{L(next.title)}</p>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
