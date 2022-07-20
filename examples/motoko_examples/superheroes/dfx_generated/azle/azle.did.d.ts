import type { Principal } from '@dfinity/principal';
export type List = [string, [] | [List]];
export interface Superhero {
    superpowers: [] | [List];
    name: string;
}
export interface _SERVICE {
    create: (arg_0: Superhero) => Promise<number>;
    deleteHero: (arg_0: number) => Promise<boolean>;
    read: (arg_0: number) => Promise<[] | [Superhero]>;
    update: (arg_0: number, arg_1: Superhero) => Promise<boolean>;
}
