import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { BrandLogo } from "@/components/BrandLogo";
import { LocaleProvider, LocaleText } from "@/components/LocaleProvider";
import { SiteNavigation } from "@/components/SiteNavigation";
import { defaultLocale, translations } from "@/content/i18n/translations";
import { sitePath } from "@/lib/site-path";
import podcast from "@/podcast.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iranYekan = localFont({
  src: "../public/fonts/IRANYekanXVF.woff2",
  variable: "--font-iranyekan",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: podcast.title,
  description: translations.en.messages["metadata.description"],
  metadataBase: new URL(podcast.websiteUrl),
  icons: {
    icon: sitePath("/logo/logoBG_rounded.svg"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={translations[defaultLocale].intlLocale} dir={translations[defaultLocale].direction} data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${iranYekan.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <LocaleProvider>
          <div className="min-h-screen">
            <SiteNavigation title={podcast.title} />

            {children}

            <footer className="site-footer mx-auto flex w-full max-w-[1480px] flex-col gap-3 border-t border-border px-5 py-8 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
              <Link href="/" className="brand-mark">
                <BrandLogo title={podcast.title} />
              </Link>
              <p><LocaleText id="footer.tagline" /></p>
            </footer>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
