import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export const CanisterId = IDL.Principal;
export type CanisterId = Principal;

export const UserId = IDL.Principal;
export type UserId = Principal;

export const WasmModule = IDL.Vec(IDL.Nat8);
export type WasmModule = Uint8Array;

export const CanisterSettings = IDL.Record({
    /**
     * A list of principals. Must be between 0 and 10 in size. This
     * value is assigned to the controllers attribute of the canister.
     *
     * Default value: A list containing only the caller of the
     * {@link Management.create_canister} call
     */
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    compute_allocation: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    freezing_threshold: IDL.Opt(IDL.Nat),
    reserved_cycles_limit: IDL.Opt(IDL.Nat)
});
export type CanisterSettings = {
    controllers: [Principal[]] | [];
    compute_allocation: [bigint] | [];
    memory_allocation: [bigint] | [];
    freezing_threshold: [bigint] | [];
    reserved_cycles_limit: [bigint] | [];
};

export const ChunkHash = IDL.Record({
    hash: IDL.Vec(IDL.Nat8)
});
export type ChunkHash = {
    hash: Uint8Array;
};

/**
 * The arguments to provide to the management canister's create_canister
 * method
 */
export const CreateCanisterArgs = IDL.Record({
    settings: IDL.Opt(CanisterSettings),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type CreateCanisterArgs = {
    settings: [CanisterSettings] | [];
    sender_canister_version: [bigint] | [];
};

export const CreateCanisterResult = IDL.Record({
    canister_id: IDL.Principal
});
export type CreateCanisterResult = {
    canister_id: Principal;
};

export const CanisterStatus = IDL.Variant({
    running: IDL.Null,
    stopping: IDL.Null,
    stopped: IDL.Null
});
export type CanisterStatus = {
    running: null;
    stopping: null;
    stopped: null;
};

export const DefiniteCanisterSettings = IDL.Record({
    controllers: IDL.Vec(IDL.Principal),
    compute_allocation: IDL.Nat,
    memory_allocation: IDL.Nat,
    freezing_threshold: IDL.Nat,
    reserved_cycles_limit: IDL.Nat
});
export type DefiniteCanisterSettings = {
    controllers: Principal[];
    compute_allocation: bigint;
    memory_allocation: bigint;
    freezing_threshold: bigint;
    reserved_cycles_limit: bigint;
};

export const CanisterStatusResult = IDL.Record({
    status: CanisterStatus,
    settings: DefiniteCanisterSettings,
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    memory_size: IDL.Nat,
    cycles: IDL.Nat,
    reserved_cycles: IDL.Nat,
    idle_cycles_burned_per_day: IDL.Nat
});
export type CanisterStatusResult = {
    status: CanisterStatus;
    settings: DefiniteCanisterSettings;
    module_hash: [Uint8Array] | [];
    memory_size: bigint;
    cycles: bigint;
    reserved_cycles: bigint;
    idle_cycles_burned_per_day: bigint;
};

export const CanisterStatusArgs = IDL.Record({
    canister_id: IDL.Principal
});
export type CanisterStatusArgs = {
    canister_id: Principal;
};

export const UpdateSettingsArgs = IDL.Record({
    canister_id: CanisterId,
    settings: CanisterSettings,
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type UpdateSettingsArgs = {
    canister_id: CanisterId;
    settings: CanisterSettings;
    sender_canister_version: [bigint] | [];
};

export const UploadChunkArgs = IDL.Record({
    canister_id: CanisterId,
    chunk: IDL.Vec(IDL.Nat8)
});
export type UploadChunkArgs = {
    canister_id: CanisterId;
    chunk: Uint8Array;
};

export const UploadChunkResult = ChunkHash;
export type UploadChunkResult = ChunkHash;

export const ClearChunkStoreArgs = IDL.Record({
    canister_id: CanisterId
});
export type ClearChunkStoreArgs = {
    canister_id: CanisterId;
};

export const StoredChunksArgs = IDL.Record({
    canister_id: CanisterId
});
export type StoredChunksArgs = {
    canister_id: CanisterId;
};

export const StoredChunksResult = IDL.Vec(ChunkHash);
export type StoredChunksResult = ChunkHash[];

export const InstallCodeMode = IDL.Variant({
    install: IDL.Null,
    reinstall: IDL.Null,
    upgrade: IDL.Null
});
export type InstallCodeMode = {
    install: null;
    reinstall: null;
    upgrade: null;
};

export const InstallCodeArgs = IDL.Record({
    mode: InstallCodeMode,
    canister_id: CanisterId,
    wasm_module: WasmModule,
    arg: IDL.Vec(IDL.Nat8),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type InstallCodeArgs = {
    mode: InstallCodeMode;
    canister_id: CanisterId;
    wasm_module: WasmModule;
    arg: Uint8Array;
    sender_canister_version: [bigint] | [];
};

export const InstallChunkedCodeArgs = IDL.Record({
    mode: InstallCodeMode,
    target_canister: CanisterId,
    store_canister: IDL.Opt(CanisterId),
    chunk_hashes_list: IDL.Vec(ChunkHash),
    wasm_module_hash: IDL.Vec(IDL.Nat8),
    arg: IDL.Vec(IDL.Nat8),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type InstallChunkedCodeArgs = {
    mode: InstallCodeMode;
    target_canister: CanisterId;
    store_canister: [CanisterId] | [];
    chunk_hashes_list: ChunkHash[];
    wasm_module_hash: Uint8Array;
    arg: Uint8Array;
    sender_canister_version: [bigint] | [];
};

export const UninstallCodeArgs = IDL.Record({
    canister_id: CanisterId,
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type UninstallCodeArgs = {
    canister_id: CanisterId;
    sender_canister_version: [bigint] | [];
};

export const StartCanisterArgs = IDL.Record({
    canister_id: CanisterId
});
export type StartCanisterArgs = {
    canister_id: CanisterId;
};

export const StopCanisterArgs = IDL.Record({
    canister_id: CanisterId
});
export type StopCanisterArgs = {
    canister_id: CanisterId;
};

export const DeleteCanisterArgs = IDL.Record({
    canister_id: CanisterId
});
export type DeleteCanisterArgs = {
    canister_id: CanisterId;
};

export const ProvisionalCreateCanisterWithCyclesArgs = IDL.Record({
    amount: IDL.Opt(IDL.Nat),
    settings: IDL.Opt(CanisterSettings),
    specified_id: IDL.Opt(CanisterId),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export type ProvisionalCreateCanisterWithCyclesArgs = {
    amount: [bigint] | [];
    settings: [CanisterSettings] | [];
    specified_id: [CanisterId] | [];
    sender_canister_version: [bigint] | [];
};

export const ProvisionalCreateCanisterWithCyclesResult = IDL.Record({
    canister_id: CanisterId
});
export type ProvisionalCreateCanisterWithCyclesResult = {
    canister_id: CanisterId;
};

export const ProvisionalTopUpCanisterArgs = IDL.Record({
    canister_id: CanisterId,
    amount: IDL.Nat
});
export type ProvisionalTopUpCanisterArgs = {
    canister_id: CanisterId;
    amount: bigint;
};

export const DepositCyclesArgs = IDL.Record({
    canister_id: CanisterId
});
export type DepositCyclesArgs = {
    canister_id: CanisterId;
};
