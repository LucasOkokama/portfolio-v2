'use client';

import { Container } from '@/components/layouts/Container/Container';
import { BadgeTag } from '@/components/ui/BadgeTag/BadgeTag';
import { Button } from '@/components/ui/Button/Button';
import { ButtonLink } from '@/components/ui/ButtonLink/ButtonLink';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import { projectScopeLabels } from '@/constants/projects';
import { useMounted } from '@/hooks/useMounted';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { IProject } from '@/schemas/zod/projects';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

type Props = {
  locale: ILocale;
  project: IProject;
  scrollable?: boolean;
};

export function ProjectCard({ locale, project, scrollable = false }: Props) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const tProjectCard = useTranslations('projectCard');

  const bannerSrc = !mounted
    ? project.banner.default
    : resolvedTheme === 'dark'
      ? (project.banner.dark ?? project.banner.default)
      : (project.banner.light ?? project.banner.default);

  return (
    <Container
      className={cn(
        'p-0',
        'hover:border-orange-500/75 dark:hover:border-amber-400/75',
      )}
    >
      <div className={cn('group', 'relative', 'h-62')}>
        <div
          className={cn(
            'absolute',
            'top-4 left-4',
            'z-10',
            'transition-opacity duration-1000 ease-in-out',
            'group-hover:opacity-0',
            'pointer-events-none',
          )}
        >
          <BadgeTag
            label={localize(
              projectScopeLabels[project.metadata.scope],
              locale,
            ).toUpperCase()}
            className="font-semibold tracking-wider"
            variant="featured"
          />
        </div>

        <div
          className={cn(
            'h-full',
            'border-b',
            'overflow-hidden',
            'border-neutral-200 dark:border-neutral-800',
            styles.bannerContainer,
            scrollable && styles.scrollable,
          )}
        >
          <a
            href={bannerSrc}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'focus-visible-inset',
              'block',
              'h-full',
              'rounded-t-2xl',
              'overflow-hidden',
              'cursor-pointer',
            )}
          >
            <Image
              src={bannerSrc}
              alt=""
              width={1366}
              height={2455}
              className={cn(styles.banner, !scrollable && styles.bannerStatic)}
            />
          </a>
        </div>
      </div>

      <div className={cn('flex flex-col gap-2', 'p-6')}>
        <Title
          text={localize(project.name, locale)}
          className={cn('text-xl font-semibold')}
        />

        <Text text={localize(project.summary, locale)} className="mb-2" />

        <div className={cn('flex flex-wrap gap-2', 'mb-1.5')}>
          {project.technologies.slice(0, 6).map(item => (
            <BadgeTag key={item.label} label={item.label} icon={item.icon} />
          ))}

          {project.technologies.length > 6 && (
            <BadgeTag label={`+${project.technologies.length - 6}`} />
          )}
        </div>

        <div
          className={cn(
            'w-full',
            'mb-1.5',
            'border-t',
            'border-neutral-200 dark:border-neutral-800',
          )}
        />

        <div className={cn('flex justify-between')}>
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
          </div>
          <Button
            icon="arrowRight"
            text={tProjectCard('details')}
            variant="secondary"
            iconPosition="right"
            iconClassName={cn(
              'size-3',
              'transition-transform duration-200',
              'group-hover:translate-x-[3px]',
            )}
          />
        </div>
      </div>
    </Container>
  );
}
