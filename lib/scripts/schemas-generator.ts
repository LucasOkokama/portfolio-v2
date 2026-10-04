import { sectionAboutMeSchema } from '@/schemas/zod/aboutme';
import { sectionTechnologySchema } from '@/schemas/zod/technologies';
import prettier from 'prettier';
import { z } from 'zod';

export const schemas = [
  {
    schema: sectionAboutMeSchema,
    fileName: 'aboutMe.schema.json',
  },
  {
    schema: sectionTechnologySchema,
    fileName: 'technologies.schema.json',
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
