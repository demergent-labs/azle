import { CandidType, Parent, toIdl } from '../../index';
import { IDL } from '@dfinity/candid';

export * from './blob';
export * from './opt';
export * from './record';
export * from './tuple';
export * from './variant';
export * from './vec';

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
