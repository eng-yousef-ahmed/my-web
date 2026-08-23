import React, { useEffect, useState } from "react";
import { useLang, usePageMeta, usePrefersReducedMotion } from "../i18n";
import { CONFIG, CONTACT, hasEmail, hasWhatsApp, mailLink, vCardDataUrl, waLink } from "../config";
import { FlagEG, FlagSA, Icon, Reveal } from "../components/kit";
import { ContactPortrait } from "../components/profile/ContactPortrait";

/* ======================================================================
   CONTACT — "Let's work together."
   A personal invitation, not a corporate form. The emotional arc is:
   SEE ME → WHAT WE CAN TALK ABOUT → CHOOSE A CHANNEL → SEND A MESSAGE.
   ====================================================================== */

/* ---------------- conversation topics (pre-fill the form subject) ---------------- */
type Topic = { id: string; title: { en: string; ar: string }; tags: { en: string; ar: string }; subject: { en: string; ar: string } };

const TOPICS: Topic[] = [
  {
    id: "support",
    title: { en: "Technical Support", ar: "دعم تقني" },
    tags: { en: "IT Support · Troubleshooting · Maintenance", ar: "دعم تقنية المعلومات · استكشاف الأعطال · الصيانة" },
    subject: { en: "Technical Support", ar: "دعم تقني" },
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", ar: "البنية التحتية" },
    tags: { en: "Networks · Servers · Microsoft · Systems", ar: "الشبكات · الخوادم · مايكروسوفت · الأنظمة" },
    subject: { en: "Infrastructure", ar: "البنية التحتية" },
  },
  {
    id: "project",
    title: { en: "Project", ar: "مشروع" },
    tags: { en: "Infrastructure · CCTV · Network Deployment", ar: "بنية تحتية · كاميرات مراقبة · نشر الشبكات" },
    subject: { en: "Project", ar: "مشروع" },
  },
  {
    id: "opportunity",
    title: { en: "Opportunity", ar: "فرصة" },
    tags: { en: "Career · Collaboration · Professional Opportunity", ar: "مسار مهني · تعاون · فرصة مهنية" },
    subject: { en: "Opportunity", ar: "فرصة مهنية" },
  },
];

/* ---------------- contact channels (each appears exactly once) ---------------- */
function useChannels() {
  const { isAr, L } = useLang();
  return [
    {
      id: "wa-sa",
      method: { en: "WhatsApp", ar: "واتساب" },
      scope: { en: "Saudi Arabia", ar: "السعودية" },
      value: CONTACT.displaySA,
      href: waLink(isAr ? "مرحبًا يوسف، أود التواصل معك." : "Hello Yousef, I'd like to get in touch.", "sa"),
      external: true,
      flag: <FlagSA className="w-5 h-5" />,
      icon: "wa",
    },
    {
      id: "wa-eg",
      method: { en: "WhatsApp", ar: "واتساب" },
      scope: { en: "Egypt", ar: "مصر" },
      value: CONTACT.displayEG,
      href: waLink(isAr ? "مرحبًا يوسف، أود التواصل معك." : "Hello Yousef, I'd like to get in touch.", "eg"),
      external: true,
      flag: <FlagEG className="w-5 h-5" />,
      icon: "wa",
    },
    {
      id: "email",
      method: { en: "Email", ar: "البريد الإلكتروني" },
      scope: { en: "Written & detailed", ar: "مكتوب ومفصّل" },
      value: CONTACT.email,
      href: mailLink("Hello Yousef", "") ?? "#",
      external: false,
      icon: "mail",
    },
    {
      id: "linkedin",
      method: { en: "LinkedIn", ar: "لينكدإن" },
      scope: { en: "Professional profile", ar: "الملف المهني" },
      value: `/${CONTACT.linkedinHandle}`,
      href: CONTACT.linkedin,
      external: true,
      icon: "linkedin",
    },
  ].map((c) => ({ ...c, methodLabel: L(c.method), scopeLabel: L(c.scope) }));
}

/* ---------------- compact form (validates, then hands off via WhatsApp / email) ---------------- */
type FormState = { name: string; email: string; subject: string; message: string };
const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

