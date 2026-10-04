import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import Logo from './logo.svg';

export const brandIcons = {
  [iconNames.brand.logo]: Logo,
} satisfies Record<string, SvgIconComponent>;
