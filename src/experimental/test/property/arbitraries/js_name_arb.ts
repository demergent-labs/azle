import fc from 'fast-check';
const azleKeywords = [
    'blob',
    'bool',
    'float32',
    'float64',
    'Func',
    'int',
    'int8',
    'int16',
    'int32',
    'int64',
    'nat',
    'nat8',
    'nat16',
    'nat32',
    'nat64',
    'Null',
    'Opt',
    'Principal',
    'Record',
    'Recursive',
    'Service',
    'Tuple',
    'Variant',
    'Vec'
];

const jsKeywords = [
    '__proto__',
    'as',
    'any',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'constructor',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'super',
    'switch',
    'static',
    'this',
    'throw',
    'true',
    'try',
    'type',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
    // Additional words with special meaning
    'NaN',
    'IDL',
    'Infinity',
    'undefined',
    'arguments',
    'eval',
    'init',
    'postUpgrade',
    'preUpgrade',
    'heartbeat',
    'inspectMessage',
    'query',
    'update',
    'ic'
];

// This breaks rust but it doesn't seem to be a rust keyword
const otherKeywords = ['drop'];

// These words still don't work even if quoted
const cantBeQuoted = ['__proto__', 'constructor'];

const unquotedFunctionNameArb = fc
    .stringMatching(/^(_[a-zA-Z0-9]+|[a-zA-Z][a-zA-Z0-9]*)$/)
    .filter((sample) => !jsKeywords.includes(sample))
    .filter((sample) => !otherKeywords.includes(sample))
    .filter((sample) => !azleKeywords.includes(sample));

const quotedFunctionNameArb = fc
    .stringMatching(/^"[^"\\]+(?:\\.[^"\\]*)*"$/)
    .filter((sample) => !cantBeQuoted.includes(sample.slice(1, -1)))
    .map((s: string): string => {
        // Remove the leading and trailing quotes
        const inner = s.slice(1, -1);
        if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(inner)) {
            if (
                azleKeywords.includes(inner) ||
                jsKeywords.includes(inner) ||
                otherKeywords.includes(inner)
            ) {
                return `"${inner}"`;
            }
            return inner;
        }

        // Properly escape any backslashes and quotes in the inner content
        const escapedInner = inner.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

        // Reassemble the string with its leading and trailing quotes intact
        return `"${escapedInner}"`;
    });

export const JsIdentifierNameArb = fc.oneof(unquotedFunctionNameArb);

// TODO: disable quoted function names for now: https://github.com/demergent-labs/azle/issues/2823
export const JsPropertyNameArb = fc.oneof(
    { weight: 1, arbitrary: unquotedFunctionNameArb },
    { weight: 0, arbitrary: quotedFunctionNameArb }
);

// TODO rename to JsNameArbs or something?
