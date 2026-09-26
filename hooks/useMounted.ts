'use client';

import { useEffect, useState } from 'react';

/**
 * Returns whether the component has been mounted on the client.
 * Useful for running client-only logic after hydration and avoiding SSR mismatches.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
