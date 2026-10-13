import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import FourPointedStarIcon from './four-pointed-star.svg';
import Logo from './logo.svg';

export const brandIcons = {
  [iconNames.brand.fourPointedStar]: FourPointedStarIcon,
  [iconNames.brand.logo]: Logo,
} satisfies Record<string, SvgIconComponent>;
