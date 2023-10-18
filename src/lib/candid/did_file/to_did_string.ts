import { CandidTypesDefs, VisitorResult } from './visitor/index.js';

export function toDidString(result: VisitorResult): string {
    // TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
    // TODO Once types have names we should deduplicate the init and post_upgrade param types
    // TODO maybe even before we have names we should deduplicate all sorts of types
    // The rust to candid converter we were using did have names, but if two things
    // had the same shape they got merged into one type that had one of the names.
    // That might not be the ideal situation, but it is the expected behavior in rust

    const [candid, candidTypeDefs] = result;
    const candidTypesString = namedTypeToCandidString(candidTypeDefs);
    return candidTypesString + candid + '\n';
}

function namedTypeToCandidString(newTypes: CandidTypesDefs): string {
    return Object.entries(newTypes).length > 0
        ? namedTypesToStingArr(newTypes).join('\n') + '\n'
        : '';
}

function namedTypesToStingArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid};`
    );
}
