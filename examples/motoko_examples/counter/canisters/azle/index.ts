import { ic, Query, Update, nat, nat64, Opt } from 'azle';

//#region Performance
type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

let perf_result: Opt<PerfResult> = null;

export function get_perf_result(): Query<Opt<PerfResult>> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

let counter: nat = 0n;

export function get(): Query<nat> {
    return counter;
}

export function set(n: nat): Update<void> {
    const perf_start = ic.performance_counter(0);

    counter = n;

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
}

export function inc(): Update<void> {
    const perf_start = ic.performance_counter(0);

    counter += 1n;

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
}
