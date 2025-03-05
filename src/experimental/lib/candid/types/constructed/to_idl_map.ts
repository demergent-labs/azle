import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { Parent, toIdlType } from '../../to_idl_type';

export type CandidTypeMap = { [key: string]: CandidType };
export type IdlTypeMap = { [key: string]: IDL.Type<any> };

export function toIdlTypeMap(
    candidMap: CandidTypeMap,
    parent: Parent[]
): IdlTypeMap {
    const idlTypeMap: IdlTypeMap = {};

    for (const key in candidMap) {
        if (Object.prototype.hasOwnProperty.call(candidMap, key)) {
            const candidType = candidMap[key];
            idlTypeMap[key] = toIdlType(candidType, parent);
        }
    }

    return idlTypeMap;
}
