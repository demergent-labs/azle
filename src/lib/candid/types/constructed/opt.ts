import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdl } from '../../to_idl';
import { TypeMapping } from '../../type_mapping';
import { RequireExactlyOne } from './variant';
import { IDL } from '@dfinity/candid';

/**
 * Represents an optional value: every {@link Opt} is either `Some` and contains
 * a value, or `None` and does not.
 */
export type Opt<T> = RequireExactlyOne<{ Some: T; None: null }>;

/**
 * Wraps the provided value in a `Some` {@link Opt}
 * @param value - the value to be wrapped
 * @returns a `Some` {@link Opt} containing the provided value
 */
export function Some<T>(value: T) {
    return { Some: value };
}

/** An {@link Opt} representing the absence of a value */
export const None = { None: null };

// TODO what happens if we pass something to Opt() that can't be converted to CandidClass?
export function Opt<T extends CandidType>(t: T) {
    return new AzleOpt<T>(t);
}

export class AzleOpt<T> {
    constructor(t: any) {
        this.innerType = t;
    }

    tsType: RequireExactlyOne<{ Some: TypeMapping<T>; None: null }> = {} as any;

    innerType: CandidType;

    _azleKind: 'AzleOpt' = 'AzleOpt';
    static _azleKind: 'AzleOpt' = 'AzleOpt';

    toBytes(data: any) {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    getIdl(parents: Parent[]) {
        return IDL.Opt(toIdl(this.innerType, parents));
    }
}
