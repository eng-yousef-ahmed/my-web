import type { B } from "../i18n";

/**
 * Centralized professional history, the single source of truth.
 * Every fact here is taken directly from Eng. Yousef Ahmed's CV.
 * Consumed by: About page, Markets pages, case-study cross-links.
 */
export type CareerEntry = {
  period: string;
  role: B;
  org: B;
  loc: B;
  market: "sa" | "eg";
  /** related documented case study, if one exists for this engagement */
  caseId?: string;
  points: B[];
};

export const CAREER: CareerEntry[] = [
  {
    period: "2025–Present",
    role: { en: "Senior IT Support Specialist", ar: "أخصائي دعم تقني أول" },
    org: { en: "Buna Al Khaleej Contracting, Sumou Towers Project", ar: "بنيان الخليج للمقاولات، مشروع أبراج سمو" },
    loc: { en: "Jeddah, Saudi Arabia", ar: "جدة، السعودية" },
    market: "sa",
    caseId: "sumou-towers",
    points: [
      { en: "Enterprise IT support for 500+ end users in a Windows Domain environment", ar: "دعم تقني مؤسسي لأكثر من 500 مستخدم في بيئة دومين ويندوز" },
      { en: "Administered Active Directory, Microsoft 365 and enterprise printing infrastructure", ar: "إدارة أكتيف ديريكتوري ومايكروسوفت 365 وبنية الطباعة المؤسسية" },
      { en: "Reduced recurring incidents by 50–65% via preventive maintenance & monitoring", ar: "خفض الأعطال المتكررة بنسبة 50–65% عبر الصيانة الوقائية والمراقبة" },
      { en: "Executive (VIP) support for senior management with high SLA compliance", ar: "دعم تنفيذي (VIP) للإدارة العليا مع التزام عالٍ بمستويات الخدمة" },
    ],
  },
  {
    period: "2024–2025",
    role: { en: "IT Operations Supervisor, Enterprise IT Support", ar: "مشرف عمليات تقنية المعلومات" },
    org: { en: "Golden Velvet Establishment, Rawaf Mina Project", ar: "مؤسسة جولدن فلفت، مشروع رواف منى" },
    loc: { en: "Makkah, Saudi Arabia", ar: "مكة المكرمة، السعودية" },
    market: "sa",
    caseId: "smart-hajj-camp",
    points: [
      { en: "Led 6+ IT technicians during one of Saudi Arabia's largest seasonal projects", ar: "قيادة فريق من 6+ فنيين خلال أحد أكبر المشاريع الموسمية في السعودية" },
      { en: "Managed incident response, preventive maintenance and infrastructure readiness", ar: "إدارة الاستجابة للحوادث والصيانة الوقائية وجاهزية البنية التحتية" },
      { en: "Supported desktops, networking, CCTV, access control, biometrics and IP telephony", ar: "دعم الأجهزة والشبكات والمراقبة والتحكم في الدخول والبصمة والهواتف" },
    ],
  },
  {
    period: "2019–2024",
    role: { en: "IT Support & Network Specialist", ar: "أخصائي دعم تقني وشبكات" },
    org: { en: "Zahran Market", ar: "أسواق زهران" },
    loc: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" },
    market: "eg",
    caseId: "zahran-market",
    points: [
      { en: "First- and second-line support across multiple retail branches incl. POS systems", ar: "دعم من المستويين الأول والثاني عبر فروع تجزئة متعددة شاملة أنظمة نقاط البيع" },
      { en: "Monitored enterprise infrastructure with PRTG and administered Active Directory", ar: "مراقبة البنية التحتية عبر PRTG وإدارة أكتيف ديريكتوري" },
      { en: "Installed & maintained CCTV, access control, biometric attendance and IP telephony", ar: "تركيب وصيانة المراقبة والتحكم في الدخول والبصمة والحضور والهواتف" },
      { en: "User onboarding, workstation deployment and IT asset inventory management", ar: "تجهيز المستخدمين ونشر أجهزة العمل وإدارة جرد الأصول التقنية" },
    ],
  },
  {
    period: "2015–2018",
    role: { en: "Network & Devices Specialist", ar: "أخصائي شبكات وأجهزة" },
    org: { en: "Arab Computers Company (ACC), on-site at United Abco Company", ar: "الشركة العربية للحاسبات (ACC)، بمقر أبكو المتحدة" },
    loc: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" },
    market: "eg",
    caseId: "united-abco",
    points: [
      { en: "On-site corporate end-user support meeting SLA targets (IMAC operations)", ar: "دعم ميداني للمستخدمين في بيئة شركات مع تحقيق أهداف الخدمة (عمليات IMAC)" },
      { en: "Installed and maintained desktops, laptops, Windows OS and LAN/Wi-Fi", ar: "تركيب وصيانة الأجهزة وأنظمة ويندوز والشبكات المحلية والواي فاي" },
      { en: "Active Directory account administration and workstation domain support", ar: "إدارة حسابات أكتيف ديريكتوري ودعم انضمام الأجهزة للدومين" },
    ],
  },
];

export const EDUCATION: B = {
  en: "Industrial Technical Institute, Alexandria, Egypt",
  ar: "المعهد الفني الصناعي، الإسكندرية، مصر",
};

export const LANGUAGES: B[] = [
  { en: "Arabic (native)", ar: "العربية (اللغة الأم)" },
  { en: "English (professional working proficiency)", ar: "الإنجليزية (كفاءة مهنية)" },
];

export const CERTS: B[] = [
  { en: "Cisco Networking Academy, IT Support Specialist", ar: "أكاديمية سيسكو، أخصائي دعم تقني" },
  { en: "Cisco Networking Academy, Network Technician", ar: "أكاديمية سيسكو، فني شبكات" },
  { en: "Networking Basics & Operating Systems Basics", ar: "أساسيات الشبكات وأنظمة التشغيل" },
  { en: "IT Customer Support & Computer Hardware Basics", ar: "دعم عملاء التقنية وأساسيات العتاد" },
  { en: "CCNA Studies & VMware Virtualization (Lab)", ar: "دراسات CCNA وافتراضية VMware (عملي)" },
  { en: "PowerShell Fundamentals", ar: "أساسيات باورشيل" },
];
