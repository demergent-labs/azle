import { ic, int64, nat32, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let int64_init_heap_storage: { [key: string]: int64 | undefined } = {};

export function int64_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: int64 = i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function int64_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        int64_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
