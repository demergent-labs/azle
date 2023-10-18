import { IDL } from '@dfinity/candid';
import {
    CandidDef,
    CandidTypesDefs,
    DidVisitor,
    VisitorData,
    escapeCandidKeywords,
    extractCandid
} from '.';

export function visitService(
    t: IDL.ServiceClass,
    didVisitor: DidVisitor,
    data: VisitorData
) {
    const queryAndUpdateMethods = getQueryAndUpdateMethods(t, didVisitor, data);
    const initMethod = getInitMethod(didVisitor, data);
    const postMethod = getPostUpgradeMethod(didVisitor, data);

    const candidTypes = {
        ...queryAndUpdateMethods[1],
        ...initMethod[1],
        ...postMethod[1]
    };

    return serviceToCandidString(
        t,
        queryAndUpdateMethods[0],
        initMethod[0],
        postMethod[0],
        candidTypes,
        data.isFirstService
    );
}

function serviceToCandidString(
    t: IDL.ServiceClass,
    canisterMethodCandid: string[],
    initMethodCandidString: string[],
    postMethodCandidString: string[],
    candidTypes: CandidTypesDefs,
    isFirstService: boolean
): [CandidDef, CandidTypesDefs] {
    const tab = isFirstService ? '    ' : '';
    const func_separator = isFirstService ? '\n' : ' ';

    const funcStrings = canisterMethodCandid
        .map((value, index) => {
            return `${tab}${escapeCandidKeywords(
                t._fields[index][0]
            )}: ${value};`;
        })
        .join(func_separator);

    const canisterParamsString = createCanisterParamsString(
        initMethodCandidString,
        postMethodCandidString
    );

    if (isFirstService) {
        return [
            `service: ${canisterParamsString} -> {\n${funcStrings}\n}`,
            candidTypes
        ];
    }
    return [`service {${funcStrings}}`, candidTypes];
}

function getInitMethod(
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef[], CandidTypesDefs] {
    const isInitFunction = (func: IDL.FuncClass) =>
        func.annotations.includes('init');
    // To get the service params we need to look at the init function
    return extractCandid(
        data.systemFuncs
            .filter((func) => isInitFunction(func))
            .map((initFunc) =>
                initFunc.accept(didVisitor, {
                    ...data,
                    isOnService: true,
                    isFirstService: false
                })
            )
    );
}

function getQueryAndUpdateMethods(
    t: IDL.ServiceClass,
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef[], CandidTypesDefs] {
    return extractCandid(
        t._fields.map(([_name, func]) =>
            func.accept(didVisitor, {
                ...data,
                isOnService: true,
                isFirstService: false
            })
        )
    );
}

function getPostUpgradeMethod(
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef[], CandidTypesDefs] {
    const isPostUpgradeFunction = (func: IDL.FuncClass) =>
        func.annotations.includes('postUpgrade');
    return extractCandid(
        data.systemFuncs
            .filter((func) => isPostUpgradeFunction(func))
            .map((initFunc) =>
                initFunc.accept(didVisitor, {
                    ...data,
                    isOnService: true,
                    isFirstService: false
                })
            )
    );
}

function createCanisterParamsString(
    initMethodCandidString: string[],
    postMethodCandidString: string[]
): string {
    if (initMethodCandidString.length === 0) {
        if (postMethodCandidString.length === 0) {
            return '()';
        }
        const parts = postMethodCandidString[0].split('->');
        if (parts.length >= 2) {
            return parts[0].trim();
        }
    }
    const parts = initMethodCandidString[0].split('->');
    if (parts.length >= 2) {
        return parts[0].trim();
    }
    return ''; // TODO this feels weird
}
