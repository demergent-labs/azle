import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleFloat32 {
    _azleKind: 'AzleFloat32' = 'AzleFloat32';
    static _azleKind: 'AzleFloat32' = 'AzleFloat32';

    static tsType: float32;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Float32;
    }
}

export const float32 = AzleFloat32;
export type float32 = number;
