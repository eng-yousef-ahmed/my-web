import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang, usePrefersReducedMotion, type B } from "../i18n";
import { CONTACT, waLink, mailLink } from "../config";

/**
 * YA Assistant — an instant, bilingual client-facing assistant.
 * It answers from the company's real service data (no invented claims),
 * triages requirements toward the right service line, and hands the full
 * conversation to a human specialist on WhatsApp with one tap.
 */

type Msg = {
  from: "bot" | "user";
  text: string;
  chips?: string[];
  actions?: { label: string; to?: string; href?: string }[];
};

/* ---------- Arabic normalization for robust matching ---------- */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

type Reply = {
  text: B;
  chips?: B[];
  actions?: { label: B; to?: string; href?: string }[];
};

const EGYPT_RE = /(مصر|القاهره|الاسكندريه|المنصوره|طنطا|الجيزه|egypt|cairo|alexandria|giza)/;
const KSA_RE = /(السعوديه|الرياض|جده|الدمام|مكه|المدينه|saudi|riyadh|jeddah|dammam)/;

/* ================= knowledge base ================= */
const INTENTS: { id: string; test: RegExp; reply: Reply }[] = [
  {
    id: "urgent",
    test: /(عاجل|طارئ|طوارئ|متوقف|توقف|وقف|عطل|خراب|down|urgent|emergency|outage|انقطع|مافي انترنت نهائيا|السيرفر واقع|الانظمه واقعه)/,
    reply: {
      text: {
        ar: "فهمت — ده وضع يحتاج تدخل سريع. أسرع طريق هو واتساب مباشرة، والبيئات المدعومة لها أولوية فورية. اختار رقم السوق الأقرب لك:",
        en: "Understood — that needs fast action. The quickest path is WhatsApp directly; supported environments get immediate priority. Pick the nearest market number:",
      },
      actions: [
        { label: { ar: "واتساب السعودية", en: "WhatsApp KSA" }, href: waLink("URGENT — Need urgent IT support.", "sa") },
        { label: { ar: "واتساب مصر", en: "WhatsApp Egypt" }, href: waLink("URGENT — Need urgent IT support.", "eg") },
      ],
      chips: [
        { ar: "الإنترنت متوقف", en: "Internet is down" },
        { ar: "السيرفر لا يستجيب", en: "Server not responding" },
        { ar: "تقييم شامل للبيئة", en: "Full environment assessment" },
      ],
    },
  },
  {
    id: "wifi",
    test: /(واي فاي|وايفاي|شبكه|انترنت|راوتر|ميكروتيك|بطي|تقطيع|تغطيه|vpn|وايرلس|wifi|network|internet|router|lan|wan)/,
    reply: {
      text: {
        ar: "ده تخصصنا في مسار الشبكات: تخطيط واي فاي بمسح فعلي للمبنى، فصل شبكات الضيوف عن التشغيل، وVPN يربط الفروع كأنها مبنى واحد. عندنا دراسات حالة مماثلة — فندق كامل وارتباط فروع بميكروتيك.",
        en: "That's our Networks line: Wi-Fi planned from an actual site survey, guest traffic separated from operations, and VPN making branches behave like one building. We have matching case studies — a full hotel deployment and a MikroTik branch mesh.",
      },
      actions: [
        { label: { ar: "اطلب خدمة شبكات", en: "Request network service" }, to: "/request?service=networks" },
        { label: { ar: "دراسات الحالة", en: "See case studies" }, to: "/projects" },
      ],
      chips: [
        { ar: "الواي فاي ضعيف في أجزاء من المبنى", en: "Wi-Fi is weak in parts of the building" },
        { ar: "أريد ربط فرعين", en: "I want to connect two branches" },
        { ar: "الأسعار", en: "Pricing" },
      ],
    },
  },
  {
    id: "cctv",
    test: /(كاميرات|كاميرا|مراقبه|cctv|nvr|dvr|تسجيل|هاي فيجن|داروا|hikvision|dahua)/,
    reply: {
      text: {
        ar: "مسار أنظمة الأمن عندنا بيصمم المراقبة عشان تجاوب أسئلة حقيقية — تغطية المداخل والمخزون والكاش، تسجيل بحجم احتفاظ محسوب، ومشاهدة عن بُعد. عندنا حالة مركز قيادة مراقبة جمع كاميرات متفرقة في شاشة واحدة.",
        en: "Our Security Systems line designs surveillance to answer real questions — entrances, stock and cash coverage, retention-sized recording, and remote viewing. One of our case studies unified scattered cameras into a single command center.",
      },
      actions: [
        { label: { ar: "اطلب أنظمة مراقبة", en: "Request security systems" }, to: "/request?service=security-systems" },
        { label: { ar: "دراسة حالة مركز القيادة", en: "Command center case study" }, to: "/projects/cctv-command-center" },
      ],
      chips: [
        { ar: "أريد كاميرات لمحل", en: "I need cameras for a shop" },
        { ar: "أريد متابعة من الموبايل", en: "I want mobile viewing" },
        { ar: "بصمة حضور", en: "Biometric attendance" },
      ],
    },
  },
  {
    id: "microsoft",
    test: /(مايكروسوفت|ايميل|اوتلوك|سيرفر|ويندوز|اكتيف|m365|office 365|exchange|شير بوينت|ون درايف|شركه مايكروسوفت|microsoft|server|windows|active directory|sharepoint|onedrive)/,
    reply: {
      text: {
        ar: "مسار مايكروسوفت والسحابة: إدارة أكتيف ديريكتوري وسياسات المجموعة، خوادم ويندوز، ومستأجرات Microsoft 365 وون درايف وشير بوينت منظمة بحيث تفضل الملفات والصلاحيات تحت السيطرة.",
        en: "Microsoft & Cloud line: Active Directory with real Group Policy discipline, Windows Server administration, and Microsoft 365 tenants with OneDrive and SharePoint structured so files and permissions stay under control.",
      },
      actions: [
        { label: { ar: "اطلب خدمات مايكروسوفت", en: "Request Microsoft services" }, to: "/request?service=microsoft-cloud" },
        { label: { ar: "مقال: أساسيات M365", en: "Read: M365 basics" }, to: "/insights/microsoft-365-basics" },
      ],
      chips: [
        { ar: "الإيميلات تتأخر أو تضيع", en: "Emails are delayed or lost" },
        { ar: "أريد تنظيم ملفات الشركة", en: "I want to organize company files" },
        { ar: "إدارة مستخدمين وصلاحيات", en: "User & permission management" },
      ],
    },
  },
  {
    id: "biometric",
    test: /(بصمه|حضور|انصراف|دخول|ابواب|zkteco|اكسس|biometric|attendance|access control|door)/,
    reply: {
      text: {
        ar: "مسار التحكم بالدخول: أجهزة بصمة ZKTeco للمداخل والأبواب الحساسة، نظام حضور وانصراف مركزي بتقارير قابلة للتصدير، وقواعد دخول لكل منطقة ووردية.",
        en: "Access Control line: ZKTeco biometric terminals at entry points and sensitive doors, centralized attendance with exportable reports, and access rules per area, shift and role.",
      },
      actions: [
        { label: { ar: "اطلب تحكم بالدخول", en: "Request access control" }, to: "/request?service=security-systems" },
        { label: { ar: "دراسة حالة البصمة", en: "Biometric case study" }, to: "/projects/biometric-access-control" },
      ],
      chips: [
        { ar: "حضور وانصراف للموظفين", en: "Staff attendance system" },
        { ar: "تأمين أبواب معينة", en: "Secure specific doors" },
        { ar: "الأسعار", en: "Pricing" },
      ],
    },
  },
  {
    id: "support",
    test: /(دعم|صيانة|تذكره|helpdesk|مساعده|اعطال|اجهزه|كمبيوتر|لاب توب|it support|maintenance|ticket|support desk|مشكله في الجهاز)/,
    reply: {
      text: {
        ar: "مسار تقنية المعلومات والبنية التحتية: دعم عن بُعد وفي الموقع، صيانة وقائية، ومكتب خدمة بتذاكر متتبعة — البيئة تُدار كمنهجية مش كإطفاء حرائق.",
        en: "IT & Infrastructure line: remote and on-site support, preventive maintenance, and a ticketed service desk — environments run as a practice, not firefighting.",
      },
      actions: [
        { label: { ar: "اطلب دعم تقني", en: "Request IT support" }, to: "/request?service=it-infrastructure" },
        { label: { ar: "دراسة حالة مكتب الخدمة", en: "Service desk case study" }, to: "/projects/enterprise-support-servicedesk" },
      ],
      chips: [
        { ar: "عندي مشكلة في جهاز", en: "I have a device issue" },
        { ar: "أريد عقد صيانة", en: "I want a maintenance contract" },
        { ar: "أين تعملون؟", en: "Where do you operate?" },
      ],
    },
  },
  {
    id: "hajj",
    test: /(حج|مخيم|موسم|عمرة|hajj|camp|seasonal|umrah)/,
    reply: {
      text: {
        ar: "عندنا خبرة موثقة في العمليات الموسمية: بنينا بيئة مخيم حج ذكي كاملة — شبكة وواي فاي ومراقبة — اشتغلت بكامل طاقتها في ذروة الموسم. لو عندك عملية موسمية أو فعاليات، احكيلي أكتر.",
        en: "We have documented seasonal-operations experience: a full smart Hajj camp environment — network, Wi-Fi and surveillance — that ran at peak-season scale. Tell me more about your seasonal operation.",
      },
      actions: [
        { label: { ar: "دراسة حالة مخيم الحج", en: "Hajj camp case study" }, to: "/projects/smart-hajj-camp" },
        { label: { ar: "اطلب خدمة", en: "Request a service" }, to: "/request" },
      ],
      chips: [
        { ar: "موقع مؤقت يحتاج شبكة", en: "Temporary site needs a network" },
        { ar: "تحدّث مع مختص", en: "Talk to a specialist" },
      ],
    },
  },
  {
    id: "pricing",
    test: /(سعر|اسعار|تكلفه|كم يكلف|كم ب|بيدفع|price|pricing|cost|quote|quotation|how much|budget)/,
    reply: {
      text: {
        ar: "لا بنشر أسعار جاهزة ولا بنخترع أرقامًا — كل عرض سعر بيتبني على بيئتك الفعلية بعد تحديد النطاق. الخطوات: تبعت طلب، نوضح معاك النطاق، ويوصلك عرض واضح بلا مفاجآت. ولو حابب تبدأ أسرع، اطلب تقييمًا أوليًا.",
        en: "We don't publish list prices or invent numbers — every quotation is built on your actual environment after scoping. The flow: you submit a request, we clarify scope with you, and you receive a clear quote with no surprises. Fastest start: request an initial assessment.",
      },
      actions: [
        { label: { ar: "اطلب عرض سعر", en: "Request a quote" }, to: "/request" },
        { label: { ar: "اطلب تقييمًا أوليًا", en: "Request an assessment" }, to: "/request?service=consultancy" },
      ],
      chips: [
        { ar: "دعم مستمر للشركة", en: "Ongoing company support" },
        { ar: "مشروع شبكة كامل", en: "A full network project" },
        { ar: "تحدّث مع مختص", en: "Talk to a specialist" },
      ],
    },
  },
  {
    id: "coverage",
    test: /(اين تعمل|فين مقر|تغطيه|مواقعكم|بتخدمو|do you cover|where do you|location|الرياض|جده|الدمام|القاهره|الاسكندريه|سعوديه|مصر)/,
    reply: {
      text: {
        ar: "بنخدم السعودية ومصر: دعم عن بُعد في أي مكان، وتنفيذ ميداني بيتحدد حسب الموقع وطبيعة العمل. نشتغل بالعربي والإنجليزي.",
        en: "We serve Saudi Arabia and Egypt: remote support anywhere, on-site delivery arranged per location and engagement. We work in Arabic and English.",
      },
      actions: [
        { label: { ar: "صفحة السعودية", en: "Saudi Arabia page" }, to: "/saudi-arabia" },
        { label: { ar: "صفحة مصر", en: "Egypt page" }, to: "/egypt" },
      ],
      chips: [
        { ar: "أنا في السعودية", en: "I'm in Saudi Arabia" },
        { ar: "أنا في مصر", en: "I'm in Egypt" },
        { ar: "أين تعملون؟", en: "Response times?" },
      ],
    },
  },
  {
    id: "assessment",
    test: /(تقييم|assessment|audit|فحص للبيئه|مراجعه البيئه)/,
    reply: {
      text: {
        ar: "التقييم الأولي نقطة البداية الصح: نظرة منظمة على البنية والشبكات وبيئات مايكروسوفت والأمن — بنتائج تفهمها بدون مترجم، وبعدها تقرر إنت براحتك.",
        en: "The initial assessment is the right starting point: a structured look at infrastructure, networks, Microsoft environments and security — findings you can read without a translator, then you decide freely.",
      },
      actions: [{ label: { ar: "اطلب التقييم الآن", en: "Request the assessment" }, to: "/request?service=consultancy" }],
      chips: [
        { ar: "الأسعار", en: "Pricing" },
        { ar: "كيف تتم المشاريع؟", en: "How do projects run?" },
      ],
    },
  },
  {
    id: "process",
    test: /(كيف تعمل|كيف تتم|خطوات|طريقه العمل|منهجيه|how do you work|process|steps)/,
    reply: {
      text: {
        ar: "منهجيتنا خمس خطوات: نفهم عملك ← نقيّم بيئتك ← نخطط بنطاق واضح ← ننفذ بتوثيق ومسارات تراجع ← وندعم بعد التشغيل. بلا استعراض.",
        en: "Our method is five steps: understand your business → assess your environment → plan with clear scope → implement with documentation and rollback paths → support after go-live. No theatre.",
      },
      actions: [{ label: { ar: "صفحة الخدمات", en: "Services page" }, to: "/services" }],
      chips: [
        { ar: "اطلب تقييمًا", en: "Request an assessment" },
        { ar: "الأسعار", en: "Pricing" },
      ],
    },
  },
  {
    id: "about",
    test: /(من انتم|من انت|مين انت|المؤسس|يوسف|شركه ايه|about you|who are you|founder)/,
    reply: {
      text: {
        ar: "TECH OF THE WORLD مزوّد خدمات تقنية معلومات وحلول تكنولوجية احترافي أسسه يوسف أحمد — متخصص بنية تحتية بخبرة ميدانية في السعودية ومصر. شعارنا: «نحن نحل مشكلات التقنية في الأعمال.»",
        en: "TECH OF THE WORLD is a professional IT services & technology solutions provider founded by Yousef Ahmed — an infrastructure specialist with hands-on delivery across Saudi Arabia and Egypt. Our mission: we solve business technology problems.",
      },
      actions: [{ label: { ar: "صفحة من نحن", en: "About page" }, to: "/about" }],
      chips: [
        { ar: "إيه الخدمات اللي بتقدموها؟", en: "What services do you offer?" },
        { ar: "أين تعملون؟", en: "Where do you operate?" },
      ],
    },
  },
  {
    id: "services",
    test: /(خدمات|بتعملو ايه|ايه اللي بتقدموه|services|what do you do|offer)/,
    reply: {
      text: {
        ar: "عندنا خمسة مسارات: ١) تقنية المعلومات والبنية التحتية والدعم ٢) الشبكات والواي فاي وVPN ٣) مايكروسوفت والسحابة ٤) أنظمة الأمن: مراقبة وبصمة وتحكم بالدخول ٥) الاستشارات التقنية. اختار اللي يشبه احتياجك:",
        en: "We run five lines: 1) IT & Infrastructure + support 2) Networks, Wi-Fi & VPN 3) Microsoft & Cloud 4) Security Systems: CCTV, biometrics & access 5) IT Consultancy. Pick what matches your need:",
      },
      chips: [
        { ar: "دعم تقني وصيانة", en: "IT support & maintenance" },
        { ar: "شبكات وواي فاي", en: "Networks & Wi-Fi" },
        { ar: "مايكروسوفت وإيميلات", en: "Microsoft & email" },
        { ar: "كاميرات وبصمة", en: "CCTV & biometrics" },
      ],
    },
  },
  {
    id: "human",
    test: /(انسان|موظف|حد حقيقي|اتصل|كلم|تحدث مع|talk to (a )?human|real person|call|speak)/,
    reply: {
      text: {
        ar: "أكيد — ده الأسلم في التفاصيل. اختار قناتك:",
        en: "Absolutely — best for the details. Pick your channel:",
      },
      actions: [
        { label: { ar: "واتساب السعودية", en: "WhatsApp KSA" }, href: waLink("Hello TECH OF THE WORLD — I'd like to talk to an IT specialist.", "sa") },
        { label: { ar: "واتساب مصر", en: "WhatsApp Egypt" }, href: waLink("Hello TECH OF THE WORLD — I'd like to talk to an IT specialist.", "eg") },
        { label: { ar: "بريد إلكتروني", en: "Email" }, href: mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? undefined },
      ],
    },
  },
  {
    id: "thanks",
    test: /(شكرا|تسلم|يعطيك العافيه|thanks|thank you|great)/,
    reply: {
      text: {
        ar: "العفو! لو احتجت أي حاجة تانية أنا هنا — والفريق متاح على واتساب في أي وقت.",
        en: "You're welcome! I'm here if you need anything else — and the team is reachable on WhatsApp anytime.",
      },
      chips: [
        { ar: "اطلب خدمة", en: "Request a service" },
        { ar: "الأسعار", en: "Pricing" },
      ],
    },
  },
  {
    id: "greeting",
    test: /^(السلام عليكم|سلام|مرحبا|اهلا|هلا|صباح|مساء|hi|hello|hey|good (morning|evening))/,
    reply: {
      text: {
        ar: "أهلًا بك! أنا مساعد TECH OF THE WORLD — أرد فورًا وأوصلك بالفريق. احكيلي: إيه التحدي التقني اللي عندك؟",
        en: "Hello! I'm the TECH OF THE WORLD assistant — instant answers, direct line to the team. What's the IT challenge you're facing?",
      },
      chips: [
        { ar: "الإنترنت أو الواي فاي", en: "Internet or Wi-Fi" },
        { ar: "كاميرات مراقبة", en: "CCTV cameras" },
        { ar: "إيميلات ومايكروسوفت", en: "Email & Microsoft" },
        { ar: "الأسعار", en: "Pricing" },
      ],
    },
  },
];

