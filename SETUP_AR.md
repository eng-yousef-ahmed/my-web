# دليل التشغيل — موقع يوسف أحمد 🇸🇦 🇪🇬

دليل عملي خطوة بخطوة: من تنزيل الملفات لحد ما الموقع شغّال على الإنترنت.

---

## 1️⃣ تنزيل ملفات المشروع على جهازك

**الطريقة الأسهل (من بيئة العمل دي):**
- دوّر على زر **Download / Export ZIP** في واجهة بيئة العمل الحالية — بينزّل المشروع كله كملف مضغوط.
- فك الضغط في أي مجلد، مثلًا: `C:\Projects\my-web`

**لو بتستخدم Git / GitHub:**
```bash
git clone <رابط-المشروع>
cd my-web
```

> ⚠️ تأكد إن المجلد فيه: `src` و `public` و `index.html` و `package.json`

---

## 2️⃣ تثبيت Node.js (مرة واحدة فقط)

1. افتح [nodejs.org](https://nodejs.org)
2. نزّل نسخة **LTS** (الموصى بها) وثبّتها بالـ Next العادي
3. للتأكد، افتح Terminal أو CMD واكتب:
```bash
node -v
```
لو ظهرت نسخة (مثل `v20.x.x`) يبقى تمام ✅

---

## 3️⃣ تشغيل الموقع على جهازك (وضع التطوير)

افتح مجلد المشروع في الطرفية:
- **ويندوز:** افتح مجلد المشروع → اكتب `cmd` في شريط العنوان → Enter
- **أو** افتح VS Code → Open Folder → `` Ctrl+` `` لفتح الطرفية

ثم نفّذ:
```bash
npm install        # مرة واحدة فقط — يثبّت المكتبات
npm run dev        # يشغّل الموقع
```

هيظهر رابط مثل:
```
➜  Local: http://localhost:3000/
```
افتحه في المتصفح — والموقع شغّال! أي تعديل بتحفظه بيظهر فورًا.

> 💡 الأرقام والإيميل **شغّالة بالفعل** بدون أي إعداد (مدموجة في الكود كقيم افتراضية).

---

## 4️⃣ تجهيز النسخة النهائية (Production)

```bash
npm run build
```

هيتعمل مجلد **`dist`** — ده الموقع النهائي (HTML + CSS + JS مضغوطين وجاهزين).

**تجربة النسخة النهائية محليًا:**
```bash
npx vite preview
```

---

## 5️⃣ نشر الموقع على الإنترنت (مجانًا)

### 🟢 Vercel (المستخدم حاليًا — مع GitHub)

1. ارفع المشروع على GitHub
2. ادخل [vercel.com](https://vercel.com) → Import المشروع → Build command: `npm run build` → Output: `dist`
3. Deploy — وكل تعديل بترفعه على GitHub بيتنشر تلقائيًا
4. ملف `vercel.json` فيه الروابط النظيفة (`/about` بدل `/#/about`) وهيدرز الأمان، ويُقرأ تلقائيًا

### 🟢 Netlify أو Cloudflare Pages

- **Netlify Drop (من غير GitHub):** نفّذ `npm run build` ثم اسحب مجلد `dist` إلى [app.netlify.com/drop](https://app.netlify.com/drop). الملفان `_redirects` و`_headers` داخل `dist` يُقرآن تلقائيًا (الأول للروابط النظيفة، والثاني للهيدرز).
- **مع GitHub:** نفس خطوات Vercel (Build: `npm run build`، Output: `dist`).

### 🟢 استضافة مشتركة / cPanel (لو عندك استضافة عربية)

1. نفّذ `npm run build`
2. ادخل لوحة الاستضافة → File Manager → مجلد `public_html`
3. ارفع **محتويات مجلد `dist`** (مش المجلد نفسه)
4. الموقع يستخدم روابط نظيفة (`/about`)، فأنشئ بجوارها ملف اسمه `.htaccess` فيه:

```apache
RewriteEngine On
# /about  →  about.html  (الصفحات المُولَّدة وقت البناء)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
# أي رابط آخر  →  التطبيق
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

   (هذا الملف لا يعمل إلا على سيرفرات Apache. لو الاستضافة غير Apache فاستخدم Vercel أو Netlify.)

---

## 6️⃣ ربط دومين خاص (yousefahmed.com مثلًا)

1. اشترِ الدومين من أي مزود (Namecheap / GoDaddy / مزود محلي)
2. من لوحة Netlify/Vercel: **Domains → Add domain**
3. عند مزود الدومين اضبط DNS:
   - `A` record → العنوان اللي بيديهولك المزود
   - أو `CNAME` → لرابط النشر
4. خلال دقائق/ساعات الموقع بيفتح على دومينك + شهادة SSL مجانية تلقائيًا

---

## ❓ أسئلة شائعة

**هل لازم أعدّل الأرقام لو رفعت الموقع؟**
لأ — الأرقام (+966 56 899 2794 / +20 120 336 1192) والإيميل (youseefa77@gmail.com) مدموجة وبتشتغل فورًا. لو حبيت تغيرها من غير كود: اعمل ملف `.env.local` في جذر المشروع وحط فيه القيم (شوف README.md).

**الصور هتشتغل على أي استضافة؟**
أيوه — الصور محلية داخل مجلد `public/images` وبتتنشر مع الموقع. لتغيير صورة استبدل الملف بنفس الاسم (شوف README.md).

**إزاي أغيّر اللوجو؟**
حط ملفاتك في `public` بالأسماء: `logo-light.svg` (أبيض للخلفيات الداكنة) و `logo-dark.svg` (أسود للفاتحة) — من غير أي تعديل في الكود.

**أقدر أشغّل الموقع بفتح index.html مباشرة؟**
لأ — استخدم `npm run dev` أو `npx vite preview` أو ارفعه على استضافة. الفتح المباشر من المجلد بيكسّر مسارات الملفات.

---

## ملخص سريع ⚡

```bash
npm install       # مرة واحدة
npm run dev       # شغل محلي للتطوير
npm run build     # جهّز النسخة النهائية → مجلد dist
npx vite preview  # جرّب النسخة النهائية محليًا
```
ثم ارفع المشروع على GitHub ليُنشر على Vercel تلقائيًا (أو اسحب `dist` إلى [Netlify Drop](https://app.netlify.com/drop)) — والموقع على الإنترنت 🚀
