import { IDL } from '@dfinity/candid';
import { Record, Variant } from '.';

export function candid(type: CandidType | CandidClass) {
    return function (target, key) {
        if (typeof type === 'string') {
            addToAzleCandidMap(target, candidToIdl[type], key);
        } else {
            addToAzleCandidMap(target, type, key);
        }
    };
}

export type CandidType =
    | 'blob'
    | 'bool'
    | 'empty'
    | 'int'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'nat'
    | 'nat8'
    | 'nat16'
    | 'nat32'
    | 'nat64'
    | 'null'
    | 'reserved'
    | 'text'
    | 'float32'
    | 'float64'
    | 'principal';

export type CandidClass =
    | IDL.BoolClass
    | IDL.EmptyClass
    | IDL.IntClass
    | IDL.FixedIntClass
    | IDL.NatClass
    | IDL.FixedNatClass
    | IDL.NullClass
    | IDL.ReservedClass
    | IDL.TextClass
    | IDL.FloatClass
    | IDL.PrincipalClass
    | IDL.VecClass<CandidClass>
    | IDL.OptClass<CandidClass>
    | IDL.VecClass<number | bigint>; // blob

// @ts-ignore
function addToAzleCandidMap(target, idl, name) {
    // TODO I forsee an issue where we have naming conflicts
    if (!target.constructor._azleCandidMap) {
        target.constructor._azleCandidMap = {};
    }

    target.constructor._azleCandidMap = {
        ...target.constructor._azleCandidMap,
        [name]: idl
    };
    if (target instanceof Record) {
        target.constructor._azleEncoder = IDL.Record(
            target.constructor._azleCandidMap
        );
    }
    if (target instanceof Variant) {
        target.constructor._azleEncoder = IDL.Variant(
            target.constructor._azleCandidMap
        );
    }
}

const candidToIdl = {
    bool: IDL.Bool,
    empty: IDL.Empty,
    int: IDL.Int,
    int8: IDL.Int8,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
    nat: IDL.Nat,
    nat8: IDL.Nat8,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    null: IDL.Null,
    reserved: IDL.Reserved,
    text: IDL.Text,
    float32: IDL.Float32,
    float64: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8)
};

// // @ts-ignore
// export function int(target, key) {
//     addToAzleCandidMap(target, IDL.Int, key);
// }

// // @ts-ignore
// export function nat32(target, key) {
//     addToAzleCandidMap(target, IDL.Nat32, key);
// }

// // @ts-ignore
// export function text(target, key) {
//     addToAzleCandidMap(target, IDL.Text, key);
// }

// // @ts-ignore
// export function bool(target, key) {
//     addToAzleCandidMap(target, IDL.Bool, key);
// }
