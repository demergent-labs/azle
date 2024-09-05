import { IDL } from '@dfinity/candid';

type ReplyInput<T> =
    | {
          data: T;
          idlType?: IDL.Type;
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
 */
export function reply<T>(input: ReplyInput<T>): void {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    if ('raw' in input) {
        return globalThis._azleIc.replyRaw(input.raw.buffer);
    } else {
        const idlType = input.idlType === undefined ? [] : [input.idlType];
        const data =
            input.data === undefined && input.idlType === undefined
                ? []
                : [input.data];

        // @ts-ignore IDL.encode types are defined incorrectly https://github.com/demergent-labs/azle/issues/2061
        return globalThis._azleIc.replyRaw(IDL.encode(idlType, data).buffer);
    }
}
