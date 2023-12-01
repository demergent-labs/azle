import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';
import { BoolCandidDefinition } from '../definition_arb/types';
import { CandidValues } from '../values';

export const BoolArb = SimpleCandidValueAndMetaArb(
    fc.boolean(),
    'bool',
    booleanToSrcLiteral
);

export const BoolDefinitionArb: fc.Arbitrary<BoolCandidDefinition> =
    SimpleCandidDefinitionArb('bool');

export const BoolValueArb: fc.Arbitrary<CandidValues<boolean>> =
    SimpleCandidValuesArb(fc.boolean(), booleanToSrcLiteral);
