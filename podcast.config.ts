export const podcast = {
  title: "GitCast",
  description:
    "پادکست گیت‌کست درباره‌ی فناوری، داستان‌گویی، و مسیر ساختن چیزهای مهم در عصر هوش مصنوعی.",
  author: "GitCast",
  language: "fa-IR",
  websiteUrl: "https://gitcast.ir",
  feedUrl: "https://gitcast.ir/feed.xml",
  artwork: "/logo/logo-bg.jpg",
  category: "Technology",
  explicit: false,
  audio: {
    provider: "r2",
    publicBaseUrl: "https://audio.gitcast.example.com",
  },
} as const;

export type PodcastConfig = typeof podcast;

export default podcast;
