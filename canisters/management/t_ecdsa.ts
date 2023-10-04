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

export const KeyId = Record({
    curve: EcdsaCurve,
    name: text
});

export const EcdsaPublicKeyArgs = Record({
    canister_id: Opt(Principal),
    derivation_path: Vec(blob),
    key_id: KeyId
});

export const EcdsaPublicKeyResult = Record({
    public_key: blob,
    chain_code: blob
});

export const SignWithEcdsaArgs = Record({
    message_hash: blob,
    derivation_path: Vec(blob),
    key_id: KeyId
});

export const SignWithEcdsaResult = Record({
    signature: blob
});
