import { CandidType } from '../../index';
import { Parent, toIdl } from '../../index';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    innerTypes: CandidType[];
    _azleCandidType?: '_azleCandidType';

    toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    getIdl(parents: Parent[]) {
        const idls = this.innerTypes.map((value) => {
            return toIdl(value, parents);
        });
        return IDL.Tuple(...idls);
    }
}

export function Tuple<T extends any[]>(...types: T): AzleTuple<T> {
    return new AzleTuple(types);
}
export type Tuple<T> = T;
