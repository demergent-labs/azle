import fc from 'fast-check';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_value_and_meta_arb';

export const NatDefinitionArb = SimpleCandidDefinitionArb('nat');

export const NatValueArb = SimpleCandidValuesArb(
    fc.bigUint(),
    bigintToSrcLiteral
);

export const NatArb = ComplexCandidValueAndMetaArb(
    NatDefinitionArb,
    () => NatValueArb
);
