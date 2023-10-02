import { IDL } from '@dfinity/candid';

import { AzleVec, AzleOpt, AzleTuple } from '..';
import { DecodeVisitor, EncodeVisitor } from './visitors/';
import { CandidType, toIDLType } from '../..';

/**
 * Encodes the provided value as candid blob of the designated type.
 *
 * Intended to be a rich replacement for `IDL.encode` from `@dfinity/candid`,
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting any Azle values to official IDL values.
 *
 * @param data the value to encode
 * @param fakeIdl either a built-in IDL data type, or an Azle-defined super-type
 * @returns candid bytes
 */
export function encode(
    data: any,
    fakeIdl: IDL.Type<any> | CandidType
): Uint8Array {
    // TODO: there is a discrepancy between CandidType and CandidClass that
    // needs to be aligned so that this isn't an error. Both are representing
    // candid IDLs, either from the @dfinity/candid library or the
    // Azle-augmented ones
    const realIDL = toIDLType(fakeIdl, []);

    const encodeReadyKey = realIDL.accept(new EncodeVisitor(), {
        js_class: fakeIdl,
        js_data: data
    });

    return new Uint8Array(IDL.encode([realIDL], [encodeReadyKey]));
}

/**
 * Decodes the provided buffer into the designated JS value.
 *
 * Intended to be a rich replacement for `IDL.decode` from `@dfinity/candid`
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting them from their native shape to the shape that Azle expects.
 *
 * @param data the value to decode
 * @param fakeIdl either a built-in IDL data type, or an Azle-defined super-type
 * @returns the Azle representation of the data
 */
export function decode(
    data: ArrayBuffer,
    fakeIdl: IDL.Type<any> | CandidType
): any {
    // TODO: there is a discrepancy between CandidType and CandidClass that
    // needs to be aligned so that this isn't an error. Both are representing
    // candid IDLs, either from the @dfinity/candid library or the
    // Azle-augmented ones
    const realIDL = toIDLType(fakeIdl, []);

    const idlIsAzleVoid = Array.isArray(realIDL);

    if (idlIsAzleVoid) {
        return undefined;
    }

    const candidDecodedValue = IDL.decode([realIDL], data)[0] as any;

    return realIDL.accept(new DecodeVisitor(), {
        js_class: fakeIdl,
        js_data: candidDecodedValue
    });
}

export function encodeMultiple(
    data: any[],
    fakeIdls: (IDL.Type<any> | CandidType)[]
): Uint8Array {
    const { values, idls } = data.reduce<{
        values: any[];
        idls: IDL.Type<any>[];
    }>(
        (acc, datum, index) => {
            const fakeIdl = fakeIdls[index];
            const realIDL = toIDLType(fakeIdl, []);

            const encodeReadyValue = realIDL.accept(new EncodeVisitor(), {
                js_class: fakeIdl,
                js_data: datum
            });

            return {
                values: [...acc.values, encodeReadyValue],
                idls: [...acc.idls, realIDL]
            };
        },
        { values: [], idls: [] }
    );

    return new Uint8Array(IDL.encode(idls, values));
}
