import type { ILocalizedText } from '@/schemas/zod/common.schema';
import type {
  IExperienceType,
  IParticipationMode,
} from '@/schemas/zod/journey.schema';

export const experienceTypeTitle: Record<IExperienceType, ILocalizedText> = {
  academic: {
    en: 'Academic',
    pt: 'Acadêmico',
  },
  professional: {
    en: 'Professional',
    pt: 'Profissional',
  },
};

export const experienceParticipationModeTitle: Record<
  IExperienceType,
  ILocalizedText
> = {
  academic: {
    en: 'Academic Mode',
    pt: 'Modo Acadêmico',
  },
  professional: {
    en: 'Work Mode',
    pt: 'Modo Profissional',
  },
};

export const experienceParticipationModeLabels: Record<
  IParticipationMode,
  ILocalizedText
> = {
  presential: {
    en: 'Presential',
    pt: 'Presencial',
  },
  hybrid: {
    en: 'Hybrid',
    pt: 'Híbrido',
  },
  homeoffice: {
    en: 'Home office',
    pt: 'Home office',
  },
};

export const experienceTimelineTitle: Record<IExperienceType, ILocalizedText> =
  {
    academic: {
      en: 'Education Progression',
      pt: 'Evolução Acadêmica',
    },
    professional: {
      en: 'Career Progression',
      pt: 'Progressão de Carreira',
    },
  };
