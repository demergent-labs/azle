export function rejectCode() {
    const rejectCodeNumber = globalThis._azleIc.rejectCode();

    switch (rejectCodeNumber) {
        case 0:
            return { NoError: null };
        case 1:
            return { SysFatal: null };
        case 2:
            return { SysTransient: null };
        case 3:
            return { DestinationInvalid: null };
        case 4:
            return { CanisterReject: null };
        case 5:
            return { CanisterError: null };
        case 6:
            return { Unknown: null };
        default:
            throw Error(`Unknown rejection code: ${rejectCodeNumber}`);
    }
}
