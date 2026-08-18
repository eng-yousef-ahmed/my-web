import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { CONFIG, hasWhatsApp, waLink } from "../config";
import { Icon, Logo, Btn } from "./kit";

/* ================= header ================= */
export function Header() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMarketsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { to: "/services", label: t("nav.services") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/industries", label: t("nav.industries") },
    { to: "/insights", label: t("nav.insights") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:inset-x-3 z-[100] bg-amber-500 text-ink-950 px-4 py-2 font-mono text-xs text-center">
        {t("common.skip")}
      </a>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink-950/92 border-b border-ink-700/70 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          <Link to="/" aria-label="TECH OF THE WORLD — Home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden xl:flex items-center gap-8" aria-label="Primary">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-draw text-[13.5px] font-medium tracking-wide transition-colors ${isActive ? "nav-active text-amber-400" : "text-mist-200 hover:text-paper-50"}`}>
                {l.label}
              </NavLink>
            ))}
            <div className="relative" onMouseEnter={() => setMarketsOpen(true)} onMouseLeave={() => setMarketsOpen(false)}>
              <button
                className={`nav-draw flex items-center gap-1.5 text-[13.5px] font-medium tracking-wide cursor-pointer transition-colors ${marketsOpen ? "text-amber-400" : "text-mist-200 hover:text-paper-50"}`}
                aria-expanded={marketsOpen}
                onClick={() => setMarketsOpen((v) => !v)}
              >
                {t("nav.markets")}
                <Icon name="chevron" className={`w-3.5 h-3.5 transition-transform ${marketsOpen ? "rotate-180" : ""}`} />
              </button>
              {marketsOpen && (
                <div className="absolute top-full pt-4 start-0">
                  <div className="chamfer-sm bg-ink-800 border border-ink-600 p-2 min-w-[190px] shadow-2xl shadow-ink-950/60">
                    <Link to="/saudi-arabia" className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] text-mist-200 hover:text-amber-400 hover:bg-ink-700 transition-colors">
                      <Icon name="pin" className="w-4 h-4 text-amber-500" /> {t("nav.saudi")}
                    </Link>
                    <Link to="/egypt" className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] text-mist-200 hover:text-amber-400 hover:bg-ink-700 transition-colors">
                      <Icon name="pin" className="w-4 h-4 text-amber-500" /> {t("nav.egypt")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/contact" className={({ isActive }) => `nav-draw text-[13.5px] font-medium tracking-wide transition-colors ${isActive ? "nav-active text-amber-400" : "text-mist-200 hover:text-paper-50"}`}>
              {t("nav.contact")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-mono text-[12px] uppercase tracking-widest px-3 py-2 border border-ink-600 text-mist-200 hover:text-amber-400 hover:border-amber-500 transition-colors cursor-pointer"
              aria-label={t("common.langLabel")}
            >
              {t("common.langLabel")}
            </button>
            <Link to="/request" className="hidden lg:inline-flex">
              <span className="group inline-flex items-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-5 py-2.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] transition-all hover:bg-amber-400 hover:shadow-[0_8px_30px_-8px_rgba(233,163,59,0.6)]">
                {t("nav.request")}
                <Icon name="arrow" className="w-3.5 h-3.5 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
              </span>
            </Link>
            <button className="xl:hidden text-paper-50 p-1 cursor-pointer" onClick={() => setOpen(true)} aria-label={t("common.menu")} aria-expanded={open}>
              <Icon name="menu" className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div className={`fixed inset-0 z-[90] transition-all duration-500 xl:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-ink-950/98 noise" onClick={() => setOpen(false)} />
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className={`relative h-full flex flex-col px-6 pt-6 pb-8 transition-transform duration-500 ${open ? "translate-y-0" : "translate-y-6"}`}>
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label={t("common.close")} className="text-paper-50 p-1 cursor-pointer">
              <Icon name="close" className="w-7 h-7" />
            </button>
          </div>
          <nav className="mt-10 flex-1 overflow-y-auto" aria-label="Mobile">
            {[{ to: "/", label: t("nav.home") }, ...links, { to: "/saudi-arabia", label: t("nav.saudi") }, { to: "/egypt", label: t("nav.egypt") }, { to: "/contact", label: t("nav.contact") }].map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex items-baseline gap-4 py-4 border-b border-ink-700/60 group ${isActive ? "text-amber-400" : "text-paper-50"}`
                }
              >
                <span className="font-mono text-[11px] text-amber-500">0{i + 1}</span>
                <span className="font-display text-2xl font-semibold">{l.label}</span>
                <Icon name="arrow" className="w-5 h-5 ms-auto text-mist-500 opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-all rtl:-scale-x-100" />
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-6">
            <Link to="/request" className="inline-flex items-center justify-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em]">
              {t("nav.request")}
            </Link>
            {hasWhatsApp && (
              <a href={waLink(t("cta.urgent")) ?? "#"} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 chamfer-sm border border-ink-600 text-paper-50 px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em]">
                <Icon name="wa" className="w-5 h-5 text-[#3fbf6f]" /> {t("cta.urgent")}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= footer ================= */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/industries", label: t("nav.industries") },
    { to: "/insights", label: t("nav.insights") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];
  return (
    <footer className="relative bg-ink-950 text-paper-50 border-t border-ink-700 noise overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 text-mist-300 text-[15px] leading-relaxed max-w-sm">{t("footer.blurb")}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500">{CONFIG.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-400 mb-5">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-4" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-400 mb-5">{t("footer.serviceLines")}</h3>
            <ul className="space-y-3">
              {[
                { to: "/services#it-infrastructure", label: "IT & Infrastructure" },
                { to: "/services#networks", label: "Networks" },
                { to: "/services#microsoft-cloud", label: "Microsoft & Cloud" },
                { to: "/services#security-systems", label: "Security Systems" },
                { to: "/services#consultancy", label: "IT Consultancy" },
              ].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-4" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-400 mb-5">{t("footer.markets")}</h3>
            <ul className="space-y-3">
              <li><Link to="/saudi-arabia" className="text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors">{t("nav.saudi")}</Link></li>
              <li><Link to="/egypt" className="text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors">{t("nav.egypt")}</Link></li>
            </ul>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-400 mt-8 mb-5">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              {CONFIG.email && (
                <li>
                  <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2.5 text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors">
                    <Icon name="mail" className="w-4 h-4 text-amber-500" />{CONFIG.email}
                  </a>
                </li>
              )}
              {hasWhatsApp && (
                <li>
                  <a href={waLink("Hello TECH OF THE WORLD — I would like to talk about an IT requirement.") ?? "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-[14.5px] text-mist-200 hover:text-amber-400 transition-colors">
                    <Icon name="wa" className="w-4 h-4 text-[#3fbf6f]" />WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link to="/request" className="inline-flex items-center gap-2.5 text-[14.5px] text-amber-400 hover:text-amber-300 transition-colors">
                  <Icon name="send" className="w-4 h-4" />{t("nav.request")}
                </Link>
              </li>
            </ul>
            {(!hasWhatsApp || !CONFIG.email) && <p className="mt-4 text-[12px] text-mist-500 leading-relaxed">{t("footer.waNote")}</p>}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-wider text-mist-500">
            © {year} {CONFIG.brand} — {t("footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-mist-500">YA / KSA · EG</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 grid place-items-center border border-ink-600 text-mist-300 hover:text-amber-400 hover:border-amber-500 transition-colors cursor-pointer"
              aria-label={t("footer.top")}
            >
              <Icon name="chevron" className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= floating WhatsApp ================= */
export function WhatsFab() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!hasWhatsApp) return null;
  const href = waLink("Hello TECH OF THE WORLD — " + t("cta.urgent"));
  return (
    <a
      href={href ?? "#"}
      target="_blank"
      rel="noreferrer"
      aria-label={t("cta.talkSpecialist")}
      className={`fixed bottom-6 end-6 z-[70] transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <span className="relative grid place-items-center w-14 h-14 rounded-full bg-[#23a55b] text-white shadow-xl shadow-ink-950/50 hover:scale-110 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#23a55b] pulse-ring" aria-hidden="true" />
        <Icon name="wa" className="w-7 h-7 relative" />
      </span>
    </a>
  );
}

/* ================= layout ================= */
export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <WhatsFab />
    </div>
  );
}
