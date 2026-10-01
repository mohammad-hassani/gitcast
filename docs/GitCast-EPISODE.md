# GitCast — Episode Specification

> Canonical format and validation contract for podcast episodes in GitCast.

## 1. Overview

Each episode lives in its own directory:

```text
content/episodes/012/
├── episode.md
└── cover.webp
```

`episode.md` contains YAML frontmatter followed by Markdown content. Audio is hosted outside Git, in Cloudflare R2.

To create an episode without manually making a directory or writing frontmatter, run this in the repository:

```bash
npm run podcast -- new
```

The wizard chooses the next unused ID, validates each answer, previews the episode, and writes files only after confirmation. Provide a public audio URL and duration (`MM:SS`, `HH:MM:SS`, or seconds). A local cover image is optional and copied into the episode directory. The wizard creates a show-notes template in the Markdown file; edit that section before publishing.

## 2. Required Frontmatter

```yaml
---
id: "012"
title: "چرا هنوز داستان می‌سازیم؟"
slug: "why-we-still-tell-stories"
description: "در این اپیزود درباره داستان، تکنولوژی و دلیل اینکه انسان‌ها هنوز داستان تعریف می‌کنند صحبت می‌کنیم."
date: "2026-10-01"
duration: 2301
audio: "episodes/012/audio.mp3"
---
```

Required fields:

| Field | Type | Required |
|---|---|---:|
| `id` | string | Yes |
| `title` | string | Yes |
| `slug` | string | Yes |
| `description` | string | Yes |
| `date` | ISO date | Yes |
| `duration` | integer, seconds | Yes |
| `audio` | string | Yes |

Optional fields:

| Field | Type | Example |
|---|---|---|
| `cover` | string | `"./cover.webp"` |
| `tags` | string[] | `["technology", "ai"]` |
| `season` | integer | `1` |
| `episode` | integer | `12` |
| `explicit` | boolean | `false` |
| `author` | string | `"GitCast"` |

## 3. Field Rules

### `id`

Stable numeric string, preferably at least three digits:

```yaml
id: "001"
```

Recommended validation:

```regex
^\d{3,}$
```

The ID must be unique and must not change after publication.

### `title`

Non-empty string. Used by the website, RSS, SEO and player metadata.

### `slug`

URL-safe, lowercase, unique, with no spaces or `/` characters.

```yaml
slug: "why-we-still-tell-stories"
```

For Persian titles, manual ASCII transliteration is preferred over unreliable automatic transliteration.

### `description`

Short episode summary. Recommended length: 120–300 characters. It is used for episode cards, RSS and SEO.

### `date`

Use an ISO date only for MVP:

```yaml
date: "2026-10-01"
```

Do not use localized date strings.

### `duration`

Integer number of seconds:

```yaml
duration: 2301
```

`2301` is displayed as `38:21`. Do not store `"38:21"`.

Must be greater than zero.

### `audio`

Logical R2 object key, not a hard-coded public URL:

```yaml
audio: "episodes/012/audio.mp3"
```

Recommended object naming:

```text
episodes/{id}/audio.mp3
```

The storage layer generates the public URL.

### `cover`

Optional path relative to the episode directory:

```yaml
cover: "./cover.webp"
```

If omitted, the global podcast artwork is used.

### `tags`

Optional array of short, preferably lowercase tags:

```yaml
tags:
  - technology
  - ai
  - story
```

Duplicate tags should be rejected.

### `season` / `episode`

Optional positive integers used for podcast metadata. They do not replace the internal GitCast `id`.

### `explicit`

Optional boolean. Default:

```yaml
explicit: false
```

### `author`

Optional episode-specific author. If omitted, use the global author from `podcast.config.ts`.

## 4. Markdown Body

Everything after the closing `---` is Markdown.

Supported by default:

- headings
- paragraphs
- lists
- links
- blockquotes
- emphasis
- code blocks

Raw HTML is disabled by default and must be sanitized if support is added.

The canonical title should come from frontmatter, so the body should preferably begin with a level-2 heading rather than duplicating the episode title as `#`.

Example:

```md
## شروع

داستان یکی از قدیمی‌ترین ابزارهای ارتباطی انسان است.

## موضوع اصلی

در این بخش درباره رابطه تکنولوژی و داستان صحبت می‌کنیم.

## جمع‌بندی

در نهایت، داستان روشی برای انتقال تجربه و معناست.
```

