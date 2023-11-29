import fc from 'fast-check';
import { CorrespondingJSType } from './candid_type_arb';
import { RecordValueArb } from './constructed/record_arb/base';
import { BoolValueArb } from './primitive/bool';
import { VecValueArb } from './constructed/vec_arb/base';
import { CandidType } from './candid_type';
import { TextValueArb } from './primitive/text';
import { NullValueArb } from './primitive/null';

export type CandidMeta = {
    typeAnnotation: string; // Either a type reference or type literal
    typeAliasDeclarations: string[];
    imports: Set<string>;
    candidType: CandidType;
};

export type CandidValues<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    valueLiteral: string;
};

export type CandidDefinition =
    | MultiTypeConstructedDefinition
    | SingleTypeConstructedDefinition
    | PrimitiveDefinition
    | UnnamedMultiTypeConstructedDefinition
    | FuncCandidDefinition
    | ServiceCandidDefinition;

export type MultiTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerTypes: [string, CandidDefinition][];
};

export type UnnamedMultiTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerTypes: CandidDefinition[];
};

export type SingleTypeConstructedDefinition = {
    candidMeta: CandidMeta;
    innerType: CandidDefinition;
};

export type PrimitiveDefinition = {
    candidMeta: CandidMeta;
};

// Constructed
export type OptCandidMeta = SingleTypeConstructedDefinition;
export type VecCandidMeta = SingleTypeConstructedDefinition;
export type RecordCandidMeta = MultiTypeConstructedDefinition;
export type VariantCandidMeta = MultiTypeConstructedDefinition;
export type TupleCandidMeta = UnnamedMultiTypeConstructedDefinition;
export type BlobCandidMeta = VecCandidMeta;

// Primitives
export type FloatCandidMeta = PrimitiveDefinition;
export type IntCandidMeta = PrimitiveDefinition;
export type NatCandidMeta = PrimitiveDefinition;
export type BoolCandidMeta = PrimitiveDefinition;
export type NullCandidMeta = PrimitiveDefinition;
export type TextCandidMeta = PrimitiveDefinition;

// Reference
export type FuncCandidDefinition = {
    candidMeta: CandidMeta;
    paramCandidMeta: CandidDefinition[];
    returnCandidMeta: CandidDefinition;
};
export type PrincipalCandidMeta = PrimitiveDefinition;
export type ServiceCandidDefinition = {
    candidMeta: CandidMeta;
    funcs: FuncCandidDefinition[];
};

export function CandidValueArb(
    candidTypeMeta: CandidDefinition
): fc.Arbitrary<CandidValues<CorrespondingJSType>> {
    const candidType = candidTypeMeta.candidMeta.candidType;
    if (candidType === CandidType.Record) {
        return RecordValueArb(candidTypeMeta as MultiTypeConstructedDefinition);
    }
    if (candidType === CandidType.Variant) {
        // return generateVariantValues(candidTypeMeta);
    }
    if (candidType === CandidType.Bool) {
        return BoolValueArb;
    }
    if (candidType === CandidType.Vec) {
        return VecValueArb(candidTypeMeta as SingleTypeConstructedDefinition);
    }
    if (candidType === CandidType.Text) {
        return TextValueArb;
    }
    if (candidType === CandidType.Null) {
        return NullValueArb;
    }
    // etc
    throw 'Type cannot be converted to CandidValue yet';
}
