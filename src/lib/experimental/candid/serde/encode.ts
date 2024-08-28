import '../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType, toIdlType, toIdlTypeArray } from '../../candid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AzleOpt, AzleTuple, AzleVec } from '../types/constructed'; // Used for links in comments
import { EncodeVisitor } from './visitors/encode_visitor';

/**
 * Encodes the provided value as candid blob of the designated type.
 *
 * Intended to be a rich replacement for `IDL.encode` from `@dfinity/candid`,
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting any Azle values to official IDL values.
 *
 * @param data the value to encode
 * @param candidType either a built-in IDL data type, or an Azle-defined super-type
 * @returns candid bytes
 */
export function encode<T = any>(
    candidType: CandidType | CandidType[],
    data: T | T[]
): Uint8Array {
    if (Array.isArray(candidType)) {
        if (Array.isArray(data)) {
            return encodeMultiple(candidType, data);
        }
        throw new Error(
            'If multiple candid types are given then multiple data entries are expected.'
        );
    }
    return encodeSingle(candidType, data);
}

function encodeSingle(candidType: CandidType, data: any): Uint8Array {
    const idlType = toIdlType(candidType);

    // The candid type was AzleVoid if when converted to an Idl Type it is []
    const candidTypeWasAzleVoid = Array.isArray(idlType);

    if (candidTypeWasAzleVoid) {
        return new Uint8Array(IDL.encode([], []));
    }

    const encodeReadyKey = idlType.accept(new EncodeVisitor(), {
        candidType: candidType,
        js_data: data
    });

    return new Uint8Array(IDL.encode([idlType], [encodeReadyKey]));
}

function encodeMultiple(candidTypes: CandidType[], data: any[]): Uint8Array {
    const idlTypes = toIdlTypeArray(candidTypes);
    const values = data.map((datum, index) =>
        idlTypes[index].accept(new EncodeVisitor(), {
            candidType: candidTypes[index],
            js_data: datum
        })
    );

    return new Uint8Array(IDL.encode(idlTypes, values));
}
