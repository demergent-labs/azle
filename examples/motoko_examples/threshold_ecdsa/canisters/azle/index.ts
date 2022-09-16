import { blob, ok, Update, ic, Variant, CanisterResult } from 'azle';
import {
    ManagementCanister,
    EcdsaPublicKeyResult,
    SignWithEcdsaResult
} from 'azle/canisters/management';

type PublicKeyResult = Variant<{
    ok: { public_key: blob };
    err: string;
}>;

type SignResult = Variant<{
    ok: { signature: blob };
    err: string;
}>;

export function* public_key(): Update<PublicKeyResult> {
    const caller = ic.caller().toUint8Array();
    const public_key_result: CanisterResult<EcdsaPublicKeyResult> =
        yield ManagementCanister.ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        });

    if (!ok(public_key_result)) {
        return { err: public_key_result.err };
    }

    return { ok: { public_key: public_key_result.ok.public_key } };
}

export function* sign(message_hash: blob): Update<SignResult> {
    if (message_hash.length !== 32) {
        ic.trap('message_hash must be 32 bytes');
    }

    const caller = ic.caller().toUint8Array();

    const signature_result: CanisterResult<SignWithEcdsaResult> =
        yield ManagementCanister.sign_with_ecdsa({
            message_hash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        }).with_cycles(10_000_000_000n);

    if (!ok(signature_result)) {
        return { err: signature_result.err };
    }

    return { ok: { signature: signature_result.ok.signature } };
}
