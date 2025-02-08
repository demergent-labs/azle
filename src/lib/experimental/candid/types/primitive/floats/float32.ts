import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleFloat32 {
    _azleKind = 'AzleFloat32' as const;
    static _azleKind = 'AzleFloat32' as const;

    static tsType: float32;

    static toBytes(data: float32): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): float32 {
        // @ts-ignore
        return decode<float32>(this, bytes);
    }

    static getIdlType(): IDL.FloatClass {
        return IDL.Float32;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const float32 = AzleFloat32;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type float32 = number;
