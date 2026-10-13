'use client';

import { cn } from '@/lib/utils/cn';
import type { IProjectScreenshot } from '@/schemas/zod/projects';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Props = {
  emblaApi: EmblaCarouselType | undefined;
  slides: IProjectScreenshot[];
};

function useSelectedSnap(emblaApi: EmblaCarouselType | undefined) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};

      emblaApi.on('select', onStoreChange);
      emblaApi.on('reInit', onStoreChange);

      return () => {
        emblaApi.off('select', onStoreChange);
        emblaApi.off('reInit', onStoreChange);
      };
    },
    [emblaApi],
  );

  return useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0,
  );
}

export function ImageCarouselControlThumbs({ emblaApi, slides }: Props) {
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const selectedIndex = useSelectedSnap(emblaApi);

  const onThumbClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    thumbsApi?.scrollTo(selectedIndex);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [thumbsApi, selectedIndex]);

  return (
    <div className="overflow-hidden" ref={thumbsRef}>
      <div className={cn('flex w-full touch-pan-y gap-3', 'py-2')}>
        {slides.map((item, index) => {
          const isSelected = selectedIndex === index;
          const isFirst = index === 0;
          const isLast = index === slides.length - 1;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onThumbClick(index)}
              className={cn(
                'shrink-0 overflow-hidden rounded-md border-2',
                'transition-all duration-200',
                'border-neutral-300 dark:border-neutral-700',
                !isSelected && 'opacity-60 hover:opacity-100',
                isSelected && 'border-orange-500 dark:border-amber-400',
                isSelected && 'scale-115',
                isFirst && 'ml-2',
                isLast && 'mr-2',
              )}
            >
              <Image
                src={item.path}
                alt=""
                width={288}
                height={192}
                className={cn(
                  'h-16 w-24',
                  'object-cover object-top',
                  'select-none',
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
