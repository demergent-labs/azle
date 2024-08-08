import { call } from './call';
import { candidEncode } from './candid_encode';
import { id } from './id';

/**
 * Resets the instruction limit when this function is called and awaited.
 * To achieve this, a simple cross-canister call to the canister calling this function is executed.
 *
 * You should exercise the appropriate cautions similar to when executing other cross-canister calls, such as managing global mutable state across await points safely.
 *
 * Only works when called from:
 * - update calls and their reply/reject callbacks ([U Ry Rt](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-imports))
 * - timers ([T](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-imports))
 * - heartbeats ([T](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-imports))
 */
export async function chunk(): Promise<void> {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    await call(id(), '_azle_chunk', { raw: candidEncode('()'), payment: 0n });
}
