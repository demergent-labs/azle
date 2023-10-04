import { ic, nat32, Null, principal, update, Variant } from 'azle';
import { PerfResult } from '../../perf_result';

const Reaction = Variant({
    Bad: Null,
    Good: Null,
    ThumbsUp: nat32,
    Tip: principal
});

let variant_init_heap_storage: { [key: string]: typeof Reaction | undefined } =
    {};

export const variant_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: typeof Reaction =
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

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const variant_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

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

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
