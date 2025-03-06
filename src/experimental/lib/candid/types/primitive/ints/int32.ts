import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleInt32 {
    _azleKind = 'AzleInt32' as const;
    static _azleKind = 'AzleInt32' as const;

    static tsType: int32;

    static toBytes(data: int32): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): int32 {
        return decode<int32>(this, bytes) as int32;
    }

    static getIdlType(): IDL.FixedIntClass {
        return IDL.Int32;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const int32 = AzleInt32;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type int32 = number & { _azleKind?: 'AzleInt32' };
