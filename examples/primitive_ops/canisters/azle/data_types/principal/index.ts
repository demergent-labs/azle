import { ic, nat32, Principal, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let principal_init_heap_storage: { [key: string]: Principal | undefined } = {};

export function principal_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: Principal =
            i % 2 === 0
                ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                : Principal.fromText('aaaaa-aa');
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function principal_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        principal_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                : Principal.fromText('aaaaa-aa');
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
