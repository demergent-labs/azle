import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ManualReply =
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
    updateBalance: ActorMethod<[], ManualReply>;
}
