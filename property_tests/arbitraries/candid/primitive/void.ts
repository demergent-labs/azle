import fc from 'fast-check';
import { voidToSrcLiteral } from '../to_src_literal/void';
import { CandidValues, VoidCandidDefinition } from '../candid_meta_arb';
import { SimpleCandidShapeArb } from '../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../simple_type_arbs/value_arb';
import { CandidType } from '../candid_type';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';

export const VoidArb = SimpleCandidValueAndMetaArb(
    fc.constant(undefined),
    CandidType.Void,
    voidToSrcLiteral
);

export const VoidDefinitionArb: fc.Arbitrary<VoidCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Void);

export const VoidValueArb: fc.Arbitrary<CandidValues<undefined>> =
    SimpleCandidValueArb(fc.constant(undefined), voidToSrcLiteral);
