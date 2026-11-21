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
  brand: ['fourPointedStar', 'logo'],
  logos: [
    'claudeCode',
    'figma',
    'gemini',
    'github',
    'gmail',
    'grain',
    'linkedin',
    'pexels',
    'vercel',
  ],
  projects: ['earthwise', 'korosenku', 'lojaVinho', 'startdoor', 'wemage'],
  techs: [
    'angular',
    'bootstrap',
    'c',
    'chartJS',
    'css',
    'docker',
    'eclipse',
    'express',
    'flask',
    'fuseJS',
    'git',
    'html5',
    'intellijIdea',
    'java',
    'javaScript',
    'jUnit',
    'matplotlib',
    'mobX',
    'mySQL',
    'nextJS',
    'nodeJS',
    'pandas',
    'php',
    'playwright',
    'plotly',
    'postgreSQL',
    'postman',
    'python',
    'react',
    'springBoot',
    'styledComponents',
    'swagger',
    'tailwindCSS',
    'typeScript',
    'vite',
    'visualStudioCode',
    'zod',
  ],
  ui: [
    'award',
    'arrowRight',
    'arrowUpRight',
    'book',
    'brain',
    'brush',
    'calendar',
    'caretLeft',
    'caretRight',
    'check',
    'chevronLeft',
    'chevronRight',
    'close',
    'copyright',
    'desktopComputer',
    'externalLink',
    'fullscreen',
    'gear',
    'gitBranch',
    'graduationCap',
    'hash',
    'imageNotFound',
    'infoSquareFilled',
    'label',
    'layout',
    'moon',
    'pencil',
    'pin',
    'reload',
    'scroll',
    'server',
    'shift',
    'spanner',
    'star',
    'suitcase',
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
