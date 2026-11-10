'use client';

import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { localize, validateLocale } from '@/lib/utils/localize';
import type { IProjectScreenshot } from '@/schemas/zod/projects.schema';
import useEmblaCarousel from 'embla-carousel-react';
import { useLocale } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { ImageFallback } from '../ImageFallback/ImageFallback';
import { PlaceholderDisabled } from '../PlaceholderDisabled/PlaceholderDisabled';
import {
  ImageCarouselNextButton,
  ImageCarouselPrevButton,
} from './ImageCarouselControlArrows';
import { ImageCarouselControlThumbs } from './ImageCarouselControlThumbs';
import {
  ImageCarouselSnapCounter,
  useSelectedSnapDisplay,
} from './ImageCarouselSnapCounter';
import { AsyncRenderImage } from '@/components/layouts/AsyncRenderImage/AsyncRenderImage';

interface Props {
  slides: IProjectScreenshot[];
}

export function ImageCarousel({ slides }: Props) {
  const locale = validateLocale(useLocale());
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedSnap } = useSelectedSnapDisplay(emblaApi);
  const selectedSlide = slides[selectedSnap];

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
          'h-12',
          'relative',
          'flex items-center justify-between',
          'px-2 py-1.5',
          'rounded-md',
          selectedSlide && 'bg-neutral-200/70 dark:bg-neutral-800/70',
        )}
      >
        {selectedSlide ? (
          <>
            <a
              href={selectedSlide.path}
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
              {localize(selectedSlide.name, locale)}
            </span>

            <ImageCarouselSnapCounter emblaApi={emblaApi} />
          </>
        ) : (
          <PlaceholderDisabled className={cn('absolute inset-0')} />
        )}
      </div>

      <div className={cn('group', 'relative', 'mt-1')}>
        {slides.length !== 0 ? (
          <>
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
                    <AsyncRenderImage
                      src={item.path}
                      alt={''}
                      width={1920}
                      height={1080}
                      className={cn(
                        'h-full w-full',
                        'object-cover object-top',
                        'select-none',
                      )}
                      locale={locale}
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
          </>
        ) : (
          <div
            className={cn(
              'h-80',
              'flex',
              'overflow-hidden',
              'rounded-2xl border',
              'border-neutral-300 dark:border-neutral-700',
            )}
          >
            <ImageFallback locale={locale} type="notAvailable" />
          </div>
        )}
      </div>

      <div>
        {slides.length > 0 ? (
          <ImageCarouselControlThumbs emblaApi={emblaApi} slides={slides} />
        ) : (
          <div className={cn('h-16')}>
            <PlaceholderDisabled />
          </div>
        )}
      </div>
    </div>
  );
}
