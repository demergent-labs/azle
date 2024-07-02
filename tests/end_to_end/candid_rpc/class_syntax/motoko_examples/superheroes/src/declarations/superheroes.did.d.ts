import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type rec_0 = [string, [] | [rec_0]];
export type rec_1 = [string, [] | [rec_1]];
export type rec_2 = [string, [] | [rec_2]];
export interface _SERVICE {
    create: ActorMethod<[{ superpowers: [] | [rec_0]; name: string }], number>;
    deleteHero: ActorMethod<[number], boolean>;
    read: ActorMethod<
        [number],
        [] | [{ superpowers: [] | [rec_1]; name: string }]
    >;
    update: ActorMethod<
        [number, { superpowers: [] | [rec_2]; name: string }],
        boolean
    >;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
