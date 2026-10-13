'use client';

import { Container } from '@/components/layouts/Container/Container';
import { BadgeTag } from '@/components/ui/BadgeTag/BadgeTag';
import { ButtonLink } from '@/components/ui/ButtonLink/ButtonLink';
import { IconBulletList } from '@/components/ui/IconBulletList/IconBulletList';
import { ImageCarousel } from '@/components/ui/ImageCarousel/ImageCarousel';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { localize, localizeAll } from '@/lib/utils/localize';
import type { IProject } from '@/schemas/zod/projects';
import { useTranslations } from 'next-intl';
import { Dialog } from 'radix-ui';

type Props = {
  locale: ILocale;
  projectIndex: number;
  project: IProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ProjectDetails({
  locale,
  projectIndex,
  project,
  open,
  onOpenChange,
  onPrevious,
  onNext,
}: Props) {
  const tProjectDetails = useTranslations('projectDetails');
  const tProjectCard = useTranslations('projectCard');

  if (!project) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'z-20',
            'fixed inset-0',
            'backdrop-blur-xs',
            'bg-black/5 dark:bg-black/20',
          )}
        />

        <Dialog.Content
          className={cn(
            'z-25',
            'fixed',
            'top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
          )}
        >
          <Container className={cn('p-0', 'w-7xl')}>
            <div
              className={cn(
                'w-full',
                'flex items-center justify-between',
                'px-4 py-2',
                'bg-stone-200/70 dark:bg-neutral-800',
                'text-sm',
              )}
            >
              <BadgeTag
                label={`${projectIndex + 1}`}
                variant="new"
                backgroundOpacity={20}
                className={cn('font-roboto-mono font-bold')}
              />

              <span
                className={cn(
                  'font-semibold',
                  'tracking-wider',
                  'text-purple-500 dark:text-purple-400',
                )}
              >
                {tProjectDetails('title').toUpperCase()}
              </span>

              <div className={cn('flex items-center gap-6')}>
                <div className={cn('flex gap-1')}>
                  <button
                    onClick={onPrevious}
                    className={cn(
                      'p-2.5',
                      'rounded-lg border border-transparent',
                      'cursor-pointer',
                      'transition-colors duration-200',
                      'hover:text-neutral-950 dark:hover:text-neutral-50',
                      'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                    )}
                  >
                    <uiIcons.chevronLeft width={12} height={12} />
                  </button>

                  <button
                    onClick={onNext}
                    className={cn(
                      'p-2.5',
                      'rounded-lg border border-transparent',
                      'cursor-pointer',
                      'transition-colors duration-200',
                      'hover:text-neutral-950 dark:hover:text-neutral-50',
                      'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                    )}
                  >
                    <uiIcons.chevronRight width={12} height={12} />
                  </button>
                </div>
                <Dialog.Close asChild>
                  <div
                    className={cn(
                      'transition-colors duration-200',
                      'hover:text-red-500 hover:dark:text-red-400',
                    )}
                  >
                    <uiIcons.close width={14} height={14} />
                  </div>
                </Dialog.Close>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)]">
              <div className="p-6">
                <ImageCarousel slides={project.screenshots} />
              </div>

              <div
                className={cn(
                  'h-[94%]',
                  'self-center',
                  'rounded-full',
                  'bg-neutral-200/70 dark:bg-neutral-800/70',
                )}
              />

              <div className={cn('flex flex-col gap-8', 'p-6')}>
                <div className={cn('flex flex-col gap-4')}>
                  <Dialog.Title asChild>
                    <Title text={localize(project.name, locale)} level={2} />
                  </Dialog.Title>

                  <Dialog.Description asChild>
                    <Text
                      text={localize(project.description, locale)}
                      className="text-neutral-700 dark:text-neutral-300"
                    />
                  </Dialog.Description>
                </div>

                <div className={cn('flex flex-col gap-4')}>
                  <span
                    className={cn('font-roboto-mono text-xs tracking-widest')}
                  >
                    {tProjectDetails('keyFeatures').toUpperCase()}
                  </span>

                  <div
                    className={cn(
                      'flex flex-wrap gap-2',
                      'text-neutral-700 dark:text-neutral-300',
                    )}
                  >
                    <IconBulletList
                      items={localizeAll(project.keyFeatures, locale)}
                    />
                  </div>
                </div>

                <div className={cn('flex flex-col gap-4')}>
                  <span
                    className={cn('font-roboto-mono text-xs tracking-widest')}
                  >
                    {tProjectDetails('builtWith').toUpperCase()}
                  </span>

                  <div className={cn('flex flex-wrap gap-2')}>
                    {project.technologies.map(item => (
                      <BadgeTag
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                      />
                    ))}
                  </div>
                </div>

                <div className={cn('flex flex-col gap-4')}>
                  <span
                    className={cn('font-roboto-mono text-xs tracking-widest')}
                  >
                    {tProjectDetails('links').toUpperCase()}
                  </span>

                  <div className={cn('flex gap-2')}>
                    {project.links.repository && (
                      <ButtonLink
                        icon="github"
                        text={tProjectCard('repo')}
                        variant="neutral"
                        iconClassName="size-4.5"
                        href={project.links.repository}
                      />
                    )}

                    {project.links.live && (
                      <ButtonLink
                        icon="externalLink"
                        text={tProjectCard('live')}
                        variant="primary"
                        href={project.links.live}
                      />
                    )}

                    {project.links.design && (
                      <ButtonLink
                        icon="brush"
                        text={tProjectCard('design')}
                        variant="secondary"
                        href={project.links.design}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span>Footer</span>
            </div>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
