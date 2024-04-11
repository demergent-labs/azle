import {
    blob,
    nat,
    nat64,
    Null,
    Opt,
    Principal,
    Record,
    Variant,
    Vec
} from '../../src/lib';

export const CanisterId = Principal;
export type CanisterId = Principal;

export const UserId = Principal;
export type UserId = Principal;

export const WasmModule = blob;
export type WasmModule = blob;

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
    freezing_threshold: Opt(nat),
    reserved_cycles_limit: Opt(nat)
});
export type CanisterSettings = typeof CanisterSettings.tsType;

/**
 * The arguments to provide to the management canister's create_canister
 * method
 */
export const CreateCanisterArgs = Record({
    settings: Opt(CanisterSettings),
    sender_canister_version: Opt(nat64)
});
export type CreateCanisterArgs = typeof CreateCanisterArgs.tsType;

export const CreateCanisterResult = Record({
    canister_id: Principal
});
export type CreateCanisterResult = typeof CreateCanisterResult.tsType;

export const CanisterStatus = Variant({
    running: Null,
    stopping: Null,
    stopped: Null
});
export type CanisterStatus = typeof CanisterStatus.tsType;

export const DefiniteCanisterSettings = Record({
    controllers: Vec(Principal),
    compute_allocation: nat,
    memory_allocation: nat,
    freezing_threshold: nat,
    reserved_cycles_limit: nat
});
export type DefiniteCanisterSettings = typeof DefiniteCanisterSettings.tsType;

export const CanisterStatusResult = Record({
    status: CanisterStatus,
    settings: DefiniteCanisterSettings,
    module_hash: Opt(blob),
    memory_size: nat,
    cycles: nat,
    reserved_cycles: nat,
    idle_cycles_burned_per_day: nat
});
export type CanisterStatusResult = typeof CanisterStatusResult.tsType;

export const CanisterStatusArgs = Record({
    canister_id: Principal
});
export type CanisterStatusArgs = typeof CanisterStatusArgs.tsType;

export const UpdateSettingsArgs = Record({
    canister_id: CanisterId,
    settings: CanisterSettings,
    sender_canister_version: Opt(nat64)
});
export type UpdateSettingsArgs = typeof UpdateSettingsArgs.tsType;

export const InstallCodeMode = Variant({
    install: Null,
    reinstall: Null,
    upgrade: Null
});
export type InstallCodeMode = typeof InstallCodeMode.tsType;

export const InstallCodeArgs = Record({
    mode: InstallCodeMode,
    canister_id: CanisterId,
    wasm_module: WasmModule,
    arg: blob,
    sender_canister_version: Opt(nat64)
});
export type InstallCodeArgs = typeof InstallCodeArgs.tsType;

export const UninstallCodeArgs = Record({
    canister_id: CanisterId,
    sender_canister_version: Opt(nat64)
});
export type UninstallCodeArgs = typeof UninstallCodeArgs.tsType;

export const StartCanisterArgs = Record({
    canister_id: CanisterId
});
export type StartCanisterArgs = typeof StartCanisterArgs.tsType;

export const StopCanisterArgs = Record({
    canister_id: CanisterId
});
export type StopCanisterArgs = typeof StopCanisterArgs.tsType;

export const DeleteCanisterArgs = Record({
    canister_id: CanisterId
});
export type DeleteCanisterArgs = typeof DeleteCanisterArgs.tsType;

export const ProvisionalCreateCanisterWithCyclesArgs = Record({
    amount: Opt(nat),
    settings: Opt(CanisterSettings),
    specified_id: Opt(CanisterId),
    sender_canister_version: Opt(nat64)
});
export type ProvisionalCreateCanisterWithCyclesArgs =
    typeof ProvisionalCreateCanisterWithCyclesArgs.tsType;

export const ProvisionalCreateCanisterWithCyclesResult = Record({
    canister_id: CanisterId
});
export type ProvisionalCreateCanisterWithCyclesResult =
    typeof ProvisionalCreateCanisterWithCyclesResult.tsType;

export const ProvisionalTopUpCanisterArgs = Record({
    canister_id: CanisterId,
    amount: nat
});
export type ProvisionalTopUpCanisterArgs =
    typeof ProvisionalTopUpCanisterArgs.tsType;

export const DepositCyclesArgs = Record({
    canister_id: CanisterId
});
export type DepositCyclesArgs = typeof DepositCyclesArgs.tsType;
