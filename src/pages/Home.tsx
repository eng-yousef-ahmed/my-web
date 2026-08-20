import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta, usePrefersReducedMotion } from "../i18n";
import { MARKET_LABEL, type CaseStudy } from "../data/cases";
import { useAllProjects } from "../data/projectLoader";
import { FOUNDER_METRICS, INDUSTRIES, SERVICE_CATEGORIES, STEPS, TECH_GROUPS, TECH_TICKER, WHY_US, EXTRA_INDUSTRIES } from "../data/content";
import { BrandMark, Btn, CountUp, FlagEG, FlagSA, Icon, LogoMark, Marquee, Reveal, Scramble, SectionHeading, SmartImg, useInView } from "../components/kit";
import { waLink, hasWhatsApp, IMAGES } from "../config";
import { Magnetic, NetworkCanvas, Tilt } from "../components/fx";

/* ---------------- hero topology panel ---------------- */
function TopologyPanel() {
  const nodes = [
    { id: "hq", x: 150, y: 62, label: "HQ / DC" },
    { id: "branch", x: 48, y: 168, label: "BRANCH" },
    { id: "cloud", x: 252, y: 168, label: "M365 CLOUD" },
    { id: "cctv", x: 150, y: 252, label: "CCTV / ACCESS" },
  ];
  return (
    <div className="relative chamfer bg-ink-900/90 border border-ink-700 overflow-hidden scan">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-700 font-mono text-[10.5px] uppercase tracking-[0.25em] text-mist-400">
        <span className="flex items-center gap-2.5"><LogoMark className="w-5 h-5" /> YA-OPS / ENVIRONMENT</span>
        <span className="flex items-center gap-2 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 led" />LIVE</span>
      </div>
      <svg viewBox="0 0 300 300" className="w-full" aria-hidden="true">
        <defs>
          <radialGradient id="hg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E9A33B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E9A33B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="62" r="46" fill="url(#hg)" />
        {[
          [150, 62, 48, 168],
          [150, 62, 252, 168],
          [48, 168, 150, 252],
          [252, 168, 150, 252],
          [48, 168, 252, 168],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1f344c" strokeWidth="1.4" />
        ))}
        {[
          [150, 62, 48, 168],
          [150, 62, 252, 168],
          [48, 168, 150, 252],
          [252, 168, 150, 252],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={`f${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E9A33B" strokeWidth="1.4" className="dash-flow" opacity="0.75" />
        ))}
        {nodes.map((n, i) => (
          <g key={n.id}>
            {i === 0 && <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="#E9A33B" strokeWidth="1" className="pulse-ring" />}
            <rect x={n.x - 13} y={n.y - 13} width="26" height="26" fill="#0d1a29" stroke={i === 0 ? "#E9A33B" : "#4dab98"} strokeWidth="1.4" transform={`rotate(45 ${n.x} ${n.y})`} />
            <circle cx={n.x} cy={n.y} r="3" fill={i === 0 ? "#E9A33B" : "#6cc7b4"} className={i % 2 ? "led-fast" : "led"} />
            <text x={n.x} y={n.y + 32} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill="#7e93a6">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="px-5 pb-5 pt-1 grid gap-2.5">
        {[
          ["Active Directory", "healthy", false],
          ["Core network", "monitored", false],
          ["CCTV grid", "recording", true],
          ["M365 tenant", "managed", false],
        ].map(([k, v, hot], i) => (
          <div key={k as string} className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-mist-400">{k}</span>
            <span className={`flex items-center gap-2 ${hot ? "text-amber-400" : "text-circuit-400"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${hot ? "bg-amber-500 led-fast" : "bg-circuit-400 led"}`} style={{ animationDelay: `${i * 0.4}s` }} />
              {v}
            </span>
          </div>
        ))}
        <div className="mt-1 pt-3 border-t border-ink-700 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-mist-500">
          <span>SA · EG</span>
          <span>REMOTE + ON-SITE</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- mouse-follow ambient glow (desktop, motion-safe) ---------------- */
function HeroGlow() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(620px circle at var(--gx, 60%) var(--gy, 35%), rgba(233,163,59,0.08), transparent 62%)",
      }}
    />
  );
}

/* ---------------- featured case card ---------------- */
function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  const { L, t } = useLang();
  const cover = c.images?.[0];
  return (
    <Reveal delay={(index % 2) * 100}>
      <Tilt max={5} className="h-full">
      <Link to={`/projects/${c.id}`} className="group block chamfer-sm bg-paper-50 border border-ink-900/12 card-lift hover:border-ink-900/40 hover:shadow-[0_24px_60px_-30px_rgba(10,20,32,0.45)] h-full">
        <div className="relative overflow-hidden border-b border-ink-900/10">
          {cover ? (
            <div className="relative h-[132px] bg-ink-900 overflow-hidden">
              <img src={cover.file} alt={cover.caption ? L(cover.caption) : L(c.title)} loading="lazy" className="absolute inset-0 w-full h-full object-cover duo-img transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-2.5 start-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] bg-ink-950/85 text-paper-50 px-2 py-1 border border-ink-600">
                {c.images && c.images.length > 1 ? `${c.images.length} ${L({ en: "photos", ar: "صور" })}` : L({ en: "Field photo", ar: "صورة ميدانية" })}
              </span>
            </div>
          ) : (
          <svg viewBox="0 0 400 140" className="w-full h-[132px] bg-ink-900" aria-hidden="true">
            <defs>
              <pattern id={`p-${c.id}`} width="26" height="26" patternUnits="userSpaceOnUse">
                <path d="M0 26 26 0" stroke="#16283c" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="140" fill="#0a1420" />
            <rect width="400" height="140" fill={`url(#p-${c.id})`} />
            <circle cx={330} cy={40} r={54} fill="none" stroke="#1f344c" />
            <circle cx={330} cy={40} r={34} fill="none" stroke="#E9A33B" strokeOpacity="0.5" strokeDasharray="4 6" />
            <text x="24" y="46" fontFamily="Space Grotesk, Almarai, sans-serif" fontWeight="700" fontSize="26" fill="#f3f6f5">
              {String(index + 1).padStart(2, "0")}
            </text>
            <text x="24" y="68" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#7e93a6">
              CASE STUDY
            </text>
            {c.technologies.slice(0, 3).map((tech, i) => (
              <text key={tech} x={24 + i * 110} y="116" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="1.5" fill="#6cc7b4">
                ▸ {tech.toUpperCase()}
              </text>
            ))}
          </svg>
          )}
          <span className="absolute top-3 end-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-ink-950/85 text-amber-400 px-2.5 py-1 border border-ink-600">
            {L(MARKET_LABEL[c.market])}
          </span>
        </div>
        <div className="p-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500">{L(c.sector)}</p>
          <h3 className="mt-2.5 font-display text-[21px] font-bold text-ink-900 leading-snug group-hover:text-amber-600 transition-colors">{L(c.title)}</h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist-500 line-clamp-3">{L(c.summary)}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-900 group-hover:text-amber-600 transition-colors">
            {t("cta.readCase")}
            <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5" strokeWidth={2} />
          </span>
        </div>
      </Link>
      </Tilt>
    </Reveal>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    `${isAr ? "TECH OF THE WORLD | خدمات تقنية معلومات احترافية — السعودية ومصر" : "TECH OF THE WORLD | Professional IT Services & Technology Solutions — Saudi Arabia & Egypt"}`,
    "Technology That Moves Business Forward. IT infrastructure, networks, Microsoft & cloud, CCTV and access control for businesses in Saudi Arabia and Egypt."
  );
  const wa = waLink("Hello TECH OF THE WORLD — I would like to talk to an IT specialist.");
  const { projects } = useAllProjects();
  const featured = projects.filter((c) => c.featured);
  const { ref: finalRef, inView: finalIn } = useInView<HTMLDivElement>();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center bg-ink-950 text-paper-50 overflow-hidden noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <NetworkCanvas className="absolute inset-0 w-full h-full opacity-70" />
        <HeroGlow />
        <div className="absolute -top-32 -start-32 w-[620px] h-[620px] rounded-full bg-amber-500/[0.07] blur-[130px]" aria-hidden="true" />
        <div className="absolute bottom-0 end-0 w-[520px] h-[520px] rounded-full bg-circuit-500/[0.06] blur-[120px]" aria-hidden="true" />
        <img src={IMAGES.network} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.13] duo-img" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 w-full grid lg:grid-cols-[1.12fr_0.88fr] gap-14 lg:gap-10 items-center">
          <div>
            <Reveal className="flex flex-wrap items-center gap-4 mb-7">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-mist-300 border border-ink-600 px-3.5 py-2">
                <span className="w-1.5 h-1.5 bg-amber-500 led" />
                {isAr ? "مزوّد خدمات تقنية معلومات وحلول تكنولوجية" : "Professional IT Services & Technology Solutions"}
              </span>
            </Reveal>
            <h1 className="font-display font-bold tracking-tight text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04]">
              <Scramble text={isAr ? "تقنية تحرّك الأعمال" : "Technology That Moves"} delay={150} className="block" />
              <Scramble text={isAr ? "إلى الأمام." : "Business Forward."} delay={700} className="block text-amber-500" />
            </h1>
            <Reveal as="p" delay={900} className="mt-7 max-w-xl text-[17px] leading-relaxed text-mist-300">
              {isAr
                ? "نبني وندير بيئات تقنية المعلومات التي تعتمد عليها الشركات — البنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن — عن بُعد وفي الموقع، في السعودية ومصر."
                : "We build and run the IT environments businesses depend on — infrastructure, networks, Microsoft environments and security systems — delivered remotely and on-site across Saudi Arabia and Egypt."}
            </Reveal>
            <Reveal delay={1020} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic><Btn to="/request">{t("nav.request")}</Btn></Magnetic>
              <Magnetic><Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn></Magnetic>
            </Reveal>
            <Reveal delay={1150} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-mist-500">{t("common.primaryMarkets")}</span>
              <Link to="/saudi-arabia" className="flex items-center gap-2.5 text-[14.5px] font-medium text-mist-200 hover:text-amber-400 transition-colors">
                <FlagSA /> Saudi Arabia
              </Link>
              <span className="w-1 h-1 rounded-full bg-ink-600" aria-hidden="true" />
              <Link to="/egypt" className="flex items-center gap-2.5 text-[14.5px] font-medium text-mist-200 hover:text-amber-400 transition-colors">
                <FlagEG /> Egypt
              </Link>
            </Reveal>
          </div>
          <Reveal delay={400} className="relative max-w-md w-full mx-auto lg:ms-auto">
            <div className="absolute -top-5 -start-5 w-full h-full border border-amber-500/25 chamfer" aria-hidden="true" />
            <Tilt max={4}><TopologyPanel /></Tilt>
          </Reveal>
        </div>

        <div className="absolute bottom-7 inset-x-0 hidden md:block">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-mist-500">
            <span>SCROLL</span>
            <span className="h-8 w-px bg-gradient-to-b from-amber-500 to-transparent" aria-hidden="true" />
            <span>EST. KSA · EGYPT</span>
          </div>
        </div>
      </section>

      {/* ============ TECH TICKER ============ */}
      <div className="relative bg-ink-900 border-y border-ink-700 py-4">
        <Marquee>
          {TECH_TICKER.map((tech) => (
            <span key={tech} className="flex items-center gap-6 px-6 font-mono text-[12px] uppercase tracking-[0.3em] text-mist-400 whitespace-nowrap">
              <span className="text-amber-500">✦</span>{tech}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ============ EXPERIENCE METRICS (verified) ============ */}
      <section className="relative bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/15 border border-ink-900/15">
            {FOUNDER_METRICS.map((f, i) => (
              <Reveal key={f.label.en} delay={i * 90} className="bg-paper-100 p-8 group hover:bg-ink-900 transition-colors duration-500">
                <p className="font-display text-5xl lg:text-6xl font-bold text-ink-900 group-hover:text-amber-500 transition-colors">
                  <CountUp value={f.value} />
                  <span className="text-amber-600 group-hover:text-amber-500">{f.suffix}</span>
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] leading-relaxed text-mist-500 group-hover:text-mist-300 transition-colors">{L(f.label)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            {[
              { en: "Remote & on-site delivery", ar: "تنفيذ عن بُعد وميداني" },
              { en: "Multi-vendor technology experience", ar: "خبرة تقنية متعددة الموردين" },
              { en: "Infrastructure-focused approach", ar: "منهجية تبدأ من البنية التحتية" },
            ].map((s) => (
              <span key={s.en} className="inline-flex items-center gap-2.5 text-[14px] font-medium text-mist-500">
                <Icon name="check" className="w-4 h-4 text-amber-600" strokeWidth={2.2} /> {L(s)}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              kicker={isAr ? "مسارات الخدمات" : "Service Lines"}
              tone="light"
              title={{ en: "Five lines. One accountable team.", ar: "خمسة مسارات. فريق واحد مسؤول." }}
              lead={{
                en: "Every service we deliver belongs to one of five disciplines — so you always know who owns your environment end to end.",
                ar: "كل خدمة نقدمها تنتمي إلى واحد من خمسة تخصصات — لتعرف دائمًا من يملك مسؤولية بيئتك من البداية للنهاية.",
              }}
            />
            <Btn to="/services" variant="outline" className="mb-2">{t("nav.services")}</Btn>
          </div>
          <div className="border-t border-ink-700">
            {SERVICE_CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <Link
                  to={`/services#${c.id}`}
                  className="group grid md:grid-cols-[70px_56px_1fr_auto] items-center gap-5 md:gap-8 border-b border-ink-700 py-7 px-2 md:px-4 transition-all duration-300 hover:bg-ink-900 hover:ps-6"
                >
                  <span className="font-mono text-[13px] text-amber-500">0{i + 1}</span>
                  <span className="hidden md:grid w-12 h-12 place-items-center border border-ink-600 text-mist-300 group-hover:border-amber-500 group-hover:text-amber-400 transition-colors">
                    <Icon name={c.icon} className="w-6 h-6" />
                  </span>
                  <span>
                    <span className="font-display text-xl md:text-2xl font-bold group-hover:text-amber-400 transition-colors block">{L(c.name)}</span>
                    <span className="text-mist-400 text-[14px] mt-1 block max-w-2xl">{L(c.tagline)}</span>
                  </span>
                  <span className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500 group-hover:text-amber-400 transition-colors">
                    {t("cta.learnMore")}
                    <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="relative bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              kicker={isAr ? "دراسات حالة" : "Case Studies"}
              tone="dark"
              title={{ en: "Real environments, documented work.", ar: "بيئات حقيقية وعمل موثّق." }}
              lead={{
                en: "Selected engagements presented as they were delivered — scope, decisions and outcomes, with client details kept confidential.",
                ar: "أعمال مختارة كما نُفذت فعلًا — النطاق والقرارات والنتائج، مع الحفاظ على سرية بيانات العملاء.",
              }}
            />
            <Btn to="/projects" variant="outlineLight" className="mb-2">{t("cta.exploreProjects")}</Btn>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((c, i) => (
              <CaseCard key={c.id} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FIELD BAND ============ */}
      <section className="relative overflow-hidden">
        <SmartImg src={IMAGES.rack} alt="Organized enterprise network rack with structured cabling" className="absolute inset-0 w-full h-full object-cover duo-img bg-ink-900" />
        <div className="absolute inset-0 bg-ink-950/78" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 lg:py-32 text-center">
          <Reveal className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-6">YA / FIELD STANDARD</Reveal>
          <Reveal line as="p" delay={100}>
            <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-paper-50 leading-tight">
              {isAr ? "«نحن نحل مشكلات التقنية في الأعمال.»" : "“We solve business technology problems.”"}
            </span>
          </Reveal>
          <Reveal as="p" delay={220} className="mt-6 text-mist-300 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "لا نبيع أجهزة ولا ساعات عمل — نسلّم بيئات تعمل. موثقة، قابلة للإدارة، ومبنية لتستمر بعد مغادرتنا."
              : "We don't sell boxes or bill hours — we deliver environments that work. Documented, manageable, and built to keep running after we leave."}
          </Reveal>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <SectionHeading
            kicker={isAr ? "لماذا نحن" : "Why TECH OF THE WORLD"}
            tone="light"
            title={{ en: "Built like an engineering practice, not a ticket queue.", ar: "مبنيون كمنهجية هندسية، لا كطابور تذاكر." }}
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title.en} delay={(i % 3) * 90} className="h-full">
                <Tilt max={6} className="h-full">
                <div className="group h-full chamfer-sm bg-ink-900 border border-ink-700 p-7 card-lift hover:border-amber-500/60">
                  <div className="flex items-center justify-between">
                    <span className="w-11 h-11 grid place-items-center border border-ink-600 text-amber-500 group-hover:bg-amber-500 group-hover:text-ink-950 transition-all duration-300">
                      <Icon name={w.icon} className="w-5.5 h-5.5" />
                    </span>
                    <span className="font-mono text-[11px] text-mist-500">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{L(w.title)}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-mist-300">{L(w.body)}</p>
                </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="relative bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <div className="lg:sticky lg:top-32 self-start">
            <SectionHeading
              kicker={isAr ? "منهجية العمل" : "How We Work"}
              tone="dark"
              title={{ en: "Five steps. No theatre.", ar: "خمس خطوات. بلا استعراض." }}
              lead={{
                en: "The same disciplined path whether we are fixing one server room or running your whole environment.",
                ar: "المسار المنضبط نفسه، سواء أصلحنا غرفة خوادم واحدة أو أدرنا بيئتك كاملة.",
              }}
            />
            <Btn to="/request" variant="dark" className="mt-9">{t("cta.assessment")}</Btn>
          </div>
          <div className="relative">
            <div className="absolute top-3 bottom-3 start-[22px] w-px bg-ink-900/15" aria-hidden="true" />
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="relative flex gap-6 group">
                    <span className="relative z-10 shrink-0 w-11 h-11 grid place-items-center bg-ink-900 text-amber-500 font-mono text-[12px] group-hover:bg-amber-500 group-hover:text-ink-950 transition-colors duration-300">
                      {s.n}
                    </span>
                    <div className="chamfer-sm bg-paper-50 border border-ink-900/10 p-6 flex-1 group-hover:border-ink-900/35 transition-colors">
                      <h3 className="font-display text-xl font-bold">{L(s.title)}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-mist-500">{L(s.body)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="relative bg-ink-950 text-paper-50 noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              kicker={isAr ? "القطاعات" : "Industries"}
              tone="light"
              title={{ en: "Wherever business runs on IT.", ar: "حيثما تعتمد الأعمال على التقنية." }}
            />
            <Btn to="/industries" variant="outline" className="mb-2">{t("nav.industries")}</Btn>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name.en} delay={(i % 3) * 80}>
                <Link to="/industries" className="group flex items-center gap-4 chamfer-sm border border-ink-700 bg-ink-900/70 p-5 card-lift hover:border-amber-500/60 h-full">
                  <span className="w-11 h-11 shrink-0 grid place-items-center text-amber-500 border border-ink-600 group-hover:bg-amber-500 group-hover:text-ink-950 transition-all duration-300">
                    <Icon name={ind.icon} className="w-5.5 h-5.5" />
                  </span>
                  <span className="font-display font-semibold text-[15px] leading-snug">{L(ind.name)}</span>
                </Link>
              </Reveal>
            ))}
            {EXTRA_INDUSTRIES.map((x, i) => (
              <Reveal key={x.en} delay={i * 60}>
                <Link to="/industries" className="group flex items-center gap-4 chamfer-sm border border-dashed border-ink-600 p-5 hover:border-amber-500/60 transition-colors h-full">
                  <span className="text-amber-500"><Icon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" /></span>
                  <span className="font-display font-semibold text-[15px] text-mist-300 group-hover:text-paper-50 transition-colors">{L(x)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECH EXPERTISE ============ */}
      <section className="relative bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <SectionHeading
            kicker={isAr ? "الخبرة التقنية" : "Technology Expertise"}
            tone="dark"
            title={{ en: "Tools we have actually shipped with.", ar: "أدوات عملنا بها فعلًا في الميدان." }}
            lead={{
              en: "A working stack earned through real deployments — listed because we use it, not because it impresses.",
              ar: "حزمة تقنية اكتُسبت من تنفيذ حقيقي — نذكرها لأننا نستخدمها، لا لأنها تثير الإعجاب.",
            }}
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-900/15 border border-ink-900/15">
            {TECH_GROUPS.map((g, i) => (
              <Reveal key={g.name.en} delay={i * 70} className="bg-paper-100 p-7 hover:bg-paper-50 transition-colors">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-amber-600 mb-5">{L(g.name)}</p>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] font-medium text-ink-800" dir="ltr">
                      <span className="w-1.5 h-1.5 bg-amber-500" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-[13px] font-mono text-mist-500">
            {isAr
              ? "* خبرة عملية موثقة — لا ندّعي شراكات أو شهادات رسمية غير ممنوحة."
              : "* Verified hands-on experience — no partnership or certification claims unless formally granted."}
          </Reveal>
        </div>
      </section>

      {/* ============ ASSESSMENT CTA ============ */}
      <section className="relative bg-amber-500 text-ink-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #0a1420 0 2px, transparent 2px 18px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.3em] mb-4">IT ASSESSMENT</Reveal>
            <Reveal line as="h2" delay={80}>
              <span className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                {isAr ? "تحتاج رؤية أوضح لبيئتك التقنية؟" : "Need a clearer view of your IT environment?"}
              </span>
            </Reveal>
            <Reveal as="p" delay={160} className="mt-3 max-w-xl text-[15.5px] font-medium leading-relaxed">
              {isAr
                ? "تقييم أولي منظم لبنيتك التحتية وشبكاتك وبيئات مايكروسوفت وأنظمتك الأمنية — بنتائج تفهمها دون مترجم."
                : "A structured first look at your infrastructure, networks, Microsoft environments and security systems — with findings you can read without a translator."}
            </Reveal>
          </div>
          <Reveal delay={220} className="shrink-0">
            <Btn to="/request" variant="dark">{t("cta.assessment")}</Btn>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section ref={finalRef} className="relative bg-ink-950 text-paper-50 noise overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-ink-700" aria-hidden="true" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-ink-700" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 lg:py-32 text-center">
          <BrandMark className="mx-auto mb-8 float-slow" />
          <h2 className="font-display font-bold tracking-tight text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.05]">
            <span className={`block transition-all duration-1000 ${finalIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {isAr ? "لنحلّ مشكلتك" : "Let's Solve Your"}
            </span>
            <span className={`block text-amber-500 transition-all duration-1000 delay-200 ${finalIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {isAr ? "التقنية معًا." : "IT Challenge."}
            </span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-mist-300 leading-relaxed">{t("misc.shareIdeaBody")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Btn to="/request">{t("nav.request")}</Btn>
            {hasWhatsApp && wa && (
              <Btn href={wa} variant="outline" arrow={false}>
                <Icon name="wa" className="w-5 h-5 text-[#3fbf6f]" /> {t("cta.talkSpecialist")}
              </Btn>
            )}
          </div>
          {hasWhatsApp && (
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.25em] text-red-400 hover:text-red-300 transition-colors">
              <Icon name="alert" className="w-4 h-4" /> {t("cta.urgent")}
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
