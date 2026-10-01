# GitCast — Project Specification

> Git-based, Git-first podcast publishing system.
>
> This document defines the functional and product requirements for GitCast. `DESIGN.md` is the authoritative source of truth for visual design and frontend styling.

## 1. Project Overview

GitCast is a static-first podcast publishing platform where Git is the source of truth.

The owner should be able to create and publish a podcast episode without using an admin dashboard, database, permanent backend server, or traditional CMS.

Primary workflow:

```text
Create episode
     ↓
GitCast CLI
     ↓
Markdown + metadata
     ↓
git add / commit / push
     ↓
GitHub Actions
     ↓
Validate
     ↓
Upload audio to Cloudflare R2
     ↓
Generate RSS
     ↓
Build website
     ↓
Deploy GitHub Pages
```

The result is a modern public podcast website, a standards-compatible RSS feed, audio hosted on Cloudflare R2, a static frontend hosted on GitHub Pages, and all podcast metadata version-controlled in Git.

## 2. Product Goals

### Primary goals

1. Make publishing an episode extremely simple.
2. Keep the Git repository as the source of truth.
3. Avoid maintaining a database.
4. Avoid maintaining a permanent backend.
5. Host large audio files outside Git.
6. Automatically generate a standards-compatible RSS feed.
7. Automatically deploy the website after a Git push.
8. Provide a premium cinematic podcast frontend.
9. Work naturally in Persian and RTL.
10. Make the system portable so storage providers can be changed later.

### Secondary goals

- Excellent mobile experience.
- Fast static pages.
- SEO-friendly episode pages.
- Accessible audio player.
- Persistent playback position.
- Searchable episode archive.
- Easy local development.
- Easy migration to another hosting provider.

## 3. Non-Goals

The MVP must not become a complex SaaS platform.

Do not build:

- user accounts
- authentication
- comments
- social network features
- listener profiles
- subscriptions/accounts
- database-backed CMS
- admin dashboard
- analytics dashboard
- recommendation engine
- payment system
- podcast hosting marketplace

These can be considered later but are outside the MVP.

## 4. Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router
- Static generation where possible

### Content

- Markdown
- YAML frontmatter
- local filesystem
- Git

### CLI

- Node.js
- TypeScript
- Commander
- Inquirer or an equivalent interactive prompt library

### RSS

Use a maintained RSS generation library where appropriate. The generated feed must be valid XML and compatible with common podcast clients.

### Audio Storage

Cloudflare R2.

The storage implementation must be abstracted behind a small storage interface so it can later be replaced by S3, Backblaze B2, or another object storage provider.

### Hosting

- Frontend: GitHub Pages
- Audio: Cloudflare R2
- Source: GitHub
- CI/CD: GitHub Actions

## 5. High-Level Architecture

```text
                       ┌─────────────────────┐
                       │      Developer      │
                       └──────────┬──────────┘
                                  │
                                  │ podcast new
                                  ▼
                       ┌─────────────────────┐
                       │     GitCast CLI     │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │ Markdown + Artwork  │
                       │   in Git repository │
                       └──────────┬──────────┘
                                  │
                            git push
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │   GitHub Actions    │
                       └──────────┬──────────┘
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
                 ▼                ▼                ▼
             Validate          R2 Upload       RSS Build
                 │                │                │
                 └────────────────┼────────────────┘
                                  ▼
                       ┌─────────────────────┐
                       │    Next.js Build   │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │    GitHub Pages    │
                       └─────────────────────┘
```

## 6. Repository as Source of Truth

Git must contain all information required to reproduce the podcast website.

Git should contain:

- episode metadata
- episode text/content
- artwork
- site configuration
- source code
- RSS configuration
- build scripts
- CLI
- CI/CD workflow

Git should not contain:

- large MP3 files
- secrets
- Cloudflare credentials
- generated deployment artifacts

Audio is stored in R2.

## 7. Repository Structure

Recommended structure:

