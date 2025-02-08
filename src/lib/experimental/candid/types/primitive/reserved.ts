import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleReserved {
    _azleKind = 'AzleReserved' as const;
    static _azleKind = 'AzleReserved' as const;

    static tsType: reserved;

    static toBytes(data: any): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): any {
        // @ts-ignore
        return decode(this, bytes);
    }

    static getIdlType(): IDL.ReservedClass {
        return IDL.Reserved;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const reserved = AzleReserved;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type reserved = any;
