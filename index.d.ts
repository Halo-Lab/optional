export type None = null | undefined;
export type Some<T> = NonNullable<T>;
export type Optional<T> = T | None;

export const None: None;

export function of(): None;
export function of<T>(value: Some<T>): Some<T>;
export function of<T>(value: Optional<T>): Optional<T>;

export function isNone(value: None): true;
export function isNone<A>(value: Some<A>): false;
export function isNone(value: unknown): value is None;

export function isSome(value: None): false;
export function isSome<A>(value: Some<A>): true;
export function isSome<A>(value: A): value is Some<A>;

export function map<A, B>(
  callback: (value: Some<A>) => Optional<B>,
): (value: Optional<A>) => Optional<B>;
export function map<A, B>(
  value: Optional<A>,
  callback: (value: Some<A>) => Optional<B>,
): Optional<B>;

export function or<A>(fallback: Some<A>): (optional: Optional<A>) => A;
export function or<A>(
  fallback: Optional<A>,
): (optional: Optional<A>) => Optional<A>;
export function or<A>(optional: Optional<A>, fallback: Some<A>): A;
export function or<A>(
  optional: Optional<A>,
  fallback: Optional<A>,
): Optional<A>;

export function orElse<A>(
  fallback: () => Some<A>,
): (optional: Optional<A>) => A;
export function orElse<A>(
  fallback: () => Optional<A>,
): (optional: Optional<A>) => Optional<A>;
export function orElse<A>(optional: Optional<A>, fallback: () => Some<A>): A;
export function orElse<A>(
  optional: Optional<A>,
  fallback: () => Optional<A>,
): Optional<A>;

export function apply<A, B>(
  optionalCallback: Optional<(value: Some<A>) => B>,
): (optional: Optional<A>) => Optional<B>;
export function apply<A, B>(
  optional: Optional<A>,
  optionalCallback: Optional<(value: Some<A>) => B>,
): Optional<B>;

export function filter<A>(
  predicate: BooleanConstructor,
): (optional: Optional<A>) => Optional<Exclude<A, "" | false | 0 | None>>;
export function filter<A, B extends A>(
  predicate: (value: Some<A>) => value is Some<B>,
): (optional: Optional<A>) => Optional<B>;
export function filter<A>(
  predicate: (value: Some<A>) => boolean,
): (optional: Optional<A>) => Optional<A>;
export function filter<A>(
  optional: Optional<A>,
  predicate: BooleanConstructor,
): Optional<Exclude<A, "" | false | 0 | None>>;
export function filter<A, B extends A>(
  optional: Optional<A>,
  predicate: (value: Some<A>) => value is Some<B>,
): Optional<B>;
export function filter<A>(
  optional: Optional<A>,
  predicate: (value: Some<A>) => boolean,
): Optional<A>;

export function zip<A, B>(
  optional: Optional<B>,
): (optional: Optional<A>) => Optional<readonly [A, B]>;
export function zip<A, B>(
  first: Optional<A>,
  second: Optional<B>,
): Optional<readonly [A, B]>;

export function unzip<A, B>(
  optional: Optional<readonly [A, B]>,
): readonly [Optional<A>, Optional<B>];

type Holder<_A> = {};

export function transpose<A, B extends Holder<Optional<A>>>(
  lift: (value: Optional<A>) => B,
): (optional: Optional<Holder<A>>) => B;
export function transpose<A, B extends Holder<Optional<A>>>(
  optional: Optional<Holder<A>>,
  lift: (value: Optional<A>) => B,
): B;

type _of = typeof of;
type _or = typeof or;
type _map = typeof map;
type _zip = typeof zip;
type _unzip = typeof unzip;
type _apply = typeof apply;
type _isNone = typeof isNone;
type _isSome = typeof isSome;
type _orElse = typeof orElse;
type _filter = typeof filter;
type _transpose = typeof transpose;

type _None = None;
type _Some<A> = Some<A>;

declare namespace Optional {
  export type None = _None;
  export type Some<T> = _Some<T>;
  export type Self<T> = Optional<T>;

  export const of: _of;
  export const or: _or;
  export const map: _map;
  export const zip: _zip;
  export const unzip: _unzip;
  export const apply: _apply;
  export const isNone: _isNone;
  export const isSome: _isSome;
  export const orElse: _orElse;
  export const filter: _filter;
  export const Default: None;
  export const transpose: _transpose;
}

export default Optional;
