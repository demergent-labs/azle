import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'set',
        benchmark_description: 'max',
        args: [340_282_366_920_938_463_463_374_607_431_768_211_455n]
    },
    {
        canister_method: 'set',
        benchmark_description: 'middle',
        args: [18_446_744_073_709_551_615n]
    },
    {
        canister_method: 'set',
        benchmark_description: 'min',
        args: [0]
    },
    {
        canister_method: 'inc',
        args: []
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
