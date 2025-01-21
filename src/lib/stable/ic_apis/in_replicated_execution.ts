/**
 * Checks if the current call is in replicated or non-replicated execution mode.
 *
 * @returns true if in replicated execution mode, false otherwise
 *
 * @remarks
 * - **Call Context**:
 *   - any
 */
export function inReplicatedExecution(): boolean {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return false;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.inReplicatedExecution();
    }

    return globalThis._azleIcStable.inReplicatedExecution();
}
