import type { B } from "../i18n";

/* ---------------- Service categories (the 5 official lines) ---------------- */
export type ServiceCategory = {
  id: string;
  icon: string;
  name: B;
  tagline: B;
  value: B;
  items: B[];
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
      en: "We design, deploy and run the IT environments businesses depend on — from the first workstation to the server room — with support that answers when it matters.",
      ar: "نصمّم وننفّذ وندير بيئات تقنية المعلومات التي تعتمد عليها الشركات — من أول جهاز حتى غرفة الخوادم — مع دعم يستجيب في الوقت الحاسم.",
    },
    items: [
      { en: "Remote IT Support", ar: "دعم تقني عن بُعد" },
      { en: "On-Site IT Support", ar: "دعم ميداني في الموقع" },
      { en: "User Support & Troubleshooting", ar: "دعم المستخدمين واستكشاف الأعطال" },
      { en: "IT Infrastructure Design & Deployment", ar: "تصميم وتنفيذ البنية التحتية" },
      { en: "Infrastructure Management", ar: "إدارة البنية التحتية" },
      { en: "IT Environment Assessment", ar: "تقييم البيئة التقنية" },
      { en: "Preventive Maintenance & Health Checks", ar: "الصيانة الوقائية وفحوصات السلامة" },
    ],
  },
  {
    id: "networks",
    icon: "network",
    name: { en: "Networks", ar: "الشبكات" },
    tagline: {
      en: "When the network is right, nobody notices it. That is exactly the point.",
      ar: "عندما تكون الشبكة مضبوطة، لا يشعر بها أحد — وهذا هو الهدف بالضبط.",
    },
    value: {
      en: "LAN, WAN, Wi-Fi and VPN environments planned around how your teams actually work — reliable coverage, clean segmentation and connectivity between sites.",
      ar: "شبكات LAN وWAN وواي فاي وVPN مخططة وفق طريقة عمل فرقك فعلًا — تغطية موثوقة، وتقسيم نظيف، وربط آمن بين المواقع.",
    },
    items: [
      { en: "LAN & WAN Design", ar: "تصميم شبكات LAN وWAN" },
      { en: "Business Wi-Fi Coverage", ar: "تغطية واي فاي للأعمال" },
      { en: "Site-to-Site VPN", ar: "شبكات VPN بين المواقع" },
      { en: "Network Infrastructure & Cabling", ar: "بنية الشبكات والتوصيلات" },
      { en: "Network Troubleshooting", ar: "استكشاف أعطال الشبكات" },
      { en: "Bandwidth & Traffic Control", ar: "إدارة النطاق الترددي والحركة" },
    ],
  },
  {
    id: "microsoft-cloud",
    icon: "cloud",
    name: { en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" },
    tagline: {
      en: "Identity, servers and productivity — administered properly, not just licensed.",
      ar: "الهوية والخوادم والإنتاجية — تُدار بشكل صحيح، لا مجرد تراخيص مفعّلة.",
    },
    value: {
      en: "Windows Server and Active Directory environments with disciplined user management, alongside Microsoft 365, OneDrive and SharePoint that teams can actually rely on.",
      ar: "بيئات ويندوز سيرفر وأكتيف ديريكتوري بإدارة منضبطة للمستخدمين، إلى جانب مايكروسوفت 365 وون درايف وشير بوينت تعتمد عليها الفرق فعلًا.",
    },
    items: [
      { en: "Windows Server Administration", ar: "إدارة خوادم ويندوز" },
      { en: "Active Directory & Group Policy", ar: "أكتيف ديريكتوري وسياسات المجموعة" },
      { en: "User & Computer Management", ar: "إدارة المستخدمين والأجهزة" },
      { en: "Microsoft 365 Administration", ar: "إدارة مايكروسوفت 365" },
      { en: "OneDrive & SharePoint", ar: "ون درايف وشير بوينت" },
      { en: "Cloud Productivity & Administration", ar: "الإنتاجية السحابية وإدارتها" },
    ],
  },
  {
    id: "security-systems",
    icon: "cctv",
    name: { en: "Security Systems", ar: "أنظمة الأمن والمراقبة" },
    tagline: {
      en: "See what happens in your business — from anywhere, at any time.",
      ar: "اطّلع على ما يحدث في منشأتك — من أي مكان وفي أي وقت.",
    },
    value: {
      en: "CCTV and video surveillance, NVR/DVR recording, remote monitoring, and biometric access control with attendance — designed as one dependable system.",
      ar: "كاميرات مراقبة وأنظمة تسجيل NVR/DVR ومراقبة عن بُعد وتحكم في الدخول بالبصمة مع الحضور والانصراف — منظومة واحدة موثوقة.",
    },
    items: [
      { en: "CCTV & Video Surveillance", ar: "كاميرات المراقبة بالفيديو" },
      { en: "NVR / DVR Systems", ar: "أنظمة التسجيل NVR / DVR" },
      { en: "Remote Monitoring", ar: "المراقبة عن بُعد" },
      { en: "Biometric & Attendance Systems", ar: "أنظمة البصمة والحضور" },
      { en: "Door Access Control", ar: "التحكم في دخول الأبواب" },
      { en: "Security Infrastructure & Cabling", ar: "بنية الأنظمة الأمنية وتوصيلاتها" },
    ],
  },
  {
    id: "consultancy",
    icon: "compass",
    name: { en: "IT Consultancy", ar: "الاستشارات التقنية" },
    tagline: {
      en: "Clear technology direction, before money is spent on the wrong direction.",
      ar: "توجيه تقني واضح — قبل إنفاق المال في الاتجاه الخاطئ.",
    },
    value: {
      en: "Independent IT assessment, infrastructure planning and technology recommendations that translate technical decisions into business outcomes.",
      ar: "تقييم تقني مستقل وتخطيط للبنية التحتية وتوصيات تقنية تحوّل القرارات الفنية إلى نتائج تخدم الأعمال.",
    },
    items: [
      { en: "IT Assessment", ar: "تقييم تقنية المعلومات" },
      { en: "Infrastructure Planning", ar: "تخطيط البنية التحتية" },
      { en: "Technology Recommendations", ar: "التوصيات التقنية" },
      { en: "IT Strategy", ar: "استراتيجية تقنية المعلومات" },
      { en: "Business IT Consulting", ar: "استشارات الأعمال التقنية" },
    ],
  },
];

