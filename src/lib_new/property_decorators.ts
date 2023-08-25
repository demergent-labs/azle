import { toCandidClass, CandidClass } from './utils';

export function candid(type: CandidClass) {
    return function (target: any, key: string) {
        addToAzleCandidMap(target, toCandidClass(type), key);
    };
}

// @ts-ignore
function addToAzleCandidMap(target, idl, name) {
    // TODO I forsee an issue where we have naming conflicts
    if (!target.constructor._azleCandidMap) {
        target.constructor._azleCandidMap = {};
    }

    target.constructor._azleCandidMap = {
        ...target.constructor._azleCandidMap,
        [name]: idl
    };
}
