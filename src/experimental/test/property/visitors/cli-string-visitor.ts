import { IDL } from '@dfinity/candid';

import { escapeCandidName } from '#lib/did_file/visitor/quote_candid_name';
import { jsonStringify } from '#lib/json';

export type VisitorData = { value: any };

/**
 * The CLI string visitor will convert the value given in the VisitorData to
 * a string version that will work as an argument in a command line tool such
 * as dfx deploy
 */
export class CliStringVisitor extends IDL.Visitor<VisitorData, string> {
    visitFloat(_t: IDL.FloatClass, data: VisitorData): any {
        /**
         * If a float doesn't have a decimal it won't serialize properly, so
         * while 10 is a float it won't serialize unless it's 10.0
         */
        const floatString = data.value.toString();
        if (floatString.includes('.') || floatString.includes('e')) {
            return floatString;
        }
        return `${floatString}.0`;
    }
    visitText(_t: IDL.TextClass, data: VisitorData): string {
        return `"${escapeForBash(data.value)}"`;
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): string {
        const [principal, funcName] = data.value;
        const quotedFuncName = escapeCandidName(funcName);
        return `func "${principal.toString()}".${quotedFuncName}`;
    }
    visitOpt<T>(
        _t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): string {
        if (data.value.length === 0) {
            return 'null';
        } else {
            return `opt ${ty.accept(this, { value: data.value[0] })}`;
        }
    }
    visitRec<T>(
        _t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): string {
        return ty.accept(this, { value: data.value });
    }
    visitRecord(
        _t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): string {
        const fieldStrings = fields.map(([fieldName, fieldType]) => {
            const normalizedFieldName =
                fieldName.startsWith('"') && fieldName.endsWith('"')
                    ? fieldName.slice(1, -1)
                    : fieldName;
            const value = fieldType.accept(this, {
                value: data.value[normalizedFieldName]
            });
            const key = fieldName.startsWith('"')
                ? escapeCandidName(fieldName.slice(1, -1))
                : fieldName;
            return `${key} = ${value}`;
        });
        return `record {${fieldStrings.join('; ')}}`;
    }
    visitTuple<T extends any[]>(
        _t: IDL.TupleClass<T>,
        components: IDL.Type<any>[],
        data: VisitorData
    ): string {
        const fields = components.map((value, index) =>
            value.accept(this, {
                value: data.value[index]
            })
        );
        return `record {${fields.join('; ')}}`;
    }
    visitVariant(
        _t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): string {
        for (const [name, type] of fields) {
            const normalizedFieldName =
                name.startsWith('"') && name.endsWith('"')
                    ? name.slice(1, -1)
                    : name;
            if (
                Object.prototype.hasOwnProperty.call(
                    data.value,
                    normalizedFieldName
                )
            ) {
                const value = type.accept(this, {
                    value: data.value[normalizedFieldName]
                });
                const key = name.startsWith('"')
                    ? escapeCandidName(name.slice(1, -1))
                    : name;
                if (value === 'null') {
                    return `variant {${key}}`;
                } else {
                    return `variant {${key}=${value}}`;
                }
            }
        }
        throw new Error(`Variant has no data: ${jsonStringify(data.value)}`);
    }
    visitVec<T>(
        _t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): string {
        const elements = data.value.map((e: any) => {
            return ty.accept(this, { value: e });
        });
        return `vec {${elements.join('; ')}}`;
    }
    visitType<T>(t: IDL.Type<T>, data: VisitorData): string {
        return t.valueToString(data.value);
    }
}

function escapeForBash(input: string): string {
    // For text values inside double quotes, we need different escaping than for the entire string
    // When text is wrapped in double quotes in bash, we need to escape: backslashes and double quotes
    // But single quotes can remain as-is since they don't have special meaning in double-quoted strings
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes
}
