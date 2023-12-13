import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleFloat64 {
    _azleKind: 'AzleFloat64' = 'AzleFloat64';
    static _azleKind: 'AzleFloat64' = 'AzleFloat64';

    static tsType: float64;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Float64;
    }
}

export const float64 = AzleFloat64;
export type float64 = number;
