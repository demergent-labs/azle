import fc from 'fast-check';
import { CorrespondingJSType } from './candid_type_arb';
import { RecordValueArb } from './constructed/record_arb/base';
import { BoolValueArb } from './primitive/bool';
import { VecValueArb } from './constructed/vec_arb/base';
import { CandidType } from './candid_type';

export type CandidTypeMeta = {
    candidType: string;
    typeDeclaration: string;
    imports: Set<string>;
    candidClass: CandidType;
};

export type CandidValues<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    valueLiteral: string;
};

export type CandidTypeShape =
    | MultiTypeConstructedCandidShape
    | SingleTypeConstructedShape
    | PrimitiveCandidShape
    | UnnamedMultiTypeConstructedCandidShape
    | FuncCandidShape
    | ServiceCandidShape;

export type MultiTypeConstructedCandidShape = {
    candidMeta: CandidTypeMeta;
    innerTypes: [string, CandidTypeShape][];
};

export type UnnamedMultiTypeConstructedCandidShape = {
    candidMeta: CandidTypeMeta;
    innerTypes: CandidTypeShape[];
};

export type SingleTypeConstructedShape = {
    candidMeta: CandidTypeMeta;
    innerType: CandidTypeShape;
};

export type PrimitiveCandidShape = {
    candidMeta: CandidTypeMeta;
};

// Constructed
export type OptCandidMeta = SingleTypeConstructedShape;
export type VecCandidMeta = SingleTypeConstructedShape;
export type RecordCandidMeta = MultiTypeConstructedCandidShape;
export type VariantCandidMeta = MultiTypeConstructedCandidShape;
export type TupleCandidMeta = UnnamedMultiTypeConstructedCandidShape;
export type BlobCandidMeta = VecCandidMeta;

// Primitives
export type FloatCandidMeta = PrimitiveCandidShape;
export type IntCandidMeta = PrimitiveCandidShape;
export type NatCandidMeta = PrimitiveCandidShape;
export type BoolCandidMeta = PrimitiveCandidShape;
export type NullCandidMeta = PrimitiveCandidShape;
export type TextCandidMeta = PrimitiveCandidShape;

// Reference
export type FuncCandidShape = {
    candidMeta: CandidTypeMeta;
    paramCandidMeta: CandidTypeShape[];
    returnCandidMeta: CandidTypeShape;
};
export type PrincipalCandidMeta = PrimitiveCandidShape;
export type ServiceCandidShape = {
    candidMeta: CandidTypeMeta;
    funcs: FuncCandidShape[];
};

export function CandidValueArb(
    candidTypeMeta: CandidTypeShape
): fc.Arbitrary<CandidValues<CorrespondingJSType>> {
    const candidType = candidTypeMeta.candidMeta.candidClass;
    if (candidType === CandidType.Record) {
        return RecordValueArb(
            candidTypeMeta as MultiTypeConstructedCandidShape
        );
    }
    if (candidType === CandidType.Variant) {
        // return generateVariantValues(candidTypeMeta);
    }
    if (candidType === CandidType.Bool) {
        return BoolValueArb;
    }
    if (candidType === CandidType.Vec) {
        return VecValueArb(candidTypeMeta as SingleTypeConstructedShape);
    }
    // etc
    throw 'Type cannot be converted to CandidValue yet';
}
