'use client';

import { ImageFallback } from '@/components/ui/ImageFallback/ImageFallback';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import styles from './AsyncRenderImage.module.css';

type Props = Omit<ImageProps, 'onError' | 'onLoad'> & {
  locale: ILocale;
};

export function AsyncRenderImage({ locale, alt, className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ImageFallback locale={locale} type="notFound" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {isLoading && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            'overflow-hidden',
            'after:absolute after:inset-y-0 after:w-1/2',
            'bg-neutral-50 dark:bg-neutral-900',
            styles.shimmer,
          )}
        />
      )}

      <Image
        {...props}
        alt={alt}
        className={cn(
          className,
          'transition-opacity duration-500 ease-out',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
