import { HalftoneBackground } from '@/components/layouts/HalftoneBackground/HalftoneBackground';
import { MenuMain } from '@/components/layouts/MenuMain/MenuMain';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { aboutMe } from '@/lib/utils/loaders';
import { getAppLocale, localize } from '@/lib/utils/localize';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Inter, Outfit, Playfair_Display, Roboto_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAppLocale();

  return {
    title: {
      default: `Portfolio | ${aboutMe.name} - ${localize(aboutMe.role, locale)}`,
      template: `%s | ${aboutMe.name}`,
    },
    icons: {
      icon: [
        {
          url: '/brand/logo-light.svg',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/brand/logo-dark.svg',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          playfair.variable,
          outfit.variable,
          inter.variable,
          robotoMono.variable,
        )}
      >
        <HalftoneBackground />

        <div
          className={cn(
            'w-full max-w-5xl',
            'mx-auto',
            'flex flex-col items-center',
          )}
        >
          <NextIntlClientProvider>
            <Providers>
              <div
                className={cn(
                  'fixed top-4 left-1/2 z-50',
                  'w-full max-w-3xl',
                  '-translate-x-1/2',
                )}
              >
                <MenuMain />
              </div>

              <main className={cn('w-full pt-32')}>{children}</main>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
