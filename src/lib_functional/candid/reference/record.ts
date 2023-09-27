import { TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { Parent, processMap } from '../../../lib_new/utils';
import { v4 } from 'uuid';

export function Record<T>(obj: T): {
    [K in keyof T]: TypeMapping<T[K]>;
} {
    const name = v4();

    return {
        ...obj,
        _azleName: name,
        getIDL(parents: Parent[]) {
            return IDL.Record(processMap(obj as any, parents));
        }
    } as any;
}
