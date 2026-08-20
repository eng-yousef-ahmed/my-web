import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { CONTACT, hasEmail, mailLink, telHref, vCardDataUrl, waLink } from "../config";
import { FAQS } from "../data/content";
import { Btn, FaqList, FlagEG, FlagSA, Icon, PageHero, Reveal } from "../components/kit";
import { ServiceRequestForm } from "../components/ServiceRequestForm";

function WaCard({ market, delay }: { market: "sa" | "eg"; delay: number }) {
  const { isAr } = useLang();
  const sa = market === "sa";
  const wa = waLink(isAr ? `مرحبًا TECH OF THE WORLD — أحتاج دعمًا تقنيًا في ${sa ? "السعودية" : "مصر"}.` : `Hello TECH OF THE WORLD — I need IT support in ${sa ? "Saudi Arabia" : "Egypt"}.`, market);
  return (
    <Reveal delay={delay}>
      <div className="chamfer-sm bg-ink-900 text-paper-50 p-7 h-full flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          {sa ? <FlagSA className="w-9 h-9" /> : <FlagEG className="w-9 h-9" />}
          <span className="w-11 h-11 grid place-items-center bg-[#23a55b] text-white group-hover:scale-110 transition-transform duration-300">
            <Icon name="wa" className="w-5.5 h-5.5" />
          </span>
        </div>
        <h2 className="relative mt-5 font-display text-xl font-bold">
          WhatsApp · {sa ? (isAr ? "السعودية" : "Saudi Arabia") : isAr ? "مصر" : "Egypt"}
        </h2>
        <p className="relative mt-2 text-[13.5px] leading-relaxed text-mist-300 flex-1">
          {sa
            ? isAr ? "الدعم التقني والبنية التحتية والمشاريع داخل المملكة — عن بُعد وفي الموقع." : "IT support, infrastructure and projects across the Kingdom — remote and on-site."
            : isAr ? "الدعم التقني وبيئات مايكروسوفت والمراقبة للشركات في مصر — أونلاين وميداني." : "IT support, Microsoft environments and security systems for businesses in Egypt."}
        </p>
        <p className="relative mt-5 font-mono text-[15px] text-mist-200" dir="ltr">{sa ? CONTACT.displaySA : CONTACT.displayEG}</p>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="relative mt-4 inline-flex items-center justify-center gap-2.5 border border-[#23a55b] text-[#5fd68f] px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#23a55b] hover:text-white transition-all duration-300"
        >
          <Icon name="wa" className="w-4.5 h-4.5" />
          {isAr ? "ابدأ محادثة" : "Start a chat"}
        </a>
        <a
          href={telHref(market)}
          className="relative mt-3 inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400 hover:text-amber-400 transition-colors"
        >
          <Icon name="phone" className="w-3.5 h-3.5" />
          {isAr ? "أو اتصل مباشرة" : "Or call directly"}
        </a>
      </div>
    </Reveal>
  );
}

