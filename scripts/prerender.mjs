/**
 * Runs after `vite build`. The site is a single-page app, but crawlers and link-preview bots
 * (WhatsApp, LinkedIn, Google's first pass) read the HTML as served. This writes one HTML file
 * per route with that page's own <title>, description, canonical and social tags, and builds
 * a complete sitemap. The React app still renders everything client-side as before.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const meta = JSON.parse(fs.readFileSync(path.join(root, "src/data/route-meta.json"), "utf8"));
const site = (template.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "").replace(/\/+$/, "");
if (!site) throw new Error("prerender: canonical URL not found in dist/index.html");

const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setTag = (html, re, tag) => (re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`));
const metaRe = (attr, key) => new RegExp(`<meta\\s+${attr}="${key}"[\\s\\S]*?/>`);

function page(route, title, description) {
  const url = site + (route === "/" ? "/" : route);
  let h = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = setTag(h, metaRe("name", "description"), `<meta name="description" content="${esc(description)}" />`);
  h = setTag(h, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  h = setTag(h, metaRe("property", "og:url"), `<meta property="og:url" content="${url}" />`);
  h = setTag(h, metaRe("property", "og:title"), `<meta property="og:title" content="${esc(title)}" />`);
  h = setTag(h, metaRe("property", "og:description"), `<meta property="og:description" content="${esc(description)}" />`);
  h = setTag(h, metaRe("name", "twitter:title"), `<meta name="twitter:title" content="${esc(title)}" />`);
  return h;
}

function write(route, html) {
  const file = path.join(dist, route.replace(/^\//, "") + ".html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const urls = [{ route: "/", priority: "1.0" }];
for (const [route, m] of Object.entries(meta)) {
  if (route === "/") continue;
  write(route, page(route, m.title.en, m.description.en));
  urls.push({ route, priority: route === "/projects" ? "0.9" : "0.8" });
}

// case studies: read the data file when this Node can load TypeScript (22.18+); otherwise skip them.
try {
  const { CASES } = await import(pathToFileURL(path.join(root, "src/data/cases.ts")).href);
  for (const c of CASES) {
    const route = `/projects/${c.id}`;
    write(route, page(route, `${c.title.en} | Yousef Ahmed`, c.summary.en));
    urls.push({ route, priority: "0.7" });
  }
} catch (e) {
  console.warn("prerender: case-study pages skipped (" + (e?.code ?? e?.message) + ")");
}

const today = new Date().toISOString().slice(0, 10);
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${site}${u.route === "/" ? "/" : u.route}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), xml);
console.log(`prerender: ${urls.length} pages + sitemap`);
