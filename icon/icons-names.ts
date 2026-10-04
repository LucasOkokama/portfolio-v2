const defineIconNames = <const Names extends readonly string[]>(
  names: Names,
): { [Name in Names[number]]: Name } => {
  return Object.fromEntries(names.map(name => [name, name])) as {
    [Name in Names[number]]: Name;
  };
};

export const iconNames = {
  brand: defineIconNames(['logo']),

  logos: defineIconNames([
    'figma',
    'github',
    'gmail',
    'grain',
    'linkedin',
    'vercel',
  ]),

  techs: defineIconNames([
    'css',
    'docker',
    'eclipse',
    'express',
    'git',
    'html5',
    'intellijIdea',
    'java',
    'javascript',
    'mysql',
    'nextJS',
    'nodeJS',
    'pandas',
    'plotly',
    'postgresql',
    'postman',
    'python',
    'react',
    'springBoot',
    'tailwindCSS',
    'typescript',
    'visualStudioCode',
  ]),

  ui: defineIconNames([
    'arrowUpRight',
    'check',
    'desktopComputer',
    'gear',
    'layout',
    'moon',
    'pin',
    'server',
    'spanner',
    'sun',
  ]),
} as const;

type Values<T> = T extends object
  ? T[keyof T] extends infer V
    ? V extends object
      ? Values<V>
      : V
    : never
  : never;

export type IconName = Values<typeof iconNames>;
