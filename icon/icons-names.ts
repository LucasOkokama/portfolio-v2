type DuplicateItems<
  Items extends readonly string[],
  Seen extends string = never,
> = Items extends readonly [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? First extends Seen
    ? First
    : DuplicateItems<Rest, Seen | First>
  : never;

type DuplicateNames<Groups extends Record<string, readonly string[]>> = {
  [K in keyof Groups]:
    | DuplicateItems<Groups[K]>
    | {
        [Other in Exclude<keyof Groups, K>]: Extract<
          Groups[K][number],
          Groups[Other][number]
        >;
      }[Exclude<keyof Groups, K>];
}[keyof Groups];

const defineIconNames = <const Names extends readonly string[]>(
  names: Names,
): { [Name in Names[number]]: Name } => {
  return Object.fromEntries(names.map(name => [name, name])) as {
    [Name in Names[number]]: Name;
  };
};

const defineIconGroups = <
  const Groups extends Record<string, readonly string[]>,
>(
  groups: Groups &
    (DuplicateNames<Groups> extends never
      ? unknown
      : {
          ERROR_DUPLICATE_ICON_NAME: DuplicateNames<Groups>;
        }),
): {
  [K in keyof Groups]: {
    [Name in Groups[K][number]]: Name;
  };
} => {
  return Object.fromEntries(
    Object.entries(groups).map(([group, names]) => [
      group,
      defineIconNames(names),
    ]),
  ) as {
    [K in keyof Groups]: {
      [Name in Groups[K][number]]: Name;
    };
  };
};

export const iconNames = defineIconGroups({
  brand: ['logo'],
  logos: ['figma', 'github', 'gmail', 'grain', 'linkedin', 'vercel'],
  techs: [
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
  ],
  ui: [
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
  ],
} as const);

type Values<T> = T extends object
  ? T[keyof T] extends infer V
    ? V extends object
      ? Values<V>
      : V
    : never
  : never;

export type IconName = Values<typeof iconNames>;
