import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';
import { TypeMapping } from '../../type_mapping';
import { Serializable } from '../../../stable_b_tree_map';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    innerTypes: CandidType[];
    _azleCandidType?: '_azleCandidType';

    toBytes(data: any) {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    getIdl(parents: Parent[]) {
        const idls = this.innerTypes.map((value) => {
            return toIdl(value, parents);
        });
        return IDL.Tuple(...idls);
    }
}

export function Tuple<T extends any[]>(
    ...types: T
): {
    [P in keyof T]: TypeMapping<T[P]>;
} & CandidType &
    Partial<Serializable> {
    return new AzleTuple(types) as any;
}
export type Tuple<T> = T;