## 5. Directory Rules

The directory name must match the frontmatter ID:

```text
content/episodes/012/episode.md
```

must contain:

```yaml
id: "012"
```

If `cover` is declared, the referenced file must exist.

## 6. Ordering

Episodes are ordered by newest publication date first. If dates are equal, higher numeric ID comes first.

The application must not depend on filesystem ordering.

## 7. Validation

`gitcast validate` and CI must check:

- valid YAML frontmatter
- required fields
- correct field types
- valid date
- positive duration
- valid ID format
- valid slug
- unique IDs
- unique slugs
- directory/ID consistency
- artwork existence when specified
- Markdown parsing
- safe Markdown rendering
- valid audio reference

A production publish must fail if any required validation fails.

Example error:

```text
Episode 012 is invalid.

Field: duration
Expected: positive integer in seconds
Received: "38:21"
```

## 8. CLI Creation

`gitcast new` should interactively ask for the episode metadata, show a complete review screen, and only create files after confirmation.

Example review:

```text
────────────────────────────────────────
             REVIEW EPISODE
────────────────────────────────────────

ID:
012

Title:
چرا هنوز داستان می‌سازیم؟

Slug:
why-we-still-tell-stories

Date:
2026-10-01

Duration:
38:21

Audio:
episodes/012/audio.mp3

Cover:
./cover.webp

Tags:
technology, story, ai

Explicit:
No

────────────────────────────────────────

Create episode? [Y/n]
```

If cancelled, no partial episode directory should remain.

## 9. ID Generation

The CLI determines the next ID using:

```text
max(existing IDs) + 1
```

It must not simply count files.

IDs are padded to at least three digits:

```text
001
002
003
...
010
011
100
```

## 10. RSS Mapping

The episode model maps to RSS approximately as follows:

```text
id          → stable GUID
title       → item title
description → item description
date        → pubDate
duration    → duration metadata
audio       → enclosure URL
explicit    → explicit metadata
season      → season metadata
episode     → episode metadata
author      → author metadata
cover       → episode artwork where supported
```

The RSS package is responsible for exact XML generation.

## 11. Website Mapping

```text
title       → page title
description → summary
date        → publication date
duration    → player metadata
audio       → player source
cover       → artwork
tags        → tags
content     → article body
author      → author metadata
```

Canonical episode URL:

```text
/episodes/{slug}
```

The URL should remain stable after publication.

## 12. Complete Example

Directory:

```text
content/episodes/012/
├── episode.md
└── cover.webp
```

`episode.md`:

```md
---
id: "012"
title: "چرا هنوز داستان می‌سازیم؟"
slug: "why-we-still-tell-stories"
description: "در این اپیزود درباره داستان، تکنولوژی و دلیل اینکه انسان‌ها هنوز داستان تعریف می‌کنند صحبت می‌کنیم."
date: "2026-10-01"
duration: 2301
audio: "episodes/012/audio.mp3"
cover: "./cover.webp"
tags:
  - technology
  - story
  - ai
season: 1
episode: 12
explicit: false
author: "GitCast"
---

## شروع

داستان یکی از قدیمی‌ترین ابزارهای ارتباطی انسان است.

## موضوع اصلی

در این بخش درباره رابطه تکنولوژی و داستان صحبت می‌کنیم.

## جمع‌بندی

در نهایت، داستان فقط سرگرمی نیست؛ روشی برای انتقال تجربه و معناست.
```

## 13. Future Extensions

Possible future fields include:

```text
transcript
chapters
guests
sponsors
youtubeUrl
spotifyUrl
appleUrl
subtitle
```

These are not part of the MVP contract. New fields must be deliberately added to the typed schema rather than accepted as arbitrary data.

## 14. Final Contract

A publishable episode must satisfy:

```text
✓ Directory exists
✓ Directory name matches ID
✓ episode.md exists
✓ YAML frontmatter is valid
✓ Required fields exist
✓ Types are correct
✓ ID is unique
✓ Slug is unique
✓ Date is valid
✓ Duration is positive
✓ Audio reference is valid
✓ Artwork exists when specified
✓ Markdown parses safely
✓ Audio is available in R2 before RSS publication
```

If any required condition fails, the production build/publish process must fail.

---

**GitCast rule:** `EPISODE.md` is the canonical contract for episode content. Any implementation that changes the episode schema must update this document and the corresponding TypeScript types/validators together.
