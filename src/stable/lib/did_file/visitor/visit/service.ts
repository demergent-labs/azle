import { IDL } from '@dfinity/candid';

import {
    CandidDef,
    CandidTypesDefs,
    DidVisitor,
    VisitorData
} from '../did_visitor';
import { extractCandid } from '../extract_candid';
import { escapeCandidName } from '../quote_candid_name';

/**
 * @internal
 * Visitor for service definitions in Candid generation.
 */
export function visitService(
    t: IDL.ServiceClass,
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef, CandidTypesDefs] {
    const queryAndUpdateMethods = getQueryAndUpdateMethods(t, didVisitor, data);
    const initAndPostUpgradeMethodCandid = getInitAndPostUpgradeMethodCandid(
        didVisitor,
        data
    );

    const candidTypes = {
        ...queryAndUpdateMethods[1],
        ...initAndPostUpgradeMethodCandid[1]
    };

    return serviceToCandidString(
        t,
        queryAndUpdateMethods[0],
        initAndPostUpgradeMethodCandid[0],
        candidTypes,
        data.isFirstService
    );
}

function serviceToCandidString(
    t: IDL.ServiceClass,
    canisterMethodCandidStrings: string[],
    initAndPostUpgradeMethodCandidString: string[],
    candidTypes: CandidTypesDefs,
    isFirstService: boolean
): [CandidDef, CandidTypesDefs] {
    const tab = isFirstService ? '    ' : '';
    const func_separator = isFirstService ? '\n' : ' ';

    const funcStrings = canisterMethodCandidStrings
        .map((value, index) => {
            return `${tab}${escapeCandidName(t._fields[index][0])}: ${value};`;
        })
        .join(func_separator);

    const canisterParamsString = createCanisterParamsString(
        initAndPostUpgradeMethodCandidString
    );

    if (isFirstService === true) {
        return [
            `service: ${canisterParamsString} -> {\n${funcStrings}\n}`,
            candidTypes
        ];
    }
    return [`service {${funcStrings}}`, candidTypes];
}

function getInitAndPostUpgradeMethodCandid(
    didVisitor: DidVisitor,
    data: VisitorData
): [CandidDef[], CandidTypesDefs] {
    const result = IDL.Func(data.initAndPostUpgradeParamIdlTypes, []).accept(
        didVisitor,
        {
            ...data,
            isOnService: true,
            isFirstService: false
        }
    );
    return extractCandid([result]);
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

function createCanisterParamsString(initMethodCandidString: string[]): string {
    const parts = initMethodCandidString[0].split('->');
    if (parts.length >= 2) {
        return parts.slice(0, -1).join('->').trim();
    }
    return '()'; // If we can't find any init or post upgrade params return empty ()
}
