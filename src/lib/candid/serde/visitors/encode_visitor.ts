import { IDL } from '@dfinity/candid';
import { VisitorData, VisitorResult } from './types';
import { visitTuple } from './visit/tuple';
import { visitVec } from './visit/vec';
import { visitRecord } from './visit/record';
import { visitRec } from './visit/recursive';
import { visitVariant } from './visit/variant';

/**
 * When we encode a Service we have a service class and we need it to be only
 * a principal. As a Service is visited the canisterId needs to be extracted so
 * it will be encoded correctly. Same thing with Funcs except we need to extract
 * the principal and name and put it into a tuple.
 */

export class EncodeVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return data.js_data.principal;
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
     * Converts `Some` values (`{Some: value}`) to `[value]` and `None` values
     * (`{None: null}`) to `[]` (the empty array), transforming any `Some`
     * values.
     *
     * @param t the IDL of the Opt class.
     * @param ty the IDL type of the `Some` value.
     * @param data {VisitorData<Variant<{Some: CandidType; None: null;}>,
     * AzleOpt<CandidType>>} `data.js_data` is the raw Some/None object.
     * `data.js_class` is an `AzleOpt<T>`.
     * @returns an array representation of an opt with a transformed some value
     * if necessary.
     */
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): [] | [any] {
        if ('Some' in data.js_data) {
            const candid = ty.accept(this, {
                js_data: data.js_data.Some,
                candidType: data.candidType.innerType
            });

            return [candid];
        }

        return [];
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
