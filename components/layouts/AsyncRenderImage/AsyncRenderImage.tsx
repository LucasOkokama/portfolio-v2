'use client';

import { ImageFallback } from '@/components/ui/ImageFallback/ImageFallback';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import styles from './AsyncRenderImage.module.css';

type Props = Omit<ImageProps, 'onError' | 'onLoad'> & {
  locale: ILocale;
  compactFallback?: boolean;
};

export function AsyncRenderImage({
  locale,
  alt,
  compactFallback = false,
  className,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <ImageFallback
        locale={locale}
        type="notFound"
        variant={compactFallback ? 'compact' : 'default'}
        className={className}
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {isLoading && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            'rounded-xl',
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
          'h-full w-full',
          'object-cover object-top',
          'select-none',
          'transition-opacity duration-500 ease-out',
          isLoading ? 'opacity-0' : 'opacity-100',
          className,
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
