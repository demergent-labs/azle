import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleNat64 {
    _azleKind = 'AzleNat64' as const;
    static _azleKind = 'AzleNat64' as const;

    static tsType: nat64;

    static toBytes(data: nat64): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): nat64 {
        return decode<nat64>(this, bytes) as nat64;
    }

    static getIdlType(): IDL.FixedNatClass {
        return IDL.Nat64;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const nat64 = AzleNat64;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type nat64 = bigint & { _azleKind?: 'AzleNat64' };
