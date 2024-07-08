import { IDL } from '..';

/**
 * Used to manually reply to an ingress message. Intended to be used in
 * canister methods with a {@link Manual} return type.
 * @param reply the value with which to reply. Must be of type `T` where `T`
 * is the generic type supplied to `Manual<T>`. Otherwise will result in an
 * uncaught `TypeError`.
 */
export function reply<T>(data: T, type: IDL.Type<T>): void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return globalThis._azleIc.replyRaw(
        new Uint8Array(IDL.encode([type], [data])).buffer
    );
}
