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
exports.extractCandid = extractCandid;
/**
 * @internal
 *
 * Internal helper for the Candid visitor system that combines multiple visitor results.
 * Separates Candid definitions from their associated type definitions.
 *
 * @param paramInfo - Array of visitor results, each containing a Candid definition and its type definitions
 * @returns Tuple of [Array of Candid definitions, Combined type definitions map]
 *
 * @remarks
 * Used by visitor components to:
 * - Extract Candid definitions for method parameters, records, variants etc.
 * - Merge type definitions from multiple visited nodes
 * - Maintain type relationships in the final Candid interface
 */
function extractCandid(paramInfo) {
    var paramCandid = paramInfo.map(function (_a) {
        var candid = _a[0], _candidTypeDefs = _a[1];
        return candid;
    });
    var candidTypeDefs = paramInfo.reduce(function (acc, _a) {
        var _candid = _a[0], candidTypeDefs = _a[1];
        return __assign(__assign({}, acc), candidTypeDefs);
    }, {});
    return [paramCandid, candidTypeDefs];
}
