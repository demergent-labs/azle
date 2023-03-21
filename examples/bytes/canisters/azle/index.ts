import { blob, ic, nat64, Opt, $query, Record, $update } from 'azle';

type PerfResult = Record<{
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
}>;

export let perf_result: Opt<PerfResult> = null;

$query;
export function get_perf_result(): Opt<PerfResult> {
    return perf_result;
}

$update;
export function get_bytes(bytes: blob): blob {
    const perf_start = ic.performanceCounter(0);
    const perf_end = ic.performanceCounter(0);

    perf_result = {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };

    return bytes;
}
