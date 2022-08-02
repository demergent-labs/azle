import { ic, nat, nat64, Opt, Query, Update } from 'azle';

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

// Calculate the product of all positive integers less than or equal to `n`.
export function fac(n: nat): Update<nat> {
    const perf_start = ic.performance_counter(0);

    const factorial = go(n);

    const perf_end = ic.performance_counter(0);
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
