import { CanisterMethodOptions } from 'azle';

// Azle const name but doesn't come from azle
export const $update = (options?: CanisterMethodOptions) => {};

// Azle type name but aliases a different valid azle type
export type Record = number;

// Azle type name but doesn't alias an azle type
export type Variant<T extends object> = T;
