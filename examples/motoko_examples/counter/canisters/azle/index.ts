import { ic, nat, nat64, Opt, $query, Record, $update } from 'azle';

//#region Performance
type PerfResult = Record<{
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
}>;

let perf_result: Opt<PerfResult> = null;

$query;
export function get_perf_result(): Opt<PerfResult> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
}
//#endregion

let counter: nat = 0n;

$query;
export function get(): nat {
    return counter;
}

$update;
export function set(n: nat): void {
    const perf_start = ic.performanceCounter(0);

    counter = n;

    const perf_end = ic.performanceCounter(0);
    record_performance(perf_start, perf_end);
}

$update;
export function inc(): void {
    const perf_start = ic.performanceCounter(0);

    counter += 1n;

    const perf_end = ic.performanceCounter(0);
    record_performance(perf_start, perf_end);
}
