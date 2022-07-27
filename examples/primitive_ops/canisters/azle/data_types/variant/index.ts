import { ic, nat32, Principal, Update, Variant } from 'azle';
import { PerfResult } from 'azle/benchmark';

type Reaction = Variant<{
    Bad: null;
    Good: null;
    ThumbsUp: nat32;
    Tip: Principal;
}>;

let variant_init_heap_storage: { [key: string]: Reaction | undefined } = {};

export function variant_init_stack(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        let value: Reaction =
            i % 2 === 0
                ? {
                      ThumbsUp: 2
                  }
                : {
                      Good: null
                  };
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function variant_init_heap(num_inits: nat32): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);

    let i = 0;

    while (i < num_inits) {
        variant_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? {
                      ThumbsUp: 2
                  }
                : {
                      Good: null
                  };
        i += 1;
    }

    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
