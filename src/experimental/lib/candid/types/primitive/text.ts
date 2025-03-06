import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleText {
    _azleKind = 'AzleText' as const;
    static _azleKind = 'AzleText' as const;

    static tsType: text;

    static toBytes(data: string): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): string {
        return decode<string>(this, bytes) as string;
    }

    static getIdlType(): IDL.TextClass {
        return IDL.Text;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const text = AzleText;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type text = string;
