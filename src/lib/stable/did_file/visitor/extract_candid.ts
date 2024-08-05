import { CandidDef, CandidTypesDefs } from './did_visitor';

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
