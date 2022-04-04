import { Query, Update, int32, Opt } from 'azle';

// export type SuperheroId = int32; // this is causing  Error: Could not generate Candid record for type alias declaration: [object Object]

// The type of a superhero.
export type Superhero = {
  name: string;
  superpowers: string[];
};

/**
 * Application State
 */

// The next available superhero identifier.
let next: int32 = 0;

// The superhero data store.
let superheroes: Map<int32, Superhero> = new Map();

/**
 * High-Level API
 */

// Create a superhero.
export function create(superhero: Superhero): Update<int32> {
  let superheroId = next;
  next += 1;
  superheroes.set(superheroId, superhero);
  return superheroId;
}

// Read a superhero.
export function read(superheroId: int32): Query<Opt<Superhero>> {
  let result = superheroes.get(superheroId) ?? null;

  return result;
}

// Update a superhero.
export function update(
  superheroId: int32,
  superhero: Superhero
): Update<boolean> {
  let result = superheroes.get(superheroId);
  if (result) {
    superheroes.set(superheroId, superhero);
  }
  return !!result;
}

// Delete a superhero.
export function deleteHero(superheroId: int32): Update<boolean> {
  let result = superheroes.get(superheroId);
  if (result) {
    superheroes.delete(superheroId);
  }
  return !!result;
}
