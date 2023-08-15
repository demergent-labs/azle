// where azle and confusion export conflicting declarations but the local export overrides it

// Expectations:
// 1. valid compilation
// 2. text !== string
// 3. text !== bigint
// 4. text === number
export * from 'azle';
export * from '../everything_is_bigint';
export type text = number;
