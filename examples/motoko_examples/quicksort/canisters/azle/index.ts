import { ic, int, nat64, Opt, $query, Record, $update, Vec } from 'azle';
import { Int } from './comparison';
import * as Quicksort from './quicksort';

//#region Performance
type PerfResult = Record<{
    wasmBodyOnly: nat64;
    wasmIncludingPrelude: nat64;
}>;

let perfResult: Opt<PerfResult> = null;

$query;
export function getPerfResult(): Opt<PerfResult> {
    return perfResult;
}

function recordPerformance(start: nat64, end: nat64): void {
    perfResult = {
        wasmBodyOnly: end - start,
        wasmIncludingPrelude: ic.performanceCounter(0)
    };
}
//#endregion

$update;
export function sort(xs: Vec<int>): Vec<int> {
    const perfStart = ic.performanceCounter(0);

    const sortedArray = Quicksort.sortBy(xs, Int.compare);

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);
    return sortedArray;
}
