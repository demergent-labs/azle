// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dataCertificate } from './data_certificate'; // Used for links in comments

/**
 * Sets this canister's certified data.
 *
 * @param data - The data to certify (max 32 bytes)
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Used in conjunction with {@link dataCertificate}
 * - Limited to 32 bytes of data (traps if exceeded)
 * - **Call Context**:
 *   - init
 *   - postUpgrade
 *   - preUpgrade
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - heartbeat
 *   - timer
 */
export function setCertifiedData(data: Uint8Array): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.setCertifiedData(data.buffer);
        return;
    }

    globalThis._azleIcStable.setCertifiedData(data);
}
