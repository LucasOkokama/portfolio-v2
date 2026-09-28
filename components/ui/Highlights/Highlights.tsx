import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { ILocalizedText } from '@/types/contents.type';
import { Fragment } from 'react/jsx-runtime';

interface Props {
  items: ILocalizedText[];
  locale: ILocale;
}

export function Highlights({ items, locale }: Props) {
  return (
    <div className={cn('flex items-center gap-3 font-medium')}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span
              aria-hidden="true"
              className={cn('text-highlights-slash text-xs')}
            >
              /
            </span>
          )}
          <span className={cn('text-highlights-text text-sm font-semibold')}>
            {localize(item, locale)}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
