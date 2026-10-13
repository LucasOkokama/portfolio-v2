'use client';

import { cn } from '@/lib/utils/cn';
import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useSyncExternalStore } from 'react';

type Props = {
  emblaApi: EmblaCarouselType | undefined;
};

export function useSelectedSnapDisplay(
  emblaApi: EmblaCarouselType | undefined,
) {
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

  const selectedSnap = useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  const snapCount = useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length ?? 0,
    () => 0,
  );

  return {
    selectedSnap,
    snapCount,
  };
}

export function ImageCarouselSnapCounter({ emblaApi }: Props) {
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  if (snapCount === 0) return null;

  return (
    <div
      className={cn(
        'flex gap-1',
        'rounded-lg',
        'px-2.5 py-1.5',
        'font-roboto-mono text-xs',
        'transition-colors duration-200',
      )}
    >
      <span>{selectedSnap + 1}</span>
      <span>/</span>
      <span>{snapCount}</span>
    </div>
  );
}
