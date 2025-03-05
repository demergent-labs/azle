/**
 * Returns the reject message from the last unsuccesful inter-canister call.
 *
 * @returns The reject message
 *
 * @remarks
 *
 * - Will trap if there is no reject message available (if `msgRejectCode()` is `0`)
 *
 * - **Call Context**:
 *   - after an unsuccessful inter-canister await
 *   - after an unsuccessful inter-canister await from a composite query
 */
export function msgRejectMsg(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.msgRejectMsg();
    }

    return globalThis._azleIcStable.msgRejectMsg();
}
