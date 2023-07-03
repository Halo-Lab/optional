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
    ? of(isSome(optional) ? callback(optional) : optional)
    : (anotherOptional) => map(anotherOptional, optional);
}

export function or(optional, fallback) {
  return arguments.length === 1
    ? (anotherOptional) => or(anotherOptional, optional)
    : of(optional ?? fallback);
}

export function orElse(optional, fallback) {
  return fallback
    ? (anotherOptional) => orElse(anotherOptional, optional)
    : of(optional ?? fallback());
}

export function apply(optional, optionalWithCallback) {
  return arguments.length === 1
    ? (anotherOptional) => apply(anotherOptional, optional)
    : map(optional, (value) =>
        map(optionalWithCallback, (callback) => callback(value))
      );
}

export function filter(optional, predicate) {
  return predicate
    ? map(optional, (value) => (predicate(value) ? value : None))
    : (anotherOptional) => filter(anotherOptional, optional);
}

export default {
  of,
  or,
  map,
  apply,
  isNone,
  isSome,
  orElse,
  filter,
  Default: None,
};
