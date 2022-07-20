import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type SendNotificationResult = { ok: boolean } | { err: string };
export interface _SERVICE {
    send_notification: ActorMethod<[], SendNotificationResult>;
}
