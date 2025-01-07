import { Principal } from '@dfinity/principal';

/**
 * Returns this canister's {@link Principal}.
 *
 * @returns The canister's Principal, or the anonymous Principal if called outside the IC environment
 *
 * @remarks
 * - Every canister has a unique Principal
 * - **Call Context**:
 *   - Any method
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
