import { IDL, query, update } from 'azle';

// Note: This won't be reflected in the candid
export type SuperheroId = number;
const SuperheroId = IDL.Nat32;

const List = IDL.Rec();
List.fill(IDL.Tuple(IDL.Text, IDL.Opt(List)));
type List = [Text, [List] | []];

// The type of a superhero.
const Superhero = IDL.Record({
    name: IDL.Text,
    superpowers: IDL.Opt(List)
});
type Superhero = {
    name: string;
    superpowers: [List] | [];
};

/**
 * High-Level API
 */
export default class {
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
    @query([SuperheroId], IDL.Opt(Superhero))
    read(superheroId: SuperheroId): [Superhero] | [] {
        const superheroOrUndefined = this.superheroes.get(superheroId);
        return superheroOrUndefined ? [superheroOrUndefined] : [];
    }

    // Update a superhero.
    @update([SuperheroId, Superhero], IDL.Bool)
    update(superheroId: SuperheroId, superhero: Superhero): boolean {
        let result = this.superheroes.get(superheroId);
        if (result) {
            this.superheroes.set(superheroId, superhero);
        }

        return !!result;
    }

    // Delete a superhero.
    @update([SuperheroId], IDL.Bool)
    deleteHero(superheroId: SuperheroId): boolean {
        let result = this.superheroes.get(superheroId);
        if (result) {
            this.superheroes.delete(superheroId);
        }

        return !!result;
    }
}
