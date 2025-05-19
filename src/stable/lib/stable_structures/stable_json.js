"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableJson = void 0;
exports.StableJson = StableJson;
exports.jsonReplacer = jsonReplacer;
exports.jsonReviver = jsonReviver;
var principal_1 = require("@dfinity/principal");
// @ts-ignore
var text_encoding_1 = require("@sinonjs/text-encoding");
var json_1 = require("../json");
/**
 * Creates a JSON-based `Serializable` object for use with `StableBTreeMap`.
 *
 * @param options - Configuration options
 * @param options.replacer - Custom `JSON.stringify` `replacer` function for JSON serialization. Defaults to the ICP-enabled `jsonReplacer`
 * @param options.reviver - Custom `JSON.parse` `reviver` function for JSON deserialization. Defaults to the ICP-enabled `jsonReviver`
 *
 * @returns The JSON-based `Serializable` object
 */
function StableJson(options) {
    var textEncoder = new text_encoding_1.TextEncoder();
    var textDecoder = new text_encoding_1.TextDecoder();
    return {
        toBytes: function (data) {
            return textEncoder.encode((0, json_1.jsonStringify)(data, options === null || options === void 0 ? void 0 : options.replacer));
        },
        fromBytes: function (bytes) {
            return (0, json_1.jsonParse)(textDecoder.decode(bytes), options === null || options === void 0 ? void 0 : options.reviver);
        }
    };
}
exports.stableJson = StableJson();
/**
 * Custom ICP-enabled `JSON.stringify` `replacer` function that can convert some JSON-invalid JavaScript values into valid JSON. Handles special types like `Principal`, `BigInt`, and `Uint8Array` by default.
 *
 * @param _key - The key being processed (unused)
 * @param value - The value to convert
 *
 * @returns The converted value as a valid JSON string
 */
function jsonReplacer(_key, value) {
    if (typeof value === 'undefined') {
        return {
            __undefined__: '__undefined__'
        };
    }
    if (typeof value === 'bigint') {
        return {
            __bigint__: value.toString()
        };
    }
    if (typeof value === 'object' &&
        value !== null &&
        value._isPrincipal === true) {
        return {
            __principal__: value.toString()
        };
    }
    if (typeof value === 'number' && isNaN(value)) {
        return {
            __nan__: '__nan__'
        };
    }
    if (typeof value === 'number' && value === Infinity) {
        return {
            __infinity__: '__infinity__'
        };
    }
    if (typeof value === 'number' && value === -Infinity) {
        return {
            __negative_infinity__: '__negative_infinity__'
        };
    }
    if (typeof value === 'number' && Object.is(value, -0)) {
        return {
            __negative_zero__: '__negative_zero__'
        };
    }
    if (value instanceof Int8Array) {
        return {
            __int8array__: Array.from(value)
        };
    }
    if (value instanceof Int16Array) {
        return {
            __int16array__: Array.from(value)
        };
    }
    if (value instanceof Int32Array) {
        return {
            __int32array__: Array.from(value)
        };
    }
    if (value instanceof BigInt64Array) {
        return {
            __bigint64array__: Array.from(value)
        };
    }
    if (value instanceof Uint8Array) {
        return {
            __uint8array__: Array.from(value)
        };
    }
    if (value instanceof Uint16Array) {
        return {
            __uint16array__: Array.from(value)
        };
    }
    if (value instanceof Uint32Array) {
        return {
            __uint32array__: Array.from(value)
        };
    }
    if (value instanceof BigUint64Array) {
        return {
            __biguint64array__: Array.from(value)
        };
    }
    if (value instanceof Float32Array) {
        return {
            __float32array__: Array.from(value)
        };
    }
    if (value instanceof Float64Array) {
        return {
            __float64array__: Array.from(value)
        };
    }
    if (value instanceof Map) {
        return {
            __map__: Array.from(value.entries())
        };
    }
    if (value instanceof Set) {
        return {
            __set__: Array.from(value)
        };
    }
    return value;
}
/**
 * Custom ICP-enabled `JSON.parse` `reviver` function that can convert valid JSON strings produced by `jsonReplacer` back into JavaScript values. Handles special types like `Principal`, `BigInt`, and `Uint8Array` by default.
 *
 * @param _key - The key being processed (unused)
 * @param value - The value to convert
 *
 * @returns The restored JavaScript value
 */
function jsonReviver(_key, value) {
    if (typeof value === 'object' && value !== null) {
        if (typeof value.__undefined__ === 'string') {
            return undefined;
        }
        if (typeof value.__bigint__ === 'string') {
            return BigInt(value.__bigint__);
        }
        if (typeof value.__principal__ === 'string') {
            return principal_1.Principal.fromText(value.__principal__);
        }
        if (value.__nan__ === '__nan__') {
            return NaN;
        }
        if (value.__infinity__ === '__infinity__') {
            return Infinity;
        }
        if (value.__negative_infinity__ === '__negative_infinity__') {
            return -Infinity;
        }
        if (value.__negative_zero__ === '__negative_zero__') {
            return -0;
        }
        if (Array.isArray(value.__int8array__)) {
            return Int8Array.from(value.__int8array__);
        }
        if (Array.isArray(value.__int16array__)) {
            return Int16Array.from(value.__int16array__);
        }
        if (Array.isArray(value.__int32array__)) {
            return Int32Array.from(value.__int32array__);
        }
        if (Array.isArray(value.__bigint64array__)) {
            return BigInt64Array.from(value.__bigint64array__);
        }
        if (Array.isArray(value.__uint8array__)) {
            return Uint8Array.from(value.__uint8array__);
        }
        if (Array.isArray(value.__uint16array__)) {
            return Uint16Array.from(value.__uint16array__);
        }
        if (Array.isArray(value.__uint32array__)) {
            return Uint32Array.from(value.__uint32array__);
        }
        if (Array.isArray(value.__biguint64array__)) {
            return BigUint64Array.from(value.__biguint64array__);
        }
        if (Array.isArray(value.__float32array__)) {
            return Float32Array.from(value.__float32array__);
        }
        if (Array.isArray(value.__float64array__)) {
            return Float64Array.from(value.__float64array__);
        }
        if (Array.isArray(value.__map__)) {
            return new Map(value.__map__);
        }
        if (Array.isArray(value.__set__)) {
            return new Set(value.__set__);
        }
    }
    return value;
}
