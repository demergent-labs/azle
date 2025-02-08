import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleNull {
    _azleKind = 'AzleNull' as const;
    static _azleKind = 'AzleNull' as const;

    static tsType: Null;

    static toBytes(data: Null): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): Null {
        // @ts-ignore
        return decode<Null>(this, bytes);
    }

    static getIdlType(): IDL.NullClass {
        return IDL.Null;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const Null = AzleNull;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Null = null;
