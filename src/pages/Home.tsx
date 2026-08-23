import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { MARKET_LABEL, type CaseStudy } from "../data/cases";
import { SERVICE_CATEGORIES } from "../data/content";
import { useAllProjects } from "../data/projectLoader";
import { Btn, Icon, Reveal } from "../components/kit";
import { ProfilePortrait } from "../components/profile/ProfilePortrait";

const SELECTED = ["smart-hajj-camp", "sumou-towers", "cctv-command-center"];

/* ---------------- selected project row ---------------- */
function ProjectRow({ c, index }: { c: CaseStudy; index: number }) {
  const { L } = useLang();
  return (
    <Reveal delay={index * 80}>
      <Link
        to={`/projects/${c.id}`}
        className="group grid sm:grid-cols-[64px_1fr_auto] items-center gap-5 sm:gap-8 py-7 border-b border-ink-900/10 hover:bg-paper-50 transition-colors px-2 sm:px-4"
      >
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
      ? "أبني وأدير بيئات تقنية موثوقة تعتمد عليها الأعمال يوميًا. خبرة عملية في البنية التحتية والشبكات وMicrosoft وأنظمة المراقبة والدعم التقني في السعودية ومصر."
      : "I build and manage reliable IT environments that businesses depend on every day. Practical experience across infrastructure, networks, Microsoft environments, security systems and technical support in Saudi Arabia and Egypt."
  );
  const { projects } = useAllProjects();
  const selected = SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as CaseStudy[];
  const previewCats = SERVICE_CATEGORIES.slice(0, 4);

  return (
    <>
      {/* ============ 01 — HERO : who I am ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="grid gap-14 lg:gap-20 lg:grid-cols-[0.82fr_1.18fr] items-center">
            {/* portrait — physically LEFT in both LTR and RTL */}
            <Reveal delay={160} className="rtl:lg:order-2 w-full max-w-[280px] sm:max-w-[340px] mx-auto lg:mx-0 lg:justify-self-start">
              <ProfilePortrait />
            </Reveal>

            {/* introduction — physically RIGHT in both LTR and RTL */}
            <div className="rtl:lg:order-1">
              <Reveal className="flex items-center gap-3.5 mb-7">
                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-500">TECH OF THE WORLD</span>
              </Reveal>

              <Reveal line as="h1" delay={90}>
                <span className="block font-display font-bold tracking-tight text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.04]">
                  {isAr ? "يوسف أحمد" : "Yousef Ahmed"}
                </span>
              </Reveal>

              <Reveal delay={190} className="mt-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-mist-300">
                  {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
                </p>
              </Reveal>

              <Reveal delay={270} className="mt-7">
                <p className="text-lg sm:text-[21px] font-semibold leading-[1.55] text-paper-50/95 max-w-xl">
                  {isAr ? (
                    <>
                      أبني وأدير بيئات تقنية موثوقة
                      <br />
                      تعتمد عليها الأعمال يوميًا.
                    </>
                  ) : (
                    <>
                      I build and manage reliable IT environments
                      <br />
                      that businesses depend on every day.
                    </>
                  )}
                </p>
              </Reveal>

              <Reveal as="p" delay={350} className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-mist-400">
                {isAr
                  ? "خبرة عملية في البنية التحتية، الشبكات، Microsoft، أنظمة المراقبة والدعم التقني في السعودية ومصر."
                  : "Practical experience across infrastructure, networks, Microsoft environments, security systems, and technical support in Saudi Arabia and Egypt."}
              </Reveal>

              <Reveal delay={430} className="mt-9 flex flex-wrap items-center gap-4">
                <Btn to="/projects">{isAr ? "استعرض مشاريعي" : "Explore Projects"}</Btn>
                <Btn to="/about" variant="outline">{isAr ? "عني" : "About Me"}</Btn>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 — SELECTED PROJECTS ============ */}
      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <div>
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-600" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "مشاريع مختارة" : "Selected Projects"}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  {isAr ? "مشاريع من واقع العمل." : "Projects from real work."}
                </span>
              </Reveal>
              <Reveal as="p" delay={140} className="mt-3 text-[14px] text-mist-500 max-w-xl">
                {isAr
                  ? "مشاريع وتجارب تقنية نفذتها فعليًا ضمن بيئات عمل حقيقية في السعودية ومصر."
                  : "Projects and technical work I actually delivered inside real working environments in Saudi Arabia and Egypt."}
              </Reveal>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
              {isAr ? "عرض جميع المشاريع" : "View All Projects"}
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

      {/* ============ 03 — EXPERTISE (compact) ============ */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-600" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "الخبرة التقنية" : "Expertise"}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "مجالات خبرتي." : "My areas of expertise."}</span>
              </Reveal>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
              {isAr ? "استكشف خدماتي" : "Explore My Services"}
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10">
            {previewCats.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 80}>
                <Link to={`/services#${c.id}`} className="group flex gap-5 bg-paper-50 p-7 hover:bg-paper-100 transition-colors h-full">
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

      {/* ============ 04 — EXPERIENCE / CREDIBILITY (one quiet strip) ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-14 lg:py-16">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
            <Reveal>
              <p className="font-display text-3xl font-bold text-amber-500">9+</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mist-300">{isAr ? "سنوات من الخبرة العملية الميدانية" : "years of hands-on field experience"}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="font-display text-3xl font-bold text-amber-500">500+</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mist-300">{isAr ? "مستخدم مدعوم في بيئات مؤسسية" : "users supported in enterprise environments"}</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="font-display text-3xl font-bold text-amber-500">{isAr ? "٤ مجالات" : "4 domains"}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mist-300">
                {isAr ? "البنية التحتية · الشبكات · Microsoft · الأمن والمراقبة" : "Infrastructure · Networks · Microsoft · Security & Monitoring"}
              </p>
            </Reveal>
          </div>

          {/* the single, quiet contact line */}
          <Reveal delay={240} className="mt-12 pt-8 border-t border-ink-700 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14px] text-mist-400">
              {isAr ? "مهتم بالعمل معي؟" : "Interested in working together?"}
            </p>
            <Link to="/contact" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-paper-50 hover:text-amber-400 transition-colors">
              {isAr ? "تواصل معي" : "Contact Me"}
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
