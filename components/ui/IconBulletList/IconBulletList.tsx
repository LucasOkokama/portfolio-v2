import { brandIcons } from '@/icon/brand';
import { cn } from '@/lib/utils/cn';

interface IconBulletListProps {
  items: string[];
}

export function IconBulletList({ items }: IconBulletListProps) {
  return (
    <ul className={cn('flex flex-col gap-1.5')}>
      {items.map((item, index) => (
        <li key={index} className={cn('flex items-start gap-3')}>
          <brandIcons.fourPointedStar
            width={12}
            height={12}
            className={cn(
              'mt-1.5 shrink-0',
              'text-purple-500 dark:text-purple-400',
            )}
          />
          <span className={cn('text-sm leading-6')}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
