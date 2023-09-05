import {
    blob,
    Principal,
    record,
    Record,
    Service,
    update,
    Opt,
    Vec,
    variant,
    Variant,
    candid,
    principal,
    text,
    Null
} from '../../src/lib_new';

@variant
export class EcdsaCurve extends Variant {
    @candid(Null)
    secp256k1: Null;
}

@record
export class KeyId extends Record {
    @candid(EcdsaCurve)
    curve: EcdsaCurve;

    @candid(text)
    name: text;
}

@record
export class EcdsaPublicKeyArgs extends Record {
    @candid(Opt(principal))
    canister_id: Opt<Principal>;

    @candid(Vec(blob))
    derivation_path: Vec<blob>;

    @candid(KeyId)
    key_id: KeyId;
}

@record
export class EcdsaPublicKeyResult extends Record {
    public_key: blob;
    chain_code: blob;
}

@record
export class SignWithEcdsaArgs extends Record {
    @candid(blob)
    message_hash: blob;

    @candid(Vec(blob))
    derivation_path: Vec<blob>;

    @candid(KeyId)
    key_id: KeyId;
}

@record
export class SignWithEcdsaResult extends Record {
    signature: blob;
}

class ManagementCanister extends Service {
    @update([], blob)
    raw_rand: () => Promise<blob>;

    @update([EcdsaPublicKeyArgs], EcdsaPublicKeyResult)
    ecdsa_public_key: (
        args: EcdsaPublicKeyArgs
    ) => Promise<EcdsaPublicKeyResult>;

    @update([SignWithEcdsaArgs], SignWithEcdsaResult)
    sign_with_ecdsa: (args: SignWithEcdsaArgs) => Promise<SignWithEcdsaResult>;
}

/**
 * A virtual canister with canister and user management functionality
 */
export const managementCanister = new ManagementCanister(
    Principal.fromText('aaaaa-aa')
);
