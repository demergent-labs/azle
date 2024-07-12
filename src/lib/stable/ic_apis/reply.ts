import { IDL } from '..';

type ReplyInput<T> =
    | {
          data: T;
          idl?: IDL.Type;
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
        const idl = input.idl === undefined ? [] : [input.idl];
        const data =
            input.data === undefined && input.idl === undefined
                ? []
                : [input.data];

        // @ts-expect-error idl.d.ts specifies the wrong type for IDL.encode. It's actually a Uint8Array
        return globalThis._azleIc.replyRaw(IDL.encode(idl, data).buffer);
    }
}
