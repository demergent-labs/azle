import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat {
    _azleKind: 'AzleNat' = 'AzleNat';
    static _azleKind: 'AzleNat' = 'AzleNat';

    static tsType: nat;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Nat;
    }
}

export const nat = AzleNat;
export type nat = bigint;
