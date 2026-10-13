'use client';

import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useSyncExternalStore } from 'react';

const SIZE = 12;

type Props = {
  emblaApi: EmblaCarouselType | undefined;
};

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
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

  const prevBtnDisabled = useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollPrev(),
    () => false,
  );

  const nextBtnDisabled = useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollNext(),
    () => false,
  );

  const onPrevButtonClick = useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );

  const onNextButtonClick = useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export function ImageCarouselPrevButton({ emblaApi }: Props) {
  const { prevBtnDisabled, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <button
      type="button"
      onClick={onPrevButtonClick}
      disabled={prevBtnDisabled}
      className={cn(
        'p-3',
        'rounded-full border',
        'cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        'bg-neutral-200 dark:bg-neutral-700',
        'border-neutral-300 dark:border-neutral-600',
        'text-neutral-950 dark:text-neutral-50',
        'hover:bg-neutral-300 hover:dark:bg-neutral-600',
      )}
    >
      <uiIcons.chevronLeft width={SIZE} height={SIZE} />
    </button>
  );
}

export function ImageCarouselNextButton({ emblaApi }: Props) {
  const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <button
      type="button"
      onClick={onNextButtonClick}
      disabled={nextBtnDisabled}
      className={cn(
        'p-3',
        'rounded-full border',
        'cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        'bg-neutral-200 dark:bg-neutral-700',
        'border-neutral-300 dark:border-neutral-600',
        'text-neutral-950 dark:text-neutral-50',
        'hover:bg-neutral-300 hover:dark:bg-neutral-600',
      )}
    >
      <uiIcons.chevronRight width={SIZE} height={SIZE} />
    </button>
  );
}
