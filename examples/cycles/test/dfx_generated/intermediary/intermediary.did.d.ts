import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type NotifyResult = { ok: null } | { err: RejectionCode };
export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export type SendCyclesResult = { ok: bigint } | { err: string };
export type SendCyclesResult128 = { ok: bigint } | { err: string };
export interface _SERVICE {
    get_canister_balance: ActorMethod<[], bigint>;
    get_canister_balance128: ActorMethod<[], bigint>;
    send_cycles: ActorMethod<[], SendCyclesResult>;
    send_cycles128: ActorMethod<[], SendCyclesResult128>;
    send_cycles128_notify: ActorMethod<[], NotifyResult>;
    send_cycles_notify: ActorMethod<[], NotifyResult>;
}
