import { IDL } from '@dfinity/candid';
import {
    VisitorData,
    VisitorResult,
    visitOpt,
    visitRec,
    visitRecord,
    visitTuple,
    visitVariant,
    visitVec
} from '.';

/**
 * When we decode a Service we are given a principal. We need to use that
 * principal to create a Service class. Same things applies to Funcs except
 * that it has a principal and a name.
 */

export class DecodeVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return data.js_class(data.js_data);
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return new data.js_class(data.js_data[0], data.js_data[1]);
    }
    visitPrimitive<T>(
        t: IDL.PrimitiveType<T>,
        data: VisitorData
    ): VisitorResult {
        return data.js_data;
    }
    visitTuple<T extends any[]>(
        t: IDL.TupleClass<T>,
        components: IDL.Type<any>[],
        data: VisitorData
    ): VisitorResult {
        return visitTuple(this, components, data);
    }
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitOpt(this, ty, data);
    }
    visitVec<T>(
        t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitVec(this, ty, data);
    }
    visitRec<T>(
        t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): VisitorResult {
        return visitRec(this, ty, data);
    }
    visitRecord(
        t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitRecord(this, fields, data);
    }
    visitVariant(
        t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitVariant(this, fields, data);
    }
}
