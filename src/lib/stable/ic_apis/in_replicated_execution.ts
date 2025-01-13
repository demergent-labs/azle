/**
 * Checks if in replicated execution.
 *
 * @returns true if in replicated execution, false otherwise
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
