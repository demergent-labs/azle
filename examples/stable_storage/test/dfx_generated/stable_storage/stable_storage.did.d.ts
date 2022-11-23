import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Child {
    id: string;
}
export type Reaction = { Great: null } | { Fire: null };
export interface User {
    id: string;
    children: Array<Child>;
}
export interface _SERVICE {
    read_stable_blob: ActorMethod<[], Uint8Array>;
    read_stable_blobs: ActorMethod<[], Array<Uint8Array>>;
    read_stable_boolean: ActorMethod<[], boolean>;
    read_stable_float32: ActorMethod<[], number>;
    read_stable_float64: ActorMethod<[], number>;
    read_stable_func: ActorMethod<[], [Principal, string]>;
    read_stable_int: ActorMethod<[], bigint>;
    read_stable_int16: ActorMethod<[], number>;
    read_stable_int32: ActorMethod<[], number>;
    read_stable_int64: ActorMethod<[], bigint>;
    read_stable_int8: ActorMethod<[], number>;
    read_stable_ints: ActorMethod<[], Array<bigint>>;
    read_stable_nat: ActorMethod<[], bigint>;
    read_stable_nat16: ActorMethod<[], number>;
    read_stable_nat32: ActorMethod<[], number>;
    read_stable_nat64: ActorMethod<[], bigint>;
    read_stable_nat8: ActorMethod<[], number>;
    read_stable_null: ActorMethod<[], null>;
    read_stable_opt: ActorMethod<[], [] | [bigint]>;
    read_stable_principal: ActorMethod<[], Principal>;
    read_stable_reaction: ActorMethod<[], Reaction>;
    read_stable_string: ActorMethod<[], string>;
    read_stable_user: ActorMethod<[], User>;
    write_stable_blob: ActorMethod<[Uint8Array], undefined>;
    write_stable_blobs: ActorMethod<[Array<Uint8Array>], undefined>;
    write_stable_boolean: ActorMethod<[boolean], undefined>;
    write_stable_float32: ActorMethod<[number], undefined>;
    write_stable_float64: ActorMethod<[number], undefined>;
    write_stable_func: ActorMethod<[[Principal, string]], undefined>;
    write_stable_int: ActorMethod<[bigint], undefined>;
    write_stable_int16: ActorMethod<[number], undefined>;
    write_stable_int32: ActorMethod<[number], undefined>;
    write_stable_int64: ActorMethod<[bigint], undefined>;
    write_stable_int8: ActorMethod<[number], undefined>;
    write_stable_ints: ActorMethod<[Array<bigint>], undefined>;
    write_stable_nat: ActorMethod<[bigint], undefined>;
    write_stable_nat16: ActorMethod<[number], undefined>;
    write_stable_nat32: ActorMethod<[number], undefined>;
    write_stable_nat64: ActorMethod<[bigint], undefined>;
    write_stable_nat8: ActorMethod<[number], undefined>;
    write_stable_null: ActorMethod<[null], undefined>;
    write_stable_opt: ActorMethod<[[] | [bigint]], undefined>;
    write_stable_principal: ActorMethod<[Principal], undefined>;
    write_stable_reaction: ActorMethod<[Reaction], undefined>;
    write_stable_string: ActorMethod<[string], undefined>;
    write_stable_user: ActorMethod<[User], undefined>;
}