const FALLBACK: Reply = {
  text: {
    ar: "مش متأكد إني فهمت بالظبط — بس مش مشكلة. اختار أقرب موضوع، أو اكتبلي الموقف في جملة (مثال: «الواي فاي ضعيف في المخزن») وهوجهك للمسار الصح. ولو حابب حد من الفريق مباشرة، زر واتساب جنبك.",
    en: "I'm not sure I caught that exactly — no problem. Pick the closest topic, or describe the situation in one line (e.g. “Wi-Fi is weak in the warehouse”) and I'll route you to the right line. Or hit the WhatsApp button for a human straight away.",
  },
  chips: [
    { ar: "شبكات وواي فاي", en: "Networks & Wi-Fi" },
    { ar: "كاميرات وبصمة", en: "CCTV & biometrics" },
    { ar: "مايكروسوفت وإيميلات", en: "Microsoft & email" },
    { ar: "دعم وصيانة", en: "Support & maintenance" },
    { ar: "الأسعار", en: "Pricing" },
    { ar: "أين تعملون؟", en: "Where do you operate?" },
  ],
};

function matchIntent(raw: string): Reply {
  const s = norm(raw);
  for (const it of INTENTS) {
    if (it.test.test(s) || it.test.test(raw.toLowerCase())) return it.reply;
  }
  return FALLBACK;
}

