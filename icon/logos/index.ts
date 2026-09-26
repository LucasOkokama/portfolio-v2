import type { SvgIconComponent } from '@/types/icons.type';
import GitHub from './github.svg';
import Gmail from './gmail.svg';
import Grain from './grain.svg';
import LinkedIn from './linkedin.svg';

export const logosIcons = {
  github: GitHub,
  gmail: Gmail,
  grain: Grain,
  linkedin: LinkedIn,
} satisfies Record<string, SvgIconComponent>;
