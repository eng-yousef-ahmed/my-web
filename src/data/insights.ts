import type { B } from "../i18n";

export type Article = {
  slug: string;
  cat: B;
  title: B;
  minutes: number;
  excerpt: B;
  body: B[];
  takeaways: B[];
};

export const ARTICLES: Article[] = [
  {
    slug: "active-directory-backbone",
    cat: { en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" },
    title: {
      en: "Active Directory Done Right: The Backbone of Business User Management",
      ar: "أكتيف ديريكتوري بالطريقة الصحيحة: العمود الفقري لإدارة المستخدمين",
    },
    minutes: 4,
    excerpt: {
      en: "Most 'IT chaos' in growing businesses is actually identity chaos. Here is what a disciplined Active Directory environment looks like — and why it changes everything.",
      ar: "معظم «الفوضى التقنية» في الشركات النامية هي في الحقيقة فوضى هويات. إليك شكل بيئة أكتيف ديريكتوري المنضبطة — ولماذا تغيّر كل شيء.",
    },
    body: [
      {
        en: "When an employee leaves and their accounts keep working, when files live on whoever's desktop, when every new hire means a day of manual setup — that is not bad luck. It is the absence of a real directory.",
        ar: "حين يغادر موظف وتبقى حساباته تعمل، وحين تعيش الملفات على أسطح أجهزة متفرقة، وحين يعني كل موظف جديد يومًا من الإعداد اليدوي — فليس هذا سوء حظ، بل غياب دليل حقيقي.",
      },
      {
        en: "Active Directory gives the business one source of truth: who exists, what they can access, and which policies apply to their machine. Done properly, onboarding becomes a routine, offboarding becomes a checklist, and security stops depending on memory.",
        ar: "يمنح أكتيف ديريكتوري العمل مصدر حقيقة واحدًا: من هو موجود، وما الذي يحق له الوصول إليه، وأي السياسات تنطبق على جهازه. وعند تنفيذه بشكل صحيح، يصبح ضم موظف جديد روتينًا، وإنهاء الخدمة قائمة تحقق، ويتوقف الأمن عن الاعتماد على الذاكرة.",
      },
      {
        en: "The disciplines that matter most are unglamorous: consistent naming, organized OUs, Group Policies that actually standardize the estate, and admin accounts separated from daily-use accounts. Environments fail from neglect of these basics long before they fail from anything exotic.",
        ar: "الانضباطات الأهم غير لامعة: تسمية متسقة، ووحدات تنظيمية مرتبة، وسياسات مجموعة توحّد البيئة فعلًا، وفصل حسابات الإدارة عن حسابات الاستخدام اليومي. البيئات تنهار من إهمال هذه الأساسيات قبل أي شيء معقد.",
      },
    ],
    takeaways: [
      { en: "Identity is the control point — centralize it before adding tools", ar: "الهوية هي نقطة التحكم — مركزيها قبل إضافة الأدوات" },
      { en: "Offboarding reliability is a design result, not a policy document", ar: "موثوقية إنهاء الخدمة نتيجة تصميم لا ورقة سياسات" },
      { en: "Group Policy standardization removes whole categories of support tickets", ar: "التوحيد عبر سياسات المجموعة يلغي فئات كاملة من تذاكر الدعم" },
    ],
  },
  {
    slug: "microsoft-365-basics",
    cat: { en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" },
    title: {
      en: "Microsoft 365 for SMBs: Getting the Basics Right Before Anything Fancy",
      ar: "مايكروسوفت 365 للشركات الصغيرة والمتوسطة: ضبط الأساسيات أولًا",
    },
    minutes: 4,
    excerpt: {
      en: "Most businesses pay for Microsoft 365 and use a fraction of it — while files still scatter across desktops. The fix is administrative, not financial.",
      ar: "معظم الشركات تدفع لمايكروسوفت 365 وتستخدم جزءًا يسيرًا منه — بينما الملفات ما تزال مبعثرة. الحل إداري لا مالي.",
    },
    body: [
      {
        en: "Buying Microsoft 365 is the easy part. Without administration, it becomes another login — mail works, and everything else stays exactly as chaotic as before, just cloudier.",
        ar: "شراء مايكروسوفت 365 هو الجزء السهل. بدون إدارة، يتحول إلى مجرد حساب دخول آخر — البريد يعمل، وكل شيء آخر يبقى فوضويًا كما كان، لكن «على السحابة».",
      },
      {
        en: "The basics that change daily life: OneDrive configured so every user's work is backed up by default, SharePoint structured around departments rather than around whoever created a folder first, and sharing rules that stop sensitive files leaking through permanent public links.",
        ar: "الأساسيات التي تغير الحياة اليومية: ون درايف مهيأ بحيث يُنسخ عمل كل مستخدم احتياطيًا تلقائيًا، وشير بوينت منظم حسب الأقسام لا حسب من أنشأ مجلدًا أولًا، وقواعد مشاركة توقف تسرب الملفات الحساسة عبر روابط عامة دائمة.",
      },
      {
        en: "None of this requires a bigger budget — it requires someone who treats the tenant as an environment to administer: identities synced properly, licenses matched to roles, and a structure new employees can navigate on day one.",
        ar: "لا يحتاج شيء من هذا ميزانية أكبر — بل من يعامل المستأجر كبيئة تُدار: هويات مزامنة بشكل صحيح، وتراخيص مطابقة للأدوار، وبنية يفهمها الموظف الجديد من يومه الأول.",
      },
    ],
    takeaways: [
      { en: "Default backup via OneDrive beats any awareness campaign", ar: "النسخ التلقائي عبر ون درايف يتفوق على أي حملة توعية" },
      { en: "Structure SharePoint by department, not by person", ar: "نظّم شير بوينت حسب الأقسام لا حسب الأشخاص" },
      { en: "License waste and sharing risk are administration problems, solved by administration", ar: "هدر التراخيص ومخاطر المشاركة مشكلات إدارية تُحل بالإدارة" },
    ],
  },
  {
    slug: "wifi-planning",
    cat: { en: "Networking", ar: "الشبكات" },
    title: {
      en: "Wi-Fi That Actually Works: Planning Business Wireless by Survey, Not Guesswork",
      ar: "واي فاي يعمل فعلًا: تخطيط الشبكات اللاسلكية بمسح ميداني لا بالتخمين",
    },
    minutes: 3,
    excerpt: {
      en: "'We bought more access points' is not a Wi-Fi strategy. Coverage, placement and segmentation decide whether wireless helps your business or haunts it.",
      ar: "«اشترينا نقاط وصول أكثر» ليست استراتيجية واي فاي. التغطية والموضع والتقسيم هي ما يحدد هل تخدمك الشبكة اللاسلكية أم تطاردك.",
    },
    body: [
      {
        en: "Concrete walls, metal shelving, mirrors and elevator shafts do not care about the access point's datasheet. Wireless in a real building is a physics problem, and physics is solved by surveying the actual structure — then placing hardware where the building allows signal to travel.",
        ar: "الجدران الخرسانية والرفوف المعدنية والمرايا وآبار المصاعد لا تكترث بمواصفات نقطة الوصول. اللاسلكي في مبنى حقيقي مشكلة فيزياء، والفيزياء تُحل بمسح المبنى الفعلي ثم وضع الأجهزة حيث يسمح المبنى بمرور الإشارة.",
      },
      {
        en: "The second decision matters as much as the first: separation. Guest traffic, operational systems and management interfaces belong on different VLANs — so a guest streaming video never competes with, or touches, your point-of-sale network.",
        ar: "القرار الثاني بأهمية الأول: الفصل. حركة الضيوف والأنظمة التشغيلية وواجهات الإدارة تنتمي إلى VLANs مختلفة — فلا ينافس ضيفٌ يشاهد فيديو شبكةَ نقاط البيع لديك ولا يلمسها.",
      },
      {
        en: "Finally, bandwidth policy. A well-managed network keeps every user comfortable; an unmanaged one lets a single download eat the whole pipe and turns the front desk into a complaint department.",
        ar: "أخيرًا، سياسات النطاق الترددي. الشبكة المُدارة جيدًا تُبقي كل مستخدم مرتاحًا، وغير المُدارة تسمح لتنزيل واحد بالتهام الخط كله وتحوّل الاستقبال إلى قسم شكاوى.",
      },
    ],
    takeaways: [
      { en: "Survey the building first; buy hardware second", ar: "امسح المبنى أولًا ثم اشترِ الأجهزة" },
      { en: "VLAN separation protects operations from guest traffic", ar: "فصل الـ VLAN يحمي التشغيل من حركة الضيوف" },
      { en: "Bandwidth management is what 'fast Wi-Fi' feels like", ar: "إدارة النطاق الترددي هي ما يشعر به الناس كواي فاي سريع" },
    ],
  },
  {
    slug: "cctv-beyond-recording",
    cat: { en: "Security Systems", ar: "أنظمة الأمن" },
    title: {
      en: "CCTV Beyond Recording: Designing Surveillance That Answers Questions",
      ar: "ما وراء التسجيل: تصميم مراقبة تجيب عن الأسئلة",
    },
    minutes: 4,
    excerpt: {
      en: "A camera that recorded an incident nobody can find is a camera that failed. Surveillance is a retrieval and coverage design problem before it is a hardware purchase.",
      ar: "كاميرا سجّلت حادثة لا يستطيع أحد إيجادها هي كاميرا فشلت. المراقبة مشكلة تصميم تغطية واسترجاع قبل أن تكون شراء أجهزة.",
    },
    body: [
      {
        en: "Most CCTV disappointments share one cause: the system was designed around camera count, not around the questions it must answer. 'Who entered the stock room at 2 AM?' is a different design requirement than 'we have sixteen cameras'.",
        ar: "معظم خيبات المراقبة سببها واحد: صُمم النظام حول عدد الكاميرات لا حول الأسئلة التي يجب أن يجيب عنها. «من دخل المخزن الثانية فجرًا؟» متطلب تصميم مختلف تمامًا عن «لدينا ست عشرة كاميرا».",
      },
      {
        en: "Good design starts with coverage goals — entrances, cash points, stock movement, perimeter — and works backward to placement, height, lighting and lens choice. Then storage: retention sized to the business's real review window, organized so retrieval is minutes, not hours.",
        ar: "التصميم الجيد يبدأ بأهداف التغطية — المداخل ونقاط النقد وحركة المخزون والأسوار — ويعود منها إلى الموضع والارتفاع والإضاءة واختيار العدسة. ثم التخزين: احتفاظ بحجم نافذة المراجعة الفعلية للعمل، ومنظم بحيث يكون الاسترجاع دقائق لا ساعات.",
      },
      {
        en: "And a system nobody can monitor is a system that only works yesterday. Live view at the right desk, remote access for the right people, and a review workflow make surveillance operational instead of archaeological.",
        ar: "والنظام الذي لا يستطيع أحد متابعته يعمل فقط «بالأمس». المشاهدة الحية على المكتب الصحيح، والوصول عن بُعد للأشخاص الصحيحين، وسير مراجعة واضح — تجعل المراقبة تشغيلية لا أثرية.",
      },
    ],
    takeaways: [
      { en: "Start from the questions the footage must answer", ar: "ابدأ من الأسئلة التي يجب أن تجيب عنها اللقطات" },
      { en: "Retention is a design parameter, not 'as much as fits'", ar: "مدة الاحتفاظ معامل تصميم لا «أقصى ما يتسع»" },
      { en: "Live view + review workflow is what makes cameras operational", ar: "المشاهدة الحية وسير المراجعة هما ما يجعل الكاميرات تشغيلية" },
    ],
  },
  {
    slug: "preventive-maintenance",
    cat: { en: "IT Maintenance", ar: "صيانة تقنية المعلومات" },
    title: {
      en: "The Hidden Cost of Unmaintained IT: Why Preventive Maintenance Wins",
      ar: "التكلفة الخفية لإهمال الصيانة: لماذا تفوز الصيانة الوقائية دائمًا",
    },
    minutes: 3,
    excerpt: {
      en: "IT failures rarely happen 'suddenly'. They announce themselves for months — to anyone who is looking. Maintenance is the discipline of looking.",
      ar: "أعطال التقنية نادرًا ما تحدث «فجأة». إنها تعلن عن نفسها لأشهر — لمن ينظر. الصيانة هي انضباط النظر.",
    },
    body: [
      {
        en: "A disk filling up, a UPS battery aging, a switch running warm, updates pending for a quarter — each is invisible to the business right up until the day it becomes the only thing visible. Unmaintained IT does not fail; it accumulates failure.",
        ar: "قرص يمتلئ، وبطارية UPS تشيخ، ومفتاح شبكة يسخن، وتحديثات مؤجلة منذ ربع سنة — كل منها غير مرئي للعمل حتى يصبح الشيء الوحيد المرئي. التقنية المهملة لا تفشل، بل تراكم الفشل.",
      },
      {
        en: "Preventive maintenance is scheduled attention: health checks, patch discipline, backup verification, and cleaning — physical and logical. The work is quiet and repetitive, which is exactly why it is cheap compared to the alternative.",
        ar: "الصيانة الوقائية اهتمام مجدول: فحوصات صحة وانضباط التحديثات والتحقق من النسخ الاحتياطي والتنظيف — المادي والمنطقي. العمل هادئ ومتكرر، ولهذا بالضبط هو رخيص مقارنة بالبديل.",
      },
      {
        en: "The businesses that suffer dramatic outages almost always had the warning signs. The difference was not budget — it was that nobody's job included looking.",
        ar: "الشركات التي تعاني انقطاعات درامية كانت لديها علامات الإنذار تقريبًا دائمًا. الفرق لم يكن الميزانية — بل أن النظر لم يكن ضمن مهام أحد.",
      },
    ],
    takeaways: [
      { en: "Outages accumulate quietly before they announce themselves", ar: "الانقطاعات تتراكم بصمت قبل أن تعلن عن نفسها" },
      { en: "Backup verification matters more than backup existence", ar: "التحقق من النسخ الاحتياطي أهم من وجوده" },
      { en: "Scheduled attention is the cheapest insurance IT can buy", ar: "الاهتمام المجدول أرخص تأمين يمكن أن تشتريه التقنية" },
    ],
  },
  {
    slug: "site-to-site-vpn",
    cat: { en: "Networking", ar: "الشبكات" },
    title: {
      en: "Site-to-Site VPN: Making Branches Behave Like One Building",
      ar: "شبكة VPN بين المواقع: لتعمل الفروع كمبنى واحد",
    },
    minutes: 3,
    excerpt: {
      en: "When branches become islands, workarounds multiply. A properly designed site-to-site VPN turns separate locations into one private network.",
      ar: "حين تصبح الفروع جزرًا معزولة، تتكاثر الحلول الملتوية. شبكة VPN مصممة بشكل صحيح تحوّل المواقع المنفصلة إلى شبكة خاصة واحدة.",
    },
    body: [
      {
        en: "The symptoms of disconnected sites are always the same: files moved on USB drives and personal cloud accounts, shared systems exposed through risky workarounds, and every branch needing its own miniature IT universe.",
        ar: "أعراض المواقع المنفصلة واحدة دائمًا: ملفات تنتقل عبر وحدات USB وحسابات سحابية شخصية، وأنظمة مشتركة مكشوفة عبر حلول خطرة، وكل فرع يحتاج كونه التقني المصغر الخاص.",
      },
      {
        en: "A site-to-site VPN replaces all of it with one idea: every location joins the same private network over encrypted tunnels. File servers, internal applications and printers become reachable from any site as if everyone shared one building — without opening anything to the public internet.",
        ar: "شبكة VPN بين المواقع تستبدل كل ذلك بفكرة واحدة: كل موقع ينضم إلى الشبكة الخاصة نفسها عبر أنفاق مشفرة. خوادم الملفات والتطبيقات الداخلية والطابعات تصبح متاحة من أي موقع كأن الجميع في مبنى واحد — دون فتح أي شيء على الإنترنت العام.",
      },
      {
        en: "The design decisions that matter: a clean addressing plan so sites never collide, routing that keeps local traffic local, and monitoring so a dropped tunnel is noticed in minutes — not discovered by a frustrated branch manager.",
        ar: "قرارات التصميم المهمة: خطة عنونة نظيفة فلا تتصادم المواقع، وتوجيه يُبقي الحركة المحلية محلية، ومراقبة بحيث يُلاحظ سقوط النفق خلال دقائق — لا يكتشفه مدير فرع محبط.",
      },
    ],
    takeaways: [
      { en: "One private network beats a dozen workarounds", ar: "شبكة خاصة واحدة تتفوق على عشرات الحلول الملتوية" },
      { en: "Addressing plans decided early prevent painful renumbering", ar: "خطط العنونة المبكرة تمنع إعادة الترقيم المؤلمة" },
      { en: "Monitor the tunnels — silence is not the same as working", ar: "راقب الأنفاق — فالصمت لا يعني أنها تعمل" },
    ],
  },
];
