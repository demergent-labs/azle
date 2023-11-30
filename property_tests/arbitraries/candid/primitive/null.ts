import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { SimpleCandidShapeArb } from '../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../simple_type_arbs/value_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';
import { CandidType } from '../candid_type';
import { CandidValues, NullCandidDefinition } from '../candid_meta_arb';

export const NullArb = SimpleCandidValueAndMetaArb(
    fc.constant(null),
    CandidType.Null,
    nullToSrcLiteral
);

export const NullDefinitionArb: fc.Arbitrary<NullCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Null);

export const NullValueArb: fc.Arbitrary<CandidValues<null>> =
    SimpleCandidValueArb(fc.constant(null), nullToSrcLiteral);
