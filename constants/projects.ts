import type { BadgeStatusVariant } from '@/components/ui/BadgeStatus/BadgeStatus';
import type { ILocalizedText } from '@/schemas/zod/common.schema';
import type {
  IProjectCategory,
  IProjectScope,
  IProjectStatus,
} from '@/schemas/zod/projects.schema';

export const projectStatusLabels: Record<IProjectStatus, ILocalizedText> = {
  active: {
    pt: 'Ativo',
    en: 'Active',
  },
  completed: {
    pt: 'Concluído',
    en: 'Completed',
  },
  onHold: {
    pt: 'Parado',
    en: 'On Hold',
  },
  archived: {
    pt: 'Arquivado',
    en: 'Archived',
  },
};

export const projectStatusVariants: Record<IProjectStatus, BadgeStatusVariant> =
  {
    active: 'success',
    completed: 'information',
    onHold: 'warning',
    archived: 'neutral',
  };

export const projectScopeLabels: Record<IProjectScope, ILocalizedText> = {
  fullStack: {
    pt: 'Full-Stack',
    en: 'Full-Stack',
  },
  frontend: {
    pt: 'Frontend',
    en: 'Frontend',
  },
  backend: {
    pt: 'Backend',
    en: 'Backend',
  },
  design: {
    pt: 'Design',
    en: 'Design',
  },
  configuration: {
    pt: 'Configuração',
    en: 'Configuration',
  },
};

export const projectCategoryLabels: Record<IProjectCategory, ILocalizedText> = {
  personal: {
    pt: 'Pessoal',
    en: 'Personal',
  },
  client: {
    pt: 'Cliente',
    en: 'Client',
  },
  openSource: {
    pt: 'Código Aberto',
    en: 'Open Source',
  },
  academic: {
    pt: 'Acadêmico',
    en: 'Academic',
  },
};
