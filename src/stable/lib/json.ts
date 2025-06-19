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
        const result = JSON.parse(text, reviver ?? jsonReviver);
        // Post-process to restore undefined values when using the default reviver
        if (!reviver) {
            return restoreUndefinedValues(result);
        }
        return result;
    } catch (error: any) {
        throw new Error(
            `jsonParse: Error parsing JSON: ${error.message}. text: ${text}`
        );
    }
}

/**
 * Recursively processes a value to convert undefined placeholder symbols back to actual undefined values.
 *
 * @param value - The value to process
 * @returns The value with undefined placeholders restored to actual undefined values
 */
function restoreUndefinedValues(value: any): any {
    // Get the symbol from the stable_json module
    const UNDEFINED_PLACEHOLDER = Symbol.for('azle_undefined_placeholder');

    if (value === UNDEFINED_PLACEHOLDER) {
        return undefined;
    }

    if (Array.isArray(value)) {
        return value.map(restoreUndefinedValues);
    }

    if (value !== null && typeof value === 'object') {
        // Special handling for Maps - process the values but preserve the Map structure
        if (value instanceof Map) {
            const processedMap = new Map();
            for (const [key, val] of value.entries()) {
                processedMap.set(
                    restoreUndefinedValues(key),
                    restoreUndefinedValues(val)
                );
            }
            return processedMap;
        }

        // Special handling for Sets - process the values but preserve the Set structure
        if (value instanceof Set) {
            const processedSet = new Set();
            for (const val of value.values()) {
                processedSet.add(restoreUndefinedValues(val));
            }
            return processedSet;
        }

        // Don't process other special objects that were already correctly restored by jsonReviver
        if (
            value instanceof Int8Array ||
            value instanceof Int16Array ||
            value instanceof Int32Array ||
            value instanceof BigInt64Array ||
            value instanceof Uint8Array ||
            value instanceof Uint16Array ||
            value instanceof Uint32Array ||
            value instanceof BigUint64Array ||
            value instanceof Float32Array ||
            value instanceof Float64Array ||
            (typeof value._isPrincipal === 'boolean' &&
                value._isPrincipal === true)
        ) {
            return value;
        }

        // Only process plain objects
        const result: any = {};
        for (const [key, val] of Object.entries(value)) {
            result[key] = restoreUndefinedValues(val);
        }
        return result;
    }

    return value;
}
