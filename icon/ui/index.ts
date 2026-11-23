import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import ArrowRightIcon from './akar-icons--arrow-right.svg';
import ArrowUpRightIcon from './akar-icons--arrow-up-right.svg';
import ChevronLeftIcon from './akar-icons--chevron-left.svg';
import ChevronRightIcon from './akar-icons--chevron-right.svg';
import AlignLeftIcon from './akar-icons--text-align-left.svg';
import BookIcon from './at-icons--book.svg';
import PencilIcon from './at-icons--pencil.svg';
import PinIcon from './at-icons--pin.svg';
import StackIcon from './basil--stack-solid.svg';
import CaretLeftIcon from './bi--caret-left-fill.svg';
import CaretRightIcon from './bi--caret-right-fill.svg';
import CheckIcon from './bi--check.svg';
import InfoSquareFilledIcon from './bi--info-square-fill.svg';
import BrushIcon from './boxicons--brush-filled.svg';
import LayoutIcon from './boxicons--layout-filled.svg';
import ServerIcon from './boxicons--server-filled.svg';
import SpannerIcon from './boxicons--spanner-filled.svg';
import ImageNotFoundIcon from './carbon--no-image.svg';
import CloseIcon from './ci--close-md.svg';
import ExternalLinkIcon from './ci--external-link.svg';
import BrainIcon from './coolicons--brain-fill-round.svg';
import ClockIcon from './coolicons--clock-4-fill.svg';
import GlobeIcon from './coolicons--globe-fill.svg';
import GraduationCapIcon from './coolicons--graduation-cap-fill.svg';
import HashIcon from './coolicons--hash-bulk-round.svg';
import ScrollIcon from './coolicons--scroll-text-fill.svg';
import UserIcon from './coolicons--user-alt-fill.svg';
import MoonIcon from './eva--moon-fill.svg';
import SunIcon from './eva--sun-fill.svg';
import GearIcon from './fa6-solid--gear.svg';
import CalendarIcon from './garden--calendar-fill-20.svg';
import ReloadIcon from './garden--reload-fill-16.svg';
import DesktopComputerIcon from './heroicons-solid--desktop-computer.svg';
import FullscreenIcon from './keyline-icons--fullscreen-fill.svg';
import SuitcaseIcon from './majesticons--suitcase.svg';
import ShiftIcon from './material-symbols--shift-rounded.svg';
import LabelIcon from './material-symbols-light--label-rounded.svg';
import CopyrightIcon from './mingcute--copyright-fill.svg';
import GitBranchIcon from './mingcute--git-branch-fill.svg';
import StarIcon from './octicon--star-fill-16.svg';
import AwardIcon from './tabler--award-filled.svg';

export const uiIcons = {
  [iconNames.ui.alignLeft]: AlignLeftIcon,
  [iconNames.ui.award]: AwardIcon,
  [iconNames.ui.arrowRight]: ArrowRightIcon,
  [iconNames.ui.arrowUpRight]: ArrowUpRightIcon,
  [iconNames.ui.book]: BookIcon,
  [iconNames.ui.brain]: BrainIcon,
  [iconNames.ui.brush]: BrushIcon,
  [iconNames.ui.calendar]: CalendarIcon,
  [iconNames.ui.caretLeft]: CaretLeftIcon,
  [iconNames.ui.caretRight]: CaretRightIcon,
  [iconNames.ui.check]: CheckIcon,
  [iconNames.ui.chevronLeft]: ChevronLeftIcon,
  [iconNames.ui.chevronRight]: ChevronRightIcon,
  [iconNames.ui.clock]: ClockIcon,
  [iconNames.ui.close]: CloseIcon,
  [iconNames.ui.copyright]: CopyrightIcon,
  [iconNames.ui.desktopComputer]: DesktopComputerIcon,
  [iconNames.ui.externalLink]: ExternalLinkIcon,
  [iconNames.ui.fullscreen]: FullscreenIcon,
  [iconNames.ui.gear]: GearIcon,
  [iconNames.ui.gitBranch]: GitBranchIcon,
  [iconNames.ui.globe]: GlobeIcon,
  [iconNames.ui.graduationCap]: GraduationCapIcon,
  [iconNames.ui.hash]: HashIcon,
  [iconNames.ui.imageNotFound]: ImageNotFoundIcon,
  [iconNames.ui.infoSquareFilled]: InfoSquareFilledIcon,
  [iconNames.ui.label]: LabelIcon,
  [iconNames.ui.layout]: LayoutIcon,
  [iconNames.ui.moon]: MoonIcon,
  [iconNames.ui.pencil]: PencilIcon,
  [iconNames.ui.pin]: PinIcon,
  [iconNames.ui.reload]: ReloadIcon,
  [iconNames.ui.scroll]: ScrollIcon,
  [iconNames.ui.server]: ServerIcon,
  [iconNames.ui.shift]: ShiftIcon,
  [iconNames.ui.spanner]: SpannerIcon,
  [iconNames.ui.stack]: StackIcon,
  [iconNames.ui.star]: StarIcon,
  [iconNames.ui.suitcase]: SuitcaseIcon,
  [iconNames.ui.sun]: SunIcon,
  [iconNames.ui.user]: UserIcon,
} satisfies Record<string, SvgIconComponent>;
