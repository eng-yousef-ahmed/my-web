import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { HOME_ASSETS, IMAGES } from "../config";
import { Link } from "react-router-dom";
import { Btn, Icon, Reveal, useAsset } from "../components/kit";
import { FOUNDER_METRICS, SERVICE_CATEGORIES } from "../data/content";
import { MARKET_LABEL } from "../data/cases";
import { CERTIFICATES, formatIssued } from "../data/certificates";
import { useAllProjects } from "../data/projectLoader";

/* ================= HOME — the portrait IS the page =================
 * The profile image becomes the full-page cinematic background; the
 * introduction sits over it, opposite the subject. The image stays
 * replaceable from public/images/profile/ with zero code edits.
 */
export default function Home() {
  const { isAr } = useLang();
  usePageMeta(
    isAr
      ? "يوسف أحمد — أخصائي دعم تقني أول"
      : "Yousef Ahmed — Senior IT Support Specialist",
    isAr
      ? "أبني وأدير بيئات تقنية موثوقة تعتمد عليها الأعمال يوميًا. خبرة عملية في البنية التحتية والشبكات ومايكروسوفت وأنظمة الأمن في السعودية ومصر."
      : "I build and manage reliable IT environments that businesses depend on every day. Hands-on experience across infrastructure, networks, Microsoft and security systems in Saudi Arabia & Egypt."
  );

  const src = useAsset(HOME_ASSETS.profile, IMAGES.profile);

  return (
    <>
    <section className="relative min-h-svh bg-ink-950 text-paper-50 overflow-hidden noise">
      {/* ---------- the portrait as full-page background ---------- */}
      {/* mobile: subject centered in the upper area */}
      <img
        src={src}
        alt={isAr ? "يوسف أحمد، أخصائي دعم تقني أول" : "Yousef Ahmed, Senior IT Support Specialist"}
        className="kenburns absolute inset-0 w-full h-full object-cover lg:hidden"
        style={{ objectPosition: "50% 10%" }}
      />
      {/* desktop: subject placed opposite the text side. The photo has the subject on the right,
          so in Arabic (text on the right) the image is mirrored to bring him to the left. */}
      <div className={`absolute inset-0 hidden lg:block ${isAr ? "-scale-x-100" : ""}`} aria-hidden="true">
        <img
          src={src}
          alt=""
          className="kenburns w-full h-full object-cover"
          style={{ objectPosition: "74% 12%" }}
        />
      </div>

      {/* readability scrims — dark where the text lives, soft elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/72 to-ink-950/[0.06] rtl:bg-gradient-to-l" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-950/90 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(6,13,22,0.5) 100%)" }}
        aria-hidden="true"
      />

      {/* ambient layers */}
      <div className="absolute inset-0 grid-bg opacity-[0.13]" aria-hidden="true" />
      <div
        className="absolute inset-y-0 start-[-8%] w-[58%] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 32% 46%, rgba(233,163,59,0.08), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* quiet corner ticks */}
      <span className="absolute top-24 start-6 w-7 h-7 border-t border-s border-amber-500/40 hidden md:block" aria-hidden="true" />
      <span className="absolute bottom-24 end-6 w-7 h-7 border-b border-e border-amber-500/40 hidden md:block" aria-hidden="true" />

      {/* vertical edge label */}
      <p
        className="absolute end-7 top-1/2 -translate-y-1/2 hidden xl:block font-mono text-[11px] uppercase tracking-[0.42em] text-mist-400/70"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        {isAr ? "بطاقة تعريف مهنية" : "Professional Identity"} · YA
      </p>

      {/* ---------- introduction, aligned to the start side ---------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-svh flex flex-col justify-center pt-28 pb-24">
        <div className="max-w-2xl">
          <Reveal className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-amber-400">{isAr ? "ملف أعمال" : "Portfolio"}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-ink-950/55 backdrop-blur-sm px-3.5 py-1.5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#3fbf6f] pulse-ring" aria-hidden="true" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3fbf6f]" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-200">
                {isAr ? "متاح للتواصل" : "Available"}
              </span>
            </span>
          </Reveal>

          <Reveal line as="h1" delay={100} className="mt-7">
            <span className="block font-display font-bold tracking-tight leading-[1.05] text-[clamp(3rem,7vw,5.75rem)] drop-shadow-[0_4px_30px_rgba(6,13,22,0.9)]">
              {isAr ? (
                <>
                  يوسف <span className="text-amber-400">أحمد</span>
                </>
              ) : (
                <>
                  Yousef <span className="text-amber-400">Ahmed</span>
                </>
              )}
            </span>
          </Reveal>

          <Reveal delay={200} className="mt-4">
            <p className="font-mono text-[12.5px] sm:text-[13.5px] uppercase tracking-[0.26em] text-mist-200">
              {isAr ? "أخصائي دعم تقني أول" : "Senior IT Support Specialist"}
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-8">
            <p className="text-xl sm:text-[22px] font-semibold leading-[1.55] text-paper-50/95 max-w-xl drop-shadow-[0_2px_16px_rgba(6,13,22,0.8)]">
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

          <Reveal as="p" delay={360} className="mt-5 max-w-lg text-[14.5px] sm:text-[15px] leading-relaxed text-mist-300">
            {isAr
              ? "خبرة عملية في البنية التحتية، الشبكات، Microsoft، أنظمة المراقبة والدعم التقني في السعودية ومصر."
              : "Practical experience across infrastructure, networks, Microsoft environments, security systems, and technical support in Saudi Arabia and Egypt."}
          </Reveal>

          <Reveal delay={440} className="mt-10 flex flex-wrap items-center gap-4">
            <Btn to="/projects">{isAr ? "استعرض مشاريعي" : "Explore Projects"}</Btn>
            <Btn to="/about" variant="outline">
              {isAr ? "عني" : "About Me"}
            </Btn>
          </Reveal>
        </div>
      </div>

      {/* quiet baseline strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden sm:block" aria-hidden="true">
        <div className="max-w-[1400px] mx-auto px-8 pb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-mist-500">
          <span>{isAr ? "جدة · السعودية" : "Jeddah · Saudi Arabia"}</span>
          <span className="flex items-center gap-2">
            <Icon name="globe" className="w-3.5 h-3.5 text-amber-500/70" />
            {isAr ? "السعودية · مصر" : "SA · EG"}
          </span>
          <span>{isAr ? "عن بُعد + ميداني" : "Remote + On-site"}</span>
        </div>
      </div>
    </section>
    <ProofSection />
    <ServicesStrip />
    </>
  );
}

/* ================= proof: numbers + selected work (all from existing data) ================= */
function ProofSection() {
  const { isAr, L, t } = useLang();
  const { projects } = useAllProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="bg-paper-100 text-ink-900 grid-bg-light">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/15 border border-ink-900/15">
          {FOUNDER_METRICS.map((m, i) => (
            <Reveal key={m.label.en} delay={i * 80} className="bg-paper-100 p-6 sm:p-7">
              <p className="font-display text-3xl sm:text-4xl font-bold text-ink-900">{m.value}</p>
              <p className="mt-2 text-[13px] text-mist-500">{L(m.label)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-10 gap-y-5 border border-ink-900/15 bg-paper-50 px-5 sm:px-7 py-5">
            <div className="lg:w-48 shrink-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-kicker">{isAr ? "شهادات موثّقة" : "Verified credentials"}</p>
              <Link
                to="/about#certifications"
                className="group mt-2 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors"
              >
                {isAr ? "كل الشهادات" : "All certificates"}
                <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
              </Link>
            </div>
            <ul className="flex-1 grid sm:grid-cols-3 gap-x-6 gap-y-4">
              {CERTIFICATES.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5"
                    aria-label={`${L(c.title)} — ${isAr ? "تحقق من الشهادة" : "verify credential"}`}
                  >
                    <img src={c.badge} alt="" width={52} height={52} loading="lazy" className="w-[52px] h-[52px] shrink-0" />
                    <span className="min-w-0">
                      <span className="block font-display text-[14px] font-bold leading-snug text-ink-900 group-hover:text-amber-700 transition-colors">{L(c.title)}</span>
                      <span className="mt-0.5 block text-[12px] text-mist-500">
                        Cisco Networking Academy · {formatIssued(c.issued, isAr)}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-kicker">
              <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
              {isAr ? "أعمال مختارة" : "Selected Work"}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {isAr ? "مشاريع سلّمتها فعلًا." : "Projects I actually delivered."}
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-700 transition-colors"
          >
            {isAr ? "كل المشاريع" : "All projects"}
            <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
          </Link>
        </Reveal>

        <div className="mt-9 grid md:grid-cols-3 gap-5">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i * 80} className="h-full">
              <Link
                to={`/projects/${c.id}`}
                className="group block h-full bg-paper-50 border border-ink-900/10 p-6 card-lift hover:border-ink-900/30"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700">
                  {String(i + 1).padStart(2, "0")} · {L(MARKET_LABEL[c.market])}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink-900 group-hover:text-amber-700 transition-colors">
                  {L(c.title)}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mist-500">{L(c.sector)}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-mist-500 line-clamp-3">{L(c.summary)}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 group-hover:text-amber-700 transition-colors">
                  {t("cta.readCase")}
                  <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= what I offer — links into the Services page ================= */
function ServicesStrip() {
  const { isAr, L } = useLang();
  return (
    <section className="relative bg-ink-950 text-paper-50 noise">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">
            <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
            {isAr ? "ما أقدّمه" : "What I Offer"}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            {isAr ? "خمسة مسارات، مسؤول واحد." : "Five service lines, one accountable owner."}
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-700 border border-ink-700">
          {SERVICE_CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 60} className="bg-ink-900">
              <Link to={`/services#${c.id}`} className="group flex h-full flex-col p-6 hover:bg-ink-850 transition-colors">
                <Icon name={c.icon} className="w-6 h-6 text-amber-400" />
                <span className="mt-4 font-display text-[15px] font-bold leading-snug group-hover:text-amber-400 transition-colors">{L(c.name)}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-ink-700 pt-8">
          <p className="text-[15px] text-mist-300 max-w-md">
            {isAr ? "عندك بيئة تقنية محتاجة تتبني أو تتصلّح؟ احكيلي عنها." : "Have an IT environment to build or fix? Tell me about it."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Btn to="/contact">{isAr ? "تواصل معي" : "Contact Me"}</Btn>
            <Btn to="/services" variant="outline">
              {isAr ? "كل الخدمات" : "All Services"}
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
