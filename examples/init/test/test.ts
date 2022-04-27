import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code init || true'
    },
    {
        bash: `dfx deploy --argument '(record { id = "0" }, variant { Fire }, principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`
    },
    {
        bash: `dfx canister call init getUser`,
        expectedOutputBash: `echo "(opt record { id = \\"0\\" })"`
    },
    {
        bash: `dfx canister call init getReaction`,
        expectedOutputBash: `echo "(opt variant { Fire })"`
    },
    {
        bash: `dfx canister call init getOwner`,
        expectedOutputBash: `echo "(opt principal \\"rrkah-fqaaa-aaaaa-aaaaq-cai\\")"`
    }
];

run_tests(tests);