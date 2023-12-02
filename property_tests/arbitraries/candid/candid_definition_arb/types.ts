import { CandidType } from '../candid_type';

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
export type OptCandidDefinition = SingleTypeConstructedDefinition;
export type VecCandidDefinition = SingleTypeConstructedDefinition;
export type RecordCandidDefinition = MultiTypeConstructedDefinition;
export type VariantCandidDefinition = MultiTypeConstructedDefinition;
export type TupleCandidDefinition = UnnamedMultiTypeConstructedDefinition;
export type BlobCandidDefinition = PrimitiveDefinition;

// Primitives
export type FloatCandidDefinition = PrimitiveDefinition;
export type IntCandidDefinition = PrimitiveDefinition;
export type NatCandidDefinition = PrimitiveDefinition;
export type BoolCandidDefinition = PrimitiveDefinition;
export type NullCandidDefinition = PrimitiveDefinition;
export type TextCandidDefinition = PrimitiveDefinition;
export type VoidCandidDefinition = PrimitiveDefinition;

// Reference
export type FuncCandidDefinition = {
    candidMeta: CandidMeta;
    paramCandidMeta: CandidDefinition[];
    returnCandidMeta: CandidDefinition;
};
export type PrincipalCandidDefinition = PrimitiveDefinition;
export type ServiceCandidDefinition = {
    name: string;
    candidMeta: CandidMeta;
    funcs: ServiceMethodDefinition[];
};
export type ServiceMethodDefinition = {
    name: string;
    imports: Set<string>;
    typeAliasDeclarations: string[];
    src: string;
};

type CandidMeta = {
    typeAnnotation: string; // Either a type reference or type literal
    typeAliasDeclarations: string[];
    imports: Set<string>;
    candidType: CandidType;
};
