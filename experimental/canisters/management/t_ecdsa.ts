import {
    blob,
    Null,
    Opt,
    Principal,
    Record,
    text,
    Variant,
    Vec
} from '../../src/lib';

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
