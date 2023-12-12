import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';
import { TypeMapping } from '../../type_mapping';

export class AzleVec<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    tsType: TypeMapping<AzleVec<T>> = {} as any;

    innerType: CandidType;

    _azleKind: 'AzleVec' = 'AzleVec';
    static _azleKind: 'AzleVec' = 'AzleVec';

    toBytes(data: any) {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    getIdl(parents: Parent[]) {
        return IDL.Vec(toIdl(this.innerType, parents));
    }
}

// TODO Should we tighten the Vec<T> T type parameter? https://github.com/demergent-labs/azle/issues/1483
export type Vec<T> = TypeMapping<AzleVec<T>>;
export function Vec<T extends CandidType>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
