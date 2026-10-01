
پروپوزال پروژه GitCast

1. معرفی پروژه

GitCast یک سیستم انتشار پادکست مبتنی بر Git است که هدف آن حذف پنل مدیریت، دیتابیس و Backend دائمی از فرآیند انتشار پادکست است.

مدیر پادکست باید بتواند تنها با اجرای یک دستور در ترمینال، اطلاعات قسمت جدید را وارد کند، فایل صوتی را مشخص کند، اطلاعات را بازبینی و تأیید کند و در نهایت با یک "git push" تمام فرآیند انتشار به‌صورت خودکار انجام شود.

سیستم باید:

- وب‌سایت عمومی پادکست را تولید و Deploy کند.
- RSS Feed استاندارد Podcast تولید کند.
- فایل‌های صوتی را روی Cloudflare R2 ذخیره کند.
- اطلاعات Episodeها را از فایل‌های Markdown داخل Repository دریافت کند.
- با GitHub Actions تمام فرآیند Build، Validation، RSS Generation، Upload و Deployment را خودکار کند.
- برای انتشار در سرویس‌هایی مانند Castbox، Spotify و Apple Podcasts قابل استفاده باشد.
- یک رابط کاربری مدرن، جذاب و Responsive برای شنوندگان داشته باشد.

---

2. هدف اصلی

هدف این پروژه ساخت یک CMS سنتی نیست.

هیچ پنل Admin، دیتابیس یا Backend دائمی برای مدیریت Episodeها وجود نداشته باشد.

Git Repository باید به‌عنوان Source of Truth پروژه عمل کند.

فرآیند اصلی:

Terminal CLI
     ↓
Create Episode
     ↓
Review
     ↓
Markdown + Audio
     ↓
git add
     ↓
git commit
     ↓
git push
     ↓
GitHub Actions
     ├── Validate
     ├── Upload Audio → Cloudflare R2
     ├── Generate RSS
     ├── Build Website
     └── Deploy
             ↓
       Public Podcast

---

3. Technology Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React
- Static Site Generation / Static Export
- Responsive Design
- Dark / Light Mode

سایت باید تا حد امکان Static باشد و برای اجرای آن Backend دائمی نیاز نباشد.

Content

Episodeها با Markdown مدیریت شوند.

هر Episode در Repository ساختار زیر داشته باشد:

episodes/
└── 001/
    ├── episode.md
    └── audio.mp3

یا:

episodes/
└── 001/
    └── episode.md

و فایل صوتی به‌صورت محلی در CLI دریافت و در فرآیند انتشار به R2 منتقل شود.

معماری باید طوری طراحی شود که Audio Storage از Content Repository جدا باشد.

CLI

CLI با:

- Node.js
- TypeScript
- Commander یا یک CLI framework مناسب
- Inquirer یا یک ابزار مناسب برای Interactive Prompt

پیاده‌سازی شود.

مثلاً:

podcast new

---

4. ساختار Repository

ساختار پیشنهادی:

gitcast/
│
├── app/
│   ├── page.tsx
│   ├── episodes/
│   ├── about/
│   └── ...
│
├── components/
│   ├── AudioPlayer/
│   ├── EpisodeCard/
│   ├── Header/
│   ├── Footer/
│   └── ...
│
├── content/
│   └── episodes/
│       ├── 001/
│       │   └── episode.md
│       ├── 002/
│       │   └── episode.md
│       └── ...
│
├── public/
│   ├── images/
│   └── favicon/
│
├── scripts/
│   ├── podcast-cli.ts
│   ├── generate-rss.ts
│   └── validate-episodes.ts
│
├── lib/
│   ├── episodes.ts
│   ├── rss.ts
│   ├── metadata.ts
│   └── r2.ts
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── podcast.config.ts
├── package.json
├── tsconfig.json
└── README.md

---

5. فایل Configuration

اطلاعات عمومی پادکست در یک فایل مرکزی قرار داشته باشد:

