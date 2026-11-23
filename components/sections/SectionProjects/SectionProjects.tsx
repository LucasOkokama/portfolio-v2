'use client';

import { ProjectCard } from '@/components/features/ProjectCard/ProjectCard';
import { ProjectDetails } from '@/components/features/ProjectDetails/ProjectDetails';
import { Section } from '@/components/layouts/Section/Section';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  locale: ILocale;
};

export function SectionProjects({ locale }: Props) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);

  const projectsList = projects.projects;

  const selectedProject =
    selectedProjectIndex !== null
      ? (projectsList[selectedProjectIndex] ?? null)
      : null;

  const handlePrevious = useCallback(() => {
    if (selectedProjectIndex === null || projectsList.length === 0) return;

    setSelectedProjectIndex(prev => {
      if (prev === null) return null;

      return (prev - 1 + projectsList.length) % projectsList.length;
    });
  }, [selectedProjectIndex, projectsList.length]);

  const handleNext = useCallback(() => {
    if (selectedProjectIndex === null || projectsList.length === 0) return;

    setSelectedProjectIndex(prev => {
      if (prev === null) return null;

      return (prev + 1) % projectsList.length;
    });
  }, [selectedProjectIndex, projectsList.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrevious, handleNext]);

  return (
    <div>
      <Section
        title={localize(projects.section.title, locale)}
        command={projects.section.command}
      >
        <div className={cn('grid grid-cols-2 gap-6')}>
          {projectsList.map((item, index) => (
            <ProjectCard
              key={item.id}
              locale={locale}
              project={item}
              scrollable={item.banner.scrollable}
              onDetails={() => setSelectedProjectIndex(index)}
            />
          ))}
        </div>
      </Section>

      <ProjectDetails
        locale={locale}
        projectIndex={selectedProjectIndex ?? -1}
        project={selectedProject}
        open={selectedProjectIndex !== null}
        isNavigationDisabled={projectsList.length <= 1}
        onOpenChange={open => {
          if (!open) {
            setSelectedProjectIndex(null);
          }
        }}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
