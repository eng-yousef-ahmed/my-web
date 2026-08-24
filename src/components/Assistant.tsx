import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, usePrefersReducedMotion } from "../i18n";
import { CONTACT, CV_FILES, waLink } from "../config";
import { Icon } from "./kit";

/* ================= Batata — the potato robot assistant ================= */

type Msg = { from: "bot" | "user"; html: string; actions?: Action[] };
type Action = { label: string; to?: string; wa?: "sa" | "eg"; dl?: string };
type Mood = "idle" | "happy" | "talking" | "thinking" | "urgent" | "dance";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ً-ْ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");

const has = (n: string, keys: string[]) => keys.some((k) => n.includes(norm(k)));

const STR = {
  ar: {
    online: "متصل الآن، يرد في ثواني",
    greeting:
      "أهلًا! أنا <b>بطاطا</b>، مساعد المهندس يوسف أحمد الذكي. اسألني عن الخدمات أو الخبرة أو طرق التواصل.",
    placeholder: "اكتب سؤالك هنا…",
    send: "إرسال",
    sugg: ["ما هي خدماتك؟", "كم خبرة يوسف؟", "كيف أتواصل معك؟", "ابعتلي السيرة الذاتية"],
    servicesTitle: "أعمل عبر خمسة مسارات:",
    services: [
      "تقنية المعلومات والبنية التحتية",
      "الشبكات (LAN / WAN / Wi-Fi / VPN)",
      "مايكروسوفت والسحابة (ويندوز سيرفر · AD · M365)",
      "أنظمة الأمن والمراقبة (CCTV · بصمة · تحكم دخول)",
      "الاستشارات التقنية",
    ] as [string, string, string, string, string],
    experience:
      "خبرة <b>+9 سنوات</b> عملية: دعم أكثر من <b>500 مستخدم</b> و<b>500 جهاز</b> في بيئات مؤسسية بالسعودية ومصر، مع خفض الأعطال المتكررة <b>50–65%</b>.",
    contact:
      "أسهل طريق: <b>واتساب</b> للسعودية أو مصر، أو البريد الإلكتروني. كل التفاصيل في صفحة التواصل.",
    cvReply: "أكيد! دي السيرة الذاتية للمهندس يوسف أحمد، حمّلها بالنسخة اللي تناسبك:",
    handoff: "تمام! جهزتلك رسالة واتساب فيها ملخص كلامنا، بس اضغط إرسال هناك.",
    unknown: "مش متأكد فهمتك 100%، بس دي أشهر المواضيع اللي بساعد فيها:",
    nameAsked: "أنا <b>بطاطا</b>! روبوت صغير شغال مع المهندس يوسف، حافظ خدماته عن ظهر قلب ومهمتي أوصلك له بسرعة.",
    thanks: "العفو! ده شغلي. اسألني أي حاجة تانية!",
    moodHappy: "متصل الآن، يرد في ثواني",
    moodThinking: "بيفكر…",
    moodUrgent: "وضع الطوارئ!",
    moodDance: "في نوبة فرح",
    urgent: "لو حالتك عاجلة، أسرع طريق هو <b>واتساب مباشر</b>:",
    goWhatsapp: "واتساب مباشر",
    goContact: "صفحة التواصل",
    goProjects: "المشاريع",
  },
  en: {
    online: "Online, replies in seconds",
    greeting:
      "Hi! I'm <b>Batata</b>, Eng. Yousef Ahmed's smart assistant. Ask me about services, experience or how to get in touch.",
    placeholder: "Type your question…",
    send: "Send",
    sugg: ["What do you do?", "How experienced are you?", "How can I reach you?", "Send me the CV"],
    servicesTitle: "I work across five lines:",
    services: [
      "IT & Infrastructure",
      "Networks (LAN / WAN / Wi-Fi / VPN)",
      "Microsoft & Cloud (Windows Server · AD · M365)",
      "Security Systems (CCTV · biometrics · access control)",
      "IT Consultancy",
    ] as [string, string, string, string, string],
    experience:
      "<b>9+ years</b> hands-on: supporting <b>500+ users</b> and <b>500+ endpoints</b> in enterprise environments across Saudi Arabia and Egypt, cutting recurring incidents by <b>50–65%</b>.",
    contact:
      "Easiest way: <b>WhatsApp</b> for Saudi Arabia or Egypt, or email. All details are on the contact page.",
    cvReply: "Of course! Here's Eng. Yousef Ahmed's CV. Grab the version that suits you:",
    handoff: "Great! I prepared a WhatsApp message with a summary of our chat. Just hit send there.",
    unknown: "I'm not 100% sure I got that, but here are the topics I help with most:",
    nameAsked: "I'm <b>Batata</b>! A little robot working with Eng. Yousef. I know his services by heart and my job is to get you to him fast.",
    thanks: "Anytime! That's my job. Ask me anything else!",
    moodHappy: "Online, replies in seconds",
    moodThinking: "Thinking…",
    moodUrgent: "Emergency mode!",
    moodDance: "In a happy mood",
    urgent: "If it's urgent, the fastest route is <b>direct WhatsApp</b>:",
    goWhatsapp: "Direct WhatsApp",
    goContact: "Contact page",
    goProjects: "Projects",
  },
};

