import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import fc from 'fast-check';
import { NatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Nat32Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(32),
    'nat32',
    numberToSrcLiteral
);

export const Nat32DefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidDefinitionArb('nat32');

export const Nat32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(UNumberArb(32), numberToSrcLiteral);
