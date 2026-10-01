export const podcast = {
  title: "GitCast",
  description:
    "پادکست گیت‌کست درباره‌ی فناوری، داستان‌گویی، و مسیر ساختن چیزهای مهم در عصر هوش مصنوعی.",
  author: "GitCast",
  language: "fa-IR",
  websiteUrl: "https://mohammad-hassani.github.io/gitcast",
  feedUrl: "https://mohammad-hassani.github.io/gitcast/feed.xml",
  artwork:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  category: "Technology",
  explicit: false,
  audio: {
    provider: "r2",
    publicBaseUrl: "https://audio.gitcast.example.com",
  },
} as const;

export type PodcastConfig = typeof podcast;

export default podcast;
