import type { Principal } from '@dfinity/principal';
export interface CanisterSettings {
    freezing_threshold: [] | [bigint];
    controllers: [] | [Array<Principal>];
    memory_allocation: [] | [bigint];
    compute_allocation: [] | [bigint];
}
export type CanisterStatus =
    | { stopped: null }
    | { stopping: null }
    | { running: null };
export interface CanisterStatusArgs {
    canister_id: Principal;
}
export interface CanisterStatusResult {
    status: CanisterStatus;
    memory_size: bigint;
    cycles: bigint;
    settings: DefiniteCanisterSettings;
    module_hash: [] | [Array<number>];
}
export interface CreateCanisterArgs {
    settings: [] | [CanisterSettings];
}
export interface CreateCanisterResult {
    canister_id: Principal;
}
export interface DefiniteCanisterSettings {
    freezing_threshold: bigint;
    controllers: Array<Principal>;
    memory_allocation: bigint;
    compute_allocation: bigint;
}
export interface DeleteCanisterArgs {
    canister_id: Principal;
}
export interface DepositCyclesArgs {
    canister_id: Principal;
}
export interface InstallCodeArgs {
    arg: Array<number>;
    wasm_module: Array<number>;
    mode: InstallCodeMode;
    canister_id: Principal;
}
export type InstallCodeMode =
    | { reinstall: null }
    | { upgrade: null }
    | { install: null };
export interface ProvisionalCreateCanisterWithCyclesArgs {
    settings: [] | [CanisterSettings];
    amount: [] | [bigint];
}
export interface ProvisionalCreateCanisterWithCyclesResult {
    canister_id: Principal;
}
export interface ProvisionalTopUpCanisterArgs {
    canister_id: Principal;
    amount: bigint;
}
export interface StartCanisterArgs {
    canister_id: Principal;
}
export interface StopCanisterArgs {
    canister_id: Principal;
}
export interface UninstallCodeArgs {
    canister_id: Principal;
}
export interface UpdateSettingsArgs {
    canister_id: Principal;
    settings: CanisterSettings;
}
export interface _SERVICE {
    get_randomness_directly: () => Promise<Array<number>>;
    get_randomness_indirectly: () => Promise<Array<number>>;
    get_randomness_super_indirectly: () => Promise<Array<number>>;
}
