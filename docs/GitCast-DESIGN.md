# GitCast — Design System

> Visual direction: **Cinematic / Storytelling podcast platform**, inspired by the selected "Story Scape" reference.
>
> This document is the visual source of truth for the GitCast frontend. Use it together with the reference screenshots supplied to the coding agent. Do not copy proprietary artwork, logos, or exact text from the reference; reproduce the visual language and interaction patterns as an original GitCast design.

---

## 1. Design Goals

GitCast is a Git-based podcast publishing platform. The frontend should feel:

- cinematic
- editorial
- immersive
- premium
- calm rather than noisy
- strongly typography-driven
- focused on episode storytelling
- modern without looking like a generic SaaS dashboard

The site is a **podcast publication**, not an admin panel.

### Core visual idea

Use a dark, atmospheric canvas with:

- oversized editorial typography
- large podcast artwork
- subtle gradients and glow
- generous negative space
- restrained borders
- high-contrast text
- soft depth rather than heavy card shadows
- cinematic image treatment
- subtle motion

The interface should feel closer to a modern digital magazine / streaming editorial experience than a traditional blog.

---

# 2. Design Principles

### 2.1 Content first

Episode title, artwork, description, duration, date, and playback controls are the primary visual hierarchy.

### 2.2 Cinematic, not flashy

Avoid excessive gradients, glassmorphism, neon borders, bouncing animations, or dashboard-style widgets.

### 2.3 Strong typography

Large headlines should do most of the visual work.

### 2.4 Dark by default

The primary experience is dark mode.

A light theme may exist, but it should preserve the same editorial character rather than becoming a generic white website.

### 2.5 RTL first

GitCast is Persian-first.

The entire layout must work naturally in RTL:

- navigation
- episode metadata
- breadcrumbs
- cards
- player controls
- typography
- pagination
- search
- forms
- mobile navigation

Do not implement an LTR layout and simply flip it.

Use logical CSS properties such as:

- `margin-inline`
- `padding-inline`
- `inset-inline`
- `border-start`
- `border-end`
- `text-align: start`

Avoid unnecessary `left` / `right` positioning.

---

# 3. Color System

Use CSS variables.

## Dark theme

```css
:root {
  --background: #0A0A0C;
  --background-elevated: #101014;
  --background-soft: #15151A;

  --surface: #18181E;
  --surface-hover: #202027;

  --foreground: #F4F1EA;
  --foreground-muted: #B4B0A8;
  --foreground-subtle: #77736C;

  --border: rgba(244, 241, 234, 0.12);
  --border-strong: rgba(244, 241, 234, 0.20);

  --accent: #D9FF6A;
  --accent-soft: rgba(217, 255, 106, 0.14);

  --success: #A8E063;
  --danger: #FF6B6B;

  --overlay: rgba(10, 10, 12, 0.72);
}
```

The exact accent color can be adjusted after seeing the final artwork, but the accent must remain restrained.

### Color rules

- Background should dominate the page.
- Use accent primarily for primary CTA, play button, active states, and progress.
- Do not use accent for large backgrounds.
- Avoid more than one strong accent color.
- Images may introduce secondary colors naturally.

---

# 4. Typography

Use a Persian-capable modern sans-serif.

Preferred font stack:

```css
font-family:
  "Vazirmatn",
  "IRANSansX",
  "Inter",
  system-ui,
  sans-serif;
```

If the project chooses another Persian font, it must support Persian glyphs, Latin characters, numerals, and readable weights.

## Type scale

### Display

Large cinematic headline:

```text
clamp(3rem, 7vw, 7rem)
```

Weight: `600–700`

Line height: `0.95–1.08`

Use for the main homepage hero.

### H1

```text
clamp(2.5rem, 5vw, 5rem)
```

### H2

```text
clamp(2rem, 3vw, 3.25rem)
```

### H3

```text
1.25rem–1.75rem
```

### Body

```text
1rem–1.125rem
```

Line height: `1.8`

Persian body text should have generous line height.

### Metadata

```text
0.75rem–0.875rem
```

Use muted foreground.

---

# 5. Layout System

Use a centered content container.

```css
--container-max: 1440px;
--page-padding: clamp(1.25rem, 4vw, 4rem);
```

### Desktop

