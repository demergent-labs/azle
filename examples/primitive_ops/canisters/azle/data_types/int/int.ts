import { ic, int, nat32, update } from 'azle';
import { PerfResult } from '../../perf_result';

let int_init_heap_storage: { [key: string]: int | undefined } = {};

export const int_init_stack = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        let value: int =
            i % 2 === 0
                ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                : 0n;
        // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

export const int_init_heap = update([nat32], PerfResult, (num_inits) => {
    const perf_start = ic.performanceCounter(0);

    let i = 0;

    while (i < num_inits) {
        int_init_heap_storage[`element${i}`] =
            i % 2 === 0
                ? 170_141_183_460_469_231_731_687_303_715_884_105_727n
                : 0n;
        i += 1;
    }

    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});
