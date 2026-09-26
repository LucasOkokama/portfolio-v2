'use client';

import { ExternalLink } from '@/components/ui/ExternalLink/ExternalLink';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/types/icons.type';
import { useState } from 'react';

interface ExternalLinkItem {
  href: string;
  website: string;
  icon: IIconName;
  username?: string;
}

interface Props {
  items: ExternalLinkItem[];
}

export function ExternalLinksGroup({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rows = Array.from({ length: Math.ceil(items.length / 2) }, (_, i) =>
    items.slice(i * 2, i * 2 + 2),
  );

  return (
    <div
      className="flex flex-col gap-3"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-3">
          {row.map((item, columnIndex) => {
            const index = rowIndex * 2 + columnIndex;

            return (
              <ExternalLink
                key={index}
                {...item}
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
