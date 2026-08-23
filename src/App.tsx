import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "./i18n";
import { Layout } from "./components/chrome";
import { LogoMark } from "./components/kit";

/* Code-splitting: each page ships as its own chunk. */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProjectsList = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectsList })));
const ProjectDetail = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectDetail })));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));

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
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<ProjectsList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </LangProvider>
  );
}
