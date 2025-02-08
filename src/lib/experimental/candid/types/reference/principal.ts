import '../../../experimental';

import { IDL } from '@dfinity/candid';
import { Principal as DfinityPrincipal } from '@dfinity/principal';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent } from '../../to_idl_type';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class Principal extends DfinityPrincipal {
    static _azleKind = 'Principal' as const;

    static tsType: Principal;

    static toBytes(data: DfinityPrincipal): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array<ArrayBuffer>): DfinityPrincipal {
        // @ts-ignore
        return decode<DfinityPrincipal>(this, bytes);
    }

    static getIdlType(_parents: Parent[]): IDL.PrincipalClass {
        return IDL.Principal;
    }
}
