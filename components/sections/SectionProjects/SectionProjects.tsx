'use client';

import { ProjectCard } from '@/components/features/ProjectCard/ProjectCard';
import { ProjectDetails } from '@/components/features/ProjectDetails/ProjectDetails';
import { Section } from '@/components/layouts/Section/Section';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import type { IProject } from '@/schemas/zod/projects';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  locale: ILocale;
};

export function SectionProjects({ locale }: Props) {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const selectedIndex = selectedProject
    ? projects.items.findIndex(item => item.id === selectedProject.id)
    : -1;

  const handlePrevious = useCallback(() => {
    if (selectedIndex === -1 || projects.items.length === 0) return;

    const previousIndex =
      (selectedIndex - 1 + projects.items.length) % projects.items.length;

    setSelectedProject(projects.items[previousIndex]);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === -1 || projects.items.length === 0) return;

    const nextIndex = (selectedIndex + 1) % projects.items.length;

    setSelectedProject(projects.items[nextIndex]);
  }, [selectedIndex]);

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
        title={localize(projects.sectionName, locale)}
        command=">_ find ~/projects -maxdepth 1"
      >
        <div className={cn('grid grid-cols-2 gap-5')}>
          {projects.items.map(item => (
            <ProjectCard
              key={item.id}
              locale={locale}
              project={item}
              scrollable={item.banner.scrollable}
              onDetails={() => setSelectedProject(item)}
            />
          ))}
        </div>
      </Section>

      <ProjectDetails
        locale={locale}
        projectIndex={selectedIndex}
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={open => {
          if (!open) {
            setSelectedProject(null);
          }
        }}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
