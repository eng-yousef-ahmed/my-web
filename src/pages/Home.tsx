import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { MARKET_LABEL, type CaseStudy } from "../data/cases";
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
  return (
    <Reveal delay={index * 80}>
      <Link to={`/projects/${c.id}`} className="group grid sm:grid-cols-[64px_1fr_auto] items-center gap-5 sm:gap-8 py-8 border-b border-ink-900/10 hover:bg-paper-50 transition-colors px-2 sm:px-4">
        <span className="font-mono text-[13px] text-amber-600">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="font-display text-lg font-bold text-ink-900 group-hover:text-amber-700 transition-colors block">{L(c.title)}</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-500">
            <span>{L(MARKET_LABEL[c.market])}</span>
            <span className="text-ink-900/25">·</span>
            <span>{L(c.sector)}</span>
          </span>
          <span className="block mt-2.5 text-[14px] leading-relaxed text-mist-500 max-w-2xl line-clamp-2">{L(c.summary)}</span>
          <span className="mt-3 flex flex-wrap gap-2">
            {c.technologies.slice(0, 4).map((tch) => (
              <span key={tch} className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist-500 border border-ink-900/15 px-2 py-1">{tch}</span>
            ))}
          </span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
          {L({ en: "View Project", ar: "عرض المشروع" })}
          <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
        </span>
      </Link>
    </Reveal>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  const { isAr } = useLang();
  usePageMeta(
    isAr ? "يوسف أحمد | أخصائي دعم تقني أول — TECH OF THE WORLD" : "Yousef Ahmed | Senior IT Support Specialist — TECH OF THE WORLD",
    isAr
      ? "أخصائي دعم تقني أول: بنية تحتية وشبكات وبيئات مايكروسوفت وأنظمة أمن ودعم ميداني في السعودية ومصر."
      : "Senior IT Support Specialist: IT infrastructure, networks, Microsoft environments, security systems and hands-on support across Saudi Arabia and Egypt."
  );
  const { projects } = useAllProjects();
  const selected = SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as CaseStudy[];

  const expertise = [
    {
      n: "01",
      title: { en: "IT Infrastructure & Networks", ar: "البنية التحتية والشبكات" },
      line: { en: "Design, deployment and daily operation of LAN/WAN, business Wi-Fi and site connectivity.", ar: "تصميم وتنفيذ وتشغيل الشبكات المحلية والواي فاي وربط المواقع." },
    },
    {
      n: "02",
      title: { en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" },
      line: { en: "Windows Server, Active Directory, Microsoft 365, OneDrive and SharePoint, administered properly.", ar: "ويندوز سيرفر وأكتيف ديريكتوري ومايكروسوفت 365 وشير بوينت، بإدارة صحيحة." },
    },
    {
      n: "03",
      title: { en: "Security & Surveillance", ar: "أنظمة الأمن والمراقبة" },
      line: { en: "CCTV, NVR/DVR, remote monitoring, biometric attendance and access control.", ar: "المراقبة بالكاميرات وأنظمة التسجيل والمراقبة عن بُعد وبصمة الحضور والتحكم في الدخول." },
    },
    {
      n: "04",
      title: { en: "Support & Operations", ar: "الدعم والتشغيل" },
      line: { en: "Remote and on-site technical support, preventive maintenance and service-desk practice.", ar: "دعم تقني عن بُعد وميداني، وصيانة وقائية، ومنهجية مكتب خدمة." },
    },
  ];

  return (
    <>
      {/* ============ 01 · HERO ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <NetworkCanvas className="absolute inset-0 w-full h-full opacity-60" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-500 mb-7">TECH OF THE WORLD</Reveal>
            <h1 className="font-display font-bold tracking-tight leading-[1.05]">
              <Reveal line><span className="block text-[clamp(2.4rem,6vw,4rem)]">{isAr ? "يوسف أحمد" : "Yousef Ahmed"}</span></Reveal>
            </h1>
            <Reveal delay={120} className="mt-4 font-mono text-[12px] uppercase tracking-[0.24em] text-mist-300">
              {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
            </Reveal>
            <Reveal as="p" delay={220} className="mt-7 max-w-xl font-display text-[clamp(1.2rem,2.4vw,1.55rem)] font-semibold leading-snug text-paper-50">
              {isAr ? "أساعد الشركات على بناء وتشغيل بيئات تقنية موثوقة." : "I help businesses build and run reliable IT environments."}
            </Reveal>
            <Reveal as="p" delay={300} className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist-300">
              {isAr
                ? "خبرة عملية في البنية التحتية، الشبكات، أنظمة Microsoft، المراقبة الأمنية والدعم التقني في السعودية ومصر."
                : "Hands-on experience in IT infrastructure, networks, Microsoft environments, security surveillance and technical support across Saudi Arabia and Egypt."}
            </Reveal>
            <Reveal delay={380} className="mt-9 flex flex-wrap items-center gap-4">
              <Btn to="/projects">{isAr ? "استعرض مشاريعي" : "View My Projects"}</Btn>
              <Btn to="/about" variant="outline">{isAr ? "عني" : "About Me"}</Btn>
            </Reveal>
          </div>
          <Reveal delay={260} className="max-w-xs w-full lg:ms-auto">
            <EnvPanel />
          </Reveal>
        </div>
      </section>

      {/* ============ 02 · ABOUT PREVIEW ============ */}
      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <Reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber-600" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "عني" : "About"}</span>
            </Reveal>
            <Reveal line as="h2" delay={80}>
              <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                {isAr ? "خبرة عملية في بيئات IT حقيقية." : "Hands-on experience in real IT environments."}
              </span>
            </Reveal>
          </div>
          <div>
            <Reveal as="p" delay={120} className="text-[16px] leading-[1.85] text-ink-800 max-w-2xl">
              {isAr
                ? "أكثر من 9 سنوات في الدعم التقني والبنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن، من مكتب الدعم إلى غرفة الخوادم، ومن فروع التجزئة في الإسكندرية إلى مشاريع الأبراج في جدة."
                : "Over 9 years across IT support, infrastructure, networks, Microsoft environments and security systems, from the service desk to the server room, from retail branches in Alexandria to tower projects in Jeddah."}
            </Reveal>
            <Reveal delay={200} className="mt-7">
              <Link to="/about" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
                {isAr ? "المزيد عني" : "More About Me"}
                <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 03 · SELECTED PROJECTS ============ */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
            <div className="max-w-2xl">
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-600" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "مشاريع مختارة" : "Selected Projects"}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "مشاريع من واقع العمل." : "Projects from real work."}</span>
              </Reveal>
              <Reveal as="p" delay={140} className="mt-3 text-[14.5px] leading-relaxed text-mist-500">
                {isAr
                  ? "مشاريع وتجارب تقنية نفذتها فعليًا ضمن بيئات عمل حقيقية في السعودية ومصر."
                  : "Technical projects and engagements I actually delivered inside real working environments in Saudi Arabia and Egypt."}
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

      {/* ============ 04 · EXPERTISE ============ */}
      <section className="bg-paper-100 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal line as="h2">
              <span className="font-display text-2xl sm:text-3xl font-bold leading-tight">{isAr ? "مجالات خبرتي." : "My areas of expertise."}</span>
            </Reveal>
            <Link to="/services" className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors">
              {isAr ? "استكشف خدماتي" : "Explore My Services"}
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-10">
            {expertise.map((e, i) => (
              <Reveal key={e.n} delay={(i % 2) * 80}>
                <div className="flex gap-5">
                  <span className="font-mono text-[13px] text-amber-600 pt-1">{e.n}</span>
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-ink-900">{isAr ? e.title.ar : e.title.en}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mist-500">{isAr ? e.line.ar : e.line.en}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
