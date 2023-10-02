import { CandidType, TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { Parent } from '../../to_idl_type';
import { processMap } from '..';
import { v4 } from 'uuid';

export function Record<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): {
    [K in keyof T]: TypeMapping<T[K]>;
} & { _azleCandidType?: '_azleCandidType' } {
    const name = v4();

    return {
        ...obj,
        _azleName: name,
        getIDL(parents: Parent[]) {
            return IDL.Record(processMap(obj as any, parents));
        }
    } as any;
}
