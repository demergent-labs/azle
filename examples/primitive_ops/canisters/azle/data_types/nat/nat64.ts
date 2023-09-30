import { ic, nat32, nat64, update } from 'azle';
import { PerfResult } from '../../perf_result';

let nat64_init_heap_storage: { [key: string]: nat64 | undefined } = {};

export const nat64_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: nat64 = i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const nat64_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        nat64_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? 18_446_744_073_709_551_615n : 0n;
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
