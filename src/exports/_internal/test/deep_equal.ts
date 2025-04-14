import { jsonStringify } from '#lib/json';

// TODO move this out of the export folder
export function deepEqual(obj1: any, obj2: any): boolean {
    // We have historically had issues with various deepEqual implementations most tracing back to subtle differences in versions etc that have caused false negatives.
    // Our jsonStringify takes out a lot of the possible oddities by serializing them into a more standard format.
    // So until we convert this to jest and use it's various equality functions, this should be good enough.
    const obj1JsonString = jsonStringify(obj1);
    const obj2JsonString = jsonStringify(obj2);
    const obj1Json = JSON.parse(obj1JsonString);
    const obj2Json = JSON.parse(obj2JsonString);

    // Handle null cases
    if (obj1Json === null || obj2Json === null) {
        return obj1Json === obj2Json;
    }

    // Check if both are objects
    if (typeof obj1Json !== 'object' || typeof obj2Json !== 'object') {
        return obj1Json === obj2Json;
    }

    // Check if they have the same constructor (handles arrays vs objects)
    if (obj1Json.constructor !== obj2Json.constructor) {
        return false;
    }

    // Handle arrays specifically
    if (Array.isArray(obj1Json)) {
        if (obj1Json.length !== obj2Json.length) {
            return false;
        }
        for (let i = 0; i < obj1Json.length; i++) {
            if (!deepEqual(obj1Json[i], obj2Json[i])) {
                return false;
            }
        }
        return true;
    }

    // Get keys and compare lengths
    const keys1 = Object.keys(obj1Json);
    const keys2 = Object.keys(obj2Json);
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Recursively compare all properties
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1Json[key], obj2Json[key])) {
            return false;
        }
    }

    return true;
}
