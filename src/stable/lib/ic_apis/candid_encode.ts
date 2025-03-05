/**
 * Converts a Candid value string into its binary representation.
 *
 * @param candidString - A Candid value string
 * @returns The encoded binary Candid value bytes
 *
 * @remarks
 *
 * - **Call Context**:
 *   - any
 */
export function candidEncode(candidString: string): Uint8Array {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return new Uint8Array();
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(
            globalThis._azleIcExperimental.candidEncode(candidString)
        );
    }

    return globalThis._azleIcStable.candidEncode(candidString);
}
