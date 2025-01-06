import { Principal } from '@dfinity/principal';

/**
 * Returns the Principal of the identity that called the current method.
 *
 * @returns The caller's Principal ID, or the anonymous Principal (0x04) if called outside the IC environment
 *
 * @remarks
 * - Returns the immediate caller's Principal ID
 * - For inter-canister calls, returns the calling canister's ID
 * - For user calls, returns the user's Principal ID
 * - For anonymous calls, returns the anonymous Principal
 * - Commonly used for access control and authentication
 * - Returns the anonymous Principal if called outside the IC environment
 * - **Call Context**:
 *   - Any method
 */
export function caller(): Principal {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return Principal.fromHex('04');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromUint8Array(
            new Uint8Array(globalThis._azleIcExperimental.caller())
        );
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.caller());
}
