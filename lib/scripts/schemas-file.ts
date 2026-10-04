import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { generateSchema, schemas } from './schemas-generator';

const outputDirectory = path.resolve('schemas/json');

for (const { schema, fileName } of schemas) {
  const content = await generateSchema(schema);

  await writeFile(path.join(outputDirectory, fileName), content);
}
