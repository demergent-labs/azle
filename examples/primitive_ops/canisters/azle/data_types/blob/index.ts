import { ic, blob, nat32, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let blob_init_heap_storage: { [key: string]: blob | undefined } = {};

export function blob_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: blob =
            i % 2 === 0
                ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                : Uint8Array.from([]);
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function blob_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        blob_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                : Uint8Array.from([]);
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
