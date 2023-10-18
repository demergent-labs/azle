import { IDL } from '@dfinity/candid';

import { AzleVec, AzleOpt, AzleTuple } from '../types/constructed';
import { EncodeVisitor } from './visitors/encode_visitor';
import { CandidType, toIdl, toIdlArray } from '../../candid';

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
export function encode(
    candidType: CandidType | CandidType[],
    data: any | any[]
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
    const idl = toIdl(candidType);

    const idlIsAzleVoid = Array.isArray(idl);

    if (idlIsAzleVoid) {
        return new Uint8Array(IDL.encode([], []));
    }

    const encodeReadyKey = idl.accept(new EncodeVisitor(), {
        candidType: candidType,
        js_data: data
    });

    return new Uint8Array(IDL.encode([idl], [encodeReadyKey]));
}

function encodeMultiple(candidTypes: CandidType[], data: any[]): Uint8Array {
    const idls = toIdlArray(candidTypes);
    const values = data.map((datum, index) =>
        idls[index].accept(new EncodeVisitor(), {
            candidType: candidTypes[index],
            js_data: datum
        })
    );

    return new Uint8Array(IDL.encode(idls, values));
}
