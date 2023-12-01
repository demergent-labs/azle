import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import fc from 'fast-check';
import { NatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Nat16Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(16),
    'nat16',
    numberToSrcLiteral
);

export const Nat16DefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidDefinitionArb('nat16');

export const Nat16ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(UNumberArb(16), numberToSrcLiteral);
