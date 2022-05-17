import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/echo';

const echo_canister = createActor(
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
            execSync(`dfx canister uninstall-code echo || true`, {
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
        name: 'say',
        test: async () => {
            const phrase = "This is a test."
            const result = await echo_canister.say(phrase);

            return {
                ok: result === phrase
            };
        }
    }
];

run_tests(tests);
