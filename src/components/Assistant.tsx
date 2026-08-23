import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang, usePrefersReducedMotion, type Lang } from "../i18n";
import { CV_FILES, waLink, type Market } from "../config";
import { Icon } from "./kit";

type Mood = "idle" | "happy" | "talking" | "thinking" | "urgent" | "dance";
type Action = { label: string; wa?: Market | "auto"; to?: string };
type Msg = { from: "bot" | "me"; html: string; actions?: Action[] };

/* ================= strings (AR / EN) ================= */
const STR = {
  ar: {
    name: "بطاطا",
    online: "متصل الآن، يرد في ثواني",
    panelSub: "المساعد الذكي ليوسف أحمد",
    placeholder: "اكتب سؤالك هنا…",
    send: "إرسال",
    greeting:
      "أهلًا! أنا <b>بطاطا</b>، المساعد الذكي للمهندس يوسف أحمد. اسألني عن الخدمات أو الخبرة أو المشاريع، وأنا أوصلك ليه في ثانية.",
    sugg: ["إيه الخدمات اللي بتقدمها؟", "الأسعار عاملة إزاي؟", "عندي مشكلة عاجلة", "بتغطي مصر؟", "عايز كاميرات مراقبة", "عايز تقييم لبيئتي"],
    servicesTitle: "يوسف بيشتغل في 5 مسارات خدمات:",
    services: [
      "تقنية المعلومات والبنية التحتية",
      "الشبكات (LAN / WAN / واي فاي / VPN)",
      "مايكروسوفت والسحابة (ويندوز سيرفر · AD · M365)",
      "أنظمة الأمن (مراقبة · بصمة · تحكم في الدخول)",
      "الاستشارات التقنية",
    ],
    prices:
      "بما إن كل بيئة مختلفة، مفيش أسعار جاهزة، وده في صالحك. ابعت طلب وهيوصلك <b>عرض سعر واضح مبني على بيئتك الفعلية</b>، من غير مفاجآت.",
    urgent: "في الحالات العاجلة أسرع طريق هو <b>واتساب مباشر</b>. البيئات المدعومة ليها أولوية فورية.",
    assessment: "تقدر تطلب <b>تقييمًا تقنيًا أوليًا</b>: بنشوف بيئتك ونرجعلك بصورة واضحة وخطة عملية.",
    markets: "بنغطي <b>السعودية ومصر</b>: دعم عن بُعد في أي مكان، وتنفيذ ميداني حسب الموقع. بتسأل من أنهي بلد؟",
    coverage: "بنشتغل في <b>السعودية ومصر</b>: أونلاين لأي مكان، وميداني حسب طبيعة الشغل.",
    identity:
      "أنا <b>بطاطا</b>! المساعد الذكي للمهندس يوسف أحمد، حافظ خدماته وخبرته كلها عن ظهر قلب، ومهمتي أوصلك ليه بسرعة.",
    handoff: "تمام! هجهزلك رسالة واتساب جاهزة فيها ملخص كلامنا، بس اضغط إرسال هناك وهيوصلك يوسف فورًا.",
    unknown: "مش متأكد فهمتك 100%، بس ده تخصص البشر! اختار أقرب حاجة ليك تحت، أو حوّلنا مباشرة ليوسف.",
    goWhatsapp: "واتساب مباشر",
    goServices: "استكشف خدماتي",
    typingLabel: "بطاطا بيكتب…",
    askAgain: "اسألني أي حاجة تانية!",
    moodUrgent: "وضع الطوارئ!",
    moodDance: "في نوبة فرح",
    backAgain: "وحشتني!",
    cvTitle: "السيرة الذاتية",
    cvAr: "عربي PDF",
    cvEn: "إنجليزي PDF",
    cvReply:
      "أكيد! دي <b>السيرة الذاتية</b> للمهندس يوسف أحمد: خبرة 9+ سنين في الدعم التقني المؤسسي وبيئات مايكروسوفت والشبكات وأنظمة الأمن في السعودية ومصر. حمّلها بالنسخة اللي تناسبك:",
    nameReply: (n: string) =>
      `تشرفنا يا <b>${n}</b>! من دلوقتي إحنا أصحاب، اسألني عن أي خدمة أو خبرة أو مشروع، وأنا معاك.`,
  },
  en: {
    name: "Batata",
    online: "Online, replies in seconds",
    panelSub: "Yousef Ahmed's smart assistant",
    placeholder: "Type your question here…",
    send: "Send",
    greeting:
      "Hi! I'm <b>Batata</b>, Eng. Yousef Ahmed's smart assistant. Ask me about services, experience or projects and I'll connect you in a second.",
    sugg: ["What services do you offer?", "How does pricing work?", "I have an urgent issue", "Do you cover Egypt?", "I need CCTV cameras", "I want an IT assessment"],
    servicesTitle: "Yousef works across 5 service lines:",
    services: [
      "IT & Infrastructure",
      "Networks (LAN / WAN / Wi-Fi / VPN)",
      "Microsoft & Cloud (Windows Server · AD · M365)",
      "Security Systems (CCTV · biometrics · access control)",
      "IT Consultancy",
    ],
    prices:
      "Every environment is different, so there are no list prices, and that works in your favor. Send a request and you'll get a <b>clear quotation built on your actual environment</b>, with no surprises.",
    urgent: "For urgent cases the fastest route is <b>direct WhatsApp</b>. Supported environments get immediate priority.",
    assessment: "You can request an <b>initial IT assessment</b>: we review your environment and come back with a clear picture and a practical plan.",
    markets: "We cover <b>Saudi Arabia and Egypt</b>: remote anywhere, on-site per location. Which country are you asking from?",
    coverage: "We work across <b>Saudi Arabia and Egypt</b>: remote anywhere, on-site depending on the job.",
    identity:
      "I'm <b>Batata</b>! Eng. Yousef Ahmed's smart assistant. I know his services and experience by heart, and my job is to get you to him fast.",
    handoff: "Great! I'll prepare a WhatsApp message with a summary of our chat. Just hit send there and Yousef picks it up immediately.",
    unknown: "I'm not 100% sure I got that, but that's what humans are for! Pick the closest option below, or go straight to Yousef.",
    goWhatsapp: "Direct WhatsApp",
    goServices: "Explore My Services",
    typingLabel: "Batata is typing…",
    askAgain: "Ask me anything else!",
    moodUrgent: "Emergency mode!",
    moodDance: "In a happy mood",
    backAgain: "I missed you!",
    cvTitle: "Founder CV",
    cvAr: "Arabic PDF",
    cvEn: "English PDF",
    cvReply:
      "Of course! Here's the <b>CV of Eng. Yousef Ahmed</b>: 9+ years of enterprise IT support, Microsoft environments, networking and security systems across Saudi Arabia and Egypt. Grab the version that suits you:",
    nameReply: (n: string) =>
      `Nice to meet you, <b>${n}</b>! We're friends now. Ask me about any service, experience or project and I'm on it.`,
  },
} as const;

