import type { icons } from '@/icon';
import type { ComponentType, SVGProps } from 'react';

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export type IIconName = keyof typeof icons;
