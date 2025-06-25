import { jsonReplacer, jsonReviver } from './stable_structures/stable_json';

/**
 * An ICP-enabled wrapper over `JSON.stringify`, handling special types like `Principal`, `BigInt`, and `Uint8Array` by default.
 *
 * @param value - A JavaScript value to be converted; usually an object or array
 * @param replacer - A function that transforms the results. Defaults to {@link jsonReplacer}
 * @param space - Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read
 *
 * @returns JavaScript Object Notation (JSON) string
 */
export function jsonStringify(
    value: any,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number
): string {
    return JSON.stringify(value, replacer ?? jsonReplacer, space);
}

/**
 * An ICP-enabled wrapper over `JSON.parse`, handling special types like `Principal`, `BigInt`, and `Uint8Array` by default.
 *
 * @param text - A JSON string valid for the `reviver` used
 * @param reviver - A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. Defaults to {@link jsonReviver}
 *
 * @returns The parsed JavaScript value
 */
export function jsonParse(
    text: string,
    reviver?: (this: any, key: string, value: any) => any
): any {
    try {
        return JSON.parse(text, reviver ?? jsonReviver);
    } catch (error: any) {
        throw new Error(
            `jsonParse: Error parsing JSON: ${error.message}. text: ${text}`
        );
    }
}
