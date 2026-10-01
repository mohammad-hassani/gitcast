"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useLocale, useTranslation } from "@/components/LocaleProvider";
import { getNextLocale, translations } from "@/content/i18n/translations";
import { sitePath } from "@/lib/site-path";

export function SiteNavigation({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = useTranslation();
  const nextLocale = getNextLocale(locale);

  const closeMenu = () => setIsOpen(false);
  const switchLocale = () => {
    setLocale(nextLocale);
    closeMenu();
  };

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner mx-auto flex w-full max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" onClick={closeMenu} className="brand-mark" aria-label={t("navigation.home", { brand: title })}>
          <BrandLogo title={title} />
        </Link>

        <nav className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label={t("navigation.main")}>
          <Link href="/#episodes" onClick={closeMenu}>{t("navigation.episodes")}</Link>
          <Link href="/about" onClick={closeMenu}>{t("navigation.about")}</Link>
          <a href={sitePath("/feed.xml")} onClick={closeMenu}>{t("navigation.feed")}</a>
          <Link href="/#episodes" onClick={closeMenu} className="nav-listen">
            {t("navigation.explore")}
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button type="button" className="locale-toggle" onClick={switchLocale} aria-label={t("navigation.switchLanguage", { language: translations[nextLocale].nativeName })}>
            {translations[nextLocale].shortName}
          </button>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="site-navigation" className={`mobile-nav ${isOpen ? "is-open" : ""}`} aria-label={t("navigation.mobile")} inert={!isOpen}>
        <Link href="/#episodes" onClick={closeMenu}>{t("navigation.episodes")}</Link>
        <Link href="/about" onClick={closeMenu}>{t("navigation.about")}</Link>
        <a href={sitePath("/feed.xml")} onClick={closeMenu}>{t("navigation.feed")}</a>
        <button type="button" className="locale-toggle" onClick={switchLocale} aria-label={t("navigation.switchLanguage", { language: translations[nextLocale].nativeName })}>
          {translations[nextLocale].nativeName}
        </button>
      </nav>
    </header>
  );
}
