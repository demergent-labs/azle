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

    static toBytes(data: Null): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): Null {
        return decode<Null>(this, bytes) as Null;
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
export type Null = null;
