// TODO we really need to explain the security issues here
// TODO explain the security issues in the remarks
// TODO figure out the correct call context

/**
 * Sets the canister's certified data.
 *
 * @param seed - The 32 byte seed to use for Cryptographically Secure Pseudo-Random Number Generation (CSPRNG)
 *
 * @returns void
 *
 * @remarks
 *
 *
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@preUpgrade
 *   - \@update
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export function randSeed(seed: Uint8Array): void {
    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.randSeed(
            seed.buffer instanceof ArrayBuffer
                ? seed.buffer
                : new Uint8Array(seed).buffer
        );
    }

    if (globalThis._azleIc !== undefined) {
        globalThis._azleIc.randSeed(seed);
    }
}
