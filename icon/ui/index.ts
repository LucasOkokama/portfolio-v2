import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import ArrowUpRightIcon from './akar-icons--arrow-up-right.svg';
import PinIcon from './at-icons--pin.svg';
import CheckIcon from './bi--check.svg';
import LayoutIcon from './boxicons--layout-filled.svg';
import ServerIcon from './boxicons--server-filled.svg';
import SpannerIcon from './boxicons--spanner-filled.svg';
import MoonIcon from './eva--moon-fill.svg';
import SunIcon from './eva--sun-fill.svg';
import GearIcon from './fa6-solid--gear.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';

export const uiIcons = {
  [iconNames.ui.arrowUpRight]: ArrowUpRightIcon,
  [iconNames.ui.check]: CheckIcon,
  [iconNames.ui.desktopComputer]: DesktopComputerIcon,
  [iconNames.ui.gear]: GearIcon,
  [iconNames.ui.layout]: LayoutIcon,
  [iconNames.ui.moon]: MoonIcon,
  [iconNames.ui.pin]: PinIcon,
  [iconNames.ui.server]: ServerIcon,
  [iconNames.ui.spanner]: SpannerIcon,
  [iconNames.ui.sun]: SunIcon,
} satisfies Record<string, SvgIconComponent>;
