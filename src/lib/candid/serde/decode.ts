import { IDL } from '@dfinity/candid';

import { AzleVec, AzleOpt, AzleTuple } from '../types/constructed';
import { DecodeVisitor } from './visitors/decode_visitor';
import { CandidType, toIdl, toIdlArray } from '../../candid';

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
export function decode(
    candidType: CandidType | CandidType[],
    data: ArrayBuffer
): any | any[] {
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
    const idl = toIdl(candidType);

    const idlIsAzleVoid = Array.isArray(idl);

    if (idlIsAzleVoid) {
        return undefined;
    }

    const candidDecodedValue = IDL.decode([idl], data)[0] as any;

    return idl.accept(new DecodeVisitor(), {
        candidType: candidType,
        js_data: candidDecodedValue
    });
}

function decodeMultiple(candidTypes: CandidType[], data: ArrayBuffer): any[] {
    const idls = toIdlArray(candidTypes);
    const decoded = IDL.decode(idls, data);
    return idls.map((idl, index) =>
        idl.accept(new DecodeVisitor(), {
            candidType: candidTypes[index],
            js_data: decoded[index]
        })
    );
}
