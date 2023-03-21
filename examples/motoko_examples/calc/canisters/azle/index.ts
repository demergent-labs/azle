import { ic, int, nat64, Opt, $query, Record, $update } from 'azle';

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

let cell: int = 0n;

$update;
export function add(n: int): int {
    const perf_start = ic.performanceCounter(0);

    cell += n;

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

$update;
export function sub(n: int): int {
    const perf_start = ic.performanceCounter(0);

    cell -= n;

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

$update;
export function mul(n: int): int {
    const perf_start = ic.performanceCounter(0);

    cell *= n;

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
}

$update;
export function div(n: int): Opt<int> {
    const perf_start = ic.performanceCounter(0);

    let result: Opt<int>;
    if (n === 0n) {
        result = null;
    } else {
        cell /= n;
        result = cell;
    }

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return result;
}

$update;
export function clearall(): void {
    const perf_start = ic.performanceCounter(0);

    cell = 0n;

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);
}
