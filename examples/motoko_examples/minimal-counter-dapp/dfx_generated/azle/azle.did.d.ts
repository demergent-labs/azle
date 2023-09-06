import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerfResult {
    wasmBodyOnly: bigint;
    wasmIncludingPrelude: bigint;
}
export interface _SERVICE {
    count: ActorMethod<[], bigint>;
    getCount: ActorMethod<[], bigint>;
    getPerfResult: ActorMethod<[], [] | [PerfResult]>;
    reset: ActorMethod<[], bigint>;
}
