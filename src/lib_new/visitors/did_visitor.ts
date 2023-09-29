import { IDL } from '@dfinity/candid';

type VisitorData = {
    usedRecClasses: IDL.RecClass[];
    is_on_service: boolean;
    isFirstService: boolean;
};
type VisitorResult = [CandidDef, CandidTypesDefs];

export const DEFAULT_VISITOR_DATA: VisitorData = {
    usedRecClasses: [],
    is_on_service: false,
    isFirstService: false
};

export function DidResultToCandidString(result: VisitorResult): string {
    const candid = result[0];
    const candidTypes = Object.values(result[1]);
    const candidTypesString =
        candidTypes.length > 0
            ? Object.entries(result[1])
                  .map(([name, type]) => `type ${name} = ${type};`)
                  .join('\n') + '\n'
            : '';
    const candidTypesStringOld =
        candidTypes.length > 0 ? candidTypes.join(';\n') + ';\n' : '';
    return candidTypesString + candid;
}

type TypeName = string;
export type CandidDef = string;
export type CandidTypesDefs = { [key: TypeName]: CandidDef };
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

export class DidVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        const stuff = t._fields.map(([_name, func]) =>
            func.accept(this, { ...data, is_on_service: true })
        );
        const candid = extractCandid(stuff);
        const funcStrings = candid[0]
            .map((value, index) => {
                return `\t${t._fields[index][0]}: ${value};`;
            })
            .join('\n');
        if (data.isFirstService) {
            return [`service: () -> {\n${funcStrings}\n}`, candid[1]];
        }
        return [`service {\n${funcStrings}\n}`, candid[1]];
    }
    visitPrimitive<T>(
        t: IDL.PrimitiveType<T>,
        data: VisitorData
    ): VisitorResult {
        return [t.display(), {}];
    }
    visitTuple<T extends any[]>(
        t: IDL.TupleClass<T>,
        components: IDL.Type<any>[],
        data: VisitorData
    ): VisitorResult {
        const fields = components.map((value) =>
            value.accept(this, { ...data, is_on_service: false })
        );
        const candid = extractCandid(fields);
        return [`record {${candid[0].join('; ')}}`, candid[1]];
    }
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        const candid = ty.accept(this, { ...data, is_on_service: false });
        return [`opt ${candid[0]}`, candid[1]];
    }
    visitVec<T>(
        t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        const candid = ty.accept(this, { ...data, is_on_service: false });
        return [`vec ${candid[0]}`, candid[1]];
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        const argsTypes = t.argTypes.map((value) =>
            value.accept(this, { ...data, is_on_service: false })
        );
        const candidArgs = extractCandid(argsTypes);
        const retsTypes = t.retTypes.map((value) =>
            value.accept(this, { ...data, is_on_service: false })
        );
        const candidRets = extractCandid(retsTypes);
        const args = candidArgs[0].join(', ');
        const rets = candidRets[0].join(', ');
        const annon = ' ' + t.annotations.join(' ');
        return [
            `${
                data.is_on_service ? '' : 'func '
            }(${args}) -> (${rets})${annon}`,
            { ...candidArgs[1], ...candidRets[1] }
        ];
    }
    visitRec<T>(
        t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): VisitorResult {
        // For RecClasses the definition will be the name, that name will
        // reference the actual definition which will be added to the list of
        // candid type defs that will get put at the top of the candid file
        // Everything else will just be the normal inline candid def
        const usedRecClasses = data.usedRecClasses;
        if (!usedRecClasses.includes(t)) {
            const candid = ty.accept(this, {
                usedRecClasses: [...usedRecClasses, t],
                is_on_service: false,
                isFirstService: false
            });
            return [t.name, { ...candid[1], [t.name]: candid[0] }];
        }
        // If our list already includes this rec class then just return, we don't
        // need the list because we will get it when we go through the arm above
        return [t.name, {}];
    }
    visitRecord(
        t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        const candidFields = fields.map(([key, value]) =>
            value.accept(this, { ...data, is_on_service: false })
        );
        const candid = extractCandid(candidFields);
        const field_strings = fields.map(
            ([key, value], index) => key + ':' + candid[0][index]
        );
        return [`record {${field_strings.join('; ')}}`, candid[1]];
    }
    visitVariant(
        t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        const candidFields = fields.map(([key, value]) =>
            value.accept(this, { ...data, is_on_service: false })
        );
        const candid = extractCandid(candidFields);
        const fields_string = fields.map(
            ([key, value], index) =>
                key + (value.name === 'null' ? '' : ':' + candid[0][index])
        );
        return [`variant {${fields_string.join('; ')}}`, candid[1]];
    }
}
