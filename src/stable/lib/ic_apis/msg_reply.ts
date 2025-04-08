/**
 * Replies to the current call with raw Candid encoded bytes.
 *
 * @param data - The raw bytes to reply with
 *
 * @returns void
 *
 * @remarks
 *
 * - Used in canister methods marked with { manual: true }
 * - The data must be pre-encoded (e.g. using IDL.encode) before being passed to this function
 *
 * - **Call Context**:
 *   - \@update
 *   - \@query, replicated and non-replicated
 *   - \@query(..., { composite: true })
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 */
export function msgReply(data: Uint8Array): void {
    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.msgReply(
            data.buffer instanceof ArrayBuffer
                ? data.buffer
                : new Uint8Array(data).buffer
        );
    }

    if (globalThis._azleIc !== undefined) {
        globalThis._azleIc.msgReply(data);
    }
}
