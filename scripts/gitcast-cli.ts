import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import podcast from "../podcast.config.ts";
import { getAllEpisodes, getEpisodeBySlug } from "../lib/content.ts";

const rootDir = process.cwd();
const episodesDir = path.join(rootDir, "content", "episodes");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

type NewEpisode = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  duration: number;
  audio: string;
  cover?: string;
  localCover?: string;
  tags: string[];
};

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(`${question}\n> `, (answer) => resolve(answer.trim())));
}

function todayAsISODate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

async function requiredPrompt(label: string, validate: (value: string) => string | undefined, defaultValue?: string) {
  while (true) {
    const suffix = defaultValue ? ` [${defaultValue}]` : "";
    const answer = await prompt(`${label}${suffix}`);
    const value = answer || defaultValue || "";
    const error = validate(value);
    if (!error) return value;
    console.log(`  ${error}`);
  }
}

function parseDuration(value: string): number | undefined {
  if (/^\d+$/.test(value)) {
    const seconds = Number(value);
    return seconds > 0 ? seconds : undefined;
  }

  const parts = value.split(":").map(Number);
  if (parts.length === 2 && parts.every(Number.isInteger) && parts[0] >= 0 && parts[1] >= 0 && parts[1] < 60) {
    return parts[0] * 60 + parts[1] || undefined;
  }
  if (parts.length === 3 && parts.every(Number.isInteger) && parts[0] >= 0 && parts[1] < 60 && parts[2] < 60) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2] || undefined;
  }
  return undefined;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function expandPath(filePath: string) {
  const expanded = filePath.startsWith("~/")
    ? path.join(process.env.HOME ?? "", filePath.slice(2))
    : filePath;
  return path.resolve(rootDir, expanded);
}

function nextEpisodeId() {
  const existingDirectoryIds = fs.existsSync(episodesDir)
    ? fs.readdirSync(episodesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && /^\d{3,}$/.test(entry.name))
      .map((entry) => Number(entry.name))
    : [];
  const existingMetadataIds = getAllEpisodes()
    .map((episode) => Number(episode.id))
    .filter(Number.isSafeInteger);
  const next = Math.max(0, ...existingDirectoryIds, ...existingMetadataIds) + 1;
  return String(next).padStart(3, "0");
}

function validateDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return "Use the YYYY-MM-DD format.";
  const [, year, month, day] = match;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() + 1 !== Number(month) || date.getUTCDate() !== Number(day)) {
    return "Enter a real calendar date.";
  }
  return undefined;
}

