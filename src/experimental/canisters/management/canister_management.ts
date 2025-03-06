import '#experimental/lib/experimental';

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
} from '#experimental/lib/index';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CanisterId = Principal;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterId = Principal;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const UserId = Principal;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type UserId = Principal;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const WasmModule = blob;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type WasmModule = blob;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
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
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterSettings = typeof CanisterSettings.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ChunkHash = Record({
    hash: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ChunkHash = typeof ChunkHash.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
/**
 * The arguments to provide to the management canister's create_canister
 * method
 */
export const CreateCanisterArgs = Record({
    settings: Opt(CanisterSettings),
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CreateCanisterArgs = typeof CreateCanisterArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CreateCanisterResult = Record({
    canister_id: Principal
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CreateCanisterResult = typeof CreateCanisterResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CanisterStatus = Variant({
    running: Null,
    stopping: Null,
    stopped: Null
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterStatus = typeof CanisterStatus.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const DefiniteCanisterSettings = Record({
    controllers: Vec(Principal),
    compute_allocation: nat,
    memory_allocation: nat,
    freezing_threshold: nat,
    reserved_cycles_limit: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type DefiniteCanisterSettings = typeof DefiniteCanisterSettings.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CanisterStatusResult = Record({
    status: CanisterStatus,
    settings: DefiniteCanisterSettings,
    module_hash: Opt(blob),
    memory_size: nat,
    cycles: nat,
    reserved_cycles: nat,
    idle_cycles_burned_per_day: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterStatusResult = typeof CanisterStatusResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const CanisterStatusArgs = Record({
    canister_id: Principal
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type CanisterStatusArgs = typeof CanisterStatusArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const UpdateSettingsArgs = Record({
    canister_id: CanisterId,
    settings: CanisterSettings,
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type UpdateSettingsArgs = typeof UpdateSettingsArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const UploadChunkArgs = Record({
    canister_id: CanisterId,
    chunk: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type UploadChunkArgs = typeof UploadChunkArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const UploadChunkResult = ChunkHash;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type UploadChunkResult = typeof UploadChunkResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ClearChunkStoreArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ClearChunkStoreArgs = typeof ClearChunkStoreArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const StoredChunksArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type StoredChunksArgs = typeof StoredChunksArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const StoredChunksResult = Vec(ChunkHash);
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type StoredChunksResult = typeof StoredChunksResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InstallCodeMode = Variant({
    install: Null,
    reinstall: Null,
    upgrade: Null
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InstallCodeMode = typeof InstallCodeMode.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InstallCodeArgs = Record({
    mode: InstallCodeMode,
    canister_id: CanisterId,
    wasm_module: WasmModule,
    arg: blob,
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InstallCodeArgs = typeof InstallCodeArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InstallChunkedCodeArgs = Record({
    mode: InstallCodeMode,
    target_canister: CanisterId,
    store_canister: Opt(CanisterId),
    chunk_hashes_list: Vec(ChunkHash),
    wasm_module_hash: blob,
    arg: blob,
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InstallChunkedCodeArgs = typeof InstallChunkedCodeArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const UninstallCodeArgs = Record({
    canister_id: CanisterId,
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type UninstallCodeArgs = typeof UninstallCodeArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const StartCanisterArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type StartCanisterArgs = typeof StartCanisterArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const StopCanisterArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type StopCanisterArgs = typeof StopCanisterArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const DeleteCanisterArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type DeleteCanisterArgs = typeof DeleteCanisterArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ProvisionalCreateCanisterWithCyclesArgs = Record({
    amount: Opt(nat),
    settings: Opt(CanisterSettings),
    specified_id: Opt(CanisterId),
    sender_canister_version: Opt(nat64)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ProvisionalCreateCanisterWithCyclesArgs =
    typeof ProvisionalCreateCanisterWithCyclesArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ProvisionalCreateCanisterWithCyclesResult = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ProvisionalCreateCanisterWithCyclesResult =
    typeof ProvisionalCreateCanisterWithCyclesResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ProvisionalTopUpCanisterArgs = Record({
    canister_id: CanisterId,
    amount: nat
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ProvisionalTopUpCanisterArgs =
    typeof ProvisionalTopUpCanisterArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const DepositCyclesArgs = Record({
    canister_id: CanisterId
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type DepositCyclesArgs = typeof DepositCyclesArgs.tsType;
