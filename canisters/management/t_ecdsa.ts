import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export const EcdsaCurve = IDL.Variant({
    secp256k1: IDL.Null
});
export type EcdsaCurve = {
    secp256k1: null;
};

export const KeyId = IDL.Record({
    curve: EcdsaCurve,
    name: IDL.Text
});
export type KeyId = {
    curve: EcdsaCurve;
    name: string;
};

export const EcdsaPublicKeyArgs = IDL.Record({
    canister_id: IDL.Opt(IDL.Principal),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
    key_id: KeyId
});
export type EcdsaPublicKeyArgs = {
    canister_id: [Principal] | [];
    derivation_path: Uint8Array[];
    key_id: KeyId;
};

export const EcdsaPublicKeyResult = IDL.Record({
    public_key: IDL.Vec(IDL.Nat8),
    chain_code: IDL.Vec(IDL.Nat8)
});
export type EcdsaPublicKeyResult = {
    public_key: Uint8Array;
    chain_code: Uint8Array;
};

export const SignWithEcdsaArgs = IDL.Record({
    message_hash: IDL.Vec(IDL.Nat8),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
    key_id: KeyId
});
export type SignWithEcdsaArgs = {
    message_hash: Uint8Array;
    derivation_path: Uint8Array[];
    key_id: KeyId;
};

export const SignWithEcdsaResult = IDL.Record({
    signature: IDL.Vec(IDL.Nat8)
});
export type SignWithEcdsaResult = {
    signature: Uint8Array;
};
