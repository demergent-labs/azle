import { ic, nat, nat32, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

let nat_init_heap_storage: { [key: string]: nat | undefined } = {};

export function nat_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: nat =
            i % 2 === 0
                ? 340_282_366_920_938_463_463_374_607_431_768_211_455n
                : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function nat_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        nat_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? 340_282_366_920_938_463_463_374_607_431_768_211_455n
                : 0n;
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
