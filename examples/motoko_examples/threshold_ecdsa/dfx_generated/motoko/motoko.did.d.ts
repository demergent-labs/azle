import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface _SERVICE {
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    public_key: ActorMethod<
        [],
        { Ok: { public_key: Array<number> } } | { Err: string }
    >;
    sign: ActorMethod<
        [Array<number>],
        { Ok: { signature: Array<number> } } | { Err: string }
    >;
}
