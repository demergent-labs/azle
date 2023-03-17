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

// Calculate the product of all positive integers less than or equal to `n`.
$update;
export function fac(n: nat): nat {
    const perf_start = ic.performanceCounter(0);

    const factorial = go(n);

    const perf_end = ic.performanceCounter(0);
    record_performance(perf_start, perf_end);

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
