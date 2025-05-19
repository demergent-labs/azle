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
exports.visitTuple = visitTuple;
var extract_candid_1 = require("../extract_candid");
/**
 * @internal
 * Visitor for tuple types in Candid generation.
 */
function visitTuple(components, didVisitor, data) {
    var fields = components.map(function (value) {
        return value.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    });
    var candid = (0, extract_candid_1.extractCandid)(fields);
    return ["record {".concat(candid[0].join('; '), "}"), candid[1]];
}
