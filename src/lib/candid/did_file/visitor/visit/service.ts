import { IDL } from '@dfinity/candid';
import {
    CandidDef,
    CandidTypesDefs,
    DidVisitor,
    VisitorData
} from '../did_visitor';
import { escapeCandidKeywords } from '../escape_candid_keywords';
import { extractCandid } from '../extract_candid';

export function visitService(
    t: IDL.ServiceClass,
    didVisitor: DidVisitor,
    data: VisitorData
) {
    const queryAndUpdateMethods = getQueryAndUpdateMethods(t, didVisitor, data);
    const initMethod = getSystemMethod('init', didVisitor, data);
    const postMethod = getSystemMethod('postUpgrade', didVisitor, data);

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
    canisterMethodCandidStrings: string[],
    initMethodCandidString: string[],
    postMethodCandidString: string[],
    candidTypes: CandidTypesDefs,
    isFirstService: boolean
): [CandidDef, CandidTypesDefs] {
    const tab = isFirstService ? '    ' : '';
    const func_separator = isFirstService ? '\n' : ' ';

    const funcStrings = canisterMethodCandidStrings
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

function getSystemMethod(
    methodName: 'init' | 'postUpgrade',
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef[], CandidTypesDefs] {
    const isInitFunction = (func: IDL.FuncClass) =>
        func.annotations.includes(methodName);
    const result = extractCandid(
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

    if (result[0].length > 1) {
        console.log(
            `WARNING: too many ${methodName} methods detected. Expected no more than 1, found ${result[0].length}`
        );
    }

    return [result[0], result[1]];
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
    return '()'; // If we can't find any init or post upgrade params return empty ()
}
