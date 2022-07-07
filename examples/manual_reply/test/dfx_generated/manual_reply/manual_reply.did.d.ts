import type { Principal } from '@dfinity/principal';
export interface Element {
    id: string;
    orbitals: Array<Orbital>;
    state: State;
}
export type Gas = { Elemental: null } | { Mixed: null } | { Toxic: null };
export type Options = { Large: null } | { Small: null } | { Medium: null };
export interface Orbital {
    electrons: number;
    layer: number;
}
export interface RawReply {
    int: bigint;
    blob: Array<number>;
    bool: boolean;
    text: string;
    variant: Options;
}
export interface Solid {
    element: string;
}
export type State = { Gas: Gas } | { Solid: Solid } | { Liquid: null };
export interface _SERVICE {
    manual_query: (arg_0: string) => Promise<string>;
    manual_update: (arg_0: string) => Promise<string>;
    query_blob: () => Promise<Array<number>>;
    query_float32: () => Promise<number>;
    query_int8: () => Promise<number>;
    query_nat: () => Promise<bigint>;
    query_null: () => Promise<null>;
    query_record: () => Promise<Element>;
    query_reserved: () => Promise<any>;
    query_string: () => Promise<string>;
    query_variant: () => Promise<Gas>;
    reply_raw: () => Promise<RawReply>;
    update_blob: () => Promise<Array<number>>;
    update_float32: () => Promise<number>;
    update_int8: () => Promise<number>;
    update_nat: () => Promise<bigint>;
    update_null: () => Promise<null>;
    update_record: () => Promise<Element>;
    update_reserved: () => Promise<any>;
    update_string: () => Promise<string>;
    update_variant: () => Promise<Gas>;
}
