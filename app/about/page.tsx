import Link from "next/link";
import { BrandName } from "@/components/BrandLogo";
import { LocaleText } from "@/components/LocaleProvider";

const principles = [
  { index: "01", titleKey: "about.principle.story.title", descriptionKey: "about.principle.story.description" },
  { index: "02", titleKey: "about.principle.open.title", descriptionKey: "about.principle.open.description" },
  { index: "03", titleKey: "about.principle.freedom.title", descriptionKey: "about.principle.freedom.description" },
] as const;

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1480px] px-5 pb-24 pt-8 sm:px-8 lg:px-12">
      <section className="about-hero overflow-hidden rounded-[2rem] border border-border p-7 sm:rounded-[2.5rem] sm:p-12 lg:p-16">
        <p className="eyebrow text-foreground-subtle">
          <LocaleText id="about.eyebrow" /> <BrandName />
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="max-w-4xl text-4xl font-medium leading-[1.2] text-foreground sm:text-6xl lg:text-7xl">
            <LocaleText id="about.hero.title.beforeAccent" />{" "}
            <span className="text-accent"><LocaleText id="about.hero.title.accent" /></span>
          </h1>
          <p className="max-w-xl text-base leading-8 text-foreground-muted sm:text-lg">
            <LocaleText id="about.hero.description" />
          </p>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-border pt-6 text-sm text-foreground-subtle">
          <span><LocaleText id="about.promise.persian" /></span>
          <span className="text-accent" aria-hidden="true">·</span>
          <span><LocaleText id="about.promise.open" /></span>
          <span className="text-accent" aria-hidden="true">·</span>
          <span><LocaleText id="about.promise.listening" /></span>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="eyebrow text-foreground-subtle"><LocaleText id="about.beliefs.eyebrow" /></p>
          <h2 className="mt-4 text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            <LocaleText id="about.beliefs.title" />
          </h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {principles.map((principle) => (
            <article key={principle.index} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-5 sm:py-8">
              <span className="pt-1 font-mono text-sm text-accent">{principle.index}</span>
              <div>
                <h3 className="text-xl font-medium text-foreground">
                  <LocaleText id={principle.titleKey} />
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted sm:text-base">
                  <LocaleText id={principle.descriptionKey} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-6 rounded-[2rem] border border-border bg-background-elevated p-7 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <p className="eyebrow text-foreground-subtle"><LocaleText id="about.listen.eyebrow" /></p>
          <h2 className="mt-3 text-2xl font-medium text-foreground sm:text-3xl">
            <LocaleText id="about.listen.title" />
          </h2>
        </div>
        <Link href="/#episodes" className="button-primary self-start sm:self-auto">
          <LocaleText id="about.listen.action" />
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
