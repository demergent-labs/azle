import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE, Superhero } from '../src/declarations/superheroes.did';

const SPIDER_MAN: Superhero = {
    name: 'Spiderman',
    superpowers: []
};

export function getTests(superheroesCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('creates a hero without powers', async () => {
            const result = await superheroesCanister.create(SPIDER_MAN);

            expect(result).toBe(0);
        });

        it('creates a hero with powers', async () => {
            const superman: Superhero = {
                name: 'Superman',
                superpowers: [
                    [
                        'superhuman strength',
                        [['flight', [['x-ray vision', []]]]]
                    ]
                ]
            };
            const result = await superheroesCanister.create(superman);

            expect(result).toBe(1);
        });

        it('reads with a valid id', async () => {
            const result = await superheroesCanister.read(0);

            expect(result).toStrictEqual([SPIDER_MAN]);
        });

        it('reads with an invalid id', async () => {
            const result = await superheroesCanister.read(99);

            expect(result).toHaveLength(0);
        });

        it('updates when adding superpowers', async () => {
            const spiderman: Superhero = {
                name: 'Spiderman',
                superpowers: [
                    [
                        'superhuman speed',
                        [
                            [
                                'spider-sense',
                                [['wall crawling', [['web shooting', []]]]]
                            ]
                        ]
                    ]
                ]
            };
            const result = await superheroesCanister.update(0, spiderman);

            expect(result).toBe(true);
        });
        it('updates removing superpowers', async () => {
            const superman: Superhero = {
                name: 'Superman',
                superpowers: []
            };
            const result = await superheroesCanister.update(1, superman);

            expect(result).toBe(true);
        });
        it('deletes with a valid id', async () => {
            const result = await superheroesCanister.deleteHero(0);

            expect(result).toBe(true);
        });
        it('deletes with an invalid id', async () => {
            const result = await superheroesCanister.deleteHero(99);

            expect(result).toBe(false);
        });
    };
}
