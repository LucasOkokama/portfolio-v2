type IconRegistry = Record<string, unknown>;

type DuplicateKeys<A extends IconRegistry, B extends IconRegistry> = Extract<
  keyof A,
  keyof B
>;

type AssertNoDuplicateKeys<A extends IconRegistry, B extends IconRegistry> =
  DuplicateKeys<A, B> extends never
    ? unknown
    : {
        ERROR: 'Duplicate icon name';
        DUPLICATE: DuplicateKeys<A, B>;
      };

type MergeRegistries<
  Registries extends readonly IconRegistry[],
  Result extends IconRegistry = Record<never, never>,
> = Registries extends readonly [
  infer First extends IconRegistry,
  ...infer Rest extends IconRegistry[],
]
  ? MergeRegistries<Rest, Result & First & AssertNoDuplicateKeys<Result, First>>
  : Result;

export function createIcons<const Registries extends readonly IconRegistry[]>(
  ...registries: Registries
): MergeRegistries<Registries> {
  return Object.assign({}, ...registries);
}
