import { z } from 'zod';

import { iconNameSchema, localizedTextSchema } from './common';

const contactLinkSchema = z.object({
  icon: iconNameSchema,
  website: localizedTextSchema,
  href: z.string(),
  label: localizedTextSchema,
});

export const sectionAboutMeSchema = z.object({
  name: z.string(),

  role: localizedTextSchema,

  clock: z.object({
    city: z.string(),
    timezone: z.string(),
  }),

  contacts: z.object({
    links: z.array(contactLinkSchema),
  }),

  highlights: z.array(localizedTextSchema),

  availability: z.object({
    status: z.boolean(),
    available: localizedTextSchema,
    unavailable: localizedTextSchema,
  }),

  biography: z.object({
    title: localizedTextSchema,
    description: localizedTextSchema,
  }),
});

export type IContactLink = z.infer<typeof contactLinkSchema>;
export type ISectionAboutMe = z.infer<typeof sectionAboutMeSchema>;
