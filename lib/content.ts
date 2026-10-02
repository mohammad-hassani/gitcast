import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sitePath } from "./site-path.ts";
import { episodeCoverReference } from "./episode-cover.ts";

export type Episode = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  duration: number;
  audio: string;
  cover?: string;
  tags: string[];
  season?: number;
  episode?: number;
  explicit?: boolean;
  author?: string;
  content: string;
};

const EPISODES_DIR = path.join(process.cwd(), "content", "episodes");

function resolveEpisodeDir(dirName: string) {
  return path.join(EPISODES_DIR, dirName, "episode.md");
}

function parseEpisode(filePath: string): Episode {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    id: String(data.id ?? ""),
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-01-01"),
    duration: Number(data.duration ?? 0),
    audio: String(data.audio ?? ""),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    season: data.season !== undefined ? Number(data.season) : undefined,
    episode: data.episode !== undefined ? Number(data.episode) : undefined,
    explicit: Boolean(data.explicit),
    author: data.author ? String(data.author) : undefined,
    content,
  };
}

export function getAllEpisodes(): Episode[] {
  if (!fs.existsSync(EPISODES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(EPISODES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => parseEpisode(resolveEpisodeDir(entry.name)))
    .filter((episode) => episode.title && episode.slug)
    .sort((a, b) => {
      if (b.date !== a.date) {
        return b.date.localeCompare(a.date);
      }

      return Number(b.id) - Number(a.id);
    });
}

export function getEpisodeBySlug(slug: string) {
  return getAllEpisodes().find((episode) => episode.slug === slug);
}

export function getEpisodeCoverSource(episode: Pick<Episode, "id" | "cover">) {
  if (!episode.cover) {
    return undefined;
  }

  if (episode.cover === episodeCoverReference(episode.id)) {
    return sitePath(`/cover/episode${episode.id}.jpg`);
  }

  return episode.cover.startsWith("/")
    ? sitePath(episode.cover)
    : episode.cover;
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getLatestEpisode() {
  return getAllEpisodes()[0];
}
