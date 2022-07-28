import { ic, Query, Update, nat, nat64, Opt } from 'azle';

type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

let counter: nat = 0n;
let perf_result: Opt<PerfResult> = null;

export function get_perf_result(): Query<Opt<PerfResult>> {
    return perf_result;
}

export function get(): Query<nat> {
    return counter;
}

export function set(n: nat): Update<void> {
    const perf_start = ic.performance_counter(0);

    counter = n;

    const perf_end = ic.performance_counter(0);
    perf_result = {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export function inc(): Update<void> {
    const perf_start = ic.performance_counter(0);

    counter += 1n;

    const perf_end = ic.performance_counter(0);
    perf_result = {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
