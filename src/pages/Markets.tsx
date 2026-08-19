import React from "react";
import { Link } from "react-router-dom";
import { useLang, usePageMeta } from "../i18n";
import { CASES, MARKET_LABEL } from "../data/cases";
import { Btn, FlagEG, FlagSA, Icon, PageHero, Reveal, SectionHeading } from "../components/kit";
import { hasWhatsApp, waLink, IMAGES } from "../config";

type MarketId = "sa" | "eg";

const CONTENT: Record<
  MarketId,
  {
    kicker: string;
    title: { en: string; ar: string };
    lead: { en: string; ar: string };
    image: string;
    focus: { icon: string; name: { en: string; ar: string }; desc: { en: string; ar: string } }[];
    model: { en: string; ar: string }[];
    note: { en: string; ar: string };
  }
> = {
  sa: {
    kicker: "SAUDI ARABIA / KSA",
    title: {
      en: "IT services for businesses building the new Saudi economy.",
      ar: "خدمات تقنية للشركات التي تبني الاقتصاد السعودي الجديد.",
    },
    lead: {
      en: "From seasonal mega-operations to fast-growing enterprises, Saudi businesses run on environments that cannot be allowed to improvise. We deliver the infrastructure discipline behind them.",
      ar: "من العمليات الموسمية الضخمة إلى الشركات سريعة النمو، تعمل الشركات السعودية على بيئات لا مكان فيها للارتجال. نحن نقدم انضباط البنية التحتية الذي يقوم خلفها.",
    },
    image: IMAGES.ops,
    focus: [
      { icon: "rack", name: { en: "IT Support & Infrastructure", ar: "الدعم التقني والبنية التحتية" }, desc: { en: "Environment design, deployment and day-to-day operation for offices, sites and server rooms.", ar: "تصميم البيئات وتنفيذها وتشغيلها اليومي للمكاتب والمواقع وغرف الخوادم." } },
      { icon: "network", name: { en: "Network Solutions", ar: "حلول الشبكات" }, desc: { en: "LAN/WAN, business Wi-Fi and site-to-site VPN connecting branches across the Kingdom.", ar: "شبكات LAN/WAN وواي فاي للأعمال وVPN يربط الفروع عبر المملكة." } },
      { icon: "cloud", name: { en: "Microsoft 365 & Servers", ar: "مايكروسوفت 365 والخوادم" }, desc: { en: "Active Directory, Windows Server and M365 tenants administered as one identity layer.", ar: "أكتيف ديريكتوري وويندوز سيرفر ومستأجرات M365 تُدار كطبقة هوية واحدة." } },
      { icon: "cctv", name: { en: "CCTV & Remote Monitoring", ar: "المراقبة والكاميرات" }, desc: { en: "Surveillance and recording designed around real coverage — with remote viewing built in.", ar: "مراقبة وتسجيل مصممان حول تغطية حقيقية — مع مشاهدة عن بُعد مدمجة." } },
      { icon: "shield", name: { en: "Access Control & Biometrics", ar: "التحكم في الدخول والبصمة" }, desc: { en: "Door access and attendance systems for offices, facilities and shift-based operations.", ar: "أنظمة دخول الأبواب والحضور للمكاتب والمنشآت والعمليات القائمة على الورديات." } },
      { icon: "compass", name: { en: "IT Consultancy", ar: "الاستشارات التقنية" }, desc: { en: "Independent assessment and planning before capital is committed to technology.", ar: "تقييم وتخطيط مستقلان قبل الالتزام برأس المال تجاه التقنية." } },
    ],
    model: [
      { en: "On-site delivery arranged across the Kingdom per engagement", ar: "تنفيذ ميداني يُرتب عبر المملكة حسب كل عمل" },
      { en: "Remote support with fast first response for supported environments", ar: "دعم عن بُعد باستجابة أولى سريعة للبيئات المدعومة" },
      { en: "Seasonal & project-based engagements handled end to end", ar: "أعمال موسمية ومشاريع تُدار من البداية للنهاية" },
    ],
    note: {
      en: "Saudi engagements range from single-site stabilization to multi-zone seasonal infrastructure — the Smart Hajj Camp and Sumou Towers case studies show both ends of that range.",
      ar: "تتراوح الأعمال في السعودية من تثبيت موقع واحد إلى بنية موسمية متعددة المناطق — دراستا حالة مخيم الحج الذكي وأبراج سمو توضحان طرفي هذا النطاق.",
    },
  },
  eg: {
    kicker: "EGYPT / EGY",
    title: {
      en: "Dependable IT for Egyptian businesses that outgrew improvisation.",
      ar: "تقنية موثوقة للشركات المصرية التي تجاوزت مرحلة الارتجال.",
    },
    lead: {
      en: "Egyptian SMBs are digitizing fast — and often inherit environments built piece by piece. We bring structure: documented, monitored IT that scales with the business instead of breaking under it.",
      ar: "تتحول الشركات المصرية الصغيرة والمتوسطة رقميًا بسرعة — وغالبًا ترث بيئات بُنيت قطعة قطعة. نحن نعيد إليها البنية: تقنية موثقة ومُراقبة تنمو مع العمل بدل أن تنكسر تحته.",
    },
    image: IMAGES.network,
    focus: [
      { icon: "rack", name: { en: "IT Support & Maintenance", ar: "الدعم التقني والصيانة" }, desc: { en: "Preventive maintenance and troubleshooting that keep existing environments healthy.", ar: "صيانة وقائية واستكشاف أعطال يُبقي البيئات القائمة سليمة." } },
      { icon: "cloud", name: { en: "Microsoft 365 & Identity", ar: "مايكروسوفت 365 والهوية" }, desc: { en: "Tenants, OneDrive and SharePoint structured so files and access stay under control.", ar: "مستأجرات وون درايف وشير بوينت منظمة بحيث تبقى الملفات والصلاحيات تحت السيطرة." } },
      { icon: "network", name: { en: "Networks & Branch VPN", ar: "الشبكات وVPN الفروع" }, desc: { en: "Cost-smart connectivity that joins branches and warehouses into one private network.", ar: "اتصال ذكي التكلفة يربط الفروع والمستودعات في شبكة خاصة واحدة." } },
      { icon: "cctv", name: { en: "CCTV Systems", ar: "أنظمة المراقبة" }, desc: { en: "Surveillance for retail floors, clinics, offices and stock areas — built to be reviewed.", ar: "مراقبة لصالات التجزئة والعيادات والمكاتب والمخازن — مبنية لتُراجع." } },
      { icon: "wrench", name: { en: "Environment Stabilization", ar: "تثبيت البيئات" }, desc: { en: "Taking over undocumented environments and turning them into managed ones.", ar: "استلام بيئات غير موثقة وتحويلها إلى بيئات مُدارة." } },
      { icon: "compass", name: { en: "Pragmatic Consultancy", ar: "استشارات عملية" }, desc: { en: "Recommendations that respect real budgets and real growth plans.", ar: "توصيات تحترم الميزانيات الحقيقية وخطط النمو الحقيقية." } },
    ],
    model: [
      { en: "Remote-first support — most issues resolved without a site visit", ar: "دعم يبدأ عن بُعد — معظم المشكلات تُحل دون زيارة ميدانية" },
      { en: "On-site delivery for infrastructure, cabling and security systems", ar: "تنفيذ ميداني للبنية التحتية والتوصيلات وأنظمة الأمن" },
      { en: "Cost-aware scoping: pay for structure, not for spectacle", ar: "نطاق يراعي التكلفة: تدفع مقابل البنية لا مقابل الاستعراض" },
    ],
    note: {
      en: "In Egypt we often start where others stop: environments assembled over years without documentation. The enterprise support & service-desk practice was built for exactly this situation.",
      ar: "في مصر نبدأ غالبًا من حيث يتوقف الآخرون: بيئات تجمعت على مدى سنوات بلا توثيق. منهجية الدعم المؤسسي ومكتب الخدمة بُنيت لهذا الوضع بالضبط.",
    },
  },
};

