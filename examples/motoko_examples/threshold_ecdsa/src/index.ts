import { blob, candid, ic, None, Record, Service, update } from 'azle';
import {
    EcdsaCurve,
    EcdsaPublicKeyArgs,
    KeyId,
    managementCanister
} from 'azle/canisters/management';

class PublicKey extends Record {
    @candid(blob)
    publicKey: blob;
}

class Signature extends Record {
    @candid(blob)
    signature: blob;
}

export default class extends Service {
    @update([], PublicKey)
    async publicKey(): Promise<PublicKey> {
        const caller = ic.caller().toUint8Array();

        const publicKeyResult = await ic.call(
            managementCanister.ecdsa_public_key,
            {
                args: [
                    EcdsaPublicKeyArgs.create({
                        canister_id: None,
                        derivation_path: [caller],
                        key_id: KeyId.create({
                            curve: EcdsaCurve.create({ secp256k1: null }),
                            name: 'dfx_test_key'
                        })
                    })
                ]
            }
        );

        return PublicKey.create({
            publicKey: publicKeyResult.public_key
        });
    }

    @update([blob], Signature)
    async sign(messageHash: blob): Promise<Signature> {
        if (messageHash.length !== 32) {
            ic.trap('messageHash must be 32 bytes');
        }

        const caller = ic.caller().toUint8Array();

        const signatureResult = await ic.call(
            managementCanister.sign_with_ecdsa,
            {
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
            }
        );

        return Signature.create({
            signature: signatureResult.signature
        });
    }
}
