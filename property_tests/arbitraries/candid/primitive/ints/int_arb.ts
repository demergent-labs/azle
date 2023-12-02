import fc from 'fast-check';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export const IntDefinitionArb = SimpleCandidDefinitionArb('int');

export const IntValueArb = SimpleCandidValuesArb(
    fc.bigInt(),
    bigintToSrcLiteral
);

export const IntArb = CandidValueAndMetaArbGenerator(
    IntDefinitionArb,
    () => IntValueArb
);
