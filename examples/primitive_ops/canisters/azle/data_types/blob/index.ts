import { ic, blob, nat32, update } from 'azle';
import { PerfResult } from '../../perf_result';

let blob_init_heap_storage: { [key: string]: blob | undefined } = {};

export const blob_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: blob =
            i % 2 === 0
                ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                : Uint8Array.from([]);
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const blob_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        blob_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                : Uint8Array.from([]);
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