Maximum content width: `1440px`

### Tablet

Approximately `32px` horizontal padding.

### Mobile

`20px` horizontal padding.

Never allow content to touch viewport edges.

---

# 6. Spacing

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
--space-32: 8rem;
```

Large sections should have substantial vertical spacing. Avoid tightly packed layouts.

---

# 7. Border Radius

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-pill: 999px;
```

Buttons may be pill or medium radius. Artwork and episode cards use medium/large radius. Avoid excessive rounded containers.

---

# 8. Background & Atmosphere

The background should have subtle depth.

Recommended radial glow:

```css
background:
  radial-gradient(
    circle at 70% 20%,
    rgba(217, 255, 106, 0.08),
    transparent 35%
  ),
  var(--background);
```

Large artwork may create a blurred background layer:

```text
artwork → blur → low opacity → dark overlay → content
```

A very subtle grain/noise texture may be used, but it must remain barely visible.

---

# 9. Navigation

Desktop navigation should be minimal:

```text
[GitCast logo]      Episodes   About   Search        [Listen]
```

For RTL:

```text
[GitCast logo]        اپیزودها   درباره   جستجو        [شنیدن]
```

Navigation is transparent/atmospheric over the hero and becomes slightly opaque while scrolling, with subtle backdrop blur and a thin bottom border.

Mobile uses:

```text
[Logo]                         [Menu]
```

Open a full-screen or large overlay menu. Avoid a large traditional navbar.

---

# 10. Homepage

The homepage is the primary cinematic experience.

## Hero

Use a two-layer composition.

### Background

Large artwork or episode artwork with a blurred, dark atmospheric overlay.

### Foreground

Large title and episode information.

Example:

```text
آخرین اپیزود

چرا هنوز داریم
داستان می‌سازیم؟

اپیزود ۱۲ · ۳۸ دقیقه · ۲۹ شهریور ۱۴۰۵

[ ▶ پخش اپیزود ]

مقدمه کوتاه درباره موضوع اپیزود...
```

The hero must immediately communicate what the podcast is, what the latest episode is, and how to listen.

On desktop, artwork can occupy roughly 35–45% of the hero and text the remaining space. On mobile, stack deliberately rather than merely shrinking.

---

# 11. Episode Cards

Episode cards should feel editorial rather than SaaS-like.

Recommended structure:

```text
┌────────────────────────────────────┐
│          episode artwork            │
├────────────────────────────────────┤
│  EPISODE 12                        │
│  عنوان اپیزود                      │
│  توضیح کوتاه...                    │
│  38 دقیقه     29 شهریور 1405       │
└────────────────────────────────────┘
```

Hover:

- artwork scales slightly
- card moves up 2–4px
- border becomes slightly stronger
- play affordance appears
- transition 250–400ms

Do not use dramatic hover effects.

---

# 12. Episode Archive

Create `/episodes`.

Structure:

```text
عنوان
همه اپیزودها

[ جستجو... ] [ دسته‌بندی ]

────────────────────────────

Episode
Episode
Episode
Episode
```

Desktop uses a 2–3 column grid depending on artwork ratio. Mobile uses a single column.

Support search, optional categories/tags, pagination or load-more, newest first.

---

# 13. Episode Detail Page

Structure:

```text
Breadcrumb

┌─────────────────────────────────────────┐
│                 Artwork                 │
└─────────────────────────────────────────┘

اپیزود ۱۲
عنوان اپیزود بسیار بزرگ
تاریخ · مدت · دسته‌بندی

┌─────────────────────────────────────────┐
│              AUDIO PLAYER               │
└─────────────────────────────────────────┘

خلاصه
متن اپیزود
...

موضوعات مرتبط
[episode] [episode] [episode]
```

Place the player immediately after title/metadata. The title is large and editorial.

---

# 14. Audio Player

The audio player is a core component and must be custom rather than the browser default.

Features:

- play / pause
- progress
- current time
- duration
- seek
- volume
- playback speed
- 10/15/30 second rewind
- 10/15/30 second forward
- download option where appropriate

Visual concept:

```text
┌───────────────────────────────────────────────┐
│ ▶   12:32 ━━━━━━━━━━━━━━━ 38:21    1×   ⋮   │
└───────────────────────────────────────────────┘
```

