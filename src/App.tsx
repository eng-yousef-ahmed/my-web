import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { LangProvider } from "./i18n";
import { Layout } from "./components/chrome";
import { Btn, LogoMark } from "./components/kit";
import { useLang, usePageMeta } from "./i18n";

/* Code-splitting: each page ships as its own chunk. */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProjectsList = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectsList })));
const ProjectDetail = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectDetail })));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const CardPage = lazy(() => import("./pages/Card"));

function BootScreen() {
  const { isAr } = useLang();
  return (
    <div className="min-h-[70vh] grid place-items-center bg-ink-950 text-paper-50">
      <div className="text-center">
        <LogoMark className="w-14 h-14 mx-auto float-slow" />
        <p className="mt-6 font-display text-[15px] font-bold text-paper-50">
          {isAr ? (
            <>
              يوسف <span className="text-amber-500">أحمد</span>
            </>
          ) : (
            <>
              Yousef <span className="text-amber-500">Ahmed</span>
            </>
          )}
        </p>
        <div className="mt-4 mx-auto w-28 h-px bg-ink-700 overflow-hidden">
          <div className="h-full w-1/3 bg-amber-500 animate-[marquee_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  const { isAr } = useLang();
  usePageMeta(isAr ? "الصفحة غير موجودة | يوسف أحمد" : "Page not found | Yousef Ahmed", "");
  // unknown URLs are served the app shell (HTTP 200), so tell crawlers not to index them
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <section className="min-h-[70vh] bg-ink-950 text-paper-50 grid place-items-center pt-32">
      <div className="text-center px-5">
        <p className="font-mono text-amber-500 text-sm uppercase tracking-[0.3em]">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">{isAr ? "الصفحة غير موجودة." : "Page not found."}</h1>
        <Btn to="/" className="mt-8" arrow={false}>
          {isAr ? "العودة للرئيسية" : "Back to home"}
        </Btn>
      </div>
    </section>
  );
}

/** Old links (printed QR codes, shared URLs) used "/#/route"; send them to the clean path. */
function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith("#/")) navigate(h.slice(1), { replace: true });
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter basename={(import.meta.env.BASE_URL || "/").replace(/\/$/, "") || undefined}>
        <LegacyHashRedirect />
        <Routes>
          {/* the standalone digital business card (opened by scanning a QR) — no site chrome */}
          <Route
            path="/card"
            element={
              <Suspense fallback={<BootScreen />}>
                <CardPage />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <Layout>
                <Suspense fallback={<BootScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<ProjectsList />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
