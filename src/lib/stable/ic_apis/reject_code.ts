type RejectionCode =
    | { NoError: null }
    | { SysFatal: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { CanisterReject: null }
    | { CanisterError: null }
    | { Unknown: null };

/**
 * Returns the rejection code from the most recently executed cross-canister call
 * @returns the rejection code
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
