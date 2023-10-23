import { CandidType, TypeMapping, Parent } from '../../index';
import { IDL } from '@dfinity/candid';
import { toIdlMap, CandidMap } from './to_idl_map';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export function Record<
    T extends {
        [K in keyof T]: CandidType;
    }
>(
    obj: T
): {
    [K in keyof T]: TypeMapping<T[K]>;
} & CandidType {
    return {
        ...obj,
        toBytes(data: number): Uint8Array {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array): number {
            return decode(this, bytes);
        },
        getIdl(parents: Parent[]) {
            return IDL.Record(toIdlMap(obj as CandidMap, parents));
        }
    } as any;
}
