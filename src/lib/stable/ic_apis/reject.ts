/**
 * Explicitly rejects the current call with a custom message.
 * Used in canister methods marked with {@link Manual} reply handling.
 * When called, the caller will receive a rejection with code {@link RejectionCode.CanisterReject}.
 *
 * @param message - The rejection message that will be available via {@link rejectMessage}
 * @returns void, or no effect if called outside the IC environment
 *
 * @example
 * @update([IDL.Nat], IDL.Bool, { manual: true })
 * function validateAmount(amount: bigint): boolean {
 *   if (amount < 0) {
 *     reject("Amount cannot be negative");
 *   }
 *   reply({ data: true, idlType: IDL.Bool });
 * }
 */
export function reject(message: string): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.reject(message);
        return;
    }

    globalThis._azleIcStable.reject(message);
}
