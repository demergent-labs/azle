import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/key_value_store';

const key_value_store_canister = createActor(
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
            execSync(`dfx canister uninstall-code key_value_store || true`, {
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
        name: 'get 0',
        test: async () => {
            const result = await key_value_store_canister.get('0');

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'get 1',
        test: async () => {
            const result = await key_value_store_canister.get('1');

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'set 0',
        test: async () => {
            const result = await key_value_store_canister.set('0', 'zero');

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'set 1',
        test: async () => {
            const result = await key_value_store_canister.set('1', 'one');

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get 0',
        test: async () => {
            const result = await key_value_store_canister.get('0');

            return {
                ok: (
                    result.length === 1 &&
                    result[0] === 'zero'
                )
            };
        }
    },
    {
        name: 'get 1',
        test: async () => {
            const result = await key_value_store_canister.get('1');

            return {
                ok: (
                    result.length === 1 &&
                    result[0] === 'one'
                )
            };
        }
    }
];

run_tests(tests);