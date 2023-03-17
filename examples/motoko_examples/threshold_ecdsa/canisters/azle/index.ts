import { blob, ic, match, Record, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

type PublicKeyResult = Variant<{
    Ok: Record<{ public_key: blob }>;
    Err: string;
}>;

type SignResult = Variant<{
    Ok: Record<{ signature: blob }>;
    Err: string;
}>;

$update;
export async function public_key(): Promise<PublicKeyResult> {
    const caller = ic.caller().toUint8Array();
    const public_key_result = await management_canister
        .ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        })
        .call();

    return match(public_key_result, {
        Ok: (ecdsa_public_key_result) => ({
            Ok: {
                public_key: ecdsa_public_key_result.public_key
            }
        }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function sign(message_hash: blob): Promise<SignResult> {
    if (message_hash.length !== 32) {
        ic.trap('message_hash must be 32 bytes');
    }

    const caller = ic.caller().toUint8Array();

    const signature_result = await management_canister
        .sign_with_ecdsa({
            message_hash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        })
        .cycles(10_000_000_000n)
        .call();

    return match(signature_result, {
        Ok: (sign_with_ecdsa_result) => ({
            Ok: {
                signature: sign_with_ecdsa_result.signature
            }
        }),
        Err: (err) => ({ Err: err })
    });
}
