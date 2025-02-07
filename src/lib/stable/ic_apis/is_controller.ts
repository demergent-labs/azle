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
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return false;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        const principalBytes =
            principal.toUint8Array() as Uint8Array<ArrayBuffer>;
        return globalThis._azleIcExperimental.isController(
            principalBytes.buffer
        );
    }

    return globalThis._azleIcStable.isController(principal.toUint8Array());
}