function ContactForm({ seedSubject }: { seedSubject: string }) {
  const { L, isAr } = useLang();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  /* when a conversation topic is chosen, pre-fill the subject */
  useEffect(() => {
    if (seedSubject) setForm((f) => ({ ...f, subject: seedSubject }));
  }, [seedSubject]);

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
      er.message = L({ en: "Tell me a little more (10+ characters).", ar: "أخبرني المزيد (١٠ أحرف على الأقل)." });
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
      `${L({ en: "Subject", ar: "الموضوع" })}: ${form.subject || L({ en: "General", ar: "عام" })}`,
      "",
      form.message,
      "",
      `(${CONFIG.brand} — ${CONTACT.website})`,
    ].join("\n");

  const field =
    "w-full bg-transparent border-b border-ink-900/25 px-1 py-3 text-[15px] text-ink-900 placeholder:text-mist-400 focus:border-amber-600 focus:outline-none transition-colors";
  const label = "block font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500";
  const err = "mt-1.5 text-[12px] text-red-600";

  if (done) {
    const waSa = waLink(summary(), "sa");
    const waEg = waLink(summary(), "eg");
    const em = mailLink(form.subject || "Hello Yousef", summary());
    return (
      <div className="border border-ink-900/15 bg-paper-50 p-8">
        <p className="flex items-center gap-3 font-display text-lg font-bold text-ink-900">
          <Icon name="check" className="w-5 h-5 text-amber-600" strokeWidth={2.2} />
          {L({ en: "Your message is ready", ar: "رسالتك جاهزة" })}
        </p>
        <p className="mt-2.5 text-[14px] leading-relaxed text-mist-500">
          {L({
            en: "Pick a channel below — your message is already filled in, just press send there.",
            ar: "اختر قناتك أدناه — رسالتك معبأة مسبقًا، فقط اضغط إرسال هناك.",
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
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <label htmlFor="cf-name" className={label}>01 / {L({ en: "Name", ar: "الاسم" })} *</label>
          <input id="cf-name" value={form.name} onChange={set("name")} className={field} autoComplete="name" placeholder={isAr ? "اسمك" : "Your name"} />
          {errors.name && <p className={err} role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>02 / {L({ en: "Email", ar: "البريد الإلكتروني" })} *</label>
          <input id="cf-email" type="email" value={form.email} onChange={set("email")} className={field} autoComplete="email" dir="ltr" placeholder="you@company.com" />
          {errors.email && <p className={err} role="alert">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className={label}>03 / {L({ en: "Subject", ar: "الموضوع" })}</label>
        <input id="cf-subject" value={form.subject} onChange={set("subject")} className={field} placeholder={isAr ? "عمّ نتحدث؟" : "What's this about?"} />
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>04 / {L({ en: "Message", ar: "الرسالة" })} *</label>
        <textarea id="cf-message" rows={5} value={form.message} onChange={set("message")} className={`${field} resize-y`} placeholder={isAr ? "أخبرني عن المشروع أو المشكلة أو الفكرة…" : "Tell me about the project, problem or idea…"} />
        {errors.message && <p className={err} role="alert">{errors.message}</p>}
      </div>
      <button type="submit" className="group inline-flex items-center gap-3 bg-amber-500 text-ink-950 px-7 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.14em] hover:bg-amber-400 transition-colors active:scale-[0.98] cursor-pointer">
        {L({ en: "Send Message", ar: "إرسال الرسالة" })}
        <Icon name="send" className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
      </button>
    </form>
  );
}

/* ---------------- the page ---------------- */
export function Contact() {
  const { L, isAr } = useLang();
  const reduced = usePrefersReducedMotion();
  const channels = useChannels();
  const [seedSubject, setSeedSubject] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  usePageMeta(
    isAr ? "تواصل معي | TECH OF THE WORLD" : "Contact Me | TECH OF THE WORLD",
    isAr
      ? "لديك مشروع، تحدٍ تقني، أو فرصة مهنية؟ لنتحدث. تواصل مع يوسف أحمد عبر واتساب أو البريد أو لينكدإن."
      : "Have a project, technical challenge, or professional opportunity? Let's talk. Reach Yousef Ahmed via WhatsApp, email or LinkedIn."
  );

  const pickTopic = (t: Topic) => {
    setSeedSubject(L(t.subject));
    setActiveTopic(t.id);
    document.getElementById("tell-me")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {/* ============ 01 — HERO : the invitation ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden noise">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 55% at 78% 30%, rgba(233,163,59,0.07), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-32 lg:pt-40 pb-14">
          <Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[10.5px] uppercase tracking-[0.24em] text-mist-400">
            <span className="text-amber-500">{L({ en: "Contact / 01", ar: "تواصل / 01" })}</span>
            <span className="hidden sm:flex items-center gap-6">
              <span className="flex items-center gap-2"><span className="w-1 h-1 bg-amber-500 rotate-45" aria-hidden="true" />{L({ en: "Location · SA / EG", ar: "الموقع · سعودية / مصر" })}</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#3fbf6f] led" aria-hidden="true" />{L({ en: "Status · Available", ar: "الحالة · متاح" })}</span>
            </span>
          </Reveal>

          <Reveal line as="h1" delay={100} className="mt-10">
            <span className="block font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.6rem,7vw,5rem)]">
              {isAr ? "لنعمل معًا." : (<>Let's work <span className="text-amber-500">together.</span></>)}
            </span>
          </Reveal>

          <Reveal as="p" delay={220} className="mt-6 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-mist-300">
            {isAr
              ? "لديك مشروع، تحدٍ تقني، أو فرصة مهنية؟ لنتحدث."
              : "Have a project, a technical challenge, or a professional opportunity? Let's talk."}
          </Reveal>
        </div>
      </section>

      {/* ============ 02 — SEE ME : portrait + signature ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden border-t border-ink-700">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
          {/* portrait — physically LEFT in LTR & RTL */}
          <Reveal delay={120} className="rtl:lg:order-2 relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <div className="absolute -inset-3 border border-ink-700 translate-x-3 translate-y-3" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <ContactPortrait eager className="h-full w-full object-cover object-[50%_14%]" />
              {/* blend + rim + vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink-950/70" aria-hidden="true" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" aria-hidden="true" />
            </div>
          </Reveal>

          {/* signature + readout — physically RIGHT */}
          <div className="rtl:lg:order-1">
            <Reveal className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-amber-500">
              {L({ en: "The person behind the keyboard", ar: "الشخص خلف لوحة المفاتيح" })}
            </Reveal>
            <Reveal line as="h2" delay={90} className="mt-4">
              <span className="block font-display text-3xl sm:text-4xl font-bold tracking-tight">Yousef Ahmed</span>
            </Reveal>
            <Reveal delay={170} className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-mist-300">
              {L({ en: "Senior IT Support Specialist", ar: "أخصائي دعم تقني أول" })}
            </Reveal>
            <Reveal delay={240} className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400">
              <span>Saudi Arabia</span>
              <span className="w-1 h-1 bg-amber-500 rotate-45" aria-hidden="true" />
              <span>Egypt</span>
            </Reveal>
            <Reveal as="p" delay={310} className="mt-7 max-w-md text-[14.5px] leading-relaxed text-mist-300">
              {isAr
                ? "أعمل بالعربية والإنجليزية، وأرد بنفسي على كل رسالة — سواء كانت عطلًا طارئًا أو فكرة مشروع."
                : "I work in Arabic and English, and I read every message myself — whether it's an urgent outage or a project idea."}
            </Reveal>
            <Reveal delay={380} className="mt-8 grid grid-cols-2 gap-px bg-ink-700 border border-ink-700 max-w-sm">
              {[
                { k: isAr ? "الاستجابة" : "Response", v: isAr ? "عادةً خلال يوم" : "Usually within a day" },
                { k: isAr ? "اللغات" : "Languages", v: isAr ? "عربي · English" : "Arabic · English" },
              ].map((it) => (
                <div key={it.k} className="bg-ink-950 px-4 py-3.5">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist-500">{it.k}</p>
                  <p className="mt-1 text-[13px] font-medium text-paper-50">{it.v}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 03 — WHAT CAN WE TALK ABOUT? ============ */}
      <section className="relative bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <Reveal className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-amber-600" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{L({ en: "Topics", ar: "المواضيع" })}</span>
          </Reveal>
          <Reveal line as="h2" delay={80}>
            <span className="block font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {isAr ? "عمّ نتحدث؟" : "What can we talk about?"}
            </span>
          </Reveal>
          <Reveal as="p" delay={150} className="mt-3 text-[14px] text-mist-500 max-w-xl">
            {isAr
              ? "اختر أقرب موضوع لك — سأجهّز لك النموذج تلقائيًا."
              : "Pick the closest one — I'll pre-fill the form for you."}
          </Reveal>

          <div className="mt-12 border-t border-ink-900/12">
            {TOPICS.map((t, i) => (
              <Reveal key={t.id} delay={i * 70}>
                <button
                  onClick={() => pickTopic(t)}
                  aria-pressed={activeTopic === t.id}
                  className={`group w-full text-start grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 py-7 border-b border-ink-900/12 transition-all duration-300 cursor-pointer ${
                    activeTopic === t.id ? "bg-ink-900 text-paper-50" : "hover:bg-paper-50"
                  }`}
                >
                  <span className={`w-12 sm:w-16 font-mono text-[13px] transition-colors ${activeTopic === t.id ? "text-amber-500" : "text-ink-900/35 group-hover:text-amber-600"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-display text-lg sm:text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 ${activeTopic === t.id ? "text-paper-50" : "text-ink-900"}`}>
                      {L(t.title)}
                    </span>
                    <span className={`mt-1 block font-mono text-[10.5px] uppercase tracking-[0.16em] ${activeTopic === t.id ? "text-mist-400" : "text-mist-500"}`}>
                      {L(t.tags)}
                    </span>
                  </span>
                  <span className={`hidden sm:grid w-10 h-10 place-items-center border transition-all duration-300 ${activeTopic === t.id ? "border-amber-500 text-amber-500" : "border-ink-900/20 text-ink-900/40 group-hover:border-amber-600 group-hover:text-amber-600"}`}>
                    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2} />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04 — CHOOSE YOUR CHANNEL ============ */}
      <section className="relative bg-ink-950 text-paper-50 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">{L({ en: "Channels / 04", ar: "القنوات / 04" })}</span>
              </Reveal>
              <Reveal line as="h2" delay={80}>
                <span className="block font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {isAr ? "اختر طريقة التواصل." : "Choose your channel."}
                </span>
              </Reveal>
            </div>
            <Reveal delay={150} className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500">
              {L({ en: "Direct · No middlemen", ar: "مباشر · بلا وسطاء" })}
            </Reveal>
          </div>

          <div className="mt-12 border-t border-ink-700">
            {channels.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: c.id === "linkedin" ? "noopener noreferrer" : "noreferrer" } : {})}
                  aria-label={`${c.methodLabel} — ${c.scopeLabel}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 py-6 border-b border-ink-700 border-s-2 border-s-transparent hover:border-s-amber-500 hover:bg-ink-900/70 transition-all duration-300 ps-2 sm:ps-4"
                >
                  <span className="w-12 sm:w-16 font-mono text-[13px] text-mist-500 group-hover:text-amber-500 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex items-center gap-4">
                    <span className="shrink-0 grid w-11 h-11 place-items-center border border-ink-600 text-mist-300 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
                      {c.icon === "wa" ? c.flag : <Icon name={c.icon} className="w-5 h-5" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[16px] font-bold tracking-tight">
                        {c.methodLabel} <span className="text-mist-500 font-medium">/ {c.scopeLabel}</span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[12px] text-mist-400 break-all" dir="ltr">{c.value}</span>
                    </span>
                  </span>
                  <Icon name="arrow" className="w-5 h-5 text-mist-500 group-hover:text-amber-500 transition-all duration-300 group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5" strokeWidth={2} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 05 — TELL ME ABOUT IT (form) ============ */}
      <section id="tell-me" className="relative bg-paper-100 text-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-amber-600" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-700">{L({ en: "Message", ar: "رسالة" })}</span>
            </Reveal>
            <Reveal line as="h2" delay={80}>
              <span className="block font-display text-2xl sm:text-3xl font-bold tracking-tight">
                {isAr ? "احكِ لي عن الموضوع." : "Tell me about it."}
              </span>
            </Reveal>
            <Reveal as="p" delay={150} className="mt-4 text-[14.5px] leading-relaxed text-mist-500 max-w-sm">
              {isAr
                ? "احكِ لي عن المشروع أو المشكلة أو الفكرة، وسأتواصل معك."
                : "Tell me what you're working on, and I'll get back to you."}
            </Reveal>
            <Reveal delay={220} className="mt-8 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-500">
              <Icon name="clock" className="w-4 h-4 text-amber-600" />
              {L({ en: "Avg. response — within one working day", ar: "متوسط الرد — خلال يوم عمل" })}
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="border border-ink-900/12 bg-paper-50 p-7 sm:p-10">
              <ContactForm seedSubject={seedSubject} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 06 — SAVE CONTACT (small utility) ============ */}
      <section className="relative bg-ink-950 text-paper-50 border-t border-ink-700 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Reveal className="flex items-center gap-5">
            <span className="shrink-0 grid w-12 h-12 place-items-center border border-ink-600 text-amber-500">
              <Icon name="doc" className="w-5 h-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold tracking-tight">{L({ en: "Save Contact", ar: "احفظ جهة التواصل" })}</span>
              <span className="mt-1 block text-[13px] text-mist-400">{L({ en: "Keep my details with you.", ar: "احفظ بيانات التواصل معي." })}</span>
            </span>
          </Reveal>
          <Reveal delay={100}>
            <a
              href={vCardDataUrl()}
              download="yousef-ahmed.vcf"
              className="group inline-flex items-center gap-3 border border-ink-600 px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 hover:border-amber-500 hover:text-amber-500 transition-colors"
            >
              {L({ en: "Save Contact", ar: "احفظ جهة التواصل" })}
              <Icon name="chevron" className="w-4 h-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