export function Contact() {
  const { t, isAr } = useLang();
  usePageMeta(
    isAr ? "تواصل معنا | TECH OF THE WORLD" : "Contact | TECH OF THE WORLD — Talk to an IT Specialist",
    "Reach TECH OF THE WORLD through WhatsApp (Saudi Arabia & Egypt), email or a structured service request — professional IT services for both markets."
  );

  return (
    <>
      <PageHero
        kicker={isAr ? "تواصل معنا" : "Contact"}
        title={{ en: "Talk to a person who has actually fixed it.", ar: "تحدّث مع شخص أصلحها فعلًا من قبل." }}
        lead={{
          en: "WhatsApp for speed — one number per market. Email for detail. A structured request when you want it documented. Whatever you choose, a technical person answers.",
          ar: "واتساب للسرعة — رقم لكل سوق. البريد للتفاصيل. أو طلب منظم حين تريده موثقًا. أيًا كان اختيارك، يجيبك شخص تقني.",
        }}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
        <Btn href={waLink("Hello TECH OF THE WORLD — I would like to talk to an IT specialist.")} variant="outline" arrow={false}>
          <Icon name="wa" className="w-5 h-5 text-[#3fbf6f]" /> {t("cta.talkSpecialist")}
        </Btn>
      </PageHero>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-3 gap-5">
            <WaCard market="sa" delay={0} />
            <WaCard market="eg" delay={90} />
            {/* email */}
            <Reveal delay={180}>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-7 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 grid place-items-center bg-ink-900 text-amber-500"><Icon name="mail" className="w-4.5 h-4.5" /></span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">24–48h</span>
                </div>
                <h2 className="mt-5 font-display text-xl font-bold">{isAr ? "البريد الإلكتروني" : "Email"}</h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist-500 flex-1">
                  {isAr ? "للمواصفات والمرفقات وكل ما يحتاج سجلًا مكتوبًا — نرد خلال يوم إلى يومين عمل." : "For specifications, attachments and anything that needs a written trail — answered within 1–2 business days."}
                </p>
                {hasEmail ? (
                  <>
                    <p className="mt-5 font-mono text-[13px] text-ink-800 break-all">{CONTACT.email}</p>
                    <a
                      href={mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? "#"}
                      className="mt-4 inline-flex items-center justify-center gap-2.5 border border-ink-900 px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-ink-900 hover:text-amber-400 transition-all duration-300"
                    >
                      <Icon name="mail" className="w-4.5 h-4.5" />
                      {isAr ? "أرسل بريدًا" : "Write to us"}
                    </a>
                  </>
                ) : (
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500 border border-dashed border-ink-900/25 px-4 py-3">VITE_CONTACT_EMAIL</p>
                )}
              </div>
            </Reveal>
          </div>

          {/* structured request + urgent strip */}
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <Reveal delay={220}>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-7 h-full flex items-center gap-6">
                <span className="hidden sm:grid w-12 h-12 shrink-0 place-items-center bg-amber-500 text-ink-950"><Icon name="doc" className="w-6 h-6" /></span>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold">{t("form.title")}</h2>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist-500">
                    {isAr ? "نموذج منظم بنطاق الخدمة ودرجة الإلحاح — الأنسب لعروض الأسعار والمشاريع." : "A structured form with scope and urgency — best for quotes and projects."}
                  </p>
                </div>
                <Btn to="/request" variant="dark" className="shrink-0 !px-5 !py-3 !text-[12px]">{isAr ? "افتح النموذج" : "Open form"}</Btn>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="chamfer-sm bg-red-950/90 border border-red-500/40 text-paper-50 p-7 h-full relative overflow-hidden noise">
                <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex-1">
                    <p className="flex items-center gap-2.5 font-display font-bold text-[17px] text-red-300">
                      <span className="relative flex w-2.5 h-2.5"><span className="absolute inline-flex w-full h-full rounded-full bg-red-400 pulse-ring" /><span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-red-500" /></span>
                      {t("cta.urgent")}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-red-200/80">
                      {isAr ? "الأنظمة متوقفة الآن؟ اتصل بواتساب السوق الأقرب إليك — أولوية فورية للبيئات المدعومة." : "Systems down right now? Hit the nearest market's WhatsApp — supported environments get immediate priority."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 shrink-0">
                    <a href={waLink("URGENT — " + t("cta.urgent"), "sa")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-400 text-white px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
                      <FlagSA className="w-5 h-5" /> <span dir="ltr">{CONTACT.displaySA}</span>
                    </a>
                    <a href={waLink("URGENT — " + t("cta.urgent"), "eg")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-400 text-white px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors">
                      <FlagEG className="w-5 h-5" /> <span dir="ltr">{CONTACT.displayEG}</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* coverage */}
          <Reveal className="mt-6 chamfer bg-ink-900 text-paper-50 p-8 sm:p-10 grid md:grid-cols-3 gap-8 relative overflow-hidden noise">
            <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
            {[
              { icon: "pin", k: isAr ? "التغطية" : "Coverage", v: isAr ? "السعودية ومصر — دعم عن بُعد في أي مكان، وتنفيذ ميداني حسب الموقع وطبيعة العمل." : "Saudi Arabia & Egypt — remote support anywhere; on-site delivery arranged per location and engagement." },
              { icon: "clock", k: isAr ? "الاستجابة" : "Response", v: isAr ? "أهداف الاستجابة تُتفق لكل عمل. القضايا الحرجة في البيئات المدعومة أولوية من أول رسالة." : "Response targets agreed per engagement. Critical issues on supported environments are priority from the first message." },
              { icon: "globe", k: isAr ? "اللغات" : "Languages", v: isAr ? "نعمل بالعربية والإنجليزية — توثيق وتسليم باللغتين عند الحاجة." : "We work in Arabic and English — documentation and delivery in both when needed." },
            ].map((row) => (
              <div key={row.k} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={row.icon} className="w-5 h-5 text-amber-500" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-500">{row.k}</p>
                </div>
                <p className="text-[14.5px] leading-relaxed text-mist-200">{row.v}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={vCardDataUrl()}
              download="tech-of-the-world.vcf"
              className="inline-flex items-center gap-3 border border-ink-900/25 px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:bg-ink-900 hover:text-amber-400 transition-all duration-300"
            >
              <Icon name="doc" className="w-4.5 h-4.5" />
              {isAr ? "احفظ بطاقة التواصل (vCard)" : "Save contact card (vCard)"}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
              {isAr ? "خطوط مباشرة:" : "Direct lines:"}
            </span>
            <a href={telHref("sa")} className="font-mono text-[13px] font-medium text-ink-800 hover:text-amber-600 transition-colors" dir="ltr">
              {CONTACT.displaySA}
            </a>
            <a href={telHref("eg")} className="font-mono text-[13px] font-medium text-ink-800 hover:text-amber-600 transition-colors" dir="ltr">
              {CONTACT.displayEG}
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0a66c2] hover:text-[#084d92] transition-colors"
            >
              <Icon name="linkedin" className="w-4.5 h-4.5" />
              {isAr ? "لينكدإن — يوسف أحمد" : "LinkedIn — Yousef Ahmed"}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-50 text-ink-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <Reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber-500" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-600">FAQ</span>
            </Reveal>
            <Reveal line as="h2" delay={80}>
              <span className="font-display text-3xl sm:text-4xl font-bold leading-tight">{t("misc.faq")}</span>
            </Reveal>
            <Btn to="/request" variant="dark" className="mt-8">{t("nav.request")}</Btn>
          </div>
          <Reveal delay={120}>
            <FaqList faqs={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Request() {
  const { t, isAr } = useLang();
  usePageMeta(
    isAr ? "اطلب خدمة تقنية | TECH OF THE WORLD" : "Request IT Service | TECH OF THE WORLD",
    "Request IT support, infrastructure, networks, Microsoft & cloud, CCTV or consultancy — serving Saudi Arabia and Egypt. Response via WhatsApp or email."
  );
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const prefill = params.get("service") ?? undefined;
  const rawCountry = params.get("country") ?? "";
  const prefillCountry =
    rawCountry === "Saudi Arabia" || rawCountry === "Egypt" ? rawCountry : undefined;
  const context = params.get("context") ?? undefined;

  return (
    <>
      <PageHero
        kicker={isAr ? "طلب خدمة" : "Service Request"}
        title={{ en: "Tell us the problem. We'll bring the plan.", ar: "أخبرنا بالمشكلة. نحن نأتي بالخطة." }}
        lead={{
          en: "One structured request is enough — service line, urgency and a plain-language description. We reply through the channel you prefer.",
          ar: "طلب منظم واحد يكفي — مسار الخدمة ودرجة الإلحاح ووصف بلغة بسيطة. نرد عبر القناة التي تفضلها.",
        }}
      />
      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20 grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div className="chamfer bg-ink-950 p-3 sm:p-4">
            <ServiceRequestForm prefillService={prefill} prefillCountry={prefillCountry} context={context} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-32">
            <Reveal>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-7">
                <h2 className="font-display text-lg font-bold">{isAr ? "ماذا يحدث بعد الإرسال؟" : "What happens next?"}</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    { en: "A technical person reviews your requirement — not an auto-responder.", ar: "شخص تقني يراجع طلبك — لا رد آلي." },
                    { en: "We clarify scope with you on WhatsApp or email.", ar: "نوضح معك النطاق عبر واتساب أو البريد." },
                    { en: "You receive a clear quotation or assessment proposal.", ar: "يصلك عرض سعر واضح أو مقترح تقييم." },
                  ].map((s, i) => (
                    <li key={s.en} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 grid place-items-center bg-ink-900 text-amber-500 font-mono text-[11px]">0{i + 1}</span>
                      <span className="text-[14px] leading-relaxed text-mist-500 pt-1">{isAr ? s.ar : s.en}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="chamfer-sm bg-ink-900 text-paper-50 p-7 relative overflow-hidden noise">
                <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                <div className="relative">
                  <p className="flex items-center gap-2.5 font-display font-bold text-red-400">
                    <Icon name="alert" className="w-5 h-5" /> {t("cta.urgent")}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-300">
                    {isAr ? "الأنظمة متوقفة الآن؟ واتساب هو الطريق الأسرع — أو اختر «حرج» في النموذج." : "Systems down right now? WhatsApp is the fastest route — or mark the form “Critical”."}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a href={waLink("URGENT — " + t("cta.urgent"), "sa")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 chamfer-sm bg-[#23a55b] text-white px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
                      <FlagSA className="w-4.5 h-4.5" /> <span dir="ltr">{CONTACT.displaySA}</span>
                    </a>
                    <a href={waLink("URGENT — " + t("cta.urgent"), "eg")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2.5 chamfer-sm border border-ink-600 text-mist-200 px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:border-[#23a55b] hover:text-[#5fd68f] transition-all">
                      <FlagEG className="w-4.5 h-4.5" /> <span dir="ltr">{CONTACT.displayEG}</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