/* ---------------- Why TECH OF THE WORLD ---------------- */
export type Differentiator = { icon: string; title: B; body: B };

export const WHY_US: Differentiator[] = [
  {
    icon: "wrench",
    title: { en: "Hands-on technical depth", ar: "عمق تقني ميداني" },
    body: {
      en: "We come from the server room and the field, not just the slide deck. Environments are built, broken and fixed by the same people who advise you.",
      ar: "خبرتنا من غرف الخوادم والميدان، لا من العروض التقديمية. من ينصحك هو نفسه من يبني البيئات ويصلحها.",
    },
  },
  {
    icon: "briefcase",
    title: { en: "Business-focused IT", ar: "تقنية في خدمة الأعمال" },
    body: {
      en: "Every technical decision is explained in terms of uptime, risk and cost to the business — because that is what you actually buy.",
      ar: "نشرح كل قرار تقني بلغة التشغيل والمخاطر والتكلفة — لأن هذا هو ما تشتريه فعلًا.",
    },
  },
  {
    icon: "globe",
    title: { en: "Saudi & Egypt experience", ar: "خبرة سعودية ومصرية" },
    body: {
      en: "Real delivery experience across two markets — different scales, regulations and working cultures, handled with the same standard.",
      ar: "خبرة تنفيذ حقيقية في سوقين مختلفين — بأحجام وأنظمة وثقافات عمل مختلفة، وبالمعيار نفسه من الجودة.",
    },
  },
  {
    icon: "layers",
    title: { en: "Multi-vendor fluency", ar: "إتقان متعدد الموردين" },
    body: {
      en: "Microsoft, MikroTik, Dahua, Hikvision, ZKTeco and more — we choose what fits the environment, not what fits a single-vendor habit.",
      ar: "مايكروسوفت وميكروتيك وداروا وهايك فيجن وزونكاتيكو وغيرها — نختار ما يناسب بيئتك، لا ما يفرضه مورد واحد.",
    },
  },
  {
    icon: "foundation",
    title: { en: "Infrastructure-first thinking", ar: "تفكير يبدأ من الأساس" },
    body: {
      en: "Applications come and go; the infrastructure underneath decides whether they run. We engineer the layer everything else stands on.",
      ar: "التطبيقات تتغير، لكن البنية التحتية هي التي تحدد قدرتها على العمل. نحن نهندس الطبقة التي يقوم عليها كل شيء.",
    },
  },
  {
    icon: "headset",
    title: { en: "Remote & on-site delivery", ar: "تنفيذ عن بُعد وفي الموقع" },
    body: {
      en: "Routine issues resolved remotely in minutes; physical work handled on-site with the same discipline and documentation.",
      ar: "المشكلات اليومية تُحل عن بُعد في دقائق، والأعمال الميدانية تُنفذ في موقعك بالمنهجية والتوثيق نفسيهما.",
    },
  },
];

