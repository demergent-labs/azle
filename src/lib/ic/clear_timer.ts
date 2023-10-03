import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { Void } from '../candid/types/primitive/void';

/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param id The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: nat64): Void {
    const encode = (value: nat64) => {
        return new Uint8Array(IDL.encode([IDL.Nat64], [value])).buffer;
    };

    globalThis._azleIc.clearTimer(encode(timerId));

    const timerCallbackId = globalThis.icTimers[timerId.toString()];

    delete globalThis.icTimers[timerId.toString()];
    delete globalThis[timerCallbackId];
}
