import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { NatCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Nat8Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(8),
    CandidType.Nat8,
    numberToSrcLiteral
);

export const Nat8DefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Nat8);

export const Nat8ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(UNumberArb(8), numberToSrcLiteral);
