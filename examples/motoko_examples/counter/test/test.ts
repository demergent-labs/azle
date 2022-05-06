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
        name: 'get',
        test: async () => {
            const result = await counter_canister.get();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.set(10n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.inc();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.inc();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get',
        test: async () => {
            const result = await counter_canister.get();

            return {
                ok: result === 12n
            };
        }
    }
];

run_tests(tests);