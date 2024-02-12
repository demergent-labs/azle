import { blob, Canister, ic, None, Record, serialize, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

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
            ic.trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: signatureResult.signature
        };
    })
});

async function getPublicKeyResult() {
    const caller = ic.caller().toUint8Array();

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const publicKeyResponse = await fetch(
            `icp://aaaaa-aa/ecdsa_public_key`,
            {
                body: serialize({
                    args: [
                        {
                            canister_id: [],
                            derivation_path: [caller],
                            key_id: {
                                curve: { secp256k1: null },
                                name: 'dfx_test_key'
                            }
                        }
                    ]
                })
            }
        );

        return await publicKeyResponse.json();
    } else {
        return await ic.call(managementCanister.ecdsa_public_key, {
            args: [
                {
                    canister_id: None,
                    derivation_path: [caller],
                    key_id: {
                        curve: { secp256k1: null },
                        name: 'dfx_test_key'
                    }
                }
            ]
        });
    }
}

async function getSignatureResult(messageHash: Uint8Array) {
    const caller = ic.caller().toUint8Array();

    if (process.env.AZLE_TEST_FETCH === 'true') {
        const publicKeyResponse = await fetch(
            `icp://aaaaa-aa/sign_with_ecdsa`,
            {
                body: serialize({
                    args: [
                        {
                            message_hash: messageHash,
                            derivation_path: [caller],
                            key_id: {
                                curve: { secp256k1: null },
                                name: 'dfx_test_key'
                            }
                        }
                    ],
                    cycles: 10_000_000_000n
                })
            }
        );

        return await publicKeyResponse.json();
    } else {
        return await ic.call(managementCanister.sign_with_ecdsa, {
            args: [
                {
                    message_hash: messageHash,
                    derivation_path: [caller],
                    key_id: {
                        curve: { secp256k1: null },
                        name: 'dfx_test_key'
                    }
                }
            ],
            cycles: 10_000_000_000n
        });
    }
}
