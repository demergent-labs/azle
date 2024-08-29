import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat8 {
    _azleKind = 'AzleNat8' as const;
    static _azleKind = 'AzleNat8' as const;

    static tsType: nat8;

    static toBytes(data: nat8): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): nat8 {
        return decode<nat8>(this, bytes) as nat8;
    }

    static getIdlType(): IDL.FixedNatClass {
        return IDL.Nat8;
    }
}

export const nat8 = AzleNat8;
export type nat8 = number & { _azleKind?: 'AzleNat8' };
