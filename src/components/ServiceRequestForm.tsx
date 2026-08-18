import React, { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { CONFIG, hasEmail, hasWhatsApp, mailLink, waLink } from "../config";
import { SERVICE_CATEGORIES } from "../data/content";
import { Icon } from "./kit";

type FormState = {
  fullName: string;
  company: string;
  country: string;
  phone: string;
  email: string;
  service: string;
  urgency: "normal" | "urgent" | "critical";
  description: string;
  attachment: string;
};

type Status = "idle" | "submitting" | "success" | "draft" | "error";

const initial: FormState = {
  fullName: "",
  company: "",
  country: "",
  phone: "",
  email: "",
  service: "",
  urgency: "normal",
  description: "",
  attachment: "",
};

export function ServiceRequestForm({ prefillService }: { prefillService?: string }) {
  const { t, L } = useLang();
  const [form, setForm] = useState<FormState>({ ...initial, service: prefillService ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const serviceOptions = useMemo(
    () => [...SERVICE_CATEGORIES.map((c) => ({ value: c.id, label: L(c.name) })), { value: "other", label: t("form.other") }],
    [L, t]
  );

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = t("form.required");
    if (!form.company.trim()) e.company = t("form.required");
    if (!form.country) e.country = t("form.required");
    if (!form.phone.trim()) e.phone = t("form.required");
    else if (!/^[+()\-\s\d]{7,20}$/.test(form.phone.trim())) e.phone = t("form.badPhone");
    if (!form.email.trim()) e.email = t("form.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = t("form.badEmail");
    if (!form.service) e.service = t("form.required");
    if (form.description.trim().length < 10) e.description = t("form.shortDesc");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const summary = () => {
    const svc = serviceOptions.find((s) => s.value === form.service)?.label ?? form.service;
    return [
      `${t("form.title")} — ${CONFIG.brand}`,
      `----------------------------------------`,
      `${t("form.fullName")}: ${form.fullName}`,
      `${t("form.company")}: ${form.company}`,
      `${t("form.country")}: ${form.country}`,
      `${t("form.phone")}: ${form.phone}`,
      `${t("form.email")}: ${form.email}`,
      `${t("form.service")}: ${svc}`,
      `${t("form.urgency")}: ${t(`form.${form.urgency}`)}`,
      form.attachment ? `Attachment: ${form.attachment}` : "",
      `----------------------------------------`,
      form.description,
    ].filter(Boolean).join("\n");
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    if (CONFIG.formEndpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "website-service-request" }),
        });
        setStatus(res.ok ? "success" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      setStatus("draft");
    }
  };

  const inputCls = (err?: string) =>
    `w-full bg-ink-900 border ${err ? "border-red-500/70" : "border-ink-600"} focus:border-amber-500 outline-none px-4 py-3 text-[15px] text-paper-50 placeholder:text-mist-500 transition-colors`;
  const labelCls = "block font-mono text-[11px] uppercase tracking-[0.22em] text-mist-300 mb-2";
  const errCls = "mt-1.5 text-[12.5px] text-red-400 flex items-center gap-1.5";

  if (status === "success") {
    return (
      <StatusPanel
        icon="check"
        tone="ok"
        title={t("form.successTitle")}
        body={t("form.successBody")}
        actionLabel={t("form.again")}
        onAction={() => { setForm(initial); setStatus("idle"); }}
      />
    );
  }

  if (status === "draft") {
    const wa = waLink(summary());
    const em = mailLink(`Service Request — ${form.company}`, summary());
    return (
      <div className="chamfer bg-ink-850 border border-ink-600 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 grid place-items-center bg-amber-500/15 text-amber-400"><Icon name="doc" className="w-5 h-5" /></span>
          <h3 className="font-display text-2xl font-bold text-paper-50">{t("form.draftTitle")}</h3>
        </div>
        <p className="text-mist-300 leading-relaxed">{t("form.draftBody")}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-4">
          {wa && (
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 chamfer-sm bg-[#23a55b] text-white px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
              <Icon name="wa" className="w-5 h-5" /> {t("form.sendWhatsapp")}
            </a>
          )}
          {em && (
            <a href={em} className="inline-flex items-center justify-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] hover:bg-amber-400 transition-all">
              <Icon name="mail" className="w-5 h-5" /> {t("form.sendEmail")}
            </a>
          )}
          {!wa && !em && <p className="text-mist-400 text-sm">{t("common.notConfigured")}</p>}
        </div>
        <button onClick={() => { setForm(initial); setStatus("idle"); }} className="mt-6 font-mono text-[12px] uppercase tracking-widest text-mist-400 hover:text-amber-400 transition-colors cursor-pointer">
          ← {t("form.again")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="chamfer bg-ink-850 border border-ink-600 p-8 sm:p-10 relative">
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-500/40 to-transparent" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="f-name" className={labelCls}>{t("form.fullName")} *</label>
          <input id="f-name" className={inputCls(errors.fullName)} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Yousef Ahmed" autoComplete="name" aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="f-company" className={labelCls}>{t("form.company")} *</label>
          <input id="f-company" className={inputCls(errors.company)} value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="ACME Co." autoComplete="organization" aria-invalid={!!errors.company} />
          {errors.company && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="f-country" className={labelCls}>{t("form.country")} *</label>
          <select id="f-country" className={`${inputCls(errors.country)} ${form.country ? "" : "text-mist-500"}`} value={form.country} onChange={(e) => set("country", e.target.value)} aria-invalid={!!errors.country}>
            <option value="">{t("form.selectCountry")}</option>
            <option value="Saudi Arabia">Saudi Arabia — السعودية</option>
            <option value="Egypt">Egypt — مصر</option>
            <option value="Other">{t("form.other")}</option>
          </select>
          {errors.country && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="f-phone" className={labelCls}>{t("form.phone")} *</label>
          <input id="f-phone" dir="ltr" className={`${inputCls(errors.phone)} text-start`} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+966 5X XXX XXXX" autoComplete="tel" aria-invalid={!!errors.phone} />
          {errors.phone && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-email" className={labelCls}>{t("form.email")} *</label>
          <input id="f-email" dir="ltr" type="email" className={`${inputCls(errors.email)} text-start`} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@company.com" autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="f-service" className={labelCls}>{t("form.service")} *</label>
          <select id="f-service" className={`${inputCls(errors.service)} ${form.service ? "" : "text-mist-500"}`} value={form.service} onChange={(e) => set("service", e.target.value)} aria-invalid={!!errors.service}>
            <option value="">{t("form.selectService")}</option>
            {serviceOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.service && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.service}</p>}
        </div>
        <fieldset>
          <legend className={labelCls}>{t("form.urgency")} *</legend>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t("form.urgency")}>
            {(["normal", "urgent", "critical"] as const).map((u) => (
              <button
                key={u}
                type="button"
                role="radio"
                aria-checked={form.urgency === u}
                onClick={() => set("urgency", u)}
                className={`px-2 py-3 border font-display text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  form.urgency === u
                    ? u === "critical"
                      ? "bg-red-500/90 border-red-400 text-white"
                      : u === "urgent"
                      ? "bg-amber-500 border-amber-400 text-ink-950"
                      : "bg-ink-600 border-mist-500 text-paper-50"
                    : `border-ink-600 text-mist-400 hover:border-mist-500 ${u === "critical" ? "hover:text-red-400" : u === "urgent" ? "hover:text-amber-400" : ""}`
                }`}
              >
                {t(`form.${u}`)}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="sm:col-span-2">
          <label htmlFor="f-desc" className={labelCls}>{t("form.description")} *</label>
          <textarea id="f-desc" rows={5} className={`${inputCls(errors.description)} resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} aria-invalid={!!errors.description} />
          {errors.description && <p className={errCls}><Icon name="alert" className="w-3.5 h-3.5" />{errors.description}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-file" className={labelCls}>{t("form.attachment")}</label>
          <div className="flex items-center gap-4">
            <label htmlFor="f-file" className="inline-flex items-center gap-3 border border-ink-600 px-5 py-3 text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer text-[13.5px] font-medium">
              <Icon name="doc" className="w-4.5 h-4.5" />
              {form.attachment || "Choose file…"}
              <input id="f-file" type="file" className="sr-only" onChange={(e) => set("attachment", e.target.files?.[0]?.name ?? "")} />
            </label>
            <span className="text-[12px] text-mist-500">{t("form.attachmentHint")}</span>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 flex items-start gap-3 border border-red-500/50 bg-red-500/10 p-4 text-red-300" role="alert">
          <Icon name="alert" className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-display font-semibold">{t("form.failTitle")}</p>
            <p className="text-[13.5px] mt-1">{t("form.failBody")}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 group w-full inline-flex items-center justify-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-6 py-4 font-display text-[14px] font-bold uppercase tracking-[0.16em] transition-all hover:bg-amber-400 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-ink-950/30 border-t-ink-950 rounded-full animate-spin" aria-hidden="true" />
            {t("form.submitting")}
          </>
        ) : (
          <>
            {t("form.submit")}
            <Icon name="send" className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" />
          </>
        )}
      </button>
      <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500">
        {hasWhatsApp || hasEmail ? "WhatsApp · Email" : t("common.notConfigured")}
      </p>
    </form>
  );
}

function StatusPanel({ icon, tone, title, body, actionLabel, onAction }: { icon: string; tone: "ok" | "err"; title: string; body: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="chamfer bg-ink-850 border border-ink-600 p-10 text-center">
      <span className={`mx-auto w-14 h-14 grid place-items-center rounded-full ${tone === "ok" ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400"}`}>
        <Icon name={icon} className="w-7 h-7" strokeWidth={2} />
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold text-paper-50">{title}</h3>
      <p className="mt-3 text-mist-300 leading-relaxed max-w-md mx-auto">{body}</p>
      <button onClick={onAction} className="mt-7 font-mono text-[12px] uppercase tracking-widest text-amber-500 hover:text-amber-400 cursor-pointer">
        {actionLabel}
      </button>
    </div>
  );
}
