export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsExact<T, U> = [T] extends [U]
    ? [U] extends [T]
        ? true
        : false
    : false;
export type NotAnyAndExact<T, U> =
    IsAny<T> extends true ? false : IsExact<T, U>;
export type AssertType<T extends true> = T;
