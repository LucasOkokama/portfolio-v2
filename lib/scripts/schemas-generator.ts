import aboutMeData from '@/contents/aboutMe.json';
import journeyAcademicData from '@/contents/journeyAcademic.json';
import journeyProfessionalData from '@/contents/journeyProfessional.json';
import projectsData from '@/contents/projects.json';
import technologiesData from '@/contents/technologies.json';
import { sectionAboutMeSchema } from '@/schemas/zod/aboutme.schema';
import { sectionJourneySchema } from '@/schemas/zod/journey.schema';
import { sectionProjectsSchema } from '@/schemas/zod/projects.schema';
import { sectionTechnologySchema } from '@/schemas/zod/technologies.schema';
import prettier from 'prettier';
import { z } from 'zod';

export const schemas = [
  {
    zodSchema: sectionAboutMeSchema,
    jsonSchemaFilename: 'aboutMe.schema.json',
    jsonContent: [
      {
        filename: 'aboutMe.json',
        data: aboutMeData,
      },
    ],
  },
  {
    zodSchema: sectionTechnologySchema,
    jsonSchemaFilename: 'technologies.schema.json',
    jsonContent: [
      {
        filename: 'technologies.json',
        data: technologiesData,
      },
    ],
  },
  {
    zodSchema: sectionProjectsSchema,
    jsonSchemaFilename: 'projects.schema.json',
    jsonContent: [
      {
        filename: 'projects.json',
        data: projectsData,
      },
    ],
  },
  {
    zodSchema: sectionJourneySchema,
    jsonSchemaFilename: 'journey.schema.json',
    jsonContent: [
      {
        filename: 'journeyAcademic.json',
        data: journeyAcademicData,
      },
      {
        filename: 'journeyProfessional.json',
        data: journeyProfessionalData,
      },
    ],
  },
] as const;

export async function generateSchema(schema: z.ZodType): Promise<string> {
  const jsonSchema = z.toJSONSchema(schema, {
    target: 'draft-2020-12',
  });

  const documentSchema = {
    ...jsonSchema,
    properties: {
      $schema: {
        type: 'string',
        description: 'Reference to the JSON Schema used to validate this file.',
      },
      ...jsonSchema.properties,
    },
  };

  const json = JSON.stringify(documentSchema);

  return prettier.format(json, {
    parser: 'json',
  });
}
