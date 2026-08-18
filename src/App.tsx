import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "./i18n";
import { Layout } from "./components/chrome";
import Home from "./pages/Home";
import Services from "./pages/Services";
import { ProjectsList, ProjectDetail } from "./pages/Projects";
import About from "./pages/About";
import Industries from "./pages/Industries";
import { InsightsList, InsightDetail } from "./pages/Insights";
import MarketPage from "./pages/Markets";
import { Contact, Request } from "./pages/Contact";

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Layout>
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
        </Layout>
      </HashRouter>
    </LangProvider>
  );
}
