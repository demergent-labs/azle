import { ic, int, nat64, Opt, $query, Record, $update } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

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

$update;
export function sort(xs: int[]): int[] {
    const perf_start = ic.performanceCounter(0);

    const sortedArray = Quicksort.sortBy(xs, Int.compare);

    const perf_end = ic.performanceCounter(0);
    record_performance(perf_start, perf_end);
    return sortedArray;
}
