import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { SimpleCandidShapeArb } from '../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../simple_type_arbs/value_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';
import { BoolCandidDefinition, CandidValues } from '../candid_meta_arb';
import { CandidType } from '../candid_type';

export const BoolArb = SimpleCandidValueAndMetaArb(
    fc.boolean(),
    CandidType.Bool,
    booleanToSrcLiteral
);

export const BoolDefinitionArb: fc.Arbitrary<BoolCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Bool);

export const BoolValueArb: fc.Arbitrary<CandidValues<boolean>> =
    SimpleCandidValueArb(fc.boolean(), booleanToSrcLiteral);
