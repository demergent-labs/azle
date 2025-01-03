import { IDL } from '@dfinity/candid';

import { idlEncode } from '../execute_with_candid_serde';

/**
 * Input options for the reply function. Either provide data with an optional IDL type,
 * or provide pre-encoded raw bytes.
 *
 * @typeParam T - The type of data being replied with
 */
type ReplyInput<T> =
    | {
          /** The data to reply with */
          data: T;
          /** Optional IDL type for Candid encoding */
          idlType?: IDL.Type;
      }
    | {
          /** Pre-encoded raw bytes to reply with */
          raw: Uint8Array;
      };

/**
 * Manually replies to an ingress message with either data or raw bytes.
 * Used in canister methods marked with {@link Manual} reply handling.
 *
 * @typeParam T - The type of data being replied with
 * @param input - Either data to be encoded and sent, or pre-encoded raw bytes
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * When using the data option:
 * - The data must match the type T specified in Manual<T>
 * - If idlType is provided, the data will be encoded using that type
 * - If idlType is omitted, the data will be encoded as an empty type
 *
 * @example
 * // Reply with data
 * reply({
 *   data: "Hello",
 *   idlType: IDL.Text
 * });
 *
 * // Reply with raw bytes
 * reply({
 *   raw: new Uint8Array([1, 2, 3])
 * });
 */
export function reply<T>(input: ReplyInput<T>): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    if ('raw' in input) {
        return globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.replyRaw(input.raw.buffer)
            : globalThis._azleIcStable.replyRaw(input.raw);
    } else {
        const idlType = input.idlType === undefined ? [] : [input.idlType];
        const data =
            input.data === undefined && input.idlType === undefined
                ? []
                : [input.data];

        return globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.replyRaw(
                  idlEncode(idlType, data).buffer
              )
            : globalThis._azleIcStable.replyRaw(idlEncode(idlType, data));
    }
}
