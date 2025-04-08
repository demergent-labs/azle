import { call } from './call';
import { canisterSelf } from './canister_self';

/**
 * Resets the instruction limit after the await point.
 *
 * @returns Promise\<void\>
 *
 * @remarks
 *
 * - **Important**: Makes an inter-canister call to the canister itself
 *   - Global state can change from before the await point to after the await point
 *   - All code running after the await point will be in one of the following call contexts
 *     - after a successful inter-canister await
 *     - after an unsuccessful inter-canister await
 *     - the original call context
 * - See [the current instruction limits](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * - **Call Context**:
 *   - \@update
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export async function chunk(): Promise<void> {
    if (
        globalThis._azleIc === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    await call<undefined, Uint8Array>(canisterSelf(), '_azle_chunk', {
        cycles: 0n,
        raw: true
    });
}
