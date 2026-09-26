import { cn } from '@/lib/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border',
        'bg-container-background border-container-border',
        'px-9 py-9 pb-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
