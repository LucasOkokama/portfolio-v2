declare module '*.svg' {
  import type { SvgIconComponent } from '@/types/icons.type';
  const component: SvgIconComponent;
  export default component;
}
