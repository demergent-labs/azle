import {
    ic,
    $init,
    nat,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update
} from 'azle';

//#region Performance
type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

let perf_result: Opt<PerfResult> = null;

$query;
export function get_perf_result(): Opt<PerfResult> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

let stable_storage = new StableBTreeMap<string, nat>(0, 25, 1_000);

$init;
export function init() {
    stable_storage.insert('counter', 0n);
}

$update;
export function increment(): nat {
    const perf_start = ic.performance_counter(0);

    stable_storage.insert(
        'counter',
        (stable_storage.get('counter') ?? 0n) + 1n
    );
    const result = stable_storage.get('counter') ?? 0n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return result;
}

$query;
export function get(): nat {
    return stable_storage.get('counter') ?? 0n;
}

$update;
export function reset(): nat {
    const perf_start = ic.performance_counter(0);

    stable_storage.insert('counter', 0n);
    const result = stable_storage.get('counter') ?? 0n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return result;
}
