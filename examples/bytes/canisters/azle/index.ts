import { blob, ic, nat64, Opt, Query, Update } from 'azle';

type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

export let perf_result: Opt<PerfResult> = null;

export function get_perf_result(): Query<Opt<PerfResult>> {
    return perf_result;
}

export function get_bytes(bytes: blob): Update<blob> {
    const perf_start = ic.performance_counter(0);
    const perf_end = ic.performance_counter(0);

    perf_result = {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };

    return bytes;
}
