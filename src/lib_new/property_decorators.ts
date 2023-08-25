import { IDL } from '@dfinity/candid';

export function candid(type: CandidClass) {
    return function (target: any, key: string) {
        addToAzleCandidMap(target, toCandidClass(type), key);
    };
}

export function toCandidClass(idl: CandidClass): CandidClass {
    if (idl.getIDL !== undefined) {
        return idl.getIDL();
    }
    return idl;
}

export function toCandidClasses(idl: CandidClass[]): CandidClass[] {
    return idl.map((value) => toCandidClass(value));
}

export function toReturnCandidClass(
    returnIdl: ReturnCandidClass
): CandidClass[] {
    if (Array.isArray(returnIdl)) {
        if (returnIdl.length === 0) {
            return [];
        }
        return [];
    }
    return [toCandidClass(returnIdl)];
}

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
    | IDL.VecClass<any>
    | IDL.OptClass<any>
    | IDL.VecClass<number | bigint>; // blob

export type ReturnCandidClass = CandidClass | [];

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
}

export const candidToIdl = {
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
