import {
    blob,
    bool,
    float32,
    float64,
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    Null,
    text,
    Void,
    Principal,
    CandidType
} from '../../../../src/lib';
import { SimpleCandidType } from '../candid_type';

export function candidTypeToRuntimeCandidTypeObject(
    candidType: SimpleCandidType
): CandidType {
    if (candidType === 'blob') {
        return blob;
    }
    if (candidType === 'bool') {
        return bool;
    }
    if (candidType === 'float32') {
        return float32;
    }
    if (candidType === 'float64') {
        return float64;
    }
    if (candidType === 'int') {
        return int;
    }
    if (candidType === 'int8') {
        return int8;
    }
    if (candidType === 'int16') {
        return int16;
    }
    if (candidType === 'int32') {
        return int32;
    }
    if (candidType === 'int64') {
        return int64;
    }
    if (candidType === 'nat') {
        return nat;
    }
    if (candidType === 'nat8') {
        return nat8;
    }
    if (candidType === 'nat16') {
        return nat16;
    }
    if (candidType === 'nat32') {
        return nat32;
    }
    if (candidType === 'nat64') {
        return nat64;
    }
    if (candidType === 'Null') {
        return Null;
    }
    if (candidType === 'text') {
        return text;
    }
    if (candidType === 'Void') {
        return Void;
    }
    if (candidType === 'Principal') {
        return Principal;
    }
    throw new Error(`Unexpected SimpleCandidType: ${candidType}`);
}
