import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type List = [string, [] | [List]];
export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface Superhero {
    superpowers: [] | [List];
    name: string;
}
export type SuperheroId = number;
export interface _SERVICE {
    create: ActorMethod<[Superhero], SuperheroId>;
    delete_hero: ActorMethod<[SuperheroId], boolean>;
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    read: ActorMethod<[SuperheroId], [] | [Superhero]>;
    update: ActorMethod<[SuperheroId, Superhero], boolean>;
}