/* ================= the sprite ================= */
function BotSprite({ mood, track, className = "w-16 h-16" }: { mood: Mood; track?: { x: number; y: number } | null; className?: string }) {
  const waving = mood === "happy" || mood === "talking" || mood === "dance";
  const urgent = mood === "urgent";
  const eyeFill = urgent ? "#ff9b8e" : mood === "thinking" ? "#e8b96a" : "#aef3e4";
  const dx = track ? Math.max(-2.2, Math.min(2.2, (track.x - 0.5) * 4)) : 0;
  const dy = track ? Math.max(-1.6, Math.min(1.6, (track.y - 0.5) * 3)) : 0;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g className={mood === "dance" ? "bot-dance" : ""}>
        <g className="bot-float">
          <path d="M60 22 V10" stroke="#8f5a12" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="7.5" r="6.5" fill={urgent ? "#ff6b5e" : "#e9a33b"} opacity="0.22" className={mood === "thinking" || urgent ? "bot-led fast" : "bot-led"} />
          <circle cx="60" cy="7.5" r="3.8" fill={urgent ? "#ff6b5e" : "#f0b35a"} className={mood === "thinking" || urgent ? "bot-led fast" : "bot-led"} />

          <g className={mood === "dance" ? "bot-wave" : ""} style={mood === "dance" ? { animationDirection: "reverse" } : undefined}>
            <path d="M24 64 q-10 5 -9 15" stroke="#c07f1c" strokeWidth="7.5" strokeLinecap="round" fill="none" />
          </g>
          <g className={waving ? "bot-wave" : ""}>
            <path d="M96 64 q10 5 9 15" stroke="#c07f1c" strokeWidth="7.5" strokeLinecap="round" fill="none" />
          </g>

          <path
            d="M60 20 c26 0 34 16 34 38 0 24 -12 42 -34 42 s-34 -18 -34 -42 c0 -22 8 -38 34 -38 Z"
            fill="#e9a33b"
            stroke="#8f5a12"
            strokeWidth="2.5"
          />
          <path d="M40 30 q10 -6 22 -4" stroke="#f6c77e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          <ellipse cx="36" cy="52" rx="5" ry="8" fill="#d18f2a" opacity="0.5" />
          <ellipse cx="86" cy="70" rx="4.5" ry="7" fill="#d18f2a" opacity="0.4" />

          <circle cx="46" cy="52" r="8.5" fill="#0a1420" />
          <circle cx="74" cy="52" r="8.5" fill="#0a1420" />
          <g className="bot-eye">
            <circle cx={46 + dx} cy={52 + dy} r="3.6" fill={eyeFill} />
          </g>
          <g className="bot-eye bot-eye-b">
            <circle cx={74 + dx} cy={52 + dy} r="3.6" fill={eyeFill} />
          </g>

          {mood === "talking" || mood === "happy" || mood === "dance" ? (
            <path d="M50 72 q10 10 20 0" stroke="#0a1420" strokeWidth="3.5" strokeLinecap="round" fill="none" className={mood === "talking" ? "bot-talk" : ""} />
          ) : mood === "urgent" ? (
            <path d="M52 76 q8 -6 16 0" stroke="#0a1420" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M53 74 h14" stroke="#0a1420" strokeWidth="3.5" strokeLinecap="round" />
          )}

          <rect x="47" y="84" width="26" height="12" rx="3" fill="#0a1420" opacity="0.85" />
          <text x="60" y="93.5" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="9" fill="#f0b35a">
            YA
          </text>
        </g>
      </g>
    </svg>
  );
}

