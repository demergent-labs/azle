import { ic, int, nat64, Opt, Query, Update } from 'azle';

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

let cell: int = 0n;

export function add(n: int): Update<int> {
    const perf_start = ic.performance_counter(0);

    cell += n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

export function sub(n: int): Update<int> {
    const perf_start = ic.performance_counter(0);

    cell -= n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

export function mul(n: int): Update<int> {
    const perf_start = ic.performance_counter(0);

    cell *= n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

export function div(n: int): Update<Opt<int>> {
    const perf_start = ic.performance_counter(0);

    let result: Opt<int>;
    if (n === 0n) {
        result = null;
    } else {
        cell /= n;
        result = cell;
    }

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return result;
}

export function clearall(): Update<void> {
    const perf_start = ic.performance_counter(0);

    cell = 0n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);
}
