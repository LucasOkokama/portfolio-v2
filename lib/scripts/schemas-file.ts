import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { generateSchema, schemas } from './schemas-generator';

const outputDirectory = path.resolve('schemas/json');

for (const { zodSchema, jsonSchemaFilename } of schemas) {
  const content = await generateSchema(zodSchema);

  await writeFile(path.join(outputDirectory, jsonSchemaFilename), content);
}
