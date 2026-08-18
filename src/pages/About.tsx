import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { Btn, FlagEG, FlagSA, Icon, LogoMark, PageHero, Reveal, SectionHeading } from "../components/kit";
import { IMAGES } from "../config";

const PRINCIPLES = [
  {
    icon: "briefcase",
    t: { en: "Business first, always", ar: "الأعمال أولًا دائمًا" },
    b: {
      en: "A network diagram is a means, not an end. If a technical decision cannot be connected to uptime, risk or cost, we reconsider it.",
      ar: "مخطط الشبكة وسيلة لا غاية. إذا لم يمكن ربط قرار تقني بالتشغيل أو المخاطر أو التكلفة، نعيد النظر فيه.",
    },
  },
  {
    icon: "foundation",
    t: { en: "Infrastructure thinking", ar: "تفكير البنية التحتية" },
    b: {
      en: "We design for the environment five years from now, not just the ticket of today. Foundations decide everything built on top.",
      ar: "نصمم لبيئة ما بعد خمس سنوات، لا لتذكرة اليوم فقط. الأساسات تحدد كل ما سيُبنى فوقها.",
    },
  },
  {
    icon: "shield",
    t: { en: "Honest scope", ar: "نطاق صادق" },
    b: {
      en: "We tell clients what they do not need as readily as what they do. Trust is built by subtraction as much as by delivery.",
      ar: "نخبر العملاء بما لا يحتاجونه بنفس وضوح ما يحتاجونه. الثقة تُبنى بالحذف كما تُبنى بالتسليم.",
    },
  },
  {
    icon: "clock",
    t: { en: "Long-term operation", ar: "تشغيل طويل الأمد" },
    b: {
      en: "We hand over environments any competent team can run — documented and maintainable — because success is what happens after we leave.",
      ar: "نسلّم بيئات يستطيع أي فريق كفء تشغيلها — موثقة وقابلة للصيانة — لأن النجاح هو ما يحدث بعد مغادرتنا.",
    },
  },
];

