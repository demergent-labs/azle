import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type List = [string, [] | [List]];
export interface Superhero {
    superpowers: [] | [List];
    name: string;
}
export interface _SERVICE {
    create: ActorMethod<[Superhero], number>;
    delete_hero: ActorMethod<[number], boolean>;
    read: ActorMethod<[number], [] | [Superhero]>;
    update: ActorMethod<[number, Superhero], boolean>;
}
