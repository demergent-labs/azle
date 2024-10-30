import { Principal } from '@dfinity/principal';

/**
 * Determine if a {@link Principal} is a controller of the canister.
 * @param principal The Principal to check
 * @returns true if the Principal is a controller, false otherwise
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
