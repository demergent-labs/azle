import { Principal } from '@dfinity/principal';

/**
 * Returns the `Principal` of the canister.
 *
 * @returns The `Principal` of the canister
 *
 * @remarks
 *
 * - **Call Context**:
 *   - any besides start
 */
export function canisterSelf(): Principal {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return Principal.fromHex('04');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromText(
            globalThis._azleIcExperimental.canisterSelf()
        );
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.canisterSelf());
}
