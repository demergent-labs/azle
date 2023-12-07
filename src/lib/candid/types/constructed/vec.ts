import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';
import { TypeMapping } from '../../type_mapping';
import { blob } from '../constructed/blob';
import { nat8 } from '../primitive/nats/nat8';
import { nat64 } from '../primitive/nats/nat64';
import { nat } from '../primitive/nats/nat';
import { nat32 } from '../primitive/nats/nat32';
import { nat16 } from '../primitive/nats/nat16';
import { int } from '../primitive/ints/int';
import { int64 } from '../primitive/ints/int64';
import { int32 } from '../primitive/ints/int32';
import { int16 } from '../primitive/ints/int16';
import { int8 } from '../primitive/ints/int8';
import { Principal } from '../reference';

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

// TODO we should tighten T to be only CandidTypes...it just gets tricky
// TODO I have walked back the tightening for the moment because of problems it is causing
export type Vec<T> = TypeMapping<AzleVec<T>>;
export function Vec<T>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
