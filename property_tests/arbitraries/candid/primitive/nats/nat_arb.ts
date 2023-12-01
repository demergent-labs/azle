import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { NatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const NatArb = SimpleCandidValueAndMetaArb(
    fc.bigUint(),
    'nat',
    bigintToSrcLiteral
);

export const NatDefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidDefinitionArb('nat');

export const NatValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValuesArb(fc.bigUint(), bigintToSrcLiteral);
