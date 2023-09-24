export const None = null;

export function of(value) {
  return value ?? None;
}

export function isNone(value) {
  return value == None;
}

export function isSome(value) {
  return !isNone(value);
}

export function map(optional, callback) {
  return callback
    ? isSome(optional)
      ? callback(optional)
      : optional
    : (anotherOptional) => map(anotherOptional, optional);
}

export function or(optional, fallback) {
  return arguments.length === 1
    ? (anotherOptional) => or(anotherOptional, optional)
    : optional ?? fallback;
}

export function orElse(optional, fallback) {
  return fallback
    ? optional ?? fallback()
    : (anotherOptional) => orElse(anotherOptional, optional);
}

export function apply(optional, optionalWithCallback) {
  return arguments.length === 1
    ? (anotherOptional) => apply(anotherOptional, optional)
    : map(zip(optional, optionalWithCallback), ([value, callback]) =>
        callback(value),
      );
}

export function filter(optional, predicate) {
  return predicate
    ? map(optional, (value) => (predicate(value) ? value : None))
    : (anotherOptional) => filter(anotherOptional, optional);
}

export function zip(first, second) {
  return arguments.length === 1
    ? (anotherOptional) => zip(anotherOptional, first)
    : map(first, (first) => map(second, (second) => [first, second]));
}

export function unzip(optional) {
  return optional ?? [None, None];
}

export function transpose(optional, lift) {
  return arguments.length === 1
    ? (anotherOptional) => transpose(anotherOptional, optional)
    : optional ?? lift(None);
}

export default {
  of,
  or,
  map,
  zip,
  unzip,
  apply,
  isNone,
  isSome,
  orElse,
  filter,
  Default: None,
  transpose,
};
