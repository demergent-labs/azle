import { IDL } from '@dfinity/candid';
import { CandidType } from './candid_type';

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

export function toIdlArray(
    candidTypes: CandidType | CandidType[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    if (Array.isArray(candidTypes)) {
        return candidTypes.map((value) => toIdl(value, parents));
    }
    const idlType = toIdl(candidTypes, parents);

    return Array.isArray(idlType) ? idlType : [idlType];
}
