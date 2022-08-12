import { blob, ok, Update, ic, Variant, CanisterResult } from 'azle';
import {
    ManagementCanister,
    EcdsaPublicKeyResult,
    SignWithEcdsaResult
} from 'azle/canisters/management';

export type EcdsaResult = Variant<{
    ok: blob;
    err: string;
}>;

export function* public_key(): Update<EcdsaResult> {
    const caller = ic.caller().toUint8Array();
    const public_key: CanisterResult<EcdsaPublicKeyResult> =
        yield ManagementCanister.ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        });

    if (!ok(public_key)) {
        return public_key;
    }

    return { ok: public_key.ok.public_key };
}

export function* sign(message_hash: blob): Update<EcdsaResult> {
    const caller = ic.caller().toUint8Array();

    const signature_result: CanisterResult<SignWithEcdsaResult> =
        yield ManagementCanister.sign_with_ecdsa({
            message_hash: message_hash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        }).with_cycles(10_000_000_000n);

    if (!ok(signature_result)) {
        return signature_result;
    }

    return { ok: signature_result.ok.signature };
}
