import {
    bool,
    candid,
    nat32,
    None,
    Opt,
    query,
    record,
    Record,
    Service,
    Some,
    text,
    Tuple,
    update
} from 'azle';

// Note: This won't be reflected in the candid until
export type SuperheroId = nat32;
const SuperheroId = nat32;

export type List = [text, Opt<List>];
const List: List = Tuple(text, Opt(List));

// The type of a superhero.
@record
class Superhero extends Record {
    @candid(text)
    name: text;

    @candid(Opt(List))
    superpowers: Opt<List>;
}

/**
 * High-Level API
 */
export default class extends Service {
    /**
     * Application State
     */

    // The next available superhero identifier.
    next: SuperheroId = 0;

    // The superhero data store.
    superheroes: Map<SuperheroId, Superhero> = new Map();

    // Create a superhero.
    @update([Superhero], SuperheroId)
    create(superhero: Superhero): SuperheroId {
        let superheroId = this.next;
        this.next += 1;
        this.superheroes.set(superheroId, superhero);

        return superheroId;
    }

    // Read a superhero.
    @query([SuperheroId], Opt(Superhero))
    read(superheroId: SuperheroId): Opt<Superhero> {
        const superheroOrUndefined = this.superheroes.get(superheroId);
        return superheroOrUndefined ? Some(superheroOrUndefined) : None;
    }

    // Update a superhero.
    @update([SuperheroId, Superhero], bool)
    update(superheroId: SuperheroId, superhero: Superhero): bool {
        let result = this.superheroes.get(superheroId);
        if (result) {
            this.superheroes.set(superheroId, superhero);
        }

        return !!result;
    }

    // Delete a superhero.
    @update([SuperheroId], bool)
    deleteHero(superheroId: SuperheroId): bool {
        let result = this.superheroes.get(superheroId);
        if (result) {
            this.superheroes.delete(superheroId);
        }

        return !!result;
    }
}
