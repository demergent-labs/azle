import { Principal } from '@dfinity/principal';

/**
 * Determines if a given {@link Principal} is a controller of this canister.
 *
 * @param principal - The principal to check
 * @returns True if the principal is a controller, false if not or if called outside the IC environment
 *
 * @remarks
 * - **Call Context**:
 *   - Any method
 */
export function isController(principal: Principal): boolean {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return false;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.isController(
            principal.toUint8Array().buffer
        );
    }

    return globalThis._azleIcStable.isController(principal.toUint8Array());
}
