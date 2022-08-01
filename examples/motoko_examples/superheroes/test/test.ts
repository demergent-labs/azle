import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { Superhero } from '../dfx_generated/azle/azle.did';

const superheroes_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
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
                ok: result[0] !== undefined && result[0].name === 'Spiderman'
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
            const result = await superheroes_canister.update(0, spiderman);

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
            const result = await superheroes_canister.update(1, superman);

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

run_tests(tests);
