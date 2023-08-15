// where azle and confusion export conflicting declarations

// Expectations:
// 1. Not valid compilation

export * from '../everything_is_bigint';
// @ts-expect-error
export * from 'azle';
