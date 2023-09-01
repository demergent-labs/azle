import { IDL } from './index';
import { Record } from './record';

export function display(paramIdl: CandidClass) {
    if (paramIdl instanceof IDL.FuncClass) {
        return `func ${paramIdl.display().replace(/→/g, '->')}`;
    }
    return paramIdl.display();
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
    | Record
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

export type ReturnCandidClass = CandidClass | never[];
