// TODO it would be nice to split up the table into categories so it isn't just one huge list
// TODO maybe we should also have a CSV output for people so they can run math and stuff

import { run_benchmarks, Benchmark } from 'azle/benchmark';
import { createActor as createActorAzle } from './dfx_generated/azle';
import { createActor as createActorRust } from './dfx_generated/rust';

const azle_canister = createActorAzle('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const rust_canister = createActorRust('ryjl3-tyaaa-aaaaa-aaaba-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const benchmarks: Benchmark[] = [
    ...get_boolean_benchmarks(),
    ...get_nat_benchmarks()
];

run_benchmarks(
    benchmarks,
    azle_canister,
    rust_canister,
    `benchmarks.md`,
    process.argv[2] !== 'no-setup'
);

function get_boolean_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '0',
            args: [0]
        },
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '0',
            args: [0]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '0',
            args: [0]
        },
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '0',
            args: [0]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}