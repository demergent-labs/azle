import { CandidType, TypeMapping, Parent } from '../../index';
import { IDL } from '@dfinity/candid';
import { toIdlMap, CandidMap } from './to_idl_map';

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
        getIdl(parents: Parent[]) {
            return IDL.Record(toIdlMap(obj as CandidMap, parents));
        }
    } as any;
}
