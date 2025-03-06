import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { TypeMapping } from '../../type_mapping';
import { CandidTypeMap, toIdlTypeMap } from './to_idl_map';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Variant<
    T extends {
        [K in keyof T]: any;
    }
> = RequireExactlyOne<{
    [K in keyof T]: TypeMapping<T[K]>;
}>;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Variant<
    T extends {
        [K in keyof T]: CandidType;
    }
>(obj: T) {
    return {
        ...obj,
        tsType: {} as Variant<T>,
        toBytes(data: any): Uint8Array {
            return encode(this, data);
        },
        // TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        fromBytes(bytes: Uint8Array) {
            return decode(this, bytes);
        },
        getIdlType(parents: any): IDL.VariantClass {
            return IDL.Variant(toIdlTypeMap(obj as CandidTypeMap, parents));
        }
    };
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;
