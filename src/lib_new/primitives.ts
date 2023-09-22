import { IDL } from './index';
import { Parent, toCandidClass } from './utils';

export class AzleNat {
    _kind: 'AzleNat' = 'AzleNat';
    static getIDL() {
        return IDL.Nat;
    }
}

export class AzleNat64 {
    _kind: 'AzleNat64' = 'AzleNat64';
    static getIDL() {
        return IDL.Nat64;
    }
}

export class AzleNat32 {
    _kind: 'AzleNat32' = 'AzleNat32';
    static getIDL() {
        return IDL.Nat32;
    }
}

export class AzleNat16 {
    _kind: 'AzleNat16' = 'AzleNat16';
    static getIDL() {
        return IDL.Nat16;
    }
}

export class AzleNat8 {
    _kind: 'AzleNat8' = 'AzleNat8';
    static getIDL() {
        return IDL.Nat8;
    }
}

export class AzleInt {
    _kind: 'AzleInt' = 'AzleInt';
    static getIDL() {
        return IDL.Int;
    }
}

export class AzleInt64 {
    _kind: 'AzleInt64' = 'AzleInt64';
    static getIDL() {
        return IDL.Int64;
    }
}

export class AzleInt32 {
    _kind: 'AzleInt32' = 'AzleInt32';
    static getIDL() {
        return IDL.Int32;
    }
}

export class AzleInt16 {
    _kind: 'AzleInt16' = 'AzleInt16';
    static getIDL() {
        return IDL.Int16;
    }
}

export class AzleInt8 {
    _kind: 'AzleInt8' = 'AzleInt8';
    static getIDL() {
        return IDL.Int8;
    }
}

export class AzleFloat64 {
    _kind: 'AzleFloat64' = 'AzleFloat64';
    static getIDL() {
        return IDL.Float64;
    }
}

export class AzleFloat32 {
    _kind: 'AzleFloat32' = 'AzleFloat32';
    static getIDL() {
        return IDL.Float32;
    }
}

export class AzleBlob {
    _kind: 'AzleBlob' = 'AzleBlob';
    static getIDL() {
        return IDL.Vec(IDL.Nat8);
    }
}

export class AzleNull {
    _kind: 'AzleNull' = 'AzleNull';
    static getIDL() {
        return IDL.Null;
    }
}

export class AzleReserved {
    _kind: 'AzleReserved' = 'AzleReserved';
    static getIDL() {
        return IDL.Reserved;
    }
}

export class AzleEmpty {
    _kind: 'AzleEmpty' = 'AzleEmpty';
    static getIDL() {
        return IDL.Empty;
    }
}

export class AzleBool {
    _kind: 'AzleBool' = 'AzleBool';
    static getIDL() {
        return IDL.Bool;
    }
}

export class AzlePrincipal {
    _kind: 'AzlePrincipal' = 'AzlePrincipal';
    static getIDL() {
        return IDL.Principal;
    }
}

export const bool: AzleBool = AzleBool as any;
export type bool = boolean;
export const blob: AzleBlob = AzleBlob as any;
export type blob = Uint8Array;
export const empty: AzleEmpty = AzleEmpty as any;
export type empty = never;
export const int: AzleInt = AzleInt as any;
export type int = bigint;
export const int8: AzleInt8 = AzleInt8 as any;
export type int8 = number;
export const int16: AzleInt16 = AzleInt16 as any;
export type int16 = number;
export const int32: AzleInt32 = AzleInt32 as any;
export type int32 = number;
export const int64: AzleInt64 = AzleInt64 as any;
export type int64 = bigint;
export const nat: AzleNat = AzleNat as any;
export type nat = bigint;
export const nat8: AzleNat8 = AzleNat8 as any;
export type nat8 = number;
export const nat16: AzleNat16 = AzleNat16 as any;
export type nat16 = number;
export const nat32: AzleNat32 = AzleNat32 as any;
export type nat32 = number;
export const nat64: AzleNat64 = AzleNat64 as any;
export type nat64 = bigint;
export const Null: AzleNull = AzleNull as any;
export type Null = null;
export const reserved: AzleReserved = AzleReserved as any;
export type reserved = any;
export const text = IDL.Text;
export type text = string;
export const float32: AzleFloat32 = AzleFloat32 as any;
export type float32 = number;
export const float64: AzleFloat64 = AzleFloat64 as any;
export type float64 = number;
export const principal: AzlePrincipal = AzlePrincipal as any;
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
export function Opt<T>(t: T): AzleOpt<T> {
    // return IDL.Opt(toCandidClass(t));
    return new AzleOpt(t);
}

export class AzleOpt<T> {
    constructor(t: any) {
        this._azleType = t;
    }
    _azleType: any;
    getIDL(parents: Parent[]) {
        return IDL.Opt(toCandidClass(this._azleType, []));
    }
}

export class AzleVec<T> {
    constructor(t: any) {
        this._azleType = t;
    }
    _azleType: any;
    getIDL(parents: Parent[]) {
        return IDL.Vec(toCandidClass(this._azleType, []));
    }
}

export class AzleTuple {
    constructor(t: any[]) {
        this._azleTypes = t;
    }
    _azleTypes: any[];
    getIDL(parents: Parent[]) {
        const candidTypes = this._azleTypes.map((value) => {
            return toCandidClass(value, parents);
        });
        return IDL.Tuple(...candidTypes);
    }
}

export function Vec<T>(t: T): AzleVec<T> {
    // return IDL.Vec(toCandidClass(t));
    return new AzleVec(t);
}

// TODO I am not sure of any of these types... but its working so...
export function Tuple<T extends any[]>(...types: T): AzleTuple {
    // const candidTypes = types.map((value) => {
    //     return toCandidClass(value);
    // });
    // return IDL.Tuple(...candidTypes);
    return new AzleTuple(types);
}
