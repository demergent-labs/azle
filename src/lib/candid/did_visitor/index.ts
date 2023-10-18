import { IDL } from '@dfinity/candid';
import { visitService } from './visit_service';
import { visitVariant } from './visit_variant';
import { visitRecord } from './visit_record';
import { visitRecursive } from './visit_recursive';
import { visitPrimitive } from './visit_primitive';
import { visitTuple } from './visit_tuple';
import { visitOpt } from './visit_opt';
import { visitVec } from './visit_vec';
import { visitFunc } from './visit_func';

export type VisitorData = {
    usedRecClasses: IDL.RecClass[];
    isOnService: boolean;
    isFirstService: boolean;
    systemFuncs: IDL.FuncClass[];
};
export type VisitorResult = [CandidDef, CandidTypesDefs];

export type TypeName = string;
export type CandidDef = string;
export type CandidTypesDefs = { [key: TypeName]: CandidDef };

const CANDID_KEYWORDS = [
    'blob',
    'bool',
    'float32',
    'float64',
    'func',
    'int',
    'int16',
    'int32',
    'int64',
    'int8',
    'nat',
    'nat16',
    'nat32',
    'nat64',
    'nat8',
    'null',
    'opt',
    'principal',
    'query',
    'record',
    'service',
    'text',
    'variant',
    'vec'
];

export function getDefaultVisitorData(): VisitorData {
    return {
        usedRecClasses: [],
        isOnService: false,
        isFirstService: false,
        systemFuncs: []
    };
}

export function didResultToCandidString(result: VisitorResult): string {
    // TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
    // TODO Once types have names we should deduplicate the init and post_upgrade param types
    // TODO maybe even before we have names we should deduplicate all sorts of types
    // The rust to candid converter we were using did have names, but if two things
    // had the same shape they got merged into one type that had one of the names.
    // That might not be the ideal situation, but it is the expected behavior in rust

    const [candid, candidTypeDefs] = result;
    const candidTypesString = newTypeToCandidString(candidTypeDefs);
    return candidTypesString + candid + '\n';
}

export class DidVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return visitService(t, this, data);
    }
    visitPrimitive<T>(
        t: IDL.PrimitiveType<T>,
        _data: VisitorData
    ): VisitorResult {
        return visitPrimitive(t);
    }
    visitTuple<T extends any[]>(
        _t: IDL.TupleClass<T>,
        components: IDL.Type<any>[],
        data: VisitorData
    ): VisitorResult {
        return visitTuple(components, this, data);
    }
    visitOpt<T>(
        _t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitOpt(ty, this, data);
    }
    visitVec<T>(
        _t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitVec(ty, this, data);
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return visitFunc(t, this, data);
    }
    visitRec<T>(
        t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): VisitorResult {
        return visitRecursive(t, ty, this, data);
    }
    visitRecord(
        _t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitRecord(fields, this, data);
    }
    visitVariant(
        _t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitVariant(fields, this, data);
    }
}

export function escapeCandidKeywords(key: string): string {
    if (CANDID_KEYWORDS.includes(key)) {
        return `"${key}"`;
    }
    return key;
}

function newTypeToCandidString(newTypes: CandidTypesDefs): string {
    return Object.entries(newTypes).length > 0
        ? newTypesToStingArr(newTypes).join('\n') + '\n'
        : '';
}

function newTypesToStingArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid};`
    );
}

export function extractCandid(
    paramInfo: [CandidDef, CandidTypesDefs][]
): [CandidDef[], CandidTypesDefs] {
    const paramCandid = paramInfo.map(([candid, _candidTypeDefs]) => {
        return candid;
    });
    const candidTypeDefs = paramInfo.reduce(
        (acc, [_candid, candidTypeDefs]) => {
            return { ...acc, ...candidTypeDefs };
        },
        {}
    );
    return [paramCandid, candidTypeDefs];
}
