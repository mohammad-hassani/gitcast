import fs from "node:fs";
import path from "node:path";
import podcast from "../podcast.config.ts";
import { getAllEpisodes } from "../lib/content.ts";

const outputPaths = [
  path.join(process.cwd(), "public", "feed.xml"),
  path.join(process.cwd(), "public", "rss.xml"),
];
const episodes = getAllEpisodes();

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const items = episodes
  .map((episode) => {
    const episodeUrl = `${podcast.websiteUrl}/episodes/${episode.slug}/`;
    return `
      <item>
        <title>${escapeXml(episode.title)}</title>
        <description>${escapeXml(episode.description)}</description>
        <link>${escapeXml(episodeUrl)}</link>
        <guid isPermaLink="true">${escapeXml(episodeUrl)}</guid>
        <pubDate>${new Date(episode.date).toUTCString()}</pubDate>
        <enclosure url="${escapeXml(episode.audio)}" type="audio/mpeg" length="0" />
        <itunes:duration>${episode.duration}</itunes:duration>
        <itunes:explicit>${episode.explicit ?? podcast.explicit ? "yes" : "no"}</itunes:explicit>
      </item>`.trim();
  })
  .join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml(podcast.title)}</title>
    <link>${escapeXml(podcast.websiteUrl)}</link>
    <description>${escapeXml(podcast.description)}</description>
    <language>${escapeXml(podcast.language)}</language>
    <itunes:image href="${escapeXml(podcast.artwork)}" />
    <itunes:author>${escapeXml(podcast.author)}</itunes:author>
    <itunes:category text="${escapeXml(podcast.category)}" />
    <itunes:explicit>${podcast.explicit ? "yes" : "no"}</itunes:explicit>
    ${items}
  </channel>
</rss>`;

fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
for (const outputPath of outputPaths) {
  fs.writeFileSync(outputPath, xml, "utf8");
}
console.log(`RSS feed generated at ${outputPaths.join(", ")}`);
