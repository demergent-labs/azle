import { IDL } from '@dfinity/candid';

type VisitorData = {
    usedRecClasses: IDL.RecClass[];
    isOnService: boolean;
    isFirstService: boolean;
};
type VisitorResult = [CandidDef, CandidTypesDefs];

// TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
// TODO Once types have names we should deduplicate the init and post_upgrade param types
// TODO maybe even before we have names we should deduplicate all sorts of types
// The rust to candid converter we were using did have names, but if two things
// had the same shape they got merged into one type that had one of the names.
// That might not be the ideal situation, but it is the expected behavior in rust

export const DEFAULT_VISITOR_DATA: VisitorData = {
    usedRecClasses: [],
    isOnService: false,
    isFirstService: false
};

export function DidResultToCandidString(result: VisitorResult): string {
    const [candid, candidTypeDefs] = result;
    const candidTypesString = newTypeToCandidString(candidTypeDefs);
    return candidTypesString + candid + '\n';
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
        // To get all of the candid types we need to look at all of the methods
        const isOtherFunction = (func: IDL.FuncClass) => {
            return (
                !func.annotations.includes('update') &&
                !func.annotations.includes('query') &&
                !func.annotations.includes('init') &&
                !func.annotations.includes('postUpgrade')
            );
        };
        const otherCandidTypes = extractCandid(
            t._fields
                .filter(([_name, func]) => isOtherFunction(func))
                .map(([_name, func]) =>
                    func.accept(this, { ...data, isOnService: true })
                )
        )[1];

        const isQueryOrUpdateFunction = (func: IDL.FuncClass) => {
            return (
                func.annotations.includes('update') ||
                func.annotations.includes('query')
            );
        };
        // To get all of the canister methods we need to only look at update and query
        const canisterMethods = extractCandid(
            t._fields
                .filter(([_name, func]) => isQueryOrUpdateFunction(func))
                .map(([_name, func]) =>
                    func.accept(this, { ...data, isOnService: true })
                )
        );
        const canisterMethodsNames = t._fields
            .filter(([_name, func]) => isQueryOrUpdateFunction(func))
            .map(([name, _func]) => name);

        const isInitFunction = (func: IDL.FuncClass) =>
            func.annotations.includes('init');
        const isPostUpgradeFunction = (func: IDL.FuncClass) =>
            func.annotations.includes('postUpgrade');
        // To get the service params we need to look at the init function
        const initMethod = extractCandid(
            t._fields
                .filter(([_name, func]) => isInitFunction(func))
                .map(([_name, initFunc]) =>
                    initFunc.accept(this, { ...data, isOnService: true })
                )
        );
        const postMethod = extractCandid(
            t._fields
                .filter(([_name, func]) => isPostUpgradeFunction(func))
                .map(([_name, initFunc]) =>
                    initFunc.accept(this, { ...data, isOnService: true })
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
            ...otherCandidTypes,
            ...canisterMethods[1],
            ...initMethod[1],
            ...postMethod[1]
        };

        const funcStrings = canisterMethods[0]
            .map((value, index) => {
                return `    ${canisterMethodsNames[index]}: ${value};`;
            })
            .join('\n');
        if (data.isFirstService) {
            return [
                `service: ${canisterParamsString} -> {\n${funcStrings}\n}`,
                candidTypes
            ];
        }
        return [`service {\n${funcStrings}\n}`, candidTypes];
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
        const annon = t.annotations.includes('update')
            ? ''
            : ' ' + t.annotations.join(' ');
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
            value.accept(this, { ...data, isOnService: false })
        );
        const candid = extractCandid(candidFields);
        const fields_string = fields.map(
            ([key, value], index) =>
                key + (value.name === 'null' ? '' : ':' + candid[0][index])
        );
        return [`variant {${fields_string.join('; ')}}`, candid[1]];
    }
}
