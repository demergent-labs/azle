import { jsonStringify } from '#lib/json';

/**
 * @internal
 *
 * Checks if two objects are deeply equal.
 *
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @returns `true` if the objects are deeply equal, `false` otherwise.
 *
 * @remarks
 * It first serializes both objects using our custom jsonStringify function to handle potential problems with Principal or other complex objects with hard to define equality.
 * then parses them back and performs a recursive comparison.
 *
 * This function is only designed to work with Candid types.
 */
export function candidDeepEqual(obj1: any, obj2: any): boolean {
    const obj1Json = normalizeJson(obj1);
    const obj2Json = normalizeJson(obj2);

    // Handle null cases
    if (obj1Json === null || obj2Json === null) {
        return obj1Json === obj2Json;
    }

    // Check if both are objects
    if (typeof obj1Json !== 'object' || typeof obj2Json !== 'object') {
        return obj1Json === obj2Json;
    }

    // Check if they have the same constructor
    if (obj1Json.constructor !== obj2Json.constructor) {
        return false;
    }

    // Make sure they are both arrays or both objects
    if (Array.isArray(obj1Json) !== Array.isArray(obj2Json)) {
        return false;
    }

    if (Array.isArray(obj1Json)) {
        return areEqualArrays(obj1Json, obj2Json);
    }

    return areEqualObjects(obj1Json, obj2Json);
}

function areEqualArrays(obj1Json: any, obj2Json: any): boolean {
    if (obj1Json.length !== obj2Json.length) {
        return false;
    }
    for (let i = 0; i < obj1Json.length; i++) {
        if (candidDeepEqual(obj1Json[i], obj2Json[i]) === false) {
            return false;
        }
    }
    return true;
}

function areEqualObjects(obj1Json: any, obj2Json: any): boolean {
    // Get keys and compare lengths
    const keys1 = Object.keys(obj1Json);
    const keys2 = Object.keys(obj2Json);
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Recursively compare all properties
    for (const key of keys1) {
        if (
            keys2.includes(key) === false ||
            candidDeepEqual(obj1Json[key], obj2Json[key]) === false
        ) {
            return false;
        }
    }

    return true;
}

/**
 * @internal
 *
 * Normalizes a JSON object by serializing it and then parsing it back into an object.
 * This helps handle potential problems with Principal or other complex objects with hard to define equality.
 *
 * @param obj The object to normalize.
 * @returns The normalized object.
 *
 * @remarks
 * We have historically had issues with various candidDeepEqual implementations most tracing back to subtle differences in versions etc that have caused false negatives.
 * Our jsonStringify takes out a lot of the possible oddities by serializing them into a more standard format.
 * So until we convert this to jest and use its various equality functions, this should be good enough.
 */
function normalizeJson(obj: any): any {
    const objJsonString = jsonStringify(obj);
    return JSON.parse(objJsonString);
}
