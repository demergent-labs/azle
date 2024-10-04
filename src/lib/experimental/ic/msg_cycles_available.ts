import '../experimental';

import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable(): nat64 {
    if (globalThis._azleIcExperimental === undefined) {
        return 0n;
    }

    const msgCyclesAvailableAmountString =
        globalThis._azleIcExperimental.msgCyclesAvailable();

    return BigInt(msgCyclesAvailableAmountString);
}
