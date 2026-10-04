import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/schemas/zod/common';

interface Props {
  label: string;
  icon?: IIconName;
}

export function BadgeTag({ label, icon }: Props) {
  const Icon = icon ? icons[icon] : undefined;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2.5',
        'px-3 py-1.5',
        'bg-badgetag-background',
        'border-badgetag-border hover:border-badgetag-border-hover rounded-sm border',
        'text-badgetag-text hover:text-badgetag-text-hover',
        'transition-colors duration-200',
      )}
    >
      {Icon && <Icon className={cn('size-5')} />}
      <span className={cn('text-sm transition-colors duration-200')}>
        {label}
      </span>
    </div>
  );
}
