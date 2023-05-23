import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ICRCTransferError =
    | {
          GenericError: _InlineICRCTransferErrorGenericError;
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: _InlineICRCTransferErrorBadBurn }
    | { Duplicate: _InlineICRCTransferErrorDuplicate }
    | { BadFee: _InlineICRCTransferErrorBadFee }
    | { CreatedInFuture: _InlineICRCTransferErrorCreatedInFuture }
    | { TooOld: null }
    | { InsufficientFunds: _InlineICRCTransferErrorInsufficientFunds };
export type ManualReply = { Ok: bigint } | { Err: ICRCTransferError };
export type ManualReply_1 =
    | { Ok: Array<UtxoStatus> }
    | { Err: UpdateBalanceError };
export type UpdateBalanceError =
    | {
          GenericError: _InlineUpdateBalanceErrorGenericError;
      }
    | { TemporarilyUnavailable: string }
    | { AlreadyProcessing: null }
    | { NoNewUtxos: _InlineUpdateBalanceErrorNoNewUtxos };
export interface Utxo {
    height: number;
    value: bigint;
    outpoint: _InlineUtxoOutpoint;
}
export type UtxoStatus =
    | { ValueTooSmall: Utxo }
    | { Tainted: Utxo }
    | { Minted: _InlineUtxoStatusMinted }
    | { Checked: Utxo };
export interface _InlineICRCTransferErrorBadBurn {
    min_burn_amount: bigint;
}
export interface _InlineICRCTransferErrorBadFee {
    expected_fee: bigint;
}
export interface _InlineICRCTransferErrorCreatedInFuture {
    ledger_time: bigint;
}
export interface _InlineICRCTransferErrorDuplicate {
    duplicate_of: bigint;
}
export interface _InlineICRCTransferErrorGenericError {
    message: string;
    error_code: bigint;
}
export interface _InlineICRCTransferErrorInsufficientFunds {
    balance: bigint;
}
export interface _InlineUpdateBalanceErrorGenericError {
    error_message: string;
    error_code: bigint;
}
export interface _InlineUpdateBalanceErrorNoNewUtxos {
    required_confirmations: number;
    current_confirmations: [] | [number];
}
export interface _InlineUtxoOutpoint {
    txid: Uint8Array | number[];
    vout: number;
}
export interface _InlineUtxoStatusMinted {
    minted_amount: bigint;
    block_index: bigint;
    utxo: Utxo;
}
export interface _SERVICE {
    getBalance: ActorMethod<[], bigint>;
    getDepositAddress: ActorMethod<[], string>;
    transfer: ActorMethod<[string, bigint], ManualReply>;
    updateBalance: ActorMethod<[], ManualReply_1>;
}
