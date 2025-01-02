import { Principal } from '@dfinity/principal';

/**
 * Returns this canister's ID as a {@link Principal}.
 *
 * @returns The canister's Principal ID, or the anonymous Principal (0x04) if called outside the IC environment
 *
 * @remarks
 * - Every canister has a unique Principal ID
 * - Used for identifying and addressing the canister
 * - Returns the anonymous Principal if called outside the IC environment
 */
export function id(): Principal {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return Principal.fromHex('04');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromText(globalThis._azleIcExperimental.id());
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.id());
}
