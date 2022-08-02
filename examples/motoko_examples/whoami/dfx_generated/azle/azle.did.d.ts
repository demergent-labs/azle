import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface _SERVICE {
    argument: ActorMethod<[], Principal>;
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    id: ActorMethod<[], Principal>;
    id_quick: ActorMethod<[], Principal>;
    installer: ActorMethod<[], Principal>;
    whoami: ActorMethod<[], Principal>;
}
