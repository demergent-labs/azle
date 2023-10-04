import { ic, int64, nat32, update } from 'azle';
import { PerfResult } from '../../perf_result';

let int64_init_heap_storage: { [key: string]: int64 | undefined } = {};

export const int64_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: int64 = i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const int64_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        int64_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? 9_223_372_036_854_775_807n : 0n;
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
