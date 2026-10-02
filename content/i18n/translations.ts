// Keep locale message keys aligned; the Persian type check enforces full coverage.
const englishMessages = {
  "metadata.description": "We talk about anything related to computers!",
  "navigation.main": "Main navigation",
  "navigation.mobile": "Mobile navigation",
  "navigation.home": "{brand} home",
  "navigation.episodes": "Episodes",
  "navigation.about": "About",
  "navigation.feed": "GitCast feed",
  "navigation.explore": "Episodes",
  "navigation.openMenu": "Open menu",
  "navigation.closeMenu": "Close menu",
  "navigation.switchLanguage": "Switch language to {language}",
  "footer.tagline": "Made with ❤️ by mohammad-hassani as open source",
  "home.hero.eyebrow": "For computer nerds!",
  "home.hero.title.firstLine": "GitCast",
  "home.hero.title.secondLine": "A podcast for",
  "home.hero.title.accent": " developers",
  "home.hero.description": "Conversations about technology, computers, creativity, and life—for moments when you want to slow down and listen.",
  "home.latest.episode": "LATEST · EPISODE {id}",
  "home.featured.number": "EPISODE {id}",
  "home.latest.listen": "Listen to the latest episode",
  "home.explore": "Explore episodes",
  "home.subscribe": "Subscribe via RSS",
  "home.intro.eyebrow": "What do we do here?",
  "home.intro.title": "Something new in every episode.",
  "home.intro.description": "GitCast is a podcast about technology, storytelling, and the journey of building meaningful things in the age of AI.",
  "home.episodes.eyebrow": "The listening archive",
  "home.episodes.title": "Episodes",
  "home.episodes.count.one": "{count} episode",
  "home.episodes.count.other": "{count} episodes",
  "home.episodes.number": "EP. {id}",
  "home.episodes.listen": "Listen to episode",
  "home.episodes.empty": "No episodes have been published yet.",
  "home.closing.eyebrow": "Stay in the loop",
  "home.closing.title": "Never miss the next story.",
  "home.closing.description": "Add the feed to your favorite podcast app, or search for GitCast in the app.",
  "home.closing.feed": "Get the podcast feed",
  "about.eyebrow": "About",
  "about.hero.title.beforeAccent": "We listen for voices that",
  "about.hero.title.accent": "change how we see things.",
  "about.hero.description": "A space for good questions, fresh ideas, and conversations about computers.",
  "about.promise.persian": "In Persian, for everyone",
  "about.promise.open": "Open source",
  "about.promise.listening": "Made for listening",
  "about.beliefs.eyebrow": "About me",
  "about.beliefs.title": "I'm Mohammad Hassani, and this is GitCast—a podcast about technology, storytelling, and the journey of building meaningful things in the age of AI.",
  "about.principle.story.title": "What do I do?",
  "about.principle.story.description": "I'm a software developer!",
  "about.principle.open.title": "Where can you find me?",
  "about.principle.open.description": "I'm on GitHub as mohammad-hassani and on Telegram at @MistrMohandes.",
  "about.principle.freedom.title": "Why GitCast?",
  "about.principle.freedom.description": "Just for fun.",
  "about.listen.eyebrow": "Give us a listen",
  "about.listen.title": "Pick an episode and start listening.",
  "about.listen.action": "Browse episodes",
  "notFound.title": "Page not found.",
  "notFound.description.beforeBrand": "This page or episode is not available on",
  "notFound.description.afterBrand": ".",
  "notFound.home": "Back to home",
  "episode.number": "Story {id}",
  "episode.back": "Back to episodes",
  "episode.notes": "Episode notes",
  "player.audioUnsupported": "Your browser does not support the audio player.",
  "player.playError": "Unable to play this file. Check your connection or the audio URL.",
  "player.unavailableError": "This audio file is unavailable. Please try again later.",
  "player.nowPlaying": "Playing episode",
  "player.speed": "Playback speed",
  "player.position": "Playback position",
  "player.forward": "Forward 15 seconds",
  "player.back": "Back 15 seconds",
  "player.skip.amount": "15",
  "player.pause": "Pause playback",
  "player.start": "Start playback",
} as const;

type MessageKey = keyof typeof englishMessages;
type MessageSet = Record<MessageKey, string>;

