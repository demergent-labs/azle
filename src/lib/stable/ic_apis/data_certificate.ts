// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setCertifiedData } from './set_certified_data'; // Used for links in comments

/**
 * Returns the data certificate authenticating this canister's certified data.
 *
 * @returns The data certificate as a Uint8Array, or undefined if:
 *   - Called during an update call
 *   - No certified data is set
 *   - Called outside the IC environment
 *
 * @remarks
 * - Used in conjunction with {@link setCertifiedData}
 * - Enables query calls to return certified responses
 * - **Call Context**:
 *   - query (non-replicated)
 *   - composite query
 * - **When called outside of Call Context**:
 *   - Returns undefined
 */
export function dataCertificate(): Uint8Array | undefined {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        const result = globalThis._azleIcExperimental.dataCertificate();

        if (result === undefined) {
            return undefined;
        }

        return new Uint8Array(result);
    }

    return globalThis._azleIcStable.dataCertificate();
}
