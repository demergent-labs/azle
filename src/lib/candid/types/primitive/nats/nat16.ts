import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat16 {
    _azleKind = 'AzleNat16' as const;
    static _azleKind = 'AzleNat16' as const;

    static tsType: nat16;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Nat16;
    }
}

export const nat16 = AzleNat16;
export type nat16 = number & { _azleKind?: 'AzleNat16' };
