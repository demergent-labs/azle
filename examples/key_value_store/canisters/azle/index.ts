import { ic, nat64, Opt, Query, Update } from 'azle';

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

type Store = Map<string, string>;

let store: Map<string, string> = new Map();

export function get(key: string): Query<Opt<string>> {
    return store.get(key) ?? null;
}

export function set(key: string, value: string): Update<void> {
    const perf_start = ic.performance_counter(0);

    store.set(key, value);

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);
}
