import type { B } from "../i18n";

export type Market = "sa" | "eg" | "both";

export type CaseStudy = {
  id: string;
  title: B;
  sector: B;
  market: Market;
  featured: boolean;
  catIds: string[];
  period?: B;
  summary: B;
  overview: B;
  challenge: B;
  solution: B;
  implementation: B[];
  technologies: string[];
  role: B;
  results: B[];
  images?: { file: string; caption?: B }[];
};

export const MARKET_LABEL: Record<Market, B> = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  eg: { en: "Egypt", ar: "مصر" },
  both: { en: "Saudi Arabia · Egypt", ar: "السعودية · مصر" },
};

export const CASES: CaseStudy[] = [
  {
    id: "smart-hajj-camp",
    title: { en: "Smart Hajj Camp Infrastructure", ar: "بنية مخيم الحج الذكي" },
    sector: { en: "Seasonal Operations", ar: "العمليات الموسمية" },
    market: "sa",
    featured: true,
    catIds: ["it-infrastructure", "networks", "security-systems"],
    summary: {
      en: "End-to-end IT environment for a large seasonal camp in Makkah: one network across all zones, CCTV, attendance and IP telephony, delivered before the season and run through peak load.",
      ar: "بيئة تقنية متكاملة لمخيم موسمي كبير في مكة: شبكة واحدة عبر كل المناطق، مراقبة وحضور وهواتف، سُلّمت قبل الموسم وشُغّلت خلال ذروة الضغط.",
    },
    overview: {
      en: "One of Saudi Arabia's largest seasonal operations. The camp needed a complete technology environment stood up on a hard deadline and kept running continuously through peak periods, with a supervised technical team handling day-to-day operations.",
      ar: "واحدة من أكبر العمليات الموسمية في السعودية. احتاج المخيم بيئة تقنية كاملة تُجهز قبل موعد نهائي صارم وتبقى عاملة بلا انقطاع خلال فترات الذروة، مع فريق تقني مُدار يتولى التشغيل اليومي.",
    },
    challenge: {
      en: "A temporary multi-zone site with hundreds of users, harsh physical conditions, and zero tolerance for downtime during the season. Connectivity, surveillance, attendance and telephony all had to work as one system from day one.",
      ar: "موقع مؤقت متعدد المناطق بمئات المستخدمين وظروف ميدانية قاسية وانعدام تام لتحمّل التوقف خلال الموسم. الاتصال والمراقبة والحضور والهواتف كان يجب أن تعمل كمنظومة واحدة من اليوم الأول.",
    },
    solution: {
      en: "A single coherent infrastructure: structured cabling and distribution per zone, one managed network, CCTV and NVR coverage on critical points, biometric attendance for shift teams, and IP telephony for operations.",
      ar: "بنية واحدة مترابطة: توصيلات منظمة وتوزيع لكل منطقة، وشبكة مُدارة، وتغطية مراقبة وتسجيل للنقاط الحرجة، وبصمة حضور لفرق الورديات، وهواتف IP للتشغيل.",
    },
    implementation: [
      { en: "Pre-season infrastructure deployment and system readiness", ar: "نشر البنية التحتية قبل الموسم وجاهزية الأنظمة" },
      { en: "CCTV and NVR recording on entrances and critical areas", ar: "مراقبة وتسجيل NVR على المداخل والمناطق الحرجة" },
      { en: "200+ CCTV cameras and 50+ pilgrim-gate entry sensors across the Mina and Muzdalifah camps, each linked to its control devices", ar: "أكثر من 200 كاميرا مراقبة وأكثر من 50 مستشعرًا لبوابات دخول الحجاج في مخيمات منى ومزدلفة، مع ربط كل جهاز بالأجهزة الخاصة به" },
      { en: "Biometric attendance integrated with shift operations", ar: "بصمة حضور مدمجة مع عمليات الورديات" },
      { en: "Incident response and escalation routines during peak", ar: "روتين الاستجابة للحوادث والتصعيد خلال الذروة" },
      { en: "Daily coordination with project managers and vendors", ar: "تنسيق يومي مع مديري المشروع والموردين" },
    ],
    technologies: ["Structured Cabling", "CCTV", "NVR", "ZKTeco", "IP Telephony"],
    role: {
      en: "IT Operations Supervisor: led a team of 6+ technicians through the season, owning incident response, preventive maintenance and day-to-day operation of the whole environment.",
      ar: "مشرف عمليات تقنية المعلومات: قيادة فريق من أكثر من 6 فنيين طوال الموسم، مع ملكية الاستجابة للحوادث والصيانة الوقائية والتشغيل اليومي للبيئة كاملة.",
    },
    results: [
      { en: "One coherent network across all camp zones instead of disconnected fragments", ar: "شبكة واحدة مترابطة عبر مناطق المخيم بدل أجزاء منفصلة" },
      { en: "Mission-critical services stayed available through peak operational periods", ar: "استمرارية الخدمات الحيوية خلال فترات الذروة التشغيلية" },
      { en: "A supervised team with clear escalation and maintenance routines", ar: "فريق مُدار بروتين واضح للتصعيد والصيانة" },
      { en: "The environment stood up on schedule, before the season began", ar: "جاهزية البيئة في موعدها قبل بدء الموسم" },
    ],
  },
  {
    id: "sumou-towers",
    title: { en: "Sumou Towers IT & Network Infrastructure", ar: "بنية تقنية وشبكات أبراج سمو" },
    sector: { en: "Construction & Real Estate", ar: "الإنشاءات والعقارات" },
    market: "sa",
    featured: true,
    catIds: ["it-infrastructure", "networks", "microsoft-cloud"],
    period: { en: "2025 — Present · Jeddah", ar: "2025 — الآن · جدة" },
    summary: {
      en: "Enterprise IT support for 500+ users across the Sumou Towers project: Windows Domain, Microsoft 365, enterprise printing and VIP support, with recurring incidents reduced 50–65%.",
      ar: "دعم تقني مؤسسي لأكثر من 500 مستخدم في مشروع أبراج سمو: Windows Domain ومايكروسوفت 365 وطباعة مؤسسية ودعم VIP، مع خفض الأعطال المتكررة بنسبة 50–65%.",
    },
    overview: {
      en: "A major construction and real-estate project in Jeddah. The site office runs a full Windows Domain environment serving more than 500 end users, and the role covers everything that keeps it productive: support, identity, printing and executive assistance.",
      ar: "مشروع إنشائي وعقاري كبير في جدة. يعمل مكتب الموقع ببيئة Windows Domain كاملة تخدم أكثر من 500 مستخدم، ويغطي الدور كل ما يبقيها منتجة: الدعم والهوية والطباعة والمساعدة التنفيذية.",
    },
    challenge: {
      en: "High user volume on a construction site means constant onboarding, hardware churn and connectivity issues, while senior management expects executive-grade responsiveness with strict SLA compliance.",
      ar: "كثافة المستخدمين في موقع إنشائي تعني تجهيزًا مستمرًا وتبدل أجهزة ومشاكل اتصال دائمة، بينما تتوقع الإدارة العليا استجابة بمستوى تنفيذي مع التزام صارم بمستويات الخدمة.",
    },
    solution: {
      en: "A structured support operation: standardized workstation deployment, disciplined Active Directory and M365 administration, a managed printing fleet, and a preventive maintenance program that attacks recurring incidents at the root.",
      ar: "عملية دعم منظمة: تجهيز موحّد لأجهزة العمل، وإدارة منضبطة لأكتيف ديريكتوري وM365، وإدارة أسطول الطابعات، وبرنامج صيانة وقائي يعالج الأعطال المتكررة من جذورها.",
    },
    implementation: [
      { en: "Tier 2 support for desktops, laptops, OS, M365 and connectivity", ar: "دعم من المستوى الثاني للأجهزة والأنظمة وM365 والاتصال" },
      { en: "AD user provisioning, GPO, shared folders and NTFS permissions", ar: "تجهيز المستخدمين وGPO والمجلدات المشتركة وصلاحيات NTFS" },
      { en: "Print server deployment and driver management (Xerox, HP, Canon, Ricoh)", ar: "نشر خوادم الطباعة وإدارة التعريفات (زيروكس، HP، كانون، ريكو)" },
      { en: "Executive (VIP) support with minimal downtime", ar: "دعم تنفيذي (VIP) بأقل توقف ممكن" },
      { en: "Preventive maintenance program with proactive monitoring", ar: "برنامج صيانة وقائي مع مراقبة استباقية" },
      { en: "Asset inventory and documentation in ManageEngine ServiceDesk", ar: "جرد الأصول والتوثيق في ManageEngine ServiceDesk" },
    ],
    technologies: ["Windows Server", "Active Directory", "Microsoft 365", "ManageEngine", "Structured Cabling"],
    role: {
      en: "Senior IT Support Specialist: full accountability for day-to-day enterprise support, identity administration and printing infrastructure on the project.",
      ar: "أخصائي دعم تقني أول: مسؤولية كاملة عن الدعم المؤسسي اليومي وإدارة الهوية وبنية الطباعة في المشروع.",
    },
    results: [
      { en: "Recurring IT incidents reduced by 50–65% through preventive maintenance", ar: "انخفاض الأعطال المتكررة بنسبة 50–65% عبر الصيانة الوقائية" },
      { en: "High service availability with consistent SLA compliance for 500+ users", ar: "توافر خدمي عالٍ مع التزام مستمر بمستويات الخدمة لأكثر من 500 مستخدم" },
      { en: "Standardized onboarding: accounts, devices, M365 and printers ready on day one", ar: "تجهيز موحّد: حسابات وأجهزة وM365 وطابعات جاهزة من اليوم الأول" },
      { en: "Accurate asset and incident records for long-term operations", ar: "سجلات أصول وحوادث دقيقة للعمليات طويلة الأمد" },
    ],
  },
  {
    id: "biometric-access",
    title: { en: "Biometric & Access Control Systems", ar: "أنظمة البصمة والتحكم في الدخول" },
    sector: { en: "Security & HR Operations", ar: "الأمن وعمليات الموارد البشرية" },
    market: "both",
    featured: false,
    catIds: ["security-systems"],
    summary: {
      en: "Door access and attendance that operations and HR both trust: ZKTeco devices, clean enrollment, and reports that settle disputes instead of starting them.",
      ar: "تحكم في الأبواب وحضور تثق بهما العمليات والموارد البشرية معًا: أجهزة ZKTeco وتسجيل نظيف وتقارير تحسم الخلافات بدل أن تبدأها.",
    },
    overview: {
      en: "Facilities needed controlled entry and reliable attendance across shift teams. The rollout standardized devices, enrollment and reporting so the data is defensible.",
      ar: "احتاجت منشآت دخولًا مُتحكمًا فيه وحضورًا موثوقًا عبر فرق الورديات. وحّد التنفيذ الأجهزة والتسجيل والتقارير لتصير البيانات قابلة للاحتجاج بها.",
    },
    challenge: {
      en: "Paper-based or inconsistent attendance created disputes, and uncontrolled doors meant no real record of who entered sensitive areas.",
      ar: "الحضور الورقي أو غير المتسق كان يخلق نزاعات، والأبواب غير المُتحكم فيها كانت تعني غياب سجل حقيقي لمن دخل المناطق الحساسة.",
    },
    solution: {
      en: "Biometric devices at controlled points, enrollment tied to employee records, attendance exported into the HR workflow, and access logs retained for review.",
      ar: "أجهزة بصمة على نقاط التحكم، وتسجيل مربوط بسجلات الموظفين، وحضور يُصدَّر لسير عمل الموارد البشرية، وسجلات دخول محفوظة للمراجعة.",
    },
    implementation: [
      { en: "Device placement at entrances and sensitive areas", ar: "وضع الأجهزة على المداخل والمناطق الحساسة" },
      { en: "Employee enrollment and permission groups", ar: "تسجيل الموظفين ومجموعات الصلاحيات" },
      { en: "Attendance integration with HR reporting", ar: "دمج الحضور مع تقارير الموارد البشرية" },
      { en: "Access logs and review procedures", ar: "سجلات الدخول وإجراءات المراجعة" },
    ],
    technologies: ["ZKTeco", "Access Control", "Biometrics", "Attendance"],
    role: {
      en: "Deployment and configuration of the access and attendance layer, plus the routines that keep it trustworthy.",
      ar: "نشر وتهيئة طبقة الدخول والحضور، بالإضافة إلى الروتينات التي تبقيها موثوقة.",
    },
    results: [
      { en: "Attendance disputes settled by data", ar: "نزاعات الحضور تُحسم بالبيانات" },
      { en: "Sensitive areas under real access control", ar: "المناطق الحساسة تحت تحكم دخول حقيقي" },
      { en: "Shift handovers visible to operations in real time", ar: "تسليم الورديات مرئي للعمليات في الوقت الفعلي" },
    ],
  },
  {
    id: "enterprise-support-servicedesk",
    title: { en: "Enterprise IT Support & Service Desk", ar: "الدعم التقني المؤسسي ومكتب الخدمة" },
    sector: { en: "IT Operations", ar: "العمليات التقنية" },
    market: "sa",
    featured: false,
    catIds: ["it-infrastructure", "microsoft-cloud"],
    summary: {
      en: "Support run as a discipline: ticketing in ManageEngine, asset records kept honest, and preventive routines that cut recurring incidents by 50–65%.",
      ar: "الدعم يُدار كانضباط: تذاكر في ManageEngine وسجلات أصول دقيقة وروتينات وقائية خفضت الأعطال المتكررة بنسبة 50–65%.",
    },
    overview: {
      en: "A large user base where support used to happen by phone calls and memory. The practice introduced structure: every request tracked, every asset recorded, every recurring problem analyzed.",
      ar: "قاعدة مستخدمين كبيرة كان الدعم فيها يتم بالمكالمات والذاكرة. أدخلت الممارسة النظام: كل طلب متتبع، وكل أصل مسجل، وكل مشكلة متكررة محللة.",
    },
    challenge: {
      en: "Without records, the same incidents kept returning, assets went missing, and nobody could say what the environment actually contained.",
      ar: "بدون سجلات كانت الأعطال نفسها تتكرر، والأصول تختفي، ولا أحد يستطيع القول ما الذي تحويه البيئة فعلًا.",
    },
    solution: {
      en: "ManageEngine ServiceDesk as the single front door: tickets with SLAs, an honest asset inventory, and a preventive maintenance calendar that attacks recurrence at the root.",
      ar: "ManageEngine ServiceDesk كمدخل وحيد: تذاكر بمستويات خدمة، وجرد أصول صادق، وتقويم صيانة وقائي يعالج التكرار من جذوره.",
    },
    implementation: [
      { en: "Ticketing workflow with SLA targets", ar: "سير تذاكر بأهداف مستويات خدمة" },
      { en: "Asset inventory and lifecycle records", ar: "جرد أصول وسجلات دورة حياة" },
      { en: "Preventive maintenance calendar", ar: "تقويم صيانة وقائي" },
      { en: "Root-cause review of recurring incidents", ar: "مراجعة الأسباب الجذرية للأعطال المتكررة" },
    ],
    technologies: ["ManageEngine", "Windows Server", "Active Directory", "Microsoft 365"],
    role: {
      en: "Built and ran the support practice: workflow, records and the maintenance program behind the numbers.",
      ar: "بناء وإدارة ممارسة الدعم: سير العمل والسجلات وبرنامج الصيانة خلف الأرقام.",
    },
    results: [
      { en: "Recurring incidents reduced by 50–65%", ar: "انخفاض الأعطال المتكررة بنسبة 50–65%" },
      { en: "Every asset accounted for", ar: "كل أصل مُسجل ومعلوم" },
      { en: "Support quality visible in SLA reports", ar: "جودة الدعم مرئية في تقارير مستويات الخدمة" },
    ],
  },
  {
    id: "zahran-market",
    title: { en: "Zahran Market — Multi-Branch Retail IT Operations", ar: "أسواق زهران — تشغيل تقنية المعلومات عبر الفروع" },
    sector: { en: "Retail", ar: "التجزئة" },
    market: "eg",
    featured: true,
    catIds: ["it-infrastructure", "networks", "security-systems"],
    period: { en: "2019–2024 · Alexandria", ar: "2019–2024 · الإسكندرية" },
    summary: {
      en: "Five years as the accountable IT specialist across multiple retail branches: POS and branch networking, Active Directory, PRTG monitoring, CCTV and attendance systems.",
      ar: "خمس سنوات كأخصائي التقنية المسؤول عبر فروع تجزئة متعددة: نقاط البيع وشبكات الفروع وأكتيف ديريكتوري ومراقبة PRTG وأنظمة المراقبة والحضور.",
    },
    overview: {
      en: "A retail operation in Alexandria running across several branches. The role owned the day-to-day technology reality of each location: what sells, what connects, what records, and who gets in.",
      ar: "عملية تجزئة في الإسكندرية تعمل عبر عدة فروع. ملك الدور الواقع التقني اليومي لكل موقع: ما يبيع، وما يتصل، وما يسجل، ومن يدخل.",
    },
    challenge: {
      en: "Branches that couldn't afford downtime during opening hours, POS systems that had to keep selling, and little local IT knowledge at each location.",
      ar: "فروع لا تحتمل التوقف خلال ساعات العمل، وأنظمة نقاط بيع يجب أن تبقى جاهزة للبيع، ومعرفة تقنية محلية محدودة في كل موقع.",
    },
    solution: {
      en: "Proactive branch IT: monitored infrastructure via PRTG, disciplined Active Directory accounts and permissions, standardized POS and printing support, and CCTV/attendance that operations can review.",
      ar: "تقنية فروع استباقية: بنية مُراقبة عبر PRTG، وحسابات وصلاحيات أكتيف ديريكتوري منضبطة، ودعم موحّد لنقاط البيع والطباعة، ومراقبة وحضور يمكن للعمليات مراجعتهما.",
    },
    implementation: [
      { en: "1st & 2nd line support for desktops, POS, printers and scanners", ar: "دعم من المستويين الأول والثاني للأجهزة ونقاط البيع والطابعات والماسحات" },
      { en: "Branch networking: TCP/IP, DNS, DHCP, HP switches, Wi-Fi and cabling", ar: "شبكات الفروع: TCP/IP وDNS وDHCP ومفاتيح HP والواي فاي والتوصيلات" },
      { en: "Active Directory provisioning, groups and NTFS permissions", ar: "تجهيز أكتيف ديريكتوري والمجموعات وصلاحيات NTFS" },
      { en: "CCTV, access control, biometric attendance and IP telephony", ar: "المراقبة والتحكم في الدخول وبصمة الحضور والهواتف" },
      { en: "Workstation deployment, OS installation and hardware upgrades", ar: "تجهيز أجهزة العمل وتثبيت الأنظمة وترقية العتاد" },
      { en: "Asset inventory, documentation and maintenance records", ar: "جرد الأصول والتوثيق وسجلات الصيانة" },
    ],
    technologies: ["Active Directory", "PRTG", "HP Switches", "POS", "CCTV", "ZKTeco", "IP Telephony"],
    role: {
      en: "The accountable IT specialist across all branches: support, infrastructure, monitoring and security systems, end to end.",
      ar: "أخصائي التقنية المسؤول عبر كل الفروع: الدعم والبنية التحتية والمراقبة وأنظمة الأمن من البداية للنهاية.",
    },
    results: [
      { en: "Branch problems caught proactively through PRTG monitoring", ar: "مشاكل الفروع تُلتقط استباقيًا عبر مراقبة PRTG" },
      { en: "POS and selling hours protected by reliable branch IT", ar: "نقاط البيع وساعات البيع محمية بتقنية فروع موثوقة" },
      { en: "Onboarding and deployment became a repeatable routine", ar: "التجهيز والنشر أصبحا روتينًا قابلًا للتكرار" },
      { en: "Assets and maintenance tracked across every location", ar: "الأصول والصيانة متتبعة عبر كل موقع" },
    ],
  },
  {
    id: "united-abco",
    title: { en: "United Abco Company — On-Site Corporate IT Support", ar: "شركة أبكو المتحدة — دعم تقني ميداني للشركات" },
    sector: { en: "Corporate IT", ar: "تقنية المعلومات المؤسسية" },
    market: "eg",
    featured: true,
    catIds: ["it-infrastructure", "networks"],
    period: { en: "2015–2018 · Alexandria", ar: "2015–2018 · الإسكندرية" },
    summary: {
      en: "Three years of on-site corporate support through Arab Computers Company: desktops, LAN/Wi-Fi, printers, Active Directory assistance and SLA-driven first and second-line help.",
      ar: "ثلاث سنوات من الدعم الميداني للشركات عبر الشركة العربية للحاسبات: أجهزة وشبكات LAN/Wi-Fi وطابعات ومساعدة في أكتيف ديريكتوري ودعم بمستوييه وفق مستويات خدمة.",
    },
    overview: {
      en: "An on-site support role inside a corporate environment in Alexandria, delivered for Arab Computers Company (ACC). The foundation years: where hardware, networks and user support became second nature.",
      ar: "دور دعم ميداني داخل بيئة شركات في الإسكندرية، قُدم لصالح الشركة العربية للحاسبات. سنوات التأسيس: حيث صارت الأجهزة والشبكات ودعم المستخدمين طبيعة ثانية.",
    },
    challenge: {
      en: "A corporate office that needed its devices, network and users kept productive every day, with fast turnaround on any issue and no formal IT team on the floor.",
      ar: "مكتب شركات يحتاج أن تبقى أجهزته وشبكته ومستخدموه منتجين كل يوم، مع استجابة سريعة لأي مشكلة وبدون فريق تقني رسمي في الموقع.",
    },
    solution: {
      en: "Disciplined on-site practice: IMAC (Install, Move, Add, Change) handled properly, connectivity kept healthy, accounts administered correctly, and every request tracked against SLA targets.",
      ar: "ممارسة ميدانية منضبطة: أنشطة IMAC (تثبيت، نقل، إضافة، تغيير) تُدار بشكل صحيح، والاتصال يبقى سليمًا، والحسابات تُدار بدقة، وكل طلب متتبع وفق أهداف مستويات الخدمة.",
    },
    implementation: [
      { en: "Desktop and laptop installation, configuration and OS support", ar: "تثبيت وتهيئة أجهزة المكتب والحواسيب المحمولة ودعم الأنظمة" },
      { en: "LAN/Wi-Fi connectivity, printers and peripherals", ar: "اتصال LAN/Wi-Fi والطابعات والأجهزة الطرفية" },
      { en: "Active Directory account administration and domain support", ar: "إدارة حسابات أكتيف ديريكتوري ودعم الدومين" },
      { en: "IMAC activities and hardware replacement", ar: "أنشطة IMAC واستبدال العتاد" },
      { en: "First and second-line support meeting SLA targets", ar: "دعم من المستويين الأول والثاني يحقق أهداف مستويات الخدمة" },
    ],
    technologies: ["Windows", "LAN/Wi-Fi", "Active Directory", "Printers"],
    role: {
      en: "On-site Network & Devices Specialist: the person users called, and the person accountable for the answer.",
      ar: "أخصائي شبكات وأجهزة ميداني: الشخص الذي يتصل به المستخدمون، والشخص المسؤول عن الإجابة.",
    },
    results: [
      { en: "Daily operations kept productive with fast issue turnaround", ar: "استمرار إنتاجية العمليات اليومية مع استجابة سريعة للمشكلات" },
      { en: "SLA targets consistently met", ar: "تحقيق مستمر لأهداف مستويات الخدمة" },
      { en: "The hands-on foundation for everything that followed", ar: "الأساس الميداني لكل ما تلاه" },
    ],
  },
];
