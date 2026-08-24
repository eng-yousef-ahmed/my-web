import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ar";
export type B = { en: string; ar: string };

const STR: Record<string, B> = {
  /* navigation — personal portfolio wording */
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "عني" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.services": { en: "Services", ar: "خدماتي" },
  "nav.contact": { en: "Contact", ar: "تواصل معي" },

  /* common */
  "common.skip": { en: "Skip to content", ar: "تخطَّ إلى المحتوى" },
  "common.menu": { en: "Menu", ar: "القائمة" },
  "common.close": { en: "Close", ar: "إغلاق" },
  "common.all": { en: "All", ar: "الكل" },
  "common.langLabel": { en: "عربي", ar: "English" },
  "common.minRead": { en: "min read", ar: "دقائق قراءة" },

  /* CTAs */
  "cta.exploreProjects": { en: "Explore Projects", ar: "استعرض مشاريعي" },
  "cta.aboutMe": { en: "About Me", ar: "عني" },
  "cta.viewAll": { en: "View all projects", ar: "عرض جميع المشاريع" },
  "cta.readCase": { en: "View Project", ar: "عرض المشروع" },
  "cta.backToProjects": { en: "Back to projects", ar: "العودة إلى المشاريع" },
  "cta.contactMe": { en: "Contact Me", ar: "تواصل معي" },
  "cta.viewProject": { en: "View My Projects", ar: "استعرض مشاريعي" },

  /* footer */
  "footer.blurb": {
    en: "Hands-on experience building and running IT environments: infrastructure, networks, Microsoft and security systems.",
    ar: "خبرة عملية في بناء وتشغيل بيئات تقنية المعلومات: البنية التحتية، الشبكات، مايكروسوفت وأنظمة الأمن والمراقبة.",
  },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.top": { en: "Back to top", ar: "العودة للأعلى" },
  "footer.nav": { en: "Navigate", ar: "التنقل" },

  /* case study sections */
  "case.overview": { en: "Overview", ar: "نظرة عامة" },
  "case.challenge": { en: "The Challenge", ar: "التحدي" },
  "case.solution": { en: "The Solution", ar: "الحل" },
  "case.implementation": { en: "Implementation", ar: "التنفيذ" },
  "case.technologies": { en: "Technologies", ar: "التقنيات" },
  "case.role": { en: "My Role", ar: "دوري" },
  "case.results": { en: "Results", ar: "النتائج" },
  "case.verifiedNote": {
    en: "Client name and commercial details are kept confidential. Figures shown are limited to verified information only.",
    ar: "نحافظ على سرية اسم العميل والتفاصيل التجارية، ولا ننشر إلا المعلومات الموثقة فقط.",
  },
  "case.next": { en: "Next project", ar: "المشروع التالي" },
  "case.prev": { en: "Previous project", ar: "المشروع السابق" },
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
