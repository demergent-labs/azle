import { blob, candid, ic, None, record, Record, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

@record
class PublicKey extends Record {
    @candid(blob)
    publicKey: blob;
}

@record
class Signature extends Record {
    @candid(blob)
    signature: blob;
}

export default class {
    @update([], PublicKey)
    async publicKey(): Promise<PublicKey> {
        const caller = ic.caller().toUint8Array();
        const publicKeyResult = await managementCanister.ecdsa_public_key({
            canister_id: None,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        });

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

        const signatureResult = await managementCanister
            .sign_with_ecdsa({
                message_hash: messageHash,
                derivation_path: [caller],
                key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
            })
            .cycles(10_000_000_000n)
            .call();

        return Signature.create({
            signature: signatureResult.signature
        });
    }
}
