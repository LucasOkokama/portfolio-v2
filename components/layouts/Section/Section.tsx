import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import { cn } from '@/lib/utils/cn';

interface Props {
  title: string;
  command: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ title, command, button, children }: Props) {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex flex-col gap-1.5')}>
          <Text text={command} className={cn('font-roboto-mono text-xs')} />
          <Title
            text={title}
            className={cn('font-playfair text-4xl font-medium')}
          />
        </div>

        {button && <div>{button}</div>}
      </div>

      {children}
    </div>
  );
}
