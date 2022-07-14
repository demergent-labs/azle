import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const MEDIUM_STING: String = `
    This is a medium sized string. It's a little bit longer than something you
    would want to have in line, even though it's much shorter than the long
    block of Lorem Ipsum below.
`;

const MEDIUM_STRING_VARIANT = MEDIUM_STING + 'v2';

const LONG_STING: String = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
    illo inventore veritatis et quasi architecto beatae vitae dicta sunt
    explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
    sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
    amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
    incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
    minima veniam, quis nostrum exercitationem ullam corporis suscipit
    laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
    iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
    consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

const LONG_STRING_VARIANT = LONG_STING + 'v2';

const benchmarks: Benchmark[] = [
    {
        canister_method: 'set',
        args: ['SHORT', 'This is a test string']
    },
    {
        canister_method: 'set',
        benchmark_description: 'medium key',
        args: [MEDIUM_STING, 'Regular value']
    },
    {
        canister_method: 'set',
        benchmark_description: 'medium value',
        args: ['MEDIUM_VALUE', MEDIUM_STING]
    },
    {
        canister_method: 'set',
        benchmark_description: 'medium value and medium key',
        args: [MEDIUM_STRING_VARIANT, MEDIUM_STING]
    },
    {
        canister_method: 'set',
        benchmark_description: 'big key',
        args: [LONG_STING, 'Regular value']
    },
    {
        canister_method: 'set',
        benchmark_description: 'big value',
        args: ['LONG_VALUE', LONG_STING]
    },
    {
        canister_method: 'set',
        benchmark_description: 'big value and big key',
        args: [LONG_STRING_VARIANT, LONG_STING]
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
