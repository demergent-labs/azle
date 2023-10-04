import { IDL } from '@dfinity/candid';

type VisitorData = {
    usedRecClasses: IDL.RecClass[];
    isOnService: boolean;
    isFirstService: boolean;
    systemFuncs: IDL.FuncClass[];
};
type VisitorResult = [CandidDef, CandidTypesDefs];

type TypeName = string;
type CandidDef = string;
type CandidTypesDefs = { [key: TypeName]: CandidDef };

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

// TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
// TODO Once types have names we should deduplicate the init and post_upgrade param types
// TODO maybe even before we have names we should deduplicate all sorts of types
// The rust to candid converter we were using did have names, but if two things
// had the same shape they got merged into one type that had one of the names.
// That might not be the ideal situation, but it is the expected behavior in rust

export const DEFAULT_VISITOR_DATA: VisitorData = {
    usedRecClasses: [],
    isOnService: false,
    isFirstService: false,
    systemFuncs: []
};

export function didResultToCandidString(result: VisitorResult): string {
    const [candid, candidTypeDefs] = result;
    const candidTypesString = newTypeToCandidString(candidTypeDefs);
    return candidTypesString + candid + '\n';
}

export class DidVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        const canisterMethods = extractCandid(
            t._fields.map(([_name, func]) =>
                func.accept(this, {
                    ...data,
                    isOnService: true,
                    isFirstService: false
                })
            )
        );

        const isInitFunction = (func: IDL.FuncClass) =>
            func.annotations.includes('init');
        const isPostUpgradeFunction = (func: IDL.FuncClass) =>
            func.annotations.includes('postUpgrade');
        // To get the service params we need to look at the init function
        const initMethod = extractCandid(
            data.systemFuncs
                .filter((func) => isInitFunction(func))
                .map((initFunc) =>
                    initFunc.accept(this, {
                        ...data,
                        isOnService: true,
                        isFirstService: false
                    })
                )
        );
        const postMethod = extractCandid(
            data.systemFuncs
                .filter((func) => isPostUpgradeFunction(func))
                .map((initFunc) =>
                    initFunc.accept(this, {
                        ...data,
                        isOnService: true,
                        isFirstService: false
                    })
                )
        );
        const initMethodCandidString = initMethod[0];
        const postMethodCandidString = postMethod[0];
        function getFunctionParams(
            initFuncString: string[],
            postFuncString: string[]
        ) {
            if (initFuncString.length === 0) {
                if (postFuncString.length === 0) {
                    return '()';
                }
                const parts = postFuncString[0].split('->');
                if (parts.length >= 2) {
                    return parts[0].trim();
                }
            }
            const parts = initFuncString[0].split('->');
            if (parts.length >= 2) {
                return parts[0].trim();
            }
        }
        const canisterParamsString = getFunctionParams(
            initMethodCandidString,
            postMethodCandidString
        );

        const candidTypes = {
            ...canisterMethods[1],
            ...initMethod[1],
            ...postMethod[1]
        };

        const tab = data.isFirstService ? '    ' : '';
        const func_separator = data.isFirstService ? '\n' : ' ';

        const funcStrings = canisterMethods[0]
            .map((value, index) => {
                return `${tab}${escapeCandidKeywords(
                    t._fields[index][0]
                )}: ${value};`;
            })
            .join(func_separator);
        if (data.isFirstService) {
            return [
                `service: ${canisterParamsString} -> {\n${funcStrings}\n}`,
                candidTypes
            ];
        }
        return [`service {${funcStrings}}`, candidTypes];
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
            value.accept(this, { ...data, isOnService: false })
        );
        const candid = extractCandid(fields);
        return [`record {${candid[0].join('; ')}}`, candid[1]];
    }
    visitOpt<T>(
        t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        const candid = ty.accept(this, { ...data, isOnService: false });
        return [`opt ${candid[0]}`, candid[1]];
    }
    visitVec<T>(
        t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        const candid = ty.accept(this, { ...data, isOnService: false });
        return [`vec ${candid[0]}`, candid[1]];
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        const argsTypes = t.argTypes.map((value) =>
            value.accept(this, { ...data, isOnService: false })
        );
        const candidArgs = extractCandid(argsTypes);
        const retsTypes = t.retTypes.map((value) =>
            value.accept(this, { ...data, isOnService: false })
        );
        const candidRets = extractCandid(retsTypes);
        const args = candidArgs[0].join(', ');
        const rets = candidRets[0].join(', ');
        const annon =
            t.annotations.length === 0 ? '' : ' ' + t.annotations.join(' ');
        return [
            `${data.isOnService ? '' : 'func '}(${args}) -> (${rets})${annon}`,
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
                ...data,
                usedRecClasses: [...usedRecClasses, t],
                isOnService: false,
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
            value.accept(this, { ...data, isOnService: false })
        );
        const candid = extractCandid(candidFields);
        const field_strings = fields.map(
            ([key, value], index) =>
                escapeCandidKeywords(key) + ':' + candid[0][index]
        );
        return [`record {${field_strings.join('; ')}}`, candid[1]];
    }
    visitVariant(
        t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        const candidFields = fields.map(([key, value]) =>
            value.accept(this, { ...data, isOnService: false })
        );
        const candid = extractCandid(candidFields);
        const fields_string = fields.map(
            ([key, value], index) =>
                escapeCandidKeywords(key) +
                (value.name === 'null' ? '' : ':' + candid[0][index])
        );
        return [`variant {${fields_string.join('; ')}}`, candid[1]];
    }
}

function escapeCandidKeywords(key: string): string {
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

function extractCandid(
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
