import { ic, nat32, Opt, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let opt_init_heap_storage: { [key: string]: Opt<boolean> | undefined } = {};

export function opt_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: Opt<boolean> = i % 2 === 0 ? true : null;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function opt_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        opt_init_heap_storage[`bool${i}`] = i % 2 === 0 ? true : null;
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
