import { jsonReplacer, jsonReviver } from './stable_structures/stable_json';

export function jsonStringify(value: any, replacer?: any, space?: any): string {
    return JSON.stringify(value, replacer ?? jsonReplacer, space);
}

export function jsonParse(value: string, reviver?: any): any {
    return JSON.parse(value, reviver ?? jsonReviver);
}
