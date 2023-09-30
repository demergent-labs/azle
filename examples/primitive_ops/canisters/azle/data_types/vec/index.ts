import { ic, nat32, update } from 'azle';
import { PerfResult } from '../../perf_result';

let vec_init_heap_storage: { [key: string]: nat32[] | undefined } = {};

export const vec_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: nat32[] = i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const vec_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        vec_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
