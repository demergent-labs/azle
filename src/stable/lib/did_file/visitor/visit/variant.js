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
exports.visitVariant = visitVariant;
var escape_candid_name_1 = require("../escape_candid_name");
var extract_candid_1 = require("../extract_candid");
/**
 * @internal
 * Visitor for variant types in Candid generation.
 */
function visitVariant(fields, didVisitor, data) {
    var candidFields = fields.map(function (_a) {
        var _key = _a[0], value = _a[1];
        return value.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    });
    var candid = (0, extract_candid_1.extractCandid)(candidFields);
    var fields_string = fields.map(function (_a, index) {
        var key = _a[0], value = _a[1];
        return (0, escape_candid_name_1.escapeCandidName)(key) +
            (value.name === 'null' ? '' : ":".concat(candid[0][index]));
    });
    return ["variant {".concat(fields_string.join('; '), "}"), candid[1]];
}
