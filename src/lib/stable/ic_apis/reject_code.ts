// TODO this should be removed once https://github.com/demergent-labs/azle/issues/2271 is resolved
// @ts-ignore
import { TextDecoder, TextEncoder } from '@sinonjs/text-encoding';
globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;

import { IDL } from '@dfinity/candid';

/**
 * Represents the possible rejection codes from cross-canister calls.
 *
 * - NoError (0): The call completed successfully
 * - SysFatal (1): Fatal system error, retry unlikely to be useful
 * - SysTransient (2): Transient system error, retry might be possible
 * - DestinationInvalid (3): Invalid destination (e.g. canister/account does not exist)
 * - CanisterReject (4): Explicit reject by the canister
 * - CanisterError (5): Canister error (e.g., trap, no response)
 * - Unknown: Unrecognized error code
 */
export type RejectionCode =
    | { NoError: null }
    | { SysFatal: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { CanisterReject: null }
    | { CanisterError: null }
    | { Unknown: null };

export const RejectionCode = IDL.Variant({
    NoError: IDL.Null,
    SysFatal: IDL.Null,
    SysTransient: IDL.Null,
    DestinationInvalid: IDL.Null,
    CanisterReject: IDL.Null,
    CanisterError: IDL.Null,
    Unknown: IDL.Null
});

/**
 * Returns the rejection code from the most recently executed cross-canister call.
 *
 * @returns The `RejectionCode` variant
 *
 * @remarks
 *
 * - **Call Context**:
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 *
 * - **Outside of Call Context**:
 *   - Traps
 */
export function rejectCode(): RejectionCode {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return { Unknown: null };
    }

    const rejectCodeNumber =
        globalThis._azleIcExperimental !== undefined
            ? Number(globalThis._azleIcExperimental.rejectCode())
            : globalThis._azleIcStable.rejectCode();

    const rejectCodeMap: { [key: number]: RejectionCode } = {
        0: { NoError: null },
        1: { SysFatal: null },
        2: { SysTransient: null },
        3: { DestinationInvalid: null },
        4: { CanisterReject: null },
        5: { CanisterError: null },
        6: { Unknown: null }
    };

    const result = rejectCodeMap[rejectCodeNumber];

    if (result === undefined) {
        throw new Error(`Unknown rejection code: ${rejectCodeNumber}`);
    }

    return result;
}
