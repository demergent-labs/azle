import { ic, nat64, Opt, Query, Update } from 'azle';

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

let currentMessage: string = '';

export function get_current_message(): Query<string> {
    return currentMessage;
}

export function simple_update(message: string): Update<void> {
    const perf_start = ic.performance_counter(0);

    currentMessage = message;

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
}

// class API

import { query, update } from 'azle';

export default class {
    current_message: string = '';

    @query
    get_current_message(): string {
        return this.current_message;
    }

    @update
    simple_update(message: string): void {
        const perf_start = ic.performance_counter(0);

        this.current_message = message;

        const perf_end = ic.performance_counter(0);
        record_performance(perf_start, perf_end);
    }
}
