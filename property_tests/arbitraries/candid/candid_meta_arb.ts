import fc from 'fast-check';
import { CandidType } from './candid_type_arb';
import { RecordValueArb } from './constructed/record_arb/base';
import { BoolValueArb } from './primitive/bool';
import { VecValueArb } from './constructed/vec_arb/base';

export type CandidMeta = {
    candidType: string;
    typeDeclaration: string;
    imports: Set<string>;
    candidClass: CandidClass;
};

export type CandidValues<T extends CandidType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    valueLiteral: string;
};

export enum CandidClass {
    Opt,
    Record,
    Tuple,
    Variant,
    Vec,
    Blob,
    Float32,
    Float64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Nat,
    Nat8,
    Nat16,
    Nat32,
    Nat64,
    Bool,
    Null,
    Text,
    Func,
    Principal,
    Service
}

export function primitiveCandidClassToType(candidClass: CandidClass): string {
    if (candidClass === CandidClass.Float32) {
        return 'float32';
    }
    if (candidClass === CandidClass.Float64) {
        return 'float64';
    }
    if (candidClass === CandidClass.Int) {
        return 'int';
    }
    if (candidClass === CandidClass.Int8) {
        return 'int8';
    }
    if (candidClass === CandidClass.Int16) {
        return 'int16';
    }
    if (candidClass === CandidClass.Int32) {
        return 'int32';
    }
    if (candidClass === CandidClass.Int64) {
        return 'int64';
    }
    if (candidClass === CandidClass.Nat) {
        return 'nat';
    }
    if (candidClass === CandidClass.Nat8) {
        return 'nat8';
    }
    if (candidClass === CandidClass.Nat16) {
        return 'nat16';
    }
    if (candidClass === CandidClass.Nat32) {
        return 'nat32';
    }
    if (candidClass === CandidClass.Nat64) {
        return 'nat64';
    }
    if (candidClass === CandidClass.Bool) {
        return 'bool';
    }
    if (candidClass === CandidClass.Null) {
        return 'null';
    }
    if (candidClass === CandidClass.Text) {
        return 'text';
    }
    return '';
}

export function primitiveCandidClassToImports(
    candidClass: CandidClass
): Set<string> {
    return new Set([primitiveCandidClassToType(candidClass)]);
}

export type CandidTypeMeta =
    | MultiTypeConstructedCandidMeta
    | SingleTypeConstructedMeta
    | PrimitiveCandidMeta
    | UnnamedMultiTypeConstructedCandidMeta
    | FuncCandidMeta
    | ServiceCandidMeta;

export type MultiTypeConstructedCandidMeta = {
    candidMeta: CandidMeta;
    innerTypes: [string, CandidTypeMeta][];
};

export type UnnamedMultiTypeConstructedCandidMeta = {
    candidMeta: CandidMeta;
    innerTypes: CandidTypeMeta[];
};

export type SingleTypeConstructedMeta = {
    candidMeta: CandidMeta;
    innerType: CandidTypeMeta;
};

export type PrimitiveCandidMeta = {
    candidMeta: CandidMeta;
};

// Constructed
export type OptCandidMeta = SingleTypeConstructedMeta;
export type VecCandidMeta = SingleTypeConstructedMeta;
export type RecordCandidMeta = MultiTypeConstructedCandidMeta;
export type VariantCandidMeta = MultiTypeConstructedCandidMeta;
export type TupleCandidMeta = UnnamedMultiTypeConstructedCandidMeta;
export type BlobCandidMeta = VecCandidMeta;

// Primitives
export type FloatCandidMeta = PrimitiveCandidMeta;
export type IntCandidMeta = PrimitiveCandidMeta;
export type NatCandidMeta = PrimitiveCandidMeta;
export type BoolCandidMeta = PrimitiveCandidMeta;
export type NullCandidMeta = PrimitiveCandidMeta;
export type TextCandidMeta = PrimitiveCandidMeta;

// Reference
export type FuncCandidMeta = {
    candidMeta: CandidMeta;
    paramCandidMeta: CandidTypeMeta[];
    returnCandidMeta: CandidTypeMeta;
};
export type PrincipalCandidMeta = PrimitiveCandidMeta;
export type ServiceCandidMeta = {
    candidMeta: CandidMeta;
    funcs: FuncCandidMeta[];
};

export function CandidValueArb(
    candidTypeMeta: CandidTypeMeta
): fc.Arbitrary<CandidValues<CandidType>> {
    const candidType = candidTypeMeta.candidMeta.candidClass;
    if (candidType === CandidClass.Record) {
        return RecordValueArb(candidTypeMeta as MultiTypeConstructedCandidMeta);
    }
    if (candidType === CandidClass.Variant) {
        // return generateVariantValues(candidTypeMeta);
    }
    if (candidType === CandidClass.Bool) {
        return BoolValueArb;
    }
    if (candidType === CandidClass.Vec) {
        return VecValueArb(candidTypeMeta as SingleTypeConstructedMeta);
    }
    // etc
    throw 'Type cannot be converted to CandidValue yet';
}
