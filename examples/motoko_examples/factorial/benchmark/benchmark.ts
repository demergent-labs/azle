import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'fac',
        benchmark_description: '0',
        args: [0]
    },
    {
        canister_method: 'fac',
        benchmark_description: '5',
        args: [5]
    },
    {
        canister_method: 'fac',
        benchmark_description: '20',
        args: [20]
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
