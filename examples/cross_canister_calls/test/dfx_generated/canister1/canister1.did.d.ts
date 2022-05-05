import type { Principal } from '@dfinity/principal';
export interface Account { 'id' : string, 'balance' : bigint }
export interface AccountArgs { 'id' : string }
export type AccountResult = { 'ok' : [] | [Account] } |
  { 'err' : string };
export type AccountsResult = { 'ok' : Array<Account> } |
  { 'err' : string };
export type BalanceResult = { 'ok' : bigint } |
  { 'err' : string };
export type TransferResult = { 'ok' : bigint } |
  { 'err' : string };
export type TrapResult = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE {
  'account' : (arg_0: AccountArgs) => Promise<AccountResult>,
  'accounts' : () => Promise<AccountsResult>,
  'balance' : (arg_0: string) => Promise<BalanceResult>,
  'transfer' : (arg_0: string, arg_1: string, arg_2: bigint) => Promise<
      TransferResult
    >,
  'trap' : () => Promise<TrapResult>,
}
