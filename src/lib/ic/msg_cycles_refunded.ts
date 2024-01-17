import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesRefundedAmountString =
        globalThis._azleIc.msgCyclesRefunded();

    return BigInt(msgCyclesRefundedAmountString);
}