/* ---------------- How we work ---------------- */
export type Step = { n: string; title: B; body: B };
export const STEPS: Step[] = [
  {
    n: "01",
    title: { en: "Understand", ar: "الفهم" },
    body: {
      en: "We start with your business: what runs on technology, what breaks, and what it costs you when it does.",
      ar: "نبدأ من عملك: ما الذي يعتمد على التقنية، وما الذي يتعطل، وكم يكلّفك ذلك.",
    },
  },
  {
    n: "02",
    title: { en: "Assess", ar: "التقييم" },
    body: {
      en: "A structured look at your current environment — infrastructure, network, identity, security — with findings you can read without a translator.",
      ar: "نظرة منهجية على بيئتك الحالية — بنية وشبكات وهوية وأمن — بنتائج واضحة لا تحتاج مترجمًا.",
    },
  },
  {
    n: "03",
    title: { en: "Plan", ar: "التخطيط" },
    body: {
      en: "A scoped, phased plan with clear deliverables. You know what happens, when, and why — before anything is changed.",
      ar: "خطة محددة النطاق على مراحل بمخرجات واضحة. تعرف ما سيحدث ومتى ولماذا — قبل أي تغيير.",
    },
  },
  {
    n: "04",
    title: { en: "Implement", ar: "التنفيذ" },
    body: {
      en: "Disciplined delivery: documented changes, tested rollback paths, and minimal disruption to your working day.",
      ar: "تنفيذ منضبط: تغييرات موثقة، ومسارات تراجع مُختبرة، وأقل تعطيل ممكن ليوم عملك.",
    },
  },
  {
    n: "05",
    title: { en: "Support", ar: "الدعم" },
    body: {
      en: "We stay reachable after go-live — monitoring, maintenance and improvements that keep the environment healthy long term.",
      ar: "نظل متاحين بعد التشغيل — مراقبة وصيانة وتحسينات تبقي بيئتك سليمة على المدى الطويل.",
    },
  },
];

/* ---------------- Industries ---------------- */
export type Industry = { icon: string; name: B; problems: B[]; help: B };

