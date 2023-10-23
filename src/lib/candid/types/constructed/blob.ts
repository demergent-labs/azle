import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleBlob {
    _azleKind: 'AzleBlob' = 'AzleBlob';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Vec(IDL.Nat8);
    }
}

export const blob = AzleBlob;
export type blob = Uint8Array;
