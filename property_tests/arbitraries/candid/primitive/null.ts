import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';
import { NullCandidDefinition } from '../definition_arb/types';
import { CandidValues } from '../values';

export const NullArb = SimpleCandidValueAndMetaArb(
    fc.constant(null),
    'Null',
    nullToSrcLiteral
);

export const NullDefinitionArb: fc.Arbitrary<NullCandidDefinition> =
    SimpleCandidDefinitionArb('Null');

export const NullValueArb: fc.Arbitrary<CandidValues<null>> =
    SimpleCandidValuesArb(fc.constant(null), nullToSrcLiteral);
