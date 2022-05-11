import { Principal } from '@dfinity/principal';
import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/call_raw';

const call_raw_canister = createActor(
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
            execSync(`dfx canister uninstall-code call_raw_canister || true`, {
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
        name: 'execute_call_raw',
        test: async () => {
            const result = await call_raw_canister.execute_call_raw(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                [68, 73, 68, 76, 0, 0], // Candid serialization of zero values
                0n
            );

            return {
                ok: (
                    'ok' in result &&
                    result.ok.length === 42 &&
                    result.ok[0] === 68 &&
                    result.ok[1] === 73 &&
                    result.ok[2] === 68 &&
                    result.ok[3] === 76 &&
                    result.ok[4] === 1 &&
                    result.ok[5] === 109 &&
                    result.ok[6] === 123 &&
                    result.ok[7] === 1 &&
                    result.ok[8] === 0 &&
                    result.ok[9] === 32
                )
            };
        }
    }
    // TODO let's call a non-trivial function with args and a return value
    // TODO use didc encode and decode to get binary to send into call raw
];

run_tests(tests);