import { jsonReplacer, jsonReviver } from './stable_structures/stable_json';

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * This function wraps JSON.stringify but uses a custom {@link jsonReplacer} by
 * default to handle special data types correctly.
 *
 * @param value - The value to convert to a JSON string
 * @param replacer - Optional replacer function or array for JSON serialization. Defaults to {@link jsonReplacer}
 * @param space - Optional parameter for formatting the output with indentation
 * @returns A JSON string representation of the value
 */
export function jsonStringify(value: any, replacer?: any, space?: any): string {
    return JSON.stringify(value, replacer ?? jsonReplacer, space);
}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object. This
 * function wraps JSON.parse but uses a custom {@link jsonReviver} by default to
 * handle special data types correctly.
 *
 * @param value - The JSON string to parse
 * @param reviver - Optional reviver function for custom deserialization. Defaults to {@link jsonReviver}
 * @returns The parsed JavaScript value
 * @throws {Error} If the JSON string is invalid, with details about the parsing error
 */
export function jsonParse(value: string, reviver?: any): any {
    try {
        return JSON.parse(value, reviver ?? jsonReviver);
    } catch (error: any) {
        throw new Error(
            `Error parsing JSON: ${error.message}. Value: ${value}`
        );
    }
}
