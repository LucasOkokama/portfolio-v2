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

export function createIcons<
  const A extends IconRegistry,
  const B extends IconRegistry,
  const C extends IconRegistry,
>(
  a: A,
  b: B & AssertNoDuplicateKeys<A, B>,
  c: C & AssertNoDuplicateKeys<A, C> & AssertNoDuplicateKeys<B, C>,
): A & B & C {
  return Object.assign({}, a, b, c);
}
