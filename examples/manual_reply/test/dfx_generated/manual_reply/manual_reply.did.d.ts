import type { Principal } from '@dfinity/principal';
export interface Element {
    id: string;
    orbitals: Array<Orbital>;
    state: State;
}
export type Gas = { Elemental: null } | { Mixed: null } | { Toxic: null };
export interface Orbital {
    electrons: number;
    layer: number;
}
export interface Solid {
    element: string;
}
export type State = { Gas: Gas } | { Solid: Solid } | { Liquid: null };
export interface _SERVICE {
    manual_query: (arg_0: string) => Promise<string>;
    manual_update: (arg_0: string) => Promise<string>;
    reply_blob: () => Promise<Array<number>>;
    reply_float32: () => Promise<number>;
    reply_int8: () => Promise<number>;
    reply_nat: () => Promise<bigint>;
    reply_null: () => Promise<null>;
    reply_record: () => Promise<Element>;
    reply_reserved: () => Promise<any>;
    reply_string: () => Promise<string>;
    reply_variant: () => Promise<Gas>;
}