Use a large circular play button. Progress uses the accent color.

When an episode is playing, optionally show a compact sticky player at the bottom. It must not cover important mobile UI.

---

# 15. Playback Persistence

Remember with `localStorage`:

- last playback position
- playback speed
- currently playing episode

Suggested namespace:

```text
gitcast:player
gitcast:episode:{id}:position
```

No authentication required.

---

# 16. Podcast Artwork

Artwork is a first-class visual element.

Preferred aspect ratio: `1:1`. Secondary: `4:5`.

Never stretch artwork. Use `object-fit: cover`.

Allow artwork to bleed into atmospheric backgrounds when appropriate.

---

# 17. Buttons

## Primary

Example:

```text
[ ▶  پخش آخرین اپیزود ]
```

Use accent background, dark text, pill radius, medium/high weight, clear hover state.

## Secondary

```text
[ مشاهده همه اپیزودها ]
```

Transparent/dark surface with subtle border.

## Ghost

Text only.

Do not make every action a filled button.

---

# 18. Tags

Use small editorial metadata pills:

```text
تکنولوژی
داستان
AI
```

Small font, muted background, subtle border, pill radius. Avoid excessive tag usage.

---

# 19. Footer

Minimal footer:

```text
GitCast

پادکستی درباره ...

اپیزودها
درباره
RSS

© ۱۴۰۵ GitCast
```

Optional social/distribution links: GitHub, Telegram, Instagram, Apple Podcasts, Spotify, Castbox.

Do not make the footer a giant sitemap.

---

# 20. Motion

Micro-interactions: `150–250ms`.

Larger transitions: `300–700ms`.

Allowed: fade, subtle slide, image scale, blur-to-sharp, opacity transitions, progress animation, nav background transition.

Avoid bouncing, excessive parallax, spinning UI, aggressive springs, or animations on every element.

Page entrance may use:

```css
opacity: 0 → 1;
transform: translateY(12px) → 0;
```

Respect `prefers-reduced-motion`.

---

# 21. Responsive Behavior

### Desktop ≥ 1024px

Cinematic multi-column compositions. Hero: text + artwork.

### Tablet 768–1023px

Reduce typography and spacing; preserve two-column layouts where practical.

### Mobile < 768px

Single-column composition. Hero should intentionally order artwork, metadata, title, player, description. Navigation collapses. Cards become full width. No horizontal scrolling.

---

# 22. RTL Rules

Use:

```html
<html lang="fa" dir="rtl">
```

Use logical CSS properties. Avoid unnecessary `left` / `right`.

Directional icons must flip when appropriate. Play icon does not need to flip.

---

# 23. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- keyboard navigable
- visible focus states
- semantic HTML
- real `<button>` and `<a>` elements
- meaningful image alt text
- sufficient contrast
- accessible labels for player controls
- no information conveyed only by color
- respect reduced motion

---

# 24. SEO

Every episode page should generate:

- title
- meta description
- canonical URL
- Open Graph metadata
- Twitter/X metadata
- JSON-LD

Use PodcastEpisode structured data where appropriate. Homepage should identify the podcast and publisher.

---

# 25. Component Architecture

Recommended:

```text
components/
├── layout/
│   ├── Header
│   ├── Footer
│   └── MobileMenu
│
├── podcast/
│   ├── PodcastHero
│   ├── EpisodeCard
│   ├── EpisodeGrid
│   ├── EpisodeMeta
│   ├── EpisodeArtwork
│   ├── EpisodePlayer
│   ├── EpisodeProgress
│   ├── EpisodeArchive
│   └── RelatedEpisodes
│
├── ui/
│   ├── Button
│   ├── IconButton
│   ├── Badge
│   ├── Container
│   ├── SectionHeading
│   └── SearchInput
│
└── effects/
    ├── AmbientBackground
    ├── Grain
    └── Reveal
```

Keep components content-agnostic.

---

# 26. Tailwind Implementation

Use Tailwind CSS with centralized CSS variables. Do not hard-code random colors throughout components.

Bad:

```tsx
<div className="bg-[#121212] text-[#efefef]">
```

Preferred:

```tsx
<div className="bg-background text-foreground">
```

Recommended semantic tokens:

