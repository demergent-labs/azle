import fc from 'fast-check';

import { CandidType as RuntimeCandidType } from '../../../../../src/lib/experimental/candid/candid_type';
import { Context } from '../../types';
import { CandidType } from '../candid_type';
import { RecursiveShapes } from '../recursive';
import { ServiceMethodDefinition } from '../reference/service_arb/service_method_arb';
import { ComplexDefinitionWeights } from './complex_candid_definition_memo';
import { PrimitiveDefinitionWeights } from './simple_candid_definition_arb';

export type CandidDefinitionMemo = (
    depthLevel: number
) => WithShapesArb<CandidDefinition>;
export type RecursiveCandidDefinitionMemo = (
    context: Context<DefinitionConstraints>,
    parents: RecursiveCandidName[]
) => CandidDefinitionMemo;

export type DefinitionConstraints = Partial<{
    depthLevel: number;
    recursiveWeights: boolean;
    weights: CandidDefinitionWeights;
    forceInline?: boolean;
}>;

export type CandidDefinitionWeights = Partial<
    Record<
        keyof ComplexDefinitionWeights | keyof PrimitiveDefinitionWeights,
        number
    >
>;

export type WithShapes<T> = { definition: T; recursiveShapes: RecursiveShapes };
export type WithShapesArb<T> = fc.Arbitrary<WithShapes<T>>;

export type CandidDefinitionArb = WithShapesArb<CandidDefinition>;

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

// Recursive
export type RecursiveCandidName = {
    candidMeta: CandidMeta;
    name: string;
};
export type RecursiveCandidDefinition = {
    candidMeta: CandidMeta;
    name: string;
    innerType: CandidDefinition;
};

type CandidMeta = {
    typeAnnotation: string; // Either a type reference or type literal
    typeObject: string;
    runtimeTypeObject: RuntimeCandidType;
    variableAliasDeclarations: string[];
    imports: Set<string>;
    candidType: CandidType;
};
