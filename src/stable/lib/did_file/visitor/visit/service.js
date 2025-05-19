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
exports.visitService = visitService;
var candid_1 = require("@dfinity/candid");
var escape_candid_name_1 = require("../escape_candid_name");
var extract_candid_1 = require("../extract_candid");
/**
 * @internal
 * Visitor for service definitions in Candid generation.
 */
function visitService(t, didVisitor, data) {
    var queryAndUpdateMethods = getQueryAndUpdateMethods(t, didVisitor, data);
    var initAndPostUpgradeMethodCandid = getInitAndPostUpgradeMethodCandid(didVisitor, data);
    var candidTypes = __assign(__assign({}, queryAndUpdateMethods[1]), initAndPostUpgradeMethodCandid[1]);
    return serviceToCandidString(t, queryAndUpdateMethods[0], initAndPostUpgradeMethodCandid[0], candidTypes, data.isFirstService);
}
function serviceToCandidString(t, canisterMethodCandidStrings, initAndPostUpgradeMethodCandidString, candidTypes, isFirstService) {
    var tab = isFirstService ? '    ' : '';
    var func_separator = isFirstService ? '\n' : ' ';
    var funcStrings = canisterMethodCandidStrings
        .map(function (value, index) {
        return "".concat(tab).concat((0, escape_candid_name_1.escapeCandidName)(t._fields[index][0]), ": ").concat(value, ";");
    })
        .join(func_separator);
    var canisterParamsString = createCanisterParamsString(initAndPostUpgradeMethodCandidString);
    if (isFirstService === true) {
        return [
            "service: ".concat(canisterParamsString, " -> {\n").concat(funcStrings, "\n}"),
            candidTypes
        ];
    }
    return ["service {".concat(funcStrings, "}"), candidTypes];
}
function getInitAndPostUpgradeMethodCandid(didVisitor, data) {
    var result = candid_1.IDL.Func(data.initAndPostUpgradeParamIdlTypes, []).accept(didVisitor, __assign(__assign({}, data), { isOnService: true, isFirstService: false }));
    return (0, extract_candid_1.extractCandid)([result]);
}
function getQueryAndUpdateMethods(t, didVisitor, data) {
    return (0, extract_candid_1.extractCandid)(t._fields.map(function (_a) {
        var _name = _a[0], func = _a[1];
        return func.accept(didVisitor, __assign(__assign({}, data), { isOnService: true, isFirstService: false }));
    }));
}
function createCanisterParamsString(initMethodCandidString) {
    var parts = initMethodCandidString[0].split('->');
    if (parts.length >= 2) {
        return parts.slice(0, -1).join('->').trim();
    }
    return '()'; // If we can't find any init or post upgrade params return empty ()
}