export const INDUSTRIES: Industry[] = [
  {
    icon: "crane",
    name: { en: "Construction & Contracting", ar: "الإنشاءات والمقاولات" },
    problems: [
      { en: "Site offices that need network and connectivity from day one", ar: "مكاتب مواقع تحتاج شبكة واتصال من اليوم الأول" },
      { en: "Multiple temporary sites, one central office to coordinate", ar: "مواقع مؤقتة متعددة ومكتب مركزي واحد للتنسيق" },
      { en: "CCTV and access control for sites, yards and warehouses", ar: "مراقبة وتحكم في الدخول للمواقع والساحات والمستودعات" },
    ],
    help: {
      en: "Rapid site-office IT setup, site-to-site VPN back to head office, CCTV and attendance systems that survive harsh site conditions.",
      ar: "تجهيز سريع لتقنية مكاتب المواقع، وربط VPN بالمكتب الرئيسي، وأنظمة مراقبة وحضور تتحمّل ظروف المواقع القاسية.",
    },
  },
  {
    icon: "bell",
    name: { en: "Hospitality — Hotels & Restaurants", ar: "الضيافة — فنادق ومطاعم" },
    problems: [
      { en: "Guest Wi-Fi that must simply work, everywhere", ar: "واي فاي للضيوف يجب أن يعمل ببساطة في كل مكان" },
      { en: "Separate secure networks for operations and POS systems", ar: "شبكات منفصلة وآمنة للتشغيل وأنظمة نقاط البيع" },
      { en: "Surveillance across lobbies, kitchens, entrances and floors", ar: "مراقبة للبهو والمطابخ والمداخل والأدوار" },
    ],
    help: {
      en: "Full-coverage guest and operations Wi-Fi with clean network separation, CCTV across the property, and IT support that understands seasonality.",
      ar: "تغطية واي فاي كاملة للضيوف والتشغيل مع فصل نظيف للشبكات، ومراقبة شاملة للمنشأة، ودعم تقني يفهم طبيعة المواسم.",
    },
  },
  {
    icon: "pulse",
    name: { en: "Healthcare — Clinics & Medical Centers", ar: "الرعاية الصحية — عيادات ومراكز طبية" },
    problems: [
      { en: "Systems that cannot be allowed to go down during clinic hours", ar: "أنظمة لا يمكن أن تتوقف أثناء ساعات العيادة" },
      { en: "Patient data that must be stored and shared carefully", ar: "بيانات مرضى يجب حفظها ومشاركتها بحذر" },
      { en: "Access control for sensitive areas and records", ar: "تحكم في الدخول للمناطق والسجلات الحساسة" },
    ],
    help: {
      en: "Reliable clinical-workstation environments, structured backups, secure remote access for staff, and surveillance with controlled retention.",
      ar: "بيئات عمل موثوقة لأجهزة العيادات، ونسخ احتياطي منظم، ووصول عن بُعد آمن للموظفين، ومراقبة باحتفاظ مُتحكم فيه.",
    },
  },
  {
    icon: "cart",
    name: { en: "Retail", ar: "التجزئة" },
    problems: [
      { en: "POS and payment systems that must stay online", ar: "أنظمة نقاط بيع ودفع يجب أن تبقى متصلة" },
      { en: "Loss prevention across sales floors and stock rooms", ar: "منع الخسائر في صالات البيع وغرف المخزون" },
      { en: "Many branches, little local IT knowledge", ar: "فروع كثيرة ومعرفة تقنية محلية محدودة" },
    ],
    help: {
      en: "Resilient branch connectivity with failover, CCTV designed for real coverage rather than camera counts, and centralized management of all locations.",
      ar: "اتصال مرن للفروع مع مسارات بديلة، ومراقبة مصممة لتغطية حقيقية لا لعدد الكاميرات، وإدارة مركزية لكل الفروع.",
    },
  },
  {
    icon: "desk",
    name: { en: "Offices & Professional Services", ar: "المكاتب والخدمات المهنية" },
    problems: [
      { en: "Onboarding and offboarding users without chaos", ar: "إضافة المستخدمين وإيقافهم دون فوضى" },
      { en: "Files scattered across devices instead of one controlled place", ar: "ملفات مبعثرة على الأجهزة بدل مكان واحد مُتحكم فيه" },
      { en: "No internal IT department, but real IT needs", ar: "لا يوجد قسم تقنية داخلي، لكن الاحتياجات حقيقية" },
    ],
    help: {
      en: "Active Directory and Microsoft 365 administered properly — identities, devices, SharePoint and OneDrive — plus a support channel your team can rely on.",
      ar: "إدارة صحيحة لأكتيف ديريكتوري ومايكروسوفت 365 — هويات وأجهزة وشير بوينت وون درايف — مع قناة دعم يعتمد عليها فريقك.",
    },
  },
  {
    icon: "box",
    name: { en: "Warehousing & Logistics", ar: "التخزين واللوجستيات" },
    problems: [
      { en: "Connectivity across large concrete facilities", ar: "اتصال يغطي منشآت خرسانية واسعة" },
      { en: "Yard, gate and perimeter surveillance", ar: "مراقبة الساحات والبوابات والأسوار" },
      { en: "Branches and warehouses that must talk to head office", ar: "فروع ومستودعات يجب أن تتصل بالمكتب الرئيسي" },
    ],
    help: {
      en: "Industrial Wi-Fi planning, gate and yard CCTV, biometric attendance for shift teams, and VPN links that keep operations one network.",
      ar: "تخطيط واي فاي صناعي، ومراقبة للبوابات والساحات، وبصمة حضور لفرق الورديات، وربط VPN يجعل العمليات شبكة واحدة.",
    },
  },
];

export const EXTRA_INDUSTRIES: B[] = [
  { en: "Real Estate", ar: "العقارات" },
  { en: "Education", ar: "التعليم" },
  { en: "Events & Seasonal Operations", ar: "الفعاليات والعمليات الموسمية" },
  { en: "Trading & Distribution", ar: "التجارة والتوزيع" },
];

/* ---------------- Technology expertise (verified, hands-on) ---------------- */
export type TechGroup = { name: B; items: string[] };
export const TECH_GROUPS: TechGroup[] = [
  {
    name: { en: "Platforms & Identity", ar: "المنصات والهوية" },
    items: ["Microsoft", "Windows Server", "Active Directory", "Group Policy"],
  },
  {
    name: { en: "Productivity & Cloud", ar: "الإنتاجية والسحابة" },
    items: ["Microsoft 365", "OneDrive", "SharePoint", "Exchange Online"],
  },
  {
    name: { en: "Networking", ar: "الشبكات" },
    items: ["MikroTik RouterOS", "LAN / WAN", "Business Wi-Fi", "Site-to-Site VPN"],
  },
  {
    name: { en: "Surveillance & Access", ar: "المراقبة والتحكم" },
    items: ["Hikvision", "Dahua", "NVR / DVR", "ZKTeco Biometrics"],
  },
  {
    name: { en: "Operations & Monitoring", ar: "العمليات والمراقبة" },
    items: ["ManageEngine", "PRTG", "Structured Cabling", "Service Desk Practice"],
  },
];

