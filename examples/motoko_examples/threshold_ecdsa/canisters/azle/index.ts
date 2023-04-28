import { blob, ic, match, Opt, Record, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function publicKey(): Promise<
    Result<Record<{ publicKey: blob }>, string>
> {
    const caller = ic.caller().toUint8Array();
    const publicKeyResult = await managementCanister
        .ecdsa_public_key({
            canister_id: Opt.None,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        })
        .call();

    return match(publicKeyResult, {
        Ok: (ecdsaPublicKeyResult) => ({
            Ok: {
                publicKey: ecdsaPublicKeyResult.public_key
            }
        }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function sign(
    messageHash: blob
): Promise<Result<Record<{ signature: blob }>, string>> {
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

    return match(signatureResult, {
        Ok: (signWithEcdsaResult) => ({
            Ok: {
                signature: signWithEcdsaResult.signature
            }
        }),
        Err: (err) => ({ Err: err })
    });
}
