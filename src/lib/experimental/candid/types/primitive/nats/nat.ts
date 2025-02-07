import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
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

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const nat = AzleNat;
export type nat = bigint;
