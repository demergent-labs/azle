import { IDL, query, update } from 'azle';

// Note: This won't be reflected in the candid
export type SuperheroId = number;
const SuperheroId = IDL.Nat32;

const List = Recursive(() => Tuple(IDL.Text, Opt(List)));

// The type of a superhero.
const Superhero = Record({
    name: IDL.Text,
    superpowers: Opt(List)
});
type Superhero = typeof Superhero.tsType;

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
export default class {
    // Create a superhero.
    @update([Superhero], SuperheroId)
    create(superhero: Superhero) {
        let superheroId = next;
        next += 1;
        superheroes.set(superheroId, superhero);

        return superheroId;
    }
    // Read a superhero.
    @query([SuperheroId], Opt(Superhero))
    read(superheroId: SuperheroId) {
        const superheroOrUndefined = superheroes.get(superheroId);
        return superheroOrUndefined ? Some(superheroOrUndefined) : None;
    }
    // Update a superhero.
    @update([SuperheroId, Superhero], IDL.Bool)
    update(superheroId: SuperheroId, superhero: Superhero) {
        let result = superheroes.get(superheroId);
        if (result) {
            superheroes.set(superheroId, superhero);
        }

        return !!result;
    }
    // Delete a superhero.
    @update([SuperheroId], IDL.Bool)
    deleteHero(superheroId: SuperheroId) {
        let result = superheroes.get(superheroId);
        if (result) {
            superheroes.delete(superheroId);
        }

        return !!result;
    }
}
