import { ic, nat64, Opt, $query, Record, $update } from 'azle';

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

export type Entry = Record<{
    desc: string;
    phone: string;
}>;

let phoneBook = new Map<string, Entry>();

$update;
export function insert(name: string, entry: Entry): void {
    const perfStart = ic.performanceCounter(0);

    phoneBook.set(name, entry);

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);
}

$query;
export function lookup(name: string): Opt<Entry> {
    const entryOrUndefined = phoneBook.get(name);

    return entryOrUndefined ? Opt.Some(entryOrUndefined) : Opt.None;
}
