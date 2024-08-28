import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent } from '../../to_idl_type';
import { TypeMapping } from '../../type_mapping';
import { CandidTypeMap, toIdlTypeMap } from './to_idl_map';

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Record<
    T extends {
        [K in keyof T]: CandidType;
    }
>(obj: T) {
    return {
        ...obj,
        tsType: {} as {
            [K in keyof T]: TypeMapping<T[K]>;
        },
        toBytes(data: any): Uint8Array {
            return encode(this, data);
        },
        // TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        fromBytes(bytes: Uint8Array) {
            return decode(this, bytes);
        },
        getIdlType(parents: Parent[]): IDL.RecordClass {
            return IDL.Record(toIdlTypeMap(obj as CandidTypeMap, parents));
        }
    };
}
