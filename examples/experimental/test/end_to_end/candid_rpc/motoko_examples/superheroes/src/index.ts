import {
    bool,
    Canister,
    nat32,
    None,
    Opt,
    query,
    Record,
    Recursive,
    Some,
    text,
    Tuple,
    update
} from 'azle/experimental';

// Note: This won't be reflected in the candid
export type SuperheroId = nat32;
const SuperheroId = nat32;

const List = Recursive(() => Tuple(text, Opt(List)));

// The type of a superhero.
const Superhero = Record({
    name: text,
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
export default Canister({
    // Create a superhero.
    create: update([Superhero], SuperheroId, (superhero) => {
        let superheroId = next;
        next += 1;
        superheroes.set(superheroId, superhero);

        return superheroId;
    }),
    // Read a superhero.
    read: query([SuperheroId], Opt(Superhero), (superheroId) => {
        const superheroOrUndefined = superheroes.get(superheroId);
        return superheroOrUndefined ? Some(superheroOrUndefined) : None;
    }),
    // Update a superhero.
    update: update([SuperheroId, Superhero], bool, (superheroId, superhero) => {
        let result = superheroes.get(superheroId);
        if (result !== undefined) {
            superheroes.set(superheroId, superhero);
        }

        return !!result;
    }),
    // Delete a superhero.
    deleteHero: update([SuperheroId], bool, (superheroId) => {
        let result = superheroes.get(superheroId);
        if (result !== undefined) {
            superheroes.delete(superheroId);
        }

        return !!result;
    })
});
