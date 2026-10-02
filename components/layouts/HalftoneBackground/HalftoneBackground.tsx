import { cn } from '@/lib/utils/cn';

export function HalftoneBackground() {
  return (
    <svg
      className={cn('pointer-events-none fixed inset-0 -z-10', 'h-dvh w-dvw')}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="halftone"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <circle
            cx="2"
            cy="2"
            r="1"
            className="fill-halftonebackground-fill"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#halftone)" opacity="10%" />
    </svg>
  );
}
