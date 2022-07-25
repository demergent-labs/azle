import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry {
    desc: string;
    phone: Phone;
}
export type Name = string;
export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export type Phone = string;
export interface _SERVICE {
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    insert: ActorMethod<[Name, Entry], undefined>;
    lookup: ActorMethod<[Name], [] | [Entry]>;
}
