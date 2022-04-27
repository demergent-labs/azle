import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code calc || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call calc add '(5)'`,
        expectedOutputBash: `echo "(5 : int)"`
    },
    {
        bash: `dfx canister call calc sub '(2)'`,
        expectedOutputBash: `echo "(3 : int)"`
    },
    {
        bash: `dfx canister call calc mul '(6)'`,
        expectedOutputBash: `echo "(18 : int)"`
    },
    {
        bash: `dfx canister call calc div '(2)'`,
        expectedOutputBash: `echo "(opt (9 : int))"`
    },
    {
        bash: `dfx canister call calc clearall`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call calc add '(0)'`,
        expectedOutputBash: `echo "(0 : int)"`
    }
];

run_tests(tests);