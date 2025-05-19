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
exports.visitRecord = visitRecord;
var escape_candid_name_1 = require("../escape_candid_name");
var extract_candid_1 = require("../extract_candid");
/**
 * @internal
 * Visitor for record types in Candid generation.
 */
function visitRecord(fields, didVisitor, data) {
    var candidFields = fields.map(function (_a) {
        var _key = _a[0], value = _a[1];
        return value.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    });
    var candid = (0, extract_candid_1.extractCandid)(candidFields);
    var field_strings = fields.map(function (_a, index) {
        var key = _a[0], _value = _a[1];
        return "".concat((0, escape_candid_name_1.escapeCandidName)(key), ":").concat(candid[0][index]);
    });
    return ["record {".concat(field_strings.join('; '), "}"), candid[1]];
}
