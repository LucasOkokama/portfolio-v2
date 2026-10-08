import { createTwoFilesPatch } from 'diff';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { generateSchema, schemas } from './schemas-generator';

const schemasDirectory = path.resolve('schemas/json');

let hasChanges = false;

function printDiff(fileName: string, current: string, generated: string) {
  const diff = createTwoFilesPatch(
    `schemas/json/${fileName}`,
    `schemas/json/${fileName}`,
    current,
    generated,
    '',
    '',
    {
      context: 3,
    },
  );

  const lines = diff.split('\n');

  for (const line of lines) {
    if (
      line.startsWith('+++') ||
      line.startsWith('---') ||
      line.startsWith('@@')
    ) {
      process.stderr.write(`\x1b[36m${line}\x1b[0m\n`);
      continue;
    }

    if (line.startsWith('+')) {
      process.stderr.write(`\x1b[32m${line}\x1b[0m\n`);
      continue;
    }

    if (line.startsWith('-')) {
      process.stderr.write(`\x1b[31m${line}\x1b[0m\n`);
      continue;
    }

    process.stderr.write(`\x1b[90m${line}\x1b[0m\n`);
  }
}

for (const { zodSchema, jsonSchemaFilename } of schemas) {
  const generated = await generateSchema(zodSchema);

  const current = await readFile(
    path.join(schemasDirectory, jsonSchemaFilename),
    'utf8',
  );

  if (generated !== current) {
    hasChanges = true;

    console.error(`\nSchema is out of date: ${jsonSchemaFilename}`);

    printDiff(jsonSchemaFilename, current, generated);

    console.error('─'.repeat(80));
  }
}

if (hasChanges) {
  console.error('Generated schemas differ from the files in schemas/json.');
  console.error('Run `npm run schemas:file` to update the schemas.');

  process.exitCode = 1;
}
