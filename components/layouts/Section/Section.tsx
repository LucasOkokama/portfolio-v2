import { cn } from '@/lib/utils/cn';

interface Props {
  title: string;
  command: string;
  children: React.ReactNode;
}

export function Section({ title, command, children }: Props) {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex flex-col gap-1.5')}>
          <span
            className={cn(
              'text-section-text-secondary font-roboto-mono text-xs',
            )}
          >
            {command}
          </span>
          <h2
            className={cn(
              'text-section-text-primary font-playfair text-4xl font-medium',
            )}
          >
            {title}
          </h2>
        </div>
        <div>
          <span>Button</span>
        </div>
      </div>

      {children}
    </div>
  );
}
