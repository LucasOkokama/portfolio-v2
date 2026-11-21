import { z } from 'zod';
import { iconNameSchema, localizedTextSchema } from './common.schema';

export const experienceTypeSchema = z.enum(['academic', 'professional']);

export const participationModeSchema = z.enum([
  'presential',
  'hybrid',
  'homeoffice',
]);

const experienceTechnologySchema = z.object({
  label: z.string().min(1),
  icon: iconNameSchema,
});

const experienceAdditionalInformationsItemSchema = z.object({
  title: localizedTextSchema,
  value: z.string(),
});

const experienceTimelineItemSchema = z.object({
  title: localizedTextSchema,
  icon: iconNameSchema,
  startDate: z.string().min(1),
  endDate: z.string().min(1).nullable(),
  keyActivities: z.array(localizedTextSchema).min(1).max(5),
});

const experienceSchema = z.object({
  organization: z.string().min(1),
  logo: z.string().nullable(),
  overview: localizedTextSchema,
  description: localizedTextSchema,
  technologies: z.array(experienceTechnologySchema).min(1),
  location: z.string().min(1),
  participationMode: participationModeSchema,
  linkedIn: z.url().nullable(),
  website: z.url().nullable(),
  additionalInformations: z.array(experienceAdditionalInformationsItemSchema),
  experienceTimeline: z.array(experienceTimelineItemSchema).min(1),
});

export const sectionJourneySchema = z.object({
  experienceType: experienceTypeSchema,
  experiences: z.array(experienceSchema).min(1),
});

export type IExperienceType = z.infer<typeof experienceTypeSchema>;
export type IParticipationMode = z.infer<typeof participationModeSchema>;
export type IExperienceTechnology = z.infer<typeof experienceTechnologySchema>;
export type IExperienceTimelineItem = z.infer<
  typeof experienceTimelineItemSchema
>;
export type IExperience = z.infer<typeof experienceSchema>;
export type ISectionJourney = z.infer<typeof sectionJourneySchema>;
