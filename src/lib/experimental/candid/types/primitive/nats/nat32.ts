import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat32 {
    _azleKind = 'AzleNat32' as const;
    static _azleKind = 'AzleNat32' as const;

    static tsType: nat32;

    static toBytes(data: nat32): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): nat32 {
        return decode<nat32>(this, bytes) as nat32;
    }

    static getIdlType(): IDL.FixedNatClass {
        return IDL.Nat32;
    }
}
export const nat32 = AzleNat32;
export type nat32 = number & { _azleKind?: 'AzleNat32' };
