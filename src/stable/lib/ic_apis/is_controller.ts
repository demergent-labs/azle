import { Principal } from '@dfinity/principal';

/**
 * Determines if a given `Principal` is a controller of the canister.
 *
 * @param principal - The `Principal` to check
 *
 * @returns true if the `Principal` is a controller of the canister, false if not
 *
 * @remarks
 *
 * - **Call Context**:
 *   - any
 */
export function isController(principal: Principal): boolean {
    if (globalThis._azleIcExperimental !== undefined) {
        const principalBytes = principal.toUint8Array();

        return globalThis._azleIcExperimental.isController(
            principalBytes.buffer instanceof ArrayBuffer
                ? principalBytes.buffer
                : new Uint8Array(principalBytes).buffer
        );
    }

    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.isController(principal.toUint8Array());
    }

    return false;
}