export default {
  title: "Podcast Name",
  description: "Podcast description",
  author: "Author Name",
  website: "https://example.com",
  language: "fa-IR",
  category: "Technology",

  cover: "/images/cover.jpg",

  rss: {
    title: "Podcast Name",
    description: "Podcast description",
    author: "Author Name",
    email: "example@example.com"
  },

  audio: {
    baseUrl: "https://audio.example.com"
  }
}

این اطلاعات نباید برای هر Episode تکرار شوند.

---

6. ساخت Episode

کاربر دستور زیر را اجرا کند:

podcast new

CLI به‌صورت Interactive اطلاعات را دریافت کند.

نمونه:

🎙️ Create New Episode

Title:
> هوش مصنوعی واقعاً چگونه یاد می‌گیرد؟

Episode number:
> 12

Description:
> در این قسمت درباره...

Tags:
> AI, Machine Learning, Neural Network

Author:
> Emech

Publish date:
> 2026-10-01

Audio file:
> ~/Downloads/episode-12.mp3

Cover image:
> ~/Downloads/episode-12.jpg

سپس اطلاعات استخراج‌شده نمایش داده شود:

────────────────────────────────

Episode #12

Title:
هوش مصنوعی واقعاً چگونه یاد می‌گیرد؟

Date:
2026-10-01

Audio:
episode-12.mp3

Duration:
43:21

File size:
78.4 MB

Tags:
AI
Machine Learning
Neural Network

────────────────────────────────

[1] Publish
[2] Edit
[3] Cancel

کاربر فقط بعد از تأیید بتواند Episode را ایجاد کند.

---

7. تولید Markdown

پس از تأیید:

content/episodes/012/episode.md

ساخته شود.

نمونه:

---
title: "هوش مصنوعی واقعاً چگونه یاد می‌گیرد؟"
episode: 12
date: 2026-10-01
description: "در این قسمت درباره..."
author: "Emech"
tags:
  - AI
  - Machine Learning
  - Neural Network
---

توضیحات کامل Episode در این قسمت قرار می‌گیرد.

اطلاعاتی مانند:

- Audio URL
- Audio size
- Duration
- GUID

در صورت امکان توسط سیستم تولید شوند و کاربر مجبور نباشد دستی وارد کند.

---

8. Audio Storage

فایل‌های صوتی در Git Repository به‌عنوان فایل اصلی نگهداری نشوند.

Cloudflare R2 به‌عنوان Audio Storage استفاده شود.

ساختار پیشنهادی:

R2 Bucket
│
├── audio/
│   ├── 001.mp3
│   ├── 002.mp3
│   └── 012.mp3
│
└── covers/
    ├── 001.jpg
    └── 012.jpg

Base URL:

https://audio.example.com

URL Episode:

https://audio.example.com/audio/012.mp3

سیستم باید قابلیت استفاده از Custom Domain برای R2 را داشته باشد.

---

9. GitHub Actions

با هر Push به branch اصلی، Workflow اجرا شود.

git push
     ↓
GitHub Actions
     ↓
Install dependencies
     ↓
Validate episodes
     ↓
Build application
     ↓
Generate RSS
     ↓
Upload audio to Cloudflare R2
     ↓
Deploy website

Workflow باید در صورت وجود خطا متوقف شود.

مثلاً:

❌ Missing title
❌ Invalid date
❌ Duplicate episode number
❌ Invalid audio file
❌ Missing description

نباید سایت با داده خراب Deploy شود.

---

10. Cloudflare R2 Upload

GitHub Actions باید بتواند فایل‌های صوتی جدید را به R2 منتقل کند.

Credentials از GitHub Secrets دریافت شوند.

هیچ Secretی نباید در Repository قرار بگیرد.

مثلاً:

R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_URL

فایل‌هایی که قبلاً Upload شده‌اند دوباره Upload نشوند، مگر اینکه محتوای آنها تغییر کرده باشد.

---

11. RSS Feed

سیستم باید RSS استاندارد Podcast تولید کند.

URL:

/feed.xml

