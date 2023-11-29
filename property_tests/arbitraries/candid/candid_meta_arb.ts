import fc from 'fast-check';
import { CandidType } from './candid_type_arb';
import { RecordValueArb } from './constructed/record_arb/base';
import { BoolValueArb } from './primitive/bool';
import { VecValueArb } from './constructed/vec_arb/base';
import { CandidClass } from './candid_class';

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
