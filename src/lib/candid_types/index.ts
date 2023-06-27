// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
// - https://github.com/rust-lang/rust/blob/master/LICENSE-APACHE
//
// Some documentation changed from original work.

import { Variant } from './variant';

export { Principal } from '@dfinity/principal';
export { Func } from './func';
export { Service } from './service';
export { Variant } from './variant';

/** Marks a type as being an alias to a candid type */
export type Alias<T> = T;

/**
 * Represents a sequence of bytes`.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-blob
 */
export type blob = Uint8Array;

/**
 * Represents the absence of a value.
 *
 * Practical use cases for the {@link empty} type are relatively rare. It could
 * be used to mark a method as “never returns successfully”. For example:
 *
 * ```ts
 * $query;
 * export function myCanisterMethod(): empty {
 *     throw new Error('Never returns successfully');
 * }
 * ```
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-empty
 */
export type empty = never;

/**
 * Represents a single precision (32 bit) IEEE 754 floating point number. A
 * JavaScript `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/float32.html
 */
export type float32 = number;

/**
 * Represents a double precision (64 bit) IEEE 754 floating point number. A
 * JavaScript `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/float64.html
 */
export type float64 = number;

/**
 * Represents a whole number. A JavaScript `bigint` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/int.html
 */
export type int = bigint;

/**
 * Represents a whole number in the range {-2^63 …​ (2^63)-1}. A JavaScript
 * `bigint` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/int64.html
 */
export type int64 = bigint;

/**
 * Represents a whole number in the range {-2^31 …​ (2^31)-1}. A JavaScript
 * `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/int32.html
 */
export type int32 = number;

/**
 * Represents a whole number in the range {-2^15 …​ (2^15)-1}. A JavaScript
 * `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/int16.html
 */
export type int16 = number;

/**
 * Represents a whole number in the range {-2^7 …​ (2^7)-1}. A JavaScript
 * `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/int8.html
 */
export type int8 = number;

/**
 * Represents a natural (non-negative) number. A JavaScript `bigint` at
 * runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/nat.html
 */
export type nat = bigint;

/**
 * Represents a natural (non-negative) number in the range {0 …​ 2^64-1}. A
 * JavaScript `bigint` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/nat64.html
 */
export type nat64 = bigint;

/**
 * Represents a natural (non-negative) number in the range {0 …​ 2^32-1}. A
 * JavaScript `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/nat32.html
 */
export type nat32 = number;

/**
 * Represents a natural (non-negative) number in the range {0 …​ 2^16-1}. A
 * JavaScript `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/nat16.html
 */
export type nat16 = number;

/**
 * Represents a natural (non-negative) number in the range {0 …​ 2^8-1}. A
 * JavaScript `number` at runtime.
 *
 * See https://demergent-labs.github.io/azle/reference/candid/nat8.html
 */
export type nat8 = number;

/**
 * Represents an optional value: every {@link Opt} is either `Some` and contains
 * a value, or `None` and does not.
 */
export type Opt<Value> = Variant<{
    /** Indicates there is a value */
    Some: Value;
    /** Indicates there is no value */
    None: null;
}>;

export const Opt = {
    /**
     * Wraps the provided value in a `Some` {@link Opt}
     * @param value - the value to be wrapped
     * @returns a `Some` {@link Opt} containing the provided value
     */
    Some: <Value>(value: Value): Opt<Value> => ({
        Some: value
    }),
    /** An {@link Opt} representing the absence of a value */
    None: Object.freeze({ None: null }) as Opt<never>
};

/**
 * An unordered heterogeneous collection of labeled values.
 *
 * @example
 * ```ts
 * type Address = Record<{
 *   street: string,
 *   city: string,
 *   zipCode: nat,
 *   country: string
 * }>;
 * ```
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-record--n--t--
 */
export type Record<T extends object> = T;

/**
 * A type with one (uninformative) value: `reserved`.
 *
 * The {@link reserved} type can be used to mark canister method parameters as
 * deprecated. Since parameters are identified by position, not name, removing
 * a parameter would shift the position of subsequent parameters.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-reserved
 */
export type reserved = any;

/**
 * Represents human readable text. Synonymous with the standard `string` type in
 * JavaScript.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-text
 */
export type text = string;

/**
 * An ordered heterogeneous collection of values.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-record--n--t--
 */
export type Tuple<T extends unknown[]> = T;

/**
 * A homogeneous sequence/list/array of values.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t
 */
export type Vec<T> = T[];
