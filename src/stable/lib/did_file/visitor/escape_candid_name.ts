/**
 * @internal
 *
 * Internal list of Candid language keywords that need to be escaped in identifiers.
 *
 * These keywords cannot be used as raw identifiers in Candid and must be escaped when used as field names.
 */
const CANDID_KEYWORDS = [
    'blob',
    'bool',
    'composite_query',
    'empty',
    'float32',
    'float64',
    'func',
    'import',
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
    'oneway',
    'opt',
    'principal',
    'query',
    'record',
    'reserved',
    'service',
    'text',
    'type',
    'variant',
    'vec'
];

/**
 * @internal
 *
 * Internal helper that escapes Candid names if they are reserved keywords or contain special characters.
 *
 * These names cannot be used as raw identifiers in Candid and must be escaped when used as names.
 *
 * @param key - The name to potentially escape
 * @returns The name, escaped if it's a reserved Candid keyword or contains special characters.
 *
 * @example
 * escapeCandidName('text')     // returns '"text"'
 * escapeCandidName('myField')  // returns 'myField'
 * escapeCandidName('3nameWithNumber')  // returns '"3nameWithNumber"'
 * escapeCandidName('nameWith(Parentheses)')  // returns '"nameWith(Parentheses)"'
 * escapeCandidName('nameWith"Quotes"')  // returns '"nameWith\\"Quotes\\""'
 */
export function escapeCandidName(key: string): string {
    // Candid name is either an id or a text
    // <name> ::= <id> | <text>

    // <id>   ::= (A..Z|a..z|_)(A..Z|a..z|_|0..9)*
    const isId = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key);
    if (isId === true) {
        return escapeId(key);
    }

    // Key is text
    // <text> ::= "<char>*"
    return escapeText(key);
}

function escapeId(key: string): string {
    if (CANDID_KEYWORDS.includes(key) === true) {
        return `"${key}"`;
    }
    return key;
}

function escapeText(key: string): string {
    // TODO: The bellow code enables developers to use method and field names
    // TODO: that contain "text". We don't currently have a good way to test
    // TODO: this. See https://github.com/demergent-labs/azle/issues/2823 for
    // TODO: more details.

    // Escape double quotes and backslashes
    if (containsBackslashOrQuote(key) === true) {
        const escapedKey: string = key.replace(
            /[\\"]/g,
            (match: string): string => `\\${match}`
        );
        return `"${escapedKey}"`;
    }

    return `"${key}"`;
}

function containsBackslashOrQuote(key: string): boolean {
    return ['"', '\\'].some((ch: string) => key.includes(ch) === true);
}
