'use client';

import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { localize, validateLocale } from '@/lib/utils/localize';
import type { IProjectScreenshot } from '@/schemas/zod/projects';
import useEmblaCarousel from 'embla-carousel-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import {
  ImageCarouselNextButton,
  ImageCarouselPrevButton,
} from './ImageCarouselControlArrows';
import { ImageCarouselControlThumbs } from './ImageCarouselControlThumbs';
import {
  ImageCarouselSnapCounter,
  useSelectedSnapDisplay,
} from './ImageCarouselSnapCounter';

interface Props {
  slides: IProjectScreenshot[];
}

export function ImageCarousel({ slides }: Props) {
  const locale = validateLocale(useLocale());
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedSnap } = useSelectedSnapDisplay(emblaApi);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        emblaApi?.scrollNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        emblaApi?.scrollPrev();
      }
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [emblaApi, handleKeyDown]);

  return (
    <div className={cn('flex flex-col gap-1')}>
      <div
        className={cn(
          'flex items-center justify-between',
          'px-2 py-1.5',
          'rounded-md',
          'bg-stone-200/70 dark:bg-neutral-800/70',
        )}
      >
        <a
          href={slides[selectedSnap].path}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'p-2.5',
            'rounded-lg border border-transparent',
            'transition-colors duration-200',
            'hover:text-neutral-950 dark:hover:text-neutral-50',
            'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
          )}
        >
          <uiIcons.fullscreen width={12} height={12} />
        </a>

        <span className={cn('font-roboto-mono text-sm')}>
          {localize(slides[selectedSnap].name, locale)}
        </span>

        <ImageCarouselSnapCounter emblaApi={emblaApi} />
      </div>

      <div className={cn('group', 'relative', 'mt-1')}>
        <div
          className={cn(
            'overflow-hidden',
            'rounded-2xl border',
            'border-neutral-300 dark:border-neutral-700',
          )}
          ref={emblaRef}
        >
          <div className={cn('[touch-action:pan-y_pinch-zoom]', 'flex')}>
            {slides.map((item, index) => (
              <div key={index} className="h-80 w-full shrink-0">
                <Image
                  src={item.path}
                  alt={''}
                  width={1920}
                  height={1080}
                  className={cn(
                    'h-full w-full',
                    'object-cover object-top',
                    'select-none',
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            'absolute',
            'top-1/2 right-3 left-3',
            '-translate-y-1/2',
            'pointer-events-none opacity-0',
            'transition-opacity duration-200',
            'group-hover:opacity-100',
          )}
        >
          <div className={cn('flex items-center justify-between')}>
            <div className="pointer-events-auto">
              <ImageCarouselPrevButton emblaApi={emblaApi} />
            </div>

            <div className="pointer-events-auto">
              <ImageCarouselNextButton emblaApi={emblaApi} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <ImageCarouselControlThumbs emblaApi={emblaApi} slides={slides} />
      </div>
    </div>
  );
}
