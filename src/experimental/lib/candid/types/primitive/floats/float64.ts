import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleFloat64 {
    _azleKind = 'AzleFloat64' as const;
    static _azleKind = 'AzleFloat64' as const;

    static tsType: float64;

    static toBytes(data: float64): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): float64 {
        return decode<float64>(this, bytes) as float64;
    }

    static getIdlType(): IDL.FloatClass {
        return IDL.Float64;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const float64 = AzleFloat64;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type float64 = number;
