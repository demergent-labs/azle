import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/principal/principal.did';

export function getTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    const fromHexTests = getFromHexTests(principalCanister);
    const fromTextTests = getFromTextTests(principalCanister);
    const fromBlobTests = getFromBlobTests(principalCanister);
    const toHexTests = getToHexTests(principalCanister);
    const toTextTests = getToTextTests(principalCanister);
    const toBlobTests = getToBlobTests(principalCanister);
    const selfAuthenticatingTests =
        getSelfAuthenticatingTests(principalCanister);

    return () => {
        it('returns a principal', async () => {
            const result = await principalCanister.principalReturnType();

            expect(result.toText()).toBe('aaaaa-aa');
        });

        it('accepts a principal as an argument', async () => {
            const result = await principalCanister.principalParam(
                Principal.fromText('aaaaa-aa')
            );

            expect(result.toText()).toBe('aaaaa-aa');
        });

        it('returns a record with a principal as a property', async () => {
            const result = await principalCanister.principalInRecord();

            expect(result).toEqual({
                username: 'lastmjs',
                id: Principal.fromText('aaaaa-aa')
            });
        });

        it('returns a variant with a principal as a property', async () => {
            const result = await principalCanister.principalInVariant();

            expect(result).toEqual({
                WaitingOn: Principal.fromText('aaaaa-aa')
            });
        });

        describe('from hex', fromHexTests);
        describe('from text', fromTextTests);
        describe('from blob', fromBlobTests);
        describe('to hex', toHexTests);
        describe('to text', toTextTests);
        describe('to blob', toBlobTests);
        describe('self authentication', selfAuthenticatingTests);
    };
}

function getFromHexTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts the hex of aaaaa-aa to a principal', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of the anonymous principal to a principal', async () => {
            const principal = Principal.fromHex('04');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of rrkah-fqaaa-aaaaa-aaaaq-cai to a principal', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of ryjl3-tyaaa-aaaaa-aaaba-cai to a principal', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of jiyou-fiaaa-aaaam-aad6q-cai to a principal', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of jqklt-hiaaa-aaaam-aaeba-cai to a principal', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });

        it('converts the hex of qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe to a principal', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalFromHex(
                principal.toHex()
            );

            expect(result.toHex()).toBe(principal.toHex());
        });
    };
}

function getFromTextTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts "aaaaa-aa" to a principal', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts text representation of the anonymous principal to a principal', async () => {
            const principal = Principal.fromText('2vxsx-fae');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts "rrkah-fqaaa-aaaaa-aaaaq-cai" to a principal', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts "ryjl3-tyaaa-aaaaa-aaaba-cai" to a principal', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts "jiyou-fiaaa-aaaam-aad6q-cai" to a principal', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts "jqklt-hiaaa-aaaam-aaeba-cai" to a principal', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts "qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe" to a principal', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalFromText(
                principal.toText()
            );

            expect(result.toText()).toBe(principal.toText());
        });
    };
}

function getFromBlobTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts the blob representation of aaaaa-aa to a principal', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts the blob representation of rrkah-fqaaa-aaaaa-aaaaq-cai to a principal', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts the blob representation of ryjl3-tyaaa-aaaaa-aaaba-cai to a principal', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts the blob representation of jiyou-fiaaa-aaaam-aad6q-cai to a principal', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts the blob representation of jqklt-hiaaa-aaaam-aaeba-cai to a principal', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });

        it('converts the blob representation of qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe to a principal', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalFromBlob(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(principal.toText());
        });
    };
}

function getToHexTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts the principal aaaaa-aa to its hex representation', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });

        it('converts the principal rrkah-fqaaa-aaaaa-aaaaq-cai to its hex representation', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });

        it('converts the principal ryjl3-tyaaa-aaaaa-aaaba-cai to its hex representation', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });

        it('converts the principal jiyou-fiaaa-aaaam-aad6q-cai to its hex representation', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });

        it('converts the principal jqklt-hiaaa-aaaam-aaeba-cai to its hex representation', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });

        it('converts the principal qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe to its hex representation', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalToHex(principal);

            expect(result).toBe(principal.toHex());
        });
    };
}

function getToTextTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts the principal aaaaa-aa to its text representation', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });

        it('converts the principal rrkah-fqaaa-aaaaa-aaaaq-cai to its text representation', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });

        it('converts the principal ryjl3-tyaaa-aaaaa-aaaba-cai to its text representation', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });

        it('converts the principal jiyou-fiaaa-aaaam-aad6q-cai to its text representation', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });

        it('converts the principal jqklt-hiaaa-aaaam-aaeba-cai to its text representation', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });

        it('converts the principal qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe to its text representation', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalToText(principal);

            expect(result).toBe(principal.toText());
        });
    };
}

function getToBlobTests(principalCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('converts the principal aaaaa-aa to its blob representation', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });

        it('converts the principal rrkah-fqaaa-aaaaa-aaaaq-cai to its blob representation', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });

        it('converts the principal ryjl3-tyaaa-aaaaa-aaaba-cai to its blob representation', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });

        it('converts the principal jiyou-fiaaa-aaaam-aad6q-cai to its blob representation', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });

        it('converts the principal jqklt-hiaaa-aaaam-aaeba-cai to its blob representation', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });

        it('converts the principal qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe to its blob representation', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalToBlob(principal);

            expect(Principal.fromUint8Array(Uint8Array.from(result))).toEqual(
                principal
            );
        });
    };
}

function getSelfAuthenticatingTests(
    principalCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('principalSelfAuthenticating aaaaa-aa', async () => {
            const principal = Principal.fromText('aaaaa-aa');

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                'o2x4y-ywrji-biykr-2fpeu-oyicx-muien-gecwr-lah4c-r2tcv-rnt4q-xqe'
            );
        });

        it('principalSelfAuthenticating rrkah-fqaaa-aaaaa-aaaaq-cai', async () => {
            const principal = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                '5lxmd-uwt2d-ectu2-srh3d-l4np5-n6w32-3ctg2-pdf5v-vg5vu-do25a-oae'
            );
        });

        it('principalSelfAuthenticating ryjl3-tyaaa-aaaaa-aaaba-cai', async () => {
            const principal = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai');

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                'w2hw6-vz32b-dpt2b-afpwq-2ip32-hki4g-tbzcp-7zifb-suydo-jad42-5ae'
            );
        });

        it('principalSelfAuthenticating jiyou-fiaaa-aaaam-aad6q-cai', async () => {
            const principal = Principal.fromText('jiyou-fiaaa-aaaam-aad6q-cai');

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                'vagij-vhj5f-jmcqm-6sfyr-onklf-d6rjs-oikld-4jlr6-jnf4k-a25k7-bae'
            );
        });

        it('principalSelfAuthenticating jqklt-hiaaa-aaaam-aaeba-cai', async () => {
            const principal = Principal.fromText('jqklt-hiaaa-aaaam-aaeba-cai');

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                'hp4bt-rgpk2-27zh7-4bhef-fz4v7-zwrfd-3tbnz-wgy2i-pzjui-os54t-5ae'
            );
        });

        it('principalSelfAuthenticating qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe', async () => {
            const principal = Principal.fromText(
                'qaxqg-4ymay-xutcp-nnull-fvtqf-5p6d4-mxbja-i6t5s-wz7kb-csadv-qqe'
            );

            const result = await principalCanister.principalSelfAuthenticating(
                principal.toUint8Array()
            );

            expect(result.toText()).toBe(
                'e5rvd-hgfjt-aclta-o3few-2p3fo-txhpm-ypb2i-ex56n-l6brh-jnvja-4ae'
            );
        });
    };
}
