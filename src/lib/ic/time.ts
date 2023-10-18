import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';

/**
 * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
 * @returns the current timestamp
 */
export function time(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const timeCandidBytes = globalThis._azleIc.time();
    return decode(nat64, timeCandidBytes);
}