/* ================= text helpers ================= */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();

const has = (n: string, words: string[]) => words.some((w) => n.includes(normalize(w)));

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function detectMarket(text: string): Market | null {
  const n = normalize(text);
  if (has(n, ["مصر", "القاهره", "الاسكندريه", "egypt", "cairo", "alex"])) return "eg";
  if (has(n, ["السعوديه", "الرياض", "جده", "مكه", "saudi", "riyadh", "jeddah", "makkah", "ksa"])) return "sa";
  return null;
}

/* ================= reply brain ================= */
function replyFor(raw: string, lang: Lang, market: Market | null): { html: string; actions?: Action[]; mood?: Mood } {
  const s = STR[lang];
  const n = normalize(raw);
  const out: { html: string; actions?: Action[]; mood?: Mood } = { html: "" };

  const bullets = (title: string, items: readonly string[]) =>
    `<p class="font-semibold">${title}</p><ul class="mt-1.5 space-y-1">${items
      .map((it) => `<li class="flex gap-2"><span class="bot-bullet"></span><span>${it}</span></li>`)
      .join("")}</ul>`;

  const wa = (label: string) => ({ label, wa: (market ?? "auto") as Market | "auto" });

  if (has(n, ["عاجل", "urgent", "طوارئ", "emergency", "عطل", "down", "واقع", "مش شغال", "not working", "critical", "حرج"])) {
    out.html = s.urgent;
    out.mood = "urgent";
    out.actions = [wa(s.goWhatsapp), { label: s.goServices, to: "/services" }];
    return out;
  }
  if (has(n, ["سيره", "cv", "resume", "السيره الذاتيه"])) {
    out.html = s.cvReply;
    return out;
  }
  if (has(n, ["كاميرا", "مراقبه", "cctv", "بصمه", "حضور", "امن", "security", "nvr", "dvr"])) {
    out.html =
      lang === "ar"
        ? "أنظمة الأمن من تخصصات يوسف الأساسية: <b>كاميرات مراقبة · NVR/DVR · مراقبة عن بُعد · بصمة وحضور · تحكم في الأبواب</b>، منفذة في مشاريع حقيقية زي مراكز القيادة والفنادق."
        : "Security systems are one of Yousef's core lines: <b>CCTV · NVR/DVR · remote monitoring · biometrics & attendance · door access</b>, delivered in real projects like command centers and hotels.";
    out.actions = [{ label: s.goServices, to: "/services" }, wa(s.goWhatsapp)];
    return out;
  }
  if (has(n, ["شبكه", "شبكات", "واي فاي", "وايفاي", "wifi", "network", "vpn", "lan", "wan", "ميكروتيك", "mikrotik"])) {
    out.html =
      lang === "ar"
        ? "الشبكات ملعب يوسف: <b>LAN/WAN · واي فاي للأعمال · VPN بين الفروع · ميكروتيك</b>، بيخططها بمسح فعلي للمبنى مش تخمين."
        : "Networks are Yousef's playground: <b>LAN/WAN · business Wi-Fi · site-to-site VPN · MikroTik</b>, planned from a real building survey, not guesswork.";
    out.actions = [{ label: s.goServices, to: "/services" }, wa(s.goWhatsapp)];
    return out;
  }
  if (has(n, ["مايكروسوفت", "microsoft", "m365", "اوفيس", "ويندوز سيرفر", "windows server", "اكتيف ديريكتوري", "active directory", "شير بوينت", "sharepoint", "ون درايف", "onedrive"])) {
    out.html =
      lang === "ar"
        ? "بيئات مايكروسوفت بيديرها يوسف صح: <b>ويندوز سيرفر · أكتيف ديريكتوري · M365 · شير بوينت · ون درايف</b>، هوية واحدة منضبطة لكل الشركة."
        : "Yousef runs Microsoft environments properly: <b>Windows Server · Active Directory · M365 · SharePoint · OneDrive</b>, one disciplined identity layer.";
    out.actions = [{ label: s.goServices, to: "/services" }, wa(s.goWhatsapp)];
    return out;
  }
  if (has(n, ["سعر", "اسعار", "تكلفه", "price", "pricing", "cost", "how much", "كام"])) {
    out.html = s.prices;
    out.actions = [wa(s.goWhatsapp), { label: s.goServices, to: "/services" }];
    return out;
  }
  if (has(n, ["تقييم", "assessment", "افحص", "شوف بيئتي", "audit"])) {
    out.html = s.assessment;
    out.actions = [wa(s.goWhatsapp), { label: s.goServices, to: "/services" }];
    return out;
  }
  if (has(n, ["بتغطي", "تغطي", "فين بتشتغل", "cover", "where do you", "countries", "بلاد"])) {
    out.html = s.coverage;
    return out;
  }
  if (has(n, ["مصر", "السعوديه", "egypt", "saudi", "markets", "اسواق"])) {
    out.html = s.markets;
    return out;
  }
  if (has(n, ["خدمات", "بتعمل ايه", "بتقدم ايه", "service", "what do you do", "offer"])) {
    out.html = bullets(s.servicesTitle, s.services);
    out.actions = [{ label: s.goServices, to: "/services" }, wa(s.goWhatsapp)];
    return out;
  }
  if (has(n, ["مين انت", "من انت", "who are you", "عرف نفسك", "انت مين", "بطاطا"])) {
    out.html = s.identity;
    if (has(n, ["بطاطا"])) out.mood = "dance";
    return out;
  }
  if (has(n, ["شكرا", "thanks", "thank you", "تسلم", "ميرسي"])) {
    out.html = (lang === "ar" ? "العفو! ده شغلي. " : "Anytime! That's my job. ") + s.askAgain;
    return out;
  }
  if (has(n, ["كلم حد", "واحد من الفريق", "بشري", "talk to human", "someone", "اتصل"])) {
    out.html = s.handoff;
    out.actions = [wa(s.goWhatsapp)];
    return out;
  }

  out.html = s.unknown;
  out.actions = [{ label: s.goServices, to: "/services" }, wa(s.goWhatsapp)];
  return out;
}