export const TECH_TICKER = [
  "Microsoft", "Windows Server", "Active Directory", "Microsoft 365", "SharePoint", "OneDrive",
  "MikroTik", "Hikvision", "Dahua", "ZKTeco", "ManageEngine", "PRTG",
];

/* ---------------- FAQ ---------------- */
export type Faq = { q: B; a: B };
export const FAQS: Faq[] = [
  {
    q: { en: "Do you work with small businesses, or only large companies?", ar: "هل تتعاملون مع الشركات الصغيرة أم الكبيرة فقط؟" },
    a: {
      en: "Small and medium businesses are our core audience. Most of our work is with organizations that have real IT needs but no internal IT department — that is exactly the gap we fill.",
      ar: "الشركات الصغيرة والمتوسطة هي جمهورنا الأساسي. أغلب أعمالنا مع مؤسسات لديها احتياجات تقنية حقيقية لكن بلا قسم تقنية داخلي — وهذه بالضبط الفجوة التي نملؤها.",
    },
  },
  {
    q: { en: "Can you support an environment you did not build?", ar: "هل تدعمون بيئة لم تنشئوها بأنفسكم؟" },
    a: {
      en: "Yes. Many engagements start with an assessment of an existing environment, followed by stabilization — then improvement where it genuinely pays off.",
      ar: "نعم. كثير من الأعمال تبدأ بتقييم بيئة قائمة ثم تثبيتها — ثم تحسينها حيث يستحق العائد فعلًا.",
    },
  },
  {
    q: { en: "How do projects and pricing work?", ar: "كيف تتم المشاريع وتحديد الأسعار؟" },
    a: {
      en: "Every engagement is scoped first. You receive a clear quotation based on the actual environment and requirements — no list prices invented for a website, and no surprises mid-project.",
      ar: "كل عمل يبدأ بتحديد النطاق، ثم يصلك عرض سعر واضح مبني على بيئتك الفعلية — لا أسعار جاهزة مخترعة، ولا مفاجآت أثناء المشروع.",
    },
  },
  {
    q: { en: "Do you provide one-time projects or ongoing support?", ar: "هل تقدمون مشاريع لمرة واحدة أم دعمًا مستمرًا؟" },
    a: {
      en: "Both. Some clients need a single infrastructure project delivered properly; others keep us on for remote support, maintenance and monitoring. You choose the shape of the relationship.",
      ar: "الاثنين معًا. بعض العملاء يحتاجون مشروع بنية واحدًا يُنفذ بإتقان، وآخرون يستمرون معنا في الدعم عن بُعد والصيانة والمراقبة. شكل العلاقة بيدك.",
    },
  },
  {
    q: { en: "How quickly can you respond to an issue?", ar: "ما سرعة استجابتكم للمشكلات؟" },
    a: {
      en: "Response targets are agreed per engagement and urgency level. Critical issues on supported environments are treated as priority from the first message — reach us via WhatsApp for the fastest path.",
      ar: "أهداف الاستجابة تُتفق حسب كل عمل ودرجة الإلحاح. المشكلات الحرجة في البيئات المدعومة تعامل كأولوية من أول رسالة — وأسرع طريق إلينا هو واتساب.",
    },
  },
  {
    q: { en: "Where do you operate?", ar: "أين تعملون؟" },
    a: {
      en: "Across Saudi Arabia and Egypt — remote support anywhere, and on-site delivery arranged per location and engagement.",
      ar: "في السعودية ومصر — دعم عن بُعد في أي مكان، وتنفيذ ميداني يُرتب حسب الموقع وطبيعة العمل.",
    },
  },
];

/* ---------------- Factual brand facts (never invented) ---------------- */
export const FACTS: { value: string; label: B }[] = [
  { value: "05", label: { en: "Service lines", ar: "مسارات خدمية" } },
  { value: "11", label: { en: "Core services", ar: "خدمات أساسية" } },
  { value: "02", label: { en: "Markets served", ar: "أسواق مخدومة" } },
  { value: "08", label: { en: "Documented case studies", ar: "دراسات حالة موثقة" } },
];
