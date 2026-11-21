'use client';

import { AsyncRenderLabel } from '@/components/layouts/AsyncRenderLabel/AsyncRenderLabel';
import { Container } from '@/components/layouts/Container/Container';
import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { BadgeStatus } from '@/components/ui/BadgeStatus/BadgeStatus';
import { BadgeTag } from '@/components/ui/BadgeTag/BadgeTag';
import { ButtonLink } from '@/components/ui/ButtonLink/ButtonLink';
import { ButtonRetry } from '@/components/ui/ButtonRetry/ButtonRetry';
import { IconBulletList } from '@/components/ui/IconBulletList/IconBulletList';
import { ImageCarousel } from '@/components/ui/ImageCarousel/ImageCarousel';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import {
  projectCategoryLabels,
  projectScopeLabels,
  projectStatusLabels,
  projectStatusVariants,
} from '@/constants/projects.const';
import { useGitHubRepository } from '@/hooks/useGitHubRepository';
import type { ILocale } from '@/i18n/routing';
import { icons } from '@/icon';
import { uiIcons } from '@/icon/ui';
import { isClientApiError } from '@/lib/api/client/api-error';
import { cn } from '@/lib/utils/cn';
import { formatDateLong, formatNumberCompact } from '@/lib/utils/format';
import { localize, localizeAll } from '@/lib/utils/localize';
import type { IProject } from '@/schemas/zod/projects.schema';
import { useTranslations } from 'next-intl';
import { Dialog } from 'radix-ui';

const SIZE = 9;

