import { useEffect, useState } from "react";
import type { B } from "../i18n";
import { CASES, type CaseStudy, type ProjectImage } from "./cases";

/**
 * ============================================================
 *  نظام مشاريع بلا كود — Folder-based project content
 * ============================================================
 *  لإضافة مشروع جديد أو صور لمشروع موجود:
 *
 *  1) أنشئ مجلدًا باسم المشروع داخل:  public/projects/<project-id>/
 *  2) ضع الصور داخل:                 public/projects/<project-id>/images/
 *  3) أنشئ ملف:                      public/projects/<project-id>/meta.json
 *     (انسخ القالب من public/projects/_template/meta.example.json)
 *  4) أضف اسم المجلد إلى القائمة في: public/projects/index.json
 *
 *  لا حاجة لأي تعديل في الكود — الموقع يقرأ المجلدات تلقائيًا.
 *  يعمل أيضًا على النسخة المنشورة: ارفع الملفات إلى السيرفر مباشرة.
 * ============================================================
 */

export type { ProjectImage } from "./cases";

/** Every field is optional — the loader fills sensible defaults. */
export type FolderMeta = {
  id?: string;
  title?: B;
  sector?: B;
  market?: "sa" | "eg" | "both";
  featured?: boolean;
  catIds?: string[];
  summary?: B;
  overview?: B;
  challenge?: B;
  solution?: B;
  implementation?: B[];
  technologies?: string[];
  role?: B;
  results?: B[];
  images?: (string | ProjectImage)[];
};

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export function projectImageUrl(projectId: string, file: string): string {
  return `${base}/projects/${projectId}/${file.replace(/^\//, "")}`;
}

function toImages(projectId: string, raw?: (string | ProjectImage)[]): ProjectImage[] | undefined {
  if (!raw || raw.length === 0) return undefined;
  return raw.map((r) => {
    const img: ProjectImage = typeof r === "string" ? { file: r } : r;
    return { ...img, file: projectImageUrl(projectId, img.file) };
  });
}

const EMPTY_B: B = { en: "", ar: "" };

function normalize(projectId: string, meta: FolderMeta): CaseStudy {
  const existing = CASES.find((c) => c.id === projectId);
  const images = toImages(projectId, meta.images);
  return {
    id: projectId,
    title: meta.title ?? existing?.title ?? EMPTY_B,
    sector: meta.sector ?? existing?.sector ?? { en: "IT Project", ar: "مشروع تقني" },
    market: meta.market ?? existing?.market ?? "both",
    featured: meta.featured ?? existing?.featured ?? false,
    catIds: meta.catIds ?? existing?.catIds ?? ["it-infrastructure"],
    summary: meta.summary ?? existing?.summary ?? EMPTY_B,
    overview: meta.overview ?? existing?.overview ?? EMPTY_B,
    challenge: meta.challenge ?? existing?.challenge ?? EMPTY_B,
    solution: meta.solution ?? existing?.solution ?? EMPTY_B,
    implementation: meta.implementation ?? existing?.implementation ?? [],
    technologies: meta.technologies ?? existing?.technologies ?? [],
    role: meta.role ?? existing?.role ?? EMPTY_B,
    results: meta.results ?? existing?.results ?? [],
    images: images ?? existing?.images,
  };
}

let cache: Promise<CaseStudy[]> | null = null;

/** Loads public/projects/index.json, then each project's meta.json, and
 *  merges folder content over the built-in case studies (by id). */
export function getAllProjects(): Promise<CaseStudy[]> {
  if (!cache) {
    cache = (async () => {
      const projects = [...CASES];
      try {
        const res = await fetch(`${base}/projects/index.json`, { cache: "no-cache" });
        if (!res.ok) return projects;
        const ids: string[] = await res.json();
        if (!Array.isArray(ids)) return projects;

        await Promise.all(
          ids
            .filter((id) => typeof id === "string" && id && !id.startsWith("_"))
            .map(async (id) => {
              try {
                const r = await fetch(`${base}/projects/${id}/meta.json`, { cache: "no-cache" });
                if (!r.ok) return;
                const meta = (await r.json()) as FolderMeta;
                const merged = normalize(id, meta);
                const idx = projects.findIndex((p) => p.id === id);
                if (idx >= 0) projects[idx] = merged;
                else projects.push(merged);
              } catch {
                /* skip a broken project folder silently */
              }
            })
        );
      } catch {
        /* no folder content — site runs on built-in case studies */
      }
      return projects;
    })();
  }
  return cache;
}

/** React hook with a tiny skeleton state. */
export function useAllProjects(): { projects: CaseStudy[]; loading: boolean } {
  const [state, setState] = useState<{ projects: CaseStudy[]; loading: boolean }>({
    projects: CASES,
    loading: true,
  });
  useEffect(() => {
    let alive = true;
    getAllProjects().then((projects) => {
      if (alive) setState({ projects, loading: false });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
