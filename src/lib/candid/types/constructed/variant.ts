import { CandidType, TypeMapping } from '../..';
import { toIdlMap, CandidMap } from '.';
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
        getIdl(parents: any) {
            return IDL.Variant(toIdlMap(obj as CandidMap, parents));
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
