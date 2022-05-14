import type { Principal } from '@dfinity/principal';
export interface AccountBalanceArgs { 'account' : Array<number> }
export interface Archive { 'canister_id' : Principal }
export interface Archives { 'archives' : Array<Archive> }
export interface Block {
  'transaction' : Transaction,
  'timestamp' : TimeStamp,
  'parent_hash' : [] | [Array<number>],
}
export interface DecimalsResult { 'decimals' : number }
export type ExecuteTransferResult = { 'ok' : TransferResult } |
  { 'err' : string };
export type GetAccountBalanceResult = { 'ok' : Tokens } |
  { 'err' : string };
export type GetArchivesResult = { 'ok' : Archives } |
  { 'err' : string };
export interface GetBlocksArgs { 'start' : bigint, 'length' : bigint }
export type GetBlocksResult = { 'ok' : QueryBlocksResponse } |
  { 'err' : string };
export type GetDecimalsResult = { 'ok' : number } |
  { 'err' : string };
export type GetNameResult = { 'ok' : string } |
  { 'err' : string };
export type GetSymbolResult = { 'ok' : string } |
  { 'err' : string };
export type GetTransferFeeResult = { 'ok' : TransferFee } |
  { 'err' : string };
export interface NameResult { 'name' : string }
export type Operation = {
    'Burn' : { 'from' : Array<number>, 'amount' : Tokens }
  } |
  { 'Mint' : { 'to' : Array<number>, 'amount' : Tokens } } |
  {
    'Transfer' : {
      'to' : Array<number>,
      'fee' : Tokens,
      'from' : Array<number>,
      'amount' : Tokens,
    }
  };
export interface QueryBlocksResponse {
  'certificate' : [] | [Array<number>],
  'blocks' : Array<Block>,
  'chain_length' : bigint,
  'first_block_index' : bigint,
  'archived_blocks' : Array<{ 'start' : bigint, 'length' : bigint }>,
}
export interface SymbolResult { 'symbol' : string }
export interface TimeStamp { 'timestamp_nanos' : bigint }
export interface Tokens { 'e8s' : bigint }
export interface Transaction {
  'memo' : bigint,
  'operation' : [] | [Operation],
  'created_at_time' : TimeStamp,
}
export interface TransferArgs {
  'to' : Array<number>,
  'fee' : Tokens,
  'memo' : bigint,
  'from_subaccount' : [] | [Array<number>],
  'created_at_time' : [] | [TimeStamp],
  'amount' : Tokens,
}
export type TransferError = {
    'TxTooOld' : { 'allowed_window_nanos' : bigint }
  } |
  { 'BadFee' : { 'expected_fee' : Tokens } } |
  { 'TxDuplicate' : { 'duplicate_of' : bigint } } |
  { 'TxCreatedInFuture' : null } |
  { 'InsufficientFunds' : { 'balance' : Tokens } };
export interface TransferFee { 'transfer_fee' : Tokens }
export type TransferFeeArg = {};
export type TransferResult = { 'Ok' : bigint } |
  { 'Err' : TransferError };
export interface _SERVICE {
  'execute_transfer' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: bigint,
      arg_3: [] | [bigint],
    ) => Promise<ExecuteTransferResult>,
  'get_account_balance' : (arg_0: string) => Promise<GetAccountBalanceResult>,
  'get_archives' : () => Promise<GetArchivesResult>,
  'get_blocks' : (arg_0: GetBlocksArgs) => Promise<GetBlocksResult>,
  'get_decimals' : () => Promise<GetDecimalsResult>,
  'get_name' : () => Promise<GetNameResult>,
  'get_symbol' : () => Promise<GetSymbolResult>,
  'get_transfer_fee' : () => Promise<GetTransferFeeResult>,
}
