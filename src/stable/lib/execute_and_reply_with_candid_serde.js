"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAndReplyWithCandidSerde = executeAndReplyWithCandidSerde;
exports.idlEncode = idlEncode;
exports.idlDecode = idlDecode;
var candid_1 = require("@dfinity/candid");
var msg_arg_data_1 = require("./ic_apis/msg_arg_data");
var msg_method_name_1 = require("./ic_apis/msg_method_name");
var msg_reply_1 = require("./ic_apis/msg_reply");
/**
 * Executes a canister method with Candid serialization/deserialization handling.
 * This function manages the full lifecycle of a canister method call:
 * 1. Decodes the input arguments from Candid format
 * 2. Executes the callback with decoded arguments
 * 3. Encodes and replies with the result
 *
 * @param mode - The execution mode of the canister method
 * @param args - Raw Candid-encoded input arguments as bytes
 * @param callback - The actual method implementation to execute
 * @param paramIdlTypes - Candid type definitions for the input parameters
 * @param returnIdlType - Candid type definition for the return value
 * @param manual - If true, skips automatic reply handling
 */
function executeAndReplyWithCandidSerde(mode, callback, paramIdlTypes, returnIdlType, manual, canisterMethodIdlParamTypes) {
    return __awaiter(this, void 0, void 0, function () {
        var decodedArgs, unencodedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decodedArgs = decodeArgs(mode, manual, paramIdlTypes, canisterMethodIdlParamTypes);
                    return [4 /*yield*/, getUnencodedResult(mode, manual, decodedArgs, callback)];
                case 1:
                    unencodedResult = _a.sent();
                    // We are treating the execution of the final JavaScript callback associated
                    // with the canister method as a macrotask, as described above.
                    // We have decided to drain the microtask queue here to
                    // ensure execution of all microtasks registered because of the macrotask execution above.
                    // This will ensure that all of these microtasks are executed before the final reply is sent.
                    // This call to drain the micotasks is happening within an outer microtask draining loop.
                    // This essentially gives priority to the microtasks that are registered
                    // because of the execution of the final JavaScript callback associated with the canister method.
                    if (globalThis._azleIc !== undefined) {
                        globalThis._azleIc.drainMicrotasks();
                    }
                    if (globalThis._azleIcExperimental !== undefined) {
                        globalThis._azleIcExperimental.drainMicrotasks();
                    }
                    encodeResultAndReply(mode, manual, unencodedResult, returnIdlType);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Decodes Candid-encoded arguments based on the method mode.
 * Only decodes arguments for init, postUpgrade, query, and update methods.
 *
 * @param mode - The execution mode of the canister method
 * @param args - Raw Candid-encoded input arguments
 * @param paramIdlTypes - Candid type definitions for the parameters
 * @returns Decoded argument values as a JSON-compatible array
 */
function decodeArgs(mode, manual, paramIdlTypes, canisterMethodIdlParamTypes) {
    var _a;
    if (manual === true) {
        return [];
    }
    if (mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'query' ||
        mode === 'update') {
        return idlDecode(paramIdlTypes, (0, msg_arg_data_1.msgArgData)());
    }
    if (mode === 'inspectMessage') {
        var methodName = (0, msg_method_name_1.msgMethodName)();
        if (methodName === '_azle_reject_callbacks_len' ||
            methodName === '_azle_resolve_callbacks_len' ||
            methodName === '_azle_timer_callbacks_len' ||
            methodName === '_azle_actions_len' ||
            methodName === '_azle_inter_canister_call_futures_len' ||
            methodName === '_azle_is_job_queue_empty') {
            return [];
        }
        var paramIdlTypes_1 = (_a = canisterMethodIdlParamTypes === null || canisterMethodIdlParamTypes === void 0 ? void 0 : canisterMethodIdlParamTypes[methodName]) === null || _a === void 0 ? void 0 : _a.argTypes;
        if (paramIdlTypes_1 === undefined) {
            throw new Error("@inspectMessage could not find the IDL types for method ".concat(methodName));
        }
        return idlDecode(paramIdlTypes_1, (0, msg_arg_data_1.msgArgData)());
    }
    return [];
}
/**
 * Executes the callback function with the decoded arguments.
 *
 * @param args - Decoded arguments to pass to the callback
 * @param callback - The method implementation to execute
 * @returns The result of the callback execution
 */
function getUnencodedResult(mode, manual, args, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(mode === 'inspectMessage')) return [3 /*break*/, 2];
                    return [4 /*yield*/, callback.apply(void 0, (manual === true ? [] : __spreadArray([(0, msg_method_name_1.msgMethodName)()], args, true)))];
                case 1:
                    result = _a.sent();
                    if (result === true) {
                        if (globalThis._azleIc === undefined &&
                            globalThis._azleIcExperimental === undefined) {
                            throw new Error('Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined');
                        }
                        if (globalThis._azleIc !== undefined) {
                            globalThis._azleIc.acceptMessage();
                        }
                        if (globalThis._azleIcExperimental !== undefined) {
                            globalThis._azleIcExperimental.acceptMessage();
                        }
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, callback.apply(void 0, args)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles the encoding and reply of the method result.
 * Only sends replies for query and update methods when manual mode is not enabled.
 *
 * @param mode - The execution mode of the canister method
 * @param manual - If true, skips automatic reply handling
 * @param unencodedResult - The raw result from the callback
 * @param returnIdlType - Candid type definition for the return value
 */
function encodeResultAndReply(mode, manual, unencodedResult, returnIdlType) {
    if ((mode !== 'query' && mode !== 'update') || manual === true) {
        return;
    }
    var encodedResult = idlEncode(__spreadArray([], (returnIdlType !== undefined ? [returnIdlType] : []), true), __spreadArray([], (unencodedResult !== undefined ? [unencodedResult] : []), true));
    (0, msg_reply_1.msgReply)(encodedResult);
}
/**
 * Encodes JavaScript values into Candid format.
 *
 * @param argTypes - Candid type definitions for the values to encode
 * @param args - Values to encode into Candid format
 * @returns Candid-encoded data as bytes
 * @throws {Error} If encoding fails
 */
function idlEncode(argTypes, args) {
    try {
        // TODO IDL.encode has ArrayBuffer as the return type, but it actually returns a Uint8Array
        // TODO we are not sure if they will make the final type and return value an ArrayBuffer
        // TODO or a Uint8Array: https://github.com/demergent-labs/azle/issues/2061
        var result = candid_1.IDL.encode(argTypes, args);
        return result instanceof Uint8Array ? result : new Uint8Array(result);
    }
    catch (error) {
        throw new Error("Failed to encode Candid arguments: ".concat(error));
    }
}
/**
 * Decodes Candid-encoded data into JavaScript values.
 *
 * @param retTypes - Candid type definitions for the values to decode
 * @param bytes - Candid-encoded data to decode
 * @returns Decoded JavaScript values
 * @throws {Error} If decoding fails
 */
function idlDecode(retTypes, bytes) {
    try {
        return candid_1.IDL.decode(retTypes, bytes.buffer instanceof ArrayBuffer
            ? bytes.buffer
            : new Uint8Array(bytes).buffer);
    }
    catch (error) {
        throw new Error("Failed to decode Candid bytes: ".concat(error));
    }
}
