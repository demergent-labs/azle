import {
    Alias,
    ic,
    nat32,
    nat64,
    Opt,
    $query,
    Record,
    Tuple,
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

// Note: This won't be reflected in the candid until
export type SuperheroId = Alias<nat32>;

// The type of a superhero.
export type Superhero = Record<{
    name: string;
    superpowers?: Opt<List>;
}>;

export type List = Tuple<[string, Opt<List>]>;

/**
 * Application State
 */

// The next available superhero identifier.
let next: SuperheroId = 0;

// The superhero data store.
let superheroes: Map<SuperheroId, Superhero> = new Map();

/**
 * High-Level API
 */

// Create a superhero.
$update;
export function create(superhero: Superhero): SuperheroId {
    const perfStart = ic.performanceCounter(0);

    let superheroId = next;
    next += 1;
    superheroes.set(superheroId, superhero);

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);

    return superheroId;
}

// Read a superhero.
$query;
export function read(superheroId: SuperheroId): Opt<Superhero> {
    const superheroOrUndefined = superheroes.get(superheroId);
    return superheroOrUndefined ? Opt.Some(superheroOrUndefined) : Opt.None;
}

// Update a superhero.
$update;
export function update(
    superheroId: SuperheroId,
    superhero: Superhero
): boolean {
    const perfStart = ic.performanceCounter(0);

    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.set(superheroId, superhero);
    }

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);

    return !!result;
}

// Delete a superhero.
$update;
export function deleteHero(superheroId: SuperheroId): boolean {
    const perfStart = ic.performanceCounter(0);

    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.delete(superheroId);
    }

    const perfEnd = ic.performanceCounter(0);
    recordPerformance(perfStart, perfEnd);
    return !!result;
}
