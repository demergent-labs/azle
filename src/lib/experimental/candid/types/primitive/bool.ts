import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleBool {
    _azleKind = 'AzleBool' as const;
    static _azleKind = 'AzleBool' as const;

    static tsType: bool;

    static toBytes(data: bool): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): bool {
        return decode<bool>(this, bytes.buffer) as bool;
    }

    static getIdlType(): IDL.BoolClass {
        return IDL.Bool;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const bool = AzleBool;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type bool = boolean;
