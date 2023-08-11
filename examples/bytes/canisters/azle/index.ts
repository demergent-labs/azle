import { blob, ic, nat64, Opt, $query, Record, $update } from 'azle';

type PerfResult = Record<{
    wasmBodyOnly: nat64;
    wasmIncludingPrelude: nat64;
}>;

export let perfResult: Opt<PerfResult> = Opt.None;

$query;
export function getPerfResult(): Opt<PerfResult> {
    return perfResult;
}

$update;
export function getBytes(bytes: blob): blob {
    const perfStart = ic.performanceCounter(0);
    const perfEnd = ic.performanceCounter(0);

    perfResult = Opt.Some({
        wasmBodyOnly: perfEnd - perfStart,
        wasmIncludingPrelude: ic.performanceCounter(0)
    });

    return bytes;
}
