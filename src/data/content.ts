import type { B } from "../i18n";

/* ---------------- service categories (the 5 lines) ---------------- */
export type ServiceCategory = {
  id: string;
  icon: string;
  name: B;
  tagline: B;
  value: B;
  items: B[];
  tech: string[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "it-infrastructure",
    icon: "rack",
    name: { en: "IT & Infrastructure", ar: "تقنية المعلومات والبنية التحتية" },
    tagline: {
      en: "A stable, well-run IT environment is the quiet engine behind every productive business day.",
      ar: "البيئة التقنية المستقرة هي المحرك الصامت وراء كل يوم عمل منتج.",
    },
    value: {
      en: "I design, deploy and run the IT environments businesses depend on, from the first workstation to the server room, with support that answers when it matters.",
      ar: "أصمّم وأنفّذ وأدير بيئات تقنية المعلومات التي تعتمد عليها الشركات، من أول جهاز حتى غرفة الخوادم، مع دعم يستجيب في الوقت الحاسم.",
    },
    items: [
      { en: "Remote & On-Site IT Support", ar: "دعم تقني عن بُعد وميداني" },
      { en: "User Support & Troubleshooting", ar: "دعم المستخدمين واستكشاف الأعطال" },
      { en: "Infrastructure Design & Deployment", ar: "تصميم وتنفيذ البنية التحتية" },
      { en: "IT Environment Assessment", ar: "تقييم البيئة التقنية" },
      { en: "Preventive Maintenance & Health Checks", ar: "الصيانة الوقائية وفحوصات السلامة" },
    ],
    tech: ["Windows 10/11", "ManageEngine", "AnyDesk", "RDP"],
  },
  {
    id: "networks",
    icon: "network",
    name: { en: "Networks", ar: "الشبكات" },
    tagline: {
      en: "When the network is right, nobody notices it. That is exactly the point.",
      ar: "عندما تكون الشبكة مضبوطة، لا يشعر بها أحد، وهذا هو الهدف بالضبط.",
    },
    value: {
      en: "LAN, WAN, Wi-Fi and VPN environments planned around how teams actually work, with reliable coverage, clean segmentation and connectivity between sites.",
      ar: "شبكات LAN وWAN وواي فاي وVPN مخططة وفق طريقة عمل الفرق فعلًا، بتغطية موثوقة وتقسيم نظيف وربط آمن بين المواقع.",
    },
    items: [
      { en: "LAN & WAN Design", ar: "تصميم شبكات LAN وWAN" },
      { en: "Business Wi-Fi Coverage", ar: "تغطية واي فاي للأعمال" },
      { en: "Site-to-Site VPN", ar: "شبكات VPN بين المواقع" },
      { en: "Structured Cabling", ar: "التوصيلات المنظمة" },
      { en: "Network Troubleshooting", ar: "استكشاف أعطال الشبكات" },
    ],
    tech: ["MikroTik", "HP Switches", "TCP/IP", "DNS/DHCP"],
  },
  {
    id: "microsoft-cloud",
    icon: "cloud",
    name: { en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" },
    tagline: {
      en: "Identity, servers and productivity, administered properly, not just licensed.",
      ar: "الهوية والخوادم والإنتاجية تُدار بشكل صحيح، لا مجرد تراخيص مفعّلة.",
    },
    value: {
      en: "Windows Server and Active Directory environments with disciplined user management, alongside Microsoft 365, OneDrive and SharePoint that teams can rely on.",
      ar: "بيئات ويندوز سيرفر وأكتيف ديريكتوري بإدارة منضبطة للمستخدمين، إلى جانب مايكروسوفت 365 وون درايف وشير بوينت تعتمد عليها الفرق.",
    },
    items: [
      { en: "Windows Server Administration", ar: "إدارة خوادم ويندوز" },
      { en: "Active Directory & Group Policy", ar: "أكتيف ديريكتوري وسياسات المجموعة" },
      { en: "User & Computer Management", ar: "إدارة المستخدمين والأجهزة" },
      { en: "Microsoft 365 Administration", ar: "إدارة مايكروسوفت 365" },
      { en: "OneDrive & SharePoint", ar: "ون درايف وشير بوينت" },
    ],
    tech: ["Windows Server", "Active Directory", "M365", "Exchange Online"],
  },
  {
    id: "security-systems",
    icon: "cctv",
    name: { en: "Security Systems", ar: "أنظمة الأمن والمراقبة" },
    tagline: {
      en: "See what happens in your business, from anywhere, at any time.",
      ar: "اطّلع على ما يحدث في منشأتك من أي مكان وفي أي وقت.",
    },
    value: {
      en: "CCTV and video surveillance, NVR/DVR recording, remote monitoring, and biometric access control with attendance, designed as one dependable system.",
      ar: "كاميرات مراقبة وأنظمة تسجيل NVR/DVR ومراقبة عن بُعد وتحكم في الدخول بالبصمة مع الحضور والانصراف، منظومة واحدة موثوقة.",
    },
    items: [
      { en: "CCTV & Video Surveillance", ar: "كاميرات المراقبة بالفيديو" },
      { en: "NVR / DVR Systems", ar: "أنظمة التسجيل NVR / DVR" },
      { en: "Remote Monitoring", ar: "المراقبة عن بُعد" },
      { en: "Biometric & Attendance Systems", ar: "أنظمة البصمة والحضور" },
      { en: "Door Access Control", ar: "التحكم في دخول الأبواب" },
    ],
    tech: ["Hikvision", "Dahua", "ZKTeco", "NVR/DVR"],
  },
  {
    id: "consultancy",
    icon: "compass",
    name: { en: "IT Consultancy", ar: "الاستشارات التقنية" },
    tagline: {
      en: "Clear technology direction, before money is spent on the wrong direction.",
      ar: "توجيه تقني واضح قبل إنفاق المال في الاتجاه الخاطئ.",
    },
    value: {
      en: "Independent IT assessment, infrastructure planning and technology recommendations that translate technical decisions into business outcomes.",
      ar: "تقييم تقني مستقل وتخطيط للبنية التحتية وتوصيات تقنية تحوّل القرارات الفنية إلى نتائج تخدم الأعمال.",
    },
    items: [
      { en: "IT Assessment", ar: "تقييم تقنية المعلومات" },
      { en: "Infrastructure Planning", ar: "تخطيط البنية التحتية" },
      { en: "Technology Recommendations", ar: "التوصيات التقنية" },
      { en: "Business IT Consulting", ar: "استشارات الأعمال التقنية" },
    ],
    tech: ["Assessment", "Planning", "Documentation"],
  },
];

/* ---------------- why / differentiators ---------------- */
export type Differentiator = { icon: string; title: B; body: B };

export const WHY_US: Differentiator[] = [
  {
    icon: "wrench",
    title: { en: "Hands-on", ar: "عملي ميدانيًا" },
    body: {
      en: "Experience from the server room and the field, not from slide decks. I build, break and fix the same environments I advise on.",
      ar: "خبرة من غرف الخوادم والميدان لا من العروض التقديمية. أبني وأصلح البيئات نفسها التي أقدم المشورة عنها.",
    },
  },
  {
    icon: "briefcase",
    title: { en: "Business-focused", ar: "في خدمة الأعمال" },
    body: {
      en: "Every technical decision is explained in terms of uptime, risk and cost, because that is what you actually buy.",
      ar: "كل قرار تقني يُشرح بلغة التشغيل والمخاطر والتكلفة، لأن هذا هو ما تشتريه فعلًا.",
    },
  },
  {
    icon: "foundation",
    title: { en: "Infrastructure-first", ar: "يبدأ من الأساس" },
    body: {
      en: "Applications come and go; the infrastructure underneath decides whether they run. I engineer the layer everything else stands on.",
      ar: "التطبيقات تتغير، لكن البنية التحتية هي التي تحدد قدرتها على العمل. أهندس الطبقة التي يقوم عليها كل شيء.",
    },
  },
  {
    icon: "doc",
    title: { en: "Documentation", ar: "التوثيق" },
    body: {
      en: "Every environment I deliver is documented: assets, configurations and procedures that keep maintenance simple years later.",
      ar: "كل بيئة أسلّمها موثقة: أصول وإعدادات وإجراءات تبقي الصيانة بسيطة بعد سنوات.",
    },
  },
  {
    icon: "globe",
    title: { en: "Saudi & Egypt experience", ar: "خبرة سعودية ومصرية" },
    body: {
      en: "Real delivery experience across two markets, different scales and working cultures, handled with the same standard.",
      ar: "خبرة تنفيذ حقيقية في سوقين مختلفين بأحجام وثقافات عمل مختلفة، وبالمعيار نفسه من الجودة.",
    },
  },
  {
    icon: "headset",
    title: { en: "Remote & on-site", ar: "عن بُعد وميداني" },
    body: {
      en: "Routine issues resolved remotely in minutes; physical work handled on-site with the same discipline and documentation.",
      ar: "المشكلات اليومية تُحل عن بُعد في دقائق، والأعمال الميدانية تُنفذ في موقعك بالمنهجية والتوثيق نفسيهما.",
    },
  },
];

/* ---------------- founder metrics (verified from CV) ---------------- */
export const FOUNDER_METRICS: { value: string; label: B }[] = [
  { value: "+9", label: { en: "Years of hands-on experience", ar: "سنوات من الخبرة العملية" } },
  { value: "+500", label: { en: "Users supported", ar: "مستخدم مدعوم" } },
  { value: "+500", label: { en: "Endpoints managed", ar: "جهاز طرفي مُدار" } },
  { value: "50–65%", label: { en: "Recurring incident reduction", ar: "انخفاض الأعطال المتكررة" } },
];

/* ---------------- technical focus areas ---------------- */
export const FOCUS_AREAS: B[] = [
  { en: "IT Support", ar: "الدعم التقني" },
  { en: "Windows Server", ar: "ويندوز سيرفر" },
  { en: "Active Directory", ar: "أكتيف ديريكتوري" },
  { en: "Group Policy", ar: "سياسات المجموعة" },
  { en: "Networking", ar: "الشبكات" },
  { en: "Microsoft 365", ar: "مايكروسوفت 365" },
  { en: "CCTV", ar: "المراقبة" },
  { en: "Access Control", ar: "التحكم في الدخول" },
  { en: "Monitoring", ar: "المراقبة التشغيلية" },
  { en: "Enterprise Printing", ar: "الطباعة المؤسسية" },
  { en: "Remote Support", ar: "الدعم عن بُعد" },
  { en: "Infrastructure", ar: "البنية التحتية" },
];

/* ---------------- technology groups (hands-on only) ---------------- */
export type TechGroup = { name: B; items: string[] };
export const TECH_GROUPS: TechGroup[] = [
  {
    name: { en: "Platforms & Identity", ar: "المنصات والهوية" },
    items: ["Windows Server 2012/2016/2019", "Active Directory", "Group Policy", "Windows 10 / 11"],
  },
  {
    name: { en: "Productivity & Cloud", ar: "الإنتاجية والسحابة" },
    items: ["Microsoft 365", "Exchange Online", "Teams", "SharePoint", "OneDrive"],
  },
  {
    name: { en: "Networking", ar: "الشبكات" },
    items: ["MikroTik RouterOS", "TCP/IP · DNS · DHCP", "HP Switches", "Business Wi-Fi", "Site-to-Site VPN"],
  },
  {
    name: { en: "Surveillance & Access", ar: "المراقبة والتحكم" },
    items: ["Hikvision · Dahua", "NVR / DVR", "ZKTeco Biometrics", "Access Control", "IP Telephony"],
  },
  {
    name: { en: "Operations & Monitoring", ar: "العمليات والمراقبة" },
    items: ["ManageEngine ServiceDesk", "PRTG", "AnyDesk · TeamViewer · RDP", "Enterprise Printing"],
  },
];

/* ---------------- career timeline (verified) ---------------- */
export type CareerEntry = {
  role: B;
  company: B;
  project?: B;
  location: B;
  period: B;
  market: "sa" | "eg";
  points: B[];
  caseId?: string;
};

export const CAREER: CareerEntry[] = [
  {
    role: { en: "Senior IT Support Specialist", ar: "أخصائي دعم تقني أول" },
    company: { en: "Buna Al Khaleej Contracting Company", ar: "شركة بناء الخليج للمقاولات" },
    project: { en: "Sumou Towers Project", ar: "مشروع أبراج سمو" },
    location: { en: "Jeddah, Saudi Arabia", ar: "جدة، السعودية" },
    period: { en: "Sep 2025 — Present", ar: "سبتمبر 2025 — الآن" },
    market: "sa",
    caseId: "sumou-towers",
    points: [
      { en: "Tier 2 support for 500+ users in a Windows Domain environment", ar: "دعم من المستوى الثاني لأكثر من 500 مستخدم في بيئة Windows Domain" },
      { en: "Active Directory & Microsoft 365 administration", ar: "إدارة أكتيف ديريكتوري ومايكروسوفت 365" },
      { en: "Enterprise printing infrastructure (Xerox, HP, Canon, Ricoh)", ar: "بنية الطباعة المؤسسية (زيروكس، HP، كانون، ريكو)" },
      { en: "Executive (VIP) support for senior management", ar: "الدعم التنفيذي (VIP) للإدارة العليا" },
    ],
  },
  {
    role: { en: "IT Operations Supervisor", ar: "مشرف عمليات تقنية المعلومات" },
    company: { en: "Golden Velvet Establishment", ar: "مؤسسة المخمل الذهبي" },
    project: { en: "Rawaf Mina Project", ar: "مشروع رواف منى" },
    location: { en: "Makkah, Saudi Arabia", ar: "مكة المكرمة، السعودية" },
    period: { en: "May 2024 — Aug 2025", ar: "مايو 2024 — أغسطس 2025" },
    market: "sa",
    caseId: "smart-hajj-camp",
    points: [
      { en: "Led a team of 6+ IT technicians through peak season", ar: "قيادة فريق من أكثر من 6 فنيين خلال ذروة الموسم" },
      { en: "Incident response, escalations & preventive maintenance", ar: "الاستجابة للحوادث والتصعيد والصيانة الوقائية" },
      { en: "CCTV, access control, biometrics & IP telephony", ar: "المراقبة والتحكم في الدخول والبصمة والهواتف" },
    ],
  },
  {
    role: { en: "IT Support & Network Specialist", ar: "أخصائي دعم تقني وشبكات" },
    company: { en: "Zahran Market", ar: "أسواق زهران" },
    location: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" },
    period: { en: "May 2019 — Apr 2024", ar: "مايو 2019 — أبريل 2024" },
    market: "eg",
    caseId: "zahran-market",
    points: [
      { en: "1st & 2nd line support across multiple retail branches", ar: "دعم من المستويين الأول والثاني عبر فروع تجزئة متعددة" },
      { en: "POS systems, printers, scanners & branch networking", ar: "أنظمة نقاط البيع والطابعات والماسحات وشبكات الفروع" },
      { en: "PRTG monitoring & CCTV / attendance systems", ar: "مراقبة PRTG وأنظمة المراقبة والحضور" },
    ],
  },
  {
    role: { en: "Network & Devices Specialist", ar: "أخصائي شبكات وأجهزة" },
    company: { en: "Arab Computers Company (ACC)", ar: "الشركة العربية للحاسبات" },
    project: { en: "On-site at United Abco Company", ar: "في مقر شركة أبكو المتحدة" },
    location: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" },
    period: { en: "Oct 2015 — May 2018", ar: "أكتوبر 2015 — مايو 2018" },
    market: "eg",
    caseId: "united-abco",
    points: [
      { en: "On-site corporate IT support & IMAC activities", ar: "دعم تقني ميداني للشركات وأنشطة IMAC" },
      { en: "LAN/Wi-Fi connectivity & Active Directory assistance", ar: "اتصال LAN/Wi-Fi والمساعدة في أكتيف ديريكتوري" },
    ],
  },
];

/* ---------------- education & development ---------------- */
export const EDUCATION: B[] = [
  { en: "Industrial Technical Institute — Alexandria, Egypt", ar: "المعهد الفني الصناعي — الإسكندرية، مصر" },
];

export const LANGUAGES: B[] = [
  { en: "Arabic — Native", ar: "العربية — اللغة الأم" },
  { en: "English — Professional working proficiency", ar: "الإنجليزية — إجادة مهنية" },
];

export const CERTIFICATIONS: B[] = [
  { en: "Cisco Networking Academy — IT Support Specialist Career Path", ar: "أكاديمية سيسكو — مسار أخصائي الدعم التقني" },
  { en: "Cisco Networking Academy — Network Technician Career Path", ar: "أكاديمية سيسكو — مسار فني الشبكات" },
  { en: "CCNA Studies & VMware Virtualization (hands-on lab)", ar: "دراسات CCNA ومحاكاة VMware الافتراضية (معمل عملي)" },
  { en: "PowerShell Fundamentals", ar: "أساسيات PowerShell" },
];
