import { Variant } from './variant';

export { Principal } from '@dfinity/principal';
export { Func } from './func';
export { Service } from './service';
export { Variant } from './variant';

export type Alias<T> = T;
export type blob = Uint8Array;
export type empty = never;

export type float32 = number;
export type float64 = number;

export type int = bigint;
export type int64 = bigint;
export type int32 = number;
export type int16 = number;
export type int8 = number;

export type nat = bigint;
export type nat64 = bigint;
export type nat32 = number;
export type nat16 = number;
export type nat8 = number;

export type Opt<Value> = Variant<{
    Some: Value;
    None: null;
}>;

export const Opt = {
    Some: <Value>(value: Value): Opt<Value> => ({
        Some: value
    }),
    None: { None: null } as Opt<never>
};

/**
 * Used to mark an object as a Candid record.
 */
export type Record<T extends object> = T;

export type reserved = any;
export type text = string;
export type Tuple<T extends unknown[]> = T;
export type Vec<T> = T[];
