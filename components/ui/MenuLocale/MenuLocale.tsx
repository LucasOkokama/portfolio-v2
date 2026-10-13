'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { ILocale } from '@/i18n/routing';
import { wait } from '@/lib/utils/async';
import { cn } from '@/lib/utils/cn';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { DropdownMenuSelector } from '../DropdownMenuSelector/DropdownMenuSelector';

interface IMenuLocaleItem {
  value: ILocale;
  key: ILocale;
  label: string;
}

const OPTIONS: IMenuLocaleItem[] = [
  {
    value: 'pt',
    key: 'pt',
    label: 'BR',
  },
  {
    value: 'en',
    key: 'en',
    label: 'US',
  },
] as const;

export function MenuLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const tLocale = useTranslations('locale');

  const [displayLocale, setDisplayLocale] = useState(locale);

  const handleLocaleChange = async (value: string) => {
    if (value === displayLocale) return;

    setDisplayLocale(value as ILocale);
    await wait(150);

    router.replace(pathname, {
      locale: value as ILocale,
      scroll: false,
    });
  };

  return (
    <DropdownMenuSelector
      value={displayLocale}
      options={OPTIONS}
      width="w-38"
      onValueChange={handleLocaleChange}
      renderTrigger={option => <span>{option?.label}</span>}
      renderOption={option => (
        <div className={cn('flex items-center gap-3', 'text-xs')}>
          <span className="text-sm font-semibold">{option.label}</span>
          <span>{tLocale(option.key)}</span>
        </div>
      )}
    />
  );
}
