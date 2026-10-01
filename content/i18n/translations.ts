// Keep locale message keys aligned; the Persian type check enforces full coverage.
const englishMessages = {
  "metadata.description": "Thoughtful conversations about technology, creativity, and the human experience.",
  "navigation.main": "Main navigation",
  "navigation.mobile": "Mobile navigation",
  "navigation.home": "{brand} home",
  "navigation.episodes": "Episodes",
  "navigation.about": "About",
  "navigation.feed": "Podcast feed",
  "navigation.explore": "Explore episodes",
  "navigation.openMenu": "Open menu",
  "navigation.closeMenu": "Close menu",
  "navigation.switchLanguage": "Switch language to {language}",
  "footer.tagline": "Stories to listen to with a little more presence.",
  "home.hero.eyebrow": "Stories for curious minds.",
  "home.hero.title.firstLine": "Ideas worth",
  "home.hero.title.secondLine": "",
  "home.hero.title.accent": "listening to.",
  "home.hero.description": "Conversations on technology, creativity, and the lives they touch.",
  "home.latest.episode": "LATEST · EPISODE {id}",
  "home.featured.number": "EPISODE {id}",
  "home.latest.listen": "Listen to the latest episode",
  "home.explore": "Explore episodes",
  "home.subscribe": "Subscribe via RSS",
  "home.intro.eyebrow": "For the curious",
  "home.intro.title": "A new perspective in every episode.",
  "home.intro.description": "Conversations about technology, storytelling, and the ideas shaping what comes next.",
  "home.episodes.eyebrow": "The listening archive",
  "home.episodes.title": "Episodes",
  "home.episodes.count.one": "{count} episode",
  "home.episodes.count.other": "{count} episodes",
  "home.episodes.number": "EP. {id}",
  "home.episodes.listen": "Listen to episode",
  "home.episodes.empty": "No episodes have been published yet.",
  "home.closing.eyebrow": "Stay in the loop",
  "home.closing.title": "Never miss the next story.",
  "home.closing.description": "Add our feed to your favorite podcast app.",
  "home.closing.feed": "Get the podcast feed",
  "about.eyebrow": "About",
  "about.hero.title.beforeAccent": "We listen for voices that",
  "about.hero.title.accent": "change how we see things.",
  "about.hero.description": "A space for good questions, fresh ideas, and honest conversations—without rushing toward easy answers.",
  "about.promise.persian": "In Persian, for everyone",
  "about.promise.open": "Published openly",
  "about.promise.listening": "Made for listening",
  "about.beliefs.eyebrow": "What we believe",
  "about.beliefs.title": "A calmer experience, from publishing to playback.",
  "about.principle.story.title": "Story over noise",
  "about.principle.story.description": "Make every episode worth pausing for: thoughtful, well-crafted, and grounded in real life.",
  "about.principle.open.title": "Open and lasting",
  "about.principle.open.description": "Every episode belongs to an open archive—easy to find, share, and listen to again.",
  "about.principle.freedom.title": "Publishing with freedom",
  "about.principle.freedom.description": "Episodes and metadata live in Git, keeping publishing transparent and portable.",
  "about.listen.eyebrow": "Give us a listen",
  "about.listen.title": "Pick an episode and press play.",
  "about.listen.action": "Explore episodes",
  "notFound.title": "Page not found.",
  "notFound.description.beforeBrand": "This page or episode is not available on",
  "notFound.description.afterBrand": ".",
  "notFound.home": "Back to home",
  "episode.number": "EPISODE {id}",
  "episode.back": "Back to episodes",
  "episode.notes": "Episode notes",
  "player.audioUnsupported": "Your browser does not support the audio player.",
  "player.playError": "Unable to play this file. Check your connection or the audio URL.",
  "player.unavailableError": "This audio file is unavailable. Please try again later.",
  "player.nowPlaying": "Now playing",
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
      "metadata.description": "گفت‌وگوهایی اندیشمندانه درباره‌ی فناوری، خلاقیت و تجربه‌ی انسانی.",
      "navigation.main": "پیمایش اصلی",
      "navigation.mobile": "پیمایش موبایل",
      "navigation.home": "صفحه‌ی اصلی {brand}",
      "navigation.episodes": "اپیزودها",
      "navigation.about": "درباره‌ی ما",
      "navigation.feed": "فید پادکست",
      "navigation.explore": "کشف قسمت‌ها",
      "navigation.openMenu": "باز کردن منو",
      "navigation.closeMenu": "بستن منو",
      "navigation.switchLanguage": "تغییر زبان به {language}",
      "footer.tagline": "روایت‌هایی برای شنیدن با حضورِ ذهن.",
      "home.hero.eyebrow": "روایت‌هایی برای ذهن‌های کنجکاو",
      "home.hero.title.firstLine": "صداهایی",
      "home.hero.title.secondLine": "برای ",
      "home.hero.title.accent": "فکر کردن.",
      "home.hero.description": "گفت‌وگوهایی درباره‌ی فناوری، خلاقیت و زندگی؛ برای لحظه‌هایی که می‌خواهی آهسته‌تر گوش کنی.",
      "home.latest.episode": "تازه‌ترین · قسمت {id}",
      "home.featured.number": "قسمت {id}",
      "home.latest.listen": "شنیدن تازه‌ترین قسمت",
      "home.explore": "کشف اپیزودها",
      "home.subscribe": "دنبال کردن از طریق RSS",
      "home.intro.eyebrow": "صدای کنجکاوی",
      "home.intro.title": "هر قسمت، دریچه‌ای تازه.",
      "home.intro.description": "پادکست گیت‌کست درباره‌ی فناوری، داستان‌گویی، و مسیر ساختن چیزهای مهم در عصر هوش مصنوعی.",
      "home.episodes.eyebrow": "آرشیو شنیداری",
      "home.episodes.title": "اپیزودها",
      "home.episodes.count.one": "{count} روایت",
      "home.episodes.count.other": "{count} روایت",
      "home.episodes.number": "قسمت {id}",
      "home.episodes.listen": "شنیدن اپیزود",
      "home.episodes.empty": "هنوز اپیزودی منتشر نشده است.",
      "home.closing.eyebrow": "همراهِ مسیر",
      "home.closing.title": "قسمت بعدی را از دست نده.",
      "home.closing.description": "فید را به اپلیکیشن پادکست محبوبت اضافه کن.",
      "home.closing.feed": "دریافت فید پادکست",
      "about.eyebrow": "درباره‌ی",
      "about.hero.title.beforeAccent": "ما به صداهایی گوش می‌دهیم که",
      "about.hero.title.accent": "چیزی در ما تغییر می‌دهند.",
      "about.hero.description": "فضایی برای سؤال‌های خوب، ایده‌های تازه و گفت‌وگوهای صادقانه؛ بدون عجله برای رسیدن به جواب‌های ساده.",
      "about.promise.persian": "فارسی، برای همه‌جا",
      "about.promise.open": "منتشرشده با آزادی",
      "about.promise.listening": "ساخته‌شده برای شنیدن",
      "about.beliefs.eyebrow": "باورهای ما",
      "about.beliefs.title": "تجربه‌ای آرام، از انتشار تا پخش.",
      "about.principle.story.title": "روایت قبل از هیاهو",
      "about.principle.story.description": "محتوا باید ارزش مکث کردن داشته باشد؛ ساده، خوش‌ساخت و نزدیک به زندگی واقعی.",
      "about.principle.open.title": "باز و ماندگار",
      "about.principle.open.description": "هر قسمت بخشی از یک آرشیو باز است؛ قابل جست‌وجو، اشتراک‌گذاری و شنیدن دوباره.",
      "about.principle.freedom.title": "انتشار با آزادی",
      "about.principle.freedom.description": "متن‌ها و اطلاعات در Git می‌مانند تا شیوه‌ی انتشار همیشه شفاف و قابل‌انتقال باشد.",
      "about.listen.eyebrow": "به ما گوش بده",
      "about.listen.title": "یک قسمت را انتخاب کن و شروع کن.",
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
