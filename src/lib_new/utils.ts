import { Func, IDL, Record, Service, Variant } from './index';
// import { GetIDL } from './primitives';

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

export type Parent = {
    idl: IDL.RecClass;
    name: string;
};

export function toIDLType(idl: CandidClass, parents: Parent[]): IDL.Type<any> {
    if ('getIDL' in idl) {
        if ('_azleName' in idl) {
            const parent = parents.find(
                (parent) => parent.name === idl._azleName
            );
            if (parent !== undefined) {
                return {
                    ...parent.idl,
                    _azleName: idl._azleName,
                    name: parent.idl.name,
                    valueToString: (x): string => {
                        return parent.idl.valueToString(x);
                    },
                    buildTypeTable: (typeTable): void => {
                        return parent.idl.buildTypeTable(typeTable);
                    },
                    covariant: (x): x is any => {
                        return parent.idl.covariant(x);
                    },
                    encodeType: (typeTable): ArrayBuffer => {
                        return parent.idl.encodeType(typeTable);
                    },
                    checkType: (t) => {
                        return parent.idl.checkType(t);
                    },
                    _buildTypeTableImpl: (typeTable): void => {
                        return parent.idl._buildTypeTableImpl(typeTable);
                    },
                    // TODO check if this is still being called. maybe by adding a throw here and see if we hit it
                    display: () => parent.idl.name,
                    decodeValue: (b, t) => {
                        return parent.idl.decodeValue(b, t);
                    },
                    encodeValue: (b) => {
                        return parent.idl.encodeValue(b);
                    },
                    accept: (v, d) => {
                        return parent.idl.accept(v, d);
                    },
                    _id: parent.idl._id,
                    _type: parent.idl._type,
                    fill: (t: any): void => {
                        parent.idl.fill(t);
                    },
                    getType: () => {
                        return parent.idl.getType();
                    }
                };
            }
        }
        return idl.getIDL(parents);
    }
    // if (idl.display === undefined || idl.getIDL === undefined) {
    //     throw Error(`${JSON.stringify(idl)} is not a candid type`);
    // }
    return idl;
}

export function toParamIDLTypes(
    idl: CandidClass[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    return idl.map((value) => toIDLType(value, parents));
}

export function toReturnIDLType(
    returnIdl: ReturnCandidClass,
    parents: Parent[]
): IDL.Type<any>[] {
    const idlType = toIDLType(returnIdl, parents);

    if (Array.isArray(idlType)) {
        return [...idlType];
    }

    return [idlType];
}

export function isAsync(originalFunction: any) {
    if (originalFunction[Symbol.toStringTag] === 'AsyncFunction') {
        return true;
    } else if (originalFunction.constructor.name === 'AsyncFunction') {
        return true;
    } else if (originalFunction.toString().includes('async ')) {
        return true;
    } else {
        return false;
    }
}

type CandidMap = { [key: string]: any };

export function processMap(targetMap: CandidMap, parent: Parent[]): CandidMap {
    const newMap: CandidMap = {};

    for (const key in targetMap) {
        if (targetMap.hasOwnProperty(key)) {
            const value = targetMap[key];
            const newValue = toIDLType(value, parent);
            newMap[key] = newValue;
        }
    }

    return newMap;
}

export type CandidClass =
    | IDL.BoolClass
    | IDL.EmptyClass
    | IDL.FixedIntClass
    | IDL.FixedNatClass
    | IDL.FloatClass
    | IDL.IntClass
    | IDL.NatClass
    | IDL.NullClass
    | IDL.OptClass<any>
    | IDL.PrincipalClass
    | IDL.RecClass
    | IDL.ReservedClass
    | IDL.TextClass
    | IDL.TupleClass<any>
    | IDL.VecClass<any>
    | IDL.VecClass<number | bigint> // blob
    | typeof Record
    | typeof Variant
    | typeof Service
    | typeof Func;

export type ReturnCandidClass = CandidClass | never[];
