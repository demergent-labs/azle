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
exports.visitOpt = visitOpt;
/**
 * @internal
 * Visitor for optional types in Candid generation.
 */
function visitOpt(ty, didVisitor, data) {
    var candid = ty.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    return ["opt ".concat(candid[0]), candid[1]];
}
