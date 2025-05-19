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
exports.visitRecursive = visitRecursive;
/**
 * @internal
 * Visitor for recursive types in Candid generation.
 */
function visitRecursive(t, ty, didVisitor, data) {
    var _a;
    // For RecClasses the definition will be the name, that name will
    // reference the actual definition which will be added to the list of
    // candid type defs that will get put at the top of the candid file
    // Everything else will just be the normal inline candid def
    var usedRecClasses = data.usedRecClasses;
    if (!usedRecClasses.includes(t)) {
        var candid = ty.accept(didVisitor, __assign(__assign({}, data), { usedRecClasses: __spreadArray(__spreadArray([], usedRecClasses, true), [t], false), isOnService: false, isFirstService: false }));
        return [t.name, __assign(__assign({}, candid[1]), (_a = {}, _a[t.name] = candid[0], _a))];
    }
    // If our list already includes this rec class then just return, we don't
    // need the list because we will get it when we go through the arm above
    return [t.name, {}];
}
