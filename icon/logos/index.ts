import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import FigmaIcon from './figma.svg';
import GitHubIcon from './github.svg';
import GmailIcon from './gmail.svg';
import GrainIcon from './grain.svg';
import LinkedInIcon from './linkedin.svg';
import PexelsIcon from './pexels.svg';
import VercelIcon from './vercel.svg';
import GeminiIcon from './gemini.svg';
import ClaudeCodeIcon from './claudecode.svg';

export const logosIcons = {
  [iconNames.logos.claudeCode]: ClaudeCodeIcon,
  [iconNames.logos.figma]: FigmaIcon,
  [iconNames.logos.gemini]: GeminiIcon,
  [iconNames.logos.github]: GitHubIcon,
  [iconNames.logos.gmail]: GmailIcon,
  [iconNames.logos.grain]: GrainIcon,
  [iconNames.logos.linkedin]: LinkedInIcon,
  [iconNames.logos.pexels]: PexelsIcon,
  [iconNames.logos.vercel]: VercelIcon,
} satisfies Record<string, SvgIconComponent>;
