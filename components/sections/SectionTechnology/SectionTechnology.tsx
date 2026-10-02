import { TechnologiesGrid } from '@/components/features/TechnologiesGrid/TechnologiesGrid';
import { Section } from '@/components/layouts/Section/Section';
import type { ILocale } from '@/i18n/routing';
import { technologies } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';

type Props = {
  locale: ILocale;
};

export function SectionTechnology({ locale }: Props) {
  return (
    <div>
      <Section
        title={localize(technologies.sectionName, locale)}
        command="$ stack inspect --runtime"
      >
        <TechnologiesGrid
          technologies={technologies.technologyGroups}
          locale={locale}
        />
      </Section>
    </div>
  );
}
