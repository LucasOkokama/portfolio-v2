import aboutMeData from '@/contents/aboutMe.json';
import technologiesData from '@/contents/technologies.json';
import { sectionAboutMeSchema } from '@/schemas/zod/aboutme';
import { sectionTechnologySchema } from '@/schemas/zod/technologies';
import { ZodError } from 'zod';

const schemas = [
  {
    name: 'aboutMe.json',
    schema: sectionAboutMeSchema,
    data: aboutMeData,
  },
  {
    name: 'technologies.json',
    schema: sectionTechnologySchema,
    data: technologiesData,
  },
];

let hasErrors = false;

function printError(name: string, error: ZodError) {
  console.error(`\n\x1b[31m$ ${name} is invalid\x1b[0m`);

  for (const issue of error.issues) {
    const path = issue.path.length > 0 ? issue.path.join('.') : '<root>';
    console.error(`\x1b[31m✗ ${path}\x1b[0m`);
    console.error(`  ${issue.message}`);
  }

  console.error('─'.repeat(80));
}

for (const { name, schema, data } of schemas) {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      hasErrors = true;
      printError(name, error);
      continue;
    }
    throw error;
  }
}

if (hasErrors) {
  console.error('\n\x1b[31mSchema validation failed.\x1b[0m');
  process.exitCode = 1;
}
