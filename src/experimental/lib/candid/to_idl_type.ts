import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from './candid_type';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Parent = {
    idlType: IDL.RecClass;
    name: string;
};

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function toIdlType(
    candidType: CandidType,
    parents: Parent[] = []
): IDL.Type<any> {
    if ('azleName' in candidType) {
        const parent = parents.find(
            (parent) => parent.name === candidType.azleName
        );
        // If the parent isn't undefined (ie we found one with the same name)
        // this is a recursive type and we should return the parent rec idl type
        // instead of calling getIdlType
        if (parent !== undefined) {
            return parent.idlType;
        }
    }
    if ('isCanister' in candidType && candidType.isCanister) {
        return toIdlType((candidType as any)(), parents);
    }
    // All CandidTypes ought to have a getIdlType function defined for them
    return (candidType as any).getIdlType(parents);
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function toIdlTypeArray(
    candidTypes: CandidType | CandidType[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    if (Array.isArray(candidTypes)) {
        return candidTypes.map((value) => toIdlType(value, parents));
    }
    const idlType = toIdlType(candidTypes, parents);

    return Array.isArray(idlType) ? idlType : [idlType];
}
