type IconRegistry = Record<string, unknown>;

type DuplicateKeys<A extends IconRegistry, B extends IconRegistry> = Extract<
  keyof A,
  keyof B
>;

type DuplicateError<K> = {
  ERROR: 'Duplicate icon name';
  DUPLICATE: K;
};

type ValidateRegistries<
  Registries extends readonly IconRegistry[],
  Result extends IconRegistry = Record<never, never>,
> = Registries extends readonly [
  infer First extends IconRegistry,
  ...infer Rest extends IconRegistry[],
]
  ? DuplicateKeys<Result, First> extends never
    ? ValidateRegistries<Rest, Result & First>
    : DuplicateError<DuplicateKeys<Result, First>>
  : true;

type MergeRegistries<
  Registries extends readonly IconRegistry[],
  Result extends IconRegistry = Record<never, never>,
> = Registries extends readonly [
  infer First extends IconRegistry,
  ...infer Rest extends IconRegistry[],
]
  ? MergeRegistries<Rest, Result & First>
  : Result;

export function createIcons<const Registries extends readonly IconRegistry[]>(
  ...registries: Registries &
    (ValidateRegistries<Registries> extends true
      ? unknown
      : ValidateRegistries<Registries>)
): MergeRegistries<Registries> {
  return Object.assign({}, ...registries) as MergeRegistries<Registries>;
}
