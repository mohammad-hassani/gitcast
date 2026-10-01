import Link from "next/link";
import { BrandName } from "@/components/BrandLogo";
import { LocaleText } from "@/components/LocaleProvider";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] items-center justify-center px-5 py-20 md:px-10">
      <div className="rounded-[2rem] border border-border bg-background-elevated px-8 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-foreground-muted">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          <LocaleText id="notFound.title" />
        </h1>
        <p className="mt-4 text-lg text-foreground-muted">
          <LocaleText id="notFound.description.beforeBrand" /> <BrandName /><LocaleText id="notFound.description.afterBrand" />
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-background">
          <LocaleText id="notFound.home" />
        </Link>
      </div>
    </main>
  );
}
