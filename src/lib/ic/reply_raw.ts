import { blob } from '../candid/types/constructed/blob';
import { Void } from '../candid/types/primitive/void';

/**
 * Used to manually reply to an ingress message. Intended to be used in
 * canister methods with a {@link Manual} return type.
 * @param buf the value with which to reply. Intended to be used in conjunction with
 * {@link ic.candidEncode}.
 * @example
 * ```ts
 * $update;
 * export function replyRaw(): Manual<RawReply> {
 *     ic.replyRaw(
 *         ic.candidEncode(
 *             '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "raw bytes"; "variant" = variant { Medium } })'
 *         )
 *     );
 * }
 * ```
 */
export function replyRaw(replyBuffer: blob): Void {
    return globalThis._azleIc
        ? globalThis._azleIc.replyRaw(replyBuffer.buffer)
        : undefined;
}
