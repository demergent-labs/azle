import '../../../src/lib/experimental/experimental';

import { blob } from '../../../src/lib/experimental/candid/types/constructed/blob';
import { Opt } from '../../../src/lib/experimental/candid/types/constructed/opt';
import { Record } from '../../../src/lib/experimental/candid/types/constructed/record';
import { Variant } from '../../../src/lib/experimental/candid/types/constructed/variant';
import { Vec } from '../../../src/lib/experimental/candid/types/constructed/vec';
import { Null } from '../../../src/lib/experimental/candid/types/primitive/null';
import { text } from '../../../src/lib/experimental/candid/types/primitive/text';
import { Principal } from '../../../src/lib/experimental/candid/types/reference/principal';

export const EcdsaCurve = Variant({
    secp256k1: Null
});
export type EcdsaCurve = typeof EcdsaCurve.tsType;

export const KeyId = Record({
    curve: EcdsaCurve,
    name: text
});
export type KeyId = typeof KeyId.tsType;

export const EcdsaPublicKeyArgs = Record({
    canister_id: Opt(Principal),
    derivation_path: Vec(blob),
    key_id: KeyId
});
export type EcdsaPublicKeyArgs = typeof EcdsaPublicKeyArgs.tsType;

export const EcdsaPublicKeyResult = Record({
    public_key: blob,
    chain_code: blob
});
export type EcdsaPublicKeyResult = typeof EcdsaPublicKeyResult.tsType;

export const SignWithEcdsaArgs = Record({
    message_hash: blob,
    derivation_path: Vec(blob),
    key_id: KeyId
});
export type SignWithEcdsaArgs = typeof SignWithEcdsaArgs.tsType;

export const SignWithEcdsaResult = Record({
    signature: blob
});
export type SignWithEcdsaResult = typeof SignWithEcdsaResult.tsType;
