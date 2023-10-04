import {
    Record,
    Opt,
    Vec,
    Principal,
    nat,
    Variant,
    Null,
    blob
} from '../../src/lib';

export const CanisterId = Principal;
export const UserId = Principal;
export const WasmModule = blob;

export const CanisterSettings = Record({
    /**
     * A list of principals. Must be between 0 and 10 in size. This
     * value is assigned to the controllers attribute of the canister.
     *
     * Default value: A list containing only the caller of the
     * {@link Management.create_canister} call
     */
    controllers: Opt(Vec(Principal)),
    compute_allocation: Opt(nat),
    memory_allocation: Opt(nat),
    freezing_threshold: Opt(nat)
});

/**
 * The arguments to provide to the management canister's create_canister
 * method
 */
export const CreateCanisterArgs = Record({
    settings: Opt(CanisterSettings)
});

export const CreateCanisterResult = Record({
    canister_id: Principal
});

export const CanisterStatus = Variant({
    running: Null,
    stopping: Null,
    stopped: Null
});

export const DefiniteCanisterSettings = Record({
    controllers: Vec(Principal),
    compute_allocation: nat,
    memory_allocation: nat,
    freezing_threshold: nat
});

export const CanisterStatusResult = Record({
    status: CanisterStatus,
    settings: DefiniteCanisterSettings,
    module_hash: Opt(blob),
    memory_size: nat,
    cycles: nat
});

export const CanisterStatusArgs = Record({
    canister_id: Principal
});

export const UpdateSettingsArgs = Record({
    canister_id: CanisterId,
    settings: CanisterSettings
});

export const InstallCodeMode = Variant({
    install: Null,
    reinstall: Null,
    upgrade: Null
});

export const InstallCodeArgs = Record({
    mode: InstallCodeMode,
    canister_id: CanisterId,
    wasm_module: WasmModule,
    arg: blob
});

export const UninstallCodeArgs = Record({
    canister_id: CanisterId
});

export const StartCanisterArgs = Record({
    canister_id: CanisterId
});

export const StopCanisterArgs = Record({
    canister_id: CanisterId
});

export const DeleteCanisterArgs = Record({
    canister_id: CanisterId
});

export const ProvisionalCreateCanisterWithCyclesArgs = Record({
    amount: Opt(nat),
    settings: Opt(CanisterSettings)
});

export const ProvisionalCreateCanisterWithCyclesResult = Record({
    canister_id: CanisterId
});

export const ProvisionalTopUpCanisterArgs = Record({
    canister_id: CanisterId,
    amount: nat
});

export const DepositCyclesArgs = Record({
    canister_id: CanisterId
});
