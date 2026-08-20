import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "./i18n";
import { Layout } from "./components/chrome";
import { LogoMark } from "./components/kit";

/* Code-splitting: every page ships as its own chunk, so visitors only
   download the page they open — faster first load on mobile networks. */
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ProjectsList = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectsList })));
const ProjectDetail = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectDetail })));
const About = lazy(() => import("./pages/About"));
const Industries = lazy(() => import("./pages/Industries"));
const InsightsList = lazy(() => import("./pages/Insights").then((m) => ({ default: m.InsightsList })));
const InsightDetail = lazy(() => import("./pages/Insights").then((m) => ({ default: m.InsightDetail })));
const MarketPage = lazy(() => import("./pages/Markets"));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const Request = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Request })));

function BootScreen() {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-ink-950 text-paper-50">
      <div className="text-center">
        <LogoMark className="w-14 h-14 mx-auto float-slow" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-mist-400">
          TECH <span className="text-amber-500">OF</span> THE WORLD
        </p>
        <div className="mt-4 mx-auto w-28 h-px bg-ink-700 overflow-hidden">
          <div className="h-full w-1/3 bg-amber-500 animate-[marquee_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<BootScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<ProjectsList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/insights" element={<InsightsList />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/saudi-arabia" element={<MarketPage market="sa" />} />
              <Route path="/egypt" element={<MarketPage market="eg" />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request" element={<Request />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </LangProvider>
  );
}
