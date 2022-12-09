import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/principal/principal.did';

export function get_tests(principal_canister: ActorSubclass<_SERVICE>): Test[] {
    const from_hex_tests = get_from_hex_tests(principal_canister);
    const from_text_tests = get_from_text_tests(principal_canister);
    const from_blob_tests = get_from_blob_tests(principal_canister);
    const to_hex_tests = get_to_hex_tests(principal_canister);
    const to_text_tests = get_to_text_tests(principal_canister);
    const to_blob_tests = get_to_blob_tests(principal_canister);
    const self_authenticating_tests =
        get_self_authenticating_tests(principal_canister);

    return [
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
        ...from_blob_tests,
        ...to_hex_tests,
        ...to_text_tests,
        ...to_blob_tests,
        ...self_authenticating_tests
    ];
}

function get_from_hex_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
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

function get_from_text_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
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

function get_from_blob_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'principal_from_blob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_blob rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_blob ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_blob jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_blob jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principal_from_blob qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_from_blob(
                    principal.toUint8Array()
                );

                return {
                    ok: result.toText() === principal.toText()
                };
            }
        }
    ];
}

function get_to_hex_tests(principal_canister: ActorSubclass<_SERVICE>): Test[] {
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

function get_to_text_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
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

function get_to_blob_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'principal_to_blob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principal_canister.principal_to_blob(
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
            name: 'principal_to_blob rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principal_canister.principal_to_blob(
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
            name: 'principal_to_blob ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principal_canister.principal_to_blob(
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
            name: 'principal_to_blob jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principal_canister.principal_to_blob(
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
            name: 'principal_to_blob jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principal_canister.principal_to_blob(
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
            name: 'principal_to_blob qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principal_canister.principal_to_blob(
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

function get_self_authenticating_tests(
    principal_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'principal_self_authenticating aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        'o2x4y-ywrji-biykr-2fpeu-oyicx-muien-gecwr-lah4c-r2tcv-rnt4q-xqe'
                };
            }
        },
        {
            name: 'principal_self_authenticating rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        '5lxmd-uwt2d-ectu2-srh3d-l4np5-n6w32-3ctg2-pdf5v-vg5vu-do25a-oae'
                };
            }
        },
        {
            name: 'principal_self_authenticating ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        'w2hw6-vz32b-dpt2b-afpwq-2ip32-hki4g-tbzcp-7zifb-suydo-jad42-5ae'
                };
            }
        },
        {
            name: 'principal_self_authenticating jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        'vagij-vhj5f-jmcqm-6sfyr-onklf-d6rjs-oikld-4jlr6-jnf4k-a25k7-bae'
                };
            }
        },
        {
            name: 'principal_self_authenticating jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        'hp4bt-rgpk2-27zh7-4bhef-fz4v7-zwrfd-3tbnz-wgy2i-pzjui-os54t-5ae'
                };
            }
        },
        {
            name: 'principal_self_authenticating qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principal_canister.principal_self_authenticating(
                        principal.toUint8Array()
                    );

                return {
                    ok:
                        result.toText() ===
                        'e5rvd-hgfjt-aclta-o3few-2p3fo-txhpm-ypb2i-ex56n-l6brh-jnvja-4ae'
                };
            }
        }
    ];
}
