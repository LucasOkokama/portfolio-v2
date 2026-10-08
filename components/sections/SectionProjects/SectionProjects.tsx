import { ProjectCard } from '@/components/features/ProjectCard/ProjectCard';
import { Section } from '@/components/layouts/Section/Section';
import type { ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';

type Props = {
  locale: ILocale;
};

export function SectionProjects({ locale }: Props) {
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
            />
          ))}

          {Array(4)
            .fill(projects.items[0])
            .map((item, index) => (
              <ProjectCard
                key={`${item.id}-${index}`}
                locale={locale}
                project={item}
                scrollable={item.banner.scrollable}
              />
            ))}
        </div>
      </Section>
    </div>
  );
}
