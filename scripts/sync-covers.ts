import fs from "node:fs";
import path from "node:path";
import { getAllEpisodes } from "../lib/content.ts";
import { episodeCoverReference, isJpegImage } from "../lib/episode-cover.ts";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "content", "cover");
const publicDir = path.join(rootDir, "public", "cover");

fs.mkdirSync(sourceDir, { recursive: true });
const coverFiles = fs.readdirSync(sourceDir, { withFileTypes: true });
let synchronizedCovers = 0;

for (const entry of coverFiles) {
  if (entry.name === ".gitkeep") {
    continue;
  }
  if (!entry.isFile() || !/^episode\d{3,}\.jpg$/.test(entry.name)) {
    throw new Error(`Unsupported cover file: ${path.relative(rootDir, path.join(sourceDir, entry.name))}. Use episode<ID>.jpg.`);
  }
  const sourcePath = path.join(sourceDir, entry.name);
  if (!isJpegImage(sourcePath)) {
    throw new Error(`Cover must be a JPEG image: ${path.relative(rootDir, sourcePath)}`);
  }
}

for (const episode of getAllEpisodes()) {
  if (!episode.cover?.startsWith("../cover/")) {
    continue;
  }
  const expectedReference = episodeCoverReference(episode.id);
  if (episode.cover !== expectedReference) {
    throw new Error(`Invalid cover path for episode ${episode.id}. Use "${expectedReference}".`);
  }

  const fileName = `episode${episode.id}.jpg`;
  const sourcePath = path.join(sourceDir, fileName);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Cover not found: ${path.relative(rootDir, sourcePath)}. Add a JPG image at this path.`);
  }

  const targetPath = path.join(publicDir, fileName);
  fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(targetPath) || !fs.readFileSync(sourcePath).equals(fs.readFileSync(targetPath))) {
    fs.copyFileSync(sourcePath, targetPath);
  }
  synchronizedCovers += 1;
}

console.log(`Synchronized ${synchronizedCovers} episode cover(s).`);
