import {
    Principal,
    Record,
    Opt,
    Vec,
    candid,
    principal,
    nat,
    Variant,
    Null,
    blob
} from '../../src/lib_new';

export type CanisterId = Principal;
export type UserId = Principal;
export type WasmModule = blob;

export class CanisterSettings extends Record {
    /**
     * A list of principals. Must be between 0 and 10 in size. This
     * value is assigned to the controllers attribute of the canister.
     *
     * Default value: A list containing only the caller of the
     * {@link Management.create_canister} call
     */
    @candid(Opt(Vec(principal)))
    controllers: Opt<Vec<Principal>>;

    @candid(Opt(nat))
    compute_allocation: Opt<nat>;

    @candid(Opt(nat))
    memory_allocation: Opt<nat>;

    @candid(Opt(nat))
    freezing_threshold: Opt<nat>;
}

/**
 * The arguments to provide to the management canister's create_canister
 * method
 */
export class CreateCanisterArgs extends Record {
    @candid(Opt(CanisterSettings))
    settings: Opt<CanisterSettings>;
}

export class CreateCanisterResult extends Record {
    @candid(principal)
    canister_id: Principal;
}

export class CanisterStatus extends Variant {
    @candid(Null)
    running?: Null;

    @candid(Null)
    stopping?: null;

    @candid(Null)
    stopped?: null;
}

export class DefiniteCanisterSettings extends Record {
    @candid(Vec(principal))
    controllers: Vec<Principal>;

    @candid(nat)
    compute_allocation: nat;

    @candid(nat)
    memory_allocation: nat;

    @candid(nat)
    freezing_threshold: nat;
}

export class CanisterStatusResult extends Record {
    @candid(CanisterStatus)
    status: CanisterStatus;

    @candid(DefiniteCanisterSettings)
    settings: DefiniteCanisterSettings;

    @candid(Opt(blob))
    module_hash: Opt<blob>;

    @candid(nat)
    memory_size: nat;

    @candid(nat)
    cycles: nat;
}

export class CanisterStatusArgs extends Record {
    @candid(principal)
    canister_id: Principal;
}

export class UpdateSettingsArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;

    @candid(CanisterSettings)
    settings: CanisterSettings;
}

export class InstallCodeMode extends Variant {
    @candid(Null)
    install?: Null;

    @candid(Null)
    reinstall?: Null;

    @candid(Null)
    upgrade?: Null;
}

export class InstallCodeArgs extends Record {
    @candid(InstallCodeMode)
    mode: InstallCodeMode;

    @candid(principal)
    canister_id: CanisterId;

    @candid(blob)
    wasm_module: WasmModule;

    @candid(blob)
    arg: blob;
}

export class UninstallCodeArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;
}

export class StartCanisterArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;
}

export class StopCanisterArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;
}

export class DeleteCanisterArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;
}

export class ProvisionalCreateCanisterWithCyclesArgs extends Record {
    @candid(Opt(nat))
    amount: Opt<nat>;

    @candid(Opt(CanisterSettings))
    settings: Opt<CanisterSettings>;
}

export class ProvisionalCreateCanisterWithCyclesResult extends Record {
    @candid(principal)
    canister_id: CanisterId;
}

export class ProvisionalTopUpCanisterArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;

    @candid(nat)
    amount: nat;
}

export class DepositCyclesArgs extends Record {
    @candid(principal)
    canister_id: CanisterId;
}
