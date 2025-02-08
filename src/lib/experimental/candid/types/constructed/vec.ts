import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdlType } from '../../to_idl_type';
import { TypeMapping } from '../../type_mapping';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleVec<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    tsType: TypeMapping<AzleVec<T>> = {} as any;

    innerType: CandidType;

    _azleKind = 'AzleVec' as const;
    static _azleKind = 'AzleVec' as const;

    toBytes(data: T[]): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array<ArrayBuffer>): T[] {
        // @ts-ignore
        return decode<T[]>(this, bytes);
    }

    getIdlType(parents: Parent[]): IDL.VecClass<T> {
        return IDL.Vec(toIdlType(this.innerType, parents));
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Vec<T> = TypeMapping<AzleVec<T>>;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function Vec<T extends CandidType>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
