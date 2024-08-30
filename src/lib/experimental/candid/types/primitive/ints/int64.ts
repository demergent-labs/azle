import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt64 {
    _azleKind = 'AzleInt64' as const;
    static _azleKind = 'AzleInt64' as const;

    static tsType: int64;

    static toBytes(data: int64): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): int64 {
        return decode<int64>(this, bytes) as int64;
    }

    static getIdlType(): IDL.FixedIntClass {
        return IDL.Int64;
    }
}
export const int64 = AzleInt64;
export type int64 = bigint & { _azleKind?: 'AzleInt64' };
