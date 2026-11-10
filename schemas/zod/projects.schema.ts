import { z } from 'zod';

import { iconNameSchema, localizedTextSchema } from './common.schema';

export const projectStatusSchema = z.enum([
  'active',
  'completed',
  'onHold',
  'archived',
]);

export const projectScopeSchema = z.enum([
  'fullStack',
  'frontend',
  'backend',
  'design',
  'configuration',
]);

export const projectCategorySchema = z.enum([
  'personal',
  'client',
  'openSource',
  'academic',
]);

const projectTechnologySchema = z.object({
  label: z.string().min(1),
  icon: iconNameSchema,
});

const projectLinksSchema = z.object({
  repository: z.url().nullable(),
  design: z.url().nullable(),
  live: z.url().nullable(),
});

const projectBannerSchema = z.discriminatedUnion('available', [
  z.object({
    available: z.literal(true),
    scrollable: z.boolean(),
    default: z.string(),
    light: z.string().nullable(),
    dark: z.string().nullable(),
  }),

  z.object({
    available: z.literal(false),
    scrollable: z.boolean(),
    default: z.null(),
    light: z.null(),
    dark: z.null(),
  }),
]);

const projectScreenshotSchema = z.object({
  name: localizedTextSchema,
  path: z.string().min(1),
});

export const projectMetadataSchema = z.object({
  status: projectStatusSchema,
  scope: projectScopeSchema,
  category: projectCategorySchema,
});

export const projectSchema = z.object({
  id: z.string().min(1),
  projectName: z.string().min(1),
  name: localizedTextSchema,
  logo: iconNameSchema.nullable(),
  summary: localizedTextSchema,
  description: localizedTextSchema,
  keyFeatures: z.array(localizedTextSchema).min(1).max(5),
  technologies: z.array(projectTechnologySchema),
  links: projectLinksSchema,
  banner: projectBannerSchema,
  screenshots: z.array(projectScreenshotSchema),
  metadata: projectMetadataSchema,
});

export const sectionProjectsSchema = z.object({
  sectionName: localizedTextSchema,
  items: z.array(projectSchema).min(1),
});

export type IProjectStatus = z.infer<typeof projectStatusSchema>;
export type IProjectScope = z.infer<typeof projectScopeSchema>;
export type IProjectCategory = z.infer<typeof projectCategorySchema>;
export type IProjectTechnology = z.infer<typeof projectTechnologySchema>;
export type IProjectLinks = z.infer<typeof projectLinksSchema>;
export type IProjectScreenshot = z.infer<typeof projectScreenshotSchema>;
export type IProjectMetadata = z.infer<typeof projectMetadataSchema>;
export type IProject = z.infer<typeof projectSchema>;
export type ISectionProjects = z.infer<typeof sectionProjectsSchema>;
