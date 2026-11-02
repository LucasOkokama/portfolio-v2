import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const REQUIRED_ENV_VARS = ['API_ENABLED', 'NEXT_PUBLIC_API_ENABLED'] as const;

const invalidVariables = REQUIRED_ENV_VARS.filter(
  variable => process.env[variable] !== 'true',
);

if (invalidVariables.length > 0) {
  console.error('\n\x1b[31m$ API Flags configuration is invalid\x1b[0m');

  for (const variable of invalidVariables) {
    const currentValue = process.env[variable] ?? '<undefined>';

    console.error(`\x1b[31m✗ ${variable}\x1b[0m`);
    console.error('  Expected: "true"');
    console.error(`  Received: "${currentValue}"`);
  }

  console.error('─'.repeat(80));

  process.exitCode = 1;
}
