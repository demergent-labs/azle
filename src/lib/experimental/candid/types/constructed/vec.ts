import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdlType } from '../../to_idl_type';
import { TypeMapping } from '../../type_mapping';

export class AzleVec<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    tsType: TypeMapping<AzleVec<T>> = {} as any;

    innerType: CandidType;

    _azleKind = 'AzleVec' as const;
    static _azleKind = 'AzleVec' as const;

    toBytes(data: T[]): Uint8Array {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array): T[] {
        return decode<T[]>(this, bytes) as T[];
    }

    getIdlType(parents: Parent[]): IDL.VecClass<T> {
        return IDL.Vec(toIdlType(this.innerType, parents));
    }
}

// TODO Should we tighten the Vec<T> T type parameter? https://github.com/demergent-labs/azle/issues/1483
export type Vec<T> = TypeMapping<AzleVec<T>>;
export function Vec<T extends CandidType>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
