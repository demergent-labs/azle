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

export function getDefaultVisitorData(): VisitorData {
    return {
        usedRecClasses: [],
        isOnService: false,
        isFirstService: false,
        systemFuncs: []
    };
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
