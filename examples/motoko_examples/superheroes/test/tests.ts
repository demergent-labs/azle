import { Test } from 'azle/test';
import { _SERVICE, Superhero } from '../src/declarations/superheroes.did';
import { ActorSubclass } from '@dfinity/agent';

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

                return {
                    Ok: result === 0
                };
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

                return {
                    Ok: result === 1
                };
            }
        },
        {
            name: 'read with a valid id',
            test: async () => {
                const result = await superheroesCanister.read(0);

                return {
                    Ok:
                        result[0] !== undefined &&
                        result[0].name === 'Spiderman'
                };
            }
        },
        {
            name: 'read with an invalid id',
            test: async () => {
                const result = await superheroesCanister.read(99);

                return {
                    Ok: result.length === 0
                };
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

                return {
                    Ok: result === true
                };
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

                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'delete with a valid id',
            test: async () => {
                const result = await superheroesCanister.deleteHero(0);

                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'delete with an invalid id',
            test: async () => {
                const result = await superheroesCanister.deleteHero(99);

                return {
                    Ok: result === false
                };
            }
        }
    ];
}
