import { ic, nat64, Opt, $query, Record, $update } from 'azle';

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
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

let currentMessage: string = '';

$query;
export function get_current_message(): string {
    return currentMessage;
}

$update;
export function simple_update(message: string): void {
    const perf_start = ic.performance_counter(0);

    currentMessage = message;

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
}
