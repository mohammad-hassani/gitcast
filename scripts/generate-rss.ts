import fs from "node:fs";
import path from "node:path";
import podcast from "../podcast.config.ts";
import { getAllEpisodes } from "../lib/content.ts";
import { episodeCoverReference } from "../lib/episode-cover.ts";

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

function publicAssetUrl(assetPath: string) {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  const site = new URL(podcast.websiteUrl);
  const basePath = site.pathname.replace(/\/+$/, "");
  return new URL(`${basePath}/${assetPath.replace(/^\/+/, "")}`, site.origin).toString();
}

const channelArtwork = publicAssetUrl(podcast.artwork);

const items = episodes
  .map((episode) => {
    const episodeUrl = `${podcast.websiteUrl}/episodes/${episode.slug}/`;
    const episodeArtwork = !episode.cover
      ? channelArtwork
      : /^https?:\/\//i.test(episode.cover)
        ? episode.cover
        : publicAssetUrl(
          episode.cover === episodeCoverReference(episode.id)
            ? `/cover/episode${episode.id}.jpg`
            : episode.cover,
        );
    return `
      <item>
        <title>${escapeXml(episode.title)}</title>
        <description>${escapeXml(episode.description)}</description>
        <itunes:image href="${escapeXml(episodeArtwork)}" />
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
    <itunes:image href="${escapeXml(channelArtwork)}" />
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