```text
GitCast/
│
├── DESIGN.md
├── PROJECT.md
├── ARCHITECTURE.md
├── EPISODE.md
├── README.md
│
├── content/
│   └── episodes/
│       ├── 001/
│       │   ├── episode.md
│       │   └── cover.webp
│       ├── 002/
│       │   ├── episode.md
│       │   └── cover.webp
│       └── ...
│
├── apps/
│   └── web/
│
├── packages/
│   ├── cli/
│   ├── content/
│   ├── rss/
│   └── storage/
│
├── scripts/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

A monorepo is preferred because the CLI, content parser, RSS generator, storage adapter, and frontend share types and utilities.

## 8. Podcast Configuration

Create a central typed configuration file:

```text
podcast.config.ts
```

Example:

```ts
export default {
  title: "GitCast",
  description: "A podcast about technology and stories.",
  author: "GitCast",
  language: "fa-IR",
  websiteUrl: "https://example.com",
  feedUrl: "https://example.com/feed.xml",
  artwork: "/podcast-cover.webp",
  category: "Technology",
  explicit: false,
  audio: {
    provider: "r2",
    publicBaseUrl: "https://audio.example.com"
  }
};
```

Do not duplicate these values throughout the codebase.

## 9. Episode Publishing Model

Each episode lives in its own directory:

```text
content/episodes/012/
├── episode.md
└── cover.webp
```

The Markdown file contains metadata and episode content.

The audio file is not committed to Git. The metadata references the audio asset, for example:

```yaml
audio: "012.mp3"
```

The CI pipeline uploads the corresponding audio source to R2 before building the final RSS.

Because large audio files should not live in Git, the implementation must define a local publishing mechanism for audio. The preferred MVP approach is to let the CLI accept a local audio path and stage it in a temporary ignored publishing directory, or upload it directly to R2 during an explicit publish command. The final architecture must ensure Git history does not accumulate MP3 files.

## 10. CLI

The CLI is one of the most important parts of GitCast.

Command:

```bash
pnpm podcast new
```

or:

```bash
gitcast new
```

The CLI must be interactive:

```text
GitCast — New Episode

? Episode title:
? Short description:
? Publication date:
? Public audio URL:
? Cover image:
? Duration (MM:SS or seconds):
? Tags:
```

After collecting data, show a review:

```text
────────────────────────────────────────
             REVIEW EPISODE
────────────────────────────────────────

Title:
Why We Still Tell Stories

Description:
...

Date:
2026-10-01

Audio:
episode-012.mp3

Duration:
38:21

Tags:
technology, story

────────────────────────────────────────

