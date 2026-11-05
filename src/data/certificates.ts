import type { B } from "../i18n";

/* ---------------- verified certificates ----------------
 * Cisco Networking Academy "Certificate of Course Completion" (student-level credential),
 * each issued with a public Credly badge. The verify links come from the QR code printed
 * on the certificates themselves ("Scan to Verify").
 */
export type Certificate = {
  id: string;
  title: B;
  issuer: B;
  level: B;
  /** ISO date of issue, as printed on the certificate */
  issued: string;
  badge: string;
  verifyUrl: string;
  /** what the certificate states the holder can do (short form of the printed list) */
  skills: B[];
};

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const ISSUER: B = { en: "Cisco Networking Academy", ar: "أكاديمية سيسكو للشبكات" };
const LEVEL: B = { en: "Course completion · student level", ar: "إتمام دورة · مستوى طالب" };

export const CERTIFICATES: Certificate[] = [
  {
    id: "network-technician-career-path",
    title: { en: "Network Technician Career Path", ar: "مسار فني الشبكات" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-07",
    badge: `${base}/images/certificates/network-technician-career-path.webp`,
    verifyUrl: "https://www.credly.com/badges/ce705adb-2108-4894-ba0e-9565495bb52c",
    skills: [
      { en: "Network standards, protocols and Ethernet switching", ar: "معايير وبروتوكولات الشبكات وتبديل Ethernet" },
      { en: "IPv4 and IPv6 addressing", ar: "عنونة IPv4 وIPv6" },
      { en: "DNS and DHCP operation and basic connectivity diagnosis", ar: "عمل DNS وDHCP وتشخيص مشاكل الاتصال" },
      { en: "Wireless router setup and secure user access", ar: "إعداد الراوتر اللاسلكي وضبط وصول آمن للمستخدمين" },
      { en: "Troubleshooting methodology and help-desk best practices", ar: "منهجية استكشاف الأعطال وأفضل ممارسات الدعم" },
    ],
  },
  {
    id: "it-support-career-path",
    title: { en: "IT Support Specialist Career Path", ar: "مسار أخصائي الدعم التقني" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-04",
    badge: `${base}/images/certificates/it-support-career-path.webp`,
    verifyUrl: "https://www.credly.com/badges/45644ee7-6c2e-4344-a7b7-559bac47c22d",
    skills: [
      { en: "IT support fundamentals and customer service", ar: "أساسيات الدعم التقني وخدمة العملاء" },
      { en: "Structured problem-solving for technical issues", ar: "منهجية منظمة لحل المشكلات التقنية" },
      { en: "Troubleshooting Windows, macOS and mobile operating systems", ar: "استكشاف أعطال ويندوز وmacOS وأنظمة الهواتف" },
      { en: "Security threats, social engineering and data protection", ar: "التهديدات الأمنية والهندسة الاجتماعية وحماية البيانات" },
      { en: "Remote access tools and support documentation", ar: "أدوات الوصول عن بُعد وتوثيق الدعم" },
    ],
  },
  {
    id: "os-basics",
    title: { en: "Operating Systems Basics", ar: "أساسيات أنظمة التشغيل" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-03",
    badge: `${base}/images/certificates/os-basics.webp`,
    verifyUrl: "https://www.credly.com/badges/6ae0c319-25b2-41d1-a778-bf03d6aff464",
    skills: [
      { en: "Windows architecture and administrative tools", ar: "بنية ويندوز وأدوات الإدارة" },
      { en: "Linux shell: text files, services and log files", ar: "سطر أوامر لينكس: الملفات النصية والخدمات وملفات السجل" },
      { en: "Basic Linux security", ar: "أساسيات أمان لينكس" },
      { en: "Network and email setup on mobile devices", ar: "إعداد الشبكة والبريد على الأجهزة المحمولة" },
    ],
  },
];

/** "Jun 2026" / "يونيو 2026" — Gregorian calendar and Latin digits in both languages. */
export function formatIssued(iso: string, isAr: boolean): string {
  return new Intl.DateTimeFormat(isAr ? "ar-EG-u-nu-latn" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
