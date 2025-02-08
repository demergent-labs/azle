import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdlType } from '../../to_idl_type';
import { TypeMapping } from '../../type_mapping';
import { RequireExactlyOne } from './variant';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Opt<T> = RequireExactlyOne<{ Some: T; None: null }>;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function Some<T>(value: T): Opt<T> {
    return { Some: value };
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const None = { None: null };

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function Opt<T extends CandidType>(t: T): AzleOpt<T> {
    return new AzleOpt<T>(t);
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleOpt<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    tsType: RequireExactlyOne<{ Some: TypeMapping<T>; None: null }> = {} as any;

    innerType: CandidType;

    _azleKind = 'AzleOpt' as const;
    static _azleKind = 'AzleOpt' as const;

    toBytes(data: any): Uint8Array<ArrayBuffer> {
        return encode(this, data);
    }

    // TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    fromBytes(bytes: Uint8Array<ArrayBuffer>) {
        // @ts-ignore
        return decode(this, bytes);
    }

    getIdlType(parents: Parent[]): IDL.OptClass<T> {
        return IDL.Opt(toIdlType(this.innerType, parents));
    }
}
