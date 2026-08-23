import type { B } from "../i18n";

/** صورة مشروع من مجلد المحتوى: public/projects/<id>/images/ */
export type ProjectImage = { file: string; caption?: B };

export type CaseStudy = {
  id: string;
  title: B;
  sector: B;
  market: "sa" | "eg" | "both";
  featured: boolean;
  catIds: string[];
  summary: B;
  overview: B;
  challenge: B;
  solution: B;
  implementation: B[];
  technologies: string[];
  role: B;
  results: B[];
  /** الفترة الزمنية الموثقة في السيرة الذاتية (اختياري) */
  period?: B;
  /** تُمْلأ تلقائيًا من مجلد المشروع (بدون كود) */
  images?: ProjectImage[];
};

export const CASES: CaseStudy[] = [
  {
    id: "smart-hajj-camp",
    title: { en: "Smart Hajj Camp Infrastructure", ar: "بنية تحتية لمخيم حج ذكي" },
    sector: { en: "Hospitality & Seasonal Operations", ar: "الضيافة والعمليات الموسمية" },
    market: "sa",
    featured: true,
    catIds: ["it-infrastructure", "networks", "security-systems"],
    period: { en: "2024–2025 · Makkah, Saudi Arabia", ar: "2024–2025 · مكة المكرمة، السعودية" },
    summary: {
      en: "A complete temporary IT environment (network, Wi-Fi, surveillance and connectivity) delivered for a smart Hajj camp operating at peak-season scale.",
      ar: "بيئة تقنية مؤقتة متكاملة (شبكة وواي فاي ومراقبة واتصال) لمخيم حج ذكي يعمل بكامل طاقته في موسم الذروة.",
    },
    overview: {
      en: "One of Saudi Arabia's largest seasonal operations: a smart Hajj camp in Makkah required a full working IT environment built from scratch within a tight seasonal window. Connectivity for operations teams, Wi-Fi across the camp, and surveillance of key areas, all in a temporary setting that still had to behave like an enterprise network.",
      ar: "أحد أكبر العمليات الموسمية في السعودية: احتاج مخيم حج ذكي في مكة المكرمة إلى بيئة تقنية كاملة تُبنى من الصفر ضمن نافذة موسمية ضيقة. اتصال لفرق التشغيل، وواي فاي في أنحاء المخيم، ومراقبة للمناطق الحيوية، في إطار مؤقت يجب أن يعمل كشبكة مؤسسية.",
    },
    challenge: {
      en: "Temporary infrastructure usually means fragile infrastructure. The camp had to support many simultaneous users, harsh outdoor conditions, and a hard deadline tied to the season, with no room for rework once pilgrims arrived.",
      ar: "البنية المؤقتة تعني غالبًا بنية هشة. كان على المخيم دعم عدد كبير من المستخدمين المتزامنين في ظروف خارجية قاسية وضمن موعد نهائي مرتبط بالموسم، بلا مجال لإعادة العمل بعد وصول الحجاج.",
    },
    solution: {
      en: "We designed the camp as a single managed network: structured distribution points per zone, business-grade Wi-Fi coverage, centrally managed routing and bandwidth control, and a CCTV layer covering operational areas, with monitoring from one point.",
      ar: "صمّمنا المخيم كشبكة واحدة مُدارة: نقاط توزيع منظمة لكل منطقة، وتغطية واي فاي بمستوى الأعمال، وتوجيه مركزي مع إدارة للنطاق الترددي، وطبقة مراقبة للمناطق التشغيلية، بمتابعة من نقطة واحدة.",
    },
    implementation: [
      { en: "Network design per camp zone with labeled distribution points", ar: "تصميم الشبكة لكل منطقة مع نقاط توزيع موسومة" },
      { en: "Wi-Fi deployment with coverage planning for tents and open areas", ar: "نشر الواي فاي بتخطيط تغطية للخيام والمناطق المفتوحة" },
      { en: "Central routing, segmentation and bandwidth policies", ar: "توجيه مركزي وتقسيم شبكي وسياسات للنطاق الترددي" },
      { en: "CCTV installation and recording configuration for key points", ar: "تركيب الكاميرات وتجهيز التسجيل للنقاط الحيوية" },
      { en: "Season-long remote monitoring and on-call support", ar: "مراقبة عن بُعد طوال الموسم ودعم عند الطلب" },
    ],
    technologies: ["MikroTik", "Business Wi-Fi", "Structured Cabling", "CCTV", "NVR", "Access Control", "Biometric Attendance", "IP Telephony"],
    role: {
      en: "IT Operations Supervisor: led a team of 6+ IT technicians through the season. Incident response and escalations, preventive maintenance, pre-season infrastructure deployment, and day-to-day operation of desktops, printers, networking, CCTV, access control, biometric attendance and IP telephony.",
      ar: "مشرف عمليات تقنية المعلومات: قيادة فريق من أكثر من 6 فنيين طوال الموسم. الاستجابة للحوادث والتصعيد، والصيانة الوقائية، ونشر البنية التحتية قبل الموسم، والتشغيل اليومي للأجهزة والطابعات والشبكات والمراقبة والتحكم في الدخول والبصمة والهواتف.",
    },
    results: [
      { en: "One coherent network across all camp zones instead of disconnected fragments", ar: "شبكة واحدة مترابطة عبر مناطق المخيم بدل أجزاء منفصلة" },
      { en: "Mission-critical technology services stayed available through peak operational periods", ar: "استمرارية الخدمات التقنية الحيوية خلال فترات الذروة التشغيلية" },
      { en: "A supervised technical team with clear escalation and maintenance routines", ar: "فريق تقني مُدار بروتين واضح للتصعيد والصيانة" },
      { en: "The environment stood up on schedule, before the season began", ar: "جاهزية البيئة في موعدها قبل بدء الموسم" },
    ],
  },
  {
    id: "sumou-towers",
    title: { en: "Sumou Towers IT & Network Infrastructure", ar: "بنية تقنية وشبكات أبراج سمو" },
    sector: { en: "Construction & Real Estate", ar: "الإنشاءات والعقارات" },
    market: "sa",
    featured: true,
    catIds: ["it-infrastructure", "networks"],
    period: { en: "2025–Present · Jeddah, Saudi Arabia", ar: "2025–الآن · جدة، السعودية" },
    summary: {
      en: "Structured cabling and network distribution across a multi-tower development, the silent layer every smart building service depends on.",
      ar: "توصيلات منظمة وتوزيع شبكي عبر أبراج متعددة، الطبقة الصامتة التي تعتمد عليها كل خدمات المباني الذكية.",
    },
    overview: {
      en: "A multi-tower development needed its IT backbone delivered alongside construction: structured cabling, floor distribution and rack infrastructure ready before fit-out teams moved in.",
      ar: "احتاج مشروع أبراج متعددة إلى تسليم العمود الفقري التقني بالتوازي مع الإنشاء: توصيلات منظمة وتوزيع للأدوار وبنية racks جاهزة قبل دخول فرق التشطيب.",
    },
    challenge: {
      en: "Construction timelines compress everything. Cabling decisions made early are expensive to revisit later, and coordination between contractors, consultants and fit-out teams had to stay tight.",
      ar: "جداول الإنشاء تضغط كل شيء. قرارات التوصيلات المبكرة مكلفة جدًا عند مراجعتها لاحقًا، والتنسيق بين المقاولين والاستشاريين وفرق التشطيب يجب أن يبقى محكمًا.",
    },
    solution: {
      en: "A floor-by-floor structured cabling plan with labeled pathways, consolidated distribution per zone, and rack rooms organized for future operations, documented as-built so any team can maintain it later.",
      ar: "خطة توصيلات منظمة دورًا بدور مع مسارات موسومة، وتوزيع مجمّع لكل منطقة، وغرف racks منظمة للتشغيل المستقبلي، مع توثيق as-built يسهّل صيانة أي فريق لاحقًا.",
    },
    implementation: [
      { en: "Structured cabling design aligned with construction phases", ar: "تصميم التوصيلات المنظمة بما يتوافق مع مراحل الإنشاء" },
      { en: "Floor distribution points and pathway coordination", ar: "نقاط توزيع للأدوار وتنسيق المسارات" },
      { en: "Rack room layout, termination and labeling standards", ar: "تخطيط غرف الـ racks وإنهاء التوصيلات ومعايير الوسم" },
      { en: "Testing and as-built documentation handover", ar: "الاختبار وتسليم توثيق الحالة المنفذة" },
    ],
    technologies: ["Structured Cabling", "Rack Infrastructure", "Network Distribution", "Windows Server", "Active Directory", "Microsoft 365", "ManageEngine ServiceDesk"],
    role: {
      en: "Senior IT Support Specialist on the project: Tier 2 support for 500+ end users in a Windows Domain environment, Active Directory and Microsoft 365 administration, enterprise printing infrastructure, executive (VIP) support, user onboarding, and coordination with infrastructure teams and vendors.",
      ar: "أخصائي دعم تقني أول في المشروع: دعم من المستوى الثاني لأكثر من 500 مستخدم في بيئة Windows Domain، وإدارة أكتيف ديريكتوري ومايكروسوفت 365، وبنية الطباعة المؤسسية، والدعم التنفيذي (VIP)، وتجهيز المستخدمين الجدد، والتنسيق مع فرق البنية التحتية والموردين.",
    },
    results: [
      { en: "A tested, labeled, documented backbone ready for building services", ar: "عمود فقري مُختبر وموسوم وموثق وجاهز لخدمات المبنى" },
      { en: "Recurring IT incidents reduced by 50–65% through a structured preventive maintenance program and proactive monitoring", ar: "انخفاض الأعطال التقنية المتكررة بنسبة 50–65% عبر برنامج صيانة وقائي منظم ومراقبة استباقية" },
      { en: "High service availability with consistent SLA compliance for 500+ users", ar: "توافر خدمي عالٍ مع التزام مستمر بمستويات الخدمة لأكثر من 500 مستخدم" },
      { en: "A maintenance-friendly foundation for the towers' operational life", ar: "أساس سهل الصيانة طوال العمر التشغيلي للأبراج" },
    ],
  },
  {
    id: "cctv-command-center",
    title: { en: "CCTV Command Center", ar: "مركز قيادة للمراقبة بالكاميرات" },
    sector: { en: "Security & Facility Operations", ar: "الأمن وتشغيل المنشآت" },
    market: "both",
    featured: true,
    catIds: ["security-systems"],
    summary: {
      en: "A centralized monitoring environment consolidating cameras from multiple areas into one operational view, built to be watched, reviewed and maintained.",
      ar: "بيئة مراقبة مركزية تجمع كاميرات مناطق متعددة في شاشة تشغيل واحدة، مبنية للمشاهدة والمراجعة والصيانة.",
    },
    overview: {
      en: "A growing operation needed its scattered cameras unified into a proper command center: a video wall for live monitoring, consolidated recording, and remote access for authorized staff.",
      ar: "احتاجت عمليات متنامية إلى توحيد كاميراتها المتفرقة في مركز مراقبة حقيقي: جدار شاشات للمتابعة الحية، وتسجيل مجمّع، ووصول عن بُعد للمصرّح لهم.",
    },
    challenge: {
      en: "Cameras existed, but visibility did not. Multiple standalone recorders, inconsistent coverage, and footage that was hard to retrieve when an incident actually needed review.",
      ar: "الكاميرات كانت موجودة، لكن الرؤية لم تكن. أجهزة تسجيل متفرقة وتغطية غير متسقة ولقطات يصعب استرجاعها عند الحاجة الفعلية للمراجعة.",
    },
    solution: {
      en: "We consolidated recording onto central NVR platforms, designed camera placement around real coverage goals, and built a monitoring station with a video wall, structured review workflows and controlled remote access.",
      ar: "جمعنا التسجيل على منصات NVR مركزية، وصمّمنا توزيع الكاميرات وفق أهداف تغطية حقيقية، وبنينا محطة مراقبة بجدار شاشات وسير عمل منظم للمراجعة ووصول عن بُعد مُتحكم فيه.",
    },
    implementation: [
      { en: "Camera survey and coverage redesign", ar: "مسح الكاميرات وإعادة تصميم التغطية" },
      { en: "NVR consolidation and storage planning", ar: "تجميع أجهزة التسجيل وتخطيط السعة التخزينية" },
      { en: "Video wall and monitoring workstation build", ar: "بناء جدار الشاشات ومحطة المتابعة" },
      { en: "Review workflows and secure remote viewing", ar: "سير عمل المراجعة والمشاهدة عن بُعد الآمنة" },
    ],
    technologies: ["Hikvision", "Dahua", "NVR", "Video Wall", "IP Networking"],
    role: {
      en: "Design and build of the surveillance platform, from camera layout to the monitoring room itself.",
      ar: "تصميم وبناء منصة المراقبة، من توزيع الكاميرات حتى غرفة المتابعة نفسها.",
    },
    results: [
      { en: "One operational view instead of many isolated recorders", ar: "شاشة تشغيل واحدة بدل أجهزة تسجيل معزولة" },
      { en: "Footage retrieval turned from a hunt into a workflow", ar: "استرجاع اللقطات أصبح سير عمل بدل بحث عشوائي" },
      { en: "Coverage planned around what actually needed watching", ar: "تغطية مخططة حسب ما يستحق المراقبة فعلًا" },
    ],
  },
  {
    id: "enterprise-data-center",
    title: { en: "Enterprise Data Center Build", ar: "بناء مركز بيانات مؤسسي" },
    sector: { en: "Cross-Industry IT Operations", ar: "عمليات تقنية عابرة للقطاعات" },
    market: "both",
    featured: true,
    catIds: ["it-infrastructure", "microsoft-cloud", "networks"],
    summary: {
      en: "A server room engineered as a real data center environment: power discipline, organized racks, a clean network core and manageability built in from day one.",
      ar: "غرفة خوادم هندسية كبيئة مركز بيانات حقيقية: انضباط في الطاقة، وracks منظمة، وقلب شبكي نظيف، وقابلية إدارة مدمجة من اليوم الأول.",
    },
    overview: {
      en: "An organization outgrew its ad-hoc server corner and needed a proper data center environment: a designed room with rack infrastructure, network core, and server platforms administered as one system.",
      ar: "تجاوزت مؤسسة مرحلة «ركن الخوادم العشوائي» واحتاجت بيئة مركز بيانات حقيقية: غرفة مصممة ببنية racks وقلب شبكي ومنصات خوادم تُدار كنظام واحد.",
    },
    challenge: {
      en: "Servers, storage and network gear had accumulated without a plan: undocumented connections, shared power strips, and no single view of what depended on what.",
      ar: "تراكمت الخوادم والتخزين ومعدات الشبكة بلا خطة: توصيلات غير موثقة ومشاركات كهرباء عشوائية، وبلا رؤية واحدة لما يعتمد على ماذا.",
    },
    solution: {
      en: "We rebuilt the room with intent: organized rack layout with labeling, structured cabling, power discipline with managed distribution, a switched network core, and Windows Server platforms administered under consistent policy.",
      ar: "أعدنا بناء الغرفة بقصد واضح: توزيع racks منظم مع وسم، وتوصيلات منظمة، وانضباط كهربائي بتوزيع مُدار، وقلب شبكي مُحوَّل، ومنصات ويندوز سيرفر تُدار بسياسات متسقة.",
    },
    implementation: [
      { en: "Room and rack layout redesign with labeling standards", ar: "إعادة تصميم الغرفة والـ racks مع معايير الوسم" },
      { en: "Structured cabling and managed power distribution", ar: "توصيلات منظمة وتوزيع كهرباء مُدار" },
      { en: "Network core switching and segmentation", ar: "قلب شبكي مُحوَّل مع تقسيم" },
      { en: "Windows Server deployment and administration baseline", ar: "نشر ويندوز سيرفر ووضع أساس إدارة موحد" },
      { en: "Monitoring and documentation handover", ar: "المراقبة وتسليم التوثيق" },
    ],
    technologies: ["Windows Server", "Active Directory", "Structured Cabling", "Core Switching", "PRTG"],
    role: {
      en: "Full design and build of the environment, from physical layer to server administration practice.",
      ar: "تصميم وبناء كامل للبيئة، من الطبقة الفيزيائية حتى منهجية إدارة الخوادم.",
    },
    results: [
      { en: "A documented environment where every cable and dependency is known", ar: "بيئة موثقة يُعرف فيها كل كابل وكل اعتمادية" },
      { en: "Maintenance windows became planned work instead of emergencies", ar: "أعمال الصيانة أصبحت عملًا مخططًا بدل حالات طوارئ" },
      { en: "A foundation the organization can grow on without rework", ar: "أساس تنمو عليه المؤسسة دون إعادة بناء" },
    ],
  },
  {
    id: "hotel-wifi",
    title: { en: "Hotel Wi-Fi Infrastructure", ar: "بنية واي فاي لفندق" },
    sector: { en: "Hospitality", ar: "الضيافة" },
    market: "both",
    featured: false,
    catIds: ["networks"],
    summary: {
      en: "Guest Wi-Fi that reaches every room and public area, cleanly separated from the hotel's operational network. Planned by survey, not by guesswork.",
      ar: "واي فاي للضيوف يصل كل غرفة ومنطقة عامة، مفصول بوضوح عن شبكة الفندق التشغيلية. مخطط بمسح ميداني لا بالتخمين.",
    },
    overview: {
      en: "A hotel needed dependable Wi-Fi across guest floors, lobby and public areas, without letting guest traffic anywhere near the systems that run the property.",
      ar: "احتاج فندق إلى واي فاي موثوق في أدوار الضيوف والبهو والمناطق العامة، دون السماح لحركة الضيوف بالاقتراب من الأنظمة التي تشغّل المنشأة.",
    },
    challenge: {
      en: "Guest complaints about Wi-Fi were constant, while the property's own systems (front desk, POS, management) shared the same fragile network fabric.",
      ar: "شكاوى الضيوف من الواي فاي كانت مستمرة، بينما أنظمة الفندق نفسها (الاستقبال ونقاط البيع والإدارة) تشارك النسيج الشبكي الهش ذاته.",
    },
    solution: {
      en: "A coverage plan based on the building's real structure, access points placed by survey, guest and operational networks separated with VLANs, and bandwidth policies that keep every guest online without one user consuming everything.",
      ar: "خطة تغطية مبنية على تركيب المبنى الفعلي، ونقاط وصول وُضعت وفق مسح ميداني، وفصل شبكات الضيوف والتشغيل عبر VLANs، وسياسات نطاق ترددي تبقي كل ضيف متصلًا دون أن يستهلك مستخدم واحد كل شيء.",
    },
    implementation: [
      { en: "Site survey and coverage modeling", ar: "مسح ميداني ونمذجة التغطية" },
      { en: "Access point deployment across floors and public zones", ar: "نشر نقاط الوصول عبر الأدوار والمناطق العامة" },
      { en: "VLAN segmentation: guest, operations, management", ar: "تقسيم VLAN: ضيوف، تشغيل، إدارة" },
      { en: "Bandwidth management and access policies", ar: "إدارة النطاق الترددي وسياسات الوصول" },
    ],
    technologies: ["MikroTik", "Business Wi-Fi", "VLAN", "Bandwidth Control"],
    role: {
      en: "Wireless design, deployment and policy configuration for the full property.",
      ar: "تصميم الشبكة اللاسلكية ونشرها وتجهيز سياساتها لكامل المنشأة.",
    },
    results: [
      { en: "Coverage designed around the building, not around router placement luck", ar: "تغطية مصممة وفق المبنى، لا حسب حظ وضع الراوتر" },
      { en: "Guest and operational traffic fully separated", ar: "فصل كامل بين حركة الضيوف والتشغيل" },
      { en: "Wi-Fi stopped being the front desk's most common complaint", ar: "توقف الواي فاي عن كونه أكثر شكوى لدى الاستقبال" },
    ],
  },
  {
    id: "mikrotik-s2s-vpn",
    title: { en: "MikroTik Site-to-Site VPN", ar: "شبكة VPN بين المواقع بميكروتيك" },
    sector: { en: "Warehousing & Logistics", ar: "التخزين واللوجستيات" },
    market: "both",
    featured: false,
    catIds: ["networks"],
    summary: {
      en: "Branches and warehouses joined into one private network over MikroTik routers, so systems behave as if every site were in the same building.",
      ar: "فروع ومستودعات اجتمعت في شبكة خاصة واحدة عبر راوترات ميكروتيك، لتعمل الأنظمة كأن كل المواقع في مبنى واحد.",
    },
    overview: {
      en: "A multi-site operation needed its locations connected as one network: shared systems, file access and internal services available at every site without exposing anything to the public internet.",
      ar: "احتاجت عمليات متعددة المواقع إلى ربط مواقعها كشبكة واحدة: أنظمة مشتركة ووصول للملفات وخدمات داخلية متاحة في كل موقع دون كشف أي شيء على الإنترنت العام.",
    },
    challenge: {
      en: "Each site was an island. Staff juggle workaround file transfers, and any shared system needed fragile port-forwarding hacks that nobody trusted.",
      ar: "كل موقع كان جزيرة. الموظفون يتدبرون نقل الملفات بطرق ملتوية، وأي نظام مشترك كان يحتاج ثغرات Port-Forwarding هشة لا يثق بها أحد.",
    },
    solution: {
      en: "Site-to-site VPN tunnels on MikroTik RouterOS connecting each location into one routed private network, with routing rules, segmentation and monitoring configured per site.",
      ar: "أنفاق VPN بين المواقع على MikroTik RouterOS تربط كل المواقع في شبكة خاصة واحدة موجّهة، مع قواعد توجيه وتقسيم ومراقبة مُجهزة لكل موقع.",
    },
    implementation: [
      { en: "Router deployment and tunnel configuration per site", ar: "نشر الراوترات وتجهيز الأنفاق لكل موقع" },
      { en: "Routing and addressing plan across locations", ar: "خطة توجيه وعنونة عبر المواقع" },
      { en: "Segmentation between site networks where required", ar: "تقسيم بين شبكات المواقع حيث يلزم" },
      { en: "Monitoring and failover awareness", ar: "المراقبة والوعي بمسارات الفشل" },
    ],
    technologies: ["MikroTik RouterOS", "Site-to-Site VPN", "Routing", "PRTG"],
    role: {
      en: "Network design and VPN implementation across all connected sites.",
      ar: "تصميم الشبكة وتنفيذ الـ VPN عبر جميع المواقع المرتبطة.",
    },
    results: [
      { en: "All sites operate as one private network", ar: "كل المواقع تعمل كشبكة خاصة واحدة" },
      { en: "Workaround file transfers retired", ar: "التقاعد الرسمي لطرق نقل الملفات الملتوية" },
      { en: "Internal services reachable securely from any location", ar: "الخدمات الداخلية متاحة بأمان من أي موقع" },
    ],
  },
  {
    id: "biometric-access",
    title: { en: "Biometric & Access Control Systems", ar: "أنظمة البصمة والتحكم في الدخول" },
    sector: { en: "Offices & Healthcare", ar: "المكاتب والرعاية الصحية" },
    market: "both",
    featured: false,
    catIds: ["security-systems"],
    summary: {
      en: "Biometric attendance and door access deployed as one system, so who is where, and who entered when, is a report away rather than a dispute.",
      ar: "بصمة حضور وتحكم في دخول الأبواب كمنظومة واحدة، فيصبح «من أين ومتى دخل» تقريرًا جاهزًا بدل جدال.",
    },
    overview: {
      en: "An organization needed dependable attendance data and controlled entry to sensitive areas: biometric devices at doors, integrated into a single attendance and access platform.",
      ar: "احتاجت مؤسسة إلى بيانات حضور موثوقة ودخول مُتحكم فيه للمناطق الحساسة: أجهزة بصمة على الأبواب مدمجة في منصة واحدة للحضور والدخول.",
    },
    challenge: {
      en: "Paper-based or card-based attendance invited errors and disputes, and sensitive areas relied on keys that multiplied and were never tracked.",
      ar: "الحضور الورقي أو بالبطاقات كان يفتح باب الأخطاء والجدال، والمناطق الحساسة كانت تعتمد على مفاتيح تتكاثر ولا تُتتبع.",
    },
    solution: {
      en: "ZKTeco biometric terminals at entry points and sensitive doors, wired and configured into a central attendance and access control system with per-user permissions and exportable reports.",
      ar: "أجهزة بصمة ZKTeco عند المداخل والأبواب الحساسة، موصولة ومجهزة في نظام مركزي للحضور والتحكم بالدخول بصلاحيات لكل مستخدم وتقارير قابلة للتصدير.",
    },
    implementation: [
      { en: "Device placement per door and entry flow", ar: "توزيع الأجهزة حسب الأبواب وحركة الدخول" },
      { en: "Enrollment of users and biometric profiles", ar: "تسجيل المستخدمين والبصمات" },
      { en: "Access rules per area, schedule and role", ar: "قواعد الدخول حسب المنطقة والوردية والدور" },
      { en: "Attendance reporting setup and handover training", ar: "تجهيز تقارير الحضور وتدريب التسليم" },
    ],
    technologies: ["ZKTeco", "Access Control", "Biometric Attendance", "IP Networking"],
    role: {
      en: "Supply coordination, installation, configuration and handover of the full system.",
      ar: "تنسيق التوريد والتركيب والتجهيز وتسليم المنظومة كاملة.",
    },
    results: [
      { en: "Attendance became a system output, not an argument", ar: "الحضور أصبح مخرجًا نظاميًا لا موضوع نقاش" },
      { en: "Sensitive areas restricted to authorized people only", ar: "المناطق الحساسة مقتصرة على المصرّح لهم فقط" },
      { en: "Entry events logged and reviewable", ar: "أحداث الدخول مسجلة وقابلة للمراجعة" },
    ],
  },
  {
    id: "enterprise-support-servicedesk",
    title: { en: "Enterprise IT Support & Service Desk", ar: "دعم تقني مؤسسي ومكتب خدمة" },
    sector: { en: "Multi-Industry Operations", ar: "عمليات متعددة القطاعات" },
    market: "both",
    featured: false,
    catIds: ["it-infrastructure", "microsoft-cloud"],
    summary: {
      en: "Ongoing user support and environment administration run as a practice (ticketed, monitored and improved), not as firefighting.",
      ar: "دعم مستمر للمستخدمين وإدارة للبيئة تُمارس كمنهجية (بتذاكر ومراقبة وتحسين)، لا كإطفاء حرائق.",
    },
    overview: {
      en: "An organization with a large user base needed its day-to-day IT run professionally: incidents handled through a service desk, endpoints and servers monitored, and Microsoft 365 administered with routine discipline.",
      ar: "احتاجت مؤسسة بقاعدة مستخدمين كبيرة إلى إدارة يومية احترافية لتقنيتها: حوادث تُعالج عبر مكتب خدمة، وأجهزة وخوادم تُراقب، ومايكروسوفت 365 تُدار بانضباط دوري.",
    },
    challenge: {
      en: "IT help arrived by whoever shouted loudest. The same issues kept returning because nothing was tracked, and environment health was only measured when something already broke.",
      ar: "المساعدة التقنية كانت تصل لمن يصرخ أعلى. المشكلات نفسها تعود لأن لا شيء يُتتبع، وصحة البيئة كانت تُقاس فقط عندما ينكسر شيء.",
    },
    solution: {
      en: "A structured service desk practice with ticketing through ManageEngine, environment monitoring via PRTG, and scheduled administration of Active Directory and Microsoft 365, with recurring health reviews that close the loop on repeat issues.",
      ar: "منهجية مكتب خدمة منظم بتذاكر عبر ManageEngine، ومراقبة للبيئة عبر PRTG، وإدارة مجدولة لأكتيف ديريكتوري ومايكروسوفت 365، مع مراجعات صحة دورية تغلق حلقة المشكلات المتكررة.",
    },
    implementation: [
      { en: "Ticketing workflow design and rollout", ar: "تصميم سير عمل التذاكر وتطبيقه" },
      { en: "Monitoring deployment across servers and network", ar: "نشر المراقبة على الخوادم والشبكة" },
      { en: "User and device administration routines", ar: "روتينات إدارة المستخدمين والأجهزة" },
      { en: "Recurring environment health checks", ar: "فحوصات صحة دورية للبيئة" },
    ],
    technologies: ["ManageEngine", "PRTG", "Active Directory", "Microsoft 365", "Windows Server"],
    role: {
      en: "Ongoing operation: support delivery, monitoring and environment administration.",
      ar: "تشغيل مستمر: تقديم الدعم والمراقبة وإدارة البيئة.",
    },
    results: [
      { en: "Every issue visible, assigned and tracked to closure", ar: "كل مشكلة مرئية ومسندة ومتابَعة حتى الإغلاق" },
      { en: "Repeat incidents identified and eliminated at the root", ar: "الحوادث المتكررة تُحدد وتُعالج من جذرها" },
      { en: "Users with a dependable, predictable way to get help", ar: "مستخدمون لديهم طريقة موثوقة ومتوقعة للحصول على المساعدة" },
    ],
  },

  /* ================= EGYPT: documented from CV ================= */
  {
    id: "zahran-market",
    title: { en: "Zahran Market: Multi-Branch Retail IT Operations", ar: "أسواق زهران: تشغيل تقنية المعلومات عبر فروع متعددة" },
    sector: { en: "Retail", ar: "التجزئة" },
    market: "eg",
    featured: true,
    catIds: ["it-infrastructure", "networks", "microsoft-cloud", "security-systems"],
    period: { en: "2019–2024 · Alexandria, Egypt", ar: "2019–2024 · الإسكندرية، مصر" },
    summary: {
      en: "Five years of continuous enterprise IT operations across Zahran Market's retail branches in Alexandria: support, networks, monitoring and security systems for a multi-site business.",
      ar: "خمس سنوات من التشغيل التقني المؤسسي المستمر عبر فروع أسواق زهران في الإسكندرية: دعم وشبكات ومراقبة وأنظمة أمن لمنشأة متعددة المواقع.",
    },
    overview: {
      en: "Zahran Market runs retail operations across multiple business locations in Alexandria. The environment needed reliable, continuous IT: end-user support at every branch, infrastructure that stayed healthy under daily retail pressure, and security systems covering sites, all managed by one accountable specialist.",
      ar: "تدير أسواق زهران عمليات تجزئة عبر مواقع عمل متعددة في الإسكندرية. احتاجت البيئة إلى تقنية معلومات موثوقة ومستمرة: دعم للمستخدمين في كل فرع، وبنية تحتية تبقى سليمة تحت ضغط التجزئة اليومي، وأنظمة أمن تغطي المواقع، وكل ذلك بإدارة متخصص واحد مسؤول.",
    },
    challenge: {
      en: "Retail never waits: POS terminals, printers and branch networks must work every business day, across multiple locations at once. Without proactive monitoring, performance issues only surfaced as outages, and with branches spread across the city, every incident meant real lost selling time.",
      ar: "التجزئة لا تنتظر: أنظمة نقاط البيع والطابعات وشبكات الفروع يجب أن تعمل كل يوم عمل، عبر مواقع متعددة في آن واحد. بدون مراقبة استباقية، كانت مشكلات الأداء لا تظهر إلا كانقطاعات، ومع فروع موزعة على المدينة، كان كل عطل يعني وقت بيع ضائعًا فعلًا.",
    },
    solution: {
      en: "A single accountable IT operation across all branches: first- and second-line support for desktops, laptops, POS systems, printers and scanners; Active Directory administration for identities and access; PRTG monitoring to catch performance issues before they became outages; and installation and maintenance of CCTV, access control, biometric attendance and IP telephony.",
      ar: "تشغيل تقني واحد مسؤول عبر كل الفروع: دعم من المستويين الأول والثاني للأجهزة وأنظمة نقاط البيع والطابعات والماسحات؛ وإدارة أكتيف ديريكتوري للهويات والصلاحيات؛ ومراقبة PRTG لاكتشاف مشكلات الأداء قبل أن تتحول إلى انقطاعات؛ وتركيب وصيانة أنظمة المراقبة والتحكم في الدخول والبصمة والحضور والهواتف.",
    },
    implementation: [
      { en: "First- and second-line support for desktops, laptops, POS systems, printers, scanners and enterprise software across branches", ar: "دعم من المستويين الأول والثاني للأجهزة وأنظمة نقاط البيع والطابعات والماسحات والبرامج عبر الفروع" },
      { en: "Active Directory administration: user provisioning, password management, shared folders, security groups and NTFS permissions", ar: "إدارة أكتيف ديريكتوري: تجهيز المستخدمين وإدارة كلمات المرور والمجلدات المشتركة ومجموعات الأمان وصلاحيات NTFS" },
      { en: "User onboarding: accounts, workstations, software and POS terminals configured for secure access to business systems", ar: "تجهيز المستخدمين: حسابات وأجهزة عمل وبرامج وأنظمة نقاط بيع مُعدة للوصول الآمن لأنظمة العمل" },
      { en: "Infrastructure monitoring with PRTG Network Monitor, proactively identifying performance issues", ar: "مراقبة البنية التحتية عبر PRTG، مع اكتشاف استباقي لمشكلات الأداء" },
      { en: "Network support: TCP/IP, DNS, DHCP, HP switches, structured cabling and wireless networking", ar: "دعم الشبكات: TCP/IP وDNS وDHCP ومفاتيح HP والتوصيلات المنظمة والشبكات اللاسلكية" },
      { en: "Installation and maintenance of CCTV, access control, biometric attendance devices, IP telephony and enterprise hardware", ar: "تركيب وصيانة المراقبة والتحكم في الدخول وأجهزة البصمة والحضور والهواتف والأجهزة المؤسسية" },
      { en: "Workstation deployment, OS installation, hardware upgrades and endpoint lifecycle support", ar: "نشر أجهزة العمل وتثبيت أنظمة التشغيل وترقية العتاد ودعم دورة حياة الأجهزة الطرفية" },
      { en: "IT asset inventory, technical documentation and maintenance records", ar: "جرد الأصول التقنية والتوثيق الفني وسجلات الصيانة" },
    ],
    technologies: ["Active Directory", "PRTG", "HP Switches", "TCP/IP · DNS · DHCP", "Structured Cabling", "CCTV", "Access Control", "Biometric Attendance", "IP Telephony", "POS Systems", "Enterprise Printing"],
    role: {
      en: "IT Support & Network Specialist, the accountable owner of the retail group's day-to-day IT across multiple business locations: support delivery, infrastructure monitoring, network and printing operations, and the installation and upkeep of security and telephony systems.",
      ar: "أخصائي دعم تقني وشبكات، المسؤول عن التشغيل اليومي لتقنية المعلومات في المجموعة عبر مواقع العمل المتعددة: تقديم الدعم ومراقبة البنية التحتية وتشغيل الشبكات والطباعة وتركيب وصيانة أنظمة الأمن والهواتف.",
    },
    results: [
      { en: "Continuous first- and second-line support across multiple business locations", ar: "دعم مستمر من المستويين الأول والثاني عبر مواقع العمل المتعددة" },
      { en: "Performance issues identified proactively through PRTG, improving system availability", ar: "اكتشاف استباقي لمشكلات الأداء عبر PRTG بما حسّن توافر الأنظمة" },
      { en: "Security and attendance infrastructure installed and maintained across sites", ar: "بنية أمن وحضور مركبة ومُصانة عبر المواقع" },
      { en: "Accurate asset inventory, documentation and maintenance records for lifecycle management", ar: "جرد أصول دقيق وتوثيق وسجلات صيانة لإدارة دورة الحياة" },
    ],
  },
  {
    id: "united-abco",
    title: { en: "United Abco Company: On-Site Corporate IT Support", ar: "أبكو المتحدة: دعم تقني ميداني في بيئة شركات" },
    sector: { en: "Corporate IT Services", ar: "خدمات تقنية للشركات" },
    market: "eg",
    featured: true,
    catIds: ["it-infrastructure", "networks", "microsoft-cloud"],
    period: { en: "2015–2018 · Alexandria, Egypt", ar: "2015–2018 · الإسكندرية، مصر" },
    summary: {
      en: "On-site end-user IT support at United Abco Company, delivered through Arab Computers Company (ACC): IMAC operations, domain support and day-to-day IT continuity in a corporate environment.",
      ar: "دعم تقني ميداني للمستخدمين في شركة أبكو المتحدة عبر الشركة العربية للحاسبات (ACC): عمليات IMAC ودعم الدومين واستمرارية تقنية المعلومات اليومية في بيئة شركات.",
    },
    overview: {
      en: "United Abco Company needed dependable, on-site IT for its end users: workstations that worked, connectivity that held, and a specialist on the ground handling requests as they happened. The engagement ran through Arab Computers Company (ACC), with the specialist embedded at the client site.",
      ar: "احتاجت شركة أبكو المتحدة إلى دعم تقني ميداني موثوق لمستخدميها: أجهزة تعمل واتصال مستقر ومتخصص في الموقع يتعامل مع الطلبات فور حدوثها. جرى العمل عبر الشركة العربية للحاسبات (ACC) مع تواجد المتخصص داخل مقر العميل.",
    },
    challenge: {
      en: "In a corporate environment, small IT failures quickly become blocked work. The requirement was uninterrupted IT operations: hardware, operating systems, connectivity and user requests all handled on-site, to SLA targets, without the business feeling the friction.",
      ar: "في بيئة الشركات، تتحول الأعطال التقنية الصغيرة سريعًا إلى عمل متعطل. كان المطلوب عمليات تقنية بلا انقطاع: أجهزة وأنظمة تشغيل واتصال وطلبات مستخدمين تُعالج ميدانيًا ووفق أهداف الخدمة، دون أن يشعر العمل بأي احتكاك.",
    },
    solution: {
      en: "A dedicated on-site specialist running the full user environment: installation, configuration and maintenance of desktops, laptops and Windows operating systems; LAN/Wi-Fi connectivity, printers and peripheral devices; IMAC activities (Install, Move, Add, Change); and Active Directory account administration with workstation domain support.",
      ar: "متخصص ميداني مخصص يدير بيئة المستخدمين كاملة: تركيب وتكوين وصيانة الأجهزة المكتبية والمحمولة وأنظمة ويندوز؛ واتصال LAN/Wi-Fi والطابعات والأجهزة الطرفية؛ وعمليات IMAC (تركيب، نقل، إضافة، تغيير)؛ وإدارة حسابات أكتيف ديريكتوري مع دعم انضمام الأجهزة للدومين.",
    },
    implementation: [
      { en: "On-site first- and second-line technical support delivered to SLA targets", ar: "دعم تقني ميداني من المستويين الأول والثاني وفق أهداف الخدمة" },
      { en: "Installation, configuration and maintenance of desktops, laptops and Windows operating systems", ar: "تركيب وتكوين وصيانة الأجهزة المكتبية والمحمولة وأنظمة ويندوز" },
      { en: "LAN/Wi-Fi connectivity, printers and peripheral device support", ar: "دعم اتصال LAN/Wi-Fi والطابعات والأجهزة الطرفية" },
      { en: "IMAC operations (Install, Move, Add, Change) across the user estate", ar: "عمليات IMAC (تركيب ونقل وإضافة وتغيير) عبر أجهزة المستخدمين" },
      { en: "Active Directory user account administration, password resets and workstation domain support", ar: "إدارة حسابات المستخدمين في أكتيف ديريكتوري وإعادة تعيين كلمات المرور ودعم دومين الأجهزة" },
      { en: "User request handling, hardware replacement and software installation", ar: "معالجة طلبات المستخدمين واستبدال العتاد وتثبيت البرامج" },
    ],
    technologies: ["Windows OS", "LAN / Wi-Fi", "Active Directory", "Enterprise Printing", "Peripheral Devices"],
    role: {
      en: "Network & Devices Specialist (أخصائي شبكات وأجهزة), on-site at United Abco Company through Arab Computers Company (ACC), coordinating with customer representatives to keep IT operations uninterrupted.",
      ar: "أخصائي شبكات وأجهزة، بمقر شركة أبكو المتحدة عبر الشركة العربية للحاسبات (ACC)، بالتنسيق مع ممثلي العميل للحفاظ على استمرارية العمليات التقنية.",
    },
    results: [
      { en: "First- and second-line support consistently meeting SLA targets", ar: "دعم من المستويين الأول والثاني يحقق أهداف الخدمة باستمرار" },
      { en: "Uninterrupted IT operations through on-site coordination with customer representatives", ar: "عمليات تقنية بلا انقطاع عبر التنسيق الميداني مع ممثلي العميل" },
      { en: "Managed user requests, hardware replacement and software installation handled end to end", ar: "طلبات المستخدمين واستبدال العتاد وتثبيت البرامج معالجة من البداية للنهاية" },
    ],
  },
];

export const MARKET_LABEL: Record<CaseStudy["market"], B> = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  eg: { en: "Egypt", ar: "مصر" },
  both: { en: "Saudi Arabia & Egypt", ar: "السعودية ومصر" },
};
