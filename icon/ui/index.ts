import type { SvgIconComponent } from '@/types/icons.type';
import ArrowUpRight from './akar-icons--arrow-up-right.svg';
import CheckIcon from './bi--check.svg';
import MoonIcon from './eva--moon-fill.svg';
import SunIcon from './eva--sun-fill.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';

export const uiIcons = {
  arrowUpRight: ArrowUpRight,
  check: CheckIcon,
  desktopComputer: DesktopComputerIcon,
  moon: MoonIcon,
  sun: SunIcon,
} satisfies Record<string, SvgIconComponent>;
