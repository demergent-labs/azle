import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type rec_28 = [string, [] | [rec_28]];
export type rec_33 = [string, [] | [rec_33]];
export type rec_36 = [string, [] | [rec_36]];
export interface _SERVICE {
    create: ActorMethod<[{ superpowers: [] | [rec_28]; name: string }], number>;
    deleteHero: ActorMethod<[number], boolean>;
    read: ActorMethod<
        [number],
        [] | [{ superpowers: [] | [rec_33]; name: string }]
    >;
    update: ActorMethod<
        [number, { superpowers: [] | [rec_36]; name: string }],
        boolean
    >;
}
