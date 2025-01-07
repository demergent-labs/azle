// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspectMessage } from '../canister_methods/inspect_message'; // Used for links in comments

/**
 * Returns the name of the method being called.
 *
 * @returns The name of the current method, or empty string if called outside the IC environment
 *
 * @remarks
 * - Traps if called outside {@link inspectMessage} context
 * - **Call Context**:
 *   - inspectMessage
 */
export function methodName(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.methodName();
    }

    return globalThis._azleIcStable.methodName();
}
