import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export type ExecuteGetBalanceResult = { ok: bigint } | { err: string };
export type ExecuteGetCurrentFeePercentiles =
    | { ok: Array<bigint> }
    | { err: string };
export type ExecuteGetUtxosResult = { ok: GetUtxosResult } | { err: string };
export type ExecuteSendTransactionResult = { ok: null } | { err: string };
export interface GetBalanceArgs {
    network: Network;
    address: string;
    min_confirmations: [] | [number];
}
export interface GetCurrentFeePercentilesArgs {
    network: Network;
}
export interface GetUtxosArgs {
    network: Network;
    filter: [] | [UtxosFilter];
    address: string;
}
export interface GetUtxosResult {
    next_page: [] | [Array<number>];
    tip_height: number;
    tip_block_hash: Array<number>;
    utxos: Array<Utxo>;
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
export type Network = { Mainnet: null } | { Regtest: null } | { Testnet: null };
export interface Outpoint {
    txid: Array<number>;
    vout: number;
}
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
export interface SendTransactionArgs {
    transaction: Array<number>;
    network: Network;
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
export interface Utxo {
    height: number;
    value: bigint;
    outpoint: Outpoint;
}
export type UtxosFilter =
    | { Page: Array<number> }
    | { MinConfirmations: number };
export interface _SERVICE {
    get_balance: ActorMethod<[string], ExecuteGetBalanceResult>;
    get_current_fee_percentiles: ActorMethod<
        [],
        ExecuteGetCurrentFeePercentiles
    >;
    get_utxos: ActorMethod<[string], ExecuteGetUtxosResult>;
    send_transaction: ActorMethod<
        [Array<number>],
        ExecuteSendTransactionResult
    >;
}
