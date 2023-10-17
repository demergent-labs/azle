import { IDL } from '@dfinity/candid';
import { CandidType } from '.';

export type Parent = {
    idl: IDL.RecClass;
    name: string;
};

export function toIdl(
    candidType: CandidType,
    parents: Parent[] = []
): IDL.Type<any> {
    if ('_azleName' in candidType) {
        const parent = parents.find(
            (parent) => parent.name === candidType._azleName
        );
        // If the parent isn't undefined (ie we found one with the same name)
        // this is a recursive type and we should return the parent rec idl
        // instead of calling getIDL
        if (parent !== undefined) {
            return parent.idl;
        }
    }
    if ('_azleIsCanister' in candidType && candidType._azleIsCanister) {
        return toIdl((candidType as any)(), parents);
    }
    // All CandidTypes ought to have a getIDL function defined for them
    return (candidType as any).getIDL(parents);
}

export function toParamIdls(
    paramCandidTypes: CandidType[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    return paramCandidTypes.map((value) => toIdl(value, parents));
}

export function toReturnIdl(
    returnCandidType: CandidType,
    parents: Parent[] = []
): IDL.Type<any>[] {
    const idlType = toIdl(returnCandidType, parents);

    return Array.isArray(idlType) ? idlType : [idlType];
}