RSS باید شامل اطلاعات Podcast و Episodeها باشد.

برای هر Episode:

<item>
    <title>...</title>

    <description>...</description>

    <pubDate>...</pubDate>

    <guid isPermaLink="false">
        ...
    </guid>

    <enclosure
        url="https://audio.example.com/audio/012.mp3"
        length="..."
        type="audio/mpeg"
    />

    <itunes:author>...</itunes:author>

    <itunes:duration>...</itunes:duration>

    <itunes:episode>12</itunes:episode>
</item>

GUID هر Episode باید ثابت باشد.

RSS باید با استانداردهای رایج Podcast سازگار باشد.

---

12. Website

Frontend باید مدرن و حرفه‌ای باشد و ظاهر آن شبیه یک پروژه واقعی SaaS / Media Platform باشد، نه یک Blog ساده.

Homepage

شامل:

- Podcast Cover
- نام Podcast
- توضیح کوتاه
- دکمه Subscribe / RSS
- Latest Episode
- لیست Episodeها
- Search
- دسته‌بندی / Tags
- Footer

نمونه ساختار:

┌──────────────────────────────────────┐
│ LOGO          Episodes   About   RSS │
├──────────────────────────────────────┤
│                                      │
│          PODCAST COVER               │
│                                      │
│        PODCAST NAME                  │
│                                      │
│    A modern podcast description     │
│                                      │
│       [ Listen Latest Episode ]     │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Latest Episodes                     │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ EP 12                            │ │
│ │ هوش مصنوعی چگونه یاد می‌گیرد؟  │ │
│ │ 43:21              ▶ Play       │ │
│ └──────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘

---

13. Episode Page

هر Episode URL مستقل داشته باشد:

/episodes/12

صفحه شامل:

- عنوان
- شماره Episode
- تاریخ
- توضیحات
- Tags
- Cover
- Audio Player
- Download
- Share
- Previous / Next Episode

باشد.

---

14. Audio Player

یک Audio Player اختصاصی و مدرن ساخته شود.

قابلیت‌ها:

- Play / Pause
- Seek
- Volume
- Playback speed
- 0.75x
- 1x
- 1.25x
- 1.5x
- 2x
- نمایش مدت
- Progress bar
- Keyboard shortcuts
- حفظ موقعیت پخش در LocalStorage

Player باید روی موبایل و Desktop مناسب باشد.

---

15. طراحی Responsive

اولویت:

Mobile
↓
Tablet
↓
Desktop

صفحه باید برای موبایل کاملاً بهینه باشد.

Podcast بیشتر از طریق موبایل شنیده خواهد شد، بنابراین Mobile UI اهمیت ویژه‌ای دارد.

---

16. Dark / Light Mode

سایت باید:

- Dark Mode
- Light Mode
- System Preference

داشته باشد.

انتخاب کاربر در LocalStorage ذخیره شود.

---

17. SEO

برای هر Episode:

- Title
- Description
- Canonical URL
- Open Graph
- Twitter/X Card
- Structured Data

تولید شود.

برای Podcast و Episodeها JSON-LD مناسب استفاده شود.

---

18. CLI Commands

CLI حداقل این دستورات را داشته باشد:

podcast new

ساخت Episode جدید.

podcast validate

اعتبارسنجی تمام Episodeها.

podcast build

Build کردن سایت و RSS به‌صورت Local.

podcast preview

اجرای سایت Local.

podcast list

نمایش Episodeها.

podcast info 12

نمایش اطلاعات Episode 12.

---

19. Local Preview

قبل از Push، کاربر بتواند سایت را Local مشاهده کند:

podcast preview

مثلاً:

Local:
http://localhost:3000

این امکان باید وجود داشته باشد تا کاربر قبل از انتشار نهایی سایت را بررسی کند.

---

20. Workflow پیشنهادی نهایی

فرآیند روزمره انتشار باید تا حد امکان به این سادگی باشد:

podcast new

اطلاعات وارد می‌شود.

Review

[ Publish ]

بعد:

