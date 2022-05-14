import { Principal } from '@dfinity/principal';
import {
    ok,
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
        name: 'execute_call_raw raw_rand',
        test: async () => {
            const candid_encoded_arguments_hex_string = execSync(`./target/bin/didc encode '()'`).toString().trim();
            const candid_encoded_arguments_byte_array = candid_encoded_arguments_hex_string.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];

            const result = await call_raw_canister.execute_call_raw(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                candid_encoded_arguments_byte_array,
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
    },
    {
        name: 'execute_call_raw create_canister',
        test: async () => {
            const candid_encoded_arguments_hex_string = execSync(`./target/bin/didc encode '(record { settings = null })'`).toString().trim();
            const candid_encoded_arguments_byte_array = candid_encoded_arguments_hex_string.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];

            const result = await call_raw_canister.execute_call_raw(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                candid_encoded_arguments_byte_array,
                0n
            );
    
            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            const result_hex_string = result.ok.map((uint) => uint.toString(16).padStart(2, '0')).join('');

            const candid_decoded_result = execSync(`./target/bin/didc decode ${result_hex_string}`).toString().trim();

            return {
                ok: (
                    candid_decoded_result.includes('record') &&
                    candid_decoded_result.includes('principal')
                )
            };
        }
    },
    {
        name: 'execute_call_raw128 raw_rand',
        test: async () => {
            const candid_encoded_arguments_hex_string = execSync(`./target/bin/didc encode '()'`).toString().trim();
            const candid_encoded_arguments_byte_array = candid_encoded_arguments_hex_string.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];

            const result = await call_raw_canister.execute_call_raw128(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                candid_encoded_arguments_byte_array,
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
    },
    {
        name: 'execute_call_raw128 create_canister',
        test: async () => {
            const candid_encoded_arguments_hex_string = execSync(`./target/bin/didc encode '(record { settings = null })'`).toString().trim();
            const candid_encoded_arguments_byte_array = candid_encoded_arguments_hex_string.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];

            const result = await call_raw_canister.execute_call_raw128(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                candid_encoded_arguments_byte_array,
                0n
            );
    
            if (!ok(result)) {
                return {
                    err: result.err
                };
            }

            const result_hex_string = result.ok.map((uint) => uint.toString(16).padStart(2, '0')).join('');

            const candid_decoded_result = execSync(`./target/bin/didc decode ${result_hex_string}`).toString().trim();

            return {
                ok: (
                    candid_decoded_result.includes('record') &&
                    candid_decoded_result.includes('principal')
                )
            };
        }
    }
];

run_tests(tests);