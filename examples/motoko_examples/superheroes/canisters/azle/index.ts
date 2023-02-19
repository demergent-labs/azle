import { ic, nat32, nat64, Opt, $query, Record, $update } from 'azle';

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
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

// Note: This won't be reflected in the candid until
export type SuperheroId = nat32;

// The type of a superhero.
export type Superhero = Record<{
    name: string;
    superpowers?: Opt<List>;
}>;

export type List = [string, Opt<List>];

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
    const perf_start = ic.performance_counter(0);

    let superheroId = next;
    next += 1;
    superheroes.set(superheroId, superhero);

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);

    return superheroId;
}

// Read a superhero.
$query;
export function read(superheroId: SuperheroId): Opt<Superhero> {
    let result = superheroes.get(superheroId) ?? null;

    return result;
}

// Update a superhero.
$update;
export function update(
    superheroId: SuperheroId,
    superhero: Superhero
): boolean {
    const perf_start = ic.performance_counter(0);

    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.set(superheroId, superhero);
    }

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);

    return !!result;
}

// Delete a superhero.
$update;
export function delete_hero(superheroId: SuperheroId): boolean {
    const perf_start = ic.performance_counter(0);

    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.delete(superheroId);
    }

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);
    return !!result;
}
