/**
 * Synchronously sets the seed for the Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) used by Azle's implementation of `crypto.getRandomValues`.
 *
 * @param seed - The 32 byte seed for the CSPRNG used by Azle's implementation of `crypto.getRandomValues`
 *
 * @returns void
 *
 * @remarks
 *
 * Azle provides CSPRNG functionality through its implementation of `crypto.getRandomValues`.
 * The underlying CSPRNG must use an appropriate seed for its security properties to hold.
 * By default Azle will use a delay-0 timer under-the-hood in `@init` and `@postUpgrade` to set the seed with randomness obtained
 * from the management canister's `raw_rand` method.
 *
 * Keep in mind that you should not rely on random bytes obtained from `crypto.getRandomValues` during
 * the execution of your own `@init` or `@postUpgrade` methods, due to the delay-0 timer running after the completion
 * of `@init` and `@postUpgrade`.
 *
 * This `randSeed` function exists for cases where you want to ensure that `crypto.getRandomValues` uses a specific seed.
 * It is generally a best practice on ICP to seed on a regular basis, depending on your application's needs.
 *
 * The management canister's `raw_rand` method provides an excellent source of randomness.
 * It is a prime candidate for your own seeding, though you may seed from whatever source you like.
 *
 * - **Call Context**:
 *   - any
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
