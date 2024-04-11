import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { TypeMapping } from '../../type_mapping';
import { CandidMap, toIdlMap } from './to_idl_map';

export type Variant<
    T extends {
        [K in keyof T]: any;
    }
> = RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}>;

export function Variant<
    T extends {
        [K in keyof T]: CandidType;
    }
>(obj: T) {
    return {
        ...obj,
        tsType: {} as Variant<T>,
        toBytes(data: any) {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array) {
            return decode(this, bytes);
        },
        getIdl(parents: any) {
            return IDL.Variant(toIdlMap(obj as CandidMap, parents));
        }
    };
}

export type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;
