"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeCandidName = escapeCandidName;
/**
 * @internal
 *
 * Internal list of Candid language keywords that need to be escaped in identifiers.
 *
 * These keywords cannot be used as raw identifiers in Candid and must be escaped when used as field names.
 */
var CANDID_KEYWORDS = [
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
function escapeCandidName(key) {
    // Candid name is either an id or a text
    // <name> ::= <id> | <text>
    // <id>   ::= (A..Z|a..z|_)(A..Z|a..z|_|0..9)*
    var isId = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key);
    if (isId === true) {
        return escapeId(key);
    }
    // Key is text
    // <text> ::= "<char>*"
    return escapeText(key);
}
function escapeId(key) {
    if (CANDID_KEYWORDS.includes(key) === true) {
        return "\"".concat(key, "\"");
    }
    return key;
}
function escapeText(key) {
    // TODO: The bellow code enables developers to use method and field names
    // TODO: that contain "text". We don't currently have a good way to test
    // TODO: this. See https://github.com/demergent-labs/azle/issues/2823 for
    // TODO: more details.
    // Escape double quotes and backslashes
    if (containsBackslashOrQuote(key) === true) {
        var escapedKey = key.replace(/[\\"]/g, function (match) { return "\\".concat(match); });
        return "\"".concat(escapedKey, "\"");
    }
    return "\"".concat(key, "\"");
}
function containsBackslashOrQuote(key) {
    return ['"', '\\'].some(function (ch) { return key.includes(ch) === true; });
}
