import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { MARKET_LABEL, type CaseStudy } from "../data/cases";
import { SERVICE_CATEGORIES } from "../data/content";
import { useAllProjects } from "../data/projectLoader";
import { Btn, Icon, LogoMark, Reveal } from "../components/kit";
import { NetworkCanvas } from "../components/fx";

const SELECTED = ["smart-hajj-camp", "sumou-towers", "cctv-command-center"];

/* ---------------- compact environment panel (the hero's single visual) ---------------- */
function EnvPanel() {
  return (
    <div className="relative border border-ink-700 bg-ink-900/80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink-700 font-mono text-[10px] uppercase tracking-[0.22em] text-mist-400">
        <span className="flex items-center gap-2"><LogoMark className="w-4 h-4" /> YA-OPS</span>
        <span className="flex items-center gap-2 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 led" />LIVE</span>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          ["Active Directory", "healthy", false],
          ["Core network", "monitored", false],
          ["CCTV grid", "recording", true],
          ["M365 tenant", "managed", false],
          ["Print servers", "online", false],
        ].map(([k, v, hot], i) => (
          <div key={k as string} className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em]">
            <span className="text-mist-400">{k}</span>
            <span className={`flex items-center gap-2 ${hot ? "text-amber-400" : "text-circuit-400"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${hot ? "bg-amber-500 led" : "bg-circuit-400 led"}`} style={{ animationDelay: `${i * 0.35}s` }} />
              {v}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 pt-3 border-t border-ink-700 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.22em] text-mist-500">
        <span>SA · EG</span>
        <span>REMOTE + ON-SITE</span>
      </div>
    </div>
  );
}

