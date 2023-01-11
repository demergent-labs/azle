import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BlogPost {
    title: string;
}
export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
export type Reaction = { Sad: null } | { Happy: null };
export type StableMap0InsertResult =
    | { ok: [] | [string] }
    | { err: InsertError };
export type StableMap1InsertResult =
    | { ok: [] | [Uint8Array] }
    | { err: InsertError };
export type StableMap2InsertResult =
    | { ok: [] | [bigint] }
    | { err: InsertError };
export type StableMap3InsertResult =
    | { ok: [] | [bigint] }
    | { err: InsertError };
export type StableMap4InsertResult =
    | { ok: [] | [number] }
    | { err: InsertError };
export type StableMap5InsertResult =
    | { ok: [] | [number] }
    | { err: InsertError };
export type StableMap6InsertResult =
    | { ok: [] | [boolean] }
    | { err: InsertError };
export interface User {
    username: string;
    blog_posts: Array<BlogPost>;
}
export interface _SERVICE {
    stable_map_0_contains_key: ActorMethod<[number], boolean>;
    stable_map_0_get: ActorMethod<[number], [] | [string]>;
    stable_map_0_insert: ActorMethod<[number, string], StableMap0InsertResult>;
    stable_map_0_is_empty: ActorMethod<[], boolean>;
    stable_map_0_items: ActorMethod<[], Array<[number, string]>>;
    stable_map_0_keys: ActorMethod<[], Uint8Array>;
    stable_map_0_len: ActorMethod<[], bigint>;
    stable_map_0_remove: ActorMethod<[number], [] | [string]>;
    stable_map_0_values: ActorMethod<[], Array<string>>;
    stable_map_1_contains_key: ActorMethod<[number], boolean>;
    stable_map_1_get: ActorMethod<[number], [] | [Uint8Array]>;
    stable_map_1_insert: ActorMethod<
        [number, Uint8Array],
        StableMap1InsertResult
    >;
    stable_map_1_is_empty: ActorMethod<[], boolean>;
    stable_map_1_items: ActorMethod<[], Array<[number, Uint8Array]>>;
    stable_map_1_keys: ActorMethod<[], Uint16Array>;
    stable_map_1_len: ActorMethod<[], bigint>;
    stable_map_1_remove: ActorMethod<[number], [] | [Uint8Array]>;
    stable_map_1_values: ActorMethod<[], Array<Uint8Array>>;
    stable_map_2_contains_key: ActorMethod<[number], boolean>;
    stable_map_2_get: ActorMethod<[number], [] | [bigint]>;
    stable_map_2_insert: ActorMethod<[number, bigint], StableMap2InsertResult>;
    stable_map_2_is_empty: ActorMethod<[], boolean>;
    stable_map_2_items: ActorMethod<[], Array<[number, bigint]>>;
    stable_map_2_keys: ActorMethod<[], Uint32Array>;
    stable_map_2_len: ActorMethod<[], bigint>;
    stable_map_2_remove: ActorMethod<[number], [] | [bigint]>;
    stable_map_2_values: ActorMethod<[], Array<bigint>>;
    stable_map_3_contains_key: ActorMethod<[Reaction], boolean>;
    stable_map_3_get: ActorMethod<[Reaction], [] | [bigint]>;
    stable_map_3_insert: ActorMethod<
        [Reaction, bigint],
        StableMap3InsertResult
    >;
    stable_map_3_is_empty: ActorMethod<[], boolean>;
    stable_map_3_items: ActorMethod<[], Array<[Reaction, bigint]>>;
    stable_map_3_keys: ActorMethod<[], Array<Reaction>>;
    stable_map_3_len: ActorMethod<[], bigint>;
    stable_map_3_remove: ActorMethod<[Reaction], [] | [bigint]>;
    stable_map_3_values: ActorMethod<[], Array<bigint>>;
    stable_map_4_contains_key: ActorMethod<[User], boolean>;
    stable_map_4_get: ActorMethod<[User], [] | [number]>;
    stable_map_4_insert: ActorMethod<[User, number], StableMap4InsertResult>;
    stable_map_4_is_empty: ActorMethod<[], boolean>;
    stable_map_4_items: ActorMethod<[], Array<[User, number]>>;
    stable_map_4_keys: ActorMethod<[], Array<User>>;
    stable_map_4_len: ActorMethod<[], bigint>;
    stable_map_4_remove: ActorMethod<[User], [] | [number]>;
    stable_map_4_values: ActorMethod<[], Array<number>>;
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
}
