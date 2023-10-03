import { IDL } from '@dfinity/candid';
import { CandidType, toIDLType } from '../candid';
import { EncodeVisitor } from '../candid/serde/visitors/encode_visitor';

/**
 * Used to manually reply to an ingress message. Intended to be used in
 * canister methods with a {@link Manual} return type.
 * @param reply the value with which to reply. Must by of type `T` where `T`
 * is the generic type supplied to `Manual<T>`. Otherwise will result in an
 * uncaught `TypeError`.
 */
export function reply(data: any, type: CandidType): void {
    if (type.name === 'AzleVoid') {
        // return type is void
        const bytes = new Uint8Array(IDL.encode([], [])).buffer;
        return globalThis._azleIc.replyRaw(bytes);
    }

    const idlType = toIDLType(type, []);

    const encodeReadyResult = idlType.accept(new EncodeVisitor(), {
        js_class: type,
        js_data: data
    });

    const bytes = new Uint8Array(IDL.encode([idlType], [encodeReadyResult]))
        .buffer;
    return globalThis._azleIc.replyRaw(bytes);
}
