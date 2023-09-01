import { IDL } from './index';
import { AzleTuple, AzleVec, AzleOpt } from './primitives';
import { Record } from './record';

/*
 * Look at each type,
is it a recursive type
yes
    add the name to a global list of names
look at all of the sub types
recur

 */

type TypeName = string;
export type CandidDef = string;
export type CandidTypesDefs = { [key: TypeName]: CandidDef };

export function extractCandid(
    paramInfo: [CandidDef, CandidTypesDefs][],
    additionalCandidDefs: CandidTypesDefs
): [CandidDef[], CandidTypesDefs] {
    const paramCandid = paramInfo.map(([candid, _candidTypeDefs]) => {
        return candid;
    });
    const candidTypeDefs = paramInfo.reduce(
        (acc, [_candid, candidTypeDefs]) => {
            return { ...acc, ...candidTypeDefs };
        },
        additionalCandidDefs
    );
    return [paramCandid, candidTypeDefs];
}

export function display(
    idl: CandidClass,
    candidTypeDefs: CandidTypesDefs
): [CandidDef, CandidTypesDefs] {
    if (idl instanceof IDL.RecClass) {
        // For RecClasses the definition will be the name, that name will
        // reference the actual definition which will be added to the list of
        // candid type defs that will get put at the top of the candid file
        // Everything else will just be the normal inline candid def
        const candid = extractCandid(
            [display(idl.getType(), candidTypeDefs)],
            candidTypeDefs
        );
        return [idl.name, { ...candid[1], [idl.name]: candid[0][0] }];
    }
    if (idl instanceof IDL.TupleClass) {
        const fields = idl._components.map((value) =>
            display(value, candidTypeDefs)
        );
        const candid = extractCandid(fields, candidTypeDefs);
        return [`record {${candid[0].join('; ')}}`, candid[1]];
    }
    if (idl instanceof IDL.OptClass) {
        const candid = extractCandid(
            [display(idl._type, candidTypeDefs)],
            candidTypeDefs
        );
        return [`opt ${candid[0]}`, candid[1]];
    }
    if (idl instanceof IDL.RecordClass) {
        const candidFields = idl._fields.map(([key, value]) =>
            display(value, candidTypeDefs)
        );
        const candid = extractCandid(candidFields, candidTypeDefs);
        const fields = idl._fields.map(
            ([key, value], index) => key + ':' + candid[0][index]
        );
        return [`record {${fields.join('; ')}}`, candid[1]];
    }
    if (idl instanceof IDL.FuncClass) {
        return [`func ${idl.display().replace(/→/g, '->')}`, candidTypeDefs];
    }
    if (idl !== undefined && !('display' in idl)) {
        throw Error(`${JSON.stringify(idl)} is not a candid type`);
    }
    if (idl === undefined) {
        throw Error('cannot convert undefined to candid');
    }
    return [idl.display(), candidTypeDefs];
}

export type Parent = {
    idl: IDL.RecClass;
    name: string;
};

type IDLable = {
    getIDL: () => CandidClass;
    name: string;
};

export function toCandidClass(
    idl: CandidClass | IDLable,
    parents: Parent[]
): CandidClass {
    if ('getIDL' in idl) {
        if ('name' in idl) {
            const parent = parents.find((parent) => parent.name === idl.name);
            if (parent !== undefined) {
                return { display: () => parent.idl.name };
            }
        }
        return idl.getIDL(parents);
    }
    // if (idl.display === undefined || idl.getIDL === undefined) {
    //     throw Error(`${JSON.stringify(idl)} is not a candid type`);
    // }
    return idl;
}

export function toParamCandidClasses(idl: CandidClass[]): CandidClass[] {
    return idl.map((value) => toCandidClass(value, []));
}

export function toReturnCandidClass(
    returnIdl: ReturnCandidClass
): CandidClass[] {
    if (Array.isArray(returnIdl)) {
        // If Void
        if (returnIdl.length === 0) {
            return [];
        }
        // Should be unreachable
        return [];
    }
    return [toCandidClass(returnIdl, [])];
}

type CandidMap = { [key: string]: any };

export function processMap(targetMap: CandidMap, parent: Parent[]): CandidMap {
    const newMap: CandidMap = {};

    for (const key in targetMap) {
        if (targetMap.hasOwnProperty(key)) {
            const value = targetMap[key];
            const newValue = toCandidClass(value, parent);
            newMap[key] = newValue;
        }
    }

    return newMap;
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
    | IDL.TupleClass<any>
    | IDL.VecClass<any>
    | IDL.OptClass<any>
    | AzleTuple
    | AzleVec
    | AzleOpt
    | IDL.RecClass
    | IDL.VecClass<number | bigint>; // blob

export type ReturnCandidClass = CandidClass | never[];
