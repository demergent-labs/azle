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
exports.visitFunc = visitFunc;
var extract_candid_1 = require("../extract_candid");
/**
 * @internal
 * Visitor for function types in Candid generation.
 */
function visitFunc(t, didVisitor, data) {
    var argsTypes = t.argTypes.map(function (value) {
        return value.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    });
    var candidArgs = (0, extract_candid_1.extractCandid)(argsTypes);
    var retsTypes = t.retTypes.map(function (value) {
        return value.accept(didVisitor, __assign(__assign({}, data), { isOnService: false }));
    });
    var candidRets = (0, extract_candid_1.extractCandid)(retsTypes);
    var args = candidArgs[0].join(', ');
    var rets = candidRets[0].join(', ');
    var annon = t.annotations.length === 0 ? '' : " ".concat(t.annotations.join(' '));
    return [
        "".concat(data.isOnService ? '' : 'func ', "(").concat(args, ") -> (").concat(rets, ")").concat(annon),
        __assign(__assign({}, candidArgs[1]), candidRets[1])
    ];
}
