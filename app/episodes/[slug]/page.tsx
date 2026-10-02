import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { LocaleDate } from "@/components/LocaleDate";
import { LocaleText } from "@/components/LocaleProvider";
import { formatDuration, getAllEpisodes, getEpisodeBySlug, getEpisodeCoverSource } from "@/lib/content";
import podcast from "@/podcast.config";
import { sitePath } from "@/lib/site-path";

export function generateStaticParams() {
  return getAllEpisodes().map((episode) => ({ slug: episode.slug }));
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const cover = getEpisodeCoverSource(episode) ?? sitePath(podcast.artwork);

  return (
    <main className="mx-auto w-full max-w-370 px-5 pb-24 pt-8 sm:px-8 lg:px-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link href="/#episodes" className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground">
          <span aria-hidden="true">←</span>
          <LocaleText id="episode.back" />
        </Link>
        <span className="rounded-full border border-border bg-background-elevated px-3 py-1 text-xs text-foreground-subtle">
          #{episode.id}
        </span>
      </div>

      <section className="overflow-hidden rounded-4xl border border-border bg-background-elevated">
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="detail-artwork relative aspect-square lg:aspect-auto">
            <Image
              src={cover}
              alt=""
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
            <span dir="ltr" className="detail-artwork-label">
              G / {episode.id}
            </span>
          </div>
          <div className="min-w-0 p-4 sm:p-9 lg:p-12">
            <p className="eyebrow text-foreground-subtle"><LocaleText id="episode.number" values={{ id: episode.id }} /></p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-foreground-muted">
              <LocaleDate date={episode.date} />
              <span>•</span>
              <span>{formatDuration(episode.duration)}</span>
            </div>

            <h1 lang="fa" dir="rtl" className="mt-5 text-4xl font-medium leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {episode.title}
            </h1>

            <p lang="fa" dir="rtl" className="mt-5 max-w-2xl text-base leading-8 text-foreground-muted sm:text-lg">
              {episode.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {episode.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground-muted">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <PodcastPlayer episode={episode} />
            </div>
          </div>
        </div>
      </section>

      <article lang="fa" dir="rtl" className="article-copy reveal-up mt-12 px-1 sm:mt-16">
        <p className="eyebrow mb-5 text-foreground-subtle"><LocaleText id="episode.notes" /></p>
        <ReactMarkdown>{episode.content}</ReactMarkdown>
      </article>
    </main>
  );
}
