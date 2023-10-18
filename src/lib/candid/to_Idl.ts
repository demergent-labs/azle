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
    if ('azleName' in candidType) {
        const parent = parents.find(
            (parent) => parent.name === candidType.azleName
        );
        // If the parent isn't undefined (ie we found one with the same name)
        // this is a recursive type and we should return the parent rec idl
        // instead of calling getIdl
        if (parent !== undefined) {
            return parent.idl;
        }
    }
    if ('isCanister' in candidType && candidType.isCanister) {
        return toIdl((candidType as any)(), parents);
    }
    // All CandidTypes ought to have a getIdl function defined for them
    return (candidType as any).getIdl(parents);
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
