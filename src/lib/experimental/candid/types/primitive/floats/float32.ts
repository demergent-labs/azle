import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleFloat32 {
    _azleKind = 'AzleFloat32' as const;
    static _azleKind = 'AzleFloat32' as const;

    static tsType: float32;

    static toBytes(data: float32): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): float32 {
        return decode<float32>(this, bytes) as float32;
    }

    static getIdlType(): IDL.FloatClass {
        return IDL.Float32;
    }
}

export const float32 = AzleFloat32;
export type float32 = number;
