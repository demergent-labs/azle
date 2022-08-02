import { ic, Init, nat, nat64, Opt, Query, Stable, Update } from 'azle';

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

type StableStorage = Stable<{
    counter: nat;
}>;

let stable_storage = ic.stable_storage<StableStorage>();

export function init(): Init {
    stable_storage.counter = 0n;
}

export function increment(): Update<nat> {
    const perf_start = ic.performance_counter(0);

    stable_storage.counter += 1n;
    const result = stable_storage.counter;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return result;
}

export function get(): Query<nat> {
    return stable_storage.counter;
}

export function reset(): Update<nat> {
    const perf_start = ic.performance_counter(0);

    stable_storage.counter = 0n;
    const result = stable_storage.counter;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return result;
}
