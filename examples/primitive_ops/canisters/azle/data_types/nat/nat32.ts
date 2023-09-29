import { ic, nat32, update } from 'azle';
import { PerfResult } from '../../perf_result';

let nat32_init_heap_storage: { [key: string]: nat32 | undefined } = {};

export const nat32_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: nat32 = i % 2 === 0 ? 4_294_967_295 : 0;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const nat32_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        nat32_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? 4_294_967_295 : 0;
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