export default function MarketPage({ market }: { market: MarketId }) {
  const { L, t } = useLang();
  const c = CONTENT[market];
  const isSa = market === "sa";
  usePageMeta(
    isSa
      ? "IT Support & IT Services in Saudi Arabia | TECH OF THE WORLD"
      : "IT Support & IT Services in Egypt | TECH OF THE WORLD",
    isSa
      ? "Professional IT support, infrastructure, networks, Microsoft 365, CCTV and access control for businesses across Saudi Arabia — remote and on-site."
      : "Professional IT support, infrastructure, Microsoft 365, networks and CCTV for Egyptian businesses — pragmatic, documented, dependable."
  );

  const localCases = CASES.filter((x) => x.market === market || x.market === "both").slice(0, 3);
  const wa = waLink(`Hello TECH OF THE WORLD — I am looking for IT services in ${isSa ? "Saudi Arabia" : "Egypt"}.`, market);

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} lead={c.lead} image={c.image}>
        <Btn to={`/request?country=${encodeURIComponent(isSa ? "Saudi Arabia" : "Egypt")}`}>{t("nav.request")}</Btn>
        {hasWhatsApp && wa && (
          <Btn href={wa} variant="outline" arrow={false}>
            <Icon name="wa" className="w-5 h-5 text-[#3fbf6f]" /> {t("cta.talkSpecialist")}
          </Btn>
        )}
      </PageHero>

      {/* flag strip */}
      <div className="bg-ink-900 border-y border-ink-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-3 font-display font-semibold text-paper-50">
            {isSa ? <FlagSA className="w-7 h-7" /> : <FlagEG className="w-7 h-7" />}
            {isSa ? "Kingdom of Saudi Arabia" : "Arab Republic of Egypt"}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400">
            {isSa ? "REMOTE + ON-SITE · AR / EN" : "REMOTE-FIRST + ON-SITE · AR / EN"}
          </span>
        </div>
      </div>

      {/* focus services */}
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <SectionHeading
            kicker={isSa ? "What we deliver in KSA" : "What we deliver in Egypt"}
            tone="dark"
            title={isSa ? { en: "Six answers to the Kingdom's IT questions.", ar: "ست إجابات عن أسئلة المملكة التقنية." } : { en: "Six answers Egypt's growing businesses ask.", ar: "ست إجابات تسأل عنها الشركات المصرية النامية." }}
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.focus.map((f, i) => (
              <Reveal key={f.name.en} delay={(i % 3) * 80}>
                <div className="group chamfer-sm bg-paper-50 border border-ink-900/10 p-7 card-lift hover:border-ink-900/40 h-full">
                  <span className="w-12 h-12 grid place-items-center bg-ink-900 text-amber-500 group-hover:bg-amber-500 group-hover:text-ink-950 transition-colors duration-300">
                    <Icon name={f.icon} className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{L(f.name)}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-mist-500">{L(f.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* engagement model + note */}
      <section className="bg-ink-950 text-paper-50 noise relative">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              kicker={isSa ? "Engagement model" : "How we engage"}
              tone="light"
              title={isSa ? { en: "Delivery shaped around the engagement.", ar: "تسليم يتشكل حسب طبيعة العمل." } : { en: "Support that respects how Egypt works.", ar: "دعم يحترم طريقة عمل السوق المصري." }}
            />
            <ul className="mt-9 space-y-4">
              {c.model.map((m, i) => (
                <Reveal key={m.en} delay={i * 90} as="li">
                  <span className="flex gap-4 items-start chamfer-sm bg-ink-900 border border-ink-700 p-5 hover:border-amber-500/50 transition-colors">
                    <span className="shrink-0 w-9 h-9 grid place-items-center bg-amber-500 text-ink-950 font-mono text-[12px] font-semibold">0{i + 1}</span>
                    <span className="text-[14.5px] leading-relaxed text-mist-200 pt-1.5">{L(m)}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={150} className="flex flex-col">
            <div className="chamfer bg-ink-900 border border-ink-700 p-8 flex-1 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
              <p className="relative font-mono text-[10.5px] uppercase tracking-[0.26em] text-amber-500 mb-5">{isSa ? "From the field in KSA" : "From the field in Egypt"}</p>
              <p className="relative text-[16px] leading-[1.85] text-mist-200">{L(c.note)}</p>
              <div className="relative mt-7 pt-6 border-t border-ink-700 space-y-3">
                {localCases.map((cs) => (
                  <Link key={cs.id} to={`/projects/${cs.id}`} className="group flex items-center justify-between gap-4 py-1">
                    <span className="font-display font-semibold text-[15px] group-hover:text-amber-400 transition-colors">{L(cs.title)}</span>
                    <Icon name="arrow" className="w-4 h-4 text-mist-500 group-hover:text-amber-400 transition-all group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Btn to={`/request?country=${encodeURIComponent(isSa ? "Saudi Arabia" : "Egypt")}`} className="flex-1 justify-center">{t("nav.request")}</Btn>
              <Btn to="/projects" variant="outline">{t("cta.exploreProjects")}</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