```text
background
background-elevated
background-soft
surface
surface-hover
foreground
foreground-muted
foreground-subtle
border
border-strong
accent
accent-soft
success
danger
```

---

# 27. Image Handling

Use Next.js Image where appropriate.

For remote R2 artwork:

- configure allowed remote domains
- use responsive sizing
- provide dimensions
- avoid layout shift

Use placeholders where practical. Only preload hero artwork when genuinely above the fold.

---

# 28. Loading States

Use subtle skeletons that preserve final layout dimensions. Avoid generic gray blocks everywhere. Shimmer should be used only when useful.

---

# 29. Empty States

Example:

```text
هنوز اپیزودی منتشر نشده

اولین اپیزود به‌زودی منتشر خواهد شد.
```

Keep it editorial and minimal.

---

# 30. Error States

Example:

```text
پخش این اپیزود ممکن نیست.

دوباره تلاش کنید.
```

For audio failures, provide retry and a direct audio link when appropriate.

---

# 31. Search

Search should be simple. Results prioritize:

1. episode title
2. description
3. tags
4. transcript if transcripts are later implemented

The search interface should feel like part of the editorial system, not a dashboard.

---

# 32. Dark / Light Theme

Dark is the default.

If light mode is implemented:

```css
background: #F4F1EA;
foreground: #111114;
surface: #FFFFFF;
```

Keep the same accent. Do not redesign the visual language for light mode.

---

# 33. Visual Hierarchy

### Homepage

1. What is GitCast?
2. What is the latest episode?
3. Can I play it immediately?
4. What other episodes exist?
5. Where can I learn more?

### Episode page

1. What episode is this?
2. What is it about?
3. Can I play it?
4. How long is it?
5. What is the content?
6. What should I listen to next?

---

# 34. What NOT to Build

Do not introduce:

- admin dashboard
- login UI
- user accounts
- database-driven CMS UI
- SaaS pricing page
- analytics dashboard
- excessive glassmorphism
- excessive neon
- generic startup gradients
- huge animated backgrounds
- random illustrations
- unnecessary carousels
- infinite scrolling
- excessive rounded cards

GitCast is a **publishing website**, not a SaaS application.

---

# 35. Reference Fidelity

The selected Story Scape reference is a **visual direction**, not a pixel-perfect cloning target.

Match:

- cinematic atmosphere
- typography scale
- visual density
- artwork prominence
- dark palette
- editorial composition
- negative space
- subtle motion
- premium feeling

Do not copy:

- exact artwork
- logos
- proprietary illustrations
- exact text
- exact branding
- distinctive copyrighted assets

Create original GitCast equivalents.

---

# 36. Implementation Priority

### Phase 1

1. global theme
2. typography
3. layout/container
4. header
5. homepage hero
6. episode card
7. episode archive
8. episode page
9. audio player

### Phase 2

10. responsive layouts
11. mobile navigation
12. animations
13. search
14. related episodes
15. footer

### Phase 3

16. SEO
17. JSON-LD
18. accessibility audit
19. performance optimization
20. light theme

---

# 37. Definition of Done

The frontend is visually complete when:

- it immediately feels like a cinematic podcast publication
- Story Scape's visual language is recognizable as the inspiration without being copied
- Persian RTL feels native
- typography is the dominant visual element
- artwork has strong visual presence
- the latest episode is immediately playable
- episode cards are consistent
- the audio player looks custom and premium
- mobile is designed intentionally rather than simply stacked
- animations are subtle
- no component looks like an unrelated design system
- colors and spacing come from centralized tokens
- no arbitrary one-off styling is scattered through the application
- accessibility and keyboard navigation work
- the site remains fast despite large artwork and audio assets

---

# 38. Coding-Agent Instruction

When implementing the frontend, treat this document as the **authoritative visual specification**.

If an implementation decision conflicts with this document:

1. preserve the design language
2. preserve RTL correctness
3. preserve accessibility
4. preserve responsive behavior
5. prefer the simplest implementation

Do not invent a different visual identity.

Do not turn GitCast into a generic SaaS dashboard.

Use the supplied Story Scape reference screenshots only to understand composition, atmosphere, hierarchy, and interaction patterns.

The final result should feel like an original, production-quality Persian podcast platform built around the GitCast brand.
