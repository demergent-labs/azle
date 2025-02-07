import '../../../src/lib/experimental/experimental';

import { blob } from '../../../src/lib/experimental/candid/types/constructed/blob';
import { Opt } from '../../../src/lib/experimental/candid/types/constructed/opt';
import { Record } from '../../../src/lib/experimental/candid/types/constructed/record';
import { Variant } from '../../../src/lib/experimental/candid/types/constructed/variant';
import { Vec } from '../../../src/lib/experimental/candid/types/constructed/vec';
import { Null } from '../../../src/lib/experimental/candid/types/primitive/null';
import { text } from '../../../src/lib/experimental/candid/types/primitive/text';
import { Principal } from '../../../src/lib/experimental/candid/types/reference/principal';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const EcdsaCurve = Variant({
    secp256k1: Null
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type EcdsaCurve = typeof EcdsaCurve.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const KeyId = Record({
    curve: EcdsaCurve,
    name: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type KeyId = typeof KeyId.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const EcdsaPublicKeyArgs = Record({
    canister_id: Opt(Principal),
    derivation_path: Vec(blob),
    key_id: KeyId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type EcdsaPublicKeyArgs = typeof EcdsaPublicKeyArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const EcdsaPublicKeyResult = Record({
    public_key: blob,
    chain_code: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type EcdsaPublicKeyResult = typeof EcdsaPublicKeyResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const SignWithEcdsaArgs = Record({
    message_hash: blob,
    derivation_path: Vec(blob),
    key_id: KeyId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type SignWithEcdsaArgs = typeof SignWithEcdsaArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const SignWithEcdsaResult = Record({
    signature: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type SignWithEcdsaResult = typeof SignWithEcdsaResult.tsType;
