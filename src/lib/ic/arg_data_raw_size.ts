import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Gets the length of the raw-argument-data-bytes
 * @returns the data size
 */
export function argDataRawSize(): nat {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
