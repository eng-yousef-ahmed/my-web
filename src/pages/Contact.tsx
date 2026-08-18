import React from "react";
import { useLang, usePageMeta } from "../i18n";
import { CONFIG, hasEmail, hasWhatsApp, mailLink, waLink } from "../config";
import { FAQS } from "../data/content";
import { Btn, FaqList, Icon, PageHero, Reveal } from "../components/kit";
import { ServiceRequestForm } from "../components/ServiceRequestForm";

export function Contact() {
  const { t, isAr } = useLang();
  usePageMeta(
    isAr ? "تواصل معنا | TECH OF THE WORLD" : "Contact | TECH OF THE WORLD — Talk to an IT Specialist",
    "Reach TECH OF THE WORLD through WhatsApp, email or a structured service request — serving businesses in Saudi Arabia and Egypt."
  );
  const wa = waLink("Hello TECH OF THE WORLD — I would like to talk to an IT specialist.");

  return (
    <>
      <PageHero
        kicker={isAr ? "تواصل معنا" : "Contact"}
        title={{ en: "Talk to a person who has actually fixed it.", ar: "تحدّث مع شخص أصلحها فعلًا من قبل." }}
        lead={{
          en: "WhatsApp for speed, email for detail, or a structured request when you want it documented. Whatever you choose — a technical person answers, not a queue.",
          ar: "واتساب للسرعة، والبريد للتفاصيل، أو طلب منظم حين تريده موثقًا. أيًا كان اختيارك — يجيبك شخص تقني، لا طابور انتظار.",
        }}
      >
        <Btn to="/request">{t("nav.request")}</Btn>
      </PageHero>

      <section className="bg-paper-100 text-ink-900 grid-bg-light">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-3 gap-5">
            {/* whatsapp */}
            <Reveal>
              <div className="chamfer-sm bg-ink-900 text-paper-50 p-8 h-full flex flex-col">
                <span className="w-12 h-12 grid place-items-center bg-[#23a55b] text-white"><Icon name="wa" className="w-6 h-6" /></span>
                <h2 className="mt-5 font-display text-xl font-bold">WhatsApp</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-mist-300 flex-1">
                  {t("cta.urgent")} {isAr ? "أسرع طريق إلينا للمواقف الحرجة ولأي استفسار سريع." : "The fastest path for critical situations and quick questions."}
                </p>
                {wa ? (
                  <a href={wa} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5fd68f] hover:text-[#8ae6ab] transition-colors">
                    {t("cta.talkSpecialist")}
                    <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2} />
                  </a>
                ) : (
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500 border border-dashed border-ink-600 px-4 py-3">VITE_WHATSAPP_NUMBER</p>
                )}
              </div>
            </Reveal>
            {/* email */}
            <Reveal delay={90}>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-8 h-full flex flex-col">
                <span className="w-12 h-12 grid place-items-center bg-amber-500 text-ink-950"><Icon name="mail" className="w-6 h-6" /></span>
                <h2 className="mt-5 font-display text-xl font-bold">{isAr ? "البريد الإلكتروني" : "Email"}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-mist-500 flex-1">
                  {isAr ? "للمواصفات والمرفقات وكل ما يحتاج سجلًا مكتوبًا." : "For specifications, attachments and anything that needs a written trail."}
                </p>
                {hasEmail ? (
                  <a href={mailLink("IT Inquiry — TECH OF THE WORLD", "") ?? "#"} className="mt-6 inline-flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900 hover:text-amber-600 transition-colors break-all">
                    {CONFIG.email}
                  </a>
                ) : (
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500 border border-dashed border-ink-900/25 px-4 py-3">VITE_CONTACT_EMAIL</p>
                )}
              </div>
            </Reveal>
            {/* structured request */}
            <Reveal delay={180}>
              <div className="chamfer-sm bg-paper-50 border border-ink-900/12 p-8 h-full flex flex-col">
                <span className="w-12 h-12 grid place-items-center bg-ink-900 text-amber-500"><Icon name="doc" className="w-6 h-6" /></span>
                <h2 className="mt-5 font-display text-xl font-bold">{t("form.title")}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-mist-500 flex-1">
                  {isAr ? "نموذج منظم بنطاق الخدمة ودرجة الإلحاح — الأنسب لعروض الأسعار والمشاريع." : "A structured form with scope and urgency — best for quotes and projects."}
                </p>
                <Btn to="/request" variant="dark" className="mt-6 !px-5 !py-3 !text-[12px] self-start">{t("nav.request")}</Btn>
              </div>
            </Reveal>
          </div>

          {/* coverage */}
          <Reveal className="mt-10 chamfer bg-ink-900 text-paper-50 p-8 sm:p-10 grid md:grid-cols-3 gap-8 relative overflow-hidden noise">
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
            <ServiceRequestForm prefillService={prefill} />
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
                    {isAr ? "الأنظمة متوقفة الآن؟ واتساب هو الطريق الأسرع — اختر «حرج» في النموذج إذا كنت تفضل النموذج." : "Systems down right now? WhatsApp is the fastest route — or mark the form “Critical”."}
                  </p>
                  {hasWhatsApp ? (
                    <a href={waLink(t("cta.urgent")) ?? "#"} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2.5 chamfer-sm bg-[#23a55b] text-white px-5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] hover:brightness-110 transition-all">
                      <Icon name="wa" className="w-4.5 h-4.5" /> WhatsApp
                    </a>
                  ) : (
                    <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-500">{t("common.notConfigured")}</p>
                  )}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
