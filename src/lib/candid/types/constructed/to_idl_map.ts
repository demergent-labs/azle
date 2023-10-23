import { IDL } from '@dfinity/candid';
import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';

export type CandidMap = { [key: string]: CandidType };
export type IdlMap = { [key: string]: IDL.Type<any> };

export function toIdlMap(candidMap: CandidMap, parent: Parent[]): IdlMap {
    const idlMap: IdlMap = {};

    for (const key in candidMap) {
        if (candidMap.hasOwnProperty(key)) {
            const candidType = candidMap[key];
            idlMap[key] = toIdl(candidType, parent);
        }
    }

    return idlMap;
}
