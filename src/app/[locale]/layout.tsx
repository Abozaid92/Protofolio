import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);

  return (
    <div className="min-h-screen flex flex-col" dir={params.locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header locale={params.locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
