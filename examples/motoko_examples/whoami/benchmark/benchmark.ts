import { execSync } from 'child_process';
import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'id',
        args: []
    },
    {
        canister_method: 'whoami',
        args: []
    }
];

const installation_principal = execSync(`dfx identity get-principal`)
    .toString()
    .trim();

run_benchmarks(
    'GLOBAL_VALUE',
    benchmarks,
    createActorAzle,
    createActorMotoko,
    createActorRust,
    10,
    `benchmarks`,
    `'(principal "${installation_principal}")'`
);
