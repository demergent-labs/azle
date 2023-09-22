import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

type VisitorData = { js_data: any; js_class: any };
type VisitorResult = any;

/**
 * For the encode visitor what do we need to do?
 *
 * For services we need to get the principal out of the service
 * For funcs we need to get the principal and name out of the func
 * For everything else we need to mak sure we visit all of the sub things.
 *
 * We still want the js_class because we will use that to recreate the variant and record I believe
 */

export class EncodeVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return data.js_data.canisterId;
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
        const fields = components.map((value, index) =>
            value.accept(this, {
                js_data: data.js_data[index],
                js_class: data.js_class._azleTypes[index]
            })
        );
        return [...fields];
    }
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        if (data.js_data.length === 0) {
            return data.js_data;
        }
        const candid = ty.accept(this, {
            js_data: data.js_data[0],
            js_class: data.js_class._azleType
        });
        return [candid];
    }
    visitVec<T>(
        t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        if (ty instanceof IDL.PrimitiveType) {
            return data.js_data;
        }
        const vec_elems = data.js_data.map((array_elem: any) => {
            return ty.accept(this, {
                js_data: array_elem,
                js_class: data.js_class._azleType
            });
        });
        return [...vec_elems];
    }
    /**
     * Lets see the funcs are going to similar to the services....
     * We have a function name and a principal id
     * @param t
     * @param data
     * @returns
     */
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return [Principal.fromText(data.js_data.principal), data.js_data.name];
    }
    visitRec<T>(
        t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): VisitorResult {
        // TODO I imagine that this will be the spot of much torment when we get
        // to doing actual recursive types, maybe
        return ty.accept(this, data);
    }
    visitRecord(
        t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        const candidFields = fields.reduce((acc, [memberName, memberIdl]) => {
            const fieldData = data.js_data[memberName];
            const fieldClass = data.js_class._azleCandidMap[memberName];

            return {
                ...acc,
                [memberName]: memberIdl.accept(this, {
                    js_data: fieldData,
                    js_class: fieldClass
                })
            };
        }, {});
        return data.js_class.create(candidFields);
    }
    visitVariant(
        t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        const candidFields = fields.reduce((acc, [memberName, memberIdl]) => {
            const fieldData = data.js_data[memberName];
            const fieldClass = data.js_class._azleCandidMap[memberName];
            if (fieldData === undefined) {
                // If the field data is undefined then it is not the variant that was used
                return acc;
            }
            return {
                ...acc,
                [memberName]: memberIdl.accept(this, {
                    js_class: fieldClass,
                    js_data: fieldData
                })
            };
        }, {});
        return data.js_class.create(candidFields);
    }
}
