import { ic, nat, nat64, Opt, $query, Record, $update } from 'azle';

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

let counter: nat = 0n;

$update;
export function count(): nat {
    const perfStart = ic.performanceCounter(0);

    counter += 1n;

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);

    return counter;
}

$query;
export function getCount(): nat {
    return counter;
}

$update;
export function reset(): nat {
    const perfStart = ic.performanceCounter(0);

    counter = 0n;

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);

    return counter;
}
