import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { captureUtm, CONTACT, mailLink, waLink } from "../config";
import { Icon, Logo } from "./kit";
import { Assistant } from "./Assistant";

const NAV = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/projects", labelKey: "nav.projects" },
  { to: "/services", labelKey: "nav.services" },
  { to: "/contact", labelKey: "nav.contact" },
];

/* ================= reading progress ================= */
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
      <div className="h-full bg-amber-500 origin-left rtl:origin-right" style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }} />
    </div>
  );
}

/* ================= header ================= */
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
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <Link to="/" aria-label="TECH OF THE WORLD — Home" className="shrink-0 hover:opacity-90 transition-opacity">
          <Logo tone="light" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-draw font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ${
                  isActive ? "nav-active text-amber-500" : "text-mist-300 hover:text-paper-50"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={toggle}
            className="nav-draw font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-mist-300 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>
        </div>

        <button
          className="lg:hidden w-11 h-11 grid place-items-center border border-ink-600 text-paper-50 hover:border-amber-500 transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("common.close") : t("common.menu")}
        >
          <Icon name={open ? "close" : "menu"} className="w-5 h-5" />
        </button>
      </div>

      {/* mobile menu */}
      <div className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-ink-950/98 grid-bg transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="h-full overflow-y-auto px-6 py-8 flex flex-col" aria-label="Mobile">
          <div className="space-y-1">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-ink-700 py-4 font-display text-xl font-bold transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  } rtl:translate-x-0 ${isActive ? "text-amber-500" : "text-paper-50"}`
                }
              >
                <span>{t(item.labelKey)}</span>
                <Icon name="arrow" className="w-5 h-5 text-mist-500 rtl:-scale-x-100" />
              </NavLink>
            ))}
          </div>
          <button
            onClick={toggle}
            className="mx-auto mt-8 font-mono text-[12px] uppercase tracking-[0.25em] text-mist-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {t("common.langLabel")}
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ================= footer — minimal, no repeated contact details ================= */
export function Footer() {
  const { t, isAr } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950 text-paper-50 border-t border-ink-700 noise">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <Logo tone="light" />
            <p className="mt-4 text-[13.5px] leading-relaxed text-mist-400 max-w-md">{t("footer.blurb")}</p>
          </div>

          <nav aria-label={t("footer.nav")} className="flex flex-wrap gap-x-7 gap-y-3">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-mist-300 hover:text-amber-400 transition-colors">
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={waLink(isAr ? "مرحبًا يوسف، أود التواصل معك." : "Hello Yousef, I'd like to get in touch.", "sa")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#23a55b] hover:text-[#5fd68f] transition-colors"
            >
              <Icon name="wa" className="w-4.5 h-4.5" />
            </a>
            <a
              href={mailLink("Hello", "") ?? "#"}
              aria-label="Email"
              title="Email"
              className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              <Icon name="mail" className="w-4.5 h-4.5" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isAr ? "لينكدإن" : "LinkedIn"}
              title="LinkedIn"
              className="w-10 h-10 grid place-items-center border border-ink-600 text-mist-300 hover:border-[#0a66c2] hover:text-[#5ea8e8] transition-colors"
            >
              <Icon name="linkedin" className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            © {year} Yousef Ahmed · TECH OF THE WORLD · {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-400 led" aria-hidden="true" />
              {isAr ? "السعودية · مصر" : "SA · EG"}
            </span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-2">
              {t("footer.top")} <Icon name="chevron" className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= layout ================= */
export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    captureUtm();
  }, []);

  useEffect(() => {
    if (location.hash) return;
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
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1">
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}
