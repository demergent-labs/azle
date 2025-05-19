"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
require("./state");
// @ts-ignore
var text_encoding_1 = require("@sinonjs/text-encoding");
var stable_json_1 = require("./stable_structures/stable_json");
// TODO do we need to disable any other wasmedge-quickjs globals
// TODO that we don't think are stable yet?
if (globalThis._azleIcpReplicaWasmEnvironment === true ||
    globalThis._azleNodejsWasmEnvironment === true) {
    globalThis._azleDispatch({
        type: 'SET_TEXT_DECODER',
        payload: text_encoding_1.TextDecoder,
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });
    globalThis._azleDispatch({
        type: 'SET_TEXT_ENCODER',
        payload: text_encoding_1.TextEncoder,
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });
    globalThis._azleDispatch({
        type: 'SET_CRYPTO',
        payload: __assign(__assign({}, globalThis.crypto), { getRandomValues: function (array) {
                if (array instanceof Int8Array === false &&
                    array instanceof Uint8Array === false &&
                    array instanceof Uint8ClampedArray === false &&
                    array instanceof Int16Array === false &&
                    array instanceof Uint16Array === false &&
                    array instanceof Int32Array === false &&
                    array instanceof Uint32Array === false &&
                    array instanceof BigInt64Array === false &&
                    array instanceof BigUint64Array === false) {
                    throw new TypeError('Expected an Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, BigInt64Array, or BigUint64Array');
                }
                var byteLength = array.byteLength;
                if (byteLength === 0) {
                    return array;
                }
                if (byteLength > 65536) {
                    throw new Error("QuotaExceeded: array cannot be larger than 65_536 bytes");
                }
                var bytes = globalThis._azleIc !== undefined
                    ? globalThis._azleIc.randBytes(byteLength)
                    : globalThis._azleIcExperimental !== undefined
                        ? new Uint8Array(globalThis._azleIcExperimental.randBytes(byteLength))
                        : (function () {
                            throw new Error("Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined");
                        })();
                var targetView = new Uint8Array(array.buffer, array.byteOffset, byteLength);
                targetView.set(bytes);
                return array;
            } }),
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });
    globalThis._azleDispatch({
        type: 'SET_CONSOLE',
        payload: __assign(__assign({}, globalThis.console), { log: log, error: log, warn: log, info: log }),
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });
    if (globalThis._azleExperimental === false) {
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'fetch',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'Buffer',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'window',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'global',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'self',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'URL',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'WebAssembly',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'setTimeout',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'clearTimeout',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
    }
}
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var jsonStringifiedArgs = args
        .map(function (arg) {
        if (arg instanceof Error) {
            return "".concat(arg.name, ": ").concat(arg.message, " at ").concat(arg.stack);
        }
        else {
            return JSON.stringify(arg, stable_json_1.jsonReplacer, 4);
        }
    })
        .join(' ');
    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.debugPrint(jsonStringifiedArgs);
    }
    else if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.debugPrint(jsonStringifiedArgs);
    }
    throw new Error("No global debugPrint implementation found");
}
