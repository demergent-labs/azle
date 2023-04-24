import {
    ic,
    $init,
    match,
    nat,
    nat64,
    Opt,
    $query,
    Record,
    StableBTreeMap,
    $update
} from 'azle';

//#region Performance
type PerfResult = Record<{
    wasmBodyOnly: nat64;
    wasmIncludingPrelude: nat64;
}>;

let perfResult: Opt<PerfResult> = Opt.None;

$query;
export function getPerfResult(): Opt<PerfResult> {
    return perfResult;
}

function recordPerformance(start: nat64, end: nat64): void {
    perfResult = Opt.Some({
        wasmBodyOnly: end - start,
        wasmIncludingPrelude: ic.performanceCounter(0)
    });
}
//#endregion

let stableStorage = new StableBTreeMap<string, nat>(0, 25, 1_000);

$init;
export function init(): void {
    stableStorage.insert('counter', 0n);
}

$update;
export function increment(): nat {
    const perfStart = ic.performanceCounter(0);

    stableStorage.insert(
        'counter',
        match(stableStorage.get('counter'), {
            Some: (x) => x,
            None: () => 0n
        }) + 1n
    );
    const result = match(stableStorage.get('counter'), {
        Some: (x) => x,
        None: () => 0n
    });

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return result;
}

$query;
export function get(): nat {
    return match(stableStorage.get('counter'), {
        Some: (x) => x,
        None: () => 0n
    });
}

$update;
export function reset(): nat {
    const perfStart = ic.performanceCounter(0);

    stableStorage.insert('counter', 0n);
    const result = match(stableStorage.get('counter'), {
        Some: (x) => x,
        None: () => 0n
    });

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return result;
}
