import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'create',
        benchmark_description: 'with no powers',
        args: [
            {
                name: 'Spiderman',
                superpowers: []
            }
        ]
    },
    {
        canister_method: 'create',
        benchmark_description: 'with powers',
        args: [
            {
                name: 'Superman',
                superpowers: [
                    [
                        'superhuman strength',
                        [['flight', [['x-ray vision', []]]]]
                    ]
                ]
            }
        ]
    },
    {
        canister_method: 'update',
        benchmark_description: 'nonexistent superhero',
        args: [
            99,
            {
                name: 'The Flash',
                superpowers: []
            }
        ]
    },
    {
        canister_method: 'update',
        benchmark_description: 'add powers',
        args: [
            0,
            {
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
            }
        ]
    },
    {
        canister_method: 'update',
        benchmark_description: 'remove powers',
        args: [
            1,
            {
                name: 'Superman',
                superpowers: []
            }
        ]
    },
    {
        canister_method: 'delete_hero',
        benchmark_description: 'nonexistent superhero',
        args: [99]
    },
    {
        canister_method: 'delete_hero',
        benchmark_description: 'superhero with powers',
        args: [0]
    },
    {
        canister_method: 'delete_hero',
        benchmark_description: 'superhero without powers',
        args: [1]
    }
];

// Because the args to each method are always the same, running the
// `delete_hero` method over and over again will result in mostly deleting
// nonexistent heroes, which isn't what we want for the last two scenarios. So,
// to more clearly illustrate the difference between the different deletion
// scenarios, we're only doing a single run for now.
const iterations = 1;

run_benchmarks(
    'GLOBAL_VALUE',
    benchmarks,
    createActorAzle,
    createActorMotoko,
    createActorRust,
    iterations,
    `benchmarks`
);
