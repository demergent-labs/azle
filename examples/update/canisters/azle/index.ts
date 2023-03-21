import { ic, nat64, Opt, $query, Record, $update } from 'azle';

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

let currentMessage: string = '';

$query;
export function getCurrentMessage(): string {
    return currentMessage;
}

$update;
export function simpleUpdate(message: string): void {
    const perfStart = ic.performanceCounter(0);

    currentMessage = message;

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);
}
