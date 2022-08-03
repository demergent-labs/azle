import { ic, int, nat64, Opt, Query, Update } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

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

export function sort(xs: int[]): Update<int[]> {
    const perf_start = ic.performance_counter(0);

    const sortedArray = Quicksort.sortBy(xs, Int.compare);

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
    return sortedArray;
}
