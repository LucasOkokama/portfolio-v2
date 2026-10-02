import type { SvgIconComponent } from '@/types/icons.type';
import FigmaIcon from './figma.svg';
import GitHubIcon from './github.svg';
import GmailIcon from './gmail.svg';
import GrainIcon from './grain.svg';
import LinkedInIcon from './linkedin.svg';
import VercelIcon from './vercel.svg';

export const logosIcons = {
  figma: FigmaIcon,
  github: GitHubIcon,
  gmail: GmailIcon,
  grain: GrainIcon,
  linkedin: LinkedInIcon,
  vercel: VercelIcon,
} satisfies Record<string, SvgIconComponent>;
