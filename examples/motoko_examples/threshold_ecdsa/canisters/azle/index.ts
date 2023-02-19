import { blob, ic, ok, Record, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

type PublicKeyResult = Variant<{
    ok: Record<{ public_key: blob }>;
    err: string;
}>;

type SignResult = Variant<{
    ok: Record<{ signature: blob }>;
    err: string;
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

    if (!ok(public_key_result)) {
        return { err: public_key_result.err };
    }

    return { ok: { public_key: public_key_result.ok.public_key } };
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

    if (!ok(signature_result)) {
        return { err: signature_result.err };
    }

    return { ok: { signature: signature_result.ok.signature } };
}
