import { ic, nat32, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let vec_init_heap_storage: { [key: string]: nat32[] | undefined } = {};

export function vec_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: nat32[] = i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function vec_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        vec_init_heap_storage[`element${i}`] =
            i % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
