import { call, caller, IDL, trap, update } from 'azle';
import {
    EcdsaPublicKeyArgs,
    EcdsaPublicKeyResult,
    SignWithEcdsaArgs,
    SignWithEcdsaResult
} from 'azle/canisters/management';

const PublicKey = IDL.Record({
    publicKey: IDL.Vec(IDL.Nat8)
});
type PublicKey = {
    publicKey: Uint8Array;
};

const Signature = IDL.Record({
    signature: IDL.Vec(IDL.Nat8)
});
type Signature = {
    signature: Uint8Array;
};

export default class {
    @update([], PublicKey)
    async publicKey(): Promise<PublicKey> {
        const publicKeyResult = await getPublicKeyResult();
        return {
            publicKey: publicKeyResult.public_key
        };
    }

    @update([IDL.Vec(IDL.Nat8)], Signature)
    async sign(messageHash: Uint8Array): Promise<Signature> {
        if (messageHash.length !== 32) {
            trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: signatureResult.signature
        };
    }
}

async function getPublicKeyResult(): Promise<EcdsaPublicKeyResult> {
    return await call('aaaaa-aa', 'ecdsa_public_key', {
        paramIdlTypes: [EcdsaPublicKeyArgs],
        returnIdlType: EcdsaPublicKeyResult,
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

async function getSignatureResult(
    messageHash: Uint8Array
): Promise<SignWithEcdsaResult> {
    return await call('aaaaa-aa', 'sign_with_ecdsa', {
        paramIdlTypes: [SignWithEcdsaArgs],
        returnIdlType: SignWithEcdsaResult,
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
