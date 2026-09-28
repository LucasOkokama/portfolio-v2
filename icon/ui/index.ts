import type { SvgIconComponent } from '@/types/icons.type';
import ArrowUpRightIcon from './akar-icons--arrow-up-right.svg';
import PinIcon from './at-icons--pin.svg';
import CheckIcon from './bi--check.svg';
import MoonIcon from './eva--moon-fill.svg';
import SunIcon from './eva--sun-fill.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';

export const uiIcons = {
  arrowUpRight: ArrowUpRightIcon,
  check: CheckIcon,
  desktopComputer: DesktopComputerIcon,
  moon: MoonIcon,
  pin: PinIcon,
  sun: SunIcon,
} satisfies Record<string, SvgIconComponent>;
