'use client';

import { ThemeProvider } from 'next-themes';

/* < CTLFM --> TO BE REMOVED > */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;

  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes(
        'Encountered a script tag while rendering React component',
      )
    ) {
      return;
    }

    originalError(...args);
  };
}
/* </ CTLFM --> TO BE REMOVED > */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
