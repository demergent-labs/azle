import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/principal/principal.did';

export function getTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    const fromHexTests = getFromHexTests(principalCanister);
    const fromTextTests = getFromTextTests(principalCanister);
    const fromBlobTests = getFromBlobTests(principalCanister);
    const toHexTests = getToHexTests(principalCanister);
    const toTextTests = getToTextTests(principalCanister);
    const toBlobTests = getToBlobTests(principalCanister);
    const selfAuthenticatingTests =
        getSelfAuthenticatingTests(principalCanister);

    return [
        {
            name: 'principalReturnType',
            test: async () => {
                const result = await principalCanister.principalReturnType();

                return {
                    Ok: result.toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'principalParam',
            test: async () => {
                const result = await principalCanister.principalParam(
                    Principal.fromText('aaaaa-aa')
                );

                return {
                    Ok: result.toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'principalInRecord',
            test: async () => {
                const result = await principalCanister.principalInRecord();

                return {
                    Ok: result.id.toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'principalInVariant',
            test: async () => {
                const result = await principalCanister.principalInVariant();

                return {
                    Ok:
                        'WaitingOn' in result &&
                        result.WaitingOn.toText() === 'aaaaa-aa'
                };
            }
        },
        ...fromHexTests,
        ...fromTextTests,
        ...fromBlobTests,
        ...toHexTests,
        ...toTextTests,
        ...toBlobTests,
        ...selfAuthenticatingTests
    ];
}

function getFromHexTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalFromHex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principalFromHex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principalFromHex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principalFromHex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principalFromHex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        },
        {
            name: 'principalFromHex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return {
                    Ok: result.toHex() === principal.toHex()
                };
            }
        }
    ];
}

function getFromTextTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalFromText aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromText rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromText ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromText jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromText jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromText qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        }
    ];
}

function getFromBlobTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalFromBlob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromBlob rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromBlob ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromBlob jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromBlob jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalFromBlob qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return {
                    Ok: result.toText() === principal.toText()
                };
            }
        }
    ];
}

function getToHexTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalToHex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principalToHex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principalToHex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principalToHex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principalToHex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        },
        {
            name: 'principalToHex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalToHex(
                    principal
                );

                return {
                    Ok: result === principal.toHex()
                };
            }
        }
    ];
}

function getToTextTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalToText aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principalToText rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principalToText ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principalToText jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principalToText jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        },
        {
            name: 'principalToText qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalToText(
                    principal
                );

                return {
                    Ok: result === principal.toText()
                };
            }
        }
    ];
}

function getToBlobTests(principalCanister: ActorSubclass<SERVICE>): Test[] {
    return [
        {
            name: 'principalToBlob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalToBlob rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalToBlob ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalToBlob jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalToBlob jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        },
        {
            name: 'principalToBlob qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result = await principalCanister.principalToBlob(
                    principal
                );

                return {
                    Ok:
                        Principal.fromUint8Array(
                            Uint8Array.from(result)
                        ).toText() === principal.toText()
                };
            }
        }
    ];
}

function getSelfAuthenticatingTests(
    principalCanister: ActorSubclass<SERVICE>
): Test[] {
    return [
        {
            name: 'principalSelfAuthenticating aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        'o2x4y-ywrji-biykr-2fpeu-oyicx-muien-gecwr-lah4c-r2tcv-rnt4q-xqe'
                };
            }
        },
        {
            name: 'principalSelfAuthenticating rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        '5lxmd-uwt2d-ectu2-srh3d-l4np5-n6w32-3ctg2-pdf5v-vg5vu-do25a-oae'
                };
            }
        },
        {
            name: 'principalSelfAuthenticating ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        'w2hw6-vz32b-dpt2b-afpwq-2ip32-hki4g-tbzcp-7zifb-suydo-jad42-5ae'
                };
            }
        },
        {
            name: 'principalSelfAuthenticating jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        'vagij-vhj5f-jmcqm-6sfyr-onklf-d6rjs-oikld-4jlr6-jnf4k-a25k7-bae'
                };
            }
        },
        {
            name: 'principalSelfAuthenticating jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        'hp4bt-rgpk2-27zh7-4bhef-fz4v7-zwrfd-3tbnz-wgy2i-pzjui-os54t-5ae'
                };
            }
        },
        {
            name: 'principalSelfAuthenticating qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principalCanister.principalSelfAuthenticating(
                        principal.toUint8Array()
                    );

                return {
                    Ok:
                        result.toText() ===
                        'e5rvd-hgfjt-aclta-o3few-2p3fo-txhpm-ypb2i-ex56n-l6brh-jnvja-4ae'
                };
            }
        }
    ];
}
