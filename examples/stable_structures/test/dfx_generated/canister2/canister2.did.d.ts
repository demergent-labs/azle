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
export type StableMap10InsertResult =
    | { ok: [] | [[] | [boolean]] }
    | { err: InsertError };
export type StableMap11InsertResult =
    | { ok: [] | [User] }
    | { err: InsertError };
export type StableMap12InsertResult =
    | { ok: [] | [Reaction] }
    | { err: InsertError };
export type StableMap13InsertResult =
    | { ok: [] | [Principal] }
    | { err: InsertError };
export type StableMap7InsertResult = { ok: [] | [null] } | { err: InsertError };
export type StableMap9InsertResult =
    | { ok: [] | [Array<string>] }
    | { err: InsertError };
export interface User {
    username: string;
    blog_posts: Array<BlogPost>;
}
export interface _SERVICE {
    stable_map_10_contains_key: ActorMethod<[number], boolean>;
    stable_map_10_get: ActorMethod<[number], [] | [[] | [boolean]]>;
    stable_map_10_insert: ActorMethod<
        [number, [] | [boolean]],
        StableMap10InsertResult
    >;
    stable_map_10_is_empty: ActorMethod<[], boolean>;
    stable_map_10_items: ActorMethod<[], Array<[number, [] | [boolean]]>>;
    stable_map_10_keys: ActorMethod<[], Array<number>>;
    stable_map_10_len: ActorMethod<[], bigint>;
    stable_map_10_remove: ActorMethod<[number], [] | [[] | [boolean]]>;
    stable_map_10_values: ActorMethod<[], Array<[] | [boolean]>>;
    stable_map_11_contains_key: ActorMethod<[bigint], boolean>;
    stable_map_11_get: ActorMethod<[bigint], [] | [User]>;
    stable_map_11_insert: ActorMethod<[bigint, User], StableMap11InsertResult>;
    stable_map_11_is_empty: ActorMethod<[], boolean>;
    stable_map_11_items: ActorMethod<[], Array<[bigint, User]>>;
    stable_map_11_keys: ActorMethod<[], Array<bigint>>;
    stable_map_11_len: ActorMethod<[], bigint>;
    stable_map_11_remove: ActorMethod<[bigint], [] | [User]>;
    stable_map_11_values: ActorMethod<[], Array<User>>;
    stable_map_12_contains_key: ActorMethod<[Uint8Array], boolean>;
    stable_map_12_get: ActorMethod<[Uint8Array], [] | [Reaction]>;
    stable_map_12_insert: ActorMethod<
        [Uint8Array, Reaction],
        StableMap12InsertResult
    >;
    stable_map_12_is_empty: ActorMethod<[], boolean>;
    stable_map_12_items: ActorMethod<[], Array<[Uint8Array, Reaction]>>;
    stable_map_12_keys: ActorMethod<[], Array<Uint8Array>>;
    stable_map_12_len: ActorMethod<[], bigint>;
    stable_map_12_remove: ActorMethod<[Uint8Array], [] | [Reaction]>;
    stable_map_12_values: ActorMethod<[], Array<Reaction>>;
    stable_map_13_contains_key: ActorMethod<[string], boolean>;
    stable_map_13_get: ActorMethod<[string], [] | [Principal]>;
    stable_map_13_insert: ActorMethod<
        [string, Principal],
        StableMap13InsertResult
    >;
    stable_map_13_is_empty: ActorMethod<[], boolean>;
    stable_map_13_items: ActorMethod<[], Array<[string, Principal]>>;
    stable_map_13_keys: ActorMethod<[], Array<string>>;
    stable_map_13_len: ActorMethod<[], bigint>;
    stable_map_13_remove: ActorMethod<[string], [] | [Principal]>;
    stable_map_13_values: ActorMethod<[], Array<Principal>>;
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
