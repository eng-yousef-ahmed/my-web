import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ar";
export type B = { en: string; ar: string };

const STR: Record<string, B> = {
  // navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.industries": { en: "Industries", ar: "القطاعات" },
  "nav.insights": { en: "Insights", ar: "المعرفة" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "nav.markets": { en: "Markets", ar: "أسواقنا" },
  "nav.saudi": { en: "Saudi Arabia", ar: "السعودية" },
  "nav.egypt": { en: "Egypt", ar: "مصر" },
  "nav.request": { en: "Request IT Service", ar: "اطلب خدمة تقنية" },

  // CTAs
  "cta.exploreProjects": { en: "Explore Projects", ar: "استكشف المشاريع" },
  "cta.talkSpecialist": { en: "Talk to an IT Specialist", ar: "تحدّث مع مختص تقنية" },
  "cta.urgent": { en: "Need Urgent IT Support?", ar: "تحتاج دعمًا تقنيًا عاجلًا؟" },
  "cta.assessment": { en: "Request an Initial IT Assessment", ar: "اطلب تقييمًا تقنيًا أوليًا" },
  "cta.viewAll": { en: "View all", ar: "عرض الكل" },
  "cta.learnMore": { en: "Learn more", ar: "اعرف المزيد" },
  "cta.readCase": { en: "Read case study", ar: "اقرأ دراسة الحالة" },
  "cta.requestQuote": { en: "Request a Quote", ar: "اطلب عرض سعر" },
  "cta.getStarted": { en: "Start with a request", ar: "ابدأ بطلب خدمة" },
  "cta.backToProjects": { en: "Back to projects", ar: "العودة إلى المشاريع" },
  "cta.backToInsights": { en: "Back to insights", ar: "العودة إلى المقالات" },
  "cta.similarEnv": { en: "Have a similar environment?", ar: "لديك بيئة مشابهة؟" },

  // hero / common
  "common.primaryMarkets": { en: "Primary markets", ar: "الأسواق الرئيسية" },
  "common.langLabel": { en: "عربي", ar: "English" },
  "common.skip": { en: "Skip to content", ar: "تخطَّ إلى المحتوى" },
  "common.menu": { en: "Menu", ar: "القائمة" },
  "common.close": { en: "Close", ar: "إغلاق" },
  "common.minRead": { en: "min read", ar: "دقائق قراءة" },
  "common.category": { en: "Category", ar: "التصنيف" },
  "common.location": { en: "Location", ar: "الموقع" },
  "common.industry": { en: "Industry", ar: "القطاع" },
  "common.scope": { en: "Scope", ar: "نطاق العمل" },
  "common.all": { en: "All", ar: "الكل" },
  "common.notConfigured": {
    en: "Channel available once configured via environment variables.",
    ar: "تُفعَّل هذه القناة بعد ضبط متغيرات البيئة.",
  },

  // case study sections
  "case.overview": { en: "Overview", ar: "نظرة عامة" },
  "case.challenge": { en: "The Challenge", ar: "التحدي" },
  "case.solution": { en: "The Solution", ar: "الحل" },
  "case.implementation": { en: "Implementation", ar: "التنفيذ" },
  "case.technologies": { en: "Technologies", ar: "التقنيات" },
  "case.role": { en: "Our Role", ar: "دورنا" },
  "case.results": { en: "Results", ar: "النتائج" },
  "case.verifiedNote": {
    en: "Client name and commercial details are kept confidential. Figures shown are limited to verified information only.",
    ar: "نحافظ على سرية اسم العميل والتفاصيل التجارية، ولا ننشر إلا المعلومات الموثقة فقط.",
  },

  // form
  "form.title": { en: "Request IT Service", ar: "طلب خدمة تقنية" },
  "form.subtitle": {
    en: "Tell us what your business needs. We respond through WhatsApp or email, whichever you prefer.",
    ar: "أخبرنا باحتياج عملك، وسنرد عليك عبر واتساب أو البريد الإلكتروني، أيهما تفضّل.",
  },
  "form.fullName": { en: "Full Name", ar: "الاسم الكامل" },
  "form.company": { en: "Company Name", ar: "اسم الشركة" },
  "form.country": { en: "Country", ar: "الدولة" },
  "form.phone": { en: "Phone / WhatsApp", ar: "الهاتف / واتساب" },
  "form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "form.service": { en: "Service Required", ar: "الخدمة المطلوبة" },
  "form.urgency": { en: "Urgency", ar: "درجة الإلحاح" },
  "form.normal": { en: "Normal", ar: "عادي" },
  "form.urgent": { en: "Urgent", ar: "عاجل" },
  "form.critical": { en: "Critical", ar: "حرج" },
  "form.description": { en: "Description of Requirement", ar: "وصف المطلوب" },
  "form.attachment": { en: "Attachment (optional)", ar: "مرفق (اختياري)" },
  "form.submit": { en: "Submit Request", ar: "إرسال الطلب" },
  "form.submitting": { en: "Submitting…", ar: "جارٍ الإرسال…" },
  "form.required": { en: "This field is required.", ar: "هذا الحقل مطلوب." },
  "form.badEmail": { en: "Enter a valid email address.", ar: "أدخل بريدًا إلكترونيًا صحيحًا." },
  "form.badPhone": { en: "Enter a valid phone number.", ar: "أدخل رقم هاتف صحيحًا." },
  "form.shortDesc": { en: "Please add a short description (10+ characters).", ar: "أضف وصفًا قصيرًا (١٠ أحرف على الأقل)." },
  "form.successTitle": { en: "Request received", ar: "تم استلام الطلب" },
  "form.successBody": {
    en: "Thank you. Your request has been delivered to our team. Expect a response through your preferred channel.",
    ar: "شكرًا لك. وصل طلبك إلى فريقنا، وسنرد عليك عبر قناتك المفضلة.",
  },
  "form.draftTitle": { en: "Your request is ready to send", ar: "طلبك جاهز للإرسال" },
  "form.draftBody": {
    en: "Direct backend delivery is not connected yet, so choose a channel below. Your request details are already filled in.",
    ar: "الإرسال المباشر غير مفعّل بعد، لذا اختر قناتك أدناه. تفاصيل طلبك معبأة مسبقًا.",
  },
  "form.failTitle": { en: "Something went wrong", ar: "حدث خطأ ما" },
  "form.failBody": {
    en: "We could not deliver your request. Please try again, or reach us directly on WhatsApp or email.",
    ar: "تعذّر إرسال طلبك. حاول مجددًا، أو تواصل معنا مباشرة عبر واتساب أو البريد.",
  },
  "form.sendWhatsapp": { en: "Send via WhatsApp", ar: "إرسال عبر واتساب" },
  "form.sendEmail": { en: "Send via Email", ar: "إرسال عبر البريد" },
  "form.again": { en: "Submit another request", ar: "إرسال طلب آخر" },
  "form.selectService": { en: "Select a service…", ar: "اختر الخدمة…" },
  "form.selectCountry": { en: "Select a country…", ar: "اختر الدولة…" },
  "form.other": { en: "Other", ar: "أخرى" },
  "form.attachmentHint": { en: "PDF, image or document, referenced with your request.", ar: "PDF أو صورة أو مستند، يُرفق مرجعه مع طلبك." },

  // footer
  "footer.blurb": {
    en: "Professional IT services & technology solutions for businesses in Saudi Arabia and Egypt. We solve business technology problems.",
    ar: "خدمات تقنية معلومات وحلول تكنولوجية احترافية للشركات في السعودية ومصر. نحن نحل مشكلات التقنية في الأعمال.",
  },
  "footer.quickLinks": { en: "Navigate", ar: "روابط سريعة" },
  "footer.serviceLines": { en: "Service Lines", ar: "مسارات الخدمات" },
  "footer.markets": { en: "Markets", ar: "الأسواق" },
  "footer.contact": { en: "Contact", ar: "التواصل" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.top": { en: "Back to top", ar: "العودة للأعلى" },
  "footer.waNote": {
    en: "One-tap WhatsApp chat activates once the business number is configured.",
    ar: "تُفعَّل محادثة واتساب الفورية بعد ضبط رقم الأعمال.",
  },

  // misc sections
  "misc.faq": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "misc.shareIdea": { en: "Let's Solve Your IT Challenge.", ar: "لنحلّ مشكلتك التقنية معًا." },
  "misc.shareIdeaBody": {
    en: "Describe your environment, your problem, or your plan. We will respond with a practical, business-focused path forward.",
    ar: "صِف بيئتك التقنية أو مشكلتك أو خطتك، وسنرد عليك بمسار عملي يخدم أعمالك.",
  },
};

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
  L: (b: B) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("ya-lang");
    return saved === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("ya-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "en" ? "ar" : "en")), []);
  const t = useCallback((key: string) => STR[key]?.[lang] ?? key, [lang]);
  const L = useCallback((b: B) => (lang === "ar" ? b.ar : b.en), [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", isAr: lang === "ar", setLang, toggle, t, L }),
    [lang, setLang, toggle, t, L]
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Sets document title + meta description per page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
