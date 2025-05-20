import { IDL, jsonParse, jsonStringify, query, update } from 'azle';
import {
    AssertType,
    NotAnyAndExact
} from 'azle/_internal/type_tests/assert_type';

/**
 * Parse a JSON string, then stringify it again
 * @param jsonString - The JSON string to process
 * @returns The processed JSON string
 */
export function processJsonQuery(jsonString: string): string {
    // Parse the JSON string, then stringify it again
    const parsedValue = jsonParse(jsonString);
    return jsonStringify(parsedValue);
}
processJsonQuery.idl = [IDL.Text, IDL.Text];

/**
 * Parse a JSON string, then stringify it again (update method)
 * @param jsonString - The JSON string to process
 * @returns The processed JSON string
 */
export function processJsonUpdate(jsonString: string): string {
    // Parse the JSON string, then stringify it again
    const parsedValue = jsonParse(jsonString);
    return jsonStringify(parsedValue);
}
processJsonUpdate.idl = processJsonQuery.idl;

/**
 * Assert that jsonStringify and jsonParse have the expected types
 */
export function assertTypes(): boolean {
    // Assert types for jsonStringify and jsonParse
    type _AssertJsonStringifyReturnType = AssertType<
        NotAnyAndExact<ReturnType<typeof jsonStringify>, string>
    >;

    type _AssertJsonParseParam = AssertType<
        NotAnyAndExact<Parameters<typeof jsonParse>[0], string>
    >;

    return (
        typeof jsonStringify({}) === 'string' &&
        typeof jsonParse('{}') === 'object'
    );
}
assertTypes.idl = [[], IDL.Bool];

// Marking methods as query or update
query(processJsonQuery);
query(assertTypes);
update(processJsonUpdate);
