import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/persistent';

const persistentStorage_canister = createActor(
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
            execSync(`dfx canister uninstall-code persistent || true`, {
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
        name: 'increment',
        test: async () => {
            const result = await persistentStorage_canister.increment();
            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'reset',
        test: async () => {
            const result = await persistentStorage_canister.reset();
            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'increment',
        test: async () => {
            const result = await persistentStorage_canister.increment();
            return {
                ok: result === 1n
            };
        }
    },
    // TODO: upgrade to DFX v0.10.x
    // {
    //     name: 'deploy (upgrade)',
    //     prep: async () => {
    //         execSync(`dfx deploy --upgrade-unchanged`, {
    //             stdio: 'inherit'
    //         });
    //     }
    // },
    {
        name: 'get',
        test: async () => {
            const result = await persistentStorage_canister.get();
            return {
                ok: result === 1n
            };
        }
    },
];

run_tests(tests);