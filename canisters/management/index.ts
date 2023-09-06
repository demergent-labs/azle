import {
    blob,
    Principal,
    Record,
    Service,
    update,
    Opt,
    Vec,
    Variant,
    candid,
    principal,
    text,
    Null
} from '../../src/lib_new';
import { HttpRequestArgs, HttpResponse } from './http_request';

export * from './http_request';

export class EcdsaCurve extends Variant {
    @candid(Null)
    secp256k1: Null;
}

export class KeyId extends Record {
    @candid(EcdsaCurve)
    curve: EcdsaCurve;

    @candid(text)
    name: text;
}

export class EcdsaPublicKeyArgs extends Record {
    @candid(Opt(principal))
    canister_id: Opt<Principal>;

    @candid(Vec(blob))
    derivation_path: Vec<blob>;

    @candid(KeyId)
    key_id: KeyId;
}

export class EcdsaPublicKeyResult extends Record {
    @candid(blob)
    public_key: blob;

    @candid(blob)
    chain_code: blob;
}

export class SignWithEcdsaArgs extends Record {
    @candid(blob)
    message_hash: blob;

    @candid(Vec(blob))
    derivation_path: Vec<blob>;

    @candid(KeyId)
    key_id: KeyId;
}

export class SignWithEcdsaResult extends Record {
    signature: blob;
}

class ManagementCanister extends Service {
    @update([EcdsaPublicKeyArgs], EcdsaPublicKeyResult)
    ecdsa_public_key: (
        args: EcdsaPublicKeyArgs
    ) => Promise<EcdsaPublicKeyResult>;

    @update([HttpRequestArgs], HttpResponse)
    http_request: (args: HttpRequestArgs) => Promise<HttpResponse>;

    @update([], blob)
    raw_rand: () => Promise<blob>;

    @update([SignWithEcdsaArgs], SignWithEcdsaResult)
    sign_with_ecdsa: (args: SignWithEcdsaArgs) => Promise<SignWithEcdsaResult>;
}

/**
 * A virtual canister with canister and user management functionality
 */
export const managementCanister = new ManagementCanister(
    Principal.fromText('aaaaa-aa')
);
