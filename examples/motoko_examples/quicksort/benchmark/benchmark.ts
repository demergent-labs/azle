import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'sort',
        benchmark_description: 'empty list',
        args: [[]]
    },
    {
        canister_method: 'sort',
        benchmark_description: 'one item',
        args: [[5]]
    },
    {
        canister_method: 'sort',
        benchmark_description: 'two item',
        args: [[10, 5]]
    },
    {
        canister_method: 'sort',
        benchmark_description: 'ten items',
        args: [[5, 3, 0, 9, 8, 2, 1, 4, 7, 6]]
    },
    {
        canister_method: 'sort',
        benchmark_description: 'negative numbers',
        args: [[1, -3, -1, 0, -2, 2, 3]]
    },
    {
        canister_method: 'sort',
        benchmark_description: '100 items',
        args: [
            [
                9584, 8108, 864, 1770, -5264, 3754, 533, 7066, 327, 1954, -9640,
                -2083, -2313, -6144, 7129, -1253, 5743, 6074, -7414, 8684, 7169,
                8667, -9966, 2926, 4508, -1942, -8647, 1022, -1233, -6431,
                -4763, 8918, 2565, 6454, -1750, -1157, 8689, -7276, 6144, 254,
                -2932, 9251, -2160, 1100, -8593, 7402, -8244, 9597, 8259, -5934,
                59, 3422, -157, 1687, 386, -9506, 254, 335, 9431, -6158, -604,
                2976, -401, 5059, 6347, 8822, 1166, -2862, -9004, 2260, -7308,
                -6743, -5527, -1228, -9554, 820, 3509, -7800, -1236, 1222, 219,
                -3624, 5098, 3542, 7438, 1275, 6413, 7707, 8612, 3130, -4618,
                1060, -8579, 8199, -7479, -6246, -9960, -2316, -4899, -9849
            ]
        ]
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