git add .
git commit -m "Add episode 12"
git push

و تمام.

GitHub Actions بقیه کارها را انجام دهد:

✓ Validate
✓ Generate metadata
✓ Upload audio to R2
✓ Generate RSS
✓ Build website
✓ Deploy GitHub Pages

---

21. اصل مهم پروژه

کاربر نباید مجبور باشد برای انتشار Episode:

- وارد پنل Admin شود.
- وارد دیتابیس شود.
- RSS را دستی تغییر دهد.
- مدت فایل صوتی را دستی محاسبه کند.
- حجم فایل را دستی وارد کند.
- URL فایل صوتی را دستی بنویسد.
- HTML بنویسد.
- فایل‌های سایت را دستی تغییر دهد.
- تنظیمات Podcast Platformها را برای هر Episode تغییر دهد.

تمام این موارد باید Automated باشند.

کاربر فقط:

Create
→ Review
→ Commit
→ Push

انجام دهد.

---

22. قابلیت‌های آینده

معماری باید طوری نوشته شود که بعداً قابلیت‌های زیر قابل اضافه شدن باشند:

- YouTube integration
- Spotify metadata
- Telegram publishing
- Discord notification
- Newsletter
- Automatic transcription
- AI-generated episode summary
- AI-generated tags
- Automatic chapter generation
- Multiple podcasts
- Multiple languages
- Analytics
- Download statistics
- RSS validation
- Scheduled publishing

اما این قابلیت‌ها در نسخه اول پیاده‌سازی نشوند.

---

23. MVP

نسخه اول فقط شامل موارد زیر باشد:

1. Next.js website
2. Modern responsive UI
3. Markdown-based episodes
4. Interactive CLI
5. Episode validation
6. Automatic metadata extraction
7. Cloudflare R2 upload
8. RSS generation
9. GitHub Actions
10. GitHub Pages deployment
11. Modern audio player
12. Dark / Light mode
13. SEO
14. Episode pages
15. Homepage
16. Local preview

---

24. معیار موفقیت

در نهایت باید بتوانم از یک Repository تازه Clone شده:

npm install

سپس:

npm run podcast:new

را اجرا کنم.

CLI اطلاعات را بگیرد، فایل صوتی را دریافت کند و بعد از تأیید:

content/episodes/001/episode.md

را بسازد.

سپس:

git add .
git commit -m "Add episode 1"
git push

و بدون هیچ کار دستی دیگری:

GitHub Actions
      ↓
Validate
      ↓
Upload MP3 → Cloudflare R2
      ↓
Generate RSS
      ↓
Build Website
      ↓
Deploy GitHub Pages

انجام شود.

در نهایت:

https://podcast.example.com
https://podcast.example.com/episodes/1
https://podcast.example.com/feed.xml
https://audio.example.com/audio/001.mp3

در دسترس باشند.

---

25. دستور نهایی برای AI Coding Agent

پروژه را به‌صورت کامل و Production-ready پیاده‌سازی کن.

ابتدا Repository structure و معماری را ایجاد کن، سپس CLI، content parser، RSS generator، R2 uploader، GitHub Actions و frontend را پیاده‌سازی کن.

از Placeholderهای غیرضروری استفاده نکن.

کد باید TypeScript و strongly typed باشد.

تمام Secretها باید از Environment Variables / GitHub Secrets خوانده شوند.

هیچ API key، password یا credentialی نباید داخل Repository قرار گیرد.

README کامل برای Setup اولیه، ساخت R2 Bucket، تنظیم GitHub Secrets، اتصال Custom Domain، اجرای Local و انتشار Episode بنویس.

قبل از پایان، پروژه باید با یک Episode نمونه قابل اجرا باشد.

همچنین برای هر بخش مهم تست مناسب ایجاد کن و در پایان دستورهای دقیق Setup و Deployment را در README قرار بده.

مهم‌ترین اصل:

هدف این پروژه ساخت یک Git-based Podcast Publishing System است، نه صرفاً یک Podcast Website.