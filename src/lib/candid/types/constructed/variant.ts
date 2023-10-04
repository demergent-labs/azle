import { CandidType, TypeMapping } from '../..';
import { processMap } from '.';
import { v4 } from 'uuid';
import { IDL } from '@dfinity/candid';

export function Variant<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}> & { _azleCandidType?: '_azleCandidType' } {
    return {
        ...obj,
        getIDL(parents: any) {
            return IDL.Variant(processMap(obj as any, parents));
        }
    } as any;
}

export type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;
