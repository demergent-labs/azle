import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/counter';

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
            execSync(`dfx canister uninstall-code counter || true`, {
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
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.readCount();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 2n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.incrementCount();

            return {
                ok: result === 3n
            };
        }
    },
    {
        name: 'readCount',
        test: async () => {
            const result = await counter_canister.readCount();

            return {
                ok: result === 3n
            };
        }
    }
];

run_tests(tests);