async function createEpisode() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("The new episode wizard needs an interactive terminal.");
  }

  const id = nextEpisodeId();
  console.log(`\nGitCast · New episode ${id}\n`);

  const title = await requiredPrompt("Episode title", (value) => value ? undefined : "A title is required.");
  const slug = await requiredPrompt(
    "URL slug (lowercase English, e.g. stories-and-technology)",
    (value) => {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
        return "Use lowercase English letters and numbers separated by hyphens.";
      }
      return getAllEpisodes().some((episode) => episode.slug === value)
        ? "That slug is already in use. Choose a unique slug."
        : undefined;
    },
  );

  const description = await requiredPrompt("Short episode description", (value) => value ? undefined : "A description is required.");
  const date = await requiredPrompt("Publication date (YYYY-MM-DD)", validateDate, todayAsISODate());
  const audio = await requiredPrompt("Public audio URL", (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:"
        ? undefined
        : "Use a public HTTP or HTTPS audio URL.";
    } catch {
      return "Enter a valid public HTTP or HTTPS URL.";
    }
  });
  const durationInput = await requiredPrompt(
    "Duration (MM:SS, HH:MM:SS, or seconds)",
    (value) => parseDuration(value) ? undefined : "Enter a duration such as 38:21 or 2301.",
  );
  const duration = parseDuration(durationInput);
  if (!duration) {
    throw new Error("Episode duration could not be read.");
  }

  const coverInput = await prompt("Cover image path or public image URL (optional)");
  let cover: string | undefined;
  let localCover: string | undefined;
  if (coverInput) {
    try {
      const coverUrl = new URL(coverInput);
      if (coverUrl.protocol !== "https:" && coverUrl.protocol !== "http:") {
        throw new Error("Cover URLs must use HTTP or HTTPS.");
      }
      cover = coverUrl.toString();
    } catch (error) {
      if (error instanceof TypeError) {
        localCover = expandPath(coverInput);
        if (!fs.existsSync(localCover) || !fs.statSync(localCover).isFile()) {
          throw new Error(`Cover image not found: ${localCover}`);
        }
        const extension = path.extname(localCover).toLowerCase();
        if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(extension)) {
          throw new Error("Cover image must be JPG, PNG, WebP, or AVIF.");
        }
        cover = `./cover${extension}`;
      } else {
        throw error;
      }
    }
  }

  const tagsInput = await prompt("Tags (comma-separated, optional)");
  const tags = [...new Set(tagsInput.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean))];

  const episode: NewEpisode = {
    id,
    title,
    slug,
    description,
    date,
    duration,
    audio,
    cover,
    localCover,
    tags,
  };

  console.log("\n────────────────────────────────────────");
  console.log("             REVIEW EPISODE");
  console.log("────────────────────────────────────────");
  console.log(`ID:          ${episode.id}`);
  console.log(`Title:       ${episode.title}`);
  console.log(`Slug:        ${episode.slug}`);
  console.log(`Description: ${episode.description}`);
  console.log(`Date:        ${episode.date}`);
  console.log(`Audio:       ${episode.audio}`);
  console.log(`Duration:    ${formatDuration(episode.duration)}`);
  console.log(`Cover:       ${episode.cover ?? "Podcast default artwork"}`);
  console.log(`Tags:        ${episode.tags.length ? episode.tags.join(", ") : "None"}`);
  console.log("────────────────────────────────────────\n");

  const confirmation = (await prompt("Create this episode? [Y/n]")).toLowerCase();
  if (confirmation && confirmation !== "y" && confirmation !== "yes") {
    console.log("No files created.");
    return;
  }

  const directory = path.join(episodesDir, episode.id);
  if (fs.existsSync(directory)) {
    throw new Error(`Episode directory already exists: ${directory}`);
  }

  fs.mkdirSync(directory, { recursive: true });
  try {
    if (episode.localCover && episode.cover) {
      fs.copyFileSync(episode.localCover, path.join(directory, path.basename(episode.cover)));
    }

    const tagsFrontmatter = episode.tags.length
      ? `tags:\n${episode.tags.map((tag) => `  - ${JSON.stringify(tag)}`).join("\n")}\n`
      : "";
    const coverFrontmatter = episode.cover ? `cover: ${JSON.stringify(episode.cover)}\n` : "";
    const markdown = `---
id: ${JSON.stringify(episode.id)}
title: ${JSON.stringify(episode.title)}
slug: ${JSON.stringify(episode.slug)}
description: ${JSON.stringify(episode.description)}
date: ${JSON.stringify(episode.date)}
duration: ${episode.duration}
audio: ${JSON.stringify(episode.audio)}
${coverFrontmatter}${tagsFrontmatter}season: 1
episode: ${Number(episode.id)}
explicit: false
author: ${JSON.stringify(podcast.author)}
---

## Episode notes

Add the show notes for this episode here.
`;
    fs.writeFileSync(path.join(directory, "episode.md"), markdown, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    fs.rmSync(directory, { recursive: true, force: true });
    throw error;
  }

  console.log(`Created ${path.relative(rootDir, path.join(directory, "episode.md"))}`);
  console.log("Next: add your show notes, run `npm run podcast -- validate`, then `npm run build`.");
}

function listEpisodes() {
  for (const episode of getAllEpisodes()) {
    console.log(`${episode.id} | ${episode.title} | ${episode.date}`);
  }
}

function validate() {
  const episodes = getAllEpisodes();
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const episode of episodes) {
    if (!episode.id || !episode.title || !episode.slug || !episode.description || !episode.date || !episode.audio) {
      throw new Error(`Missing required data for episode ${episode.id || "unknown"}`);
    }
    if (seenIds.has(episode.id)) {
      throw new Error(`Duplicate ID: ${episode.id}`);
    }
    seenIds.add(episode.id);
    if (seenSlugs.has(episode.slug)) {
      throw new Error(`Duplicate slug: ${episode.slug}`);
    }
    seenSlugs.add(episode.slug);
    if (!/^\d{3,}$/.test(episode.id)) {
      throw new Error(`Invalid ID: ${episode.id}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(episode.slug)) {
      throw new Error(`Invalid slug: ${episode.slug}`);
    }
    if (Number.isNaN(Date.parse(episode.date)) || !Number.isInteger(episode.duration) || episode.duration <= 0) {
      throw new Error(`Invalid date or duration: ${episode.id}`);
    }
    try {
      const audioUrl = new URL(episode.audio);
      if (audioUrl.protocol !== "https:" && audioUrl.protocol !== "http:") {
        throw new Error();
      }
    } catch {
      throw new Error(`Invalid audio URL: ${episode.id}`);
    }
  }

  console.log(`Validated ${episodes.length} episodes.`);
}

function info(target: string) {
  const episode = getEpisodeBySlug(target) ?? getAllEpisodes().find((item) => item.id === target);
  if (!episode) {
    throw new Error(`Episode not found: ${target}`);
  }

  console.log(JSON.stringify(episode, null, 2));
}

async function build() {
  validate();
  console.log("Generating RSS feed...");
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, ["--experimental-strip-types", "scripts/generate-rss.ts"], { stdio: "inherit" });
  console.log("Static build is ready. Run: npm run build");
}

async function main() {
  const [, , command, arg] = process.argv;

  try {
    switch (command) {
      case "new":
        await createEpisode();
        break;
      case "list":
        listEpisodes();
        break;
      case "validate":
        validate();
        break;
      case "info":
        info(arg ?? "");
        break;
      case "build":
        await build();
        break;
      default:
        console.log("Usage: npm run podcast -- [new|list|validate|info|build]");
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
