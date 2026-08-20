import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, usePrefersReducedMotion } from "../i18n";
import { waLink } from "../config";
import { Icon } from "./kit";

/* ============================================================
   Batata (بطاطا) — the golden potato robot assistant.
   A friendly on-brand character that answers instantly, routes
   visitors to the right service line, and hands the full
   conversation to the team on WhatsApp.
   ============================================================ */

type Mood = "idle" | "happy" | "talking" | "thinking" | "urgent" | "dance";

/* ---------------- the robot itself (pure SVG, animated) ---------------- */
export function PotatoBot({
  size = 72,
  mood = "idle",
  track = false,
  className = "",
}: {
  size?: number;
  mood?: Mood;
  /** pupils follow the cursor (desktop only, honors reduced motion) */
  track?: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (!track || reduced) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      const eyes = eyesRef.current;
      if (!svg || !eyes) return;
      const r = svg.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      const clamp = (v: number) => Math.max(-2.4, Math.min(2.4, v));
      const dx = clamp((e.clientX - cx) / 55);
      const dy = clamp((e.clientY - cy) / 55);
      eyes.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [track, reduced]);

  const waving = mood === "happy" || mood === "talking" || mood === "dance";
  const urgent = mood === "urgent";
  const eyeFill = urgent ? "#ff9b8e" : mood === "thinking" ? "#e8b96a" : "#aef3e4";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 132"
      width={size}
      height={(size * 132) / 120}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`body${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8d28c" />
          <stop offset="55%" stopColor="#eeac49" />
          <stop offset="100%" stopColor="#cf8620" />
        </linearGradient>
        <radialGradient id={`shine${uid}`} cx="35%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#fff3d6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow + hover thruster */}
      <ellipse cx="60" cy="124" rx="25" ry="5.5" fill="#020609" opacity="0.45" />
      <ellipse cx="60" cy="112.5" rx="13" ry="3.2" fill="#6cc7b4" opacity="0.4" className="bot-led" />

      <g className={mood === "dance" ? "bot-dance" : ""}>
      <g className="bot-float">
        {/* antenna */}
        <path d="M60 22 V10" stroke="#8f5a12" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="7.5" r="6.5" fill={urgent ? "#ff6b5e" : "#e9a33b"} opacity="0.22" className={mood === "thinking" || urgent ? "bot-led fast" : "bot-led"} />
        <circle cx="60" cy="7.5" r="3.8" fill={urgent ? "#ff6b5e" : "#f0b35a"} className={mood === "thinking" || urgent ? "bot-led fast" : "bot-led"} />

        {/* left arm (waves along when dancing) */}
        <g className={mood === "dance" ? "bot-wave" : ""} style={mood === "dance" ? { animationDirection: "reverse" } : undefined}>
          <path d="M24 64 q-10 5 -9 15" stroke="#c07f1c" strokeWidth="7.5" strokeLinecap="round" fill="none" />
        </g>
        {/* right arm (waves when happy / talking) */}
        <g className={waving ? "bot-wave" : ""}>
          <path d="M96 62 q11 -3 16 -12" stroke="#c07f1c" strokeWidth="7.5" strokeLinecap="round" fill="none" />
        </g>

        {/* potato body */}
        <path
          d="M60 20 C85 17 101 36 100 61 C99 88 86 111 60 111 C34 111 21 88 20 61 C19 36 35 23 60 20 Z"
          fill={`url(#body${uid})`}
          stroke="#8f5a12"
          strokeWidth="2"
        />
        <path
          d="M60 20 C85 17 101 36 100 61 C99 88 86 111 60 111 C34 111 21 88 20 61 C19 36 35 23 60 20 Z"
          fill={`url(#shine${uid})`}
        />

        {/* circuit detail (IT brand wink) */}
        <path d="M33 88 h8 l4 -6 h7" stroke="#a86a17" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="54.5" cy="82" r="2" fill="#a86a17" opacity="0.65" />
        <path d="M78 92 h9" stroke="#a86a17" strokeWidth="2" opacity="0.55" strokeLinecap="round" />

        {/* YA badge on the belly */}
        <rect x="51" y="93" width="18" height="11" rx="2.5" fill="#0a1420" />
        <text x="60" y="101.4" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="7.2" fill="#f0b35a">
          YA
        </text>

        {/* visor */}
        <rect x="36" y="42" width="48" height="25" rx="12.5" fill="#0a1420" stroke="#8f5a12" strokeWidth="1.4" />

        {/* eyes (tracked pupils + blinking LEDs) */}
        <g ref={eyesRef} className="bot-pupil">
          <circle cx="50" cy="54.5" r="7.2" fill={urgent ? "#ff6b5e" : "#7fe8d4"} opacity="0.2" />
          <circle cx="70" cy="54.5" r="7.2" fill={urgent ? "#ff6b5e" : "#7fe8d4"} opacity="0.2" />
          <circle cx="50" cy="54.5" r="4.1" fill={eyeFill} className="bot-eye" />
          <circle cx="70" cy="54.5" r="4.1" fill={eyeFill} className="bot-eye bot-eye-b" />
        </g>

        {/* blush (hides when worried) */}
        {!urgent && (
          <>
            <circle cx="38" cy="71" r="4" fill="#e07b39" opacity="0.35" />
            <circle cx="82" cy="71" r="4" fill="#e07b39" opacity="0.35" />
          </>
        )}

        {/* sweat drop in emergency mode */}
        {urgent && (
          <path d="M97 36 q3.4 5.6 0 8 q-3.4-2.4 0-8 Z" fill="#7fe8d4" className="bot-led fast" />
        )}

        {/* mouth by mood */}
        {mood === "thinking" ? (
          <circle cx="60" cy="76.5" r="3" fill="#8f5a12" />
        ) : urgent ? (
          <path d="M52 77.5 Q56 73.5 60 77.5 Q64 81.5 68 77.5" stroke="#8f5a12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        ) : mood === "dance" ? (
          <path d="M47.5 72.5 Q60 89.5 72.5 72.5 Q60 80 47.5 72.5 Z" fill="#8f5a12" />
        ) : mood === "happy" || mood === "talking" ? (
          <path
            d="M49.5 73 Q60 86.5 70.5 73 Q60 78.5 49.5 73 Z"
            fill="#8f5a12"
            className={mood === "talking" ? "bot-talk" : ""}
          />
        ) : (
          <path d="M52.5 74.5 Q60 80.5 67.5 74.5" stroke="#8f5a12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        )}
      </g>
      </g>
    </svg>
  );
}

/* ---------------- tiny brain: intent matching ---------------- */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const has = (n: string, ws: string[]) => ws.some((w) => n.includes(w));

type Market = "sa" | "eg";
function detectMarket(n: string): Market | null {
  if (has(n, ["مصر", "cairo", "egypt", "قاهره", "اسكندريه", "giza", "الجيزه", "mansoura", "المنصوره"])) return "eg";
  if (has(n, ["سعوديه", "saudi", "riyadh", "الرياض", "jeddah", "جده", "دمام", "dammam", "مكه", "makkah", "مدينه", "medina"])) return "sa";
  return null;
}

const STR = {
  ar: {
    name: "بطاطا",
    online: "متصل الآن — يرد في ثواني",
    panelTitle: "بطاطا · Batata",
    panelSub: "روبوت TECH OF THE WORLD المساعد",
    placeholder: "اكتب سؤالك هنا…",
    send: "إرسال",
    greeting:
      "أهلًا! أنا <b>بطاطا</b> — روبوت فريق TECH OF THE WORLD. اسألني عن الخدمات أو الأسعار أو التغطية، وأنا أوصلك للفريق في ثانية.",
    servicesTitle: "عندنا 5 مسارات خدمات:",
    services: [
      ["", "تقنية المعلومات والبنية التحتية"],
      ["", "الشبكات (LAN / WAN / واي فاي / VPN)"],
      ["", "مايكروسوفت والسحابة (ويندوز سيرفر · أكتيف ديريكتوري · M365)"],
      ["", "أنظمة الأمن (كاميرات مراقبة · بصمة · تحكم بالدخول)"],
      ["", "الاستشارات التقنية"],
    ] as [string, string][],
    servicesCta: "شوف كل التفاصيل في صفحة الخدمات.",
    goServices: "صفحة الخدمات",
    goRequest: "اطلب الخدمة",
    goProjects: "شوف شغلنا",
    goWhatsapp: "واتساب مباشر",
    prices:
      "بما إن كل بيئة مختلفة، مفيش أسعار جاهزة — وده في صالحك. بعتلنا طلب وهيوصلك <b>عرض سعر واضح مبني على بيئتك الفعلية</b> — من غير مفاجآت.",
    urgent:
      "في الحالات العاجلة أسرع طريق هو <b>واتساب مباشر</b> — البيئات المدعومة ليها أولوية فورية.",
    assessment:
      "تقدر تطلب <b>تقييمًا تقنيًا أوليًا</b> — بنشوف بيئتك ونرجعلك بصورة واضحة وخطة عملية.",
    markets: "بنغطي <b>السعودية ومصر</b> — دعم عن بُعد في أي مكان، وتنفيذ ميداني حسب الموقع. بتسأل من أنهي بلد؟",
    coverage: "بنشتغل في <b>السعودية ومصر</b> — أونلاين لأي مكان، وميداني حسب طبيعة الشغل.",
    identity:
      "أنا <b>بطاطا</b>! روبوت صغير شغال مع فريق TECH OF THE WORLD — حافظ خدماتنا الخمسة كلها عن ظهر قلب، ومهمتي أوصلك للشخص الصح بسرعة.",
    handoff:
      "تمام! هجهزلك رسالة واتساب جاهزة فيها ملخص كلامنا — بس اضغط إرسال هناك وهيوصلك الفريق فورًا.",
    unknown:
      "مش متأكد فهمتك 100% — بس ده تخصص البشر عندنا! اختار أقرب حاجة ليك تحت، أو حوّلنا مباشرة لواحد من الفريق.",
    formHint: "اكتب في النموذج إنك جاي من المحادثة عشان نكمل من نفس النقطة.",
    sugg: ["الخدمات عندكم إيه؟", "كام الأسعار؟", "عندي مشكلة عاجلة", "بتغطوا مصر؟", "عايز كاميرات مراقبة", "عايز تقييم لبيئتي"],
    bubble: "أنا بطاطا! تحتاج مساعدة؟",
    openLabel: "افتح المحادثة مع بطاطا",
    closeLabel: "إغلاق المحادثة",
    typingLabel: "بطاطا بيكتب…",
    askAgain: "اسأل أي حاجة تانية!",
    moodIdle: "جاهز وبيفكر فيك",
    moodHappy: "متصل الآن — يرد في ثواني",
    moodThinking: "بيفكر…",
    moodUrgent: "وضع الطوارئ!",
    moodDance: "في نوبة فرح",
    backAgain: "وحشتني!",
  },
  en: {
    name: "Batata",
    online: "Online — replies in seconds",
    panelTitle: "Batata · بطاطا",
    panelSub: "TECH OF THE WORLD's helper robot",
    placeholder: "Type your question…",
    send: "Send",
    greeting:
      "Hi! I'm <b>Batata</b> — TECH OF THE WORLD's robot helper. Ask me about services, pricing or coverage and I'll connect you to the team in a second.",
    servicesTitle: "We work across 5 service lines:",
    services: [
      ["", "IT & Infrastructure"],
      ["", "Networks (LAN / WAN / Wi-Fi / VPN)"],
      ["", "Microsoft & Cloud (Windows Server · AD · M365)"],
      ["", "Security Systems (CCTV · biometrics · access control)"],
      ["", "IT Consultancy"],
    ] as [string, string][],
    servicesCta: "See full details on the services page.",
    goServices: "Services page",
    goRequest: "Request it",
    goProjects: "See our work",
    goWhatsapp: "Direct WhatsApp",
    prices:
      "Every environment is different, so there are no list prices — that works in your favor. Send a request and you'll get a <b>clear quotation built on your actual environment</b> — no surprises.",
    urgent:
      "For urgent cases the fastest route is <b>direct WhatsApp</b> — supported environments get immediate priority.",
    assessment:
      "You can request an <b>initial IT assessment</b> — we review your environment and come back with a clear picture and a practical plan.",
    markets: "We cover <b>Saudi Arabia and Egypt</b> — remote anywhere, on-site per location. Which country are you asking from?",
    coverage: "We work across <b>Saudi Arabia and Egypt</b> — remote anywhere, on-site depending on the job.",
    identity:
      "I'm <b>Batata</b>! A little robot working with the TECH OF THE WORLD crew — I know all five service lines by heart, and my job is to get you to the right person fast.",
    handoff:
      "Great! I'll prepare a WhatsApp message with a summary of our chat — just hit send there and the team picks it up immediately.",
    unknown:
      "I'm not 100% sure I got that — but that's what our humans are for! Pick the closest option below, or go straight to the team.",
    formHint: "Mention in the form that you're coming from the chat so we continue where we left off.",
    sugg: ["What services do you offer?", "How much does it cost?", "I have an urgent issue", "Do you cover Egypt?", "I need CCTV cameras", "I want an IT assessment"],
    bubble: "I'm Batata! Need a hand?",
    openLabel: "Open chat with Batata",
    closeLabel: "Close chat",
    typingLabel: "Batata is typing…",
    askAgain: "Ask me anything else!",
    moodIdle: "Ready when you are",
    moodHappy: "Online — replies in seconds",
    moodThinking: "Thinking…",
    moodUrgent: "Emergency mode!",
    moodDance: "In a happy mood",
    backAgain: "I missed you!",
  },
};

const SERVICE_HINTS: Record<string, string[]> = {
  "it-infrastructure": ["دعم", "support", "بنية", "infrastructure", "سيرفر", "server", "maintenance", "صيانة"],
  networks: ["شبك", "network", "wifi", "واي فاي", "vpn", "راوتر", "router"],
  "microsoft-cloud": ["مايكروسوفت", "microsoft", "m365", "اوفيس", "office", "شير بوينت", "sharepoint", "onedrive", "ون درايف", "اكتيف", "active directory", "exchange"],
  "security-systems": ["كاميرا", "cctv", "مراقبة", "surveillance", "بصم", "biometric", "حضور", "attendance", "دخول", "access", "nvr", "dvr"],
  consultancy: ["استشار", "consult", "تقييم", "assessment", "خطة", "plan", "strategy", "استراتيجيه"],
};

function replyFor(raw: string, lang: "ar" | "en", market: Market | null) {
  const s = STR[lang];
  const n = normalize(raw);
  const out: { html: string; mood?: Mood; actions?: { label: string; to?: string; wa?: Market | "auto" }[] } = { html: "" };

  /* remember the visitor's name — Batata greets them personally next time */
  const nameMatch = raw.trim().match(/(?:اسمي|انا اسمي|my name is|i'?m called|i am)\s+([\p{L}]{2,20})/iu);
  if (nameMatch) {
    const name = nameMatch[1];
    try { localStorage.setItem("ya-visitor-name", name); } catch { /* private mode */ }
    out.html =
      lang === "ar"
        ? `تشرفنا يا <b>${name}</b>! من دلوقتي إحنا أصحاب — اسألني عن أي خدمة أو سعر أو تغطية، وأنا معاك.`
        : `Nice to meet you, <b>${name}</b>! We're friends now — ask me about any service, price or coverage and I'm on it.`;
    out.mood = "dance";
    out.actions = [{ label: s.goServices, to: "/services" }, { label: s.goRequest, to: "/request" }];
    return out;
  }

  /* easter egg: calling Batata by name makes it dance */
  if (n === "بطاطا" || n === "يا بطاطا" || n === "batata" || n === "potato" || n === "hey batata") {
    out.html =
      lang === "ar"
        ? "مين ناداني؟ ده أنا! كل ما حد ينده عليا بفرح وأرقص — يلا اسألني أي حاجة عن خدماتنا، أو خلينا نرقص شوية كمان."
        : "Who called me? That's me! I do a little dance every time someone calls my name — now ask me anything about our services, or let's keep dancing.";
    out.mood = "dance";
    out.actions = [{ label: s.goServices, to: "/services" }];
    return out;
  }

  if (has(n, ["خدم", "service", "بتعملو ايه", "what do you do", "مجالات", "بتقدمو"])) {
    out.html =
      s.servicesTitle +
      "<br/>" +
      s.services.map(([, t]) => `<span class="bot-bullet"></span>${t}`).join("<br/>") +
      "<br/>" +
      s.servicesCta;
    out.actions = [
      { label: s.goServices, to: "/services" },
      { label: s.goRequest, to: "/request" },
    ];
    return out;
  }
  if (has(n, ["سعر", "price", "pricing", "كام", "how much", "تكلف", "cost", "عرض سعر", "quote", "quotation"])) {
    out.html = s.prices + "<br/><small>" + s.formHint + "</small>";
    out.actions = [
      { label: s.goRequest, to: "/request" },
      { label: s.goWhatsapp, wa: market ?? "auto" },
    ];
    return out;
  }
  if (has(n, ["عاجل", "urgent", "طوارئ", "emergency", "عطل", "down", "واقع", "مش شغال", "not working", "مشكله كبيره", "critical", "حرج"])) {
    out.html = s.urgent;
    out.mood = "urgent";
    out.actions = [
      { label: s.goWhatsapp, wa: market ?? "auto" },
      { label: s.goRequest, to: "/request" },
    ];
    return out;
  }
  if (has(n, ["كاميرا", "cctv", "مراقبة", "بصمه", "بصمة", "حضور", "انصراف", "دخول", "surveillance", "access control", "biometric"])) {
    out.html = lang === "ar"
      ? "أنظمة الأمن دي من تخصصاتنا الأساسية: <b>كاميرات مراقبة · NVR/DVR · مراقبة عن بُعد · بصمة وحضور · تحكم في الأبواب</b> — منفذة في مشاريع حقيقية زي مراكز القيادة والفنادق."
      : "Security systems are one of our core lines: <b>CCTV · NVR/DVR · remote monitoring · biometrics & attendance · door access</b> — delivered in real projects like command centers and hotels.";
    out.actions = [
      { label: s.goProjects, to: "/projects/cctv-command-center" },
      { label: s.goRequest, to: "/request?service=security-systems" },
    ];
    return out;
  }
  if (has(n, ["شبك", "network", "واي فاي", "wifi", "vpn", "راوتر", "ميكروتيك", "mikrotik", "انترنت"])) {
    out.html = lang === "ar"
      ? "الشبكات ملعبنا: <b>LAN/WAN · واي فاي للأعمال · VPN بين الفروع · ميكروتيك</b> — بنخططها بمسح فعلي للمبنى مش تخمين."
      : "Networks are our playground: <b>LAN/WAN · business Wi-Fi · site-to-site VPN · MikroTik</b> — planned from a real building survey, not guesswork.";
    out.actions = [
      { label: s.goProjects, to: "/projects/mikrotik-s2s-vpn" },
      { label: s.goRequest, to: "/request?service=networks" },
    ];
    return out;
  }
  if (has(n, ["مايكروسوفت", "microsoft", "m365", "اوفيس", "office", "شير بوينت", "sharepoint", "ون درايف", "onedrive", "اكتيف ديريكتوري", "active directory", "ويندوز سيرفر", "windows server"])) {
    out.html = lang === "ar"
      ? "بيئات مايكروسوفت بنديرها صح: <b>ويندوز سيرفر · أكتيف ديريكتوري · M365 · شير بوينت · ون درايف</b> — هوية واحدة منضبطة لكل الشركة."
      : "We run Microsoft environments properly: <b>Windows Server · Active Directory · M365 · SharePoint · OneDrive</b> — one disciplined identity layer.";
    out.actions = [
      { label: s.goRequest, to: "/request?service=microsoft-cloud" },
      { label: s.goServices, to: "/services" },
    ];
    return out;
  }
  if (has(n, ["مصر", "egypt", "قاهره", "cairo", "اسكندريه", "alexandria"])) {
    out.html = s.coverage + " " + (lang === "ar" ? "ده رقم <b>واتساب مصر</b> لو حابب تكلمنا دلوقتي:" : "Here's the <b>Egypt WhatsApp</b> if you'd like to talk now:");
    out.actions = [
      { label: s.goWhatsapp, wa: "eg" },
      { label: s.goRequest, to: "/request?country=Egypt" },
    ];
    return out;
  }
  if (has(n, ["سعوديه", "saudi", "الرياض", "riyadh", "جده", "jeddah", "دمام", "dammam"])) {
    out.html = s.coverage + " " + (lang === "ar" ? "ده رقم <b>واتساب السعودية</b> لو حابب تكلمنا دلوقتي:" : "Here's the <b>KSA WhatsApp</b> if you'd like to talk now:");
    out.actions = [
      { label: s.goWhatsapp, wa: "sa" },
      { label: s.goRequest, to: "/request" },
    ];
    return out;
  }
  if (has(n, ["تغطيه", "coverage", "فين", "where", "بلد", "دول", "مواقعكم", "locations", "اونسايت", "on site", "onsite", "ميداني"])) {
    out.html = s.markets;
    out.actions = [
      { label: lang === "ar" ? "واتساب السعودية" : "KSA WhatsApp", wa: "sa" },
      { label: lang === "ar" ? "واتساب مصر" : "Egypt WhatsApp", wa: "eg" },
    ];
    return out;
  }
  if (has(n, ["تقييم", "assessment", "استشار", "consult", "اودييت", "audit", "خطة", "plan"])) {
    out.html = s.assessment;
    out.actions = [{ label: s.goRequest, to: "/request?service=consultancy" }];
    return out;
  }
  if (has(n, ["بطاطا", "باتاتا", "batata", "مين انت", "من انت", "who are you", "عرفني بنفسك", "اسمك"])) {
    out.html = s.identity;
    out.actions = [{ label: s.goServices, to: "/services" }];
    return out;
  }
  if (has(n, ["سلام", "اهلا", "مرحبا", "صباح", "مساء", "hello", "hi ", "hey", "السلام عليكم"])) {
    out.html = lang === "ar"
      ? "أهلًا وسهلًا! أنا بطاطا — اسألني عن أي خدمة أو سعر أو تغطية، وأنا معاك."
      : "Welcome! I'm Batata — ask me about any service, price or coverage and I'm on it.";
    out.actions = [
      { label: s.goServices, to: "/services" },
      { label: s.goRequest, to: "/request" },
    ];
    return out;
  }
  if (has(n, ["شكرا", "thanks", "thank you", "تسلم", "ميرسي"])) {
    out.html = lang === "ar" ? "العفو! ده شغلي — " + s.askAgain : "Anytime! That's my job — " + s.askAgain;
    return out;
  }

  // smart fallback: try to route to the best-matching service line
  let best: string | null = null;
  let bestScore = 0;
  for (const [id, words] of Object.entries(SERVICE_HINTS)) {
    const score = words.filter((w) => n.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  if (best) {
    out.html = lang === "ar"
      ? "يبدو إن كلامك قريب من مسار معين — تقدر تطلبه مباشرة وهيكمل معاك الفريق:"
      : "That sounds close to one of our lines — request it directly and the team takes over:";
    out.actions = [
      { label: s.goRequest, to: `/request?service=${best}` },
      { label: s.goServices, to: `/services#${best}` },
    ];
    return out;
  }

  out.html = s.unknown;
  out.actions = [
    { label: s.goServices, to: "/services" },
    { label: s.goRequest, to: "/request" },
    { label: s.goWhatsapp, wa: market ?? "auto" },
  ];
  return out;
}

/* ---------------- messages ---------------- */
type Msg = { from: "user" | "bot"; html: string; actions?: { label: string; to?: string; wa?: Market | "auto" }[] };

function ActionChips({ msg }: { msg: Msg }) {
  const { isAr } = useLang();
  if (!msg.actions) return null;
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {msg.actions.map((a, i) => {
        const market: Market = a.wa === "auto" ? "sa" : a.wa!;
        if (a.wa) {
          const href = waLink("Hello TECH OF THE WORLD — " + (isAr ? "محوَّل من المساعد (بطاطا)." : "referred by the assistant (Batata)."), market);
          return (
            <a key={i} href={href ?? "#"} target="_blank" rel="noreferrer" className="bot-chip bot-chip-wa">
              <Icon name="wa" className="w-3.5 h-3.5" /> {a.label}
            </a>
          );
        }
        return (
          <Link key={i} to={a.to!} className="bot-chip">
            {a.label} <Icon name="arrow" className="w-3 h-3 rtl:-scale-x-100" strokeWidth={2.4} />
          </Link>
        );
      })}
    </div>
  );
}

/* ---------------- the assistant (launcher + panel) ---------------- */
export function Assistant() {
  const { isAr } = useLang();
  const lang = isAr ? "ar" : "en";
  const s = STR[lang];
  const [open, setOpen] = useState(false);
  const [bounced, setBounced] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [market, setMarket] = useState<Market | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [botMood, setBotMood] = useState<Mood>("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const moodTimer = useRef<number>(0);

  /* intro bubble shortly after load, until the user opens the chat */
  useEffect(() => {
    const t1 = setTimeout(() => setBubble(true), 1800);
    const t2 = setTimeout(() => setBubble(false), 9500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    let savedName = "";
    try { savedName = localStorage.getItem("ya-visitor-name") ?? ""; } catch { /* private mode */ }
    const greeting = savedName
      ? (lang === "ar"
          ? `أهلًا بعودتك يا <b>${savedName}</b>! ${s.backAgain} اسألني عن أي خدمة أو سعر أو تغطية.`
          : `Welcome back, <b>${savedName}</b>! ${s.backAgain} Ask me about any service, price or coverage.`)
      : s.greeting;
    if (!booted.current) {
      booted.current = true;
      setMsgs([{ from: "bot", html: greeting }]);
      return;
    }
    setMsgs((m) => (m.length ? m : [{ from: "bot", html: greeting }]));
  }, [open, s.greeting, s.backAgain, lang]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setBubble(false);
    const m = detectMarket(normalize(text));
    if (m) setMarket(m);
    setHistory((h) => [...h, `• ${text}`]);
    setMsgs((prev) => [...prev, { from: "user", html: text.replace(/</g, "&lt;") }]);
    setTyping(true);
    const reply = replyFor(text, lang, m ?? market);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [...prev, { from: "bot", html: reply.html, actions: reply.actions }]);
      setBotMood(reply.mood ?? "happy");
      window.clearTimeout(moodTimer.current);
      if (reply.mood === "dance" || reply.mood === "urgent") {
        /* expressive moods settle back to a friendly face after a moment */
        moodTimer.current = window.setTimeout(() => setBotMood("happy"), 3200);
      }
    }, 650 + Math.random() * 550);
  };

  const handoff = () => {
    const summary =
      (isAr ? "مرحبًا! كنت بتكلم المساعد (بطاطا) في الموقع وطلبت تحويلي.\nملخص:\n" : "Hello! I was chatting with the assistant (Batata) on the website and asked to be connected.\nSummary:\n") +
      history.slice(-6).join("\n");
    return waLink(summary, market ?? "sa");
  };

  const toggle = () => {
    setOpen((v) => {
      if (!v) {
        setBounced(true);
        setBubble(false);
        setTimeout(() => setBounced(false), 750);
      }
      return !v;
    });
  };

  const mood: Mood = typing ? "thinking" : open ? (botMood === "idle" ? "happy" : botMood) : "idle";
  const statusLine = typing ? s.typingLabel : botMood === "urgent" ? s.moodUrgent : botMood === "dance" ? s.moodDance : s.online;

  return (
    <>
      {/* ============ launcher: Batata himself ============ */}
      <div className="fixed bottom-5 start-5 z-[80]">
        {bubble && !open && (
          <button
            onClick={toggle}
            className="absolute bottom-full mb-3 start-0 w-60 text-start chamfer-sm bg-paper-50 text-ink-900 px-4 py-3 shadow-[0_18px_45px_-15px_rgba(2,8,14,0.5)] cursor-pointer animate-[fadeInUp_0.45s_cubic-bezier(0.22,1,0.36,1)]"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-7 h-7 shrink-0 grid place-items-center bg-amber-500 text-ink-950"><Icon name="bolt" className="w-4 h-4" /></span>
              <span className="font-display text-[13px] font-bold leading-snug">{s.bubble}</span>
            </span>
            <span className="absolute -bottom-1.5 start-8 w-3 h-3 bg-paper-50 rotate-45" aria-hidden="true" />
          </button>
        )}
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? s.closeLabel : s.openLabel}
          className="relative block cursor-pointer outline-offset-4 drop-shadow-[0_14px_25px_rgba(0,0,0,0.55)] hover:drop-shadow-[0_18px_35px_rgba(233,163,59,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className={bounced ? "block bot-bounce" : "block"}>
            <PotatoBot size={74} mood={mood} track={!open} />
          </span>
          {!open && (
            <span className="absolute top-1 end-1 flex w-3 h-3" aria-hidden="true">
              <span className="absolute inline-flex w-full h-full rounded-full bg-amber-400 pulse-ring" />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-amber-500 border-2 border-ink-950" />
            </span>
          )}
        </button>
      </div>

      {/* ============ chat panel ============ */}
      {open && (
        <div
          className="fixed z-[85] flex flex-col bg-ink-900 border border-ink-600 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] overflow-hidden
                     bottom-0 start-0 end-0 h-[78dvh] rounded-t-2xl
                     md:bottom-24 md:start-24 md:end-auto md:h-[560px] md:w-[380px] md:rounded-none md:chamfer
                     animate-[fadeInUp_0.35s_cubic-bezier(0.22,1,0.36,1)]"
          role="dialog"
          aria-label={s.panelTitle}
        >
          {/* header with live Batata */}
          <div className="relative shrink-0 flex items-center gap-3 px-4 py-3 bg-ink-850 border-b border-ink-700">
            <div className="relative shrink-0">
              <PotatoBot size={52} mood={mood} />
              <span className="absolute -bottom-0.5 end-0 w-3 h-3 rounded-full bg-[#3fbf6f] border-2 border-ink-850" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[15.5px] text-paper-50 leading-tight">{s.panelTitle}</p>
              <p className="text-[11px] text-mist-300 mt-0.5 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full led ${botMood === "urgent" ? "bg-red-400" : "bg-[#3fbf6f]"}`} aria-hidden="true" />
                {statusLine}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 grid place-items-center text-mist-300 hover:text-amber-400 hover:bg-ink-700 transition-colors cursor-pointer"
              aria-label={s.closeLabel}
            >
              <Icon name="close" className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 grid-bg" style={{ background: "var(--color-ink-950)" }}>
            {msgs.map((m, i) =>
              m.from === "bot" ? (
                <div key={i} className="flex items-end gap-2.5 max-w-[92%]">
                  <span className="shrink-0 mb-1"><PotatoBot size={26} mood={typing && i === msgs.length - 1 ? "thinking" : "happy"} /></span>
                  <div className="chamfer-sm bg-ink-800 border border-ink-700 text-mist-200 px-4 py-3 text-[13.5px] leading-relaxed animate-[fadeInUp_0.3s_ease-out]">
                    <span dangerouslySetInnerHTML={{ __html: m.html }} />
                    <ActionChips msg={m} />
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div className="chamfer-sm bg-amber-500 text-ink-950 px-4 py-3 text-[13.5px] font-medium leading-relaxed max-w-[85%] animate-[fadeInUp_0.3s_ease-out]">
                    <span dangerouslySetInnerHTML={{ __html: m.html }} />
                  </div>
                </div>
              )
            )}
            {typing && (
              <div className="flex items-end gap-2.5">
                <span className="shrink-0"><PotatoBot size={26} mood="thinking" /></span>
                <div className="chamfer-sm bg-ink-800 border border-ink-700 px-4 py-3.5 flex items-center gap-1.5" aria-label={s.typingLabel}>
                  <span className="bot-dot" /><span className="bot-dot" style={{ animationDelay: "0.15s" }} /><span className="bot-dot" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
          </div>

          {/* suggestions — auto-scrolling strip so every option stays reachable */}
          {msgs.length <= 2 && !typing && (
            <div className="bot-sugg shrink-0 relative overflow-hidden px-4 pb-3" style={{ background: "var(--color-ink-950)" }}>
              <div className="bot-sugg-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 gap-2 pe-2" aria-hidden={copy === 1 ? "true" : undefined}>
                    {s.sugg.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        tabIndex={copy === 1 ? -1 : undefined}
                        className="shrink-0 whitespace-nowrap border border-ink-600 text-mist-300 px-3.5 py-2 text-[12px] font-medium hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10 active:scale-95 transition-all cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <span className="pointer-events-none absolute inset-y-0 start-0 z-10 w-7 bg-gradient-to-r from-[#060d16] to-transparent" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-y-0 end-0 z-10 w-7 bg-gradient-to-l from-[#060d16] to-transparent" aria-hidden="true" />
            </div>
          )}

          {/* handoff */}
          <div className="shrink-0 px-4 pb-3 flex gap-2" style={{ background: "var(--color-ink-950)" }}>
            <a
              href={handoff() ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#23a55b] text-white px-3 py-2.5 font-display text-[11.5px] font-semibold uppercase tracking-[0.1em] hover:brightness-110 transition-all"
            >
              <Icon name="wa" className="w-4 h-4" /> {s.goWhatsapp}
            </a>
            <Link
              to="/request"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 text-ink-950 px-3 py-2.5 font-display text-[11.5px] font-semibold uppercase tracking-[0.1em] hover:bg-amber-400 transition-all"
            >
              <Icon name="doc" className="w-4 h-4" /> {s.goRequest}
            </Link>
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="shrink-0 flex items-center gap-2.5 px-4 py-3.5 bg-ink-850 border-t border-ink-700"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={s.placeholder}
              aria-label={s.placeholder}
              className="flex-1 bg-ink-900 border border-ink-600 text-paper-50 placeholder:text-mist-500 px-4 py-3 text-[13.5px] focus:border-amber-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={s.send}
              className="w-12 h-12 shrink-0 grid place-items-center bg-amber-500 text-ink-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
            >
              <Icon name="send" className="w-5 h-5 rtl:-scale-x-100" strokeWidth={2} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
