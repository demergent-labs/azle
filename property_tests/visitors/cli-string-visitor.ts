import { IDL } from '@dfinity/candid';

export type VisitorData = { value: any };

/**
 * The CLI string visitor will convert the value given in the VisitorData to
 * a string version that will work as an argument in a command line tool such
 * as dfx deploy
 */
export class CliStringVisitor extends IDL.Visitor<VisitorData, string> {
    visitFloat(_t: IDL.FloatClass, data: VisitorData) {
        /**
         * If a float doesn't have a decimal it won't serialize properly, so
         * while 10 is a float it won't serialize unless it's 10.0
         */
        const floatString = data.value.toString();
        if (floatString.includes('.') || floatString.includes('e')) {
            return floatString;
        }
        return floatString + '.0';
    }
    visitText(_t: IDL.TextClass, data: VisitorData): string {
        return `"${escapeForBash(data.value)}"`;
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
            const value = fieldType.accept(this, {
                value: data.value[fieldName]
            });
            return `${fieldName} = ${value}`;
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
            if (data.value.hasOwnProperty(name)) {
                const value = type.accept(this, { value: data.value[name] });
                if (value === 'null') {
                    return `variant {${name}}`;
                } else {
                    return `variant {${name}=${value}}`;
                }
            }
        }
        throw new Error('Variant has no data: ' + data.value);
    }
    visitVec<T>(
        _t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): string {
        const elements = data.value.map((e: any) => {
            return ty.accept(this, { value: e });
        });
        return 'vec {' + elements.join('; ') + '}';
    }
    visitType<T>(t: IDL.Type<T>, data: VisitorData): string {
        return t.valueToString(data.value);
    }
}

function escapeForBash(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/'/g, "'\\''") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
