import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import ArrowRightIcon from './akar-icons--arrow-right.svg';
import ArrowUpRightIcon from './akar-icons--arrow-up-right.svg';
import ChevronLeftIcon from './akar-icons--chevron-left.svg';
import ChevronRightIcon from './akar-icons--chevron-right.svg';
import PencilIcon from './at-icons--pencil.svg';
import PinIcon from './at-icons--pin.svg';
import CaretLeftIcon from './bi--caret-left-fill.svg';
import CaretRightIcon from './bi--caret-right-fill.svg';
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
import CalendarIcon from './garden--calendar-fill-20.svg';
import ReloadIcon from './garden--reload-fill-16.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';
import FullscreenIcon from './keyline-icons--fullscreen-fill.svg';
import GitCommitIcon from './keyline-icons--git-commit-horizontal-fill.svg';
import ShiftIcon from './material-symbols--shift-rounded.svg';
import LabelIcon from './material-symbols-light--label-rounded.svg';
import CopyrightIcon from './mingcute--copyright-fill.svg';
import GitBranchIcon from './mingcute--git-branch-fill.svg';
import StarIcon from './octicon--star-fill-16.svg';

export const uiIcons = {
  [iconNames.ui.arrowRight]: ArrowRightIcon,
  [iconNames.ui.arrowUpRight]: ArrowUpRightIcon,
  [iconNames.ui.brush]: BrushIcon,
  [iconNames.ui.calendar]: CalendarIcon,
  [iconNames.ui.caretLeft]: CaretLeftIcon,
  [iconNames.ui.caretRight]: CaretRightIcon,
  [iconNames.ui.check]: CheckIcon,
  [iconNames.ui.chevronLeft]: ChevronLeftIcon,
  [iconNames.ui.chevronRight]: ChevronRightIcon,
  [iconNames.ui.close]: CloseIcon,
  [iconNames.ui.gitBranch]: GitBranchIcon,
  [iconNames.ui.gitCommit]: GitCommitIcon,
  [iconNames.ui.copyright]: CopyrightIcon,
  [iconNames.ui.desktopComputer]: DesktopComputerIcon,
  [iconNames.ui.externalLink]: ExternalLinkIcon,
  [iconNames.ui.fullscreen]: FullscreenIcon,
  [iconNames.ui.gear]: GearIcon,
  [iconNames.ui.infoSquareFilled]: InfoSquareFilledIcon,
  [iconNames.ui.label]: LabelIcon,
  [iconNames.ui.layout]: LayoutIcon,
  [iconNames.ui.moon]: MoonIcon,
  [iconNames.ui.pencil]: PencilIcon,
  [iconNames.ui.pin]: PinIcon,
  [iconNames.ui.reload]: ReloadIcon,
  [iconNames.ui.server]: ServerIcon,
  [iconNames.ui.shift]: ShiftIcon,
  [iconNames.ui.spanner]: SpannerIcon,
  [iconNames.ui.star]: StarIcon,
  [iconNames.ui.sun]: SunIcon,
} satisfies Record<string, SvgIconComponent>;
