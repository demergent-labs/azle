import { IDL } from './index';
import { CandidClass, Parent, toIDLType } from './utils';

export const bool = IDL.Bool;
export type bool = boolean;
export const blob = IDL.Vec(IDL.Nat8);
export type blob = Uint8Array;
export const empty = IDL.Empty;
export type empty = never;
export const int = IDL.Int;
export type int = bigint;
export const int8 = IDL.Int8;
export type int8 = number;
export const int16 = IDL.Int16;
export type int16 = number;
export const int32 = IDL.Int32;
export type int32 = number;
export const int64 = IDL.Int64;
export type int64 = bigint;
export const nat = IDL.Nat;
export type nat = bigint;
export const nat8 = IDL.Nat8;
export type nat8 = number;
export const nat16 = IDL.Nat16;
export type nat16 = number;
export const nat32 = IDL.Nat32;
export type nat32 = number;
export const nat64 = IDL.Nat64;
export type nat64 = bigint;
export const Null = IDL.Null;
export type Null = null;
export const reserved = IDL.Reserved;
export type reserved = any;
export const text = IDL.Text;
export type text = string;
export const float32 = IDL.Float32;
export type float32 = number;
export const float64 = IDL.Float64;
export type float64 = number;
export const principal = IDL.Principal;
export { Principal } from '@dfinity/principal';
export type Vec<T> = T[];
export type Tuple<T> = T;

/**
 * Represents an optional value: every {@link Opt} is either `Some` and contains
 * a value, or `None` and does not.
 */
export type Opt<Value> = [Value] | [];
export const Void = [];
export type Void = void;

/**
 * Wraps the provided value in a `Some` {@link Opt}
 * @param value - the value to be wrapped
 * @returns a `Some` {@link Opt} containing the provided value
 */
export function Some<T>(value: T): [T] {
    return [value];
}

/** An {@link Opt} representing the absence of a value */
export const None: [] = [];

// TODO what happens if we pass something to Opt() that can't be converted to CandidClass?
export function Opt<T>(t: CandidClass): AzleOpt {
    // return IDL.Opt(toIDLType(t));
    return new AzleOpt(t);
}

export interface GetIDL {
    getIDL(parents: Parent[]): IDL.Type<any>;
}

export class AzleOpt implements GetIDL {
    constructor(t: CandidClass) {
        this._azleType = t;
    }
    _azleType: CandidClass;
    getIDL(parents: Parent[]) {
        return IDL.Opt(toIDLType(this._azleType, []));
    }
}

export class AzleVec implements GetIDL {
    constructor(t: CandidClass) {
        this._azleType = t;
    }
    _azleType: CandidClass;
    getIDL(parents: Parent[]) {
        return IDL.Vec(toIDLType(this._azleType, []));
    }
}

export class AzleTuple implements GetIDL {
    constructor(t: CandidClass[]) {
        this._azleTypes = t;
    }
    _azleTypes: CandidClass[];
    getIDL(parents: Parent[]) {
        const candidTypes = this._azleTypes.map((value) => {
            return toIDLType(value, parents);
        });
        return IDL.Tuple(...candidTypes);
    }
}

export function Vec(t: CandidClass): AzleVec {
    // return IDL.Vec(toIDLType(t));
    return new AzleVec(t);
}

// TODO I am not sure of any of these types... but its working so...
export function Tuple(...types: CandidClass[]): AzleTuple {
    // const idlTypes = types.map((value) => {
    //     return toIDLType(value);
    // });
    // return IDL.Tuple(...idlTypes);
    return new AzleTuple(types);
}
