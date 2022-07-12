import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { execSync } from 'child_process';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

// TODO a simple exec_sync could get us these ids in a less fragile way
const azle_canister = createActorAzle(
    execSync('dfx canister id azle').toString().trim(),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const motoko_canister = createActorMotoko(
    execSync('dfx canister id motoko').toString().trim(),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const rust_canister = createActorRust(
    execSync('dfx canister id rust').toString().trim(),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const benchmarks: Benchmark[] = [
    {
        canister_method: 'get_bytes',
        benchmark_description: '0',
        args: [[]]
    }
];

run_benchmarks(
    benchmarks,
    azle_canister,
    motoko_canister,
    rust_canister,
    10,
    `benchmarks`
);
