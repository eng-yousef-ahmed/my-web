import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { CONTACT, mailLink, waLink } from "../config";
import { FlagEG, FlagSA, Icon, Logo } from "./kit";
import { Cursor } from "./fx";
import { Assistant } from "./Assistant";

const NAV = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/projects", labelKey: "nav.projects" },
  { to: "/services", labelKey: "nav.services" },
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
    <div className="fixed top-0 inset-x-0 z-[70] h-[2px] pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-amber-500 origin-left rtl:origin-right"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink-950/95 backdrop-blur-sm border-b border-ink-700" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link to="/" aria-label="TECH OF THE WORLD, Home" className="shrink-0 hover:opacity-85 transition-opacity">
          <Logo tone="light" compact />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-draw font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  isActive ? "nav-active text-amber-500" : "text-mist-200 hover:text-paper-50"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={toggle}
            className="nav-draw font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-mist-200 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
        </div>

        <button
          className="md:hidden w-10 h-10 grid place-items-center border border-ink-600 text-paper-50 hover:border-amber-500 transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("common.close") : t("common.menu")}
        >
          <Icon name={open ? "close" : "menu"} className="w-5 h-5" />
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 bg-ink-950/98 grid-bg transition-opacity duration-300 ${
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
                  `flex items-center justify-between border-b border-ink-700 py-4 font-display text-lg font-bold transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  } rtl:translate-x-0 ${isActive ? "text-amber-500" : "text-paper-50"}`
                }
              >
                <span>{t(item.labelKey)}</span>
                <Icon name="arrow" className="w-4.5 h-4.5 text-mist-500 rtl:-scale-x-100" />
              </NavLink>
            ))}
          </div>
          <button
            onClick={toggle}
            className="mt-8 mx-auto font-mono text-[12px] uppercase tracking-[0.25em] text-mist-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {t("common.langLabel")}
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { t, L, isAr } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950 text-paper-50 border-t border-ink-700">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_auto]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 font-display text-[15px] font-bold text-paper-50">
              {L({ en: "Yousef Ahmed — Senior IT Support Specialist", ar: "يوسف أحمد — أخصائي دعم تقني أول" })}
            </p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-300 max-w-sm">
              {L({
                en: "Hands-on experience supporting and running IT environments: infrastructure, networks, Microsoft systems, security and surveillance.",
                ar: "خبرة عملية في دعم وتشغيل بيئات IT، البنية التحتية، الشبكات وأنظمة Microsoft والأمن والمراقبة.",
              })}
            </p>
            <div className="mt-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400">
              <FlagSA className="w-5 h-5" /> Saudi Arabia
              <span className="text-ink-600">|</span>
              <FlagEG className="w-5 h-5" /> Egypt
            </div>
          </div>

          <nav aria-label={t("footer.quickLinks")}>
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-amber-500 mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[13.5px] text-mist-300 hover:text-amber-400 transition-colors">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-amber-500 mb-4">{t("footer.contact")}</h3>
            <div className="flex items-center gap-2.5">
              <a
                href={waLink(isAr ? "مرحبًا يوسف، أحتاج دعمًا تقنيًا في السعودية." : "Hello Yousef, I need IT support in Saudi Arabia.", "sa")}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp — Saudi Arabia (${CONTACT.displaySA})`}
                title={`WhatsApp · ${CONTACT.displaySA}`}
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#23a55b] hover:text-[#5fd68f] transition-colors"
              >
                <Icon name="wa" className="w-4.5 h-4.5" />
              </a>
              <a
                href={waLink(isAr ? "مرحبًا يوسف، أحتاج دعمًا تقنيًا في مصر." : "Hello Yousef, I need IT support in Egypt.", "eg")}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp — Egypt (${CONTACT.displayEG})`}
                title={`WhatsApp · ${CONTACT.displayEG}`}
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#23a55b] hover:text-[#5fd68f] transition-colors"
              >
                <Icon name="wa" className="w-4.5 h-4.5" />
              </a>
              <a
                href={mailLink("Hello Yousef", "") ?? "#"}
                aria-label={`Email — ${CONTACT.email}`}
                title={`Email · ${CONTACT.email}`}
                className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
              >
                <Icon name="mail" className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500">
            © {year} TECH OF THE WORLD · {t("footer.rights")}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500 hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            {t("footer.top")} <Icon name="chevron" className="w-3.5 h-3.5 rotate-180" />
          </button>
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
    if (location.hash) return; // in-page anchor — let it scroll
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  /* In-page anchors (e.g. /services#networks). */
  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
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
    </div>
  );
}
