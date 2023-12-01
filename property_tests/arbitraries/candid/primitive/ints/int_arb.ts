import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const IntArb = SimpleCandidValueAndMetaArb(
    fc.bigInt(),
    'int',
    bigintToSrcLiteral
);

export const IntDefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb('int');

export const IntValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValuesArb(fc.bigInt(), bigintToSrcLiteral);
