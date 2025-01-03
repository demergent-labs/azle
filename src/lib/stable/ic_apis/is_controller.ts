import { Principal } from '@dfinity/principal';

/**
 * Determines if a {@link Principal} is a controller of this canister.
 *
 * @param principal - The Principal to check
 * @returns True if the principal is a controller, false if not or if called outside the IC environment
 *
 * @remarks
 * - Controllers have special privileges for canister management
 * - Returns false if called outside the IC environment
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
