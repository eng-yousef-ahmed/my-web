import type { B } from "../i18n";

/* ---------------- verified certificates ----------------
 * Cisco Networking Academy "Certificate of Course Completion" (student-level credential),
 * each issued with a public Credly badge (and, for most, a PDF certificate with a Cert ID). The verify links come from the QR code printed
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
  /** the plain completion certificate (PDF), when one was issued for this course */
  pdf?: string;
  /** what the certificate states the holder can do (short form of the printed list) */
  skills: B[];
};

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const pdfOf = (name: string) => `${base}/assets/certificates/${name}.pdf`;

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
    id: "security-connectivity-support",
    title: { en: "Security and Connectivity Support", ar: "دعم الأمن والاتصال" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-04",
    badge: `${base}/images/certificates/security-connectivity-support.webp`,
    verifyUrl: "https://www.credly.com/badges/6410d571-6231-4556-bf01-969e83bc1f88",
    pdf: pdfOf("security-connectivity-support"),
    skills: [
      { en: "Diagnosing connectivity issues with services, peripherals and shared resources", ar: "تشخيص مشاكل الاتصال بالخدمات والأجهزة الطرفية والموارد المشتركة" },
      { en: "Troubleshooting wired and wireless networks for users", ar: "استكشاف أعطال الشبكات السلكية واللاسلكية للمستخدمين" },
      { en: "IP addressing, default gateways, DNS and DHCP", ar: "عنونة IP والبوابات الافتراضية وDNS وDHCP" },
      { en: "Command-line tools to verify connectivity", ar: "أدوات سطر الأوامر للتحقق من الاتصال" },
      { en: "Common cyber threats, social engineering and protecting organizational data", ar: "التهديدات الشائعة والهندسة الاجتماعية وحماية بيانات المؤسسة" },
    ],
  },
  {
    id: "hardware-upgrade-support",
    title: { en: "Hardware and Upgrade Support", ar: "دعم الأجهزة والترقية" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-04",
    badge: `${base}/images/certificates/hardware-upgrade-support.webp`,
    verifyUrl: "https://www.credly.com/badges/5d6a6cad-d6d2-41a7-aed4-77917f0ae6a7",
    pdf: pdfOf("hardware-upgrade-support"),
    skills: [
      { en: "Troubleshooting computer hardware components and peripherals", ar: "استكشاف أعطال مكونات الكمبيوتر والأجهزة الطرفية" },
      { en: "Checking hardware and performance with built-in tools", ar: "فحص الأجهزة والأداء بالأدوات المدمجة" },
      { en: "Ports, cables and component compatibility", ar: "المنافذ والكابلات وتوافق المكونات" },
      { en: "Deciding when upgrades are needed", ar: "تحديد الحاجة إلى الترقية" },
      { en: "Safely replacing and upgrading RAM, drives and power supplies", ar: "الاستبدال والترقية الآمنة للذاكرة والأقراص ووحدات الطاقة" },
    ],
  },
  {
    id: "it-customer-support-basics",
    title: { en: "IT Customer Support Basics", ar: "أساسيات دعم عملاء تقنية المعلومات" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-03",
    badge: `${base}/images/certificates/it-customer-support-basics.webp`,
    verifyUrl: "https://www.credly.com/badges/c8ced2b8-b661-4d26-9616-7d0f93070cda",
    pdf: pdfOf("it-customer-support-basics"),
    skills: [
      { en: "Help-desk functions and purpose", ar: "وظائف وهدف مكتب المساعدة" },
      { en: "Recording and summarizing customer issues and solutions", ar: "توثيق وتلخيص مشاكل العملاء وحلولها" },
      { en: "Step-by-step troubleshooting", ar: "استكشاف الأعطال خطوة بخطوة" },
      { en: "Supporting user devices remotely", ar: "دعم أجهزة المستخدمين عن بُعد" },
      { en: "Common issues in email, collaboration and productivity apps", ar: "المشاكل الشائعة في البريد وأدوات التعاون وبرامج الإنتاجية" },
    ],
  },
  {
    id: "computer-hardware-basics",
    title: { en: "Computer Hardware Basics", ar: "أساسيات أجهزة الكمبيوتر" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-03",
    badge: `${base}/images/certificates/computer-hardware-basics.webp`,
    verifyUrl: "https://www.credly.com/badges/b6875559-e0fc-4153-b602-1e7a29f67796",
    pdf: pdfOf("computer-hardware-basics"),
    skills: [
      { en: "Installing components to build, repair or upgrade PCs", ar: "تركيب المكونات لبناء أجهزة الكمبيوتر وإصلاحها وترقيتها" },
      { en: "Hardware and preventive maintenance", ar: "صيانة الأجهزة والصيانة الوقائية" },
      { en: "Laptops and mobile devices", ar: "الحواسيب المحمولة والأجهزة المحمولة" },
      { en: "General and fire safety standards", ar: "معايير السلامة العامة وسلامة الحريق" },
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
    pdf: pdfOf("os-basics"),
    skills: [
      { en: "Windows architecture and administrative tools", ar: "بنية ويندوز وأدوات الإدارة" },
      { en: "Linux shell: text files, services and log files", ar: "سطر أوامر لينكس: الملفات النصية والخدمات وملفات السجل" },
      { en: "Basic Linux security", ar: "أساسيات أمان لينكس" },
      { en: "Network and email setup on mobile devices", ar: "إعداد الشبكة والبريد على الأجهزة المحمولة" },
    ],
  },
  {
    id: "intro-modern-ai",
    title: { en: "Introduction to Modern AI", ar: "مقدمة في الذكاء الاصطناعي الحديث" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-02",
    badge: `${base}/images/certificates/intro-modern-ai.webp`,
    verifyUrl: "https://www.credly.com/badges/9c620900-4613-46ba-8675-990182bc9a3c",
    pdf: pdfOf("intro-modern-ai"),
    skills: [
      { en: "Core AI and machine-learning concepts", ar: "المفاهيم الأساسية للذكاء الاصطناعي وتعلّم الآلة" },
      { en: "How large language models work and how to prompt them", ar: "كيف تعمل النماذج اللغوية الكبيرة وكيفية كتابة التعليمات لها" },
      { en: "Chatbots for summarizing, rewording and idea generation", ar: "استخدام المحادثات الذكية للتلخيص وإعادة الصياغة وتوليد الأفكار" },
      { en: "LLMs with tools (web search, page scraping) and multimodal prompting", ar: "النماذج مع الأدوات (بحث الويب) والتعليمات متعددة الوسائط" },
    ],
  },
  {
    id: "intro-data-science",
    title: { en: "Introduction to Data Science", ar: "مقدمة في علم البيانات" },
    issuer: ISSUER,
    level: LEVEL,
    issued: "2026-06-02",
    badge: `${base}/images/certificates/intro-data-science.webp`,
    verifyUrl: "https://www.credly.com/badges/eb0381e0-2c57-4af6-90c7-3eb720f29a6c",
    pdf: pdfOf("intro-data-science"),
    skills: [
      { en: "Promises and challenges of data analytics", ar: "وعود وتحديات تحليل البيانات" },
      { en: "The role of data in AI and machine learning", ar: "دور البيانات في الذكاء الاصطناعي وتعلّم الآلة" },
      { en: "Career options in data analytics", ar: "المسارات المهنية في تحليل البيانات" },
    ],
  },
];

export function formatIssued(iso: string, isAr: boolean): string {
  return new Intl.DateTimeFormat(isAr ? "ar-EG-u-nu-latn" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

/* ---------------- pathway exam certificates ----------------
 * Cisco Networking Academy certificates for completing the career-path exams.
 * They carry a certificate ID (no public badge), so the PDF itself is linked.
 */
export type ExamCertificate = {
  id: string;
  title: B;
  issuer: B;
  issued: string;
  certId: string;
  pdf: string;
};

export const EXAM_CERTIFICATES: ExamCertificate[] = [
  {
    id: "network-technician-exam",
    title: { en: "Network Technician Career Path Exam", ar: "امتحان مسار فني الشبكات" },
    issuer: ISSUER,
    issued: "2026-06-07",
    certId: "5d20b25a-3610-442e-9c71-c246d22959cc",
    pdf: `${base}/assets/certificates/network-technician-pathway-exam.pdf`,
  },
  {
    id: "it-support-exam",
    title: { en: "IT Support Specialist Pathway Exam", ar: "امتحان مسار أخصائي الدعم التقني" },
    issuer: ISSUER,
    issued: "2026-06-04",
    certId: "f09c6b5f-b9ec-4c5d-92b1-c4c56444fabe",
    pdf: `${base}/assets/certificates/it-support-specialist-pathway-exam.pdf`,
  },
];
