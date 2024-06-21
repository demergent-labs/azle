import { call, caller, IDL, query, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

const PublicKey = Record({
    publicKey: IDL.Vec(IDL.Nat8)
});

const Signature = Record({
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
    async sign(messageHash) {
        if (messageHash.length !== 32) {
            ic.trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: signatureResult.signature
        };
    }
}

async function getPublicKeyResult() {
    const caller = caller().toUint8Array();

    return await call(managementCanister.ecdsa_public_key, {
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

async function getSignatureResult(messageHash: Uint8Array) {
    const caller = caller().toUint8Array();

    return await call(managementCanister.sign_with_ecdsa, {
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
