import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';
import { readFileSync } from 'fs';

const file_1_kb = Array.from(
    readFileSync('./test/example_files/example_1_kb.txt')
);

const file_10_kb = Array.from(
    readFileSync('./test/example_files/example_10_kb.txt')
);

const file_100_kb = Array.from(
    readFileSync('./test/example_files/example_100_kb.txt')
);

const file_1000_kb = Array.from(
    readFileSync('./test/example_files/example_1000_kb.txt')
);

const file_2000_kb = Array.from(
    readFileSync('./test/example_files/example_2000_kb.txt')
);

const benchmarks: Benchmark[] = [
    {
        canister_method: 'get_bytes',
        benchmark_description: '0 kb',
        args: [[]]
    },
    {
        canister_method: 'get_bytes',
        benchmark_description: '1 kb',
        args: [file_1_kb]
    },
    {
        canister_method: 'get_bytes',
        benchmark_description: '10 kb',
        args: [file_10_kb]
    },
    {
        canister_method: 'get_bytes',
        benchmark_description: '100 kb',
        args: [file_100_kb]
    },
    {
        canister_method: 'get_bytes',
        benchmark_description: '1_000 kb',
        args: [file_1000_kb]
    },
    {
        canister_method: 'get_bytes',
        benchmark_description: '2_000 kb',
        args: [file_2000_kb]
    }
];

run_benchmarks(
    'GLOBAL_VALUE',
    benchmarks,
    createActorAzle,
    createActorMotoko,
    createActorRust,
    10,
    `benchmarks`
);
