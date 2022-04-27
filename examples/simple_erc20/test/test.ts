import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code simple_erc20 || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call simple_erc20 name`,
        expectedOutputBash: `echo "(\\"\\")"`
    },
    {
        bash: `dfx canister call simple_erc20 ticker`,
        expectedOutputBash: `echo "(\\"\\")"`
    },
    {
        bash: `dfx canister call simple_erc20 totalSupply`,
        expectedOutputBash: `echo "(0 : nat64)"`
    },
    {
        bash: `dfx canister call simple_erc20 balance '("0")'`,
        expectedOutputBash: `echo "(0 : nat64)"`
    },
    {
        bash: `dfx canister call simple_erc20 initializeSupply '("TOKEN", "Token", 1_000_000, "0")'`,
        expectedOutputBash: `echo "(true)"`
    },
    {
        bash: `dfx canister call simple_erc20 name`,
        expectedOutputBash: `echo "(\\"Token\\")"`
    },
    {
        bash: `dfx canister call simple_erc20 ticker`,
        expectedOutputBash: `echo "(\\"TOKEN\\")"`
    },
    {
        bash: `dfx canister call simple_erc20 totalSupply`,
        expectedOutputBash: `echo "(1_000_000 : nat64)"`
    },
    {
        bash: `dfx canister call simple_erc20 balance '("0")'`,
        expectedOutputBash: `echo "(1_000_000 : nat64)"`
    },
    {
        bash: `dfx canister call simple_erc20 transfer '("0", "1", 100)'`,
        expectedOutputBash: `echo "(true)"`
    },
    {
        bash: `dfx canister call simple_erc20 balance '("0")'`,
        expectedOutputBash: `echo "(999_900 : nat64)"`
    },
    {
        bash: `dfx canister call simple_erc20 balance '("1")'`,
        expectedOutputBash: `echo "(100 : nat64)"`
    }
];

run_tests(tests);