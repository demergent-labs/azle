import { ic, nat64, Opt, $query, Record, $update } from 'azle';

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

export type Entry = Record<{
    desc: string;
    phone: string;
}>;

let phone_book = new Map<string, Entry>();

$update;
export function insert(name: string, entry: Entry): void {
    const perf_start = ic.performanceCounter(0);

    phone_book.set(name, entry);

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);
}

$query;
export function lookup(name: string): Opt<Entry> {
    return phone_book.get(name) ?? null;
}
