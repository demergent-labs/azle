import { CandidType, TypeMapping } from '../..';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { toIdlMap, CandidMap } from './to_idl_map';
import { IDL } from '@dfinity/candid';

export function Variant<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}> &
    CandidType {
    return {
        ...obj,
        toBytes(data: number): Uint8Array {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array): number {
            return decode(this, bytes);
        },
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
