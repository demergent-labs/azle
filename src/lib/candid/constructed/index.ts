import { Parent, toIDLType } from '../../';

export * from './blob';
export * from './option';
export * from './record';
export * from './tuple';
export * from './variant';
export * from './vector';

type CandidMap = { [key: string]: any };

export function processMap(targetMap: CandidMap, parent: Parent[]): CandidMap {
    const newMap: CandidMap = {};

    for (const key in targetMap) {
        if (targetMap.hasOwnProperty(key)) {
            const value = targetMap[key];
            const newValue = toIDLType(value, parent);
            newMap[key] = newValue;
        }
    }

    return newMap;
}