/* ================= reply engine ================= */
function replyFor(raw: string, lang: "ar" | "en", market?: "sa" | "eg"): { html: string; actions?: Action[]; mood?: Mood } {
  const n = norm(raw);
  const s = STR[lang];
  const out: { html: string; actions?: Action[]; mood?: Mood } = { html: "" };
  const marketTarget: "sa" | "eg" = market ?? (has(n, ["مصر", "القاهره", "اسكندريه", "egypt", "cairo", "alex"]) ? "eg" : "sa");

  if (has(n, ["بطاطا", "batata"])) {
    out.html = s.nameAsked;
    out.mood = "dance";
    return out;
  }
  if (has(n, ["عاجل", "طوارئ", "urgent", "emergency", "عطل", "down", "حرج", "critical"])) {
    out.html = s.urgent;
    out.mood = "urgent";
    out.actions = [
      { label: `${s.goWhatsapp} 🇸🇦`, wa: "sa" },
      { label: `${s.goWhatsapp} 🇪🇬`, wa: "eg" },
    ];
    return out;
  }
  if (has(n, ["سيره", "cv", "resume"])) {
    out.html = s.cvReply;
    out.mood = "happy";
    out.actions = [
      { label: lang === "ar" ? "عربي PDF" : "Arabic PDF", dl: CV_FILES.ar },
      { label: lang === "ar" ? "إنجليزي PDF" : "English PDF", dl: CV_FILES.en },
    ];
    return out;
  }
  if (has(n, ["خدمات", "خدماتك", "بتعمل ايه", "service", "what do you do", "offer"])) {
    out.html =
      `<p class="mb-2">${s.servicesTitle}</p>` +
      s.services.map((x) => `<span class="bot-bullet"></span>${x}<br/>`).join("");
    out.actions = [{ label: s.goContact, to: "/services" }];
    return out;
  }
  if (has(n, ["خبره", "سنين", "experience", "years", "9", "كام سنه"])) {
    out.html = s.experience;
    out.actions = [{ label: s.goProjects, to: "/projects" }];
    return out;
  }
  if (has(n, ["تواصل", "اتصل", "واتساب", "ايميل", "بريد", "contact", "reach", "whatsapp", "email", "phone"])) {
    out.html = s.contact;
    out.actions = [
      { label: `${s.goWhatsapp} 🇸🇦`, wa: "sa" },
      { label: `${s.goWhatsapp} 🇪🇬`, wa: "eg" },
      { label: s.goContact, to: "/contact" },
    ];
    return out;
  }
  if (has(n, ["مشاريع", "شغل", "project", "work", "portfolio"])) {
    out.html = s.experience;
    out.actions = [{ label: s.goProjects, to: "/projects" }];
    return out;
  }
  if (has(n, ["مين انت", "اسمك", "who are you", "your name"])) {
    out.html = s.nameAsked;
    return out;
  }
  if (has(n, ["شكرا", "thanks", "thank you", "تسلم"])) {
    out.html = s.thanks;
    return out;
  }

  out.html = s.unknown;
  out.actions = [
    { label: s.goContact, to: "/contact" },
    { label: s.goProjects, to: "/projects" },
    { label: `${s.goWhatsapp}`, wa: marketTarget },
  ];
  return out;
}

