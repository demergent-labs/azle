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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratorArgumentsHandler = decoratorArgumentsHandler;
var candid_1 = require("@dfinity/candid");
var did_file_1 = require("../did_file");
var error_1 = require("../error");
var execute_and_reply_with_candid_serde_1 = require("../execute_and_reply_with_candid_serde");
/**
 * @internal
 *
 * This is the entry point for our overloaded decorator functions before calling the common implementation.
 * It handles determining which overload we are using and then either calling the common implementation or
 * returning a decorator function which calls the common implementation.
 */
function decoratorArgumentsHandler(canisterMethodMode, param1, param2, param3) {
    var decoratorIsOverloadedWithoutParams = isDecoratorOverloadedWithoutParams(param1, param2);
    if (decoratorIsOverloadedWithoutParams === true) {
        var originalMethod = param1;
        var context = param2;
        return decoratorImplementation(canisterMethodMode, originalMethod, context);
    }
    else {
        var paramIdlTypes_1 = (canisterMethodMode === 'query' ||
            canisterMethodMode === 'update' ||
            canisterMethodMode === 'init' ||
            canisterMethodMode === 'postUpgrade'
            ? param1
            : undefined);
        var returnIdlType_1 = (canisterMethodMode === 'query' || canisterMethodMode === 'update'
            ? param2
            : undefined);
        var options_1 = (canisterMethodMode === 'inspectMessage'
            ? param1
            : canisterMethodMode === 'init' ||
                canisterMethodMode === 'postUpgrade'
                ? param2
                : param3);
        return function (originalMethod, context) {
            return decoratorImplementation(canisterMethodMode, originalMethod, context, paramIdlTypes_1, returnIdlType_1, options_1);
        };
    }
}
/**
 * @internal
 *
 * The common implementation for all of our exposed canister method decorators.
 */
