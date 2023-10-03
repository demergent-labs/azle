import { IDL } from '@dfinity/candid';

/**
 * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
 * @returns the current timestamp
 */
export function time(): bigint {
    const timeCandidBytes = globalThis._azleIc.time();
    return IDL.decode([IDL.Nat64], timeCandidBytes)[0];
}
