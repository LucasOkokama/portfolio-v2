import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { ILocalizedText } from '@/schemas/zod/common.schema';

type IImageFallbackType = 'notFound' | 'notAvailable';

type Props = {
  locale: ILocale;
  type: IImageFallbackType;
  className?: string;
};

const fallbackContent = {
  notFound: {
    title: {
      en: '[404] Image not found.',
      pt: '[404] Imagem não encontrada.',
    },
    description: {
      en: 'The requested image could not be found. It may have been moved, deleted, or is no longer available.',
      pt: 'A imagem solicitada não foi encontrada. Ela pode ter sido movida, excluída ou não estar mais disponível.',
    },
  },
  notAvailable: {
    title: {
      en: 'Graphical interface? Only through the terminal.',
      pt: 'Interface gráfica? Só se for via terminal.',
    },
    description: {
      en: 'This project does not include illustrative images. Check its description to learn about its features and functionalities.',
      pt: 'Este projeto não conta com imagens ilustrativas. Consulte sua descrição para conhecer suas características e funcionalidades.',
    },
  },
} satisfies Record<
  IImageFallbackType,
  {
    title: ILocalizedText;
    description: ILocalizedText;
  }
>;

export function ImageFallback({ locale, type, className }: Props) {
  const content = fallbackContent[type];

  const titleText = localize(content.title, locale);
  const descriptionText = localize(content.description, locale);

  return (
    <div
      className={cn(
        'h-full w-full',
        'flex flex-col items-center justify-center gap-4',
        'text-center',
        className,
      )}
    >
      <uiIcons.imageNotFound
        width={42}
        height={42}
        className={cn('text-neutral-400 dark:text-neutral-600')}
      />

      <Title
        text={titleText}
        className={cn('text-lg', 'text-neutral-500 dark:text-neutral-500')}
      />

      {descriptionText && (
        <Text
          text={descriptionText}
          className={cn(
            'w-sm',
            'text-xs leading-5',
            'text-neutral-400 dark:text-neutral-600',
          )}
        />
      )}
    </div>
  );
}
