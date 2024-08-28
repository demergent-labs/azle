import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt {
    _azleKind = 'AzleInt' as const;
    static _azleKind = 'AzleInt' as const;

    static tsType: int;

    static toBytes(data: int): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): int {
        return decode<int>(this, bytes) as int;
    }

    static getIdlType(): IDL.IntClass {
        return IDL.Int;
    }
}

export const int = AzleInt;
export type int = bigint;
