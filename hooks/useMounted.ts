'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Returns whether the component has been mounted on the client.
 * Useful for running client-only logic after hydration and avoiding SSR mismatches.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
