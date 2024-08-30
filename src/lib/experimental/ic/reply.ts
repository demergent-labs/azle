import '../experimental';

import { CandidType } from '../candid/candid_type';
import { encode } from '../candid/serde/encode';
import { Void } from '../candid/types/primitive/void';

type ReplyInput =
    | {
          data: any;
          candidType: CandidType;
      }
    | {
          raw: Uint8Array;
      };

/**
 * Used to manually reply to an ingress message. Intended to be used in
 * canister methods with a {@link Manual} return type.
 * @param reply the value with which to reply. Must be of type `T` where `T`
 * is the generic type supplied to `Manual<T>`. Otherwise will result in an
 * uncaught `TypeError`.
 *
 * Optionally this can be used with the raw option in conjunction with
 * {@link ic.candidEncode}.
 * @example
 * ```ts
 * ic.reply({
 *     raw: ic.candidEncode(
 *         '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "raw bytes"; "variant" = variant { Medium } })'
 *     )
 * });
 * )
 * ```
 */
export function reply(input: ReplyInput): Void {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    if ('raw' in input) {
        return globalThis._azleIc.replyRaw(input.raw.buffer);
    } else {
        const { candidType: type, data } = input;
        return globalThis._azleIc.replyRaw(encode(type, data).buffer);
    }
}
