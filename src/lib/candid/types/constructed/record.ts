import { CandidType, TypeMapping, Parent } from '../../index';
import { IDL } from '@dfinity/candid';
import { processMap } from '../constructed';

export function Record<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): {
    [K in keyof T]: TypeMapping<T[K]>;
} & { _azleCandidType?: '_azleCandidType' } {
    return {
        ...obj,
        getIDL(parents: Parent[]) {
            return IDL.Record(processMap(obj as any, parents));
        }
    } as any;
}
