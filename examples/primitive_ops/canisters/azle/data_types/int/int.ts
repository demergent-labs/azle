import { ic, int, nat32, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let int_init_heap_storage: { [key: string]: int | undefined } = {};

export function int_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: int =
            i % 2 === 0
                ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function int_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        int_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                : 0n;
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
