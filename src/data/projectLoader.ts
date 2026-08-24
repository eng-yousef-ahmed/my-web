import { useEffect, useState } from "react";
import type { B } from "../i18n";
import { CASES, type CaseStudy } from "./cases";

/* ================= folder-based projects (no-code additions) =================
 * Any folder listed in public/projects/index.json can extend or override a
 * case study by providing a meta.json (see public/projects/_template).
 * If nothing is dropped in, the built-in CASES are used as-is.
 */

export type MetaShape = {
  id?: string;
  title?: B;
  sector?: B;
  market?: "sa" | "eg" | "both";
  featured?: boolean;
  catIds?: string[];
  period?: B;
  summary?: B;
  overview?: B;
  challenge?: B;
  solution?: B;
  implementation?: B[];
  technologies?: string[];
  role?: B;
  results?: B[];
  images?: { file: string; caption?: B }[];
};

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
let cached: Promise<CaseStudy[]> | null = null;

function normalizeImages(meta: MetaShape, folder: string): { file: string; caption?: B }[] | undefined {
  if (!meta.images?.length) return undefined;
  return meta.images.map((img) => ({ ...img, file: `${base}/projects/${folder}/images/${img.file}` }));
}

function loadAll(): Promise<CaseStudy[]> {
  if (!cached) {
    cached = (async () => {
      const merged = new Map<string, CaseStudy>(CASES.map((c) => [c.id, { ...c }]));
      try {
        const res = await fetch(`${base}/projects/index.json`);
        if (!res.ok) return CASES;
        const folders: string[] = await res.json();
        for (const folder of folders) {
          try {
            const mRes = await fetch(`${base}/projects/${folder}/meta.json`);
            if (!mRes.ok) {
              if (!merged.has(folder)) merged.set(folder, CASES[0]);
              continue;
            }
            const meta = (await mRes.json()) as MetaShape;
            const id = meta.id ?? folder;
            const existing = merged.get(id);
            if (existing) {
              merged.set(id, {
                ...existing,
                ...meta,
                id,
                images: normalizeImages(meta, folder) ?? existing.images,
              } as CaseStudy);
            } else {
              merged.set(id, {
                ...CASES[0],
                ...meta,
                id,
                title: meta.title ?? { en: folder, ar: folder },
                images: normalizeImages(meta, folder),
              } as CaseStudy);
            }
          } catch {
            /* one broken folder must never break the page */
          }
        }
      } catch {
        return CASES;
      }
      return Array.from(merged.values());
    })();
  }
  return cached;
}

export function useAllProjects(): { projects: CaseStudy[]; loading: boolean } {
  const [projects, setProjects] = useState<CaseStudy[]>(CASES);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    loadAll().then((p) => {
      if (active) {
        setProjects(p);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return { projects, loading };
}
