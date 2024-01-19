import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesAvailableAmountString =
        globalThis._azleIc.msgCyclesAvailable();

    return BigInt(msgCyclesAvailableAmountString);
}