/* ================= the robot ================= */
function Bot({ mood, size = 120, className = "" }: { mood: Mood; size?: number; className?: string }) {
  const bodyRef = useRef<SVGGElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (mood !== "idle") return;
    const onMove = (e: MouseEvent) => {
      const el = bodyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 2.2;
      setPupil({ x: (dx / dist) * max, y: (dy / dist) * max });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mood]);

  const waving = mood === "happy" || mood === "talking" || mood === "dance";
  const urgent = mood === "urgent";
  const eyeFill = urgent ? "#ff9b8e" : mood === "thinking" ? "#e8b96a" : "#aef3e4";

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
      <ellipse cx="60" cy="113" rx="26" ry="3.5" fill="#0a1420" opacity="0.3" />
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

          <g ref={bodyRef}>
            <path d="M60 20 C86 20 100 38 100 60 C100 86 84 102 60 102 C36 102 20 86 20 60 C20 38 34 20 60 20 Z" fill="#e9a33b" stroke="#8f5a12" strokeWidth="2.5" />
            <ellipse cx="38" cy="42" rx="4" ry="3" fill="#c07f1c" opacity="0.5" />
            <ellipse cx="84" cy="80" rx="5" ry="3.5" fill="#c07f1c" opacity="0.5" />
            <ellipse cx="78" cy="38" rx="3" ry="2.5" fill="#c07f1c" opacity="0.45" />
            <circle cx="32" cy="66" r="1.6" fill="#8f5a12" />
            <circle cx="88" cy="60" r="1.6" fill="#8f5a12" />

            <rect x="47" y="72" width="26" height="16" rx="3" fill="#0a1420" />
            <text x="60" y="84" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="9" fill="#e9a33b">YA</text>

            <g className="bot-eye">
              <circle cx="46" cy="52" r="9" fill="#0d1a29" />
              <circle cx="46" cy="52" r="3.4" fill={eyeFill} className="bot-pupil" transform={`translate(${pupil.x} ${pupil.y})`} />
            </g>
            <g className="bot-eye bot-eye-b">
              <circle cx="74" cy="52" r="9" fill="#0d1a29" />
              <circle cx="74" cy="52" r="3.4" fill={eyeFill} className="bot-pupil" transform={`translate(${pupil.x} ${pupil.y})`} />
            </g>

            {mood === "thinking" ? (
              <path d="M52 66 q8 -4 16 0" stroke="#7a4a0e" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : mood === "urgent" ? (
              <ellipse cx="60" cy="67" rx="6" ry="4" fill="#7a4a0e" />
            ) : (
              <path className={mood === "talking" ? "bot-talk" : ""} d="M50 64 q10 9 20 0" stroke="#7a4a0e" strokeWidth="3" strokeLinecap="round" fill="none" />
            )}
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ================= action chips ================= */
function ActionChips({ msg, ctx, market }: { msg: Msg; ctx: string[]; market: Market | null }) {
  const { isAr, lang } = useLang();
  if (!msg.actions?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {msg.actions.map((a, i) => {
        if (a.wa) {
          const m: Market = a.wa === "auto" ? market ?? "sa" : a.wa;
          const summary = ctx.slice(-6).join("\n");
          const prefix = isAr ? "مرحبًا يوسف،\n\n" : "Hello Yousef,\n\n";
          const body = ctx.length ? (isAr ? "ملخص المحادثة:\n" + summary + "\n\n" : "Chat summary:\n" + summary + "\n\n") : "";
          const tail = isAr ? "(محوَّل من المساعد بطاطا)" : "(referred by Batata assistant)";
          return (
            <a key={i} href={waLink(prefix + body + tail, m)} target="_blank" rel="noreferrer" className="bot-chip bot-chip-wa">
              <Icon name="wa" className="w-3.5 h-3.5" />{a.label}
            </a>
          );
        }
        if (a.to) {
          return (
            <Link key={i} to={a.to} className="bot-chip">
              {a.label}
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}

/* ================= main assistant ================= */
export function Assistant() {
  const { isAr, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const s = STR[lang];

  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [market, setMarket] = useState<Market | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [botMood, setBotMood] = useState<Mood>("idle");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const moodTimer = useRef<number>(0);
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    if (!open) return;
    let savedName = "";
    try { savedName = localStorage.getItem("ya-visitor-name") ?? ""; } catch { /* private mode */ }
    const greeting = savedName
      ? (lang === "ar"
          ? `أهلًا بعودتك يا <b>${savedName}</b>! ${s.backAgain} اسألني عن أي خدمة أو خبرة أو مشروع.`
          : `Welcome back, <b>${savedName}</b>! ${s.backAgain} Ask me about any service, experience or project.`)
      : s.greeting;
    if (!booted.current) {
      booted.current = true;
      setMsgs([{ from: "bot", html: greeting }]);
      return;
    }
    setMsgs((m) => (m.length ? m : [{ from: "bot", html: greeting }]));
  }, [open, lang, s.backAgain, s.greeting]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setInput("");
    setMsgs((m) => [...m, { from: "me", html: esc(t) }]);
    historyRef.current.push((isAr ? "العميل: " : "Visitor: ") + t);
    const m = detectMarket(t);
    if (m) setMarket(m);

    const nm = t.match(/(?:اسمي|my name is)\s+([\p{L}\p{M}]{2,24})/iu);
    if (nm) {
      const name = nm[1];
      try { localStorage.setItem("ya-visitor-name", name); } catch { /* ignore */ }
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setBotMood("happy");
        setMsgs((p) => [...p, { from: "bot", html: s.nameReply(name) }]);
      }, 600);
      return;
    }

    setTyping(true);
    setBotMood("thinking");
    const reply = replyFor(t, lang, m ?? market);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, { from: "bot", html: reply.html, actions: reply.actions }]);
      setBotMood(reply.mood ?? "happy");
      window.clearTimeout(moodTimer.current);
      if (reply.mood === "dance" || reply.mood === "urgent") {
        moodTimer.current = window.setTimeout(() => setBotMood("happy"), 3200);
      }
    }, reduced ? 150 : 650 + Math.random() * 550);
  };

  const mood: Mood = typing ? "thinking" : open ? (botMood === "idle" ? "happy" : botMood) : "idle";
  const statusLine = typing ? s.typingLabel : botMood === "urgent" ? s.moodUrgent : botMood === "dance" ? s.moodDance : s.online;

  const chips = s.sugg.map((txt) => (
    <button key={txt} onClick={() => send(txt)} className="bot-chip whitespace-nowrap">
      {txt}
    </button>
  ));

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={isAr ? "افتح المساعد بطاطا" : "Open Batata assistant"}
        className="fixed bottom-5 end-5 z-50 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Bot mood={open ? "idle" : mood} size={70} className="drop-shadow-[0_8px_20px_rgba(233,163,59,0.35)]" />
        {!open && <span className="absolute -top-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-[#23a55b] led" aria-hidden="true" />}
      </button>

      {/* panel */}
      <div
        className={`fixed z-50 inset-x-3 bottom-24 sm:inset-x-auto sm:end-6 sm:w-[380px] flex flex-col overflow-hidden bg-ink-900 border border-ink-700 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto max-h-[72vh]" : "opacity-0 translate-y-4 pointer-events-none max-h-0"
        }`}
        role="dialog"
        aria-label={s.name}
      >
        {/* header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-ink-850 border-b border-ink-700">
          <Bot mood={mood} size={44} />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-paper-50 text-[15px] leading-tight">{s.name}</p>
            <p className="text-[11px] text-mist-300 mt-0.5 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full led ${botMood === "urgent" ? "bg-red-400" : "bg-[#3fbf6f]"}`} aria-hidden="true" />
              {statusLine}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label={isAr ? "إغلاق" : "Close"}
            className="w-8 h-8 grid place-items-center text-mist-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Icon name="close" className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-ink-900 min-h-[180px]">
          {msgs.map((msg, i) =>
            msg.from === "me" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] bg-amber-500 text-ink-950 px-3.5 py-2.5 text-[13.5px] leading-relaxed">{msg.html}</p>
              </div>
            ) : (
              <div key={i} className="flex justify-start">
                <div className="max-w-[88%] bg-ink-800 border border-ink-700 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-mist-200">
                  <span dangerouslySetInnerHTML={{ __html: msg.html }} />
                  {msg.from === "bot" && <ActionChips msg={msg} ctx={historyRef.current} market={market} />}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="flex items-center gap-2 text-mist-400 text-[12px]">
              <Bot mood="thinking" size={30} />
              <span className="flex gap-1">
                <span className="bot-dot" />
                <span className="bot-dot" style={{ animationDelay: "0.15s" }} />
                <span className="bot-dot" style={{ animationDelay: "0.3s" }} />
              </span>
            </div>
          )}
        </div>

        {/* suggestions */}
        <div className="bot-sugg overflow-hidden border-t border-ink-700 py-2.5 bg-ink-850" dir="ltr">
          <div className="bot-sugg-track">
            <div className="flex gap-2 pe-2">{chips}</div>
            <div className="flex gap-2 pe-2" aria-hidden="true">{chips}</div>
          </div>
        </div>

        {/* CV strip */}
        <div className="border-t border-ink-700 px-3.5 py-2.5 bg-ink-850">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mist-500 mb-2">{s.cvTitle}</p>
          <div className="flex gap-2">
            <a href={CV_FILES.ar} download className="bot-chip bot-chip-cv flex-1 justify-center"><Icon name="doc" className="w-3.5 h-3.5" />{s.cvAr}</a>
            <a href={CV_FILES.en} download className="bot-chip bot-chip-cv flex-1 justify-center"><Icon name="doc" className="w-3.5 h-3.5" />{s.cvEn}</a>
          </div>
        </div>

        {/* direct actions */}
        <div className="border-t border-ink-700 px-3.5 py-3 flex gap-2 bg-ink-850">
          <a
            href={waLink(isAr ? "مرحبًا يوسف، محوَّل من المساعد بطاطا." : "Hello Yousef, referred by Batata assistant.", market ?? "sa")}
            target="_blank"
            rel="noreferrer"
            className="bot-chip bot-chip-wa flex-1 justify-center"
          >
            <Icon name="wa" className="w-3.5 h-3.5" />{s.goWhatsapp}
          </a>
          <button onClick={() => { setOpen(false); navigate("/services"); }} className="bot-chip flex-1 justify-center cursor-pointer">
            {s.goServices}
          </button>
        </div>

        {/* input */}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-ink-700 p-3 bg-ink-850">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={s.placeholder}
            aria-label={s.placeholder}
            className="flex-1 bg-ink-800 border border-ink-600 px-3.5 py-2.5 text-[13.5px] text-paper-50 placeholder:text-mist-500 focus:border-amber-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            aria-label={s.send}
            className="w-10 h-10 grid place-items-center bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            <Icon name="send" className="w-4.5 h-4.5 rtl:-scale-x-100" strokeWidth={2} />
          </button>
        </form>
      </div>
    </>
  );
}
