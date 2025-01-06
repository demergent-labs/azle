/**
 * Sets this canister's certified data.
 *
 * @param data - The data to certify (max 32 bytes)
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Limited to 32 bytes of data (traps if exceeded)
 * - Used for certified variable functionality
 * - Returns void if called outside IC environment
 * - **Call Context**:
 *   - init
 *   - preUpgrade
 *   - update
 *   - reply
 *   - heartbeat
 *   - global_timer
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
