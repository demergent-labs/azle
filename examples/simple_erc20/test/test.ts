import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/simple_erc20';

const simple_erc20_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code simple_erc20 || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'empty name',
        test: async () => {
            const result = await simple_erc20_canister.name();

            return {
                ok: result === ''
            };
        }
    },
    {
        name: 'empty ticker',
        test: async () => {
            const result = await simple_erc20_canister.ticker();

            return {
                ok: result === ''
            };
        }
    },
    {
        name: 'empty totalSupply',
        test: async () => {
            const result = await simple_erc20_canister.totalSupply();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'empty balance of id 0',
        test: async () => {
            const result = await simple_erc20_canister.balance('0');

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'initializeSupply',
        test: async () => {
            const result = await simple_erc20_canister.initializeSupply(
                'TOKEN',
                'Token',
                1_000_000n,
                '0'
            );

            return {
                ok: result === true
            };
        }
    },
    {
        name: 'initialized name',
        test: async () => {
            const result = await simple_erc20_canister.name();

            return {
                ok: result === 'Token'
            };
        }
    },
    {
        name: 'initialized ticker',
        test: async () => {
            const result = await simple_erc20_canister.ticker();

            return {
                ok: result === 'TOKEN'
            };
        }
    },
    {
        name: 'initialized totalSupply',
        test: async () => {
            const result = await simple_erc20_canister.totalSupply();

            return {
                ok: result === 1_000_000n
            };
        }
    },
    {
        name: 'initialized balance of id 0',
        test: async () => {
            const result = await simple_erc20_canister.balance('0');

            return {
                ok: result === 1_000_000n
            };
        }
    },
    {
        name: 'transfer',
        test: async () => {
            const result = await simple_erc20_canister.transfer(
                '0',
                '1',
                100n
            );

            return {
                ok: result === true
            };
        }
    },
    {
        name: 'balance of id 0 after transfer',
        test: async () => {
            const result = await simple_erc20_canister.balance('0');

            return {
                ok: result === 999_900n
            };
        }
    },
    {
        name: 'balance of id 1 after transfer',
        test: async () => {
            const result = await simple_erc20_canister.balance('1');

            return {
                ok: result === 100n
            };
        }
    }
];

run_tests(tests);