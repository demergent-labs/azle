import { ic, int, nat64, Opt, $query, Record, $update } from 'azle';

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

let cell: int = 0n;

$update;
export function add(n: int): int {
    const perfStart = ic.performanceCounter(0);

    cell += n;

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return cell;
}

$update;
export function sub(n: int): int {
    const perfStart = ic.performanceCounter(0);

    cell -= n;

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return cell;
}

$update;
export function mul(n: int): int {
    const perfStart = ic.performanceCounter(0);

    cell *= n;

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return cell;
}

$update;
export function div(n: int): Opt<int> {
    const perfStart = ic.performanceCounter(0);

    let result: Opt<int>;
    if (n === 0n) {
        result = Opt.None;
    } else {
        cell /= n;
        result = Opt.Some(cell);
    }

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return result;
}

$update;
export function clearall(): void {
    const perfStart = ic.performanceCounter(0);

    cell = 0n;

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);
}
