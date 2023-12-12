import { IDL } from '@dfinity/candid';
import { Opt } from '../../types/constructed';
import { VisitorData, VisitorResult } from './types';
import { visitRecord } from './visit/record';
import { visitRec } from './visit/recursive';
import { visitTuple } from './visit/tuple';
import { visitVariant } from './visit/variant';
import { visitVec } from './visit/vec';

/**
 * When we decode a Service we are given a principal. We need to use that
 * principal to create a Service class. Same things applies to Funcs except
 * that it has a principal and a name.
 */

export class DecodeVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return data.candidType(data.js_data);
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return data.js_data;
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
    /**
     * Converts empty arrays to `{None: null}` and an array with one item into
     * `{Some: value}`, transforming the value as needed as well.
     * @param t the IDL of the Opt class.
     * @param ty the IDL type of the `Some` value.
     * @param data {VisitorData<[] | [CandidType], AzleOpt<CandidType>>}
     * `data.js_data` is the raw array opt value. `data.js_class` is an
     * `AzleOpt<T>`.
     * @returns an object representation of an opt with a transformed some value
     * if necessary.
     */
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): Opt<T> {
        if (data.js_data.length === 0) {
            return { None: null };
        }

        const candid = ty.accept(this, {
            js_data: data.js_data[0],
            candidType: data.candidType.innerType
        });

        return {
            Some: candid
        };
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
