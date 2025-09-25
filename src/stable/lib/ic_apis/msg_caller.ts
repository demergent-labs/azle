import { Principal } from '@icp-sdk/core/principal';

/**
 * Returns the `Principal` of the identity that initiated the current call.
 *
 * @returns The caller's `Principal`
 *
 * @remarks
 *
 * When called from:
 * - \@init: `Principal` of the identity requesting installation
 * - \@postUpgrade: `Principal` of the identity requesting upgrade
 * - \@heartbeat: `Principal` of the management canister
 * - timer: `Principal` of the management canister
 * - inter-canister callee: `Principal` of the calling canister
 *
 * - **Call Context**:
 *   - any besides start
 */
export function msgCaller(): Principal {
    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromUint8Array(
            new Uint8Array(globalThis._azleIcExperimental.msgCaller())
        );
    }

    if (globalThis._azleIc !== undefined) {
        return Principal.fromUint8Array(globalThis._azleIc.msgCaller());
    }

    return Principal.fromHex('04'); // the anonymous principal
}
