import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
export type StableMap5InsertResult =
    | { ok: [] | [number] }
    | { err: InsertError };
export type StableMap6InsertResult =
    | { ok: [] | [boolean] }
    | { err: InsertError };
export type StableMap7InsertResult = { ok: [] | [null] } | { err: InsertError };
export type StableMap9InsertResult =
    | { ok: [] | [Array<string>] }
    | { err: InsertError };
export interface _SERVICE {
    stable_map_5_contains_key: ActorMethod<[[] | [string]], boolean>;
    stable_map_5_get: ActorMethod<[[] | [string]], [] | [number]>;
    stable_map_5_insert: ActorMethod<
        [[] | [string], number],
        StableMap5InsertResult
    >;
    stable_map_5_is_empty: ActorMethod<[], boolean>;
    stable_map_5_items: ActorMethod<[], Array<[[] | [string], number]>>;
    stable_map_5_keys: ActorMethod<[], Array<[] | [string]>>;
    stable_map_5_len: ActorMethod<[], bigint>;
    stable_map_5_remove: ActorMethod<[[] | [string]], [] | [number]>;
    stable_map_5_values: ActorMethod<[], Array<number>>;
    stable_map_6_contains_key: ActorMethod<[BigUint64Array], boolean>;
    stable_map_6_get: ActorMethod<[BigUint64Array], [] | [boolean]>;
    stable_map_6_insert: ActorMethod<
        [BigUint64Array, boolean],
        StableMap6InsertResult
    >;
    stable_map_6_is_empty: ActorMethod<[], boolean>;
    stable_map_6_items: ActorMethod<[], Array<[BigUint64Array, boolean]>>;
    stable_map_6_keys: ActorMethod<[], Array<BigUint64Array>>;
    stable_map_6_len: ActorMethod<[], bigint>;
    stable_map_6_remove: ActorMethod<[BigUint64Array], [] | [boolean]>;
    stable_map_6_values: ActorMethod<[], Array<boolean>>;
    stable_map_7_contains_key: ActorMethod<[null], boolean>;
    stable_map_7_get: ActorMethod<[null], [] | [null]>;
    stable_map_7_insert: ActorMethod<[null, null], StableMap7InsertResult>;
    stable_map_7_is_empty: ActorMethod<[], boolean>;
    stable_map_7_items: ActorMethod<[], Array<[null, null]>>;
    stable_map_7_keys: ActorMethod<[], Array<null>>;
    stable_map_7_len: ActorMethod<[], bigint>;
    stable_map_7_remove: ActorMethod<[null], [] | [null]>;
    stable_map_7_values: ActorMethod<[], Array<null>>;
    stable_map_8_contains_key: ActorMethod<[boolean], boolean>;
    stable_map_8_get: ActorMethod<[boolean], [] | [null]>;
    stable_map_8_insert: ActorMethod<[boolean, null], StableMap7InsertResult>;
    stable_map_8_is_empty: ActorMethod<[], boolean>;
    stable_map_8_items: ActorMethod<[], Array<[boolean, null]>>;
    stable_map_8_keys: ActorMethod<[], Array<boolean>>;
    stable_map_8_len: ActorMethod<[], bigint>;
    stable_map_8_remove: ActorMethod<[boolean], [] | [null]>;
    stable_map_8_values: ActorMethod<[], Array<null>>;
    stable_map_9_contains_key: ActorMethod<[number], boolean>;
    stable_map_9_get: ActorMethod<[number], [] | [Array<string>]>;
    stable_map_9_insert: ActorMethod<
        [number, Array<string>],
        StableMap9InsertResult
    >;
    stable_map_9_is_empty: ActorMethod<[], boolean>;
    stable_map_9_items: ActorMethod<[], Array<[number, Array<string>]>>;
    stable_map_9_keys: ActorMethod<[], Array<number>>;
    stable_map_9_len: ActorMethod<[], bigint>;
    stable_map_9_remove: ActorMethod<[number], [] | [Array<string>]>;
    stable_map_9_values: ActorMethod<[], Array<Array<string>>>;
}
