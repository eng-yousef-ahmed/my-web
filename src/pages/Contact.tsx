import React, { useState } from "react";
import { useLang, usePageMeta } from "../i18n";
import { CONFIG, CONTACT, hasEmail, hasWhatsApp, mailLink, telHref, waLink } from "../config";
import { Btn, FlagEG, FlagSA, Icon, PageHero, Reveal } from "../components/kit";
import { BusinessCard } from "../components/BusinessCard";

/* ---------------- contact form (validates, then hands off via WhatsApp/email) ---------------- */
type FormState = { name: string; email: string; company: string; subject: string; message: string };
const EMPTY: FormState = { name: "", email: "", company: "", subject: "", message: "" };

function ContactForm() {
  const { L, isAr, lang } = useLang();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) er.name = L({ en: "Please enter your name.", ar: "أدخل اسمك من فضلك." });
    if (!form.email.trim()) er.email = L({ en: "Please enter your email.", ar: "أدخل بريدك الإلكتروني." });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = L({ en: "Enter a valid email address.", ar: "أدخل بريدًا صحيحًا." });
    if (!form.message.trim() || form.message.trim().length < 10)
      er.message = L({ en: "Please describe your request (10+ characters).", ar: "صف طلبك (١٠ أحرف على الأقل)." });
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setDone(true);
  };

  const summary = () =>
    [
      `${L({ en: "Name", ar: "الاسم" })}: ${form.name}`,
      `${L({ en: "Email", ar: "البريد" })}: ${form.email}`,
      form.company ? `${L({ en: "Company", ar: "الشركة" })}: ${form.company}` : "",
      `${L({ en: "Subject", ar: "الموضوع" })}: ${form.subject || L({ en: "General inquiry", ar: "استفسار عام" })}`,
      "",
      form.message,
      "",
      `(${CONFIG.brand} — ${CONTACT.website})`,
    ]
      .filter(Boolean)
      .join("\n");

  const field = "w-full bg-transparent border border-ink-900/20 px-4 py-3 text-[14.5px] text-ink-900 placeholder:text-mist-400 focus:border-amber-600 focus:outline-none transition-colors";
  const label = "block font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500 mb-2";
  const err = "mt-1.5 text-[12px] text-red-600";

  if (done) {
    const waSa = waLink(summary(), "sa");
    const waEg = waLink(summary(), "eg");
    const em = mailLink(form.subject || "Hello Yousef", summary());
    return (
      <div className="border border-ink-900/15 bg-paper-50 p-7">
        <p className="flex items-center gap-2.5 font-display text-lg font-bold text-ink-900">
          <Icon name="check" className="w-5 h-5 text-amber-600" strokeWidth={2.2} />
          {L({ en: "Your message is ready", ar: "رسالتك جاهزة" })}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-500">
          {L({
            en: "Choose a channel below. Your message is already filled in, just press send there.",
            ar: "اختر قناتك أدناه. رسالتك معبأة مسبقًا، فقط اضغط إرسال هناك.",
          })}
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {hasWhatsApp && waSa && (
            <a href={waSa} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#23a55b] text-white px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
              <FlagSA className="w-4.5 h-4.5" /> WhatsApp · KSA
            </a>
          )}
          {hasWhatsApp && waEg && (
            <a href={waEg} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#23a55b] text-white px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
              <FlagEG className="w-4.5 h-4.5" /> WhatsApp · Egypt
            </a>
          )}
        </div>
        {hasEmail && em && (
          <a href={em} className="mt-3 inline-flex items-center justify-center gap-2.5 w-full border border-ink-900/25 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-900 hover:bg-ink-900 hover:text-amber-400 transition-all">
            <Icon name="mail" className="w-4 h-4" /> {L({ en: "Send by Email", ar: "إرسال بالبريد" })}
          </a>
        )}
        <button
          onClick={() => { setDone(false); setForm(EMPTY); }}
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500 hover:text-amber-700 transition-colors cursor-pointer"
        >
          {L({ en: "Write another message", ar: "كتابة رسالة أخرى" })}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-ink-900/15 bg-paper-50 p-7 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={label}>{L({ en: "Name", ar: "الاسم" })} *</label>
          <input id="cf-name" value={form.name} onChange={set("name")} className={field} autoComplete="name" />
          {errors.name && <p className={err} role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{L({ en: "Email", ar: "البريد الإلكتروني" })} *</label>
          <input id="cf-email" type="email" value={form.email} onChange={set("email")} className={field} autoComplete="email" dir="ltr" />
          {errors.email && <p className={err} role="alert">{errors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-company" className={label}>{L({ en: "Company (optional)", ar: "الشركة (اختياري)" })}</label>
          <input id="cf-company" value={form.company} onChange={set("company")} className={field} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>{L({ en: "Subject", ar: "الموضوع" })}</label>
          <input id="cf-subject" value={form.subject} onChange={set("subject")} className={field} placeholder={lang === "ar" ? "مثال: شبكة الفرع" : "e.g. Branch network"} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>{L({ en: "Message", ar: "الرسالة" })} *</label>
        <textarea id="cf-message" rows={5} value={form.message} onChange={set("message")} className={`${field} resize-y`} />
        {errors.message && <p className={err} role="alert">{errors.message}</p>}
      </div>
      <button type="submit" className="group inline-flex items-center gap-3 chamfer-sm bg-amber-500 text-ink-950 px-6 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] hover:bg-amber-400 transition-all duration-300 active:scale-[0.97] cursor-pointer">
        {L({ en: "Send Message", ar: "إرسال الرسالة" })}
        <Icon name="send" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
      </button>
    </form>
  );
}

/* ---------------- page ---------------- */
export function Contact() {
  const { L, isAr } = useLang();
  usePageMeta(
    isAr ? "تواصل معي | TECH OF THE WORLD" : "Contact Me | TECH OF THE WORLD",
    isAr
      ? "تواصل مع يوسف أحمد عبر واتساب (السعودية ومصر) أو البريد الإلكتروني."
      : "Reach Yousef Ahmed via WhatsApp (Saudi Arabia & Egypt) or email."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "تواصل" : "Contact"}
        title={{ en: "Let's talk.", ar: "لنتحدث." }}
        lead={{
          en: "If you have an IT problem, an environment to assess, or a project to plan, tell me about it. I reply personally, usually the same day.",
          ar: "لو عندك مشكلة تقنية، أو بيئة تريد تقييمها، أو مشروع تخطط له، أخبرني. أرد بنفسي، عادة في نفس اليوم.",
        }}
      />

      <section className="bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* contact information */}
          <div>
            <Reveal className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-amber-600" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{isAr ? "بيانات التواصل" : "Contact Information"}</span>
            </Reveal>
            <div className="space-y-4">
              <Reveal>
                <a
                  href={waLink(isAr ? "مرحبًا يوسف، أحتاج دعمًا تقنيًا في السعودية." : "Hello Yousef, I need IT support in Saudi Arabia.", "sa")}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border border-ink-900/15 bg-paper-50 px-5 py-4 hover:border-amber-600/60 transition-colors"
                >
                  <FlagSA className="w-7 h-7 shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">WhatsApp · {isAr ? "السعودية" : "Saudi Arabia"}</span>
                    <span className="block font-display font-semibold text-[15px] text-ink-900 mt-0.5" dir="ltr">{CONTACT.displaySA}</span>
                  </span>
                  <Icon name="wa" className="w-5 h-5 text-[#23a55b] shrink-0" />
                </a>
              </Reveal>
              <Reveal delay={70}>
                <a
                  href={waLink(isAr ? "مرحبًا يوسف، أحتاج دعمًا تقنيًا في مصر." : "Hello Yousef, I need IT support in Egypt.", "eg")}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border border-ink-900/15 bg-paper-50 px-5 py-4 hover:border-amber-600/60 transition-colors"
                >
                  <FlagEG className="w-7 h-7 shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">WhatsApp · {isAr ? "مصر" : "Egypt"}</span>
                    <span className="block font-display font-semibold text-[15px] text-ink-900 mt-0.5" dir="ltr">{CONTACT.displayEG}</span>
                  </span>
                  <Icon name="wa" className="w-5 h-5 text-[#23a55b] shrink-0" />
                </a>
              </Reveal>
              <Reveal delay={140}>
                <a
                  href={mailLink("Hello Yousef", "") ?? "#"}
                  className="group flex items-center gap-4 border border-ink-900/15 bg-paper-50 px-5 py-4 hover:border-amber-600/60 transition-colors"
                >
                  <span className="w-7 h-7 grid place-items-center shrink-0 bg-ink-900 text-amber-500"><Icon name="mail" className="w-4 h-4" /></span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">Email</span>
                    <span className="block font-display font-semibold text-[14px] text-ink-900 mt-0.5 break-all">{CONTACT.email}</span>
                  </span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={200} className="mt-8 text-[13px] leading-relaxed text-mist-500 max-w-sm">
              {L({
                en: "Prefer a direct call? The WhatsApp numbers above also take regular calls. I work in Arabic and English.",
                ar: "تفضل مكالمة مباشرة؟ أرقام واتساب أعلاه تستقبل مكالمات عادية أيضًا. أعمل بالعربية والإنجليزية.",
              })}
            </Reveal>
            <Reveal delay={240} className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
              <a href={telHref("sa")} className="hover:text-amber-700 transition-colors" dir="ltr"><Icon name="phone" className="w-3.5 h-3.5 inline me-1.5 -mt-0.5" />{CONTACT.displaySA}</a>
              <span className="text-ink-900/25">·</span>
              <a href={telHref("eg")} className="hover:text-amber-700 transition-colors" dir="ltr">{CONTACT.displayEG}</a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* business card */}
      <section className="bg-paper-50 text-ink-900 border-t border-ink-900/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="text-center mb-10">
            <Reveal line as="h2">
              <span className="font-display text-2xl font-bold">{isAr ? "احفظ بياناتي في هاتفك" : "Keep my details on your phone"}</span>
            </Reveal>
            <Reveal as="p" delay={80} className="mt-2.5 text-[13.5px] text-mist-500">
              {isAr ? "بطاقة تواصل واحدة، تعمل بضغطة." : "One contact card, one tap."}
            </Reveal>
          </div>
          <BusinessCard />
        </div>
      </section>
    </>
  );
}
