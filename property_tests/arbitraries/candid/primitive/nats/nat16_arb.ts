import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { NatCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';

export function Nat16Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(Nat16DefinitionArb(), Nat16ValueArb);
}

export function Nat16DefinitionArb(): fc.Arbitrary<NatCandidDefinition> {
    return SimpleCandidDefinitionArb('nat16');
}

export function Nat16ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(UNumberArb(16), numberToSrcLiteral);
}
