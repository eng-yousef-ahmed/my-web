import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { CONTACT, captureUtm, hasEmail, mailLink, telHref, waLink } from "../config";
import { Btn, FlagEG, FlagSA, Icon, Logo, externalClick } from "./kit";
import { Cursor } from "./fx";
import { Assistant } from "./Assistant";

const NAV = [
  { to: "/", labelKey: "nav.home" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/projects", labelKey: "nav.projects" },
  { to: "/industries", labelKey: "nav.industries" },
  { to: "/insights", labelKey: "nav.insights" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
];

/* ---------------- reading progress ---------------- */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[70] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-amber-500 origin-left rtl:origin-right"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

/* ---------------- WhatsApp floating chooser (SA / EG / email) ---------------- */
function WhatsAppFab() {
  const { t, L, isAr } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* Auto-suggest the visitor's likely market from their timezone (best-effort). */
  const tzName = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      return "";
    }
  })();
  const nearEgypt = /(cairo|egypt)/i.test(tzName);

  const saOpt = {
    key: "sa" as const,
    flag: <FlagSA className="w-6 h-6" />,
    country: L({ en: "Saudi Arabia", ar: "السعودية" }),
    number: CONTACT.displaySA,
    href: waLink("Hello TECH OF THE WORLD — I need IT support in Saudi Arabia.", "sa"),
  };
  const egOpt = {
    key: "eg" as const,
    flag: <FlagEG className="w-6 h-6" />,
    country: L({ en: "Egypt", ar: "مصر" }),
    number: CONTACT.displayEG,
    href: waLink("Hello TECH OF THE WORLD — I need IT support in Egypt.", "eg"),
  };
  const options = nearEgypt ? [egOpt, saOpt] : [saOpt, egOpt];

  return (
    <div ref={ref} className="fixed bottom-6 end-6 z-50">
      {open && (
        <div className="absolute bottom-full end-0 mb-4 w-[290px] chamfer-sm bg-ink-900 border border-ink-600 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden animate-[fadeInUp_0.3s_cubic-bezier(0.22,1,0.36,1)]">
          <div className="px-5 py-4 border-b border-ink-700 bg-ink-850">
            <p className="font-display font-bold text-paper-50 text-[14px]">{t("cta.talkSpecialist")}</p>
            <p className="text-[11.5px] text-mist-400 mt-0.5">{t("cta.urgent")}</p>
          </div>
          <div className="p-2.5 space-y-1">
            {options.map((o, i) => (
              <a
                key={o.key}
                href={o.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 px-3 py-3 hover:bg-ink-700 transition-colors"
              >
                <span className="shrink-0">{o.flag}</span>
                <span className="flex-1 leading-tight">
                  <span className="flex items-center gap-2">
                    <span className="block font-display font-semibold text-[13.5px] text-paper-50 group-hover:text-amber-400 transition-colors">{o.country}</span>
                    {i === 0 && (
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-amber-400 border border-amber-500/50 px-1.5 py-0.5">
                        {isAr ? "مقترح" : "Suggested"}
                      </span>
                    )}
                  </span>
                  <span className="block font-mono text-[11.5px] text-mist-400 mt-0.5" dir="ltr">{o.number}</span>
                </span>
                <Icon name="wa" className="w-5 h-5 text-[#3fbf6f]" />
              </a>
            ))}
            {hasEmail && (
              <a
                href={mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? "#"}
                className="group flex items-center gap-3.5 px-3 py-3 hover:bg-ink-700 transition-colors"
              >
                <span className="shrink-0 w-6 h-6 grid place-items-center bg-amber-500 text-ink-950"><Icon name="mail" className="w-3.5 h-3.5" strokeWidth={2} /></span>
                <span className="flex-1 leading-tight">
                  <span className="block font-display font-semibold text-[13.5px] text-paper-50 group-hover:text-amber-400 transition-colors">Email</span>
                  <span className="block font-mono text-[11px] text-mist-400 mt-0.5 break-all">{CONTACT.email}</span>
                </span>
              </a>
            )}
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={externalClick(CONTACT.linkedin)}
              className="group flex items-center gap-3.5 px-3 py-3 hover:bg-ink-700 transition-colors"
            >
              <span className="shrink-0 w-6 h-6 grid place-items-center bg-[#0a66c2] text-white"><Icon name="linkedin" className="w-3.5 h-3.5" strokeWidth={2} /></span>
              <span className="flex-1 leading-tight">
                <span className="block font-display font-semibold text-[13.5px] text-paper-50 group-hover:text-amber-400 transition-colors">LinkedIn</span>
                <span className="block font-mono text-[11px] text-mist-400 mt-0.5">/{CONTACT.linkedinHandle}</span>
              </span>
            </a>
          </div>
          <div className="px-3 pb-3 pt-2.5 border-t border-ink-700 flex gap-2.5">
            <a
              href={telHref("sa")}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-ink-600 px-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              <Icon name="phone" className="w-3.5 h-3.5" /> {isAr ? "اتصال · سعودية" : "Call · KSA"}
            </a>
            <a
              href={telHref("eg")}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-ink-600 px-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              <Icon name="phone" className="w-3.5 h-3.5" /> {isAr ? "اتصال · مصر" : "Call · EGY"}
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("cta.talkSpecialist")}
        className="relative w-15 h-15 md:w-16 md:h-16 grid place-items-center chamfer-sm bg-[#23a55b] text-white shadow-[0_16px_40px_-10px_rgba(35,165,91,0.6)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute inset-0 chamfer-sm border border-[#3fbf6f] pulse-ring" aria-hidden="true" />
        <Icon name={open ? "close" : "wa"} className="w-7 h-7" strokeWidth={1.9} />
      </button>
    </div>
  );
}

/* ---------------- Header ---------------- */
export function Header() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink-950/95 backdrop-blur-sm border-b border-ink-700 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <Link to="/" aria-label="TECH OF THE WORLD — Home" className="shrink-0 hover:opacity-90 transition-opacity">
          <Logo tone="light" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-draw font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  isActive ? "nav-active text-amber-500" : "text-mist-200 hover:text-paper-50"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggle}
            className="nav-draw font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-mist-200 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <span className="w-px h-6 bg-ink-600" aria-hidden="true" />
          <Btn to="/request" className="!px-5 !py-2.5 !text-[12px]">{t("nav.request")}</Btn>
        </div>

        <button
          className="lg:hidden w-11 h-11 grid place-items-center border border-ink-600 text-paper-50 hover:border-amber-500 transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("common.close") : t("common.menu")}
        >
          <Icon name={open ? "close" : "menu"} className="w-5.5 h-5.5" />
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-ink-950/98 grid-bg transition-all duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full overflow-y-auto px-6 py-8 flex flex-col" aria-label="Mobile">
          <div className="space-y-1">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-ink-700 py-4 font-display text-xl font-bold transition-all duration-500 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  } rtl:translate-x-0 ${isActive ? "text-amber-500" : "text-paper-50"}`
                }
              >
                <span>{t(item.labelKey)}</span>
                <Icon name="arrow" className="w-5 h-5 text-mist-500 rtl:-scale-x-100" />
              </NavLink>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link to="/saudi-arabia" className="flex items-center gap-2.5 border border-ink-600 px-4 py-3.5 text-[14px] font-semibold text-paper-50 hover:border-amber-500 transition-colors">
              <FlagSA /> {t("nav.saudi")}
            </Link>
            <Link to="/egypt" className="flex items-center gap-2.5 border border-ink-600 px-4 py-3.5 text-[14px] font-semibold text-paper-50 hover:border-amber-500 transition-colors">
              <FlagEG /> {t("nav.egypt")}
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Btn to="/request" className="justify-center">{t("nav.request")}</Btn>
            <button
              onClick={toggle}
              className="mx-auto font-mono text-[12px] uppercase tracking-[0.25em] text-mist-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t("common.langLabel")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { t, L } = useLang();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("footer.quickLinks"),
      links: [
        { to: "/services", label: t("nav.services") },
        { to: "/projects", label: t("nav.projects") },
        { to: "/industries", label: t("nav.industries") },
        { to: "/insights", label: t("nav.insights") },
        { to: "/about", label: t("nav.about") },
        { to: "/contact", label: t("nav.contact") },
      ],
    },
    {
      title: t("footer.serviceLines"),
      links: [
        { to: "/services#it-infrastructure", label: L({ en: "IT & Infrastructure", ar: "تقنية المعلومات والبنية التحتية" }) },
        { to: "/services#networks", label: L({ en: "Networks", ar: "الشبكات" }) },
        { to: "/services#microsoft-cloud", label: L({ en: "Microsoft & Cloud", ar: "مايكروسوفت والسحابة" }) },
        { to: "/services#security-systems", label: L({ en: "Security Systems", ar: "أنظمة الأمن" }) },
        { to: "/services#consultancy", label: L({ en: "IT Consultancy", ar: "الاستشارات التقنية" }) },
      ],
    },
    {
      title: t("footer.markets"),
      links: [
        { to: "/saudi-arabia", label: t("nav.saudi") },
        { to: "/egypt", label: t("nav.egypt") },
        { to: "/request", label: t("nav.request") },
      ],
    },
  ];

  return (
    <footer className="relative bg-ink-950 text-paper-50 border-t border-ink-700 noise">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 text-[14.5px] leading-relaxed text-mist-300 max-w-sm">{t("footer.blurb")}</p>
            <div className="mt-6 flex items-center gap-3">
              <Link to="/saudi-arabia" className="flex items-center gap-2 border border-ink-600 px-3 py-2 text-[12.5px] font-medium hover:border-amber-500 hover:text-amber-400 transition-colors">
                <FlagSA className="w-4.5 h-4.5" /> Saudi Arabia
              </Link>
              <Link to="/egypt" className="flex items-center gap-2 border border-ink-600 px-3 py-2 text-[12.5px] font-medium hover:border-amber-500 hover:text-amber-400 transition-colors">
                <FlagEG className="w-4.5 h-4.5" /> Egypt
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={externalClick(CONTACT.linkedin)}
                aria-label="LinkedIn"
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#0a66c2] hover:text-[#5ea8e8] hover:bg-[#0a66c2]/10 transition-all duration-300"
              >
                <Icon name="linkedin" className="w-4.5 h-4.5" />
              </a>
              <a
                href={waLink("Hello TECH OF THE WORLD — I would like to talk to an IT specialist.", "sa")}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#23a55b] hover:text-[#5fd68f] hover:bg-[#23a55b]/10 transition-all duration-300"
              >
                <Icon name="wa" className="w-4.5 h-4.5" />
              </a>
              <a
                href={mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? "#"}
                aria-label="Email"
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              >
                <Icon name="mail" className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber-500 mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-[14px] text-mist-300 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                      <span className="w-1.5 h-px bg-mist-500 group-hover:bg-amber-400 group-hover:w-3 transition-all" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* contact strip */}
        <div className="mt-14 grid sm:grid-cols-3 gap-px bg-ink-700 border border-ink-700">
          <a href={waLink("Hello TECH OF THE WORLD — I need IT support in Saudi Arabia.", "sa")} target="_blank" rel="noreferrer" className="group bg-ink-900 p-5 flex items-center gap-4 hover:bg-ink-800 transition-colors">
            <FlagSA className="w-6 h-6 shrink-0" />
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">WhatsApp · KSA</span>
              <span className="block font-display font-semibold text-[14.5px] group-hover:text-[#5fd68f] transition-colors" dir="ltr">{CONTACT.displaySA}</span>
            </span>
          </a>
          <a href={waLink("Hello TECH OF THE WORLD — I need IT support in Egypt.", "eg")} target="_blank" rel="noreferrer" className="group bg-ink-900 p-5 flex items-center gap-4 hover:bg-ink-800 transition-colors">
            <FlagEG className="w-6 h-6 shrink-0" />
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">WhatsApp · Egypt</span>
              <span className="block font-display font-semibold text-[14.5px] group-hover:text-[#5fd68f] transition-colors" dir="ltr">{CONTACT.displayEG}</span>
            </span>
          </a>
          <a href={mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? "#"} className="group bg-ink-900 p-5 flex items-center gap-4 hover:bg-ink-800 transition-colors">
            <span className="w-6 h-6 shrink-0 grid place-items-center bg-amber-500 text-ink-950"><Icon name="mail" className="w-3.5 h-3.5" strokeWidth={2} /></span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">Email</span>
              <span className="block font-display font-semibold text-[13px] break-all group-hover:text-amber-400 transition-colors">{CONTACT.email}</span>
            </span>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            © {year} TECH OF THE WORLD · {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-circuit-400 led" />{L({ en: "Systems operational", ar: "الأنظمة تعمل" })}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              {t("footer.top")} <Icon name="chevron" className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Layout ---------------- */
export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    captureUtm(); // attach marketing source to every future outbound message
  }, []);

  useEffect(() => {
    if (location.hash) return; // in-page anchor (e.g. /services#networks) — let it scroll
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  // In-page anchor handling for /services#section
  useEffect(() => {
    const hash = location.hash; // e.g. #/services#networks
    const inner = hash.split("#").slice(1);
    if (inner.length > 1) {
      const id = inner[1];
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:bg-amber-500 focus:text-ink-950 focus:px-5 focus:py-3 font-display font-bold"
      >
        {t("common.skip")}
      </a>
      <Cursor />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1">
        <div key={location.pathname} className="page-enter">{children}</div>
      </main>
      <Footer />
      <Assistant />
      <WhatsAppFab />
    </div>
  );
}
