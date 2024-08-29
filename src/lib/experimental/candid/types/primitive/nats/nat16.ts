import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat16 {
    _azleKind = 'AzleNat16' as const;
    static _azleKind = 'AzleNat16' as const;

    static tsType: nat16;

    static toBytes(data: nat16): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): nat16 {
        return decode<nat16>(this, bytes) as nat16;
    }

    static getIdlType(): IDL.FixedNatClass {
        return IDL.Nat16;
    }
}

export const nat16 = AzleNat16;
export type nat16 = number & { _azleKind?: 'AzleNat16' };
