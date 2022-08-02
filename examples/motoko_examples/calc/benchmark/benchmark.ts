import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'add',
        benchmark_description: 'small',
        args: [1]
    },
    {
        canister_method: 'add',
        benchmark_description: 'large',
        args: [1_000_000_000_000_000]
    },
    {
        canister_method: 'sub',
        benchmark_description: 'small',
        args: [1]
    },
    {
        canister_method: 'sub',
        benchmark_description: 'large',
        args: [1_000_000_000_000_000]
    },
    {
        canister_method: 'mul',
        benchmark_description: 'small',
        args: [1]
    },
    {
        canister_method: 'mul',
        benchmark_description: 'large',
        args: [1_000_000_000_000_000]
    },
    {
        canister_method: 'div',
        benchmark_description: 'small',
        args: [1]
    },
    {
        canister_method: 'div',
        benchmark_description: 'zero',
        args: [0]
    },
    {
        canister_method: 'div',
        benchmark_description: 'large',
        args: [1_000_000_000_000_000]
    },
    {
        canister_method: 'clearall',
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
