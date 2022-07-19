import { Principal } from '@dfinity/principal';
import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/principal';

const principal_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const from_hex_tests = get_from_hex_tests();
const from_text_tests = get_from_text_tests();
const from_uint8array_tests = get_from_uint8array_tests();
const to_hex_tests = get_to_hex_tests();
const to_text_tests = get_to_text_tests();
const to_uint8array_tests = get_to_uint8array_tests();

const tests: Test[] = [
    ...deploy('principal'),
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
            const result = await principal_canister.principal_param(
                Principal.fromText('aaaaa-aa')
            );

            return {
                ok: result.toText() === 'aaaaa-aa'
            };
        }
    },
    {
        name: 'principal_in_record',
        test: async () => {
            const result = await principal_canister.principal_in_record();

            return {
                ok: result.id.toText() === 'aaaaa-aa'
            };
        }
    },
    {
        name: 'principal_in_variant',
        test: async () => {
            const result = await principal_canister.principal_in_variant();

            return {
                ok:
                    'WaitingOn' in result &&
                    result.WaitingOn.toText() === 'aaaaa-aa'
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
    return [
        {
            name: 'principal_from_hex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principal_from_hex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principal_from_hex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principal_from_hex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principal_from_hex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principal_from_hex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_from_hex(
                    principal.toHex()
                );

                return {
                    ok: result.toHex() === principal.toHex()
                };
            }
        }
    ];
}

function get_from_text_tests(): Test[] {
    return [
        {
            name: 'principal_from_text aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_text rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_text ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_text jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_text jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_text qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_from_text(
                    principal.toText()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        }
    ];
}

function get_from_uint8array_tests(): Test[] {
    return [
        {
            name: 'principal_from_uint8array aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_uint8array rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_uint8array ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_uint8array jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_uint8array jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_uint8array qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principal_canister.principal_from_uint8array(
                        Array.from(principal.toUint8Array())
                    );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        }
    ];
}

function get_to_hex_tests(): Test[] {
    return [
        {
            name: 'principal_to_hex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principal_to_hex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principal_to_hex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principal_to_hex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principal_to_hex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principal_to_hex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_to_hex(
                    principal
                );

                return {
                    ok: result === principal.toHex()
                };
            }
        }
    ];
}

function get_to_text_tests(): Test[] {
    return [
        {
            name: 'principal_to_text aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_text rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_text ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_text jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_text jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_text qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_to_text(
                    principal
                );

                return {
                    ok: result === principal.toText()
                };
            }
        }
    ];
}

function get_to_uint8array_tests(): Test[] {
    return [
        {
            name: 'principal_to_uint8array aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_uint8array rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_uint8array ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_uint8array jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_uint8array jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_to_uint8array qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_to_uint8array(
                    principal
                );

                return {
                    ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        }
    ];
}