Create this episode? [Y/n]
```

The Markdown file must not be created until the user confirms.

## 11. CLI Commands

The MVP CLI should support:

### Create

```bash
gitcast new
```

Creates an episode interactively.

The wizard assigns the next unused numeric ID and reviews all entered metadata before it writes files. It accepts a hosted HTTP(S) audio URL and a duration, plus an optional cover image path or URL. A local cover is copied into the new episode directory. After confirmation, it writes `episode.md` with a ready-to-edit show-notes template.

```bash
npm run podcast -- new
```

When prompted for a local cover file, use its full path or `~/` path. Audio must already be publicly hosted; the CLI does not upload audio to R2.

### Validate

```bash
gitcast validate
```

Validates all episodes and configuration.

Must detect missing required fields, invalid dates, duplicate IDs, duplicate slugs, invalid audio references, missing artwork, malformed Markdown, invalid tags, invalid URLs, and invalid duration.

### List

```bash
gitcast list
```

Displays episodes.

### Info

```bash
gitcast info 003
```

Displays all parsed metadata.

### Build

```bash
gitcast build
```

Runs validation, content parsing, RSS generation, and the frontend build as appropriate.

### Preview

```bash
gitcast preview
```

Starts local development.

The exact command implementation can be adjusted to fit the monorepo tooling.

## 12. Episode Metadata

Each episode must have a typed content model.

Required fields:

```text
id
title
slug
description
date
audio
duration
```

Optional fields:

```text
cover
tags
season
episode
explicit
transcript
author
```

The final schema must be documented in `EPISODE.md`.

The parser must reject invalid content instead of silently guessing.

## 13. Episode IDs

Episode IDs must be stable.

Preferred format:

```text
001
002
003
...
```

IDs must never change after publication.

The ID is used as part of the episode GUID strategy.

## 14. Slugs

Each episode has a URL-safe slug.

Example:

```text
why-we-still-tell-stories
```

URL:

```text
/episodes/why-we-still-tell-stories
```

For Persian titles, Unicode slugs may be supported, but ASCII transliterated slugs are preferred for portability.

Slugs must be unique.

## 15. Audio Storage

Cloudflare R2 is the default storage backend.

Preferred object structure:

```text
episodes/
├── 001/audio.mp3
├── 002/audio.mp3
└── ...
```

Example public URL:

```text
https://audio.example.com/episodes/012/audio.mp3
```

The application must not hard-code Cloudflare-specific logic throughout the codebase.

Use an abstraction:

```ts
interface AudioStorage {
  upload(input: UploadInput): Promise<UploadResult>;
  getPublicUrl(key: string): string;
}
```

## 16. Audio Upload

The upload process must:

1. validate the source file
2. determine the expected object key
3. authenticate with R2 using GitHub Secrets
4. upload the file
5. verify success
6. expose the final public URL to the RSS generator

The pipeline must fail if an episode references an audio file that cannot be uploaded.

Do not publish an RSS enclosure pointing to a nonexistent audio object.

## 17. R2 Secrets

GitHub Actions should receive credentials through GitHub Secrets:

```text
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_URL
```

Never commit secrets, place secrets in frontend code, or expose R2 access keys to the browser.

## 18. RSS Feed

The public feed must be:

```text
/feed.xml
```

The feed must be generated during the build/publish process.

Podcast-level information should include:

- title
- description
- author
- language
- website
- artwork
- category
- explicit status
- owner information where configured

Each episode must include:

- title
- description
- publication date
- GUID
- duration
- enclosure URL
- enclosure MIME type
- enclosure length when available
- episode/season metadata where configured
- explicit status where configured

The enclosure must point directly to the public audio URL.

## 19. RSS Validation

The build must validate generated RSS.

Invalid XML or missing required podcast information must fail CI.

The feed should be tested against a standard RSS/XML parser.

A local command such as `gitcast validate` should validate the feed as well.

## 20. Website

The public website is built with Next.js and should be statically generated wherever possible.

Required pages:

```text
/
/episodes
/episodes/[slug]
/about
/feed.xml
```

Optional:

```text
/search
```

if search is implemented.

## 21. Homepage Requirements

Homepage must include:

1. Header
2. Hero / latest episode
3. Latest episodes
4. Podcast introduction
5. Optional categories/topics
6. CTA to browse episodes
7. Footer

The latest episode should be immediately playable.

The homepage must follow `DESIGN.md`.

## 22. Episode Page Requirements

Every episode page must include:

- title
- artwork
- metadata
- player
- description
- episode content
- tags
- related episodes

The page must be statically generated from Markdown.

## 23. Audio Player Requirements

The custom player must support:

- play
- pause
- seek
- current time
- duration
- volume
- playback speed
- rewind
- forward
- keyboard controls where practical
- mobile touch controls

Optional later:

- download
- Media Session API
- lock-screen controls

The player must not require a backend.

## 24. Playback Persistence

Store playback position locally.

Example:

```text
gitcast:episode:{episodeId}:position
```

When reopening an episode:

- restore the previous position
- do not autoplay

Playback speed should also persist.

## 25. Search

Search is client-side for the MVP.

The build can generate a searchable episode index.

Search fields:

- title
- description
- tags

Transcript search can be added later.

No database is required.

## 26. Performance

Requirements:

- static generation
- optimized images
- lazy loading below-the-fold images
- minimal client-side JavaScript
- player JavaScript only where required
- no unnecessary UI libraries
- no heavy animation framework unless justified

Target fast first load, good Core Web Vitals, and strong mobile performance.

Audio itself must not be loaded until playback is requested where practical.

## 27. SEO

Every episode page must provide:

- unique title
- meta description
- canonical URL
- Open Graph metadata
- social image
- structured data

The site should also provide:

```text
robots.txt
sitemap.xml
feed.xml
```

## 28. GitHub Actions

Main workflow:

```text
.github/workflows/deploy.yml
```

Trigger:

```yaml
on:
  push:
    branches:
      - main
```

Pipeline:

```text
Checkout
   ↓
Install dependencies
   ↓
Typecheck
   ↓
Lint
   ↓
Validate content
   ↓
Upload audio to R2
   ↓
Generate RSS
   ↓
Build Next.js
   ↓
Deploy GitHub Pages
```

Any failed step must stop deployment.

## 29. CI Validation

CI must fail when:

- TypeScript fails
- lint fails
- an episode is malformed
- an episode has missing required metadata
- duplicate IDs exist
- duplicate slugs exist
- referenced artwork is missing
- referenced audio is missing
- R2 upload fails
- RSS generation fails
- frontend build fails

The system should fail early.

## 30. Environment Variables

Local development may use:

```text
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_URL
```

Only server-side scripts and CI may access credentials.

Frontend code must only receive public configuration.

## 31. Development Workflow

Initial setup:

```bash
pnpm install
```

Run website:

```bash
pnpm dev
```

Create episode:

```bash
pnpm podcast new
```

Validate:

```bash
pnpm podcast validate
```

Build:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

Publishing:

```bash
git add .
git commit -m "publish episode 012"
git push
```

After push, GitHub Actions handles deployment.

## 32. Content Workflow

Ideal publishing experience:

```text
1. Record episode
        ↓
2. Export MP3
        ↓
3. Run:
   pnpm podcast new
        ↓
4. Select audio + artwork
        ↓
5. Enter metadata
        ↓
6. Review
        ↓
7. Confirm
        ↓
8. Git commit
        ↓
9. Git push
        ↓
10. CI publishes
```

The creator should not need to manually edit RSS, manually upload audio, or manually deploy the website.

## 33. Error Handling

Errors must be human-readable.

Bad:

```text
ENOENT
```

Better:

```text
Audio file not found:

