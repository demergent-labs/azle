import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AccountBalanceArgs {
    account: Array<number>;
}
export interface Archive {
    canister_id: Principal;
}
export interface Archives {
    archives: Array<Archive>;
}
export interface Block {
    transaction: Transaction;
    timestamp: TimeStamp;
    parent_hash: [] | [Array<number>];
}
export interface BlockRange {
    blocks: Array<Block>;
}
export interface DecimalsResult {
    decimals: number;
}
export type ExecuteTransferResult = { ok: TransferResult } | { err: string };
export type GetAccountBalanceResult = { ok: Tokens } | { err: string };
export type GetArchivesResult = { ok: Archives } | { err: string };
export interface GetBlocksArgs {
    start: bigint;
    length: bigint;
}
export type GetBlocksResult = { ok: QueryBlocksResponse } | { err: string };
export type GetDecimalsResult = { ok: number } | { err: string };
export type GetNameResult = { ok: string } | { err: string };
export type GetSymbolResult = { ok: string } | { err: string };
export type GetTransferFeeResult = { ok: TransferFee } | { err: string };
export interface NameResult {
    name: string;
}
export type Operation =
    | {
          Burn: { from: Array<number>; amount: Tokens };
      }
    | { Mint: { to: Array<number>; amount: Tokens } }
    | {
          Transfer: {
              to: Array<number>;
              fee: Tokens;
              from: Array<number>;
              amount: Tokens;
          };
      };
export type QueryArchiveError =
    | {
          BadFirstBlockIndex: {
              requested_index: bigint;
              first_valid_index: bigint;
          };
      }
    | { Other: { error_message: string; error_code: bigint } };
export type QueryArchiveFn = ActorMethod<[GetBlocksArgs], QueryArchiveResult>;
export type QueryArchiveResult =
    | { Ok: BlockRange }
    | { Err: QueryArchiveError };
export interface QueryBlocksResponse {
    certificate: [] | [Array<number>];
    blocks: Array<Block>;
    chain_length: bigint;
    first_block_index: bigint;
    archived_blocks: Array<{
        callback: QueryArchiveFn;
        start: bigint;
        length: bigint;
    }>;
}
export interface SymbolResult {
    symbol: string;
}
export interface TimeStamp {
    timestamp_nanos: bigint;
}
export interface Tokens {
    e8s: bigint;
}
export interface Transaction {
    memo: bigint;
    operation: [] | [Operation];
    created_at_time: TimeStamp;
}
export interface TransferArgs {
    to: Array<number>;
    fee: Tokens;
    memo: bigint;
    from_subaccount: [] | [Array<number>];
    created_at_time: [] | [TimeStamp];
    amount: Tokens;
}
export type TransferError =
    | {
          TxTooOld: { allowed_window_nanos: bigint };
      }
    | { BadFee: { expected_fee: Tokens } }
    | { TxDuplicate: { duplicate_of: bigint } }
    | { TxCreatedInFuture: null }
    | { InsufficientFunds: { balance: Tokens } };
export interface TransferFee {
    transfer_fee: Tokens;
}
export type TransferFeeArg = {};
export type TransferResult = { Ok: bigint } | { Err: TransferError };
export interface _SERVICE {
    execute_transfer: ActorMethod<
        [string, bigint, bigint, [] | [bigint]],
        ExecuteTransferResult
    >;
    get_account_balance: ActorMethod<[string], GetAccountBalanceResult>;
    get_address_from_principal: ActorMethod<[Principal], string>;
    get_archives: ActorMethod<[], GetArchivesResult>;
    get_blocks: ActorMethod<[GetBlocksArgs], GetBlocksResult>;
    get_decimals: ActorMethod<[], GetDecimalsResult>;
    get_name: ActorMethod<[], GetNameResult>;
    get_symbol: ActorMethod<[], GetSymbolResult>;
    get_transfer_fee: ActorMethod<[], GetTransferFeeResult>;
}
