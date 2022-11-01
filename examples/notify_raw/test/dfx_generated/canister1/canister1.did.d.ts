import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export type SendNotificationResult = { ok: boolean } | { err: RejectionCode };
export interface _SERVICE {
    send_notification: ActorMethod<[], SendNotificationResult>;
}
