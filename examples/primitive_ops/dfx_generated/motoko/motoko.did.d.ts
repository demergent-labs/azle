import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface _SERVICE {
    blob_init_heap: ActorMethod<[number], PerfResult>;
    blob_init_stack: ActorMethod<[number], PerfResult>;
    boolean_init_heap: ActorMethod<[number], PerfResult>;
    boolean_init_stack: ActorMethod<[number], PerfResult>;
    empty: ActorMethod<[], PerfResult>;
    float32_init_heap: ActorMethod<[number], PerfResult>;
    float32_init_stack: ActorMethod<[number], PerfResult>;
    float64_init_heap: ActorMethod<[number], PerfResult>;
    float64_init_stack: ActorMethod<[number], PerfResult>;
    int16_init_heap: ActorMethod<[number], PerfResult>;
    int16_init_stack: ActorMethod<[number], PerfResult>;
    int32_init_heap: ActorMethod<[number], PerfResult>;
    int32_init_stack: ActorMethod<[number], PerfResult>;
    int64_init_heap: ActorMethod<[number], PerfResult>;
    int64_init_stack: ActorMethod<[number], PerfResult>;
    int8_init_heap: ActorMethod<[number], PerfResult>;
    int8_init_stack: ActorMethod<[number], PerfResult>;
    int_init_heap: ActorMethod<[number], PerfResult>;
    int_init_stack: ActorMethod<[number], PerfResult>;
    nat16_init_heap: ActorMethod<[number], PerfResult>;
    nat16_init_stack: ActorMethod<[number], PerfResult>;
    nat32_init_heap: ActorMethod<[number], PerfResult>;
    nat32_init_stack: ActorMethod<[number], PerfResult>;
    nat64_init_heap: ActorMethod<[number], PerfResult>;
    nat64_init_stack: ActorMethod<[number], PerfResult>;
    nat8_init_heap: ActorMethod<[number], PerfResult>;
    nat8_init_stack: ActorMethod<[number], PerfResult>;
    nat_init_heap: ActorMethod<[number], PerfResult>;
    nat_init_stack: ActorMethod<[number], PerfResult>;
    null_init_heap: ActorMethod<[number], PerfResult>;
    null_init_stack: ActorMethod<[number], PerfResult>;
    opt_init_heap: ActorMethod<[number], PerfResult>;
    opt_init_stack: ActorMethod<[number], PerfResult>;
    principal_init_heap: ActorMethod<[number], PerfResult>;
    principal_init_stack: ActorMethod<[number], PerfResult>;
    record_init_heap: ActorMethod<[number], PerfResult>;
    record_init_stack: ActorMethod<[number], PerfResult>;
    text_init_heap: ActorMethod<[number], PerfResult>;
    text_init_stack: ActorMethod<[number], PerfResult>;
    variant_init_heap: ActorMethod<[number], PerfResult>;
    variant_init_stack: ActorMethod<[number], PerfResult>;
    vec_init_heap: ActorMethod<[number], PerfResult>;
    vec_init_stack: ActorMethod<[number], PerfResult>;
}
