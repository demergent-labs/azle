import { IDL } from '@dfinity/candid';

import { visitFunc } from './visit/func';
import { visitOpt } from './visit/opt';
import { visitPrimitive } from './visit/primitive';
import { visitRecord } from './visit/record';
import { visitRecursive } from './visit/recursive';
import { visitService } from './visit/service';
import { visitTuple } from './visit/tuple';
import { visitVariant } from './visit/variant';
import { visitVec } from './visit/vec';

/**
 * Configuration data passed through the Candid type visitor system.
 * Controls visitor behavior and tracks state during traversal.
 */
export type VisitorData = {
    /** Tracks recursive types to prevent infinite loops */
    usedRecClasses: IDL.RecClass[];
    /** Indicates if currently visiting a service definition */
    isOnService: boolean;
    /** Indicates if this is the first/primary service being processed */
    isFirstService: boolean;
    /** Collection of system functions (init, postUpgrade) to process */
    initAndPostUpgradeParamIdlTypes: IDL.FuncClass[];
};

/**
 * Result tuple returned by visitor operations.
 * Combines Candid definitions with their associated type definitions.
 */
export type VisitorResult = [CandidDef, CandidTypesDefs];

/**
 * Name of a Candid type definition.
 * Used as keys in the type definition map.
 */
export type TypeName = string;

/**
 * String representation of a Candid type or definition.
 * The actual Candid syntax for a type, method, or service.
 */
export type CandidDef = string;

/**
 * Map of named type definitions in a Candid interface.
 * Keys are type names, values are their Candid definitions.
 */
export type CandidTypesDefs = { [key: TypeName]: CandidDef };

/**
 * Creates default visitor configuration data.
 * Used to initialize the visitor system for processing a canister's types.
 *
 * @returns Fresh VisitorData with empty tracking collections
 */
export function getDefaultVisitorData(): VisitorData {
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
export class DidVisitor extends IDL.Visitor<VisitorData, VisitorResult> {
    visitService(t: IDL.ServiceClass, data: VisitorData): VisitorResult {
        return visitService(t, this, data);
    }
    visitPrimitive<T>(
        t: IDL.PrimitiveType<T>,
        _data: VisitorData
    ): VisitorResult {
        return visitPrimitive(t);
    }
    visitTuple<T extends any[]>(
        _t: IDL.TupleClass<T>,
        components: IDL.Type<any>[],
        data: VisitorData
    ): VisitorResult {
        return visitTuple(components, this, data);
    }
    visitOpt<T>(
        _t: IDL.OptClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitOpt(ty, this, data);
    }
    visitVec<T>(
        _t: IDL.VecClass<T>,
        ty: IDL.Type<T>,
        data: VisitorData
    ): VisitorResult {
        return visitVec(ty, this, data);
    }
    visitFunc(t: IDL.FuncClass, data: VisitorData): VisitorResult {
        return visitFunc(t, this, data);
    }
    visitRec<T>(
        t: IDL.RecClass<T>,
        ty: IDL.ConstructType<T>,
        data: VisitorData
    ): VisitorResult {
        return visitRecursive(t, ty, this, data);
    }
    visitRecord(
        _t: IDL.RecordClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitRecord(fields, this, data);
    }
    visitVariant(
        _t: IDL.VariantClass,
        fields: [string, IDL.Type<any>][],
        data: VisitorData
    ): VisitorResult {
        return visitVariant(fields, this, data);
    }
}
