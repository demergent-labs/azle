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
export type StableMap7InsertResult = { ok: [] | [null] } | { err: InsertError };
export type StableMap9InsertResult =
    | { ok: [] | [Array<string>] }
    | { err: InsertError };
export interface User {
    username: string;
    blog_posts: Array<BlogPost>;
}
export interface _SERVICE {
    contains_key_stable_map_0: ActorMethod<[number], boolean>;
    contains_key_stable_map_1: ActorMethod<[number], boolean>;
    contains_key_stable_map_10: ActorMethod<[number], boolean>;
    contains_key_stable_map_11: ActorMethod<[bigint], boolean>;
    contains_key_stable_map_12: ActorMethod<[Uint8Array], boolean>;
    contains_key_stable_map_13: ActorMethod<[string], boolean>;
    contains_key_stable_map_2: ActorMethod<[number], boolean>;
    contains_key_stable_map_3: ActorMethod<[Reaction], boolean>;
    contains_key_stable_map_4: ActorMethod<[User], boolean>;
    contains_key_stable_map_5: ActorMethod<[[] | [string]], boolean>;
    contains_key_stable_map_6: ActorMethod<[BigUint64Array], boolean>;
    contains_key_stable_map_7: ActorMethod<[null], boolean>;
    contains_key_stable_map_8: ActorMethod<[boolean], boolean>;
    contains_key_stable_map_9: ActorMethod<[number], boolean>;
    get_stable_map_0: ActorMethod<[number], [] | [string]>;
    get_stable_map_1: ActorMethod<[number], [] | [Uint8Array]>;
    get_stable_map_10: ActorMethod<[number], [] | [[] | [boolean]]>;
    get_stable_map_11: ActorMethod<[bigint], [] | [User]>;
    get_stable_map_12: ActorMethod<[Uint8Array], [] | [Reaction]>;
    get_stable_map_13: ActorMethod<[string], [] | [Principal]>;
    get_stable_map_2: ActorMethod<[number], [] | [bigint]>;
    get_stable_map_3: ActorMethod<[Reaction], [] | [bigint]>;
    get_stable_map_4: ActorMethod<[User], [] | [number]>;
    get_stable_map_5: ActorMethod<[[] | [string]], [] | [number]>;
    get_stable_map_6: ActorMethod<[BigUint64Array], [] | [boolean]>;
    get_stable_map_7: ActorMethod<[null], [] | [null]>;
    get_stable_map_8: ActorMethod<[boolean], [] | [null]>;
    get_stable_map_9: ActorMethod<[number], [] | [Array<string>]>;
    is_empty_stable_map_0: ActorMethod<[], boolean>;
    is_empty_stable_map_1: ActorMethod<[], boolean>;
    is_empty_stable_map_10: ActorMethod<[], boolean>;
    is_empty_stable_map_11: ActorMethod<[], boolean>;
    is_empty_stable_map_12: ActorMethod<[], boolean>;
    is_empty_stable_map_13: ActorMethod<[], boolean>;
    is_empty_stable_map_2: ActorMethod<[], boolean>;
    is_empty_stable_map_3: ActorMethod<[], boolean>;
    is_empty_stable_map_4: ActorMethod<[], boolean>;
    is_empty_stable_map_5: ActorMethod<[], boolean>;
    is_empty_stable_map_6: ActorMethod<[], boolean>;
    is_empty_stable_map_7: ActorMethod<[], boolean>;
    is_empty_stable_map_8: ActorMethod<[], boolean>;
    is_empty_stable_map_9: ActorMethod<[], boolean>;
    len_stable_map_0: ActorMethod<[], bigint>;
    len_stable_map_1: ActorMethod<[], bigint>;
    len_stable_map_10: ActorMethod<[], bigint>;
    len_stable_map_11: ActorMethod<[], bigint>;
    len_stable_map_12: ActorMethod<[], bigint>;
    len_stable_map_13: ActorMethod<[], bigint>;
    len_stable_map_2: ActorMethod<[], bigint>;
    len_stable_map_3: ActorMethod<[], bigint>;
    len_stable_map_4: ActorMethod<[], bigint>;
    len_stable_map_5: ActorMethod<[], bigint>;
    len_stable_map_6: ActorMethod<[], bigint>;
    len_stable_map_7: ActorMethod<[], bigint>;
    len_stable_map_8: ActorMethod<[], bigint>;
    len_stable_map_9: ActorMethod<[], bigint>;
    remove_stable_map_0: ActorMethod<[number], [] | [string]>;
    remove_stable_map_1: ActorMethod<[number], [] | [Uint8Array]>;
    remove_stable_map_10: ActorMethod<[number], [] | [[] | [boolean]]>;
    remove_stable_map_11: ActorMethod<[bigint], [] | [User]>;
    remove_stable_map_12: ActorMethod<[Uint8Array], [] | [Reaction]>;
    remove_stable_map_13: ActorMethod<[string], [] | [Principal]>;
    remove_stable_map_2: ActorMethod<[number], [] | [bigint]>;
    remove_stable_map_3: ActorMethod<[Reaction], [] | [bigint]>;
    remove_stable_map_4: ActorMethod<[User], [] | [number]>;
    remove_stable_map_5: ActorMethod<[[] | [string]], [] | [number]>;
    remove_stable_map_6: ActorMethod<[BigUint64Array], [] | [boolean]>;
    remove_stable_map_7: ActorMethod<[null], [] | [null]>;
    remove_stable_map_8: ActorMethod<[boolean], [] | [null]>;
    remove_stable_map_9: ActorMethod<[number], [] | [Array<string>]>;
    set_stable_map_0: ActorMethod<[number, string], StableMap0InsertResult>;
    set_stable_map_1: ActorMethod<[number, Uint8Array], StableMap1InsertResult>;
    set_stable_map_10: ActorMethod<
        [number, [] | [boolean]],
        StableMap10InsertResult
    >;
    set_stable_map_11: ActorMethod<[bigint, User], StableMap11InsertResult>;
    set_stable_map_12: ActorMethod<
        [Uint8Array, Reaction],
        StableMap12InsertResult
    >;
    set_stable_map_13: ActorMethod<
        [string, Principal],
        StableMap13InsertResult
    >;
    set_stable_map_2: ActorMethod<[number, bigint], StableMap2InsertResult>;
    set_stable_map_3: ActorMethod<[Reaction, bigint], StableMap3InsertResult>;
    set_stable_map_4: ActorMethod<[User, number], StableMap4InsertResult>;
    set_stable_map_5: ActorMethod<
        [[] | [string], number],
        StableMap5InsertResult
    >;
    set_stable_map_6: ActorMethod<
        [BigUint64Array, boolean],
        StableMap6InsertResult
    >;
    set_stable_map_7: ActorMethod<[null, null], StableMap7InsertResult>;
    set_stable_map_8: ActorMethod<[boolean, null], StableMap7InsertResult>;
    set_stable_map_9: ActorMethod<
        [number, Array<string>],
        StableMap9InsertResult
    >;
}
