import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/minimal_dapp';

const counter_canister = createActor(
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
            execSync(`dfx canister uninstall-code minimal_dapp || true`, {
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
        name: 'init get count',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'first increment',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'second increment',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'get count',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'reset',
        test: async () => {
            const result = await counter_canister.reset();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'get count after reset',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'increment after reset',
        test: async () => {
            const result = await counter_canister.count();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'get count after first increment after reset',
        test: async () => {
            const result = await counter_canister.getCount();

            return {
                ok: result === 1n
            };
        }
    },
];

run_tests(tests);