import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import {
    VisitorData,
    VisitorResult,
    visitOpt,
    visitRec,
    visitRecord,
    visitTuple,
    visitVariant,
    visitVec
} from './encode_decode';

/**
 * When we encode a Service we have a service class and we need it to be only
 * a principal. As a Service is visited the canisterId needs to be extracted so
 * it will be encoded correctly. Same thing with Funcs except we need to extract
 * the principal and name and put it into a tuple.
 */

export class EncodeVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return data.js_data.canisterId;
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return [Principal.fromText(data.js_data.principal), data.js_data.name];
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
