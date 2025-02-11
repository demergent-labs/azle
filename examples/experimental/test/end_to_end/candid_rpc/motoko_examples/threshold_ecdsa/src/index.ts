import { call, msgCaller, trap } from 'azle';
import {
    ecdsa_public_key_args,
    ecdsa_public_key_result,
    sign_with_ecdsa_args,
    sign_with_ecdsa_result
} from 'azle/canisters/management/idl';
import { blob, Canister, Record, serialize, update } from 'azle/experimental';

const PublicKey = Record({
    publicKey: blob
});

const Signature = Record({
    signature: blob
});

export default Canister({
    publicKey: update([], PublicKey, async () => {
        const publicKeyResult = await getPublicKeyResult();

        return {
            publicKey: publicKeyResult.public_key
        };
    }),
    sign: update([blob], Signature, async (messageHash) => {
        if (messageHash.length !== 32) {
            trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: signatureResult.signature
        };
    })
});

async function getPublicKeyResult(): Promise<any> {
    const caller = msgCaller().toUint8Array();

    const arg: ecdsa_public_key_args = {
        canister_id: [],
        derivation_path: [caller],
        key_id: {
            curve: { secp256k1: null },
            name: 'dfx_test_key'
        }
    };

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const publicKeyResponse = await fetch(
            `icp://aaaaa-aa/ecdsa_public_key`,
            {
                body: serialize({
                    args: [arg]
                })
            }
        );

        return await publicKeyResponse.json();
    } else {
        return await call<[ecdsa_public_key_args], ecdsa_public_key_result>(
            'aaaaa-aa',
            'ecdsa_public_key',
            {
                paramIdlTypes: [ecdsa_public_key_args],
                returnIdlType: ecdsa_public_key_result,
                args: [arg]
            }
        );
    }
}

async function getSignatureResult(messageHash: Uint8Array): Promise<any> {
    const caller = msgCaller().toUint8Array();

    const arg: sign_with_ecdsa_args = {
        message_hash: messageHash,
        derivation_path: [caller],
        key_id: {
            curve: { secp256k1: null },
            name: 'dfx_test_key'
        }
    };

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const publicKeyResponse = await fetch(
            `icp://aaaaa-aa/sign_with_ecdsa`,
            {
                body: serialize({
                    args: [arg],
                    cycles: 10_000_000_000n
                })
            }
        );

        return await publicKeyResponse.json();
    } else {
        return await call<[sign_with_ecdsa_args], sign_with_ecdsa_result>(
            'aaaaa-aa',
            'sign_with_ecdsa',
            {
                paramIdlTypes: [sign_with_ecdsa_args],
                returnIdlType: sign_with_ecdsa_result,
                args: [arg],
                cycles: 10_000_000_000n
            }
        );
    }
}
