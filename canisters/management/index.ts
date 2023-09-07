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
    Null,
    Void
} from '../../src/lib_new';
import { HttpRequestArgs, HttpResponse } from './http_request';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    CreateCanisterArgs,
    CreateCanisterResult,
    DeleteCanisterArgs,
    DepositCyclesArgs,
    InstallCodeArgs,
    ProvisionalCreateCanisterWithCyclesArgs,
    ProvisionalCreateCanisterWithCyclesResult,
    ProvisionalTopUpCanisterArgs,
    StartCanisterArgs,
    StopCanisterArgs,
    UninstallCodeArgs,
    UpdateSettingsArgs
} from './canister_management';

export * from './http_request';
export * from './canister_management';

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

    @update([CreateCanisterArgs], CreateCanisterResult)
    create_canister: (
        args: CreateCanisterArgs
    ) => Promise<CreateCanisterResult>;

    @update([UpdateSettingsArgs], Void)
    update_settings: (args: UpdateSettingsArgs) => Void;

    @update([InstallCodeArgs], Void)
    install_code: (args: InstallCodeArgs) => Void;

    @update([UninstallCodeArgs], Void)
    uninstall_code: (args: UninstallCodeArgs) => Void;

    @update([StartCanisterArgs], Void)
    start_canister: (args: StartCanisterArgs) => Void;

    @update([StopCanisterArgs], Void)
    stop_canister: (args: StopCanisterArgs) => Void;

    @update([CanisterStatusArgs], CanisterStatusResult)
    canister_status: (args: CanisterStatusArgs) => CanisterStatusResult;

    @update([DeleteCanisterArgs], Void)
    delete_canister: (args: DeleteCanisterArgs) => Void;

    @update([DepositCyclesArgs], Void)
    deposit_cycles: (args: DepositCyclesArgs) => Void;

    @update(
        [ProvisionalCreateCanisterWithCyclesArgs],
        ProvisionalCreateCanisterWithCyclesArgs
    )
    provisional_create_canister_with_cycles: (
        args: ProvisionalCreateCanisterWithCyclesArgs
    ) => ProvisionalCreateCanisterWithCyclesResult;

    @update([ProvisionalTopUpCanisterArgs], Void)
    provisional_top_up_canister: (args: ProvisionalTopUpCanisterArgs) => Void;
}

/**
 * A virtual canister with canister and user management functionality
 */
export const managementCanister = new ManagementCanister(
    Principal.fromText('aaaaa-aa')
);
