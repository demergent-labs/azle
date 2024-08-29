import './experimental';

import {
    jsonReplacer,
    jsonReviver
} from '../stable/stable_structures/stable_json';

export function jsonStringify(value: any, replacer?: any, space?: any): string {
    return JSON.stringify(value, replacer ?? jsonReplacer, space);
}

export function jsonParse(value: string, reviver?: any): any {
    try {
        return JSON.parse(value, reviver ?? jsonReviver);
    } catch (error: any) {
        throw new Error(
            `Error parsing JSON: ${error.message}. Value: ${value}`
        );
    }
}
