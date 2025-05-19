"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitPrimitive = visitPrimitive;
/**
 * @internal
 * Visitor for primitive types in Candid generation.
 */
function visitPrimitive(t) {
    return [t.display(), {}];
}
