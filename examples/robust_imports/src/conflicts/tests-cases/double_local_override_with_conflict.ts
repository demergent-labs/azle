// Where azle and confusion have conflicting definitions but there are also conflicting definitions locally

// Expectations:
// 1. Not valid compilation

export * from '../everything_is_bigint';
export * from 'azle';

// @ts-expect-error
export type text = number;
// @ts-expect-error
export type text = boolean;
