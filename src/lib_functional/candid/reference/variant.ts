import { TypeMapping } from '..';
import { IDL } from '@dfinity/candid';
import { processMap } from '../../../lib_new/utils';
import { v4 } from 'uuid';

export function Variant<T>(obj: T): RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}> {
    const name = v4();

    return {
        getIDL(parents: any) {
            const idl = IDL.Rec();
            idl.fill(
                IDL.Variant(
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

type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;
