import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleVec<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    innerType: CandidType;

    _azleKind: 'AzleVec' = 'AzleVec';
    _azleCandidType?: '_azleCandidType';

    static _azleKind: 'AzleVec' = 'AzleVec';
    static _azleCandidType?: '_azleCandidType';

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

export type Vec<T> = T[];
export function Vec<T>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
