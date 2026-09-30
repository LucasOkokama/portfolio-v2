'use client';

import { ExternalLink } from '@/components/ui/ExternalLink/ExternalLink';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { IContactLink } from '@/types/profile.type';
import { useState } from 'react';

interface Props {
  items: IContactLink[];
  locale: ILocale;
}

export function ExternalLinksGroup({ items, locale }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rows = Array.from({ length: Math.ceil(items.length / 2) }, (_, i) =>
    items.slice(i * 2, i * 2 + 2),
  );

  return (
    <div
      className={cn('flex flex-col gap-2')}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={cn('flex gap-2')}>
          {row.map((item, columnIndex) => {
            const index = rowIndex * 2 + columnIndex;

            return (
              <ExternalLink
                key={index}
                href={item.href}
                icon={item.icon}
                website={localize(item.website, locale)}
                username={localize(item.label, locale)}
                active={activeIndex === index}
                dimmed={activeIndex !== null && activeIndex !== index}
                onHover={() => setActiveIndex(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
