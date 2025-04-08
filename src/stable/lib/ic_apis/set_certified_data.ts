/**
 * Sets the canister's certified data.
 *
 * @param data - The data to certify (max 32 bytes)
 *
 * @returns void
 *
 * @remarks
 *
 * - Used in conjunction with `dataCertificate`
 * - Limited to 32 bytes of data (traps if exceeded)
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@preUpgrade
 *   - \@update
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export function setCertifiedData(data: Uint8Array): void {
    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.setCertifiedData(
            data.buffer instanceof ArrayBuffer
                ? data.buffer
                : new Uint8Array(data).buffer
        );
    }

    if (globalThis._azleIc !== undefined) {
        globalThis._azleIc.setCertifiedData(data);
    }
}
