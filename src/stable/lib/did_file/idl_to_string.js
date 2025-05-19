"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idlToString = idlToString;
exports.toDidString = toDidString;
var visitor_1 = require("./visitor");
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
function idlToString(type, startingData) {
    if (startingData === void 0) { startingData = (0, visitor_1.getDefaultVisitorData)(); }
    var result = type.accept(new visitor_1.DidVisitor(), startingData);
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
function toDidString(result) {
    // TODO it would be nice to have names for the rec types instead of rec_1, rec_2 etc
    // TODO Once types have names we should deduplicate the init and post_upgrade param types
    // TODO maybe even before we have names we should deduplicate all sorts of types
    // The rust to candid converter we were using did have names, but if two things
    // had the same shape they got merged into one type that had one of the names.
    // That might not be the ideal situation, but it is the expected behavior in rust
    var candid = result[0], candidTypeDefs = result[1];
    var candidTypesString = namedTypeToCandidString(candidTypeDefs);
    return "".concat(candidTypesString + candid, "\n");
}
function namedTypeToCandidString(newTypes) {
    return Object.entries(newTypes).length > 0
        ? "".concat(namedTypesToStingArr(newTypes).join('\n'), "\n")
        : '';
}
function namedTypesToStingArr(newTypes) {
    return Object.entries(newTypes).map(function (_a) {
        var name = _a[0], candid = _a[1];
        return "type ".concat(name, " = ").concat(candid, ";");
    });
}
