import { CandidType, TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { Parent, processMap } from '../../../lib_new/utils';
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
            const idl = IDL.Rec();
            idl.fill(
                IDL.Record(
                    processMap(obj as any, [
                        ...parents,
                        {
                            idl: idl,
                            name
                        }
                    ])
                )
            );
            return idl;
        }
    } as any;
}
