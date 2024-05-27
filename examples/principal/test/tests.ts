import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test, testEquality } from 'azle/test';

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
                const expected = Principal.fromText('aaaaa-aa');

                return testEquality(result, expected);
            }
        },
        {
            name: 'principalParam',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');
                const result =
                    await principalCanister.principalParam(principal);

                return testEquality(result, principal);
            }
        },
        {
            name: 'principalInRecord',
            test: async () => {
                const result = await principalCanister.principalInRecord();
                const expected = Principal.fromText('aaaaa-aa');

                return testEquality(result, expected);
            }
        },
        {
            name: 'principalInVariant',
            test: async () => {
                const result = await principalCanister.principalInVariant();
                const expected = { WaitingOn: Principal.fromText('aaaaa-aa') };

                return testEquality(result, expected);
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

function getFromHexTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalFromHex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromHex(
                    principal.toHex()
                );

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
            }
        }
    ];
}

function getFromTextTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalFromText aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromText(
                    principal.toText()
                );

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
            }
        }
    ];
}

function getFromBlobTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalFromBlob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result = await principalCanister.principalFromBlob(
                    principal.toUint8Array()
                );

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
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

                return testEquality(result, principal);
            }
        }
    ];
}

function getToHexTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalToHex aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        },
        {
            name: 'principalToHex rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        },
        {
            name: 'principalToHex ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        },
        {
            name: 'principalToHex jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        },
        {
            name: 'principalToHex jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        },
        {
            name: 'principalToHex qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principalCanister.principalToHex(principal);

                return testEquality(result, principal.toHex());
            }
        }
    ];
}

function getToTextTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalToText aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        },
        {
            name: 'principalToText rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        },
        {
            name: 'principalToText ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        },
        {
            name: 'principalToText jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        },
        {
            name: 'principalToText jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        },
        {
            name: 'principalToText qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principalCanister.principalToText(principal);

                return testEquality(result, principal.toText());
            }
        }
    ];
}

function getToBlobTests(principalCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'principalToBlob aaaaa-aa',
            test: async () => {
                const principal = Principal.fromText('aaaaa-aa');

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        },
        {
            name: 'principalToBlob rrkah-fqaaa-aaaaa-aaaaq-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        },
        {
            name: 'principalToBlob ryjl3-tyaaa-aaaaa-aaaba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'ryjl3-tyaaa-aaaaa-aaaba-cai'
                );

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        },
        {
            name: 'principalToBlob jiyou-fiaaa-aaaam-aad6q-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jiyou-fiaaa-aaaam-aad6q-cai'
                );

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        },
        {
            name: 'principalToBlob jqklt-hiaaa-aaaam-aaeba-cai',
            test: async () => {
                const principal = Principal.fromText(
                    'jqklt-hiaaa-aaaam-aaeba-cai'
                );

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        },
        {
            name: 'principalToBlob qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe',
            test: async () => {
                const principal = Principal.fromText(
                    'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
                );

                const result =
                    await principalCanister.principalToBlob(principal);

                return testEquality(result, principal.toUint8Array());
            }
        }
    ];
}

function getSelfAuthenticatingTests(
    principalCanister: ActorSubclass<_SERVICE>
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

                return testEquality(
                    result.toText(),
                    'o2x4y-ywrji-biykr-2fpeu-oyicx-muien-gecwr-lah4c-r2tcv-rnt4q-xqe'
                );
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

                return testEquality(
                    result.toText(),
                    '5lxmd-uwt2d-ectu2-srh3d-l4np5-n6w32-3ctg2-pdf5v-vg5vu-do25a-oae'
                );
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

                return testEquality(
                    result.toText(),
                    'w2hw6-vz32b-dpt2b-afpwq-2ip32-hki4g-tbzcp-7zifb-suydo-jad42-5ae'
                );
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

                return testEquality(
                    result.toText(),
                    'w2hw6-vz32b-dpt2b-afpwq-2ip32-hki4g-tbzcp-7zifb-suydo-jad42-5ae'
                );
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

                return testEquality(
                    result.toText(),
                    'hp4bt-rgpk2-27zh7-4bhef-fz4v7-zwrfd-3tbnz-wgy2i-pzjui-os54t-5ae'
                );
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

                return testEquality(
                    result.toText(),
                    'e5rvd-hgfjt-aclta-o3few-2p3fo-txhpm-ypb2i-ex56n-l6brh-jnvja-4ae'
                );
            }
        }
    ];
}
