import { call, caller, IDL, trap, update } from 'azle';
import {
    ecdsa_public_key_args,
    ecdsa_public_key_result,
    sign_with_ecdsa_args,
    sign_with_ecdsa_result
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
            publicKey: Uint8Array.from(publicKeyResult.public_key)
        };
    }

    @update([IDL.Vec(IDL.Nat8)], Signature)
    async sign(messageHash: Uint8Array): Promise<Signature> {
        if (messageHash.length !== 32) {
            trap('messageHash must be 32 bytes');
        }

        const signatureResult = await getSignatureResult(messageHash);

        return {
            signature: Uint8Array.from(signatureResult.signature)
        };
    }
}

async function getPublicKeyResult(): Promise<ecdsa_public_key_result> {
    return await call<[ecdsa_public_key_args], ecdsa_public_key_result>(
        'aaaaa-aa',
        'ecdsa_public_key',
        {
            paramIdlTypes: [ecdsa_public_key_args],
            returnIdlType: ecdsa_public_key_result,
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
        }
    );
}

async function getSignatureResult(
    messageHash: Uint8Array
): Promise<sign_with_ecdsa_result> {
    return await call<[sign_with_ecdsa_args], sign_with_ecdsa_result>(
        'aaaaa-aa',
        'sign_with_ecdsa',
        {
            paramIdlTypes: [sign_with_ecdsa_args],
            returnIdlType: sign_with_ecdsa_result,
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
        }
    );
}
