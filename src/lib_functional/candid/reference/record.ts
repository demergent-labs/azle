import { TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { processMap } from '../../../lib_new/utils';
import { v4 } from 'uuid';

export function Record<T>(obj: T): {
    [K in keyof T]: TypeMapping<T[K]>;
} {
    const name = v4();

    return {
        ...obj,
        getIDL(parents: any) {
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
