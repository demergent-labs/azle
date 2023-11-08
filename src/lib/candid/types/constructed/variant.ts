import { CandidType } from '../../candid_type';
import { TypeMapping } from '../../type_mapping';
import { toIdlMap, CandidMap } from './to_idl_map';
import { IDL } from '@dfinity/candid';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Serializable } from '../../../stable_structures/stable_b_tree_map';

export function Variant<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}> &
    CandidType &
    Partial<Serializable> {
    return {
        ...obj,
        toBytes(data: any) {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array) {
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
