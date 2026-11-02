import { iconNames, type IconName } from '@/icon/icons-names';
import { z } from 'zod';

export const localizedTextSchema = z.object({
  pt: z.string(),
  en: z.string(),
});

const allIconNames = Object.values(iconNames).flatMap(Object.values) as [
  IconName,
  ...IconName[],
];

export const iconNameSchema = z.enum(allIconNames);

export type ILocalizedText = z.infer<typeof localizedTextSchema>;
export type IIconName = z.infer<typeof iconNameSchema>;
