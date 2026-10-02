import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LocaleDate } from "@/components/LocaleDate";
import { LocaleText } from "@/components/LocaleProvider";
import { sitePath } from "@/lib/site-path";
import podcast from "@/podcast.config";
import {
  formatDuration,
  getAllEpisodes,
  getLatestEpisode,
} from "@/lib/content";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M7.5 4.9c0-.8.9-1.3 1.6-.9l11 6.6a1.6 1.6 0 0 1 0 2.8l-11 6.6c-.7.4-1.6-.1-1.6-.9V4.9Z" />
    </svg>
  );
}

function Waveform() {
  return (
    <span aria-hidden="true" className="waveform">
      {Array.from({ length: 32 }, (_, index) => (
        <i
          key={index}
          style={{
            "--bar-index": index,
            "--bar-height": `${5 + (index % 5) * 2}px`,
          } as CSSProperties}
        />
      ))}
    </span>
  );
}

export default function HomePage() {
  const episodes = getAllEpisodes();
  const latestEpisode = getLatestEpisode();
  const heroArtwork = latestEpisode?.cover ?? podcast.artwork;

  return (
    <main className="mx-auto w-full max-w-370 px-5 pb-24 pt-5 sm:px-8 lg:px-12">
      <section className="hero-shell relative isolate overflow-hidden rounded-4xl border border-border sm:rounded-[2.5rem]">
        <div className="hero-image absolute inset-0 -z-20">
          <Image
            src={heroArtwork}
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-center"
          />
        </div>
        <div className="hero-scrim absolute inset-0 -z-10" />

        <div className="hero-content grid min-h-150 items-end gap-12 p-6 sm:min-h-170 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-center lg:p-16">
          <div className="max-w-3xl">
            <p className="eyebrow hero-enter">
              <span className="eyebrow-dot" />
              <LocaleText id="home.hero.eyebrow" />
            </p>
            <h1 className="hero-title hero-enter delay-1 mt-7 text-balance text-5xl font-medium leading-[1.08] text-foreground sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">
              <LocaleText id="home.hero.title.firstLine" /><br />
              <LocaleText id="home.hero.title.secondLine" />
              <span><LocaleText id="home.hero.title.accent" /></span>
            </h1>
            <p className="hero-description hero-enter delay-2 mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              <LocaleText id="home.hero.description" />
            </p>

            {latestEpisode && (
              <Link
                href={`/episodes/${latestEpisode.slug}`}
                className="mobile-feature-card"
                aria-label={latestEpisode.title}
              >
                <span className="mobile-feature-art relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={heroArtwork}
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="88px"
                    className="object-cover"
                  />
                  <span className="mobile-feature-play"><PlayIcon /></span>
                </span>
                <span className="mobile-feature-copy">
                  <span className="mobile-feature-label">
                    <LocaleText id="home.latest.episode" values={{ id: latestEpisode.id }} />
                  </span>
                  <bdi lang="fa" dir="rtl" className="mobile-feature-title">{latestEpisode.title}</bdi>
                  <span className="mobile-feature-meta">
                    {formatDuration(latestEpisode.duration)} <span aria-hidden="true">·</span> <LocaleDate date={latestEpisode.date} />
                  </span>
                </span>
                <span className="mobile-feature-arrow" aria-hidden="true"><ArrowIcon /></span>
              </Link>
            )}

            <div className="hero-actions hero-enter delay-3 mt-9 flex flex-wrap items-center gap-3">
              {latestEpisode ? (
                <Link
                  href={`/episodes/${latestEpisode.slug}`}
                  className="button-primary group"
                >
                  <span className="button-icon">
                    <PlayIcon />
                  </span>
                  <LocaleText id="home.latest.listen" />
                  <span className="button-arrow transition-transform group-hover:-translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              ) : (
                <a href="#episodes" className="button-primary">
                  <LocaleText id="home.explore" /> <ArrowIcon />
                </a>
              )}
              <a href={sitePath("/feed.xml")} className="button-quiet">
                <LocaleText id="home.subscribe" />
              </a>
            </div>
          </div>

          {latestEpisode && (
            <Link
              href={`/episodes/${latestEpisode.slug}`}
              className="featured-artwork group relative mx-auto aspect-square w-full max-w-57.5 overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/50 sm:max-w-75 lg:mx-0 lg:max-w-85"
              aria-label={latestEpisode.title}
            >
              <Image
                src={heroArtwork}
                alt={`Episode cover: ${latestEpisode.title}`}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 70vw, 340px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="artwork-index">G / {latestEpisode.id}</span>
              <span className="artwork-play">
                <PlayIcon />
              </span>
            </Link>
          )}
        </div>

        {latestEpisode && (
          <div className="hero-bottom flex flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 py-4 text-sm text-white/70 sm:px-10 lg:px-16">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent"><LocaleText id="home.featured.number" values={{ id: latestEpisode.id }} /></span>
              <span className="text-white/35">/</span>
              <bdi lang="fa" dir="rtl">{latestEpisode.title}</bdi>
            </div>
            <div className="flex items-center gap-3">
              <Waveform />
              <span>{formatDuration(latestEpisode.duration)}</span>
              <span className="text-white/35">·</span>
              <LocaleDate date={latestEpisode.date} />
            </div>
          </div>
        )}
      </section>

      <section className="intro-row reveal-up mt-20 grid gap-5 border-b border-border pb-8 sm:mt-28 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="eyebrow text-foreground-subtle"><LocaleText id="home.intro.eyebrow" /></p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-foreground sm:text-5xl">
            <LocaleText id="home.intro.title" />
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-foreground-muted sm:text-start">
          <LocaleText id="home.intro.description" />
        </p>
      </section>

      <section id="episodes" className="mt-8 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-foreground-subtle"><LocaleText id="home.episodes.eyebrow" /></p>
            <h2 className="mt-2 text-2xl font-medium text-foreground sm:text-3xl"><LocaleText id="home.episodes.title" /></h2>
          </div>
          <span className="text-sm text-foreground-subtle">
            <LocaleText
              id={episodes.length === 1 ? "home.episodes.count.one" : "home.episodes.count.other"}
              values={{ count: episodes.length }}
            />
          </span>
        </div>

        {episodes.length > 0 ? (
          <ul className="episode-list">
            {episodes.map((episode, index) => (
              <li key={episode.slug}>
                <article
                  className="episode-row reveal-up"
                  style={{ "--row-index": index } as CSSProperties}
                >
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className="episode-row-link group"
                    aria-label={episode.title}
                  >
                    <div className="episode-row-art relative aspect-square overflow-hidden">
                      <Image
                        src={episode.cover ?? podcast.artwork}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 64px, 88px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="episode-row-copy">
                      <span className="episode-row-number">
                        <LocaleText id="home.episodes.number" values={{ id: episode.id }} />
                      </span>
                      <h3 lang="fa" dir="rtl" className="episode-row-title">
                        <bdi>{episode.title}</bdi>
                      </h3>
                      <p lang="fa" dir="rtl" className="episode-row-description">
                        <bdi>{episode.description}</bdi>
                      </p>
                      <div className="episode-row-meta">
                        <LocaleDate date={episode.date} />
                        <span aria-hidden="true">·</span>
                        <span>{formatDuration(episode.duration)}</span>
                      </div>
                    </div>
                    <span className="episode-row-play" aria-hidden="true">
                      <PlayIcon />
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-foreground-muted">
            <LocaleText id="home.episodes.empty" />
          </div>
        )}
      </section>

      <section className="closing-note reveal-up mt-20 flex flex-col gap-6 rounded-4xl border border-border bg-surface p-7 sm:mt-28 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <p className="eyebrow text-foreground-subtle"><LocaleText id="home.closing.eyebrow" /></p>
          <h2 className="mt-3 text-2xl font-medium text-foreground sm:text-3xl">
            <LocaleText id="home.closing.title" />
          </h2>
          <p className="mt-2 text-sm leading-7 text-foreground-muted">
            <LocaleText id="home.closing.description" />
          </p>
        </div>
        <a href={sitePath("/feed.xml")} className="button-primary self-start sm:self-auto">
          <span className="button-icon">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4">
              <path
                d="M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM4 11a9 9 0 0 1 9 9m-9-15a15 15 0 0 1 15 15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <LocaleText id="home.closing.feed" />
          <ArrowIcon />
        </a>
      </section>
    </main>
  );
}
