import { z } from 'zod';

import { iconNameSchema, localizedTextSchema } from './common';

const technologyItemSchema = z.object({
  label: z.string(),
  icon: iconNameSchema,
});

export const technologyGroupSchema = z.object({
  icon: iconNameSchema,
  title: localizedTextSchema,
  description: localizedTextSchema,
  techs: z.array(technologyItemSchema),
});

export const sectionTechnologySchema = z.object({
  sectionName: localizedTextSchema,
  technologyGroups: z.array(technologyGroupSchema),
});

export type ITechnology = z.infer<typeof technologyItemSchema>;
export type ITechnologyGroup = z.infer<typeof technologyGroupSchema>;
export type ISectionTechnology = z.infer<typeof sectionTechnologySchema>;
