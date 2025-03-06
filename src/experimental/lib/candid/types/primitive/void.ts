import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleVoid {
    _azleKind = 'AzleVoid' as const;
    static _azleKind = 'AzleVoid' as const;

    static tsType: Void;

    static toBytes(data: undefined): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): undefined {
        return decode<undefined>(this, bytes) as undefined;
    }

    static getIdlType(): IDL.Type<any> {
        return [] as unknown as IDL.Type<any>;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const Void = AzleVoid;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Void = void;
