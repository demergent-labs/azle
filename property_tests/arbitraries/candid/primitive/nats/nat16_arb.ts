import { numberToSrcLiteral } from '../../to_src_literal/number';
import { UNumberArb } from './index';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export const Nat16DefinitionArb = SimpleCandidDefinitionArb('nat16');

export const Nat16ValueArb = SimpleCandidValuesArb(
    UNumberArb(16),
    numberToSrcLiteral
);

export const Nat16Arb = CandidValueAndMetaArbGenerator(
    Nat16DefinitionArb,
    () => Nat16ValueArb
);
