import { IDL } from './index';
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

export type Parent = {
    idl: IDL.RecClass;
    name: string;
};

export function toIDLType(idl: any, parents: Parent[]): IDL.Type<any> {
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
    if (idl._azleIsCanister) {
        return toIDLType(idl(), parents);
    }
    // if (idl.display === undefined || idl.getIDL === undefined) {
    //     throw Error(`${JSON.stringify(idl)} is not a candid type`);
    // }
    return idl;
}

export function toParamIDLTypes(
    idl: any[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    return idl.map((value) => toIDLType(value, parents));
}

export function toReturnIDLType(
    returnIdl: any,
    parents: Parent[] = []
): IDL.Type<any>[] {
    const idlType = toIDLType(returnIdl, parents);

    return Array.isArray(idlType) ? idlType : [idlType];
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