function decoratorImplementation(canisterMethodMode, originalMethod, context, paramIdlTypes, returnIdlType, options) {
    context.addInitializer(function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var defaultCanisterClassMeta = {
            callbacks: {},
            canisterMethodIdlParamTypes: {},
            canisterMethodsIndex: 0,
            initAndPostUpgradeIdlTypes: [],
            methodMeta: {
                queries: [],
                updates: []
            }
        };
        // The instantiation of the canister class that occurs in getCanisterClassMeta
        // will set the initial value of this.constructor._azleCanisterClassMeta.
        // this.constructor._azleCanisterClassMeta will be the same reference throughout
        // all instantiations of exported canister classes. If the canister class has not been
        // exported as the default export from the main entrypoint of the canister,
        // then this.constructor._azleCanisterClassMeta will be undefined, and we will
        // then just use a default value that will be thrown away at the end of this function scope.
        // This handles the case of the developer instantiating a class with canister method
        // decorators, but not exporting that class from the main entrypoint.
        // We only ever want canister methods to be registered if they were exported
        // from the main entrypoint defined in dfx.json.
        var canisterClassMeta = (_a = this.constructor._azleCanisterClassMeta) !== null && _a !== void 0 ? _a : defaultCanisterClassMeta;
        var name = context.name;
        var index = canisterClassMeta.canisterMethodsIndex++;
        var indexString = index.toString();
        if (canisterMethodMode === 'query') {
            throwIfMethodAlreadyDefined("@query ".concat(name), ((_b = canisterClassMeta.methodMeta.queries) === null || _b === void 0 ? void 0 : _b.find(function (queryMethod) { return queryMethod.name === name; })) !== undefined);
            (_c = canisterClassMeta.methodMeta.queries) === null || _c === void 0 ? void 0 : _c.push({
                name: name,
                index: index,
                composite: (_d = options === null || options === void 0 ? void 0 : options.composite) !== null && _d !== void 0 ? _d : false,
                hidden: (_e = options === null || options === void 0 ? void 0 : options.hidden) !== null && _e !== void 0 ? _e : false
            });
            canisterClassMeta.canisterMethodIdlParamTypes[name] = candid_1.IDL.Func(paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [], returnIdlType === undefined ? [] : [returnIdlType], ['query']);
        }
        if (canisterMethodMode === 'update') {
            throwIfMethodAlreadyDefined("@update ".concat(name), ((_f = canisterClassMeta.methodMeta.updates) === null || _f === void 0 ? void 0 : _f.find(function (updateMethod) { return updateMethod.name === name; })) !== undefined);
            (_g = canisterClassMeta.methodMeta.updates) === null || _g === void 0 ? void 0 : _g.push({
                name: name,
                index: index,
                hidden: (_h = options === null || options === void 0 ? void 0 : options.hidden) !== null && _h !== void 0 ? _h : false
            });
            canisterClassMeta.canisterMethodIdlParamTypes[name] = candid_1.IDL.Func(paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [], returnIdlType === undefined ? [] : [returnIdlType]);
        }
        if (canisterMethodMode === 'init') {
            throwIfMethodAlreadyDefined('@init', canisterClassMeta.methodMeta.init !== undefined);
            canisterClassMeta.methodMeta.init = {
                name: name,
                index: index
            };
            var postUpgradeDefined = canisterClassMeta.methodMeta.post_upgrade !== undefined;
            if (postUpgradeDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [], canisterClassMeta.initAndPostUpgradeIdlTypes);
            }
            else {
                canisterClassMeta.initAndPostUpgradeIdlTypes =
                    paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [];
            }
        }
        if (canisterMethodMode === 'postUpgrade') {
            throwIfMethodAlreadyDefined('@postUpgrade', canisterClassMeta.methodMeta.post_upgrade !== undefined);
            canisterClassMeta.methodMeta.post_upgrade = {
                name: name,
                index: index
            };
            var initDefined = canisterClassMeta.methodMeta.init !== undefined;
            if (initDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [], canisterClassMeta.initAndPostUpgradeIdlTypes);
            }
            else {
                canisterClassMeta.initAndPostUpgradeIdlTypes =
                    paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [];
            }
        }
        if (canisterMethodMode === 'preUpgrade') {
            throwIfMethodAlreadyDefined('@preUpgrade', canisterClassMeta.methodMeta.pre_upgrade !== undefined);
            canisterClassMeta.methodMeta.pre_upgrade = {
                name: name,
                index: index
            };
        }
        if (canisterMethodMode === 'inspectMessage') {
            throwIfMethodAlreadyDefined('@inspectMessage', canisterClassMeta.methodMeta.inspect_message !== undefined);
            canisterClassMeta.methodMeta.inspect_message = {
                name: name,
                index: index
            };
        }
        if (canisterMethodMode === 'heartbeat') {
            throwIfMethodAlreadyDefined('@heartbeat', canisterClassMeta.methodMeta.heartbeat !== undefined);
            canisterClassMeta.methodMeta.heartbeat = {
                name: name,
                index: index
            };
        }
        if (canisterMethodMode === 'onLowWasmMemory') {
            throwIfMethodAlreadyDefined('@onLowWasmMemory', canisterClassMeta.methodMeta.on_low_wasm_memory !== undefined);
            canisterClassMeta.methodMeta.on_low_wasm_memory = {
                name: name,
                index: index
            };
        }
        canisterClassMeta.callbacks[indexString] = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, execute_and_reply_with_candid_serde_1.executeAndReplyWithCandidSerde)(canisterMethodMode, originalMethod.bind(this), paramIdlTypes !== null && paramIdlTypes !== void 0 ? paramIdlTypes : [], returnIdlType, (_a = options === null || options === void 0 ? void 0 : options.manual) !== null && _a !== void 0 ? _a : false, canisterClassMeta.canisterMethodIdlParamTypes)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        (0, error_1.handleUncaughtError)(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    });
}
/**
 * @internal
 *
 * Determines if the params are from a pure decorator function without our own parameter currying.
 */
function isDecoratorOverloadedWithoutParams(param1, param2) {
    return (typeof param1 === 'function' &&
        param2 !== undefined &&
        'kind' in param2 &&
        param2.kind === 'method' &&
        param2.metadata !== undefined &&
        param2.name !== undefined);
}
/**
 * @internal
 *
 * Uses the candid string of the `@init` and `@postUpgrade` methods to verify that
 * they have matching parameter signatures.
 *
 * @param idlTypes - Array of IDL function types representing canister methods
 * @throws {Error} If methods have mismatched parameters or if invalid number of methods
 */
function verifyInitAndPostUpgradeHaveTheSameParams(a, b) {
    var aSignature = (0, did_file_1.idlToString)(candid_1.IDL.Func(a, []));
    var bSignature = (0, did_file_1.idlToString)(candid_1.IDL.Func(b, []));
    if (aSignature !== bSignature) {
        throw new Error("'@init' and '@postUpgrade' methods must have the same parameters.\nFound:\n".concat(aSignature, "\n").concat(bSignature));
    }
}
/**
 * @internal
 *
 * Throws an error if a method is already defined in the class.
 *
 * @param methodName - The name of the method
 * @param isDefined - Whether the method is already defined
 * @throws {Error} If the method is already defined
 */
function throwIfMethodAlreadyDefined(methodName, isDefined) {
    if (isDefined === true) {
        throw new Error("'".concat(methodName, "' method can only have one definition in the canister"));
    }
}
