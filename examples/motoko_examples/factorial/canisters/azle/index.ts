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

// Calculate the product of all positive integers less than or equal to `n`.
$update;
export function fac(n: nat): nat {
    const perfStart = ic.performanceCounter(0);

    const factorial = go(n);

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);

    return factorial;
}

// We implement the recursion in a helper function.
function go(m: nat): nat {
    if (m == 0n) {
        return 1n;
    } else {
        return m * go(m - 1n);
    }
}
