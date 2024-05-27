import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE, Superhero } from '../src/declarations/superheroes.did';

export function getTests(superheroesCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'create hero without powers',
            test: async () => {
                const spiderman: Superhero = {
                    name: 'Spiderman',
                    superpowers: []
                };
                const result = await superheroesCanister.create(spiderman);

                return testEquality(result, 0);
            }
        },
        {
            name: 'create hero with powers',
            test: async () => {
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

                return testEquality(result, 1);
            }
        },
        {
            name: 'read with a valid id',
            test: async () => {
                const result = await superheroesCanister.read(0);

                return testEquality(result, [
                    { name: 'Spiderman', superpowers: [] }
                ]);
            }
        },
        {
            name: 'read with an invalid id',
            test: async () => {
                const result = await superheroesCanister.read(99);

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'update when adding superpowers',
            test: async () => {
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

                return test(result);
            }
        },
        {
            name: 'update removing superpowers',
            test: async () => {
                const superman: Superhero = {
                    name: 'Superman',
                    superpowers: []
                };
                const result = await superheroesCanister.update(1, superman);

                return test(result);
            }
        },
        {
            name: 'delete with a valid id',
            test: async () => {
                const result = await superheroesCanister.deleteHero(0);

                return test(result);
            }
        },
        {
            name: 'delete with an invalid id',
            test: async () => {
                const result = await superheroesCanister.deleteHero(99);

                return test(result === false);
            }
        }
    ];
}
