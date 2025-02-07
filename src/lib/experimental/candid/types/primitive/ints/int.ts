import '../../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleInt {
    _azleKind = 'AzleInt' as const;
    static _azleKind = 'AzleInt' as const;

    static tsType: int;

    static toBytes(data: int): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): int {
        return decode<int>(this, bytes.buffer) as int;
    }

    static getIdlType(): IDL.IntClass {
        return IDL.Int;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const int = AzleInt;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type int = bigint;