export const translations = {
  en: {
    nativeName: "English",
    shortName: "EN",
    intlLocale: "en-US",
    direction: "ltr",
    messages: englishMessages,
  },
  fa: {
    nativeName: "فارسی",
    shortName: "FA",
    intlLocale: "fa-IR",
    direction: "rtl",
    messages: {
      "metadata.description": "اینجا در مورد هرچیزی که به کامپیوتر ربط داشته باشه صحبت می‌کنیم!",
      "navigation.main": "پیمایش اصلی",
      "navigation.mobile": "پیمایش موبایل",
      "navigation.home": "صفحه‌ی اصلی {brand}",
      "navigation.episodes": "اپیزودها",
      "navigation.about": "درباره‌ی ما",
      "navigation.feed": "فید گیت‌کست",
      "navigation.explore": "اپیزودها",
      "navigation.openMenu": "باز کردن منو",
      "navigation.closeMenu": "بستن منو",
      "navigation.switchLanguage": "تغییر زبان به {language}",
      "footer.tagline": "ساخته شده با ❤️ توسط mohammad-hassani به صورت منبع باز",
      "home.hero.eyebrow": "اینجا فقط خوره های کامپیوتر هستن!",
      "home.hero.title.firstLine": "گیت‌کَست",
      "home.hero.title.secondLine": "پادکستی برای",
      "home.hero.title.accent": " برنامه‌نویس‌ها",
      "home.hero.description": "گفت‌وگوهایی درباره‌ی فناوری، کامپیوتر، خلاقیت و زندگی؛ برای لحظه‌هایی که می‌خوای آهسته‌تر گوش کنی.",
      "home.latest.episode": "تازه‌ترین · قسمت {id}",
      "home.featured.number": "قسمت {id}",
      "home.latest.listen": "شنیدن تازه‌ترین قسمت",
      "home.explore": "کشف اپیزودها",
      "home.subscribe": "دنبال کردن از طریق RSS",
      "home.intro.eyebrow": "اینجا چیکار می‌کنیم؟",
      "home.intro.title": "هر قسمت، مطالبی تازه.",
      "home.intro.description": " گیت‌کست، پادکستی درباره‌ی فناوری، داستان‌گویی، و مسیر ساختن چیزهای مهم در عصر هوش مصنوعی.",
      "home.episodes.eyebrow": "آرشیو شنیداری",
      "home.episodes.title": "اپیزودها",
      "home.episodes.count.one": "{count} اپیزود",
      "home.episodes.count.other": "{count} اپیزود",
      "home.episodes.number": "قسمت {id}",
      "home.episodes.listen": "شنیدن اپیزود",
      "home.episodes.empty": "هنوز اپیزودی منتشر نشده است.",
      "home.closing.eyebrow": "در جریان باش",
      "home.closing.title": "قسمت بعدی را از دست نده.",
      "home.closing.description": "فید را به اپلیکیشن پادکست محبوبت اضافه کن یا توی اپلیکیشن محبوبت به دنبال گیت‌کست بگرد.",
      "home.closing.feed": "دریافت فید پادکست",
      "about.eyebrow": "درباره‌ی",
      "about.hero.title.beforeAccent": "ما به صداهایی گوش می‌دهیم که",
      "about.hero.title.accent": "چیزی در ما تغییر می‌دهند.",
      "about.hero.description": "فضایی برای سؤال‌های خوب، ایده‌های تازه و گفت‌وگوهای کامپیوتری.",
      "about.promise.persian": "فارسی، برای همه‌جا",
      "about.promise.open": "منتشرشده با منبع باز",
      "about.promise.listening": "ساخته‌شده برای شنیدن",
      "about.beliefs.eyebrow": "درباره‌ی‌ما",
      "about.beliefs.title": "من محمد حسنی هستم و اینجا گیت‌کست است؛ پادکستی درباره‌ی فناوری، داستان‌گویی، و مسیر ساختن چیزهای مهم در عصر هوش مصنوعی.",
      "about.principle.story.title": "چیکاره‌ام؟",
      "about.principle.story.description": "برنامه نویس مملکت!",
      "about.principle.open.title": "کجا پیدام کنی؟",
      "about.principle.open.description": "توی گیت‌هاب mohammad-hassani هستم و توی تلگرام MistrMohandes@ :)",
      "about.principle.freedom.title": "چرا گیت‌کست؟",
      "about.principle.freedom.description": "فقط برای تفریح",
      "about.listen.eyebrow": "به ما گوش بده",
      "about.listen.title": "یک قسمت رو انتخاب کن و شروع کن.",
      "about.listen.action": "دیدن اپیزودها",
      "notFound.title": "صفحه‌ای پیدا نشد.",
      "notFound.description.beforeBrand": "این اپیزود یا صفحه در",
      "notFound.description.afterBrand": " وجود ندارد.",
      "notFound.home": "بازگشت به خانه",
      "episode.number": "روایت شماره‌ی {id}",
      "episode.back": "بازگشت به اپیزودها",
      "episode.notes": "یادداشت‌های این قسمت",
      "player.audioUnsupported": "مرورگر شما از پخش‌کننده‌ی صوتی پشتیبانی نمی‌کند.",
      "player.playError": "پخش این فایل ممکن نیست. اتصال یا آدرس فایل صوتی را بررسی کن.",
      "player.unavailableError": "فایل صوتی در دسترس نیست. کمی بعد دوباره تلاش کن.",
      "player.nowPlaying": "پخش اپیزود",
      "player.speed": "سرعت پخش",
      "player.position": "موقعیت پخش",
      "player.forward": "۱۵ ثانیه جلو",
      "player.back": "۱۵ ثانیه عقب",
      "player.skip.amount": "۱۵",
      "player.pause": "توقف پخش",
      "player.start": "شروع پخش",
    } satisfies MessageSet,
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = MessageKey;
export type TranslationValues = Record<string, string | number>;

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(translations, value);
}

export function getNextLocale(locale: Locale): Locale {
  const locales = Object.keys(translations) as Locale[];
  const currentIndex = locales.indexOf(locale);
  return locales[(currentIndex + 1) % locales.length];
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  values: TranslationValues = {},
) {
  return translations[locale].messages[key].replace(
    /\{(\w+)\}/g,
    (placeholder, name: string) => {
      const value = values[name];
      if (value === undefined) {
        throw new Error(`Missing translation value "${name}" for "${key}".`);
      }
      return String(value);
    },
  );
}
