import { CandidDef, CandidTypesDefs } from './did_visitor';

/**
 * Internal helper for the Candid visitor system that combines multiple visitor results.
 * Separates Candid definitions from their associated type definitions.
 *
 * @internal
 * @param paramInfo - Array of visitor results, each containing a Candid definition and its type definitions
 * @returns Tuple of [Array of Candid definitions, Combined type definitions map]
 *
 * @remarks
 * Used by visitor components to:
 * - Extract Candid definitions for method parameters, records, variants etc.
 * - Merge type definitions from multiple visited nodes
 * - Maintain type relationships in the final Candid interface
 */
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