/path/to/episode-012.mp3

Please provide a valid audio file.
```

For metadata:

```text
Episode 012 is invalid.

Missing required field:
duration
```

CI errors should clearly identify the episode, field, problem, and suggested fix.

## 34. Security

Never:

- commit credentials
- expose R2 credentials
- put secrets in `NEXT_PUBLIC_*`
- execute arbitrary Markdown as code
- trust frontmatter blindly
- allow unvalidated external URLs where not necessary

Sanitize rendered Markdown. Avoid dangerous HTML unless explicitly supported and sanitized.

## 35. Accessibility

The website must:

- use semantic HTML
- provide keyboard navigation
- provide focus states
- expose player controls to screen readers
- maintain adequate contrast
- support reduced motion
- use appropriate heading hierarchy
- work with RTL screen-reader reading order

## 36. Internationalization

MVP language:

```text
Persian (fa)
```

Architecture should not prevent adding English, Arabic, and Urdu later.

Do not hard-code user-facing strings throughout components. Keep UI labels centralized where practical.

## 37. Analytics

Analytics are not required for MVP.

If added later, use privacy-conscious analytics, do not require user accounts, and keep analytics separate from content architecture.

## 38. Testing

Minimum automated tests:

### Content parser

- valid episode
- missing fields
- invalid date
- duplicate ID
- duplicate slug

### CLI

- new episode creation
- confirmation flow
- cancellation flow

### RSS

- valid XML
- enclosure
- GUID
- metadata

### Storage

- upload success
- upload failure
- public URL generation

### Frontend

- episode rendering
- player rendering
- missing content handling

## 39. Definition of Done — MVP

### Content

- [ ] Episodes can be represented as Markdown.
- [ ] Metadata is validated.
- [ ] Episode IDs are stable.
- [ ] Slugs are unique.
- [ ] Artwork is supported.

### CLI

- [ ] `gitcast new` works.
- [ ] Interactive questions work.
- [ ] Review screen works.
- [ ] Cancel works.
- [ ] Markdown is generated correctly.
- [ ] Validation works.

### Audio

- [ ] Audio can be supplied locally.
- [ ] Audio is uploaded to R2.
- [ ] Public audio URL is generated.
- [ ] Audio does not live permanently in Git.

### RSS

- [ ] `/feed.xml` is generated.
- [ ] XML is valid.
- [ ] Episode enclosures are valid.
- [ ] Podcast metadata is present.

### Website

- [ ] Homepage works.
- [ ] Episode archive works.
- [ ] Episode pages work.
- [ ] Player works.
- [ ] Responsive design works.
- [ ] RTL works.
- [ ] SEO metadata works.

### Deployment

- [ ] GitHub Actions validates the project.
- [ ] GitHub Actions uploads audio.
- [ ] GitHub Actions generates RSS.
- [ ] GitHub Actions builds the website.
- [ ] GitHub Pages deployment works.

## 40. Future Features

Do not implement these in MVP, but keep the architecture extensible:

- transcript support
- automatic transcript generation
- chapter markers
- YouTube publishing
- Telegram publishing
- Spotify metadata helpers
- Apple Podcasts metadata helpers
- multiple podcasts from one repository
- scheduled publishing
- episode drafts
- content preview environments
- automatic audio normalization
- waveform generation
- social media cards
- automatic audiograms
- multilingual episodes
- automatic translation
- listener analytics
- RSS import
- storage migration tools

## 41. Product Philosophy

GitCast should remain:

```text
Git-first
Static-first
Content-first
Simple
Portable
Automated
```

The creator should feel that publishing an episode is as simple as committing code.

The system should automate repetitive work while keeping source files readable and human-editable.

## 42. Coding-Agent Instructions

Before writing code:

1. Read `PROJECT.md`.
2. Read `DESIGN.md`.
3. If present, read `ARCHITECTURE.md`.
4. If present, read `EPISODE.md`.
5. Treat these files as the project specification.

Implementation rules:

- Do not invent a different architecture without a strong technical reason.
- Do not introduce a database.
- Do not introduce a permanent backend.
- Do not create an admin dashboard.
- Do not store audio in Git.
- Do not hard-code podcast metadata in multiple locations.
- Keep content parsing typed.
- Keep storage provider logic abstract.
- Keep RSS generation independent from the frontend.
- Keep the frontend primarily static.
- Preserve RTL.
- Follow `DESIGN.md` for visual decisions.
- Prefer small, composable components.
- Prefer server-side/static rendering over unnecessary client components.
- Add tests for critical content and publishing logic.
- Fail early on invalid content.
- Keep error messages actionable.

When requirements are ambiguous, prefer the smallest implementation that satisfies the documented architecture and preserves future extensibility.
