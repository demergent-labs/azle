import { IDL } from '@dfinity/candid';

import {
    CandidTypesDefs,
    DidVisitor,
    getDefaultVisitorData,
    VisitorData,
    VisitorResult
} from './visitor';

/**
 * Converts an IDL type to its string representation in Candid format.
 *
 * @param type - The IDL type to convert to a string
 * @param startingData - Optional visitor data to use during traversal. Defaults to empty visitor data.
 * @returns The Candid string representation of the type
 *
 * @example
 * const recordType = IDL.Record({ name: IDL.Text, age: IDL.Nat8 });
 * const candidStr = idlToString(recordType);
 * // Result: "record { name : text; age : nat8 }"
 */

export function idlToString(
    type: IDL.Type,
    startingData: VisitorData = getDefaultVisitorData()
): string {
    const result = type.accept(new DidVisitor(), startingData);
    return toDidString(result);
}

/**
 * @internal
 *
 * Converts a Candid type visitor result into a formatted Candid interface definition string.
 * Used to generate .did files from TypeScript canister definitions.
 *
 * @param result - The visitor result containing Candid type definitions and service interface
 * @returns A formatted string containing the complete Candid interface definition
 *
 * @remarks
 * - Combines named type definitions with the service interface
 * - Handles recursive type definitions (currently using numeric suffixes)
 * - Preserves type relationships and structure
 * - Adds proper newlines for formatting
 *
 * @example
 * const visitorResult = visitCanister(canisterClass);
 * const didString = toDidString(visitorResult);
 * // Result:
 * // type MyRecord = record { field: text };
 * // service : {
 * //   method : (MyRecord) -> (bool);
 * // }
 */
export function toDidString(result: VisitorResult): string {
    // TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
    // TODO Once types have names we should deduplicate the init and post_upgrade param types
    // TODO maybe even before we have names we should deduplicate all sorts of types
    // The rust to candid converter we were using did have names, but if two things
    // had the same shape they got merged into one type that had one of the names.
    // That might not be the ideal situation, but it is the expected behavior in rust

    const [candid, candidTypeDefs] = result;
    const candidTypesString = namedTypeToCandidString(candidTypeDefs);
    return `${candidTypesString + candid}\n`;
}

function namedTypeToCandidString(newTypes: CandidTypesDefs): string {
    return Object.entries(newTypes).length > 0
        ? `${namedTypesToStringArr(newTypes).join('\n')}\n`
        : '';
}

function namedTypesToStringArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid};`
    );
}
