"use client";

import { useLocale } from "@/components/LocaleProvider";
import { translations } from "@/content/i18n/translations";
import { formatDate } from "@/lib/date";

export function LocaleDate({ date }: { date: string }) {
  const { locale } = useLocale();
  return <time dateTime={date}>{formatDate(date, translations[locale].intlLocale)}</time>;
}
