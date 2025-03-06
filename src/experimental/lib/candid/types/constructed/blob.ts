import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleBlob {
    _azleKind = 'AzleBlob' as const;
    static _azleKind = 'AzleBlob' as const;

    static tsType: blob;

    static toBytes(data: blob): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): blob {
        return decode(this, bytes) as blob;
    }

    static getIdlType(): IDL.VecClass<number | bigint> {
        return IDL.Vec(IDL.Nat8);
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const blob = AzleBlob;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type blob = Uint8Array;
