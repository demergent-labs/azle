"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidVisitor = void 0;
exports.getDefaultVisitorData = getDefaultVisitorData;
var candid_1 = require("@dfinity/candid");
var func_1 = require("./visit/func");
var opt_1 = require("./visit/opt");
var primitive_1 = require("./visit/primitive");
var record_1 = require("./visit/record");
var recursive_1 = require("./visit/recursive");
var service_1 = require("./visit/service");
var tuple_1 = require("./visit/tuple");
var variant_1 = require("./visit/variant");
var vec_1 = require("./visit/vec");
/**
 * Creates default visitor configuration data.
 * Used to initialize the visitor system for processing a canister's types.
 *
 * @returns Fresh VisitorData with empty tracking collections
 */
function getDefaultVisitorData() {
    return {
        usedRecClasses: [],
        isOnService: false,
        isFirstService: false,
        initAndPostUpgradeParamIdlTypes: []
    };
}
/**
 * Visitor implementation for converting TypeScript/IDL types to Candid definitions.
 * Extends the IDL.Visitor to handle all Candid type constructs.
 *
 * Used to generate .did interface files from canister class definitions.
 * Processes types recursively while maintaining proper scoping and type relationships.
 *
 * @example
 * const visitor = new DidVisitor();
 * const myType = new IDL.Service({...implementation});
 * const result = myType.accept(visitor, getDefaultVisitorData());
 * const candidString = toDidString(result);
 */
var DidVisitor = /** @class */ (function (_super) {
    __extends(DidVisitor, _super);
    function DidVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DidVisitor.prototype.visitService = function (t, data) {
        return (0, service_1.visitService)(t, this, data);
    };
    DidVisitor.prototype.visitPrimitive = function (t, _data) {
        return (0, primitive_1.visitPrimitive)(t);
    };
    DidVisitor.prototype.visitTuple = function (_t, components, data) {
        return (0, tuple_1.visitTuple)(components, this, data);
    };
    DidVisitor.prototype.visitOpt = function (_t, ty, data) {
        return (0, opt_1.visitOpt)(ty, this, data);
    };
    DidVisitor.prototype.visitVec = function (_t, ty, data) {
        return (0, vec_1.visitVec)(ty, this, data);
    };
    DidVisitor.prototype.visitFunc = function (t, data) {
        return (0, func_1.visitFunc)(t, this, data);
    };
    DidVisitor.prototype.visitRec = function (t, ty, data) {
        return (0, recursive_1.visitRecursive)(t, ty, this, data);
    };
    DidVisitor.prototype.visitRecord = function (_t, fields, data) {
        return (0, record_1.visitRecord)(fields, this, data);
    };
    DidVisitor.prototype.visitVariant = function (_t, fields, data) {
        return (0, variant_1.visitVariant)(fields, this, data);
    };
    return DidVisitor;
}(candid_1.IDL.Visitor));
exports.DidVisitor = DidVisitor;
