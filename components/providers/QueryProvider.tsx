'use client';

import { makeQueryClient } from '@/lib/query/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
