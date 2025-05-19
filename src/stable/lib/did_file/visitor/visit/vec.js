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
exports.visitVec = visitVec;
/**
 * @internal
 * Visitor for vector types in Candid generation.
 */
function visitVec(ty, didVisitor, data) {
    var candid = ty.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    return ["vec ".concat(candid[0]), candid[1]];
}
