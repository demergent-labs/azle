import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt16 {
    _azleKind = 'AzleInt16' as const;
    static _azleKind = 'AzleInt16' as const;

    static tsType: int16;

    static toBytes(data: int16): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): int16 {
        return decode<int16>(this, bytes) as int16;
    }

    static getIdlType(): IDL.FixedIntClass {
        return IDL.Int16;
    }
}
export const int16 = AzleInt16;
export type int16 = number & { _azleKind?: 'AzleInt16' };
