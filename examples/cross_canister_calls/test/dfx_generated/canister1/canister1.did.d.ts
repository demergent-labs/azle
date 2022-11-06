import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
    id: string;
    balance: bigint;
}
export interface AccountArgs {
    id: string;
}
export type AccountResult = { ok: [] | [Account] } | { err: string };
export type AccountsResult = { ok: Array<Account> } | { err: string };
export type BalanceResult = { ok: bigint } | { err: string };
export type NotifyResult = { ok: null } | { err: RejectionCode };
export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export type TrapResult = { ok: string } | { err: string };
export interface _SERVICE {
    account: ActorMethod<[AccountArgs], AccountResult>;
    accounts: ActorMethod<[], AccountsResult>;
    balance: ActorMethod<[string], BalanceResult>;
    send_notification: ActorMethod<[], NotifyResult>;
    transfer: ActorMethod<[string, string, bigint], BalanceResult>;
    trap: ActorMethod<[], TrapResult>;
}
