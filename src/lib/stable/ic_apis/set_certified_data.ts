/**
 * Sets the certified data of this canister, which can be authenticated via certificates.
 * This data is certified by the IC system on a regular basis and can be verified by clients.
 *
 * @param data - The data to certify (must be 32 bytes or less)
 * @returns void, or no effect if called outside the IC environment
 * @remarks
 * Valid calling contexts:
 * - {@link $init}, {@link $preUpgrade}, and {@link $postUpgrade} hooks
 * - {@link $update} methods
 * - Reply or reject callbacks
 *
 * Invalid contexts (will cause trap):
 * - {@link $query} methods
 * - Any non-canister context
 *
 * Will also trap if data exceeds 32 bytes
 *
 * @example
 * // Set some certified data
 * const data = new Uint8Array([1, 2, 3]);
 * setCertifiedData(data);
 *
 * // Later, in a query call:
 * // const cert = ic.dataCertificate();
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
