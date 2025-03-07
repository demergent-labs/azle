/**
 * @internal
 *
 * Internal list of Candid language keywords that need to be escaped in identifiers.
 *
 * These keywords cannot be used as raw identifiers in Candid and must be quoted when used as field names.
 */
const CANDID_KEYWORDS = [
    'blob',
    'bool',
    'float32',
    'float64',
    'func',
    'int',
    'int16',
    'int32',
    'int64',
    'int8',
    'nat',
    'nat16',
    'nat32',
    'nat64',
    'nat8',
    'null',
    'opt',
    'principal',
    'query',
    'record',
    'service',
    'text',
    'variant',
    'vec'
];

/**
 * @internal
 *
 * Internal helper that quotes Candid names if they are reserved keywords or contain special characters.
 *
 * These names cannot be used as raw identifiers in Candid and must be quoted when used as names.
 *
 * @param key - The name to potentially quote
 * @returns The name, quoted if it's a reserved Candid keyword or contains special characters.
 *
 * @example
 * quoteCandidName('text')     // returns '"text"'
 * quoteCandidName('myField')  // returns 'myField'
 */
export function quoteCandidName(key: string): string {
    console.log('name to quote', key);
    // Escape double quotes and backslashes
    if (['"', '\\'].some((ch: string) => key.includes(ch))) {
        const escapedKey: string = key.replace(
            /[\\"]/g,
            (match: string): string => `\\${match}`
        );
        return `"${escapedKey}"`;
    }
    // Quote if the name is a reserved Candid keyword
    if (CANDID_KEYWORDS.includes(key)) {
        return `"${key}"`;
    }
    // Quote if the name contains any character that is not alphanumeric or underscore
    if (/[^A-Za-z0-9_]/.test(key)) {
        return `"${key}"`;
    }
    console.log('name does not need quoting', key);
    return key;
}