export default function About() {
  const { L, t, isAr } = useLang();
  usePageMeta(
    isAr ? "من نحن | TECH OF THE WORLD — يوسف أحمد، مؤسس ومتخصص بنية تحتية تقنية" : "About | TECH OF THE WORLD — Founded by Yousef Ahmed, IT Infrastructure Specialist",
    "TECH OF THE WORLD is a professional IT services & technology solutions provider founded by Yousef Ahmed — serving businesses in Saudi Arabia and Egypt."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "من نحن" : "About"}
        title={{ en: "One mission: technology that moves business forward.", ar: "مهمة واحدة: تقنية تحرّك الأعمال إلى الأمام." }}
        lead={{
          en: "TECH OF THE WORLD exists because most businesses don't need more technology — they need technology that works, explained in terms they can act on.",
          ar: "وُجدت TECH OF THE WORLD لأن معظم الشركات لا تحتاج مزيدًا من التقنية — بل تقنية تعمل، وتُشرح بلغة يمكنهم التحرك وفقها.",
        }}
        image={IMAGES.network}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
        <Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn>
      </PageHero>

      {/* story */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24 grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              kicker={isAr ? "القصة" : "The Story"}
              tone="dark"
              title={{ en: "We solve business technology problems.", ar: "نحن نحل مشكلات التقنية في الأعمال." }}
            />
            <Reveal delay={150} className="mt-8 space-y-5 text-[15.5px] leading-[1.85] text-mist-500">
              <p>
                {isAr
                  ? "بدأت TECH OF THE WORLD من الميدان: غرف خوادم تُبنى، شبكات تُمدد عبر مواقع إنشاء، كاميرات مراقبة تُصمم لتجيب عن أسئلة حقيقية، وبيئات مايكروسوفت تُدار لأعمال تعتمد عليها كل يوم."
                  : "TECH OF THE WORLD began in the field: server rooms built, networks extended across construction sites, surveillance designed to answer real questions, and Microsoft environments administered for businesses that depend on them daily."}
              </p>
              <p>
                {isAr
                  ? "عبر سنوات من العمل في السعودية ومصر، اتضح نمط ثابت: الشركات لا تعاني من نقص الأدوات، بل من غياب من يملك المسؤولية الكاملة عن البيئة التقنية — من يفهمها، يوثقها، ويشغّلها بهدوء."
                  : "Across years of work in Saudi Arabia and Egypt, one pattern kept repeating: businesses don't suffer from a lack of tools — they suffer from the absence of anyone owning the technology environment end to end. Someone who understands it, documents it, and keeps it running quietly."}
              </p>
              <p>
                {isAr
                  ? "هذا هو دورنا. نتحدث بصيغة «نحن» لأن العمل يُسلَّم كمسؤولية واحدة متكاملة — تقييم وتخطيط وتنفيذ ودعم — لا كمهام متفرقة."
                  : "That is our role. We speak as “we” because the work is delivered as one accountable whole — assessment, planning, implementation and support — not as disconnected tasks."}
              </p>
            </Reveal>
          </div>

          {/* founder */}
          <Reveal delay={120}>
            <div className="chamfer bg-ink-900 text-paper-50 p-8 sm:p-10 relative overflow-hidden noise">
              <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-5">
                  <span className="w-16 h-16 grid place-items-center bg-amber-500 text-ink-950 chamfer-sm">
                    <LogoMark tone="dark" className="w-9 h-9" />
                  </span>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-amber-500">{isAr ? "المؤسس" : "Founder"}</p>
                    <h2 className="font-display text-2xl font-bold mt-1">Yousef Ahmed</h2>
                    <p className="text-mist-300 text-[13.5px] mt-0.5">{isAr ? "مؤسس ومتخصص البنية التحتية لتقنية المعلومات" : "Founder & IT Infrastructure Specialist"}</p>
                  </div>
                </div>
                <div className="mt-7 space-y-4 text-[14.5px] leading-relaxed text-mist-300">
                  <p>
                    {isAr
                      ? "يقود يوسف العمل بنفس المعيار الذي ينفذ به: من تقييم البيئة الأولى حتى آخر كابل موسوم في الراك. خبرته عملية تراكمية عبر بيئات مؤسسية في السوقين السعودي والمصري."
                      : "Yousef leads the work by the same standard he delivers it: from the first environment assessment to the last labeled cable in the rack. His experience is cumulative, hands-on work across enterprise environments in both the Saudi and Egyptian markets."}
                  </p>
                  <p>
                    {isAr
                      ? "عبر مسارات العمل الخمسة — البنية التحتية والشبكات وبيئات مايكروسوفت وأنظمة الأمن والاستشارات — يبقى المبدأ واحدًا: التقنية تخدم العمل، وليس العكس."
                      : "Across all five service lines — infrastructure, networks, Microsoft environments, security systems and consultancy — the principle stays the same: technology serves the business, never the reverse."}
                  </p>
                </div>
                <div className="mt-7 pt-6 border-t border-ink-700 grid grid-cols-2 gap-4">
                  {[
                    { k: isAr ? "التركيز" : "Focus", v: isAr ? "البنية التحتية والعمليات" : "Infrastructure & Operations" },
                    { k: isAr ? "الأسواق" : "Markets", v: isAr ? "السعودية · مصر" : "Saudi Arabia · Egypt" },
                  ].map((r) => (
                    <div key={r.k}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500">{r.k}</p>
                      <p className="mt-1 text-[13.5px] font-medium text-mist-200">{r.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <SectionHeading
            kicker={isAr ? "المبادئ" : "Principles"}
            tone="light"
            title={{ en: "How we decide, when nobody is watching.", ar: "كيف نتخذ القرار حين لا يراقبنا أحد." }}
          />
          <div className="mt-14 grid sm:grid-cols-2 gap-5">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t.en} delay={(i % 2) * 90}>
                <div className="group flex gap-6 chamfer-sm bg-ink-900 border border-ink-700 p-7 card-lift hover:border-amber-500/60 h-full">
                  <span className="w-12 h-12 shrink-0 grid place-items-center border border-ink-600 text-amber-500 group-hover:bg-amber-500 group-hover:text-ink-950 transition-all duration-300">
                    <Icon name={p.icon} className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{L(p.t)}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-mist-300">{L(p.b)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* we are / we are not */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="chamfer-sm bg-paper-50 border border-ink-900/10 p-8 h-full">
              <h2 className="font-display text-xl font-bold flex items-center gap-3">
                <span className="w-9 h-9 grid place-items-center bg-ink-900 text-amber-500"><Icon name="check" className="w-4.5 h-4.5" strokeWidth={2.2} /></span>
                {isAr ? "ما نحن عليه" : "What we are"}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {[
                  { en: "A professional IT services & technology solutions provider", ar: "مزوّد خدمات تقنية معلومات وحلول تكنولوجية احترافي" },
                  { en: "An infrastructure-first engineering practice", ar: "منهجية هندسية تبدأ من البنية التحتية" },
                  { en: "A remote + on-site partner across two markets", ar: "شريك عن بُعد وميداني عبر سوقين" },
                  { en: "An accountable owner of your environment", ar: "طرف مسؤول مسؤولية كاملة عن بيئتك" },
                ].map((x) => (
                  <li key={x.en} className="flex gap-3 items-start text-[14.5px] text-mist-500"><Icon name="check" className="w-4 h-4 text-amber-600 shrink-0 mt-1" strokeWidth={2.2} />{L(x)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="chamfer-sm bg-ink-900 text-paper-50 p-8 h-full">
              <h2 className="font-display text-xl font-bold flex items-center gap-3">
                <span className="w-9 h-9 grid place-items-center bg-amber-500 text-ink-950"><Icon name="close" className="w-4 h-4" strokeWidth={2.4} /></span>
                {isAr ? "وما لسنا عليه" : "What we are not"}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {[
                  { en: "A computer shop or hardware retailer", ar: "محل حواسيب أو متجر أجهزة" },
                  { en: "A generic freelancer profile", ar: "ملف مستقل عام" },
                  { en: "A vendor pushing one brand's products", ar: "وكيل يدفع منتجات علامة واحدة" },
                  { en: "A team that promises numbers it cannot verify", ar: "فريق يعد بأرقام لا يستطيع توثيقها" },
                ].map((x) => (
                  <li key={x.en} className="flex gap-3 items-start text-[14.5px] text-mist-300"><Icon name="close" className="w-4 h-4 text-red-400 shrink-0 mt-1" strokeWidth={2.4} />{L(x)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* markets */}
      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <SectionHeading
            kicker={isAr ? "الأسواق" : "Where we work"}
            tone="light"
            title={{ en: "Two markets, one standard.", ar: "سوقان، ومعيار واحد." }}
          />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              {
                flag: <FlagSA className="w-9 h-9" />,
                name: { en: "Saudi Arabia", ar: "السعودية" },
                to: "/saudi-arabia",
                body: {
                  en: "From seasonal mega-operations to growing enterprises — infrastructure, Microsoft environments and security systems delivered to Saudi businesses.",
                  ar: "من العمليات الموسمية الضخمة إلى الشركات النامية — بنية تحتية وبيئات مايكروسوفت وأنظمة أمن تُسلَّم للشركات السعودية.",
                },
              },
              {
                flag: <FlagEG className="w-9 h-9" />,
                name: { en: "Egypt", ar: "مصر" },
                to: "/egypt",
                body: {
                  en: "Supporting Egyptian SMBs with dependable IT environments — pragmatic, cost-aware, and built to grow with the business.",
                  ar: "ندعم الشركات المصرية الصغيرة والمتوسطة ببيئات تقنية موثوقة — عملية، تراعي التكلفة، ومبنية لتنمو مع العمل.",
                },
              },
            ].map((m, i) => (
              <Reveal key={m.to} delay={i * 100}>
                <div className="chamfer-sm bg-ink-900 border border-ink-700 p-8 card-lift hover:border-amber-500/60 h-full flex flex-col">
                  <div className="flex items-center gap-4">
                    {m.flag}
                    <h3 className="font-display text-2xl font-bold">{L(m.name)}</h3>
                  </div>
                  <p className="mt-4 text-mist-300 leading-relaxed text-[14.5px] flex-1">{L(m.body)}</p>
                  <Btn to={m.to} variant="outline" className="mt-7 self-start">{t("cta.learnMore")}</Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-500 text-ink-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">{t("misc.shareIdea")}</h2>
          <div className="flex gap-4 flex-wrap">
            <Btn to="/request" variant="dark">{t("nav.request")}</Btn>
            <Btn to="/contact" variant="outlineLight" className="!border-ink-950/40 !text-ink-950 hover:!bg-ink-950">{t("nav.contact")}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
