import '../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType, toIdlType, toIdlTypeArray } from '../../candid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AzleOpt, AzleTuple, AzleVec } from '../types/constructed'; // Used for links in comments
import { DecodeVisitor } from './visitors/decode_visitor';

/**
 * Decodes the provided buffer into the designated JS value.
 *
 * Intended to be a rich replacement for `IDL.decode` from `@dfinity/candid`
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting them from their native shape to the shape that Azle expects.
 *
 * @param data the value to decode
 * @param candidType either a built-in IDL data type, or an Azle-defined super-type
 * @returns the Azle representation of the data
 */
export function decode<T = any>(
    candidType: CandidType | CandidType[],
    data: ArrayBuffer
): T | T[] {
    if (Array.isArray(candidType)) {
        return decodeMultiple(candidType, data);
    }
    return decodeSingle(candidType, data);
}

function decodeSingle(candidType: CandidType, data: ArrayBuffer): any {
    // TODO: there is a discrepancy between CandidType and CandidClass that
    // needs to be aligned so that this isn't an error. Both are representing
    // candid IDLs, either from the @dfinity/candid library or the
    // Azle-augmented ones
    const idlType = toIdlType(candidType);

    // The candid type was AzleVoid if when converted to an Idl Type it is []
    const candidTypeWasAzleVoid = Array.isArray(idlType);

    if (candidTypeWasAzleVoid) {
        return undefined;
    }

    const candidDecodedValue = IDL.decode([idlType], data)[0] as any;

    return idlType.accept(new DecodeVisitor(), {
        candidType: candidType,
        js_data: candidDecodedValue
    });
}

function decodeMultiple(candidTypes: CandidType[], data: ArrayBuffer): any[] {
    const idlTypes = toIdlTypeArray(candidTypes);
    const decoded = IDL.decode(idlTypes, data);
    return idlTypes.map((idlType, index) =>
        idlType.accept(new DecodeVisitor(), {
            candidType: candidTypes[index],
            js_data: decoded[index]
        })
    );
}
