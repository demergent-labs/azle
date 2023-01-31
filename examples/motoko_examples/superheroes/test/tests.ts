import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { Superhero } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    superheroes_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'create hero without powers',
            test: async () => {
                const spiderman: Superhero = {
                    name: 'Spiderman',
                    superpowers: []
                };
                const result = await superheroes_canister.create(spiderman);

                return {
                    ok: result === 0
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
                const result = await superheroes_canister.create(superman);

                return {
                    ok: result === 1
                };
            }
        },
        {
            name: 'read with a valid id',
            test: async () => {
                const result = await superheroes_canister.read(0);

                return {
                    ok:
                        result[0] !== undefined &&
                        result[0].name === 'Spiderman'
                };
            }
        },
        {
            name: 'read with an invalid id',
            test: async () => {
                const result = await superheroes_canister.read(99);

                return {
                    ok: result.length === 0
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
                const result = await superheroes_canister.update_(0, spiderman);

                return {
                    ok: result === true
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
                const result = await superheroes_canister.update_(1, superman);

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'delete with a valid id',
            test: async () => {
                const result = await superheroes_canister.delete_hero(0);

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'delete with an invalid id',
            test: async () => {
                const result = await superheroes_canister.delete_hero(99);

                return {
                    ok: result === false
                };
            }
        }
    ];
}
