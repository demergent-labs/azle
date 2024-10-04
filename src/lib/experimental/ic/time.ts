import '../experimental';

import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
 * @returns the current timestamp
 */
export function time(): nat64 {
    if (globalThis._azleIcExperimental === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIcExperimental.time());
}