/* ================= component ================= */
function SparkIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3.5c.6 4.6 3.9 7.9 8.5 8.5-4.6.6-7.9 3.9-8.5 8.5-.6-4.6-3.9-7.9-8.5-8.5 4.6-.6 7.9-3.9 8.5-8.5Z" />
      <path d="M18.5 3.5v3M17 5h3" />
    </svg>
  );
}

export function Assistant() {
  const { t, isAr } = useLang();
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const marketRef = useRef<"sa" | "eg">("sa");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>(0);

  const greet = useMemo<Msg>(
    () => ({
      from: "bot",
      text: isAr
        ? "أهلًا! أنا مساعد TECH OF THE WORLD — أرد في ثوانٍ وأوصلك بالفريق. إيه التحدي التقني اللي عندك اليوم؟"
        : "Hello! I'm the TECH OF THE WORLD assistant — I reply in seconds and connect you to the team. What IT challenge are you facing today?",
      chips: isAr
        ? ["شبكات وواي فاي", "كاميرات مراقبة", "مايكروسوفت وإيميلات", "الأسعار"]
        : ["Networks & Wi-Fi", "CCTV cameras", "Email & Microsoft", "Pricing"],
    }),
    [isAr]
  );

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([greet]);
      setSeen(true);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open, msgs.length, greet]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [msgs, typing, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const pushBot = (reply: Reply, ar: boolean) => {
    setTyping(true);
    const delay = reduced ? 150 : 550 + Math.min(900, (ar ? reply.text.ar : reply.text.en).length * 6);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: ar ? reply.text.ar : reply.text.en,
          chips: reply.chips?.map((c) => (ar ? c.ar : c.en)),
          actions: reply.actions?.map((a) => ({ label: ar ? a.label.ar : a.label.en, to: a.to, href: a.href })),
        },
      ]);
    }, delay);
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    if (EGYPT_RE.test(norm(text))) marketRef.current = "eg";
    else if (KSA_RE.test(norm(text))) marketRef.current = "sa";
    const ar = isArabic(text) || isAr;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    pushBot(matchIntent(text), ar);
  };

  const handoff = () => {
    const userLines = msgs.filter((m) => m.from === "user").map((m) => "• " + m.text).slice(-4).join("\n");
    const summary = `Hello TECH OF THE WORLD — from the YA Assistant chat:\n${userLines || "(new chat)"}\nMarket: ${marketRef.current === "eg" ? "Egypt" : "Saudi Arabia"}`;
    const href = waLink(summary, marketRef.current);
    window.open(href, "_blank", "noreferrer");
  };

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={isAr ? "مساعد TECH OF THE WORLD" : "TECH OF THE WORLD assistant"}
        className="fixed bottom-6 start-6 z-50 w-15 h-15 md:w-16 md:h-16 grid place-items-center chamfer-sm bg-amber-500 text-ink-950 shadow-[0_16px_40px_-10px_rgba(233,163,59,0.55)] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {!seen && !open && (
          <span className="absolute -top-1 -end-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-ink-950" aria-hidden="true" />
        )}
        {open ? <SparkIcon className="w-6 h-6 rotate-90 transition-transform duration-300" /> : <SparkIcon className="w-7 h-7" />}
      </button>

      {/* panel */}
      <div
        role="dialog"
        aria-label={isAr ? "محادثة مع مساعد TECH OF THE WORLD" : "Chat with the TECH OF THE WORLD assistant"}
        className={`fixed z-50 flex flex-col bg-ink-900 border border-ink-600 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out
          inset-x-3 bottom-24 top-auto h-[72dvh]
          sm:inset-x-auto sm:start-6 sm:bottom-24 sm:w-[392px] sm:h-[560px] sm:max-h-[75dvh]
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        {/* header */}
        <div className="relative shrink-0 flex items-center gap-3 px-5 py-4 bg-ink-950 border-b border-ink-700">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-500/30 to-transparent" aria-hidden="true" />
          <span className="w-10 h-10 grid place-items-center bg-amber-500 text-ink-950 chamfer-sm">
            <SparkIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 leading-tight">
            <p className="font-display font-bold text-[14px] text-paper-50">{isAr ? "مساعد YA الذكي" : "YA Assistant"}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-mist-400">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-400 led" />
              {isAr ? "متصل الآن — ردود فورية" : "Online — instant replies"}
            </p>
          </div>
          <button
            onClick={handoff}
            className="hidden sm:inline-flex items-center gap-1.5 border border-ink-600 px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#5fd68f] hover:border-[#23a55b] transition-colors cursor-pointer"
            title={t("cta.talkSpecialist")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
            </svg>
            {isAr ? "واتساب" : "WhatsApp"}
          </button>
          <button onClick={() => setOpen(false)} aria-label={t("common.close")} className="w-9 h-9 grid place-items-center text-mist-400 hover:text-paper-50 transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* messages */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${m.from === "user" ? "text-end" : ""}`}>
                <div
                  className={`inline-block text-start px-4 py-3 text-[13.5px] leading-relaxed ${
                    m.from === "user"
                      ? "bg-amber-500 text-ink-950 font-medium"
                      : "bg-ink-800 text-mist-200 border border-ink-700"
                  }`}
                  style={{ clipPath: "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)" }}
                >
                  {m.text}
                </div>
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.actions.map((a, j) =>
                      a.href ? (
                        <a key={j} href={a.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#23a55b] text-white px-3.5 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.1em] hover:brightness-110 transition-all">
                          {a.label}
                        </a>
                      ) : (
                        <button key={j} onClick={() => a.to && go(a.to)} className="inline-flex items-center gap-2 bg-amber-500 text-ink-950 px-3.5 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors cursor-pointer">
                          {a.label}
                        </button>
                      )
                    )}
                  </div>
                )}
                {m.chips && m.chips.length > 0 && i === msgs.length - 1 && !typing && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {m.chips.map((c) => (
                      <button key={c} onClick={() => send(c)} className="border border-ink-600 text-mist-300 px-3 py-1.5 text-[11.5px] font-medium hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1.5 bg-ink-800 border border-ink-700 px-4 py-3.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-amber-500 led-fast" style={{ animationDelay: `${d * 0.18}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* composer */}
        <div className="shrink-0 border-t border-ink-700 bg-ink-950 p-3.5">
          <form
            className="flex gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? "اكتب سؤالك بالعربي أو English…" : "Type in English أو بالعربي…"}
              aria-label={isAr ? "رسالتك للمساعد" : "Your message to the assistant"}
              className="flex-1 bg-ink-850 border border-ink-600 px-4 py-3 text-[13.5px] text-paper-50 placeholder:text-mist-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={isAr ? "إرسال" : "Send"}
              className="w-12 grid place-items-center bg-amber-500 text-ink-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 rtl:-scale-x-100" aria-hidden="true">
                <path d="M20.5 3.5 3.5 10l7 2.5 2.5 7Zm0 0-10 9" />
              </svg>
            </button>
          </form>
          <p className="mt-2.5 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-mist-500">
            {isAr ? "ردود فورية آلية — للتحدث مع مختص اضغط واتساب" : "Instant automated replies — tap WhatsApp for a specialist"}
          </p>
        </div>
      </div>
    </>
  );
}
