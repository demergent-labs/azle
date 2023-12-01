import fc from 'fast-check';
import { voidToSrcLiteral } from '../to_src_literal/void';
import { VoidCandidDefinition } from '../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { CandidType } from '../candid_type';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { CandidValues } from '../values';

export const VoidArb = SimpleCandidValueAndMetaArb(
    fc.constant(undefined),
    CandidType.Void,
    voidToSrcLiteral
);

export const VoidDefinitionArb: fc.Arbitrary<VoidCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Void);

export const VoidValueArb: fc.Arbitrary<CandidValues<undefined>> =
    SimpleCandidValuesArb(fc.constant(undefined), voidToSrcLiteral);
