import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat64 {
    _azleKind = 'AzleNat64' as const;
    static _azleKind = 'AzleNat64' as const;

    static tsType: nat64;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Nat64;
    }
}
export const nat64 = AzleNat64;
export type nat64 = bigint & { _azleKind?: 'AzleNat64' };
