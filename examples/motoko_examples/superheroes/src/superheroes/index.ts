import {
    bool,
    candid,
    nat32,
    None,
    Opt,
    query,
    record,
    Record,
    Some,
    text,
    Tuple,
    update
} from 'azle';

// Note: This won't be reflected in the candid until
export type SuperheroId = nat32;
const SuperheroId = nat32;

// The type of a superhero.
@record
class Superhero extends Record {
    @candid(text)
    name: text;

    @candid(Opt(List))
    superpowers: Opt<List>;
}

export type List = [text, Opt<List>];
const List: List = Tuple(text, Opt(List));

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
    create(superhero: Superhero): SuperheroId {
        let superheroId = next;
        next += 1;
        superheroes.set(superheroId, superhero);

        return superheroId;
    }

    // Read a superhero.
    @query([SuperheroId], Opt(Superhero))
    read(superheroId: SuperheroId): Opt<Superhero> {
        const superheroOrUndefined = superheroes.get(superheroId);
        return superheroOrUndefined ? Some(superheroOrUndefined) : None;
    }

    // Update a superhero.
    @update([SuperheroId, Superhero], bool)
    update(superheroId: SuperheroId, superhero: Superhero): bool {
        let result = superheroes.get(superheroId);
        if (result) {
            superheroes.set(superheroId, superhero);
        }

        return !!result;
    }

    // Delete a superhero.
    @update([SuperheroId], bool)
    deleteHero(superheroId: SuperheroId): bool {
        let result = superheroes.get(superheroId);
        if (result) {
            superheroes.delete(superheroId);
        }

        return !!result;
    }
}
