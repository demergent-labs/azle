import '#experimental/build/assert_experimental';

import { IDL } from '#lib/index';

import { SimpleCandidType } from '../candid_type';

export function candidTypeToRuntimeTypeObject(
    candidType: SimpleCandidType
): IDL.Type {
    if (candidType === 'blob') {
        return IDL.Vec(IDL.Nat8);
    }
    if (candidType === 'bool') {
        return IDL.Bool;
    }
    if (candidType === 'float32') {
        return IDL.Float32;
    }
    if (candidType === 'float64') {
        return IDL.Float64;
    }
    if (candidType === 'int') {
        return IDL.Int;
    }
    if (candidType === 'int8') {
        return IDL.Int8;
    }
    if (candidType === 'int16') {
        return IDL.Int16;
    }
    if (candidType === 'int32') {
        return IDL.Int32;
    }
    if (candidType === 'int64') {
        return IDL.Int64;
    }
    if (candidType === 'nat') {
        return IDL.Nat;
    }
    if (candidType === 'nat8') {
        return IDL.Nat8;
    }
    if (candidType === 'nat16') {
        return IDL.Nat16;
    }
    if (candidType === 'nat32') {
        return IDL.Nat32;
    }
    if (candidType === 'nat64') {
        return IDL.Nat64;
    }
    if (candidType === 'Null') {
        return IDL.Null;
    }
    if (candidType === 'text') {
        return IDL.Text;
    }
    if (candidType === 'Principal') {
        return IDL.Principal;
    }
    throw new Error(`Unexpected SimpleCandidType: ${candidType}`);
}
