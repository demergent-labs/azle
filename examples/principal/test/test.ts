import { Principal } from '@dfinity/principal';
import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/principal';

const principal_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const from_hex_tests = get_from_hex_tests();
const from_text_tests = get_from_text_tests();
const from_uint8array_tests = get_from_uint8array_tests();
const to_hex_tests = get_to_hex_tests();
const to_text_tests = get_to_text_tests();
const to_uint8array_tests = get_to_uint8array_tests();

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code query || true`, {
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
        name: 'principal_return_type',
        test: async () => {
            const result = await principal_canister.principal_return_type();

            return {
                ok: result.toText() === 'aaaaa-aa'
            };
        }
    },
    {
        name: 'principal_param',
        test: async () => {
            const result = await principal_canister.principal_param(Principal.fromText('aaaaa-aa'));

            return {
                ok: result.toText() === 'aaaaa-aa'
            };
        }
    },
    ...from_hex_tests,
    ...from_text_tests,
    ...from_uint8array_tests,
    ...to_hex_tests,
    ...to_text_tests,
    ...to_uint8array_tests
];

run_tests(tests);

function get_from_hex_tests(): Test[] {
    return [];
}

function get_from_text_tests(): Test[] {
    return [];
}

function get_from_uint8array_tests(): Test[] {
    return [];
}

function get_to_hex_tests(): Test[] {
    return [
        {
            name: 'to_hex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');
    
                const result = await principal_canister.principal_to_hex(principal);
    
                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'to_hex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
    
                const result = await principal_canister.principal_to_hex(principal);
    
                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'to_hex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');
    
                const result = await principal_canister.principal_to_hex(principal);
    
                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'to_hex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');
    
                const result = await principal_canister.principal_to_hex(principal);
        
                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'to_hex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');
    
                const result = await principal_canister.principal_to_hex(principal);
        
                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'to_hex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText('qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe');
    
                const result = await principal_canister.principal_to_hex(principal);
        
                return {
                    ok: result === principal.toHex()
                };
            }
        }
    ];
}

function get_to_text_tests(): Test[] {
    return [];
}

function get_to_uint8array_tests(): Test[] {
    return [];
}