/* ---------------- selected project row ---------------- */
function ProjectRow({ c, index }: { c: CaseStudy; index: number }) {
  const { L } = useLang();
  const cover = c.images?.[0];
  return (
    <Reveal delay={index * 80}>
      <Link to={`/projects/${c.id}`} className="group grid sm:grid-cols-[64px_1fr_auto] items-center gap-5 sm:gap-8 py-7 border-b border-ink-900/10 hover:bg-paper-50 transition-colors px-2 sm:px-4">
        <span className="font-mono text-[13px] text-amber-600">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display text-lg font-bold text-ink-900 group-hover:text-amber-700 transition-colors">{L(c.title)}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-500">{L(MARKET_LABEL[c.market])}</span>
          </span>
          <span className="block mt-1.5 text-[14px] leading-relaxed text-mist-500 max-w-2xl line-clamp-2">{L(c.summary)}</span>
          <span className="mt-3 flex flex-wrap gap-2">
            {c.technologies.slice(0, 4).map((tch) => (
              <span key={tch} className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist-500 border border-ink-900/15 px-2 py-1">{tch}</span>
            ))}
          </span>
        </span>
        <span className="hidden sm:flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
          {L({ en: "View Project", ar: "عرض المشروع" })}
          <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
        </span>
        {cover && (
          <span className="hidden" aria-hidden="true">
            <img src={cover.file} alt="" loading="lazy" className="w-px h-px opacity-0" />
          </span>
        )}
      </Link>
    </Reveal>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  const { L, isAr } = useLang();
  usePageMeta(
    isAr ? "يوسف أحمد | أخصائي دعم تقني أول — TECH OF THE WORLD" : "Yousef Ahmed | Senior IT Support Specialist — TECH OF THE WORLD",
    isAr
      ? "أخصائي دعم تقني أول: بنية تحتية وشبكات وبيئات مايكروسوفت وأنظمة أمن ودعم ميداني في السعودية ومصر."
      : "Senior IT Support Specialist: IT infrastructure, networks, Microsoft environments, security systems and hands-on support across Saudi Arabia and Egypt."
  );
  const { projects } = useAllProjects();
  const selected = SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as CaseStudy[];
  const previewCats = SERVICE_CATEGORIES.slice(0, 4);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <NetworkCanvas className="absolute inset-0 w-full h-full opacity-60" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-6">
              {isAr ? "يوسف أحمد · TECH OF THE WORLD" : "Yousef Ahmed · TECH OF THE WORLD"}
            </Reveal>
            <h1 className="font-display font-bold tracking-tight text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.1]">
              <Reveal line><span className="block text-mist-300 text-[0.55em] font-semibold uppercase tracking-[0.08em] mb-3">{isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}</span></Reveal>
              <Reveal line delay={100}><span className="block">{isAr ? "أبني بيئات تقنية موثوقة تُبقي الأعمال متحركة." : "Building reliable IT environments that keep businesses moving."}</span></Reveal>
            </h1>
            <Reveal as="p" delay={220} className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-mist-300">
              {isAr
                ? "بنية تحتية، شبكات، بيئات مايكروسوفت، أنظمة أمن، ودعم تقني ميداني في السعودية ومصر."
                : "IT infrastructure, networks, Microsoft environments, security systems and hands-on technical support across Saudi Arabia and Egypt."}
            </Reveal>
            <Reveal delay={320} className="mt-9 flex flex-wrap items-center gap-4">
              <Btn to="/projects">{isAr ? "استعرض مشاريعي" : "View My Projects"}</Btn>
              <Btn to="/about" variant="outline">{isAr ? "من أنا" : "About Me"}</Btn>
            </Reveal>
          </div>
          <Reveal delay={260} className="max-w-xs w-full lg:ms-auto">
            <EnvPanel />
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT MY WORK ============ */}
      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 bg-amber-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "عن عملي" : "About My Work"}</span>
          </Reveal>
          <div>
            <Reveal as="p" className="text-[17px] leading-[1.85] text-ink-800 max-w-2xl">
              {isAr
                ? "أكثر من 9 سنوات من الخبرة العملية في الدعم التقني والبنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن — من مكتب الدعم إلى غرفة الخوادم، ومن فروع التجزئة في الإسكندرية إلى مشاريع الأبراج في جدة."
                : "Over 9 years of hands-on experience across IT support, infrastructure, networks, Microsoft environments and security systems — from the service desk to the server room, from retail branches in Alexandria to tower projects in Jeddah."}
            </Reveal>
            <Reveal delay={120} className="mt-7">
              <Link to="/about" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
                {isAr ? "المزيد عني" : "More About Me"}
                <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SELECTED PROJECTS ============ */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <div>
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-600" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "مشاريع مختارة" : "Selected Projects"}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "عمل موثّق من الميدان." : "Documented work from the field."}</span>
              </Reveal>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
              {isAr ? "كل المشاريع" : "View All Projects"}
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
          <div className="border-t border-ink-900/10">
            {selected.map((c, i) => (
              <ProjectRow key={c.id} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="bg-paper-100 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-600" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "ماذا أقدم" : "What I Do"}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "أربعة مجالات أعرفها من الداخل." : "Four areas I know from the inside."}</span>
              </Reveal>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
              {isAr ? "استكشف الخدمات" : "Explore Services"}
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10">
            {previewCats.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 80}>
                <Link to={`/services#${c.id}`} className="group flex gap-5 bg-paper-100 p-7 hover:bg-paper-50 transition-colors h-full">
                  <span className="text-amber-600 shrink-0 mt-1"><Icon name={c.icon} className="w-6 h-6" /></span>
                  <span>
                    <span className="font-display text-[17px] font-bold block group-hover:text-amber-700 transition-colors">{L(c.name)}</span>
                    <span className="block mt-2 text-[13.5px] leading-relaxed text-mist-500">{L(c.tagline)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal line as="h2">
            <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "عندك تحدٍّ تقني؟" : "Have an IT challenge?"}</span>
          </Reveal>
          <Reveal as="p" delay={100} className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-mist-300">
            {isAr
              ? "لنتحدث عن المشكلة، نفهم البيئة، ونصل إلى حل عملي."
              : "Let's talk about the problem, understand the environment and find a practical solution."}
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <Btn to="/contact">{isAr ? "تواصل معي" : "Contact Me"}</Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
