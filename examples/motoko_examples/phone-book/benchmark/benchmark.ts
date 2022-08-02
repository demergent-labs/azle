import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { Entry } from '../canisters/azle';
import { createActor as createActorAzle } from '../dfx_generated/azle';
import { createActor as createActorMotoko } from '../dfx_generated/motoko';
import { createActor as createActorRust } from '../dfx_generated/rust';

const SHORT_TEST_PHONE_BOOK_RECORD: Entry = {
    desc: 'This is a test record',
    phone: '555-555-5555'
};

const MEDIUM_TEST_PHONE_BOOK_RECORD: Entry = {
    desc: `This is a test record, with a little bit longer description. It will
    be much shorter than the Lorem ipsum example but substantially longer than
    the short test. I think this length will do the trick, or maybe just a
    little longer`,
    phone: '555-555-5555'
};

const LONG_TEST_PHONE_BOOK_RECORD: Entry = {
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
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
    consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
    phone: '555-555-5555'
};

const benchmarks: Benchmark[] = [
    {
        canister_method: 'insert',
        args: ['Test', SHORT_TEST_PHONE_BOOK_RECORD]
    },
    {
        canister_method: 'insert',
        benchmark_description: 'medium description',
        args: ['Paul Pared IV', MEDIUM_TEST_PHONE_BOOK_RECORD]
    },
    {
        canister_method: 'insert',
        benchmark_description: 'long description',
        args: ['Lorem ipsum', LONG_TEST_PHONE_BOOK_RECORD]
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
