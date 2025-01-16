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
 * Internal helper that quotes Candid keywords when they appear as identifiers.
 *
 * @param key - The identifier to potentially escape
 * @returns The identifier, quoted if it's a Candid keyword
 *
 * @example
 * escapeCandidKeywords('text')     // returns '"text"'
 * escapeCandidKeywords('myField')  // returns 'myField'
 */
export function escapeCandidKeywords(key: string): string {
    if (CANDID_KEYWORDS.includes(key)) {
        return `"${key}"`;
    }
    return key;
}
