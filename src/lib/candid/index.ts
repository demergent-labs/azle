import { IDL } from '..';
import {
    AzleBlob,
    blob,
    AzleVec,
    AzleOpt,
    AzleInt,
    AzleInt64,
    AzleInt32,
    AzleInt16,
    AzleInt8,
    AzleNat,
    AzleNat64,
    AzleNat32,
    AzleNat16,
    AzleNat8,
    AzleFloat64,
    AzleFloat32,
    AzleResult,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    int,
    int64,
    int32,
    int16,
    int8,
    float64,
    float32,
    AzleNull,
    Null,
    AzleReserved,
    reserved,
    AzleEmpty,
    empty,
    AzleBool,
    bool,
    Principal,
    AzleTuple,
    AzleText,
    AzleVoid,
    Opt,
    Result
} from './';

export * from './constructed';
export * from './primitive';
export * from './reference';

export type TypeMapping<T, RecursionLevel = 0> = RecursionLevel extends 10
    ? T
    : T extends () => any
    ? ReturnType<T>
    : T extends AzleText
    ? string
    : T extends AzleBool
    ? bool
    : T extends AzleInt
    ? int
    : T extends AzleInt64
    ? int64
    : T extends AzleInt32
    ? int32
    : T extends AzleInt16
    ? int16
    : T extends AzleInt8
    ? int8
    : T extends AzleNat
    ? nat
    : T extends AzleNat64
    ? nat64
    : T extends AzleNat32
    ? nat32
    : T extends AzleNat16
    ? nat16
    : T extends AzleNat8
    ? nat8
    : T extends AzleFloat64
    ? float64
    : T extends AzleFloat32
    ? float32
    : T extends AzleVoid
    ? void
    : T extends AzleTuple<infer U>
    ? {
          [K in keyof U]: TypeMapping<
              U[K],
              RecursionLevel extends 0
                  ? 1
                  : RecursionLevel extends 1
                  ? 2
                  : RecursionLevel extends 2
                  ? 3
                  : RecursionLevel extends 3
                  ? 4
                  : RecursionLevel extends 4
                  ? 5
                  : RecursionLevel extends 5
                  ? 6
                  : RecursionLevel extends 6
                  ? 7
                  : RecursionLevel extends 8
                  ? 9
                  : RecursionLevel extends 9
                  ? 10
                  : 10
          >;
      }
    : T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer Some>
    ? Opt<TypeMapping<Some>>
    : T extends AzleResult<infer U, infer W>
    ? Result<TypeMapping<U>, TypeMapping<W>>
    : T extends AzleBlob
    ? blob
    : T extends typeof Principal
    ? Principal
    : T extends AzleNull
    ? Null
    : T extends AzleReserved
    ? reserved
    : T extends AzleEmpty
    ? empty
    : T;

export type CandidType = {
    _azleCandidType?: '_azleCandidType';
};

export type Parent = {
    idl: IDL.RecClass;
    name: string;
};

export function toIDLType(idl: CandidType, parents: Parent[]): IDL.Type<any> {
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
    idl: CandidType[],
    parents: Parent[] = []
): IDL.Type<any>[] {
    return idl.map((value) => toIDLType(value, parents));
}

export function toReturnIDLType(
    returnIdl: CandidType,
    parents: Parent[] = []
): IDL.Type<any>[] {
    const idlType = toIDLType(returnIdl, parents);

    return Array.isArray(idlType) ? idlType : [idlType];
}
