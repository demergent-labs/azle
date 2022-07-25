import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry {
    desc: string;
    phone: string;
}
export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface _SERVICE {
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    insert: ActorMethod<[string, Entry], undefined>;
    lookup: ActorMethod<[string], [] | [Entry]>;
}
