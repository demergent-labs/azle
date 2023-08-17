// where azle and confusion doesn't export conflicting declarations and there is
// a local export that overrides something from both of them

// Expectations:
// 1. valid compilation
// 2. int64 !== bigint
// 3. bool !== number
// 4. int64 === number
// 5. bool === bigint
export * from 'azle';
export * from '../everything_is_number';
export type int64 = string;
export type nat8 = string;
export type bool = string;
export type blob = string;
