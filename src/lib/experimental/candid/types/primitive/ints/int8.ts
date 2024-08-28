import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt8 {
    _azleKind = 'AzleInt8' as const;
    static _azleKind = 'AzleInt8' as const;

    static tsType: int8;

    static toBytes(data: int8): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): int8 {
        return decode<int8>(this, bytes) as int8;
    }

    static getIdlType(): IDL.FixedIntClass {
        return IDL.Int8;
    }
}

export const int8 = AzleInt8;
export type int8 = number & { _azleKind?: 'AzleInt8' };