/* ================= the assistant ================= */
export function Assistant() {
  const { lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const s = STR[lang];

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState<Mood>("idle");
  const [track, setTrack] = useState<{ x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const moodTimer = useRef<number>(0);

  useEffect(() => {
    if (!open) return;
    if (!booted.current) {
      booted.current = true;
      setMsgs([{ from: "bot", html: s.greeting }]);
      setMood("happy");
      return;
    }
    setMsgs((m) => (m.length ? m : [{ from: "bot", html: s.greeting }]));
  }, [open, s.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [msgs, typing, reduced]);

  /* eyes follow the cursor while idle */
  useEffect(() => {
    if (open || reduced) return;
    const onMove = (e: MouseEvent) => {
      setTrack({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [open, reduced]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMsgs((m) => [...m, { from: "user", html: clean.replace(/</g, "&lt;") }]);
    setInput("");
    setTyping(true);
    setMood("thinking");
    const reply = replyFor(clean, lang);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", html: reply.html, actions: reply.actions }]);
      setMood(reply.mood ?? "happy");
      window.clearTimeout(moodTimer.current);
      if (reply.mood === "dance" || reply.mood === "urgent") {
        moodTimer.current = window.setTimeout(() => setMood("happy"), 3200);
      }
    }, 650 + Math.random() * 500);
  };

  const waHref = (market: "sa" | "eg") =>
    waLink(
      lang === "ar"
        ? "مرحبًا يوسف، محوَّل من المساعد (بطاطا)."
        : "Hello Yousef, referred by the assistant (Batata).",
      market
    );

  const statusLine = typing ? s.moodThinking : mood === "urgent" ? s.moodUrgent : mood === "dance" ? s.moodDance : s.online;

  return (
    <>
      {/* launcher — the robot itself */}
      <div className="fixed bottom-6 end-6 z-[60]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? s.send : "Batata"}
          className="relative w-[74px] h-[74px] grid place-items-center cursor-pointer drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <BotSprite mood={open ? "happy" : "idle"} track={track} className="w-full h-full" />
          {!open && (
            <span className="absolute top-1 end-1 w-2.5 h-2.5 rounded-full bg-[#3fbf6f] ring-2 ring-ink-950" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#3fbf6f] pulse-ring" />
            </span>
          )}
        </button>
      </div>

      {/* panel */}
      {open && (
        <div
          className="fixed z-[65] inset-x-3 bottom-[104px] sm:inset-x-auto sm:end-6 sm:w-[380px] max-h-[min(600px,calc(100svh-140px))] flex flex-col rounded-2xl border border-ink-600 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ animation: reduced ? undefined : "fadeInUp 0.3s cubic-bezier(0.22,1,0.36,1)" }}
          role="dialog"
          aria-label="Batata"
        >
          {/* header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ink-700 bg-ink-850">
            <BotSprite mood={typing ? "thinking" : mood} className="w-11 h-11" />
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[14px] text-paper-50">بطاطا · Batata</p>
              <p className="text-[10.5px] text-mist-400 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full led ${mood === "urgent" ? "bg-red-400" : "bg-[#3fbf6f]"}`} aria-hidden="true" />
                {statusLine}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="w-8 h-8 grid place-items-center border border-ink-600 text-mist-300 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer">
              <Icon name="close" className="w-4 h-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-ink-950/40">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.from === "user"
                      ? "bg-amber-500 text-ink-950 font-medium"
                      : "bg-ink-800 text-mist-200 border border-ink-700"
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              </div>
            ))}
            {msgs.map((m, i) =>
              m.actions?.length ? (
                <div key={`a${i}`} className={`flex flex-wrap gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  {m.actions.map((a, j) =>
                    a.dl ? (
                      <a key={j} href={a.dl} download className="bot-chip bot-chip-cv">
                        <Icon name="download" className="w-3.5 h-3.5" /> {a.label}
                      </a>
                    ) : a.wa ? (
                      <a key={j} href={waHref(a.wa)} target="_blank" rel="noopener noreferrer" className="bot-chip bot-chip-wa">
                        <Icon name="wa" className="w-3.5 h-3.5" /> {a.label}
                      </a>
                    ) : (
                      <Link key={j} to={a.to ?? "/"} onClick={() => setOpen(false)} className="bot-chip">
                        {a.label}
                      </Link>
                    )
                  )}
                </div>
              ) : null
            )}
            {typing && (
              <div className="flex items-center gap-1.5 px-3.5 py-3 w-fit bg-ink-800 border border-ink-700">
                <span className="bot-dot" />
                <span className="bot-dot" style={{ animationDelay: "0.15s" }} />
                <span className="bot-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            )}
          </div>

          {/* suggestions */}
          <div className="bot-sugg overflow-hidden border-t border-ink-700 bg-ink-900 py-2.5">
            <div className="bot-sugg-track gap-2 px-3">
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} className="flex gap-2 shrink-0">
                  {s.sugg.map((q) => (
                    <button key={q} onClick={() => send(q)} className="bot-chip bot-chip-cv whitespace-nowrap !py-1.5 !text-[10.5px]">
                      {q}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2.5 px-3.5 py-3 border-t border-ink-700 bg-ink-900"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={s.placeholder}
              className="flex-1 min-w-0 bg-ink-800 border border-ink-600 px-3.5 py-2.5 text-[13px] text-paper-50 placeholder:text-mist-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              aria-label={s.send}
              className="w-10 h-10 shrink-0 grid place-items-center bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <Icon name="arrow" className="w-4 h-4 rtl:-scale-x-100" strokeWidth={2.2} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
