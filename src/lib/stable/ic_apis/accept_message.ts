// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspectMessage } from '../canister_methods/inspect_message'; // Used for links in comments

/**
 * Accepts an ingress message during message inspection.
 *
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Signals that a message should proceed to execution
 * - **Call Context**:
 *   - inspectMessage
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function acceptMessage(): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.acceptMessage();
        return;
    }

    globalThis._azleIcStable.acceptMessage();
}
