import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleNat {
    _azleKind = 'AzleNat' as const;
    static _azleKind = 'AzleNat' as const;

    static tsType: nat;

    static toBytes(data: nat): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): nat {
        return decode(this, bytes) as nat;
    }

    static getIdlType(): IDL.NatClass {
        return IDL.Nat;
    }
}

export const nat = AzleNat;
export type nat = bigint;
