import { Query, Update, nat32, Opt } from 'azle';

// Note: This won't be reflected in the candid until
// https://github.com/demergent-labs/azle/issues/235 is implemented
export type SuperheroId = nat32;

// The type of a superhero.
export type Superhero = {
    name: string;
    superpowers?: Opt<List>;
};

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
export function create(superhero: Superhero): Update<SuperheroId> {
    let superheroId = next;
    next += 1;
    superheroes.set(superheroId, superhero);
    return superheroId;
}

// Read a superhero.
export function read(superheroId: SuperheroId): Query<Opt<Superhero>> {
    let result = superheroes.get(superheroId) ?? null;

    return result;
}

// Update a superhero.
export function update(
    superheroId: SuperheroId,
    superhero: Superhero
): Update<boolean> {
    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.set(superheroId, superhero);
    }
    return !!result;
}

// Delete a superhero.
export function deleteHero(superheroId: SuperheroId): Update<boolean> {
    let result = superheroes.get(superheroId);
    if (result) {
        superheroes.delete(superheroId);
    }
    return !!result;
}