type Props = {
  locale: ILocale;
  projectIndex: number;
  project: IProject | null;
  open: boolean;
  isNavigationDisabled: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ProjectDetails({
  locale,
  projectIndex,
  project,
  open,
  isNavigationDisabled,
  onOpenChange,
  onPrevious,
  onNext,
}: Props) {
  const tProjectDetails = useTranslations('projectDetails');
  const tProjectCard = useTranslations('projectCard');

  const ProjectLogo = project?.logo ? icons[project.logo] : undefined;

  const {
    data: githubData,
    isFetching: githubFetching,
    error: githubError,
    refetch: refetchGitHub,
  } = useGitHubRepository(
    project?.repository?.owner ?? '',
    project?.repository?.name ?? '',
    locale,
    open && !!project?.repository,
  );

  const message = isClientApiError(githubError)
    ? githubError.originalMessage || githubError.message
    : githubError?.message;

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
            'bg-black/15 dark:bg-black/20',
          )}
        />

        <Dialog.Content
          className={cn(
            'z-25',
            'fixed top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'w-[calc(100vw-4rem)] max-w-7xl',
            'h-200 max-h-[calc(100dvh-4rem)]',
            'flex flex-col',
            'overflow-hidden',
          )}
        >
          <Container
            className={cn(
              'flex flex-col',
              'h-full w-full',
              'p-0',
              'overflow-hidden',
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between',
                'px-4 py-2',
                'border-b',
                'bg-neutral-200/70 dark:bg-neutral-950/40',
                'border-b-neutral-300/70 dark:border-b-neutral-800',
                'text-sm',
              )}
            >
              <div className={cn('flex gap-3')}>
                <BadgeTag
                  label={`${projectIndex + 1}`}
                  variant="new"
                  className={cn('font-roboto-mono font-bold')}
                />
                <BadgeTag
                  label={localize(
                    projectCategoryLabels[project.metadata.category],
                    locale,
                  ).toUpperCase()}
                  variant="information"
                  className="font-semibold tracking-wider"
                />
                <BadgeTag
                  label={localize(
                    projectScopeLabels[project.metadata.scope],
                    locale,
                  ).toUpperCase()}
                  variant="featured"
                  className="font-semibold tracking-wider"
                />
              </div>

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
                    disabled={isNavigationDisabled}
                    className={cn(
                      'p-2.5',
                      'rounded-lg',
                      'transition-colors duration-200',
                      isNavigationDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : cn(
                            'cursor-pointer',
                            'hover:text-neutral-950 dark:hover:text-neutral-50',
                            'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                          ),
                    )}
                  >
                    <uiIcons.chevronLeft width={12} height={12} />
                  </button>

                  <button
                    onClick={onNext}
                    disabled={isNavigationDisabled}
                    className={cn(
                      'p-2.5',
                      'rounded-lg',
                      'transition-colors duration-200',
                      isNavigationDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : cn(
                            'cursor-pointer',
                            'hover:text-neutral-950 dark:hover:text-neutral-50',
                            'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                          ),
                    )}
                  >
                    <uiIcons.chevronRight width={12} height={12} />
                  </button>
                </div>
                <Dialog.Close asChild>
                  <div
                    className={cn(
                      'p-2.5',
                      'rounded-lg',
                      'transition-colors duration-200',
                      'cursor-pointer',
                      'hover:text-red-500 hover:dark:text-red-400',
                      'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                    )}
                  >
                    <uiIcons.close width={14} height={14} />
                  </div>
                </Dialog.Close>
              </div>
            </div>
            <div
              className={cn(
                'grid min-h-0 flex-1',
                'grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)]',
                'grid-rows-[minmax(0,1fr)]',
              )}
            >
              <div
                className={cn('flex flex-col gap-8', 'p-6', 'overflow-y-auto')}
              >
                <ImageCarousel slides={project.screenshots} />

                <div className={cn('flex flex-col gap-3')}>
                  <Title
                    text={tProjectDetails('metadata').toUpperCase()}
                    type="subTitle"
                    className={cn('text-neutral-600 dark:text-neutral-400')}
                    rightElement={
                      <ButtonRetry
                        message={message}
                        loading={githubFetching}
                        onRetry={() => void refetchGitHub()}
                      />
                    }
                  />

                  <div
                    className={cn('font-roboto-mono flex flex-wrap gap-2.5')}
                  >
                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        prefix: `${tProjectDetails('githubRepository.created')}:`,
                        value: githubData?.createdAt
                          ? formatDateLong(githubData.createdAt, locale)
                          : undefined,
                        skeleton: <SkeletonGeneric className="h-4 w-16" />,
                      })}
                      icon="calendar"
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        prefix: `${tProjectDetails('githubRepository.updated')}:`,
                        value: githubData?.pushedAt
                          ? formatDateLong(githubData.pushedAt, locale)
                          : undefined,
                        skeleton: <SkeletonGeneric className="h-4 w-16" />,
                      })}
                      icon="pencil"
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        prefix: `${tProjectDetails(
                          'githubRepository.latestRelease',
                        )}:`,
                        value: githubData?.latestRelease?.tagName,
                      })}
                      icon="label"
                      {...(githubData?.latestRelease?.url && {
                        externalLink: githubData.latestRelease.url,
                      })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        value: githubData?.latestCommit?.sha.slice(0, 7),
                        prefix: `${tProjectDetails(
                          'githubRepository.latestCommit',
                        )}:`,
                        skeleton: <SkeletonGeneric className="h-4 w-12" />,
                      })}
                      icon="hash"
                      {...(githubData?.latestCommit?.url && {
                        externalLink: githubData.latestCommit.url,
                      })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        value:
                          githubData?.commits !== undefined
                            ? formatNumberCompact(githubData.commits, locale)
                            : undefined,
                        suffix: tProjectDetails('githubRepository.commits'),
                        skeleton: <SkeletonGeneric className="h-4 w-6" />,
                      })}
                      icon="gitBranch"
                      {...(githubData?.htmlUrl &&
                        githubData.defaultBranch && {
                          externalLink: `${githubData.htmlUrl}/commits/${githubData.defaultBranch}`,
                        })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        value:
                          githubData?.stars !== undefined
                            ? formatNumberCompact(githubData.stars, locale)
                            : undefined,
                        suffix: tProjectDetails('githubRepository.stars'),
                        skeleton: <SkeletonGeneric className="h-4 w-6" />,
                      })}
                      icon="star"
                      {...(githubData?.htmlUrl && {
                        externalLink: `${githubData.htmlUrl}/stargazers`,
                      })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        value:
                          githubData?.forks !== undefined
                            ? formatNumberCompact(githubData.forks, locale)
                            : undefined,
                        suffix: tProjectDetails('githubRepository.forks'),
                        skeleton: <SkeletonGeneric className="h-4 w-6" />,
                      })}
                      icon="gitBranch"
                      {...(githubData?.htmlUrl && {
                        externalLink: `${githubData.htmlUrl}/forks`,
                      })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />

                    <BadgeTag
                      label={AsyncRenderLabel({
                        loading: githubFetching,
                        error: githubError,
                        prefix: `${tProjectDetails(
                          'githubRepository.license',
                        )}:`,
                        value: githubData?.license?.spdx_id,
                        skeleton: <SkeletonGeneric className="h-4 w-6" />,
                      })}
                      icon="copyright"
                      {...(githubData?.license?.url && {
                        externalLink: githubData.license.url,
                      })}
                      className="py-1.75"
                      classNameIcon="text-amber-500 dark:text-amber-400"
                      classNameLabel="text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'h-[94%]',
                  'self-center',
                  'rounded-full',
                  'bg-neutral-200/70 dark:bg-neutral-800/70',
                )}
              />

              <div
                className={cn('flex flex-col gap-8', 'p-6', 'overflow-y-auto')}
              >
                <div className={cn('flex flex-col gap-3')}>
                  <Dialog.Title asChild>
                    <div className={cn('flex items-center gap-4')}>
                      {ProjectLogo && (
                        <ProjectLogo className={cn('h-8 w-auto')} />
                      )}

                      <Title
                        text={localize(project.projectName, locale)}
                        level={2}
                      />

                      <BadgeStatus
                        label={localize(
                          projectStatusLabels[project.metadata.status],
                          locale,
                        )}
                        variant={projectStatusVariants[project.metadata.status]}
                        indicatorVariant={
                          project.metadata.status === 'active'
                            ? 'success'
                            : undefined
                        }
                      />
                    </div>
                  </Dialog.Title>

                  <Dialog.Description asChild>
                    <Text
                      text={localize(project.description, locale)}
                      className="text-neutral-700 dark:text-neutral-300"
                    />
                  </Dialog.Description>
                </div>

                <div className={cn('flex flex-col gap-3')}>
                  <Title
                    text={tProjectDetails('keyFeatures').toUpperCase()}
                    type="subTitle"
                    className={cn('text-neutral-600 dark:text-neutral-400')}
                  />

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

                <div className={cn('flex flex-col gap-3')}>
                  <Title
                    text={tProjectDetails('builtWith').toUpperCase()}
                    type="subTitle"
                    className={cn('text-neutral-600 dark:text-neutral-400')}
                  />

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

                <div className={cn('flex flex-col gap-3')}>
                  <Title
                    text={tProjectDetails('links').toUpperCase()}
                    type="subTitle"
                    className={cn('text-neutral-600 dark:text-neutral-400')}
                  />

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
            <div
              className={cn(
                'flex items-center justify-between',
                'px-4 py-2',
                'border-t',
                'text-xs',
                'bg-neutral-200/70 dark:bg-neutral-950/40',
                'border-t-neutral-300/70 dark:border-t-neutral-800',
                'text-neutral-400 dark:text-neutral-600',
              )}
            >
              <div className={cn('flex items-center justify-center gap-2')}>
                <div
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'h-6',
                    'rounded-lg',
                    'px-2.5',
                    'bg-neutral-300/70 dark:bg-neutral-800/70',
                  )}
                >
                  <span className={cn('font-bold')}>ESC</span>
                </div>
                <span className={cn('font-semibold tracking-wider')}>
                  {tProjectDetails('close').toUpperCase()}
                </span>
              </div>

              <div className={cn('flex items-center justify-center gap-2')}>
                <div
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'h-6',
                    'rounded-lg',
                    'px-2.5',
                    'bg-neutral-300/70 dark:bg-neutral-800/70',
                  )}
                >
                  <uiIcons.caretLeft width={SIZE} height={SIZE} />
                  <span>/</span>
                  <uiIcons.caretRight width={SIZE} height={SIZE} />
                </div>
                <span className={cn('font-semibold tracking-wider')}>
                  {tProjectDetails('gallery').toUpperCase()}
                </span>
              </div>

              <div className={cn('flex items-center justify-center gap-2')}>
                <div
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'h-6',
                    'rounded-lg',
                    'px-2.5',
                    'bg-neutral-300/70 dark:bg-neutral-800/70',
                  )}
                >
                  <span className={cn('font-semibold')}>SHIFT</span>
                  <uiIcons.shift width={SIZE} height={SIZE} />
                </div>
                <div
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'h-6',
                    'rounded-lg',
                    'px-2.5',
                    'bg-neutral-300/70 dark:bg-neutral-800/70',
                  )}
                >
                  <uiIcons.caretLeft width={SIZE} height={SIZE} />
                  <span>/</span>
                  <uiIcons.caretRight width={SIZE} height={SIZE} />
                </div>
                <span className={cn('font-semibold tracking-wider')}>
                  {tProjectDetails('project').toUpperCase()}
                </span>
              </div>
            </div>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
