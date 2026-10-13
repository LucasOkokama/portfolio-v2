import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import ArrowRightIcon from './akar-icons--arrow-right.svg';
import ArrowUpRightIcon from './akar-icons--arrow-up-right.svg';
import ChevronLeftIcon from './akar-icons--chevron-left.svg';
import ChevronRightIcon from './akar-icons--chevron-right.svg';
import PinIcon from './at-icons--pin.svg';
import CheckIcon from './bi--check.svg';
import InfoSquareFilledIcon from './bi--info-square-fill.svg';
import BrushIcon from './boxicons--brush-filled.svg';
import LayoutIcon from './boxicons--layout-filled.svg';
import ServerIcon from './boxicons--server-filled.svg';
import SpannerIcon from './boxicons--spanner-filled.svg';
import CloseIcon from './ci--close-md.svg';
import ExternalLinkIcon from './ci--external-link.svg';
import MoonIcon from './eva--moon-fill.svg';
import SunIcon from './eva--sun-fill.svg';
import GearIcon from './fa6-solid--gear.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';
import FullscreenIcon from './keyline-icons--fullscreen-fill.svg';

export const uiIcons = {
  [iconNames.ui.arrowRight]: ArrowRightIcon,
  [iconNames.ui.arrowUpRight]: ArrowUpRightIcon,
  [iconNames.ui.brush]: BrushIcon,
  [iconNames.ui.check]: CheckIcon,
  [iconNames.ui.chevronLeft]: ChevronLeftIcon,
  [iconNames.ui.chevronRight]: ChevronRightIcon,
  [iconNames.ui.close]: CloseIcon,
  [iconNames.ui.desktopComputer]: DesktopComputerIcon,
  [iconNames.ui.externalLink]: ExternalLinkIcon,
  [iconNames.ui.fullscreen]: FullscreenIcon,
  [iconNames.ui.gear]: GearIcon,
  [iconNames.ui.infoSquareFilled]: InfoSquareFilledIcon,
  [iconNames.ui.layout]: LayoutIcon,
  [iconNames.ui.moon]: MoonIcon,
  [iconNames.ui.pin]: PinIcon,
  [iconNames.ui.server]: ServerIcon,
  [iconNames.ui.spanner]: SpannerIcon,
  [iconNames.ui.sun]: SunIcon,
} satisfies Record<string, SvgIconComponent>;
