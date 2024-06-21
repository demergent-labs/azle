import { call, caller, IDL, trap, update } from 'azle';

const PublicKey = IDL.Record({
    publicKey: IDL.Vec(IDL.Nat8)
});

const Signature = IDL.Record({
    signature: IDL.Vec(IDL.Nat8)
});

export default class {
    @update([], PublicKey)
    async publicKey() {
        const publicKeyResult = await getPublicKeyResult();
        return {
            publicKey: publicKeyResult.public_key
        };
    }

    @update([IDL.Vec(IDL.Nat8)], Signature)
    async sign(messageHash: Uint8Array) {
        if (messageHash.length !== 32) {
            trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: signatureResult.signature
        };
    }
}

async function getPublicKeyResult() {
    return await call('aaaaa-aa', 'ecdsa_public_key', {
        args: [
            {
                canister_id: [],
                derivation_path: [caller().toUint8Array()],
                key_id: {
                    curve: { secp256k1: null },
                    name: 'dfx_test_key'
                }
            }
        ]
    });
}

async function getSignatureResult(messageHash: Uint8Array) {
    return await call('aaaaa-aa', 'sign_with_ecdsa', {
        args: [
            {
                message_hash: messageHash,
                derivation_path: [caller().toUint8Array()],
                key_id: {
                    curve: { secp256k1: null },
                    name: 'dfx_test_key'
                }
            }
        ],
        payment: 10_000_000_000n
    });
}
